# Day 26 Revision

## 30-second answer
useReducer manages state through explicit actions and a pure reducer.

## Mental model
dispatch(action)
-> reducer(state, action)
-> nextState
-> render

## useState
Simple and direct state updates.

## useReducer
Complex related transitions and domain-style actions.

## Context
Dependency distribution.

## Together
Context + useReducer can form a bounded feature-state pattern.

## Golden rule
Reducers calculate state. They do not perform side effects.
