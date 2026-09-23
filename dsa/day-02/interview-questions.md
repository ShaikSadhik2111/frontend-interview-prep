# DSA Day 2 — Interview Questions

## 1. Map vs Set?

A `Set` stores unique values and answers membership questions. A `Map` stores key-value associations and is useful for frequencies, indexes, or other metadata.

## 2. Why does hashing improve many problems?

A naive solution may repeatedly scan an array, producing O(n²). A hash-based structure can provide expected O(1) lookup, reducing the overall approach to expected O(n).

## 3. What is the Two Sum pattern?

For each number `x`, calculate:

```text
complement = target - x
```

Check whether the complement was already seen in a Map. If yes, the pair has been found.

## 4. Why store the index in Two Sum?

The problem usually asks for positions, so the Map stores:

```text
number -> index
```

## 5. Why check before inserting the current number?

It prevents using the same array element twice when the problem requires two distinct positions.

## 6. How do you check anagrams efficiently?

Count characters in the first string and decrement counts while scanning the second. If every count balances, they are anagrams.

## 7. Why is first-unique-character usually two-pass?

First pass determines frequency. Second pass preserves original order and finds the first character with count 1.

## 8. Map/Set complexity caveat

JavaScript `Map` and `Set` operations are generally analyzed as expected O(1), but worst-case and engine implementation details can differ. State the expected complexity in interviews.

## 9. Hashing trade-off

The usual trade-off is:

```text
less time
   ↕
more memory
```

A hash table can reduce repeated searches at the cost of auxiliary memory.

## 10. Can you solve Two Sum without extra space?

Yes, depending on the required output and constraints, sorting plus two pointers can reduce auxiliary structure usage, but sorting changes the original order/index problem unless indices are preserved.

## 11. Coding-round scenario

**Question:** "Find whether an array contains duplicates."

Strong reasoning:

> A nested-loop solution compares every pair in O(n²). Since I only need membership, I can keep a Set of seen values and return immediately when a duplicate appears. This gives expected O(n) time and O(n) auxiliary space.

## Day 2 self-test

Without looking at notes:

1. Explain Map vs Set.
2. Derive Two Sum from the complement idea.
3. Explain why anagram counting is linear.
4. Explain the time/space trade-off of hashing.
5. Give one case where sorting + two pointers may be preferable.
