import './App.css'
import UserCard from './components/UserCard/UserCard'
import type { User } from './components/UserCard/UserCard'

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
    ];

    return (
        <main>
            {users.map((user) => (
                <UserCard key={user.id} user={user} />
            ))}
        </main>
    );
}