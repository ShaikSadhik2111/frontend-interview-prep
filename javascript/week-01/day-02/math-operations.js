//writing this by using higher order functions
function calculate(a,b,operation) {
    return operation(a,b);
}

operations = {
    add: (a,b) => a + b,
    subtract: (a,b) => a - b,
    multiply: (a,b) => a * b,
    divide: (a,b) => a / b
}

console.log(calculate(5,3,operations.add)); // 8
console.log(calculate(5,3,operations.subtract)); // 2
console.log(calculate(5,3,operations.multiply)); // 15
console.log(calculate(5,3,operations.divide)); // 1.6666666666666667