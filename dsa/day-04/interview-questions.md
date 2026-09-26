# DSA Day 4 Interview Questions

1. What is sliding window?
2. Fixed vs variable sliding window?
3. Why can it reduce O(n^2) work to O(n)?
4. When is a running sum enough?
5. Why does minimum-subarray-sum with this pattern require positive numbers?
6. How does a Map help with longest unique substring?
7. What invariant does your window maintain?
8. Why do pointers usually move only forward?
9. What is auxiliary space for a Map-based window?
10. When would two pointers be a better description than sliding window?

## Key idea
Maintain the current window incrementally instead of rebuilding every candidate window from scratch.

## Simple Answers

1. **What is sliding window?**  
	Sliding window examines a continuous part of an array or string and moves that range through the input.

2. **Fixed vs variable sliding window?**  
	A fixed window always has the same size. A variable window grows and shrinks based on a condition.

3. **Why can it reduce O(n^2) work to O(n)?**  
	Each element usually enters and leaves the window once, so the pointers move through the input only a small number of times.

4. **When is a running sum enough?**  
	A running sum is enough when the problem only needs the current window's total, such as finding the sum of every fixed-size window.

5. **Why does minimum-subarray-sum with this pattern require positive numbers?**  
	With positive numbers, expanding always increases the sum and shrinking always decreases it. Negative numbers can break this predictable behavior.

6. **How does a Map help with longest unique substring?**  
	A Map stores each character's latest index, so the left pointer can jump past a repeated character instead of checking every character again.

7. **What invariant does your window maintain?**  
	The window always satisfies the problem's rule, such as containing no duplicate characters or having a sum below a target.

8. **Why do pointers usually move only forward?**  
	Moving forward prevents the same elements from being repeatedly reprocessed, which helps achieve O(n) time.

9. **What is auxiliary space for a Map-based window?**  
	It is O(k), where k is the number of distinct values stored in the Map; in the worst case, it can be O(n).

10. **When would two pointers be a better description than sliding window?**  
	 Use two pointers when the pointers search from opposite ends or track positions without representing one continuous expanding and shrinking window.
