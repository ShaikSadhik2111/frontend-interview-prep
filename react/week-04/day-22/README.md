# Day 22 — React State, Events & Controlled Components

## Goal
Learn React state, event handling, controlled forms, immutable updates, and parent-child state communication with TypeScript.

## Topics
- useState
- State vs props
- State updates and functional updates
- Event handling and TypeScript event types
- Controlled inputs and forms
- Object and array state
- Arrays of objects
- Immutable updates
- Lifting state
- Child-to-parent callbacks
- Derived values

## Practical Project
### User Management Panel
Build a panel with:
- Name input
- Email input
- Role select
- Add User
- Delete User
- Online/offline toggle
- Total users
- Online users

## Outcome
You should be able to build interactive React components with correctly typed state and events without mutating state directly.


<!-- starts here learning-->

## 1. What Is State?

State is information that can change while a component is running. When state changes, React renders the component again so the screen shows the latest value.

Examples of state include:

- The text currently typed into an input.
- Whether a menu is open.
- The list of users in a panel.
- Whether a user is online.

State belongs to the component that owns the changing data. Do not think of state as a normal variable that React watches. React only knows that something changed when you update state with its setter function.

## 2. `useState`

`useState` gives a component a state value and a function for changing it.

```tsx
import { useState } from "react";

function Counter() {
	const [count, setCount] = useState(0);

	return (
		<div>
			<p>Count: {count}</p>
			<button type="button" onClick={() => setCount(count + 1)}>
				Add one
			</button>
		</div>
	);
}
```

The first value is the current state. The second value is the setter. The argument passed to `useState` is the initial value, and it is used only during the first render.

For TypeScript, React can usually infer the type:

```tsx
const [name, setName] = useState(""); // string
const [age, setAge] = useState(25); // number
const [isOpen, setIsOpen] = useState(false); // boolean
```

Give the state an explicit type when the initial value does not show the complete type, especially for unions or empty arrays:

```tsx
type Status = "idle" | "saving" | "success" | "error";

const [status, setStatus] = useState<Status>("idle");
const [tags, setTags] = useState<string[]>([]);
```

## 3. State vs Props

Props and state both hold data, but they have different owners:

| Props | State |
| --- | --- |
| Passed into a component by its parent | Owned by the component itself |
| Read-only inside the receiving component | Changed with a setter function |
| Used to configure or describe a component | Used for data that changes over time |
| Changes when the parent passes a new value | Changes when the component updates it |

```tsx
type GreetingProps = {
	name: string;
};

function Greeting({ name }: GreetingProps) {
	const [isFormal, setIsFormal] = useState(false);

	return (
		<div>
			<p>{isFormal ? `Good day, ${name}.` : `Hi, ${name}!`}</p>
			<button type="button" onClick={() => setIsFormal(!isFormal)}>
				Change greeting
			</button>
		</div>
	);
}
```

Here, `name` is a prop supplied by the parent. `isFormal` is local state because this component controls it. Props should not be mutated:

```tsx
// Incorrect: props are read-only.
// user.name = "New name";
```

## 4. State Updates and Functional Updates

State updates are scheduled by React. The state variable does not change immediately within the same event handler.

```tsx
function Example() {
	const [count, setCount] = useState(0);

	function handleClick() {
		setCount(count + 1);
		setCount(count + 1);
		// Both updates read the same old count, so the result is usually +1.
	}

	return <button onClick={handleClick}>{count}</button>;
}
```

When the next value depends on the previous value, use a functional update. React calls the function with the latest state value:

```tsx
function Example() {
	const [count, setCount] = useState(0);

	function handleClick() {
		setCount((previousCount) => previousCount + 1);
		setCount((previousCount) => previousCount + 1);
	}

	return <button onClick={handleClick}>{count}</button>;
}
```

The functional form is important for counters, toggles, arrays, objects, and updates that may happen close together.

## 5. Event Handling and TypeScript Event Types

Pass a function to an event prop. Do not call the function while rendering.

```tsx
function ButtonExample() {
	function handleClick() {
		console.log("Clicked");
	}

	return <button onClick={handleClick}>Click me</button>;
}
```

Use React's event types for event parameters:

```tsx
import type { ChangeEvent, FormEvent, MouseEvent } from "react";

function EventExample() {
	function handleButtonClick(event: MouseEvent<HTMLButtonElement>) {
		console.log(event.currentTarget.textContent);
	}

	function handleInputChange(event: ChangeEvent<HTMLInputElement>) {
		console.log(event.target.value);
	}

	function handleSubmit(event: FormEvent<HTMLFormElement>) {
		event.preventDefault();
		console.log("Submitted");
	}

	return (
		<form onSubmit={handleSubmit}>
			<input onChange={handleInputChange} />
			<button type="button" onClick={handleButtonClick}>
				Inspect
			</button>
			<button type="submit">Submit</button>
		</form>
	);
}
```

