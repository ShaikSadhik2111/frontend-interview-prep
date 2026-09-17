import type { ReactNode } from "react";
import { useState } from "react";

// 1. Basic functional component
export function Welcome() {
    return <h1>Welcome to React with TypeScript</h1>;
}

// 2. Typed props
interface GreetingProps {
    name: string;
}

export function Greeting({ name }: GreetingProps) {
    return <p>Hello, {name}!</p>;
}

// 3. Optional props + union type
interface AlertProps {
    message: string;
    type?: "info" | "success" | "error";
}

export function Alert({ message, type = "info" }: AlertProps) {
    return <p className={`alert alert-${type}`}>{message}</p>;
}

// 4. Arrays and object props
interface Skill {
    id: number;
    name: string;
    level: "beginner" | "intermediate" | "advanced";
}

interface SkillListProps {
    skills: Skill[];
}

export function SkillList({ skills }: SkillListProps) {
    if (skills.length === 0) {
        return <p>No skills added.</p>;
    }

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

// 5. children prop with ReactNode
interface CardProps {
    title: string;
    children: ReactNode;
}

export function Card({ title, children }: CardProps) {
    return (
        <section className="card">
            <h2>{title}</h2>
            <div className="card-content">{children}</div>
        </section>
    );
}

// 6. Parent state + callback prop
interface CounterButtonProps {
    count: number;
    onIncrement: () => void;
}

export function CounterButton({ count, onIncrement }: CounterButtonProps) {
    return (
        <button type="button" onClick={onIncrement}>
            Count: {count}
        </button>
    );
}

export function CounterExample() {
    const [count, setCount] = useState(0);

    return (
        <CounterButton
            count={count}
            onIncrement={() => setCount((currentCount) => currentCount + 1)}
        />
    );
}

// 7. Reusable component design
export type ButtonVariant = "primary" | "secondary" | "danger";

interface ActionButtonProps {
    label: string;
    variant?: ButtonVariant;
    onClick: () => void;
}

export function ActionButton({
    label,
    variant = "primary",
    onClick,
}: ActionButtonProps) {
    return (
        <button
            className={`button-${variant}`}
            type="button"
            onClick={onClick}
        >
            {label}
        </button>
    );
}

export default function BasicsDemo() {
    const skills: Skill[] = [
        { id: 1, name: "JavaScript", level: "advanced" },
        { id: 2, name: "React", level: "intermediate" },
        { id: 3, name: "TypeScript", level: "intermediate" },
    ];

    return (
        <main>
            <Welcome />
            <Greeting name="Sadhik" />
            <Alert message="Profile updated." type="success" />
            <Card title="Skills">
                <SkillList skills={skills} />
            </Card>
            <Card title="Counter">
                <CounterExample />
            </Card>
        </main>
    );
}
