# Day 25 — React Context API

## Four-track day

| Track | Focus |
|---|---|
| React | Context API / useContext |
| DSA | Two Pointers |
| AI | OpenAI API and production integration |
| Production Project | Apply the concepts in the real project |

## Schedule

Morning 1.5h: DSA.

Evening 7:00–11:30 PM:
- 7:00–8:30 React Context
- 8:30–9:30 Production project
- 9:30–10:15 AI API integration
- 10:15–11:00 Interview + revision
- 11:00–11:30 GitHub + mistakes

## React goal

Understand Context as a dependency-distribution mechanism, not as a replacement for every piece of state management.

By the end explain:
1. What problem Context solves.
2. createContext, Provider and useContext.
3. Why Context can cause consumer re-renders.
4. Context splitting.
5. Props vs Context.
6. Context vs a dedicated state library.
7. How to test Context consumers.
8. Why Provider value identity matters.

## Core mental model

Props explicitly pass a dependency through a component tree. Context allows descendants to read a value from the nearest matching Provider without threading that value through every intermediate component.

Context does not remove the need for state ownership or architecture.

## Time-saving method

Read topic.md, predict examples before reading explanations, attempt exercises, compare with reference solutions, then implement one legitimate pattern in the real project. Do not create another tutorial application.

## Production rule

Good Context candidates include authentication/session information, locale, theme and feature configuration. Do not put rapidly changing local form state into a broad Context merely to avoid passing props.

## Completion checklist

- [ ] React theory and examples completed
- [ ] Exercises attempted
- [ ] Interview questions answered without notes
- [ ] One Context decision made in the real project
- [ ] DSA two-pointer problems solved
- [ ] AI API trust-boundary concepts understood
- [ ] Mistakes and revision notes updated
- [ ] Day 25 committed and pushed
