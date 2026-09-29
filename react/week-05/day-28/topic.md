# Day 28 — useEffect Deep Dive

## 1. What is an Effect?
useEffect synchronizes a component with something outside React's rendering calculation: browser APIs, subscriptions, timers, network synchronization and third-party widgets.

## 2. Mental model
React renders → commits the UI → runs Effect setup. When dependencies change, React cleans up the previous setup and runs the new setup. On unmount, cleanup runs.

## 3. Dependencies
Dependencies represent reactive values that determine the synchronization. Do not remove dependencies merely to stop reruns; redesign the Effect if its dependency model is wrong.

## 4. Cleanup
Cleanup reverses setup: remove event listeners, clear timers, unsubscribe, or abort obsolete work.

## 5. Strict Mode
In development, Strict Mode can intentionally perform an extra setup/cleanup cycle to expose missing cleanup or non-resilient Effects. Make setup and cleanup correct rather than hiding the behavior.

## 6. Stale closures
An Effect callback captures values from the render that created it. Incorrect dependencies can make later callbacks read old values. Functional state updates can often avoid stale state dependencies.

## 7. Async race conditions
Request A may start before request B but finish after it. Without cancellation or stale-result protection, old data can overwrite new data. AbortController is a standard fetch cancellation mechanism.

## 8. Derived state
If a value can be calculated from props/state during render, it usually should not be duplicated in state and synchronized with an Effect.

## 9. Event handlers
If behavior is directly caused by a user action such as a click or submit, use the event handler. Use Effects for external synchronization caused by rendering.

## Interview mental model
useEffect is for synchronizing React with external systems. Keep dependencies accurate, return cleanup, handle async cancellation, and avoid Effects for derived data or event-driven logic.
