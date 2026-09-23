# Day 24 Interview Questions — useRef

## 1. What is useRef?

`useRef` returns a stable mutable object with a `current` property. React preserves the ref object across renders, and changing `current` does not trigger a render.

## 2. useRef vs useState?

State is reactive data: changing it schedules rendering. A ref is persistent mutable storage for information React does not need to render.

## 3. Why doesn't ref.current trigger a render?

React does not treat direct mutation of `current` as a state update. The ref object's identity remains stable.

## 4. Why are refs useful for DOM nodes?

DOM operations such as focus, selection, scroll and measurement are imperative. A ref gives controlled access to the committed DOM node.

## 5. What happens to a DOM ref before mount and after unmount?

It can be `null`. Code should handle that with appropriate lifecycle timing and null checks.

## 6. Give three non-DOM uses for useRef.

Timer IDs, subscription/resource handles, previous values, external library instances, and latest mutable values are common examples.

## 7. Why should a timer ID normally be stored in a ref?

The ID must survive renders and be available for cleanup, but changing the ID does not need to update the UI.

## 8. Why not store elapsed seconds in a ref?

If elapsed seconds are displayed, the UI needs to re-render when the value changes. That makes state the appropriate reactive model.

## 9. What is the previous-value pattern?

Keep a ref, update it in an effect after the current value is committed, and read it during the next render as the previous value.

## 10. What is a stale closure?

A callback can retain values from the render that created it. A ref can sometimes expose a latest mutable value to a stable callback, but correct dependencies or a better design should be considered first.

## 11. Can useRef fix every stale-closure problem?

No. It is an escape hatch, not a replacement for correct dependency management or state design.

## 12. What is an imperative API?

An API where the caller commands an operation such as `focus()` rather than only supplying declarative data.

## 13. What is useImperativeHandle?

It allows a component to customize the imperative value exposed through a ref, so a parent can access a small public API rather than internal implementation details.

## 14. What is forwardRef?

It is the established React pattern for forwarding a ref through a component to a child DOM node or component. Know the version-specific ref API in the project you are working on.

## 15. Should you mutate refs during render?

Avoid observable side effects and DOM manipulation during render. Keep render pure; use event handlers/effects for imperative work.

## 16. What does "ref as an escape hatch" mean?

React is declarative, but some browser and library APIs are imperative. A ref provides a controlled bridge to those APIs.

## 17. How do refs and effects work together?

The effect owns setup/cleanup of an external resource; the ref can hold the resource's imperative handle across renders.

## 18. Interview scenario: modal opens and input must focus.

Use a DOM ref for the input and focus it from an effect tied to the modal's mounted/open lifecycle.

## 19. Interview scenario: selected customer must appear in the UI.

Use state, not a ref. The selected customer is rendered data, so the update needs to trigger rendering.

## 20. Interview scenario: chart library instance.

Keep the library instance in a ref, initialize/destroy it in an effect, and use state/props for values that should drive the React UI.

## 21. One-sentence answer

> State is React's reactive UI model; useRef is persistent mutable storage for values React does not need to render.

## Strong interview answer

> I use useRef when I need a stable value across renders without causing re-renders, especially for DOM handles, timer IDs, subscriptions, or imperative library instances. If the value affects rendered output, I keep it in state instead.
