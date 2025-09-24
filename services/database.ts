import { Directory, File, Paths } from 'expo-file-system';
import * as SQLite from 'expo-sqlite';
import { SQLiteDatabase } from 'expo-sqlite';
import { Platform } from 'react-native';

// Type definitions for our data models
export interface Operand {
  id: number;
  operand: string;
}

export interface Result {
  id: number;
  mode: string;
  lowDigitRange: number;
  highDigitRange: number;
  lowMaxDigitRange: number;
  highMaxDigitRange: number;
  problems: number;
  operands: string;
  time: number;
  name: string;
}

const dbName = 'results.db';
let db: SQLiteDatabase | null = null;

function printDirectory(directory: Directory, indent: number = 0) {
    console.log(`${' '.repeat(indent)} + ${directory.name}`);
    const contents = directory.list();
    for (const item of contents) {
      if (item instanceof Directory) {
        printDirectory(item, indent + 2);
      } else {
        console.log(`${' '.repeat(indent + 2)} - ${item.name} (${item.size} bytes)`);
      }
    }
  }

/**
 * Deletes the existing database file.
 * This is a destructive action and will erase all data.
 */
export const clearDatabase = async (): Promise<void> => {
    try {
        const fileInfo = new File(Paths.document, (Platform.OS === 'android' ? 'SQLite' : ''), dbName);
        
        console.log(printDirectory(new Directory(Paths.document)));

        if (fileInfo) {
            console.log("Old database file found. Deleting...");
            await fileInfo.delete();
            console.log("Old database file deleted successfully.");
        }
    } catch (error) {
        console.error('Failed to delete old database file:', error);
        throw error;
    }
};

/**
 * Initializes the database by opening the connection and creating tables.
 */
export const init = async ({ clearFirst = false } = {}): Promise<void> => {
    try {

    if (clearFirst) {
        await clearDatabase();
    }

    db = await SQLite.openDatabaseAsync(dbName);
    console.log("init() ", db);
    console.log('Database opened successfully.');

    await db.withTransactionAsync(async () => {
      await db!.execAsync(
        `CREATE TABLE IF NOT EXISTS operands (
          id INTEGER PRIMARY KEY NOT NULL,
          operand TEXT UNIQUE NOT NULL
        );`
      );

      const defaultOperands = ['+', '-', '*', '/'];
      for (const op of defaultOperands) {
        await db!.runAsync(`INSERT OR IGNORE INTO operands (operand) VALUES (?);`, [op]);
      }

      await db!.execAsync(
        `CREATE TABLE IF NOT EXISTS results (
          id INTEGER PRIMARY KEY NOT NULL,
          mode TEXT NOT NULL,
          lowDigitRange INTEGER NOT NULL,
          highDigitRange INTEGER NOT NULL,
          lowMaxDigitRange INTEGER NOT NULL,
          highMaxDigitRange INTEGER NOT NULL,
          problems INTEGER NOT NULL,
          time INTEGER NOT NULL,
          name TEXT NOT NULL
        );`
      );

      await db!.execAsync(
        `CREATE TABLE IF NOT EXISTS result_operands (
          result_id INTEGER NOT NULL,
          operand_id INTEGER NOT NULL,
          PRIMARY KEY (result_id, operand_id),
          FOREIGN KEY (result_id) REFERENCES results(id) ON DELETE CASCADE,
          FOREIGN KEY (operand_id) REFERENCES operands(id) ON DELETE CASCADE
        );`
      );
    });
    console.log("Database tables and relations set up successfully.");
  } catch (error) {
    console.error('Database initialization failed.', error);
    throw error;
  }
};

/**
 * Inserts a new result entry and links it to the specified operands.
 */
export const insertResult = async (
  mode: string,
  lowDigitRange: number,
  highDigitRange: number,
  lowMaxDigitRange: number,
  highMaxDigitRange: number,
  problems: number,
  operands: string[],
  timeInMs: number,
  name: string
): Promise<number|undefined> => {
  if (!db) {
    throw new Error('Database not initialized. Call init() first.');
  }
  var resultId: number|undefined;
  await db.withTransactionAsync(async () => {
    const result = await db!.runAsync(
      `INSERT INTO results (mode, lowDigitRange, highDigitRange, lowMaxDigitRange, highMaxDigitRange, problems, time, name) VALUES (?, ?, ?, ?, ?, ?, ?, ?);`,
      [mode, lowDigitRange, highDigitRange, lowMaxDigitRange, highMaxDigitRange, problems, timeInMs, name]
    );

    resultId = result?.lastInsertRowId;

    for (const operand of operands) {
      const operandResult = await db!.getFirstAsync<Operand>(
        `SELECT id FROM operands WHERE operand = ?;`,
        [operand]
      );
      
      const operandId = operandResult?.id;
      if (operandId == null) {
        console.warn(`Operand '${operand}' not found in the database. Skipping link.`);
        continue;
    }
      
      await db!.runAsync(
        `INSERT OR IGNORE INTO result_operands (result_id, operand_id) VALUES (?, ?);`,
        [resultId, operandId]
      );
    }
  });
  return resultId;
};

/**
 * Fetches all results with their associated operands.
 */
export const fetchResults = async ({mode}: {mode: string}): Promise<Result[]> => {
  if (!db) {
    throw new Error('Database not initialized. Call init() first.');
  }

  const results = await db.getAllAsync<Result>(
    `SELECT
      r.id,
      r.mode,
      r.lowDigitRange,
      r.highDigitRange,
      r.lowMaxDigitRange,
      r.highMaxDigitRange,
      r.problems,
      r.time,
      r.name,
      GROUP_CONCAT(o.operand, ',') AS operands
     FROM results AS r
     JOIN result_operands AS ro ON r.id = ro.result_id
     JOIN operands AS o ON ro.operand_id = o.id
     WHERE r.mode = '${mode}'
     GROUP BY r.id
     ORDER BY r.time
     LIMIT 10;`
  );

  return results;
};