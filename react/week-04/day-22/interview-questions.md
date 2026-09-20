# Day 22 Interview Questions

1. What is state in React?
2. What is useState?
3. What happens when state changes?
4. State vs props?
5. Why should React state not be mutated directly?
6. When should you use a functional state update?
7. What is a controlled component?
8. How do you type an input change event?
9. How do you type a form submit event?
10. Why is preventDefault used in forms?
11. How do you update an object in state?
12. How do you add an item to an array in state?
13. How do you delete an item from an array in state?
14. How do you update one object inside an array?
15. What is lifting state up?
16. How can a child update state owned by its parent?
17. What is derived state?
18. Why should stable IDs be used as React keys?
19. What causes controlled/uncontrolled input warnings?
20. Why should state setters not be called during render?

## Key answers

### Functional update
```tsx
setCount((current) => current + 1);
```

### Controlled input
```tsx
<input value={name} onChange={(event) => setName(event.target.value)} />
```

### Immutable array update
```tsx
setUsers((current) => current.filter((user) => user.id !== id));
```

### Child to parent
The parent passes a callback as a prop; the child calls it in response to an event.

### Derived state
Prefer calculating values such as counts from existing state rather than storing duplicate state.


<!-- interview question answers -->

## Answers

### 1. What is state in React?

State is data owned by a component that can change over time. When state changes, React renders the component again so the UI reflects the new value.

Examples include an input value, a counter, whether a modal is open, or a list of users.

### 2. What is `useState`?

`useState` is a React Hook that gives a function component a state value and a setter function.

```tsx
const [count, setCount] = useState(0);
```

`count` is the current value, and `setCount` requests an update. The initial value is used during the first render.

### 3. What happens when state changes?

React schedules a re-render of the component. During the next render, React calls the component again with the new state value and updates the necessary parts of the DOM.

The state variable does not change immediately inside the same event handler. The new value is available during the next render.

### 4. State vs props?

Props are read-only values passed from a parent to a child. State is data managed by the component that owns it and changed through a state setter.

Props configure a component; state records changing information. A child should not mutate either props or a parent's state directly.

### 5. Why should React state not be mutated directly?

Direct mutation changes an existing object or array without giving React a new reference. React may not detect the change correctly, and mutation can create stale or inconsistent UI.

```tsx
// Incorrect
users.push(newUser);

// Correct
setUsers((currentUsers) => [...currentUsers, newUser]);
```

Immutable updates also make changes easier to reason about and undo.

### 6. When should you use a functional state update?

Use a functional update when the next state depends on the previous state. It is especially useful when multiple updates may be batched or happen close together.

```tsx
setCount((current) => current + 1);
```

For example, two functional updates correctly increment the count twice:

```tsx
setCount((current) => current + 1);
setCount((current) => current + 1);
```

### 7. What is a controlled component?

A controlled component is a form element whose value is controlled by React state. The state supplies `value` or `checked`, and `onChange` updates that state.

```tsx
<input
	value={name}
	onChange={(event) => setName(event.target.value)}
/>
```

This makes validation, clearing, disabling, and submitting the form predictable.

### 8. How do you type an input change event?

Use `ChangeEvent` from React and provide the correct HTML element type.

```tsx
import type { ChangeEvent } from "react";

function handleChange(event: ChangeEvent<HTMLInputElement>) {
	setName(event.target.value);
}
```

Use `HTMLSelectElement` for a `<select>` and `HTMLTextAreaElement` for a `<textarea>`.

### 9. How do you type a form submit event?

Use `FormEvent<HTMLFormElement>` from React.

```tsx
import type { FormEvent } from "react";

function handleSubmit(event: FormEvent<HTMLFormElement>) {
	event.preventDefault();
	// Submit the form values here.
}
```

### 10. Why is `preventDefault` used in forms?

Browser forms normally submit by navigating or reloading the page. `event.preventDefault()` stops that browser behavior so React can validate the values, call an API, or update state without leaving the page.

### 11. How do you update an object in state?

Create a new object by spreading the previous object, then replace the property that changed.

```tsx
setProfile((currentProfile) => ({
	...currentProfile,
	name: "Sadhik",
}));
```

The spread keeps the other properties instead of accidentally removing them.

### 12. How do you add an item to an array in state?

Create a new array with the old items and the new item.

```tsx
setUsers((currentUsers) => [...currentUsers, newUser]);
```

Do not use `push` on the existing state array.

### 13. How do you delete an item from an array in state?

Use `filter` to create a new array containing every item except the one being deleted.

```tsx
setUsers((currentUsers) =>
	currentUsers.filter((user) => user.id !== userId),
);
```

### 14. How do you update one object inside an array?

Use `map`. Return a copied, updated object for the matching item and return the original item for all other items.

```tsx
setUsers((currentUsers) =>
	currentUsers.map((user) =>
		user.id === userId
			? { ...user, isOnline: !user.isOnline }
			: user,
	),
);
```

This creates a new array and changes only the intended object.

### 15. What is lifting state up?

Lifting state up means moving shared state from a child into their closest common parent. The parent becomes the single source of truth and passes the value and callbacks to the children.

This prevents two sibling components from keeping separate, conflicting copies of the same data.

### 16. How can a child update state owned by its parent?

The parent passes a callback function as a prop. The child calls that callback when an event occurs, such as a click or input change.

```tsx
type SearchBoxProps = {
	onSearch: (query: string) => void;
};

function SearchBox({ onSearch }: SearchBoxProps) {
	return (
		<input onChange={(event) => onSearch(event.target.value)} />
	);
}
```

The child does not directly access the parent's state; it communicates through the callback.

### 17. What is derived state?

Derived state is a value calculated from existing props or state. It usually should not be stored separately because duplicate state can become out of sync.

```tsx
const onlineUsers = users.filter((user) => user.isOnline).length;
const totalUsers = users.length;
```

Here, only `users` needs to be stored. The counts can be calculated during rendering.

### 18. Why should stable IDs be used as React keys?

Keys help React identify which list item is which between renders. A stable unique ID lets React preserve the correct item state when items are inserted, deleted, or reordered.

```tsx
{users.map((user) => (
	<li key={user.id}>{user.name}</li>
))}
```

Using an array index as a key can cause the wrong input value or component state to move to another item after the list changes.

### 19. What causes controlled/uncontrolled input warnings?

The warning occurs when an input changes between:

- Uncontrolled: the browser manages its value, usually because `value` is `undefined`.
- Controlled: React manages its value through a `value` or `checked` prop.

For example, `value={undefined}` on the first render and `value="Sadhik"` later changes from uncontrolled to controlled. Initialize the value consistently:

```tsx
const [name, setName] = useState("");
```

For optional data, use a fallback such as `value={name ?? ""}`.

### 20. Why should state setters not be called during render?

Calling a setter during render immediately schedules another render while React is still rendering. This can create an infinite render loop, repeated work, and unpredictable behavior.

```tsx
// Incorrect
// setCount(count + 1);
```

Call setters in event handlers, effects when appropriate, or other controlled callbacks instead:

```tsx
<button type="button" onClick={() => setCount((current) => current + 1)}>
	Add
</button>
```

## Quick Revision

- State changes over time; props are read-only inputs from a parent.
- Use the setter returned by `useState` to update state.
- Use functional updates when the next value depends on the previous value.
- Keep controlled inputs initialized with a consistent value.
- Update objects and arrays immutably with spread, `map`, and `filter`.
- Lift shared state to the closest common parent.
- Use callback props for child-to-parent communication.
- Calculate derived values instead of storing duplicate state.
- Use stable IDs for list keys.
- Never call a state setter during render.