# Day 25 — Production Project Application

Do not build a tutorial app.

Find one real cross-cutting dependency in the existing React/company project.

Document:
- dependency
- current owner
- current prop path
- consumers
- update frequency
- why props are noisy
- why Context is justified
- expected consumer boundary

Implementation:
1. Create a typed Context.
2. Create a Provider with explicit ownership.
3. Create a small custom consumer hook.
4. Wrap only the required subtree.
5. Keep unrelated state outside the Context.
6. Check Provider value identity where it matters.
7. Verify behavior and tests.

A correct decision to not use Context is also valid when the requirements do not justify it.
