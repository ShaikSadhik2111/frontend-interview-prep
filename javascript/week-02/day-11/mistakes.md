# Day 11 Mistakes & Corrections

## 1. Intersection example
The original example comment had an incorrect expected output.

Correct:
`[1, 2, 3, 4, 5] ∩ [4, 5, 6, 7, 8] = [4, 5]`

## 2. Intersection optimization
The initial approach used `includes()`, which is O(n × m).
A Set-based lookup improves the average complexity to O(n + m).

## 3. once() API
The initial implementation used a separate initializer function. The cleaner interview API is `once(fn)`, returning a function that executes `fn` only once and preserves the result.

## 4. Edge-case testing
Important cases to remember:
- Empty strings and arrays
- Duplicate values
- Two Sum with duplicate numbers such as `[3, 3]`
- Unmatched closing parentheses
- Unclosed opening parentheses
- Empty parentheses input

## 5. Interview habit
Do not stop at a working solution. Always identify the pattern, explain complexity, test edge cases, and discuss an optimized alternative when one exists.
