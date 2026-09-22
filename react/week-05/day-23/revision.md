# Day 23 Quick Revision

- useEffect = synchronization with external systems.
- Rendering should calculate UI.
- Dependencies describe values affecting synchronization.
- Cleanup reverses setup.
- No dependency array: after every commit.
- []: mount synchronization; Strict Mode development caveat.
- [value]: re-synchronize when value changes.

Cleanup example:
```tsx
useEffect(() => {
  const id = setInterval(...);
  return () => clearInterval(id);
}, []);
```

Do not use an effect for derived values or direct event logic.

API checklist:
- loading
- error
- response.ok
- dependencies
- cancellation/race handling
- cleanup
- server-state library when appropriate

5-minute self-test:
1. What is an external system?
2. Why does cleanup run before dependency replacement?
3. Why can Strict Mode expose effect bugs?
4. Give a stale-closure example.
5. Give one case where useEffect is unnecessary.
