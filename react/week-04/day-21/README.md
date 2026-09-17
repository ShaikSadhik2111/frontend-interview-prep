# React with TypeScript: Components and Props

These notes explain how to create reusable React components with TypeScript. The examples use `.tsx` files because they contain both TypeScript and JSX.

## 1. Functional Components

A functional component is a JavaScript or TypeScript function that returns UI. Component names must start with an uppercase letter so React can distinguish them from HTML elements.

```tsx
function Welcome() {
	return <h1>Welcome to React</h1>;
}

export default Welcome;
```

Use a component inside another component like this:

```tsx
function App() {
	return (
		<main>
			<Welcome />
			<p>Learn one concept at a time.</p>
		</main>
	);
}
```

A component should usually describe one meaningful part of the interface. It can receive data through props and return different UI for different data.

## 2. JSX and TSX

### JSX

JSX is a syntax that lets us write HTML-like markup inside JavaScript. It is converted into React element calls before the browser runs the code.

```jsx
const title = "Frontend Interview Prep";

function Header() {
	return <h1 className="page-title">{title}</h1>;
}
```

Important JSX rules:

- Return one parent element, or use a fragment: `<>...</>`.
- Use `className` instead of `class`.
- Close every element, including `<img />` and `<input />`.
- Put JavaScript expressions inside curly braces: `{userName}`.
- Use camelCase for most attributes, such as `onClick` and `tabIndex`.

### TSX

TSX is JSX with TypeScript. It gives us type checking for props, state, event handlers, and other values.

```tsx
type GreetingProps = {
	name: string;
};

function Greeting({ name }: GreetingProps) {
	return <p>Hello, {name}!</p>;
}
```

Use `.jsx` for JavaScript components and `.tsx` for TypeScript components that contain JSX.

## 3. Component Naming

Use PascalCase for component names and filenames:

```tsx
function UserProfile() {
	return <section>User profile</section>;
}
```

React treats `<userProfile />` as an unknown HTML tag, not as the component you intended. HTML elements remain lowercase (`div`, `button`, `header`), while React components use PascalCase (`UserProfile`, `PrimaryButton`).

## 4. Typed Props

Props are read-only values passed from a parent component to a child component. Type them so TypeScript can check required values and their types.

```tsx
type ButtonProps = {
	label: string;
	disabled: boolean;
};

function Button({ label, disabled }: ButtonProps) {
	return (
		<button type="button" disabled={disabled}>
			{label}
		</button>
	);
}

function App() {
	return <Button label="Save" disabled={false} />;
}
```

TypeScript catches mistakes such as `<Button label={123} disabled="no" />` because the prop types do not match.

## 5. Interfaces for Props

An interface describes the shape of an object. It is commonly used for props and is useful when the type may be extended.

```tsx
interface UserCardProps {
	name: string;
	role: string;
}

function UserCard({ name, role }: UserCardProps) {
	return (
		<article>
			<h2>{name}</h2>
			<p>{role}</p>
		</article>
	);
}
```

`type` and `interface` both work well for props. `type` is convenient for unions and intersections, while `interface` is convenient for extendable object shapes.

```tsx
interface EmployeeCardProps extends UserCardProps {
	department: string;
}
```

## 6. Optional Props

Add `?` when a prop may be omitted. Provide a fallback when the value might be `undefined`.

```tsx
interface AlertProps {
	message: string;
	type?: "info" | "success" | "error";
}

function Alert({ message, type = "info" }: AlertProps) {
	return <p className={`alert alert-${type}`}>{message}</p>;
}

function App() {
	return (
		<>
			<Alert message="Profile updated." type="success" />
			<Alert message="Your session is active." />
		</>
	);
}
```

The `type` prop is optional, but its value is restricted to the three allowed strings. This is safer than using a general `string` type.

## 7. Arrays and Objects as Props

Props can contain arrays and nested objects. Define the item shape once and reuse it.

```tsx
interface Skill {
	id: number;
	name: string;
	level: "beginner" | "intermediate" | "advanced";
}

interface SkillListProps {
	skills: Skill[];
}

function SkillList({ skills }: SkillListProps) {
	return (
		<ul>
			{skills.map((skill) => (
				<li key={skill.id}>
					{skill.name} - {skill.level}
				</li>
			))}
		</ul>
	);
}

const skills: Skill[] = [
	{ id: 1, name: "JavaScript", level: "advanced" },
	{ id: 2, name: "React", level: "intermediate" },
];

function App() {
	return <SkillList skills={skills} />;
}
```

For an object prop, type its properties directly or create a separate interface:

```tsx
interface Address {
	city: string;
	country: string;
}

interface ProfileProps {
	name: string;
	address: Address;
}
```

Use a stable unique value, such as `skill.id`, for a list key. Avoid using the array index when list items can be inserted, removed, or reordered.

## 8. The `children` Prop

