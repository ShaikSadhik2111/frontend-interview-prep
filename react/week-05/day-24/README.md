# Day 24 — React useRef

## Day 24 position in the overall plan

This is **not a React-only study plan**. Preparation runs across four parallel tracks:

| Track | Purpose | Day 24 status |
|---|---|---|
| ⚛️ React / Frontend | Primary product-company frontend preparation | **Main focus — useRef** |
| 🧠 DSA | Coding/interview rounds | **Parallel — continue DSA track** |
| 🤖 AI | AI engineering + differentiator | **Parallel — continue AI track** |
| 🛠️ Production Project | Apply concepts in realistic engineering work | **Parallel — 1 hour** |

React remains the core track, while DSA and AI continue every day. Do not replace one track with another.

## Daily schedule

### Morning — 1.5 hours
**DSA**

Continue from the current DSA day. Study the concept, solve problems, understand the reference solution, and record mistakes.

Current DSA starting point: [dsa/day-01](../../../dsa/day-01/README.md)

### Evening — 7:00 PM to 11:30 PM

| Time | Track | Day 24 work |
|---|---|---|
| 7:00–8:30 | ⚛️ React / Frontend | **useRef** deep dive |
| 8:30–9:30 | 🛠️ Production Project | Apply one real ref pattern |
| 9:30–10:15 | 🤖 AI | Continue current AI day |
| 10:15–11:00 | 🎯 Interview / Revision | React + DSA + AI recall |
| 11:00–11:30 | 📝 GitHub / Notes | Mistakes, notes, commit |

Current AI starting point: [ai/day-01](../../../ai/day-01/README.md)

---

## React Day 24 Goal

Understand useRef deeply enough to use it correctly in production React and explain the trade-offs clearly in interviews.

## Why it matters

useRef is used for values that must survive renders without causing a render, and for imperative access to DOM nodes.

The key distinction:

> If changing a value should update the UI, it is usually state. If it must persist across renders but changing it should not itself trigger a render, a ref may be appropriate.

## 90-minute React session

- 20 min — read topic.md
- 20 min — study basics.tsx and examples.tsx
- 20 min — solve exercises.tsx
- 15 min — interview questions
- 15 min — apply one pattern in the real React project

**Time-saving rule:** Do not waste time manually typing every reference example. Understand the code, predict its behavior, inspect the reference solution, and implement the relevant pattern in the real project.

## Core React checklist

- [ ] Ref object and current
- [ ] DOM references
- [ ] useRef vs useState
- [ ] Values that persist across renders
- [ ] Previous-value pattern
- [ ] Timer/interval IDs
- [ ] Avoiding stale values in callbacks
- [ ] Imperative APIs
- [ ] Common misuse and anti-patterns
- [ ] One real production use case

## Production-project rule

Do **not** create another tutorial application for Day 24.

Use your real React project to find one legitimate use case such as:

- focusing an input
- scrolling to a validation error
- storing a timer/subscription handle
- integrating an imperative browser/library API

Document why a ref is appropriate and why state is not.

## Interview / revision focus

By the end of today, explain without notes:

1. What does useRef return?
2. Why does changing ref.current not trigger a render?
3. When should you use state instead?
4. Give three non-DOM use cases for refs.
5. How would you store and clean up a timer?
6. What is the previous-value pattern?
7. Why are refs considered an escape hatch?
8. When can a ref become a design smell?
9. How do refs interact with effects?
10. What is an imperative API?

## Day 24 completion

### React
- [ ] Complete topic.md
- [ ] Study basics.tsx
- [ ] Study examples.tsx
- [ ] Attempt exercises.tsx
- [ ] Check reference-solutions.tsx
- [ ] Read interview-questions.md
- [ ] Review mistakes.md

### Production project
- [ ] Implement one genuine useRef use case
- [ ] Verify cleanup where applicable
- [ ] Explain why ref is better than state for that case

### DSA
- [ ] Complete the current DSA session
- [ ] Solve the planned problems
- [ ] Record at least one mistake/learning

### AI
- [ ] Complete the current AI session
- [ ] Write down the key concept in your own words

### Interview / GitHub
- [ ] Do cross-track recall
- [ ] Update notes
- [ ] Commit Day 24 work

## Success criteria

Day 24 is complete when you can **reason about refs instead of memorizing them**, apply one ref pattern in production code, continue the DSA and AI tracks, and explain the topic at interview depth.
