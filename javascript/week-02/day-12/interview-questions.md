# Todo App Interview Questions and Answers

## 1. How did you structure your components?

I would split the app into small, focused components:

- TodoApp: owns the main state and coordinates all the logic
- TodoForm: handles input, validation, and adding new todos
- TodoFilters: shows All, Active, and Completed buttons
- TodoList: renders the list of todos
- TodoItem: handles a single todo row with checkbox, edit, and delete actions
- TodoStats: shows counts like total, active, and completed

This is the same structure described in the architecture notes. The parent component owns the shared data, and child components just receive props and trigger callbacks. That makes the app easier to understand, test, and maintain.

## 2. Why does TodoApp own the todos state?

Because todos is the main source of truth of the application. Every feature depends on it:

- adding a todo
- deleting a todo
- toggling complete/incomplete
- filtering items
- showing counts

If the parent owns the list, then all the child components can use the same data consistently. In React, the component that owns the data is the one that decides when it changes.

## 3. Why didn't you store filteredTodos in state?

Because filteredTodos is derived data, not the original source of truth.

We already have:

- todos
- filter

From those two values, we can calculate filteredTodos at render time. If we store filteredTodos separately, then we create duplicate state and risk getting it out of sync with todos and filter.

This is exactly the pattern described in the notes:

- State: todos, filter
- Derived data: filteredTodos, activeCount, completedCount

The right pattern is:

```js
const filteredTodos = todos.filter(todo => {
  if (filter === 'active') return !todo.completed;
  if (filter === 'completed') return todo.completed;
  return true;
});
```

## 4. How do you update one todo without mutating state?

You never mutate the original array or object directly. Instead, you return a new array or a new object.

For example:

```js
setTodos(prev =>
  prev.map(todo =>
    todo.id === id ? { ...todo, completed: !todo.completed } : todo
  )
);
```

This keeps the state immutable. If we do direct mutation like `todo.completed = true`, React may not detect the change properly and the UI may not re-render.

## 5. How would you optimize 10,000 todos?

For a very large list, the main focus is reducing unnecessary rendering and expensive recalculation.

I would do:

- use memoized filtered results
- split large lists into smaller components
- use React.memo for list items if needed
- avoid re-rendering the whole list when only one item changes
- use virtualization for long lists so only visible items are rendered

For 10,000 todos, rendering the whole list in one pass can become slow, so virtualization or windowing is often the best solution.

## 6. When would you use React.memo?

I would use React.memo when a component is expensive to render and the props are mostly stable.

Example:

- TodoItem
- TodoFilters
- TodoStats

React.memo is helpful when a parent re-renders often but the child does not need to re-render if its props have not changed.

It is useful for performance optimization, but it should not be added blindly to every component.

## 7. When would you use useMemo?

I would use useMemo when a value is expensive to compute and depends on state or props.

For a todo app, good examples are:

- filteredTodos
- activeCount
- completedCount

Example:

```js
const filteredTodos = useMemo(() => {
  return todos.filter(todo => {
    if (filter === 'active') return !todo.completed;
    if (filter === 'completed') return todo.completed;
    return true;
  });
}, [todos, filter]);
```

This helps avoid recalculating the same filtered result on every render.

## 8. When would you use useCallback?

I would use useCallback when a function is passed as a prop to a child component and I want to keep the same function reference between renders.

Example:

```js
const toggleTodo = useCallback((id) => {
  setTodos(prev => prev.map(todo =>
    todo.id === id ? { ...todo, completed: !todo.completed } : todo
  ));
}, []);
```

This is especially useful when the child component is memoized with React.memo.

## 9. How would you persist todos?

I would persist todos using localStorage for a frontend-only app:

```js
useEffect(() => {
  localStorage.setItem('todos', JSON.stringify(todos));
}, [todos]);
```

Then on initial load:

```js
const savedTodos = JSON.parse(localStorage.getItem('todos') || '[]');
setTodos(savedTodos);
```

For production apps, I would prefer storing them in a backend database through an API.

## 10. How would you handle API integration?

I would keep the UI state in React and treat the server as the real source of truth.

Typical flow:

- fetch todos on initial render
- show loading state while fetching
- update state when the response arrives
- send add/update/delete requests when the user interacts
- handle error cases properly

Example responsibilities:

- GET /todos
- POST /todos
- PATCH /todos/:id
- DELETE /todos/:id

This keeps the app clean and makes it easier to switch between mock data and real API data.

## 11. How would you handle loading and error states?

I would keep explicit state like:

- isLoading
- error

Example:

```js
const [isLoading, setIsLoading] = useState(true);
const [error, setError] = useState(null);
```

Flow:

- while loading, show a spinner or placeholder
- if fetch fails, show an error message
- after success, render the list
- for add/edit/delete requests, disable buttons or show pending state

This improves UX and makes the app feel stable.

## 12. How would you make this component accessible?

I would make sure:

- the input has a proper label
- buttons are keyboard accessible
- checkboxes are used correctly for completion state
- edit/delete actions have clear labels
- focus is managed when entering edit mode
- error and status messages are announced with aria-live

For example:

```jsx
<label htmlFor="todo-input">Add todo</label>
<input id="todo-input" ... />
<button type="submit">Add</button>
```

This makes the app usable for keyboard and screen-reader users.

## 13. How would you test this application?

I would test it in layers:

1. Unit tests
   - addTodo logic
   - deleteTodo logic
   - toggleTodo logic
   - filter logic

2. Component tests
   - render the app
   - add a todo
   - toggle completed state
   - delete a todo
   - check empty state

3. End-to-end tests
   - user flow from start to finish
   - filter by Active and Completed
   - verify counts update correctly

Tools I would use:

- React Testing Library
- Jest or Vitest
- Playwright for E2E testing

The key is to test real user behavior, not implementation details.

## 14. How would you prevent unnecessary re-renders?

I would avoid unnecessary renders by:

- keeping state as close as possible to where it is used
- avoiding inline object creation in render when not needed
- using useMemo for expensive derived values
- using useCallback for functions passed to memoized children
- memoizing expensive child components with React.memo
- splitting components so they only re-render when necessary

This keeps the app responsive, especially when the list grows large.

## 15. How would you split this application if it became much larger?

I would split it by feature and responsibility.

For example:

- AppShell
- TodoDashboard
- TodoForm
- TodoList
- TodoItem
- TodoFilters
- TodoStats
- useTodos hook
- todoService for API logic
- utility functions for filtering and validation

This keeps each part smaller and easier to maintain. The same approach matches the architecture notes: create/manage/filter responsibilities should stay separate.

## Final summary

The best way to think about this app is:

- TodoApp owns the real state
- filters and counts are derived from that state
- updates use immutable patterns
- components stay focused and small
- performance improvements come from memoization and careful rendering

This is exactly the architecture approach described in the notes and is a strong answer for React interviews.

---

### Short interview version

A clean Todo app structure is: TodoApp owns the state, TodoForm adds tasks, TodoList renders tasks, TodoItem handles checkbox/edit/delete, and TodoFilters controls view mode. I would not store filteredTodos in state because it is derived from todos + filter, and storing it would cause duplication and syncing bugs. For updates, I use immutable updates with setTodos(prev => prev.map(...)). For large lists, I would optimize with memoization, virtualization, and React.memo. I would persist data with localStorage or a backend API, handle loading and error states explicitly, and make the app accessible with labels, keyboard support, and screen-reader-friendly status messages. I would test real user flows using React Testing Library and Playwright.
