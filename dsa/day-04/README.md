# DSA Day 4 — Sliding Window

## Goal
Recognize contiguous subarray/substring problems where a moving window avoids repeated recalculation.

## Core pattern
left = 0
for right from 0 to n - 1:
  add right to window
  while window is invalid:
    remove left
    left++
  update answer

## Problems
1. Maximum sum of subarray of size k
2. Maximum average of size k
3. Longest substring without repeating characters
4. Minimum size subarray sum
5. Longest substring with at most k distinct characters

## Why it can be O(n)
Each element enters the window once and leaves it at most once.

## Interview requirement
State the invariant maintained by the window and prove why the pointer movement does not skip a valid answer.
