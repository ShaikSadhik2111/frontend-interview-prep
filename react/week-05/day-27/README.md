# Day 27 — React Performance

## Goal
Understand React memoization as a targeted performance optimization.

## Topics
- React.memo
- useMemo
- useCallback
- referential equality
- dependency arrays
- stale closures
- profiling and measurement
- large lists and component boundaries

## Study flow
1. Read topic.md.
2. Type and understand basics.tsx.
3. Attempt exercises.tsx.
4. Compare with reference-solutions.tsx.
5. Read every interview answer.
6. Complete practical-project.md.

## Mental model
- React.memo → can skip a child render when props are shallowly equal.
- useMemo → caches a computed value.
- useCallback → caches a function reference.

Memoization adds complexity. Measure first.

## Checklist
- [ ] Explain referential equality.
- [ ] Distinguish all three APIs.
- [ ] Explain dependency arrays.
- [ ] Identify a stale closure.
- [ ] Explain when memoization is unnecessary.
- [ ] Apply the decision checklist to a real project.
