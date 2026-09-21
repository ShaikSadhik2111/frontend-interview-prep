import "./App.css";
import UserCard from "./day21/UserCard";
import type { User } from "./day21/UserCard";
import Counter from "./day22/Counter";

export default function App() {
    const users: User[] = [
        {
            id: 1,
            name: "Sadhik",
            email: "sadhik@example.com",
            role: "Frontend Engineer",
            skills: ["React", "TypeScript", "JavaScript"],
            isOnline: true,
        },
        {
            id: 2,
            name: "John",
            email: "john@example.com",
            role: "Backend Engineer",
            skills: ["Python", "FastAPI"],
        },
        {
            id: 3,
            name: "Alex",
            email: "alex@example.com",
            role: "Full Stack Engineer",
            skills: [],
            isOnline: false,
        },
    ];

    return (
        // <main className="user-list">
        //     {users.map((user) => (
        //         <UserCard key={user.id} user={user} />
        //     ))}
        // </main>
        <div>
            <Counter />
        </div>
    );
}
