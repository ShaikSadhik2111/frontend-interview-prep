interface User {
    id: number;
    name: string;
    email: string;
    role: string;
    skills: string[];
    isOnline?: boolean;
}

interface UserCardProps {
    user: User;
}

function UserCard({ user }: UserCardProps) {
    return (
        <article>
            <h2>{user.name}</h2>
            <p>{user.email}</p>
            <p>{user.role}</p>
            <p>Status: {user.isOnline ? "Online" : "Offline"}</p>

            <ul>
                {user.skills.map((skill) => (
                    <li key={skill}>{skill}</li>
                ))}
            </ul>
        </article>
    );
}

export default UserCard;