# Day 28 Practical Project — Effect Audit

Use the real company project for analysis. Do not refactor production code just for practice.

Pick one screen containing API fetching, event listeners, timers, subscriptions or derived values.

Document:
1. What external system is being synchronized?
2. What are the dependencies?
3. What is the cleanup?
4. Is there a stale-closure risk?
5. Can requests race?
6. Should AbortController or server-state tooling be used?
7. Is any Effect unnecessary?
8. What would happen in Strict Mode development?
9. What is the smallest safe improvement?

Goal: make a defensible engineering decision, not add Effects.
