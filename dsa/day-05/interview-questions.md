# Day 5 — Sliding Window Interview Questions

## 1. What is sliding window?
**Answer:** A two-pointer technique for contiguous ranges. Expand right, maintain an invariant, and move left when the constraint is violated or a fixed size must be maintained.

## 2. Why can it be O(n) with a nested while?
**Answer:** In common implementations both pointers only move forward; each element enters and leaves the window at most once.

## 3. Fixed vs variable window?
**Answer:** Fixed has exactly k elements. Variable grows and shrinks according to a condition.

## 4. Longest substring without repeating?
**Answer:** Track characters in a Set or last-seen Map, expand right, and move left until uniqueness is restored.

## 5. What is the invariant?
**Answer:** The condition that must remain true for the current window, such as uniqueness or at-most-k distinct characters.

## 6. Minimum window substring?
**Answer:** Track required/current counts, expand until requirements are satisfied, then shrink while valid and record the smallest window.

## 7. Common mistakes?
**Answer:** Forgetting left-side cleanup, wrong validity condition, confusing distinct count with frequency, and using the wrong window-length formula.

## 8. Can sliding window solve every subarray problem?
**Answer:** No. It requires a maintainable window property; other problems may need prefix sums, hashing, binary search or DP.

## 9. 30-second answer
**Answer:** "Sliding window is a two-pointer technique for contiguous ranges. I maintain an invariant, expand right, and shrink left when needed. Since pointers usually move only forward, many solutions are O(n)."