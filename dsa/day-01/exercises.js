// DSA Day 1 — Exercises + Reference Solutions
//
// IMPORTANT:
// Attempt each problem first.
// The solutions below are the reference implementation.
//
// Interview habit:
// input -> edge cases -> approach -> code -> dry run -> complexity

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

// Returns a new reversed array.
// Time: O(n)
// Auxiliary space: O(n)
function reverseArray(numbers) {
  const result = [];

  for (let index = numbers.length - 1; index >= 0; index -= 1) {
    result.push(numbers[index]);
  }

  return result;
}

// Time: O(n)
// Auxiliary space: O(1)
function contains(numbers, target) {
  for (const number of numbers) {
    if (number === target) return true;
  }

  return false;
}

// One-pass distinct second-largest solution.
// Time: O(n)
// Auxiliary space: O(1)
function secondLargestDistinct(numbers) {
  let largest;
  let secondLargest;

  for (const number of numbers) {
    if (number === largest) continue;

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

// Time: O(n) expected
// Auxiliary space: O(k), where k is the number of distinct values.
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
