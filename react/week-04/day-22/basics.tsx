import { useState } from "react";

type Role = "Frontend Engineer" | "Backend Engineer" | "Full Stack Engineer";

interface User {
  id: number;
  name: string;
  email: string;
  role: Role;
  isOnline: boolean;
}

export function CounterExample() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount((current) => current + 1)}>Increment</button>
      <button onClick={() => setCount((current) => Math.max(0, current - 1))}>Decrement</button>
      <button onClick={() => setCount(0)}>Reset</button>
    </div>
  );
}

export function NameInputExample() {
  const [name, setName] = useState("");

  return (
    <div>
      <input
        value={name}
        onChange={(event) => setName(event.target.value)}
        placeholder="Enter your name"
      />
      <p>Hello, {name || "Guest"}</p>
    </div>
  );
}

export function UserProfileExample() {
  const [profile, setProfile] = useState({
    name: "Sadhik",
    role: "Frontend Engineer",
  });

  return (
    <div>
      <p>{profile.name}</p>
      <p>{profile.role}</p>
      <button
        onClick={() =>
          setProfile((current) => ({
            ...current,
            role: "Full Stack Engineer",
          }))
        }
      >
        Change Role
      </button>
    </div>
  );
}

export function UsersExample() {
  const [users, setUsers] = useState<User[]>([
    {
      id: 1,
      name: "Sadhik",
      email: "sadhik@example.com",
      role: "Frontend Engineer",
      isOnline: true,
    },
    {
      id: 2,
      name: "John",
      email: "john@example.com",
      role: "Backend Engineer",
      isOnline: false,
    },
  ]);

  const toggleUser = (id: number) => {
    setUsers((current) =>
      current.map((user) =>
        user.id === id ? { ...user, isOnline: !user.isOnline } : user,
      ),
    );
  };

  const deleteUser = (id: number) => {
    setUsers((current) => current.filter((user) => user.id !== id));
  };

  return (
    <div>
      {users.map((user) => (
        <article key={user.id}>
          <h3>{user.name}</h3>
          <p>{user.role}</p>
          <p>{user.isOnline ? "Online" : "Offline"}</p>
          <button onClick={() => toggleUser(user.id)}>Toggle status</button>
          <button onClick={() => deleteUser(user.id)}>Delete</button>
        </article>
      ))}
    </div>
  );
}

// Key rule:
// Never mutate state directly.
// Use new objects/arrays with spread, map, and filter.
