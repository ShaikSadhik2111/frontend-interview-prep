# Day 24 Revision

## 30-second recall
- `useRef(initial)` -> stable object with `current`
- Same ref object survives renders
- Mutating `current` does not re-render
- Use refs for DOM handles and persistent non-visual mutable values
- Use state for values that affect JSX
- Cleanup timer/listener resources
- Avoid turning refs into a second state-management system

## Quick questions
1. Why does ref mutation not render?
2. Give three non-DOM ref use cases.
3. When would state be the correct choice?
4. How do you safely focus an input?
5. Why does a timer ID belong naturally in a ref?
6. How does the previous-value pattern work?
7. What makes an imperative API different from declarative props?

## Day completion checklist
- [ ] I can explain ref vs state without memorization.
- [ ] I can implement DOM focus.
- [ ] I can store a timer ID in a ref.
- [ ] I understand previous-value refs.
- [ ] I can identify misuse of refs in code review.
- [ ] I applied at least one pattern in the real project.
