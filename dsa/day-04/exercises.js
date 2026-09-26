// 1. Maximum sum of any contiguous subarray of size k.
// 2. Minimum length of a contiguous subarray whose sum >= target.
//    Assume positive integers.
// 3. Longest substring without repeating characters.
// 4. Longest substring containing at most k distinct characters.
// 5. Explain why naive repeated calculation can be O(n^2).
// 6. For every solution state time, auxiliary space and window invariant.

function maxSumOfSizeK(numbers, k) {
  if (k <= 0 || k > numbers.length) return null;

  let sum = 0;
  for (let i = 0; i < k; i++) sum += numbers[i];

  let best = sum;
  for (let right = k; right < numbers.length; right++) {
    sum += numbers[right] - numbers[right - k];
    best = Math.max(best, sum);
  }

  return best;
}

function minSubarrayLength(target, numbers) {
  let left = 0;
  let sum = 0;
  let best = Infinity;

  for (let right = 0; right < numbers.length; right++) {
    sum += numbers[right];

    while (sum >= target) {
      best = Math.min(best, right - left + 1);
      sum -= numbers[left++];
    }
  }

  return best === Infinity ? 0 : best;
}

module.exports = { maxSumOfSizeK, minSubarrayLength };
