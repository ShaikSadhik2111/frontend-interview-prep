# DSA Day 2 — Strings + Hashing

## Position in the plan

DSA is the **morning 1.5-hour parallel coding track** alongside React, AI, and the production project.

## Goal

Learn two high-frequency interview patterns:

1. String traversal and normalization
2. Hashing with `Map` and `Set`

The goal is not memorizing individual problems. Learn to recognize when a hash structure can reduce repeated searching from O(n²) to expected O(n).

## 90-minute session

- 15 min — string fundamentals and complexity
- 15 min — Map/Set mental model
- 35 min — coding problems
- 15 min — brute force vs hashing comparison
- 10 min — interview recall

## Core topics

- String traversal
- Character frequency
- `Map`
- `Set`
- Duplicate detection
- Anagram pattern
- First unique character
- Two-sum pattern
- Hashing trade-offs

## Problems

1. Count character frequencies.
2. Check whether two strings are anagrams.
3. Find the first non-repeating character.
4. Check whether an array contains duplicates.
5. Solve Two Sum.
6. Find the intersection of two arrays.

## Required workflow

For each problem:

1. Clarify input and output.
2. Identify edge cases.
3. Give brute force.
4. Identify repeated work.
5. Choose Map/Set if appropriate.
6. Code.
7. Dry-run.
8. State time and auxiliary-space complexity.
9. Explain why the optimized approach works.

## Key pattern

When you repeatedly ask:

> "Have I seen this before?"

Think:

```text
Set / Map
```

Examples:
- duplicate? → Set
- frequency? → Map
- complement lookup? → Map
- character counts? → Map

## Time-saving rule

Attempt the problem first. If stuck for 10–15 minutes, study the pattern and reference solution, then close it and reproduce the solution from understanding.

## Completion checklist

- [ ] Explain Map vs Set
- [ ] Solve all six problems
- [ ] Explain Two Sum in O(n) expected time
- [ ] Explain anagram frequency counting
- [ ] State complexity for every solution
- [ ] Handle empty/single-element inputs
- [ ] Record at least one mistake
- [ ] Explain one solution aloud
