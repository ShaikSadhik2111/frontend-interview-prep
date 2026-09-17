# React and TypeScript Interview Questions

## Why props need types

Props are values passed from a parent component to a child component. Typing props tells TypeScript which values the component expects and what type each value should have.

Types help us:

- Catch mistakes before the application runs.
- Understand a component's API while reading the code.
- Get better autocomplete in the editor.
- Make refactoring safer because TypeScript shows affected components.

```tsx
interface UserProps {
	name: string;
	age: number;
}

function User({ name, age }: UserProps) {
	return <p>{name} is {age} years old.</p>;
}

<User name="Sadhik" age={25} />
```

If we pass `age="25"`, TypeScript reports an error because the component expects a number. Props are still read-only; types describe them, but they do not allow a child to change them.

**Interview answer:** Props need types because they define a clear contract between components and prevent invalid data from being passed to a child.

## Interface versus type alias for props

Both `interface` and `type` can describe an object used as component props.

```tsx
interface ButtonProps {
	label: string;
	disabled?: boolean;
}

type ButtonProps = {
	label: string;
	disabled?: boolean;
};
```

The two forms above describe the same prop shape. The main differences are:

- An `interface` is designed for object shapes and can be extended with `extends`.
- A `type` alias can describe objects, unions, intersections, primitive types, and tuples.
- Interfaces with the same name can be merged, while type aliases cannot be redeclared with the same name.

```tsx
interface UserProps {
	name: string;
}

interface AdminProps extends UserProps {
	permissions: string[];
}

type Status = "loading" | "success" | "error";
```

There is no universal winner. Use the convention already used by the project. A useful rule is to use `interface` for extendable object props and `type` when you need unions or more complex combinations.

**Interview answer:** Both are valid for props. Interfaces are convenient for extendable object shapes, while type aliases are more flexible for unions and intersections.

## Optional props

An optional prop is a prop that the parent may omit. Add `?` after the prop name.

```tsx
interface AlertProps {
	message: string;
	type?: "info" | "success" | "error";
}

function Alert({ message, type = "info" }: AlertProps) {
	return <p className={`alert alert-${type}`}>{message}</p>;
}

<Alert message="Profile saved" />
<Alert message="Profile deleted" type="error" />
```

The default value makes `type` equal to `"info"` when the parent does not provide it. Optional does not mean any value is accepted: the value must still be one of the allowed strings.

**Interview answer:** Mark a prop with `?` when it is not required, and use a default value or conditional rendering when the prop is missing.

## Passing objects and arrays

Props can be strings, numbers, booleans, objects, arrays, functions, or React elements. Create a type for complex data so the structure is clear.

```tsx
interface Address {
	city: string;
	country: string;
}

interface ProfileProps {
	name: string;
	address: Address;
	skills: string[];
}

function Profile({ name, address, skills }: ProfileProps) {
	return (
		<section>
			<h2>{name}</h2>
			<p>{address.city}, {address.country}</p>
			<p>Skills: {skills.join(", ")}</p>
		</section>
	);
}

<Profile
	name="Sadhik"
	address={{ city: "Hyderabad", country: "India" }}
	skills={["JavaScript", "React", "TypeScript"]}
/>
```

For arrays of objects, define the item shape:

```tsx
interface Topic {
	id: number;
	title: string;
}

interface TopicListProps {
	topics: Topic[];
}
```

Keep data ownership in the parent. The child should display the object or array and should not mutate the prop directly.

**Interview answer:** Objects and arrays can be passed as props like any other value, but their shapes should be typed so both parent and child agree on the data structure.

## Rendering lists with stable keys

When rendering an array with `.map()`, React needs a `key` for each item.

```tsx
interface Topic {
	id: number;
	title: string;
}

function TopicList({ topics }: { topics: Topic[] }) {
	return (
		<ul>
			{topics.map((topic) => (
				<li key={topic.id}>{topic.title}</li>
			))}
		</ul>
	);
}
```

A stable key is a unique value that belongs to the item, such as a database ID. React uses it to identify which item was added, removed, or changed between renders.

Avoid using the array index when the list can be reordered, filtered, or edited:

```tsx
// Usually unsafe for a changing list.
topics.map((topic, index) => <li key={index}>{topic.title}</li>);
```

Using an index can cause the wrong item to keep component state or DOM state after the list changes. Use an index only when the list is truly static and never changes order.

**Interview answer:** Stable keys help React preserve the identity and state of list items. A unique item ID is preferred over an array index.

## Parent-to-child data flow

React follows one-way data flow: the parent passes data down to the child through props.

```tsx
function Greeting({ name }: { name: string }) {
	return <h1>Hello, {name}</h1>;
}

function Dashboard() {
	const userName = "Sadhik";

	return <Greeting name={userName} />;
}
```

Props are read-only. If a child needs to cause a change, the parent passes a callback function.

```tsx
function CounterButton({ count, onIncrement }: {
	count: number;
	onIncrement: () => void;
}) {
	return (
		<button type="button" onClick={onIncrement}>
			Count: {count}
		</button>
	);
}
```

```tsx
function Counter() {
	const [count, setCount] = useState(0);

	return (
		<CounterButton
			count={count}
			onIncrement={() => setCount((current) => current + 1)}
		/>
	);
}
```

In this example, the parent owns `count`. The child receives the current count and notifies the parent by calling `onIncrement`. The parent then updates its state.

**Interview answer:** Data flows from parent to child through props. To allow a child to communicate an event back, the parent passes a callback prop.

## Why a component should be reusable

A reusable component can be used in multiple places without copying the same markup and logic. This makes an application easier to maintain and keeps its UI consistent.

For example, instead of creating separate buttons for every page, create one button component with typed props:

```tsx
type ButtonVariant = "primary" | "secondary" | "danger";

interface ActionButtonProps {
	label: string;
	variant?: ButtonVariant;
	onClick: () => void;
}

function ActionButton({
	label,
	variant = "primary",
	onClick,
}: ActionButtonProps) {
	return (
		<button className={`button-${variant}`} type="button" onClick={onClick}>
			{label}
		</button>
	);
}
```

A good reusable component usually has:

- One clear responsibility.
- A small, understandable prop API.
- No hard-coded page-specific data.
- No unnecessary dependence on its parent.
- Consistent behavior wherever it is used.

Do not make every tiny piece of markup a component. Extract a component when it has its own responsibility, appears more than once, or would make the parent easier to understand.

**Interview answer:** Reusable components reduce duplication, improve consistency, make changes easier, and allow the same tested behavior to be shared across the application.