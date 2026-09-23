# Day 24 Quick Revision — useRef

## 60-second summary

- `useRef(initial)` returns a stable object.
- Read/write through `.current`.
- The same ref object survives renders.
- Mutating `.current` does not schedule a render.
- Use refs for DOM handles and persistent imperative/mutable values.
- Use state for values that drive JSX.
- Pair resource refs with effect setup/cleanup.
- Refs can help with previous values and stable resource handles.
- Refs are an escape hatch, not a replacement for application state.

## State vs ref

```text
useState
change
  ↓
render
  ↓
UI updates

useRef
change current
  ↓
no automatic render
```

## 5-minute self-test

1. What exactly does `useRef` return?
2. Why doesn't `ref.current = x` render?
3. When should state be used instead?
4. Name four non-DOM ref use cases.
5. How do you safely focus an input?
6. How does the previous-value pattern work?
7. Why does a timer handle fit naturally in a ref?
8. What makes refs an escape hatch?
9. How would you manage a chart instance?
10. What is a common misuse of refs?

## Interview coding checklist

Be able to implement from memory:

- focus an input
- select input text
- timer/interval handle
- previous-value hook
- scroll to an element
- external resource handle + cleanup

## Production checklist

Before adding a ref:

- [ ] Does this value affect JSX?
- [ ] Does it need to persist across renders?
- [ ] Does changing it need to trigger rendering?
- [ ] Is it an imperative DOM/browser/library handle?
- [ ] Who owns cleanup?
- [ ] Am I hiding application state in a ref?

## Cross-track reminder

Day 24 is not complete by React alone.

- [ ] React useRef session
- [ ] DSA session
- [ ] AI session
- [ ] Production project application
- [ ] Interview/revision
- [ ] GitHub notes
