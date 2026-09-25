# Day 25 — Common Mistakes

1. One giant Context for unrelated concerns.
2. Treating Context as a replacement for every state library.
3. Using Context to avoid passing one simple prop.
4. Ignoring Provider value identity.
5. Assuming useMemo automatically makes Context fast.
6. Creating unclear nested Provider ownership.
7. Hiding dependencies so much that component APIs become difficult to understand.
8. Forgetting to guard custom hooks when a Provider is required.
9. Putting rapidly changing local form state into broad Context without a reason.
10. Optimizing re-renders before understanding the actual rendering problem.
