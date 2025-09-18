export const modes = {
    easy:{
        digits: 1,
        operands: ["+", "-", "*", "/"],
        numbers: 2,
        problemCount: 15
    },
    medium: {
        digits: 1,
        operands: ["+", "-", "*", "/"],
        numbers: 2,
        problemCount: 20
    },
    hard: {
        digits: 2,
        operands: ["+", "-", "*", "/"],
        numbers: 3,
        problemCount: 25
    }
}

export interface mode{
    digits: number,
    operands: string[],
    numbers: number,
    problemCount: number
}

export interface results{
    time: string,
    problems: number,
    operands: string[],
    digits: number,
    numbers: number
}