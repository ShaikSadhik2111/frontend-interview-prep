function removeDuplicatesSorted(numbers) {
  if (numbers.length === 0) return 0;
  let write = 1;
  for (let read = 1; read < numbers.length; read++) {
    if (numbers[read] !== numbers[read - 1]) numbers[write++] = numbers[read];
  }
  return write;
}

function reverseInPlace(values) {
  const reversed = [...values];
  let left = 0;
  let right = reversed.length - 1;
  while (left < right) {
    [reversed[left], reversed[right]] = [reversed[right], reversed[left]];
    left++;
    right--;
  }
  return typeof values === 'string' ? reversed.join('') : reversed;
}

function hasPairWithTargetSorted(numbers, target) {
  let left = 0;
  let right = numbers.length - 1;
  while (left < right) {
    const sum = numbers[left] + numbers[right];
    if (sum === target) return true;
    if (sum < target) left++;
    else right--;
  }
  return false;
}

function validPalindrome(text) {
  let left = 0;
  let right = text.length - 1;
  while (left < right) {
    if (text[left] !== text[right]) return false;
    left++;
    right--;
  }
  return true;
}

module.exports = { removeDuplicatesSorted, reverseInPlace, hasPairWithTargetSorted, validPalindrome };
