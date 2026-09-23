// DSA Day 1 — Big-O + Array Fundamentals

// ------------------------------------------------------------
// 1. O(1) — constant time
// ------------------------------------------------------------
// The number of operations does not grow with input length.
function firstItem(numbers) {
  return numbers[0];
}

// ------------------------------------------------------------
// 2. O(n) — linear time
// ------------------------------------------------------------
// One traversal of n elements.
function findMax(numbers) {
  if (numbers.length === 0) return undefined;

  let max = numbers[0];

  for (const number of numbers) {
    if (number > max) max = number;
  }

  return max;
}

// ------------------------------------------------------------
// 3. O(n²) — quadratic time
// ------------------------------------------------------------
// For every element, scan the whole array again.
function printPairs(numbers) {
  for (let i = 0; i < numbers.length; i += 1) {
    for (let j = 0; j < numbers.length; j += 1) {
      console.log(numbers[i], numbers[j]);
    }
  }
}

// ------------------------------------------------------------
// 4. Linear search — O(n)
// ------------------------------------------------------------
function contains(numbers, target) {
  for (const number of numbers) {
    if (number === target) return true;
  }

  return false;
}

// ------------------------------------------------------------
// 5. Frequency map — O(n) average time, O(k) space
// ------------------------------------------------------------
// k = number of distinct values.
// Map lookup/set is expected O(1) on average.
function frequencyMap(values) {
  const counts = new Map();

  for (const value of values) {
    counts.set(value, (counts.get(value) ?? 0) + 1);
  }

  return counts;
}

// Interview habit:
// Always distinguish:
// - input size: n
// - number of distinct values: k
// - time complexity
// - auxiliary space
