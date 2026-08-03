// without using map() method need to square the numbers in the array
const numbers = [1, 2, 3, 4];
const squaredNumbers = [];
for(let i=0;i<numbers.length;i++){
    squaredNumbers.push(numbers[i]*numbers[i]);
}
console.log(squaredNumbers);