`children` represents the content placed between a component's opening and closing tags. Type it with `ReactNode` when the component can accept text, elements, fragments, or other renderable values.

```tsx
import type { ReactNode } from "react";

interface CardProps {
	title: string;
	children: ReactNode;
}

function Card({ title, children }: CardProps) {
	return (
		<section className="card">
			<h2>{title}</h2>
			<div className="card-content">{children}</div>
		</section>
	);
}

function App() {
	return (
		<Card title="Today">
			<p>Practice props and component composition.</p>
			<button type="button">Mark complete</button>
		</Card>
	);
}
```

Use `children` when a component controls a layout but should not control the exact content inside that layout. Use a named prop when the component needs one specific value, such as `title` or `icon`.

## 9. Reusable Component Design

A reusable component should have one clear responsibility, a small and meaningful prop API, and no unnecessary knowledge about its parent.

```tsx
interface EmptyStateProps {
	title: string;
	description: string;
	action?: ReactNode;
}

function EmptyState({ title, description, action }: EmptyStateProps) {
	return (
		<section>
			<h2>{title}</h2>
			<p>{description}</p>
			{action}
		</section>
	);
}
```

Good design decisions in this example:

- The component does one job: display an empty state.
- Text is supplied by the parent, so the component works on many screens.
- The action is optional, so it supports read-only and interactive states.
- The component does not fetch data or assume a particular page.

Prefer a small variant prop for related visual states:

```tsx
type ButtonVariant = "primary" | "secondary" | "danger";

interface ActionButtonProps {
	label: string;
	variant?: ButtonVariant;
	onClick: () => void;
}
```

## 10. Parent-to-Child Data Flow

Data flows down in React. The parent owns the value and passes it to the child through props. The child can display or use the value, but it should not mutate the prop.

```tsx
interface GreetingProps {
	userName: string;
}

function Greeting({ userName }: GreetingProps) {
	return <h1>Welcome, {userName}</h1>;
}

function Dashboard() {
	const userName = "Sadhik";

	return (
		<main>
			<Greeting userName={userName} />
		</main>
	);
}
```

For an action, the parent can pass a callback. This keeps state and decision-making in the parent while the child reports the event.

```tsx
interface CounterButtonProps {
	count: number;
	onIncrement: () => void;
}

function CounterButton({ count, onIncrement }: CounterButtonProps) {
	return (
		<button type="button" onClick={onIncrement}>
			Count: {count}
		</button>
	);
}
```

```tsx
import { useState } from "react";

function Counter() {
	const [count, setCount] = useState(0);

	return (
		<CounterButton
			count={count}
			onIncrement={() => setCount((currentCount) => currentCount + 1)}
		/>
	);
}
```

`Counter` owns the state. `CounterButton` receives the current value and a callback. The child does not change `count` directly; it calls `onIncrement`, and the parent updates the state.

## Complete Example

This example combines typed props, an array prop, `children`, reusable components, and parent-to-child data flow.

```tsx
import { useState } from "react";
import type { ReactNode } from "react";

interface Topic {
	id: number;
	title: string;
	completed: boolean;
}

interface PanelProps {
	title: string;
	children: ReactNode;
}

function Panel({ title, children }: PanelProps) {
	return (
		<section>
			<h2>{title}</h2>
			{children}
		</section>
	);
}

interface TopicListProps {
	topics: Topic[];
	onToggle: (topicId: number) => void;
}

function TopicList({ topics, onToggle }: TopicListProps) {
	return (
		<ul>
			{topics.map((topic) => (
				<li key={topic.id}>
					<button type="button" onClick={() => onToggle(topic.id)}>
						{topic.completed ? "Completed" : "Mark complete"}
					</button>{" "}
					{topic.title}
				</li>
			))}
		</ul>
	);
}

function StudyPlan() {
	const [topics, setTopics] = useState<Topic[]>([
		{ id: 1, title: "Functional components", completed: true },
		{ id: 2, title: "Typed props", completed: false },
	]);

	function toggleTopic(topicId: number) {
		setTopics((currentTopics) =>
			currentTopics.map((topic) =>
				topic.id === topicId
					? { ...topic, completed: !topic.completed }
					: topic
			)
		);
	}

	return (
		<Panel title="Today's study plan">
			<TopicList topics={topics} onToggle={toggleTopic} />
		</Panel>
	);
}
```

## Quick Interview Revision

- A functional component is a function that returns React UI.
- JSX is HTML-like syntax; TSX is JSX with TypeScript support.
- Custom component names use PascalCase.
- Props are read-only inputs passed from parent to child.
- Use `type` or `interface` to describe prop shapes.
- Use `?` for optional props and provide a default when useful.
- Type arrays with `Item[]` and nested objects with a dedicated type or interface.
- Type `children` as `ReactNode` when it can contain different renderable values.
- Reusable components have one responsibility and a small, clear API.
- React data flows from parent to child; callbacks let children notify parents about events.=