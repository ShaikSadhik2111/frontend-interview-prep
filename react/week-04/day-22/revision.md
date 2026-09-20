# Day 22 Revision

## useState
```tsx
const [count, setCount] = useState(0);
```

State changes cause React to render again.

## Functional updates
Use them when the next value depends on the previous value.

```tsx
setCount((current) => current + 1);
```

## Controlled inputs
React state is the source of truth.

```tsx
const [name, setName] = useState("");

<input
  value={name}
  onChange={(event) => setName(event.target.value)}
/>
```

## Forms
```tsx
const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
  event.preventDefault();
};
```

## Immutable object update
```tsx
setUser((current) => ({ ...current, role: "Backend Engineer" }));
```

## Immutable array updates
Add:
```tsx
setUsers((current) => [...current, newUser]);
```

Remove:
```tsx
setUsers((current) => current.filter((user) => user.id !== id));
```

Update:
```tsx
setUsers((current) =>
  current.map((user) =>
    user.id === id ? { ...user, isOnline: !user.isOnline } : user
  )
);
```

## State vs Props
- State is managed by the component and can change.
- Props are passed into a component by its parent.

## Lifting State
Move shared state to the nearest common parent and pass data/callbacks through props.

## Derived values
Calculate values that can be derived from state instead of storing duplicate state.

```tsx
const onlineCount = users.filter((user) => user.isOnline).length;
```
