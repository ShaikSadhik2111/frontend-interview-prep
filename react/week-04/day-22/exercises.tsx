// Day 22 Exercises — State, Events & Controlled Components

import { useState } from "react";
import type { FormEvent } from "react";

type Role = "Frontend Engineer" | "Backend Engineer" | "Full Stack Engineer";

interface User {
  id: number;
  name: string;
  email: string;
  role: Role;
  isOnline: boolean;
}

export function Exercise1Counter() {
  const [count, setCount] = useState(0);

  return (
    <section>
      <h2>Counter</h2>
      <p>Count: {count}</p>
      <button type="button" onClick={() => setCount((current) => current + 1)}>
        Increment
      </button>
      <button
        type="button"
        onClick={() => setCount((current) => Math.max(0, current - 1))}
      >
        Decrement
      </button>
      <button type="button" onClick={() => setCount(0)}>
        Reset
      </button>
    </section>
  );
}

export function Exercise2NameInput() {
  const [name, setName] = useState("");

  return (
    <section>
      <h2>Controlled Name Input</h2>
      <label>
        Name
        <input
          value={name}
          onChange={(event) => setName(event.target.value)}
          placeholder="Enter your name"
        />
      </label>
      <p>Hello, {name.trim() || "Guest"}!</p>
    </section>
  );
}

export function Exercise3UserForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState<Role>("Frontend Engineer");
  const [users, setUsers] = useState<User[]>([]);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const trimmedName = name.trim();
    const trimmedEmail = email.trim();

    if (!trimmedName || !trimmedEmail) {
      return;
    }

    const newUser: User = {
      id: Date.now(),
      name: trimmedName,
      email: trimmedEmail,
      role,
      isOnline: false,
    };

    setUsers((currentUsers) => [...currentUsers, newUser]);
    setName("");
    setEmail("");
    setRole("Frontend Engineer");
  }

  return (
    <section>
      <h2>Add a User</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Name
          <input value={name} onChange={(event) => setName(event.target.value)} />
        </label>
        <label>
          Email
          <input
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
        </label>
        <label>
          Role
          <select
            value={role}
            onChange={(event) => setRole(event.target.value as Role)}
          >
            <option value="Frontend Engineer">Frontend Engineer</option>
            <option value="Backend Engineer">Backend Engineer</option>
            <option value="Full Stack Engineer">Full Stack Engineer</option>
          </select>
        </label>
        <button type="submit">Add user</button>
      </form>

      <p>Users added: {users.length}</p>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            {user.name} - {user.email} ({user.role})
          </li>
        ))}
      </ul>
    </section>
  );
}

export function Exercise4ToggleUser() {
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
      name: "Alex",
      email: "alex@example.com",
      role: "Backend Engineer",
      isOnline: false,
    },
  ]);

  function toggleUser(userId: number) {
    setUsers((currentUsers) =>
      currentUsers.map((user) =>
        user.id === userId ? { ...user, isOnline: !user.isOnline } : user,
      ),
    );
  }

  return (
    <section>
      <h2>Toggle User Status</h2>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            {user.name}: {user.isOnline ? "Online" : "Offline"}
            <button type="button" onClick={() => toggleUser(user.id)}>
              Toggle status
            </button>
          </li>
        ))}
      </ul>
    </section>
  );
}

export function Exercise5DeleteUser() {
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
      role: "Full Stack Engineer",
      isOnline: false,
    },
  ]);

  function deleteUser(userId: number) {
    setUsers((currentUsers) =>
      currentUsers.filter((user) => user.id !== userId),
    );
  }

  return (
    <section>
      <h2>Delete a User</h2>
      {users.length === 0 ? (
        <p>No users remaining.</p>
      ) : (
        <ul>
          {users.map((user) => (
            <li key={user.id}>
              {user.name}
              <button type="button" onClick={() => deleteUser(user.id)}>
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

export function Exercise6UserManagementPanel() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    role: "Frontend Engineer" as Role,
  });
  const [users, setUsers] = useState<User[]>([]);

  const onlineUserCount = users.filter((user) => user.isOnline).length;

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const name = form.name.trim();
    const email = form.email.trim();

    if (!name || !email) {
      return;
    }

    const newUser: User = {
      id: Date.now(),
      name,
      email,
      role: form.role,
      isOnline: false,
    };

    setUsers((currentUsers) => [...currentUsers, newUser]);
    setForm({ name: "", email: "", role: "Frontend Engineer" });
  }

  function toggleUser(userId: number) {
    setUsers((currentUsers) =>
      currentUsers.map((user) =>
        user.id === userId ? { ...user, isOnline: !user.isOnline } : user,
      ),
    );
  }

  function deleteUser(userId: number) {
    setUsers((currentUsers) =>
      currentUsers.filter((user) => user.id !== userId),
    );
  }

  return (
    <section>
      <h2>User Management Panel</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Name
          <input
            value={form.name}
            onChange={(event) =>
              setForm((currentForm) => ({
                ...currentForm,
                name: event.target.value,
              }))
            }
          />
        </label>
        <label>
          Email
          <input
            type="email"
            value={form.email}
            onChange={(event) =>
              setForm((currentForm) => ({
                ...currentForm,
                email: event.target.value,
              }))
            }
          />
        </label>
        <label>
          Role
          <select
            value={form.role}
            onChange={(event) =>
              setForm((currentForm) => ({
                ...currentForm,
                role: event.target.value as Role,
              }))
            }
          >
            <option value="Frontend Engineer">Frontend Engineer</option>
            <option value="Backend Engineer">Backend Engineer</option>
            <option value="Full Stack Engineer">Full Stack Engineer</option>
          </select>
        </label>
        <button type="submit">Add user</button>
      </form>

      <p>Total users: {users.length}</p>
      <p>Online users: {onlineUserCount}</p>

      {users.length === 0 ? (
        <p>No users added yet.</p>
      ) : (
        <ul>
          {users.map((user) => (
            <li key={user.id}>
              <strong>{user.name}</strong> - {user.email} - {user.role} - {" "}
              {user.isOnline ? "Online" : "Offline"}
              <button type="button" onClick={() => toggleUser(user.id)}>
                Toggle status
              </button>
              <button type="button" onClick={() => deleteUser(user.id)}>
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
