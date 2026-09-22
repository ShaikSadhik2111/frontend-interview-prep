// Big-O examples

// O(1): fixed number of operations
function firstItem(numbers) {
  return numbers[0];
}

// O(n): one traversal
function findMax(numbers) {
  let max = numbers[0];

  for (const number of numbers) {
    if (number > max) max = number;
  }

  return max;
}

// O(n^2): nested traversal
function printPairs(numbers) {
  for (let i = 0; i < numbers.length; i += 1) {
    for (let j = 0; j < numbers.length; j += 1) {
      console.log(numbers[i], numbers[j]);
    }
  }
}

// Array traversal
function contains(numbers, target) {
  for (const number of numbers) {
    if (number === target) return true;
  }
  return false;
}

// Frequency counting: O(n) time, O(n) space in the worst case.
function frequencyMap(values) {
  const counts = new Map();

  for (const value of values) {
    counts.set(value, (counts.get(value) ?? 0) + 1);
  }

  return counts;
}