Useful event types include `ChangeEvent<HTMLInputElement>`, `ChangeEvent<HTMLSelectElement>`, `ChangeEvent<HTMLTextAreaElement>`, `FormEvent<HTMLFormElement>`, and `MouseEvent<HTMLButtonElement>`.

## 6. Controlled Inputs and Forms

An input is controlled when React state is its source of truth. The `value` comes from state, and `onChange` updates that state.

```tsx
function ProfileForm() {
	const [name, setName] = useState("");

	return (
		<label>
			Name
			<input
				value={name}
				onChange={(event) => setName(event.target.value)}
			/>
		</label>
	);
}
```

A controlled form makes validation, disabling buttons, clearing fields, and submitting values predictable:

```tsx
type Role = "developer" | "designer";

function UserForm() {
	const [name, setName] = useState("");
	const [role, setRole] = useState<Role>("developer");

	function handleSubmit(event: FormEvent<HTMLFormElement>) {
		event.preventDefault();
		console.log({ name, role });
	}

	return (
		<form onSubmit={handleSubmit}>
			<input value={name} onChange={(event) => setName(event.target.value)} />
			<select value={role} onChange={(event) => setRole(event.target.value as Role)}>
				<option value="developer">Developer</option>
				<option value="designer">Designer</option>
			</select>
			<button type="submit" disabled={!name.trim()}>
				Save
			</button>
		</form>
	);
}
```

For a checkbox, use `checked` instead of `value`:

```tsx
const [isOnline, setIsOnline] = useState(false);

<input
	type="checkbox"
	checked={isOnline}
	onChange={(event) => setIsOnline(event.target.checked)}
/>;
```

## 7. Object State

When state is an object, keep the properties you are not changing by spreading the previous object.

```tsx
type UserProfile = {
	name: string;
	email: string;
	role: "developer" | "designer";
};

const [profile, setProfile] = useState<UserProfile>({
	name: "",
	email: "",
	role: "developer",
});

function updateName(name: string) {
	setProfile((previousProfile) => ({
		...previousProfile,
		name,
	}));
}
```

Do not replace the object with only one property unless that is intentional:

```tsx
// Incorrect: email and role are lost.
// setProfile({ name: "Sadhik" });
```

## 8. Array State and Arrays of Objects

Use a state type that describes the item shape. For an array of objects, define the object type once and reuse it.

```tsx
type User = {
	id: number;
	name: string;
	role: "developer" | "designer";
	isOnline: boolean;
};

const [users, setUsers] = useState<User[]>([]);
```

Common array operations are expressed by creating a new array:

```tsx
function addUser(user: User) {
	setUsers((previousUsers) => [...previousUsers, user]);
}

function deleteUser(userId: number) {
	setUsers((previousUsers) =>
		previousUsers.filter((user) => user.id !== userId),
	);
}

function toggleOnline(userId: number) {
	setUsers((previousUsers) =>
		previousUsers.map((user) =>
			user.id === userId ? { ...user, isOnline: !user.isOnline } : user,
		),
	);
}
```

Render arrays with `map` and give each item a stable key:

```tsx
<ul>
	{users.map((user) => (
		<li key={user.id}>
			{user.name} - {user.role}
		</li>
	))}
</ul>
```

## 9. Immutable Updates

Immutable updating means creating a new object or array instead of changing the existing state directly. React uses references to help determine what changed.

```tsx
// Incorrect: mutates the existing array.
// users.push(newUser);
// setUsers(users);

// Correct: creates a new array.
setUsers((previousUsers) => [...previousUsers, newUser]);
```

For nested data, copy every level that changes:

```tsx
setProfile((previousProfile) => ({
	...previousProfile,
	name: "Updated name",
}));
```

`map`, `filter`, and spread syntax are useful because they return new values. Avoid mutating methods such as `push`, `pop`, `splice`, and direct property assignment on state.

## 10. Lifting State Up

Lift state up when two or more components need to use the same changing value. Move the state to their closest common parent, then pass the value and actions down as props.

```tsx
function UserPanel() {
	const [selectedUserId, setSelectedUserId] = useState<number | null>(null);

	return (
		<>
			<UserList selectedUserId={selectedUserId} onSelect={setSelectedUserId} />
			<UserDetails userId={selectedUserId} />
		</>
	);
}
```

