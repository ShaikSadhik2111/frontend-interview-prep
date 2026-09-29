# Day 28 — useEffect Interview Questions

## 1. What is useEffect?
**Answer:** useEffect synchronizes React with an external system after the component commits.

## 2. What is an external system?
**Answer:** Browser APIs, timers, subscriptions, network synchronization and third-party widgets are common examples.

## 3. What does the dependency array do?
**Answer:** It describes reactive values that determine the synchronization. When dependencies change, cleanup runs and the new setup runs.

## 4. What does cleanup do?
**Answer:** It reverses the external synchronization: remove listeners, clear timers, unsubscribe or abort obsolete work.

## 5. What is a stale closure?
**Answer:** A callback captures values from the render that created it. Incorrect dependencies can make it keep using older values.

## 6. How do you fix a stale interval?
**Answer:** Use a functional state update such as setCount(current => current + 1), or correctly synchronize the changing value.

## 7. Why shouldn't derived data usually use an Effect?
**Answer:** It duplicates state and can create an extra render. Calculate derived data during render.

## 8. Event handler vs Effect?
**Answer:** User-action behavior belongs in the event handler. External synchronization caused by rendering belongs in an Effect.

## 9. How do you prevent stale search results?
**Answer:** Cancel obsolete requests with AbortController or guard against outdated responses.

## 10. What happens with Strict Mode?
**Answer:** In development React can intentionally perform an extra setup/cleanup cycle to expose missing cleanup. It is not a production guarantee of double execution.

## 11. Should you remove dependencies to stop reruns?
**Answer:** No. Fix the synchronization design instead. Missing dependencies can create stale values and bugs.

## 12. useEffect vs useLayoutEffect?
**Answer:** useEffect is the default post-commit synchronization tool. useLayoutEffect runs after DOM mutations and before paint and is mainly for layout measurement or visual adjustment.

## 13. Can the Effect callback itself be async?
**Answer:** Do not make the callback async because React expects cleanup or nothing as its return. Define an async function inside the Effect instead.

## 14. How do you debug an Effect that runs too often?
**Answer:** Inspect dependencies, identify which value changes, and first verify whether the Effect is necessary.

## 15. 30-second answer
**Answer:** useEffect synchronizes React with external systems. I keep dependencies accurate, return cleanup, handle async cancellation, and avoid Effects for derived data or event-driven logic.
