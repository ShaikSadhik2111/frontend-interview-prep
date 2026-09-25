# DSA Day 3 — Interview Questions

1. What is the two-pointer technique? A pattern using two indices to scan a structure while maintaining an invariant.

2. When is it useful? Sorted arrays, opposite-end comparisons, in-place partitioning and similar problems.

3. Why does Two Sum II become O(n)? Sorted order tells us which pointer can move after comparing the current sum with the target.

4. Why move left when sum < target? In a sorted array, increasing the left value is the way to increase the sum while keeping the current right value.

5. Does two pointers always mean O(n)? No. Sorting first can make total complexity O(n log n).

6. Two pointers vs HashMap for Two Sum? HashMap works on unsorted input with expected O(n) time and O(n) extra space. Two pointers can use O(1) extra space when input is sorted.

7. What is the invariant? A condition that remains true and justifies each pointer movement.

8. Interview trap: never apply two pointers without proving that the discarded search space cannot contain a valid answer.

Self-test: given a sorted array and target, explain why every discarded pair cannot be a solution.
