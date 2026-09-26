# useReducer Deep Dive

## 1. Why useReducer?
useState is ideal for simple state. When many related values change together, transition logic can become scattered. A reducer centralizes valid state transitions.

## 2. Reducer purity
A reducer should not:
- mutate state
- fetch data
- touch the DOM
- call random/time-dependent APIs
- perform other side effects

Bad:
state.items.push(item); return state;

Good:
return { ...state, items: [...state.items, item] };

## 3. Actions
Prefer meaningful domain events:
{ type: "SUBMIT_START" }
{ type: "SUBMIT_SUCCESS", payload: result }
{ type: "SUBMIT_FAILURE", payload: error }

## 4. API
const [state, dispatch] = useReducer(reducer, initialState);

Lazy initialization:
const [state, dispatch] = useReducer(reducer, input, initialize);

## 5. Context + reducer
Context distributes a dependency to descendants. The reducer defines transitions. They solve different problems and can be combined for a bounded feature.

## 6. Decision rule
Use useReducer when state has several related fields, many transitions, domain events, or complex previous-state-dependent updates. Use useState when a reducer would only add ceremony.

## 7. Interview point
useReducer is a React hook, not a complete application state-management architecture.
