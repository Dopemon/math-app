export const generate: {
    randomNumber: (min: number, max: number) => number,
    randomOperand: (arr: string[]) => string,
    mergedArray: (arr1: number[], arr2: string[]) => any[],
    randomProblem: (digits: number[], numbers: number[], operands: string[]) => {problem: string, answer: string}
} = {
    randomNumber: (min: number, max: number) => {
        return Math.floor(Math.random() * (max-min+1) + min);
    },

    randomOperand: (arr: string[]) => {
        return arr[Math.floor(Math.random() * arr.length)];
    },

    mergedArray: (arr1: number[], arr2: string[]) => {
        const result = [];
        const maxLength = Math.max(arr1.length, arr2.length);
    
        for (let i = 0; i < maxLength; i++) {
            if (i < arr1.length) result.push(arr1[i]);
            if (i < arr2.length) result.push(arr2[i]);
        }
        return result;
    },

    randomProblem: (digits: number[] = [1,1], numbers: number[] = [2,2], operands: string[] = ["+", "-", "*", "/"]) => {

        var problem = "";
        var answer = 0;
        var formulaNumbers = [];
        var formulaOperands = [];
        var numbersLeft = numbers;

        var problemNumbers = generate.randomNumber(Math.min(...numbers), Math.max(...numbers));
        const minDigit = Math.min(...digits);
        const maxDigit = Math.max(...digits);

        for(var i = 0; i< problemNumbers-1; i++){
            if(i == 0){
                var newNum = generate.randomNumber( Math.pow(10,minDigit-1), Math.pow(10,maxDigit)-1)
                formulaNumbers.push(newNum);
            }
            var operand = generate.randomOperand(operands);
            if(operand == "/"){
                var n1: number = formulaNumbers[ formulaNumbers.length-1 ];
                var n2: number = generate.randomNumber( Math.pow(10,minDigit-1), Math.pow(10,maxDigit)-1);
                var n3: number = n1 * n2;
                formulaNumbers.pop();
                formulaNumbers.push(n3)
                formulaOperands.push(operand);
                formulaNumbers.push(n2)
            }else{
                var n2: number = generate.randomNumber( Math.pow(10,minDigit-1), Math.pow(10,maxDigit)-1 );
                formulaOperands.push(operand)
                formulaNumbers.push(n2);
            }
        }

        problem = generate.mergedArray(formulaNumbers, formulaOperands).join(" ");
        answer = eval(problem);

        if(!Number.isInteger(answer)){ 
            return generate.randomProblem(digits, numbers, operands) ;
        }

        return { problem, answer: ""+answer };
    }
}