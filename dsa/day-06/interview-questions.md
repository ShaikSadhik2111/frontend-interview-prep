# DSA Day 6 — Stack and Queue Interview Questions

## 1. What is a stack?
**Answer:** A LIFO structure: the last item inserted is the first item removed.

## 2. What is a queue?
**Answer:** A FIFO structure: the first item inserted is the first item removed.

## 3. Why is valid parentheses a stack problem?
**Answer:** The most recently opened bracket must be closed first, which is LIFO behavior.

## 4. What is a monotonic stack?
**Answer:** A stack kept in increasing or decreasing order so elements that cannot become answers are removed. It is useful for next greater/smaller problems.

## 5. How does Min Stack get O(1) getMin?
**Answer:** Maintain a second stack containing the minimum value at each stack depth.

## 6. Why can Array.shift() be problematic?
**Answer:** Removing from the front can require moving/reindexing remaining elements. An index-based queue avoids repeated front removal.

## 7. Stack vs queue?
**Answer:** Stack is LIFO; queue is FIFO. Choose based on the order pending work must be processed.

## 8. What is BFS's relationship to queues?
**Answer:** BFS processes nodes level by level, so FIFO ordering naturally maps to a queue.

## 9. 30-second answer
**Answer:** A stack is LIFO and a queue is FIFO. I use stacks for nested or reverse-order processing and queues for ordered work such as BFS. For next-greater problems, a monotonic stack can reduce repeated scanning to O(n).
