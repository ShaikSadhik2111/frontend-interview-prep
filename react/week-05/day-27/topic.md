# Day 27 — React Performance and Memoization

## 1. React.memo
React.memo allows React to skip a function component when its props are shallowly equal to the previous props.

## 2. useMemo
useMemo caches a computed value until its dependencies change.

```tsx
const filtered = useMemo(() => expensiveFilter(items, query), [items, query]);
```

Use it for meaningfully expensive calculations or when stable value identity is intentionally required.

## 3. useCallback
useCallback caches a function reference.

```tsx
const onSelect = useCallback((id: string) => select(id), [select]);
```

It is most useful when a callback is passed to a memoized child or participates in another dependency relationship.

## 4. Referential equality
Objects, arrays and functions are compared by reference. Two separately created objects can have identical contents but different references.

```tsx
{} === {} // false
```

Therefore an inline object prop can defeat React.memo's shallow comparison.

## 5. Dependency arrays
Dependencies must represent values that can change the result of the memoized calculation or callback. Incorrect dependencies can produce stale values.

## 6. Stale closures
A callback captures values from its render. If a changing value is omitted from dependencies, the callback can continue using an older value.

## 7. Memoization is not automatically faster
For a simple calculation, memoization may add more complexity than benefit. Creating a function is usually cheap. useCallback only helps when stable identity matters.

## 8. Performance workflow
1. Observe the symptom.
2. Profile/measure.
3. Identify the actual bottleneck.
4. Apply the smallest targeted optimization.
5. Measure again.

## Interview mental model
"React.memo can skip a child render based on props, useMemo caches a value, and useCallback caches a function reference. All are optimizations, so I use them when profiling or architecture shows a concrete reason."
