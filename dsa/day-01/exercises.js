// DSA Day 1 exercises
//
// Try each problem before looking at the reference solution below.
//
// 1. findMax(numbers)
// 2. findMin(numbers)
// 3. reverseArray(numbers)
// 4. contains(numbers, target)
// 5. secondLargestDistinct(numbers)
// 6. frequencyMap(values)
//
// Reference solutions:

function findMax(numbers) {
  if (numbers.length === 0) return undefined;

  let max = numbers[0];

  for (const number of numbers) {
    if (number > max) max = number;
  }

  return max;
}

function findMin(numbers) {
  if (numbers.length === 0) return undefined;

  let min = numbers[0];

  for (const number of numbers) {
    if (number < min) min = number;
  }

  return min;
}

function reverseArray(numbers) {
  const result = [];

  for (let index = numbers.length - 1; index >= 0; index -= 1) {
    result.push(numbers[index]);
  }

  return result;
}

function contains(numbers, target) {
  for (const number of numbers) {
    if (number === target) return true;
  }

  return false;
}

function secondLargestDistinct(numbers) {
  let largest;
  let secondLargest;

  for (const number of numbers) {
    if (number === largest) continue;// skips iteration

    if (largest === undefined || number > largest) {
      secondLargest = largest;
      largest = number;
    } else if (
      secondLargest === undefined ||
      number > secondLargest
    ) {
      secondLargest = number;
    }
  }

  return secondLargest;
}

function frequencyMap(values) {
  const counts = new Map();

  for (const value of values) {
    counts.set(value, (counts.get(value) ?? 0) + 1);
  }

  return counts;
}

module.exports = {
  findMax,
  findMin,
  reverseArray,
  contains,
  secondLargestDistinct,
  frequencyMap,
};
