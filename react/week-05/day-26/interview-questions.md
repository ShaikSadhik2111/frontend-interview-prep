# Day 26 — useReducer Interview Questions with Answers

Read each question together with the answer. No separate answer research should be required.

## 1. What problem does useReducer solve?
**Answer:** useReducer centralizes complex state-transition logic into a reducer. It is useful when several related values change together or there are many meaningful transitions.

## 2. useState vs useReducer?
**Answer:** useState is usually simpler for straightforward state. useReducer is useful when state has multiple related fields, many transitions, or domain-style actions that are easier to reason about centrally.

## 3. What is a reducer?
**Answer:** A reducer is a pure function that receives the current state and an action and returns the next state.
```
(state, action) -> nextState
```

## 4. What makes a reducer pure?
**Answer:** It should produce the same result for the same inputs and should not mutate its arguments or perform side effects such as API calls, DOM operations or timers.

## 5. Why must reducer state be immutable?
**Answer:** Immutable updates make state transitions predictable and allow React and developers to reason about object identity. Instead of changing an existing array, return a new array using operations such as map, filter or spread.

## 6. What is dispatch?
**Answer:** dispatch sends an action to the reducer.
```tsx
dispatch({ type: "ADD_ITEM", payload: item });
```
The reducer then decides the next state.

## 7. Can a reducer perform an API call?
**Answer:** No. API calls are side effects. Keep them outside the reducer, usually in event handlers, effects or a dedicated data-fetching layer, and dispatch an action after the result is known.

## 8. What is a good reducer action?
**Answer:** A good action describes a meaningful event or transition and contains only the data needed to perform it.
```ts
{ type: "SUBMIT_SUCCESS", payload: result }
```
Avoid vague actions such as a generic SET_STATE when clearer domain actions are possible.

## 9. Why are TypeScript discriminated unions useful for reducer actions?
**Answer:** Each action type can define its own payload, allowing TypeScript to narrow the action correctly inside the reducer and catch invalid action shapes at compile time.

## 10. What is lazy initialization in useReducer?
**Answer:** Instead of directly passing the final initial state, you can pass an initializer function. React uses the initial argument and initializer to calculate the initial state.
```tsx
useReducer(reducer, input, initialize)
```
This is useful when initial state calculation is expensive or needs preprocessing.

## 11. Why combine Context with useReducer?
**Answer:** useReducer defines the state transitions, while Context makes the state and/or dispatch available to descendant components. This can be a useful bounded feature-state pattern.

## 12. Is useReducer a replacement for Redux or Zustand?
**Answer:** Not generally. useReducer is a React hook for component or feature state. Redux and Zustand are dedicated state-management solutions with broader application-level patterns and capabilities.

## 13. Does useReducer automatically improve performance?
**Answer:** No. useReducer primarily improves state organization and transition clarity. It does not automatically make rendering faster.

## 14. When is useReducer unnecessary?
**Answer:** When state is simple and updates are obvious. Introducing a reducer for one or two independent values can add ceremony without improving maintainability.

## 15. How do you update an array immutably in a reducer?
**Answer:** Return a new array rather than modifying the existing one.
```ts
return state.filter(item => item.id !== action.payload);
```
For an update:
```ts
return state.map(item =>
  item.id === id ? { ...item, completed: true } : item
);
```

## 16. How do you update nested state immutably?
**Answer:** Copy each object along the path that changes.
```ts
return {
  ...state,
  user: {
    ...state.user,
    profile: {
      ...state.user.profile,
      name: action.payload
    }
  }
};
```

## 17. How would you model loading, success and error?
**Answer:** Use explicit states and actions, for example:
```
idle -> loading -> success
             \-> error
```
Actions can be START, SUCCESS, ERROR and RESET. This makes impossible or unclear transitions easier to identify.

## 18. How would you test a reducer?
**Answer:** Test it as a pure function by providing a known state and action and asserting the returned state. This is simple because no DOM or network dependency is required.
```
expect(reducer(initialState, action)).toEqual(expectedState)
```

## 19. What is the benefit of keeping transition logic outside the component?
**Answer:** The component becomes more focused on rendering and dispatching events, while transition rules are centralized, reusable and easier to test.

## 20. What is the difference between an action and an event?
**Answer:** In reducer design they are often closely related. An action is the structured message passed to the reducer. A well-designed action usually represents a meaningful event such as SUBMIT_SUCCESS rather than a low-level UI operation.

## 21. How would you decide whether a real feature needs useReducer?
**Answer:** Inspect the state shape and transitions. If several related fields change together, there are many transition types, or the update rules are difficult to understand when scattered across handlers, useReducer may improve the design. If the state is simple, useState is usually clearer.

## 22. Scenario: a form has eight fields and validation, loading, success and error states. Would you automatically use useReducer?
**Answer:** No. The complexity may justify a reducer, but first consider the existing form library and architecture. If a reducer makes transitions clearer, use it; otherwise do not add it simply because the form is large.

## 23. Scenario: should fetch() be called inside the reducer?
**Answer:** No. The reducer must remain pure. Perform fetch outside the reducer and dispatch actions such as START, SUCCESS or ERROR based on the result.

## 24. Scenario: Context + useReducer is being used for the entire application. Is that automatically wrong?
**Answer:** No, but it deserves architectural review. Check state size, update frequency, subscription boundaries, testing and whether a dedicated state-management solution would provide clearer behavior.

## 25. Give a 30-second interview answer for useReducer.
**Answer:** "useReducer is a React hook for managing state through explicit actions and a pure reducer. I use it when related state has multiple transitions or when update logic becomes difficult to maintain with scattered useState calls. The reducer must remain pure and immutable. For a bounded feature, I can combine useReducer with Context to distribute state and dispatch, but I would not treat that combination as an automatic replacement for every state-management library."

## Quick self-test
Before marking Day 26 complete, explain:
1. useState vs useReducer
2. reducer purity
3. dispatch
4. action design
5. immutable updates
6. lazy initialization
7. Context + useReducer
8. reducer testing
9. useReducer vs Redux/Zustand
10. when a reducer is unnecessary
