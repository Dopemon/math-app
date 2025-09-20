export const modes = {
    easy:{
        name: 'Easy',
        digits: [1,1],
        operands: ["+", "-", "*", "/"],
        numbers: [2,2],
        problemCount: 15
    },
    medium: {
        name: 'Medium',
        digits: [1,1],
        operands: ["+", "-", "*", "/"],
        numbers: [2,3],
        problemCount: 20
    },
    hard: {
        name: 'Hard',
        digits: [1,2],
        operands: ["+", "-", "*", "/"],
        numbers: [3,3],
        problemCount: 25
    }
}

export interface mode{
    name: string,
    digits: number[],
    operands: string[],
    numbers: number[],
    problemCount: number
}

export interface results{
    mode: string,
    time: string,
    problems: number,
    operands: string[],
    digits: number[],
    numbers: number[],
    timeInMs: number
}