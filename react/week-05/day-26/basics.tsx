import { useReducer } from "react";

type State = {
  count: number;
  status: "idle" | "saving" | "saved";
};

type Action =
  | { type: "increment" }
  | { type: "decrement" }
  | { type: "save-start" }
  | { type: "save-success" };

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "increment":
      return { ...state, count: state.count + 1 };
    case "decrement":
      return { ...state, count: state.count - 1 };
    case "save-start":
      return { ...state, status: "saving" };
    case "save-success":
      return { ...state, status: "saved" };
    default:
      return state;
  }
}

export function ReducerExample() {
  const [state, dispatch] = useReducer(reducer, { count: 0, status: "idle" });

  return (
    <section>
      <p>Count: {state.count}</p>
      <p>Status: {state.status}</p>
      <button onClick={() => dispatch({ type: "decrement" })}>-</button>
      <button onClick={() => dispatch({ type: "increment" })}>+</button>
      <button onClick={() => dispatch({ type: "save-start" })}>Save</button>
      <button onClick={() => dispatch({ type: "save-success" })}>Finish</button>
    </section>
  );
}
