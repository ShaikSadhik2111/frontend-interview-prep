# Day 24 Common Mistakes

## 1. Ref used for visible UI state

❌ Put selected customer, loading state, displayed count, or form value in a ref.

✅ Use state when JSX must react to changes.

## 2. Expecting ref mutation to update JSX

```tsx
countRef.current++;
```

does not schedule a render.

## 3. Forgetting nullability

DOM refs can be unavailable before mount or after unmount.

Use lifecycle-correct code and null-safe access.

## 4. Timer without cleanup

Creating an interval or timeout without clearing it can leave work running after the component is removed.

## 5. Local variable used as a persistent resource handle

A normal local variable is recreated on each render. A ref provides stable component-instance storage.

## 6. Ref used to hide an architectural problem

If multiple components need to coordinate application state, do not turn one component's ref into a hidden state-management system.

## 7. Ref used to silence effect dependencies

Do not replace correct synchronization with a latest-value ref merely to make a dependency warning disappear.

## 8. Imperative code during render

Do not manipulate the DOM, start timers, subscribe, or mutate external resources during render.

Use effects or event handlers.

## 9. Exposing too much through an imperative API

If a child exposes an imperative handle, expose the smallest useful API.

## 10. Confusing persistence with reactivity

A ref persists across renders, but React does not observe arbitrary ref mutations.

## 11. Copying old ref patterns blindly

React ref APIs have evolved. Understand the React version used by the project before choosing a ref-forwarding pattern.

## Code-review question

Whenever you see `useRef`, ask:

> Is this value intentionally non-reactive, or is the developer avoiding a render that the UI actually needs?
