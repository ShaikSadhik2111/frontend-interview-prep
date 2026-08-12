# Day 11 Revision

## Core Patterns

### Two Pointer
Used for problems where two indexes move toward each other or through a sequence.
- Palindrome
- Sorted-array problems

### Frequency Map
Used to count occurrences.
- Character frequency
- First non-repeating character
- Anagram

### Hash Map / Set
Used for fast lookup.
- Two Sum
- Duplicate detection
- Intersection
- Counting occurrences

### Recursion
Used when a problem contains nested/self-similar structure.
- Flatten nested arrays

### Stack
Used when the most recently opened item must be handled first.
- Valid Parentheses

### Closure
Used when a returned function must retain private state.
- Counter
- once()

## Complexity Checklist

For every interview problem, explain:
1. Time complexity
2. Auxiliary space complexity
3. Brute-force approach
4. Optimized approach
5. Why the optimized approach is better

## Key Complexity Examples

- Two Sum with Hash Map: average O(n) time, O(n) space
- Two Sum with nested/index lookup: O(n²) time
- Anagram with frequency map: O(n) time, O(n) space
- Anagram with sorting: O(n log n) time
- Valid Parentheses: O(n) time, O(n) space
- Palindrome with two pointers: O(n) time, O(1) auxiliary space
- Intersection with Set: average O(n + m) time
