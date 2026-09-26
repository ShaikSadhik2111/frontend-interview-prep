# Day 26 — React useReducer

## Goal
Learn when related state transitions become complex enough that a reducer is clearer than scattered useState calls.

## Core model
dispatch(action) -> reducer(state, action) -> nextState -> render

A reducer is a pure function: (state, action) => nextState.

## Learn
- useReducer API and dispatch
- reducer purity and immutable updates
- action design
- lazy initialization
- reducer + Context
- useState vs useReducer
- useReducer vs Redux/Zustand
- testing reducer logic
- common mutation and side-effect mistakes

## Practical task
Choose one complex feature in your real project and model its state transitions as actions before deciding whether a reducer is justified.

## Checklist
- [ ] Write a reducer from scratch
- [ ] Explain action design
- [ ] Explain immutable nested updates
- [ ] Explain reducer + Context
- [ ] Complete exercises
- [ ] Answer interview questions
- [ ] Apply the decision process to a real feature
