// Exercise 1: Build a todo reducer.
// Actions: add, toggle, remove, clearCompleted.

type Todo = { id: number; text: string; completed: boolean };

type TodoAction =
  | { type: "add"; payload: Todo }
  | { type: "toggle"; payload: number }
  | { type: "remove"; payload: number }
  | { type: "clearCompleted" };

// Exercise 2: Build a request reducer:
// idle -> loading -> success/error.
//
// Exercise 3: Model a 3-step form:
// NEXT, PREVIOUS, SET_FIELD, RESET.
//
// Exercise 4: Decide useState vs useReducer for four examples
// and justify each decision.
