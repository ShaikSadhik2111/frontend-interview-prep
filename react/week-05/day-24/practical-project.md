# Day 24 — Practical Project Application

## Goal

Apply useRef to one real production problem instead of creating another toy application.

## Choose one real use case

### A. Focus an input
Use a ref when a user action should imperatively focus a specific input.

### B. Scroll to an error
Useful for long forms where validation should bring the first error into view.

### C. Store a timer/subscription handle
Use a ref for an implementation handle that must survive renders but does not belong in UI state.

### D. Integrate an imperative library
If a third-party library gives you an instance that must later be destroyed or updated, a ref can hold that instance while an effect owns its lifecycle.

## What to document

1. What does the ref store?
2. Why would state be the wrong abstraction?
3. Does changing it need to update the UI?
4. Which effect/event handler owns mutation?
5. If it owns a resource, where is cleanup performed?

## Production review questions

Before adding a ref, ask:

- Can this be represented declaratively with props/state?
- Does the value affect JSX?
- Does changing it need to trigger a render?
- Is this actually a DOM/browser/library handle?
- Could this ref become hidden application state?

## Interview takeaway

A good production explanation is:

> "I used a ref because the value needs to persist across renders, but React does not need to render when it changes. The ref is used at an imperative boundary, while state remains responsible for UI-visible data."

## Do not do

If a selected customer is displayed in the UI, do not hide it in a ref merely to avoid rendering. Use state.

## Day completion

- [ ] Identify one real use case
- [ ] Implement it
- [ ] Verify cleanup where applicable
- [ ] Explain why ref is better than state for that specific case
- [ ] Write one interview-quality explanation
