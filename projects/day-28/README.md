# Day 28 — Practical Project

## React — Effect Audit
Use the real company project for analysis. Do not refactor production code just for practice.

Pick one screen containing API fetching, event listeners, timers, subscriptions or derived values.

Document:
1. External system being synchronized.
2. Effect dependencies.
3. Cleanup behavior.
4. Stale-closure risk.
5. Async request race risk.
6. Whether AbortController or server-state tooling is appropriate.
7. Effects that can be removed because the value is derived.
8. Strict Mode behavior.
9. Smallest safe improvement.

## DSA — Stack/Queue Application
Identify one real feature where pending work is LIFO or FIFO. Document the chosen data structure and invariant.

## AI — Tool-Calling Architecture
For the AI Excel Processing Platform, design 2–4 narrow backend tools.

Examples:
- listColumns
- filterRows
- aggregateColumn
- createChartData

For each tool document:
1. Input schema.
2. Authorization rule.
3. Deterministic implementation.
4. Output schema.
5. Failure cases.
6. Rate/size/time limits.

Architecture:

User
→ React
→ Backend
→ LLM
→ validated tool call
→ authorization
→ deterministic tool
→ tool result
→ validated final response

The model proposes actions; the application controls execution.
