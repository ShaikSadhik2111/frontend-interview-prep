function isEven(num) {
    if (num % 2 === 0) {
        return true;
    } else {
        return false;
    }
}
console.log(isEven(4)); // true
console.log(isEven(5)); // false

//in javascript, we can also write the above function in a more concise way using arrow functions and implicit return:
const isEvenArrow = (num) => num % 2 === 0;
console.log(isEvenArrow(4)); // true
console.log(isEvenArrow(5)); // false

//by using expression, we can also write the above function in a more concise way using arrow functions and implicit return:
const isEvenExpression = num => num % 2 === 0;
console.log(isEvenExpression(4)); // true
console.log(isEvenExpression(5)); // false