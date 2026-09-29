# Day 28 — useEffect Deep Dive

## Goal
Understand when an Effect is needed, how dependencies and cleanup work, and how to avoid common Effect anti-patterns.

## Topics
- Render → commit → effect mental model
- Dependency arrays
- Cleanup
- Timers, listeners and subscriptions
- Strict Mode development behavior
- Stale closures
- Async race conditions and AbortController
- Derived state vs Effects
- Event handlers vs Effects
- When NOT to use useEffect

## Core mental model
render → commit → setup → dependency change/unmount → cleanup → next setup

An Effect synchronizes React with an external system. It is not a general-purpose place for calculations or event handling.

## Completion
- [ ] Explain dependencies and cleanup.
- [ ] Identify stale closures.
- [ ] Handle async races.
- [ ] Explain Strict Mode.
- [ ] Identify unnecessary Effects.
