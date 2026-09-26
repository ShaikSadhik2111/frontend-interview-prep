type Todo = { id: number; text: string; completed: boolean };

type TodoAction =
  | { type: "add"; payload: Todo }
  | { type: "toggle"; payload: number }
  | { type: "remove"; payload: number }
  | { type: "clearCompleted" };

export function todoReducer(state: Todo[], action: TodoAction): Todo[] {
  switch (action.type) {
    case "add":
      return [...state, action.payload];
    case "toggle":
      return state.map(todo =>
        todo.id === action.payload
          ? { ...todo, completed: !todo.completed }
          : todo
      );
    case "remove":
      return state.filter(todo => todo.id !== action.payload);
    case "clearCompleted":
      return state.filter(todo => !todo.completed);
    default:
      return state;
  }
}

type RequestState<T> =
  | { status: "idle"; data: null; error: null }
  | { status: "loading"; data: null; error: null }
  | { status: "success"; data: T; error: null }
  | { status: "error"; data: null; error: string };

type RequestAction<T> =
  | { type: "START" }
  | { type: "SUCCESS"; payload: T }
  | { type: "ERROR"; payload: string }
  | { type: "RESET" };

export function requestReducer<T>(
  state: RequestState<T>,
  action: RequestAction<T>
): RequestState<T> {
  switch (action.type) {
    case "START":
      return { status: "loading", data: null, error: null };
    case "SUCCESS":
      return { status: "success", data: action.payload, error: null };
    case "ERROR":
      return { status: "error", data: null, error: action.payload };
    case "RESET":
      return { status: "idle", data: null, error: null };
  }
}
