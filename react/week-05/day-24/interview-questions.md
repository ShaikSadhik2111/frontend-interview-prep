# Day 24 — useRef Interview Questions

## 1. What is useRef?
It returns a stable mutable ref object whose `current` property can persist between renders without triggering a render when changed.

## 2. useRef vs useState?
State is for data that affects rendered output. A ref is useful for mutable values that need persistence but do not themselves require a render.

## 3. Why doesn't changing ref.current re-render?
React does not track `current` mutations as state updates. The ref object identity remains stable.

## 4. Common DOM use cases?
Focus, selection, scrolling, measuring a node, integrating with imperative browser APIs, and storing DOM handles.

## 5. Can refs store arbitrary values?
Yes. They can hold timer IDs, previous values, external instances, or other mutable implementation details.

## 6. Why is a ref useful for interval IDs?
The ID must survive renders and be available to cleanup, but changing it does not need to update the UI.

## 7. Why not store everything in refs?
Because React will not re-render when the ref changes. UI that depends on the value can become stale.

## 8. What is the previous-value pattern?
Store the current value in a ref inside an effect; during the next render the ref contains the previous committed value.

## 9. When should you avoid refs?
When ordinary props/state can model the problem declaratively. Refs should not become a replacement for React state or data flow.

## 10. What is a stale closure?
A callback can retain values from the render in which it was created. Refs can sometimes provide access to the latest mutable value, but the underlying state/update design should still be correct.

## 11. Can you mutate ref.current during render?
Simple render bookkeeping patterns exist, but observable side effects and DOM manipulation should be performed in effects or event handlers. Keep render pure.

## 12. What is an imperative API?
An API where the caller explicitly commands an operation, such as focus, rather than only passing declarative data.

## Strong interview answer
"State is React's reactive data model; refs are stable mutable containers for values React doesn't need to render. I use refs for DOM handles, timer IDs, previous values, and integration with imperative APIs, while keeping UI-visible data in state."