This gives the parent one source of truth. The list and details components cannot accidentally keep conflicting copies of the selection.

## 11. Child-to-Parent Callbacks

A child cannot directly change state owned by its parent. The parent passes a callback prop, and the child calls that callback when something happens.

```tsx
type SearchBoxProps = {
	onSearch: (query: string) => void;
};

function SearchBox({ onSearch }: SearchBoxProps) {
	return (
		<input
			placeholder="Search users"
			onChange={(event) => onSearch(event.target.value)}
		/>
	);
}

function UserPage() {
	const [query, setQuery] = useState("");

	return <SearchBox onSearch={setQuery} />;
}
```

The data direction is still clear: the parent owns the state, the parent passes a function down, and the child sends information back by calling the function.

## 12. Derived Values

A derived value is something that can be calculated from existing props or state. Do not create separate state for it when you can calculate it during rendering.

```tsx
function UserSummary({ users }: { users: User[] }) {
	const totalUsers = users.length;
	const onlineUsers = users.filter((user) => user.isOnline).length;

	return (
		<p>
			{onlineUsers} online of {totalUsers} total
		</p>
	);
}
```

This is better than storing both `users` and `onlineUsers`, because two state values can become out of sync. Store the minimum required data and derive the rest.

## Complete User Management Example

This example combines controlled inputs, object state, arrays of objects, immutable updates, derived values, and callbacks.

```tsx
import { useState } from "react";
import type { FormEvent } from "react";

type Role = "developer" | "designer";

type User = {
	id: number;
	name: string;
	email: string;
	role: Role;
	isOnline: boolean;
};

function UserManagementPanel() {
	const [form, setForm] = useState({
		name: "",
		email: "",
		role: "developer" as Role,
	});
	const [users, setUsers] = useState<User[]>([]);

	const onlineUsers = users.filter((user) => user.isOnline).length;

	function handleSubmit(event: FormEvent<HTMLFormElement>) {
		event.preventDefault();
		if (!form.name.trim() || !form.email.trim()) return;

		const newUser: User = {
			id: Date.now(),
			name: form.name.trim(),
			email: form.email.trim(),
			role: form.role,
			isOnline: false,
		};

		setUsers((previousUsers) => [...previousUsers, newUser]);
		setForm({ name: "", email: "", role: "developer" });
	}

	function toggleUser(userId: number) {
		setUsers((previousUsers) =>
			previousUsers.map((user) =>
				user.id === userId ? { ...user, isOnline: !user.isOnline } : user,
			),
		);
	}

	function deleteUser(userId: number) {
		setUsers((previousUsers) =>
			previousUsers.filter((user) => user.id !== userId),
		);
	}

	return (
		<section>
			<form onSubmit={handleSubmit}>
				<input
					value={form.name}
					placeholder="Name"
					onChange={(event) =>
						setForm((previousForm) => ({
							...previousForm,
							name: event.target.value,
						}))
					}
				/>
				<input
					value={form.email}
					placeholder="Email"
					onChange={(event) =>
						setForm((previousForm) => ({
							...previousForm,
							email: event.target.value,
						}))
					}
				/>
				<select
					value={form.role}
					onChange={(event) =>
						setForm((previousForm) => ({
							...previousForm,
							role: event.target.value as Role,
						}))
					}
				>
					<option value="developer">Developer</option>
					<option value="designer">Designer</option>
				</select>
				<button type="submit">Add user</button>
			</form>

			<p>
				{onlineUsers} online / {users.length} total
			</p>

			<ul>
				{users.map((user) => (
					<li key={user.id}>
						<span>
							{user.name} ({user.role}) - {user.isOnline ? "Online" : "Offline"}
						</span>
						<button type="button" onClick={() => toggleUser(user.id)}>
							Toggle status
						</button>
						<button type="button" onClick={() => deleteUser(user.id)}>
							Delete
						</button>
					</li>
				))}
			</ul>
		</section>
	);
}
```

## Interview Checklist

- `useState` returns the current value and a setter.
- Use a functional update when the next state depends on the previous state.
- Props come from a parent and should be treated as read-only.
- Controlled inputs use state for `value` or `checked` and update it in `onChange`.
- Use React event types such as `ChangeEvent` and `FormEvent` in TypeScript.
- Update objects and arrays immutably with spread, `map`, and `filter`.
- Lift shared state to the closest common parent.
- Pass callbacks to let children notify parents.
- Derive values during rendering instead of storing duplicate state.
