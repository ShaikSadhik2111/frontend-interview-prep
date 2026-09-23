# Day 24 — useRef Deep Dive

## 1. Mental model

`useRef(initialValue)` returns a stable object:

```ts
{ current: initialValue }
```

React keeps the same ref object between renders. Updating `ref.current` does **not** schedule a render.

Use a ref when the value:
1. must persist between renders, and
2. changing it does not need to update the UI.

## 2. DOM refs

```tsx
const inputRef = useRef<HTMLInputElement>(null);

<input ref={inputRef} />

inputRef.current?.focus();
```

The ref is populated after the DOM node is mounted.

## 3. State vs ref

| Need | useState | useRef |
|---|---|---|
| Update should render UI | Yes | No |
| Value survives renders | Yes | Yes |
| Direct DOM/imperative access | No | Yes |
| Timer ID / mutable instance value | Usually no | Yes |

Rule: **If the UI must react to the change, use state. If the value is implementation detail and should persist silently, a ref may be appropriate.**

## 4. Previous value

A ref can remember a value from the previous render:

```tsx
const previousValue = useRef(value);

useEffect(() => {
  previousValue.current = value;
}, [value]);
```

During render, `previousValue.current` represents the value stored from the previous completed effect cycle.

## 5. Timers

Store interval/timeout IDs in refs so cleanup can access the current ID without causing renders.

## 6. Common mistakes

- Using a ref for data that must appear immediately in JSX.
- Reading or mutating refs during render when the operation has observable side effects.
- Assuming `ref.current` changes trigger React updates.
- Forgetting cleanup for timers/listeners.
- Using refs to bypass normal React data flow.
- Overusing imperative APIs.

## 7. forwardRef / imperative APIs

A parent may need to expose a controlled imperative operation such as `focus()` from a reusable component. In modern React, understand the ref-passing model used by the React version in the project; do not blindly copy old `forwardRef` patterns.

## Interview mental model

**State describes UI state. Ref stores mutable instance information that React does not need to render.**
