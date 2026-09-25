function twoSumSorted(numbers, target) {
  let left = 0;
  let right = numbers.length - 1;

  while (left < right) {
    const sum = numbers[left] + numbers[right];
    if (sum === target) return [left, right];
    if (sum < target) left++;
    else right--;
  }
  return [-1, -1];
}

function isPalindrome(value) {
  let left = 0;
  let right = value.length - 1;
  while (left < right) {
    if (value[left] !== value[right]) return false;
    left++;
    right--;
  }
  return true;
}

function moveZeroes(numbers) {
  let write = 0;
  for (const number of numbers) {
    if (number !== 0) numbers[write++] = number;
  }
  while (write < numbers.length) numbers[write++] = 0;
  return numbers;
}

module.exports = { twoSumSorted, isPalindrome, moveZeroes };
