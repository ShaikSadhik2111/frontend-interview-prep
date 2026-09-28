# Day 27 — React Performance Interview Questions

1. What is React.memo?
Answer: It can skip a function component when props are shallowly equal. It is an optimization, not a guarantee of no renders.

2. useMemo vs useCallback?
Answer: useMemo caches a value; useCallback caches a function reference.

3. Why does referential equality matter?
Answer: Objects, arrays and functions are reference values, so newly-created references can appear changed even when contents match.

4. When useMemo?
Answer: For meaningfully expensive calculations or intentionally stable value identity. Simple expressions usually do not need it.

5. When useCallback?
Answer: When stable function identity matters, commonly with a memoized child or dependency relationship.

6. What is a stale closure?
Answer: A callback or effect can capture older render values. Incorrect dependencies can make it use stale data.

7. Can useMemo prevent API calls?
Answer: No. API frequency belongs to fetching/effect/cache architecture.

8. Why can useCallback fail to help?
Answer: If the child is not memoized or other props change, stabilizing one callback may not avoid meaningful work.

9. Is memoization always good?
Answer: No. It adds complexity. Profile first and keep it only when it solves a real bottleneck.

10. How optimize a slow page?
Answer: Profile first, identify rendering/calculation/list/network/architecture bottlenecks, apply a targeted change, then measure again.

11. Why can inline objects defeat React.memo?
Answer: An object literal creates a new reference on every render, so shallow comparison sees a changed prop.

12. React.memo and useCallback relationship?
Answer: React.memo can skip a child when props are unchanged; useCallback can keep a function prop stable so that optimization can work.

13. Does React.memo prevent all renders?
Answer: No. State, context, or changed props can still cause rendering.

14. What before memoization?
Answer: Reproduce, profile, identify the actual work, apply the smallest optimization, and verify the result.

15. 30-second answer?
Answer: React.memo can skip child work based on props, useMemo caches a value, and useCallback caches a function reference. I use them as targeted optimizations after identifying a real need and keep dependencies correct.

Scenario: 5000-row table.
Answer: Profile row rendering, parent renders, unstable props, filtering/sorting and DOM size. Virtualization or pagination may matter more than memoizing everything.
