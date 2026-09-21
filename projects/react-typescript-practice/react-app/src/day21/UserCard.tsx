export type UserRole =
    | "Frontend Engineer"
    | "Backend Engineer"
    | "Full Stack Engineer";

export interface User {
    id: number;
    name: string;
    email: string;
    role: UserRole;
    skills: string[];
    isOnline?: boolean;
}

interface UserCardProps {
    user: User;
}

function UserCard({ user }: UserCardProps) {
    const status = user.isOnline ? "Online" : "Offline";

    return (
        <article aria-labelledby={`user-${user.id}`} className="user-card">
            <h2 id={`user-${user.id}`}>{user.name}</h2>
            <p>{user.email}</p>
            <p>{user.role}</p>
            <p>
                Status: <strong>{status}</strong>
            </p>

            {user.skills.length > 0 ? (
                <ul aria-label={`${user.name}'s skills`}>
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

export default UserCard;
