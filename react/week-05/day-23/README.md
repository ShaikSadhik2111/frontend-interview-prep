# Day 23 — React useEffect & Side Effects

## Goal
Understand React effects deeply: side effects, dependency arrays, cleanup, API requests, stale closures, race conditions, and unnecessary effects.

## Today's schedule
- Frontend: 1.5 hours
- DSA: 1.5 hours — Arrays & Big-O foundation
- AI: 45 minutes — LLM/API fundamentals
- Interview: 45 minutes
- Revision/GitHub: 30 minutes

## Learning outcomes
- Explain what an effect is and why it is separate from rendering.
- Explain dependency-array behavior.
- Write cleanup correctly.
- Identify unnecessary effects.
- Avoid dependency loops and stale closures.
- Explain API-fetching concerns in production.
- Answer useEffect interview questions confidently.

## Files
- topic.md — deep theory
- basics.tsx — line-by-line fundamentals
- examples.tsx — practical examples
- exercises.tsx — exercises and reference solutions
- interview-questions.md — interview Q&A
- revision.md — quick revision
- mistakes.md — common mistakes

## Real-project practice
In your company React project, identify one genuine side effect such as an API request, subscription, timer, event listener, or document-title update. Trace what triggers it, its dependencies, cleanup, unmount behavior, and whether the effect is actually necessary.

Do not add an artificial effect just for practice.

## Completion checklist
- [ ] Read topic.md line by line.
- [ ] Trace every example.
- [ ] Solve exercises before reading solutions.
- [ ] Implement one relevant pattern in the real project.
- [ ] Answer interview questions aloud.
- [ ] Review revision.md and mistakes.md.
