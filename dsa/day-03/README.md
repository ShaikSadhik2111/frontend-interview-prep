# DSA Day 3 — Two Pointers

## Goal

Recognize when two indices can replace nested loops while maintaining a useful invariant.

## Morning — 1.5 hours

20 min theory, 20 min examples, 35 min problems, 15 min interview explanation.

## Problems

1. Reverse an array in place.
2. Pair sum in a sorted array.
3. Two Sum II.
4. Remove duplicates from a sorted array.
5. Move zeroes.
6. Valid palindrome.

## Sorted-array pattern

If sum < target, move left. If sum > target, move right. If equal, answer found.

This can reduce pair enumeration from O(n²) to O(n), assuming the array is already sorted. Sorting first can make total complexity O(n log n).

## Interview workflow

Clarify whether input is sorted, state brute force, identify the invariant, explain pointer movement, code, dry-run an edge case, state complexity.

## Completion
- [ ] Explain the invariant
- [ ] Solve at least five problems
- [ ] Explain why every pointer move is safe
- [ ] Record one failed approach
