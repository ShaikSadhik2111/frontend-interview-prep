# Day 23 — useEffect & Side Effects

## 1. Mental model
React rendering should be treated as a calculation: UI = f(props, state). Rendering describes UI. A side effect interacts with something outside React: network requests, timers, subscriptions, browser APIs, or third-party widgets.

## 2. What is useEffect?
`useEffect(setup, dependencies?)` is used to synchronize a component with an external system. The setup runs after React commits. A setup function may return cleanup.

```tsx
useEffect(() => {
  // synchronize with an external system
  return () => {
    // undo synchronization
  };
}, [dependencies]);
```

The key word is **synchronization**, not simply "run code after render."

## 3. Dependency forms

### No dependency array
```tsx
useEffect(() => {
  console.log("after every commit");
});
```
Runs after every commit. Rarely appropriate for ordinary application logic.

### Empty array
```tsx
useEffect(() => {
  console.log("after mount");
}, []);
```
The effect setup runs after mount and cleanup runs when it is removed. Development Strict Mode can intentionally exercise setup/cleanup more than once.

### Dependencies
```tsx
useEffect(() => {
  console.log(userId);
}, [userId]);
```
The synchronization is repeated when `userId` changes.

## 4. Cleanup
If setup creates a resource that must be stopped, return cleanup.

```tsx
useEffect(() => {
  const timerId = window.setInterval(() => {
    console.log("tick");
  }, 1000);

  return () => window.clearInterval(timerId);
}, []);
```

Lifecycle concept:
1. Render and commit.
2. Effect setup runs.
3. If dependencies change, previous cleanup runs before the new setup.
4. On unmount, final cleanup runs.

## 5. Effects are not event handlers
If something happens because a user clicked Save, the save operation normally belongs in the submit/click handler. Do not create state solely to trigger an effect for that event.

## 6. Avoid derived-state effects
Bad:
```tsx
useEffect(() => {
  setFullName(`${firstName} ${lastName}`);
}, [firstName, lastName]);
```

Better:
```tsx
const fullName = `${firstName} ${lastName}`;
```

If a value can be calculated from existing props/state during render, it normally does not need an effect.

## 7. API fetching
A basic client-side request can be synchronized to an ID:

```tsx
useEffect(() => {
  const controller = new AbortController();

  async function loadUser() {
    const response = await fetch(`/api/users/${userId}`, {
      signal: controller.signal,
    });
    if (!response.ok) throw new Error("Request failed");
    const data = await response.json();
    setUser(data);
  }

  loadUser().catch(handleError);
  return () => controller.abort();
}, [userId]);
```

Production concerns include loading state, errors, cancellation, race conditions, caching, retries, and stale data. A server-state library such as TanStack Query can handle many of these concerns.

## 8. Race conditions
If ID A starts a request, then ID B starts another request, A may finish after B and overwrite the newer result. Abort obsolete requests or ignore obsolete results.

## 9. Stale closures
An effect callback closes over values from its render. A long-lived callback can therefore read an older value if the effect does not re-synchronize when that value changes.

```tsx
useEffect(() => {
  const id = window.setInterval(() => console.log(count), 1000);
  return () => window.clearInterval(id);
}, []);
```

This callback captures the value from the render that created the effect. Fixes depend on the requirement: include the value in dependencies, use a functional updater for state updates, use a ref for a mutable latest value, or redesign the synchronization.

## 10. Infinite loops
This is dangerous:
```tsx
useEffect(() => {
  setItems(createItems());
}, [items]);
```
The effect changes a dependency that causes it to run again. Ask why the effect needs to update the state it depends on.

## 11. Strict Mode
Development Strict Mode can run an extra setup/cleanup cycle to reveal effects that do not correctly clean up. Do not hide this with a ref flag; make setup and cleanup symmetrical.

## 12. Decision checklist
Before adding an effect ask:
1. Am I synchronizing with an external system?
2. Could this be calculated during render?
3. Could this happen in an event handler?
4. What reactive values does the effect read?
5. What should happen when those values change?
6. What needs cleanup?
7. Can requests race?
8. Would a server-state library be more appropriate?

## Interview mental model
A strong answer is more than "useEffect runs after render":
> useEffect synchronizes React with an external system. React runs setup after commit, re-synchronizes when dependencies change, and runs cleanup before replacing the synchronization and when the component is removed. It should not be used for values that can be derived during render or direct user-event logic.
