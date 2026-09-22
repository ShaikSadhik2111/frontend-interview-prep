# DSA Day 1 Interview Questions

## What is Big-O?
Big-O describes how an algorithm's resource usage grows as input size grows. In interviews, discuss both time and auxiliary space when relevant.

## O(1) vs O(n)
O(1) does not grow with input size. O(n) grows linearly with the number of input elements.

## Why can two O(n) algorithms have different real performance?
Big-O describes growth, not every constant factor, memory-access pattern, runtime behavior, or implementation detail.

## Array access complexity
Indexed access is typically O(1) for JavaScript arrays. Insertion/removal at the beginning generally requires shifting elements and is O(n).

## How do you optimize a nested loop?
First identify what repeated work the inner loop performs. Hash maps/sets, sorting, prefix information, or two-pointer techniques can often remove repeated work.

## Coding-round habit
Always say:
- input assumptions
- edge cases
- approach
- complexity
- implementation
- test examples
