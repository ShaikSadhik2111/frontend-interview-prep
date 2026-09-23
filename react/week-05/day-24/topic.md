# Day 24 — useRef Deep Dive

## 1. Mental model

React state is reactive: changing state schedules another render.

A ref is different:

```tsx
const valueRef = useRef(initialValue);
```

Conceptually:

```ts
{ current: initialValue }
```

React keeps the same ref object for the lifetime of the component instance.

Changing:

```ts
valueRef.current = nextValue;
```

does **not** schedule a render.

The core mental model is:

> **State is reactive data for rendering. A ref is persistent mutable storage for values React does not need to render.**

## 2. Why useRef exists

A component sometimes needs information that:

- must survive between renders,
- must be mutable,
- does not need to trigger rendering,
- or represents an imperative resource.

Examples:
- DOM nodes
- timer IDs
- subscription handles
- WebSocket instances
- previous values
- third-party library instances

## 3. useRef vs useState

| Requirement | useState | useRef |
|---|---|---|
| Persists across renders | Yes | Yes |
| Change schedules render | Yes | No |
| Appropriate for visible UI | Yes | Usually no |
| DOM node reference | No | Yes |
| Timer/resource handle | Usually no | Yes |
| Previous value | Possible | Common |
| Declarative data flow | Yes | No |

Decision rule:

```text
Does changing the value need to update JSX?
        |
       Yes -> useState
        |
       No
        |
Does the value need to persist across renders?
        |
       Yes -> useRef may fit
```

## 4. DOM references

```tsx
const inputRef = useRef<HTMLInputElement>(null);

<input ref={inputRef} />

inputRef.current?.focus();
```

Lifecycle:

1. Initial render: `inputRef.current` is `null`.
2. React commits the DOM.
3. React assigns the DOM node to `current`.
4. Event handlers/effects can use the node.
5. On unmount, React clears the DOM ref.

Use DOM refs for imperative operations such as:

- focus
- select text
- scroll
- measurement
- media controls
- integration with DOM-based libraries

## 5. TypeScript typing

For a DOM element:

```tsx
const inputRef = useRef<HTMLInputElement>(null);
const buttonRef = useRef<HTMLButtonElement>(null);
const containerRef = useRef<HTMLDivElement>(null);
```

Because the node can be unavailable, use optional chaining:

```tsx
inputRef.current?.focus();
```

For a timer:

```tsx
const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
```

For custom mutable data:

```tsx
const requestIdRef = useRef<number | null>(null);
```

## 6. Ref mutation does not render

Consider:

```tsx
const countRef = useRef(0);

function increment() {
  countRef.current += 1;
}
```

The value changes, but JSX does not automatically update.

If the UI needs:

```text
Count: 1
Count: 2
Count: 3
```

use state instead.

This is one of the most important interview distinctions.

## 7. Previous-value pattern

A common pattern is:

```tsx
function Example({ value }: { value: string }) {
  const previous = useRef<string | undefined>(undefined);

  useEffect(() => {
    previous.current = value;
  }, [value]);

  return (
    <p>
      Previous: {previous.current ?? "none"}
      Current: {value}
    </p>
  );
}
```

Why it works:

1. Render happens with the current value.
2. The ref still contains the previous stored value.
3. The effect runs after commit.
4. The ref is updated to the current value.
5. On the next render, it represents the previous committed value.

## 8. Timer handles

A timer ID is implementation data, not normally UI state.

```tsx
const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

function start() {
  if (timerRef.current) {
    clearTimeout(timerRef.current);
  }

  timerRef.current = setTimeout(() => {
    timerRef.current = null;
  }, 1000);
}
```

If the timer affects UI, keep the displayed value in state. Keep the timer handle in the ref.

## 9. Ref + effect = resource lifecycle

A common production pattern is:

```text
effect
  ↓
create external resource
  ↓
store imperative handle in ref
  ↓
use resource
  ↓
cleanup
  ↓
clear/dispose resource
```

Examples:
- interval
- event subscription
- WebSocket
- media player
- chart library instance
- map library instance

The ref stores the handle. The effect owns the lifecycle.

## 10. Latest-value refs and stale callbacks

Sometimes a long-lived callback needs access to the latest value.

```tsx
const latestValue = useRef(value);

useEffect(() => {
  latestValue.current = value;
}, [value]);
```

A callback can then read:

```tsx
latestValue.current
```

This can be useful for imperative integrations, but it should not be used automatically to silence dependency problems.

First ask:

1. Is this actually an external synchronization?
2. Can the callback be recreated with correct dependencies?
3. Can a functional state updater solve it?
4. Is a ref genuinely required because the callback/resource must remain stable?

## 11. useRef does not fix every stale-closure problem

Bad reasoning:

> "I have a stale closure, so I'll put everything in a ref."

A ref can provide mutable latest data, but it also creates an imperative data path.

Prefer the simplest correct solution:
- functional updater when updating state from previous state
- correct effect dependencies
- redesign the effect
- ref only when a stable imperative callback/resource genuinely requires it

## 12. Render purity

Avoid observable side effects during render.

Do not use render to:
- manipulate the DOM
- start timers
- subscribe to events
- make network requests
- mutate external objects

Use event handlers/effects for those operations.

A ref can be read during render for some legitimate patterns, but that does not make arbitrary mutation during render safe.

## 13. forwardRef and imperative APIs

Reusable components sometimes need to expose a small imperative API.

Example concept:

```tsx
type InputHandle = {
  focus: () => void;
};
```

An imperative API lets the parent say:

```text
focus()
```

instead of exposing internal implementation details.

When working in a real codebase, use the ref-passing API appropriate to that React version. Older React code commonly uses `forwardRef`; newer React versions have updated ref-passing capabilities.

For controlled imperative surfaces, `useImperativeHandle` can expose only the operations the parent needs.

## 14. Ref as an escape hatch

React's preferred model is:

```text
props/state
    ↓
render
    ↓
UI
```

A ref creates an imperative boundary:

```text
React component
      ↓
  ref.current
      ↓
DOM / browser / external library
```

That is useful, but should remain local and intentional.

## 15. Common production mistakes

### Mistake 1 — Ref for visible state

If the user sees the value, state is usually the correct model.

### Mistake 2 — Expecting ref mutation to re-render

```tsx
countRef.current++;
```

does not update JSX.

### Mistake 3 — Forgetting nullability

A DOM ref may be `null` before mount or after unmount.

### Mistake 4 — Forgetting cleanup

If a ref stores a timer/subscription/resource handle, dispose it in the owning lifecycle.

### Mistake 5 — Using refs to bypass architecture

Do not turn refs into hidden global state or a replacement for props/state.

### Mistake 6 — Using a ref to silence dependency problems

A ref should solve a real persistence/imperative requirement, not hide an incorrect effect design.

## 16. Interview mental model

A strong answer:

> `useRef` returns a stable mutable object whose `current` value persists across renders without causing a render when changed. I use refs for DOM handles and persistent imperative values such as timer IDs or external instances. If a value affects rendered UI, I use state instead.

## 17. Decision checklist

Before adding a ref:

1. Does this value affect rendered output?
2. If yes, why isn't state appropriate?
3. Must the value persist across renders?
4. Does changing it need to trigger a render?
5. Is it a DOM/browser/library handle?
6. Who owns setup?
7. Who owns cleanup?
8. Am I hiding application state in a ref?
9. Can a declarative solution be simpler?
