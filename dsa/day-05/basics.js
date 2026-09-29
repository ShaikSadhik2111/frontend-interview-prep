// DSA Day 5 — Sliding Window Basics
//
// Core idea:
// 1. Expand the right side of the window.
// 2. Maintain the required window condition.
// 3. Move the left side when the condition is violated.
// 4. Update the answer.
//
// Typical complexity: O(n) because each pointer moves forward.

function longestUniqueSubstring(s) {
  const seen = new Set();

  let left = 0;
  let best = 0;

  for (let right = 0; right < s.length; right += 1) {
    while (seen.has(s[right])) {
      seen.delete(s[left]);
      left += 1;
    }

    seen.add(s[right]);
    best = Math.max(best, right - left + 1);
  }

  return best;
}

function maxSumSizeK(nums, k) {
  if (k <= 0 || k > nums.length) {
    return null;
  }

  let windowSum = 0;

  // Build the first window.
  for (let i = 0; i < k; i += 1) {
    windowSum += nums[i];
  }

  let best = windowSum;

  // Slide the window:
  // add the new element and remove the element
  // that just left the window.
  for (let right = k; right < nums.length; right += 1) {
    windowSum += nums[right];
    windowSum -= nums[right - k];

    best = Math.max(best, windowSum);
  }

  return best;
}

// "abcabcbb" -> 3
console.log("Longest unique substring:", longestUniqueSubstring("abcabcbb"));

// [2, 1, 5, 1, 3, 2], k = 3 -> 9
console.log(
  "Maximum sum of size k:",
  maxSumSizeK([2, 1, 5, 1, 3, 2], 3)
);
