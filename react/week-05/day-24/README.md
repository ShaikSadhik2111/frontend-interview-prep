# Day 24 — React useRef

## Goal
Understand `useRef` deeply enough to use it correctly in production React and answer interview questions without memorized definitions.

## Why it matters
`useRef` is used for values that must survive renders without causing a render, and for imperative access to DOM nodes.

## 90-minute frontend session
- 20 min: read `topic.md`
- 20 min: study `basics.tsx` and `examples.tsx`
- 20 min: solve `exercises.tsx`
- 15 min: interview questions
- 15 min: apply one pattern in the real React project

## Core checklist
- [ ] ref object and `.current`
- [ ] DOM references
- [ ] `useRef` vs `useState`
- [ ] values that persist across renders
- [ ] previous-value pattern
- [ ] timer/interval IDs
- [ ] avoiding stale values in callbacks
- [ ] `forwardRef` and imperative APIs
- [ ] common misuse and anti-patterns

## Completion
You are done when you can explain why changing `ref.current` does not re-render, when a ref is appropriate instead of state, and implement focus/timer/previous-value patterns without copying blindly.
