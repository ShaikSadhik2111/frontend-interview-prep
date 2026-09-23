# DSA Day 1 — Interview Questions

## 1. What is Big-O?

Big-O describes how an algorithm's resource usage grows as input size grows. In interviews, discuss time complexity and auxiliary space separately when useful.

## 2. What is O(1)?

Constant complexity: the number of operations does not grow with input size.

Example:

```js
numbers[0]
```

## 3. What is O(n)?

Linear complexity: work grows approximately in proportion to the number of input elements.

A single array traversal is typically O(n).

## 4. What is O(n²)?

Quadratic complexity: work grows roughly as the square of input size.

A nested loop that scans n elements for each of n elements is O(n²).

## 5. Why can two O(n) algorithms perform differently?

Big-O describes asymptotic growth, not exact runtime. Constant factors, memory locality, allocations, JavaScript engine behavior, and input characteristics can differ.

## 6. What is JavaScript array indexed-access complexity?

For ordinary JavaScript arrays, indexed access is generally treated as O(1) in interview analysis. Real engine behavior is more nuanced because JavaScript arrays are dynamic objects with engine-specific representations.

## 7. Why is insertion at the beginning generally O(n)?

Existing elements may need to be shifted to make room for the new element.

## 8. How do you optimize a nested loop?

Identify what repeated work the inner loop performs. Depending on the problem, a Set/Map, sorting, prefix information, two pointers, or another data structure can reduce repeated work.

## 9. What is auxiliary space?

Extra memory used by the algorithm beyond the input representation.

For example, a frequency Map storing k distinct values uses O(k) auxiliary space.

## 10. What is the interview habit for a coding problem?

State:

- assumptions
- edge cases
- approach
- time complexity
- space complexity
- implementation
- test cases

## 11. Second-largest distinct number

A one-pass solution can maintain two variables:

```text
largest
secondLargest
```

When a new maximum appears, the old maximum becomes the second largest.

Important edge case: if there are fewer than two distinct values, return `undefined` (or clarify the required behavior).

## 12. Why use a Map for frequency counting?

A Map provides expected constant-time lookup/update, allowing a single O(n) traversal rather than repeatedly scanning the array.

## Day 1 self-test

Without looking at notes, explain:

1. O(1), O(n), O(n²)
2. time vs auxiliary space
3. why frequency counting is O(n)
4. why the frequency Map uses O(k) space
5. how second-largest distinct works
