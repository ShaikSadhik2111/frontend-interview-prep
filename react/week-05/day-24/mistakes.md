# Day 24 — Common Mistakes

1. **Expecting a ref update to update JSX**
   - Fix: use state when UI must react.

2. **Using refs for normal application state**
   - Fix: prefer props/state and declarative rendering.

3. **Forgetting cleanup**
   - Fix: clear timers and unsubscribe external resources.

4. **Using a DOM ref when a normal HTML/React pattern is enough**
   - Fix: keep imperative code at the boundary.

5. **Confusing persistence with reactivity**
   - A ref gives persistence, not reactivity.

6. **Reading a ref as if it were always the latest state**
   - Update timing matters; understand when the ref is assigned.

7. **Using refs to hide architectural problems**
   - A ref can solve a local imperative need; it should not replace proper component state/data flow.
