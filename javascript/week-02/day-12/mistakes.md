# Day 12 — Mistakes / Corrections

## 1. Machine coding is not only UI coding

The important part is the complete flow:

Requirement → component design → state ownership → data flow → implementation → edge cases → UX/accessibility → performance → testing → explanation.

## 2. Avoid duplicated derived state

`filteredTodos`, `activeCount`, and `completedCount` can be derived from the source-of-truth `todos` state. Storing them separately can create synchronization problems.

## 3. Do not optimize blindly

`React.memo`, `useMemo`, and `useCallback` should be introduced when they solve a measured or understood rendering problem. They are not required everywhere.

## 4. Large todo lists are an item-count problem

When discussing scalability, say "100,000+ todos/items" rather than "100,000+ requests". Requests are a separate API/network concern.

## 5. Todo application implementation is deferred

Day 12 covers the design and interview reasoning. The actual Todo application will be built later during the planned application-building phase.
