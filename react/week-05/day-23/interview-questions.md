# Day 23 Interview Questions — useEffect

## 1. What is useEffect?
A Hook for synchronizing a component with an external system. Setup runs after commit and may return cleanup. Dependencies determine when synchronization is repeated.

## 2. Does useEffect run after every render?
No. No dependency array means after every commit; [] means mount synchronization with development Strict Mode caveats; dependencies mean re-synchronization when dependencies change.

## 3. What is the dependency array?
It describes reactive values used by the effect that determine when the synchronization must be restarted.

## 4. Why is cleanup needed?
To release resources created by setup: timers, subscriptions, listeners, connections, or obsolete async work.

## 5. What happens when a dependency changes?
Previous cleanup runs, then the new setup runs.

## 6. Why shouldn't derived data normally use useEffect?
It creates redundant state and an extra render/effect cycle. Calculate derived values during render.

## 7. How can useEffect cause an infinite loop?
An effect can update state that changes one of its dependencies, causing the effect to run again.

## 8. What is a stale closure?
An effect callback closes over values from its render. A long-lived callback can therefore keep using an older value if the effect does not re-synchronize.

## 9. How do you prevent stale state in a timer?
Use a functional updater when the next state depends on previous state. If the callback must read changing values, include the value as a dependency or use an appropriate ref/design.

## 10. How do you handle fetch cancellation?
Use AbortController and abort in cleanup; handle AbortError separately.

## 11. Can the useEffect callback itself be async?
Do not make the effect callback return a Promise. Define an async function inside the effect and call it.

## 12. Why can Strict Mode appear to run effects twice?
Development Strict Mode can intentionally perform an extra setup/cleanup cycle to expose cleanup bugs.

## 13. When should you NOT use useEffect?
For derived values, direct event actions, or redundant synchronization between React state values.

## 14. useEffect vs event handler?
An event handler represents a specific interaction. An effect synchronizes the component with an external system as a consequence of rendering/state changes.

## 15. Explain useEffect in one sentence.
"useEffect synchronizes React with an external system and re-synchronizes it when its dependencies change."

## Scenario
Old results appear after rapidly switching IDs. Strong answer: investigate request races; request A may finish after B and overwrite B. Use AbortController or ignore obsolete results, ensure the ID is a dependency, and consider TanStack Query for production server state.
