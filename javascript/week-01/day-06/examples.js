// const num = [1,2,3,4,5,6,7,8,9];
// const onlyEven = num.filter(n => n%2 === 0)
// console.log(onlyEven)
// console.log(num)

// const num = [1,2,3,4,5]
// const add = num.reduce((accu, cur) => accu + cur, 0)
// console.log(add)

// const num = [1,2,3,4]
// num.forEach(n => console.log(n))

// const num = [1,2,3,4]
// console.log(num.find(n => n%2 === 0))

// // compare with filter

// const numbers = [1, 2, 3, 4, 5]

// // filter: Get ALL even numbers
// numbers.filter(n => n % 2 === 0)    // [2, 4]

// // find: Get the FIRST even number
// numbers.find(n => n % 2 === 0)      // 2

// // some: Is there ANY even number?
// numbers.some(n => n % 2 === 0)      // true

// // every: Are ALL numbers even?
// numbers.every(n => n % 2 === 0)     // false


// const marks = [10,20,30,40,50];
// // to find the index of mark 4
// console.log(marks.findIndex(m => m > 40))

// const numbers = [10,20,30,40]
// console.log(numbers.every(n => n>=10)) // true

// const fruits = ['apple', 'orange', 'banana']
// console.log(fruits.sort())

// const num =[10, 5, 80, 2];
// console.log(num.sort())
// //op: [10, 2, 5, 80] wrong output because sort() method converts the elements into strings and then compares their sequences of UTF-16 code unit values.
// //so to get the correct output we can use compare function

// const numbers = [10, 5, 80, 2];
// console.log(numbers.sort((a, b) => a - b)); // [2, 5, 10, 80]


const numbers = [1, 2, [3, 4]];
const result = numbers.flat();

console.log(result); 
// Output: [1, 2, 3, 4]

// flatmap() method first maps each element using a mapping function, then flattens the result into a new array. 
// It is identical to a map followed by a flat of depth 1.
const numbers1 = [1, 2, 3, 4];
const result1 = numbers1.flatMap(x => [x * 2]);
console.log(result1); 
// Output: [2, 4, 6, 8]


// 