import { useState } from "react";

// Exercise 1: Typed UserCard
export interface User {
    id: number;
    name: string;
    email: string;
    role: "Frontend Engineer" | "Backend Engineer" | "Full Stack Engineer";
    skills: string[];
    isOnline?: boolean;
}

interface UserCardProps {
    user: User;
}

export function ExerciseUserCard({ user }: UserCardProps) {
    return (
        <article>
            <h2>{user.name}</h2>
            <p>{user.email}</p>
            <p>{user.role}</p>
            <p>
                Status: <strong>{user.isOnline ? "Online" : "Offline"}</strong>
            </p>

            {user.skills.length > 0 ? (
                <ul>
                    {user.skills.map((skill) => (
                        <li key={skill}>{skill}</li>
                    ))}
                </ul>
            ) : (
                <p>No skills added.</p>
            )}
        </article>
    );
}

// Exercise 2: Parent-to-child data flow
interface ProductProps {
    name: string;
    price: number;
    onAdd: (name: string) => void;
}

export function Product({ name, price, onAdd }: ProductProps) {
    return (
        <article>
            <h3>{name}</h3>
            <p>₹{price}</p>
            <button type="button" onClick={() => onAdd(name)}>
                Add to cart
            </button>
        </article>
    );
}

export function ProductExample() {
    const [cart, setCart] = useState<string[]>([]);

    function addToCart(name: string) {
        setCart((currentCart) => [...currentCart, name]);
    }

    return (
        <section>
            <Product name="Mechanical Keyboard" price={2500} onAdd={addToCart} />
            <p>Cart items: {cart.length}</p>
        </section>
    );
}

// Exercise 3: Typed reusable button
 type ButtonVariant = "primary" | "secondary" | "danger";

interface ButtonProps {
    label: string;
    variant?: ButtonVariant;
    disabled?: boolean;
    onClick: () => void;
}

export function ExerciseButton({
    label,
    variant = "primary",
    disabled = false,
    onClick,
}: ButtonProps) {
    return (
        <button
            type="button"
            className={`button-${variant}`}
            disabled={disabled}
            onClick={onClick}
        >
            {label}
        </button>
    );
}

// Exercise 4: Parent-owned state with a child callback
interface Topic {
    id: number;
    title: string;
    completed: boolean;
}

interface TopicListProps {
    topics: Topic[];
    onToggle: (topicId: number) => void;
}

export function TopicList({ topics, onToggle }: TopicListProps) {
    if (topics.length === 0) {
        return <p>No topics available.</p>;
    }

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

export function StudyPlanExercise() {
    const [topics, setTopics] = useState<Topic[]>([
        { id: 1, title: "Functional components", completed: true },
        { id: 2, title: "Typed props", completed: false },
        { id: 3, title: "Children and composition", completed: false },
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
        <section>
            <h2>Study Plan</h2>
            <TopicList topics={topics} onToggle={toggleTopic} />
        </section>
    );
}

/*
Exercise checklist:
1. Add a required string prop and use it in JSX.
2. Add an optional prop with a default value.
3. Pass an object and array through props.
4. Render an array with a stable key.
5. Pass a callback from parent to child.
6. Keep state in the parent and never mutate props directly.
7. Add an empty-state UI for an empty collection.
*/
