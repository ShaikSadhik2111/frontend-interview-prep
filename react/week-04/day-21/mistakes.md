# Day 21 Common Mistakes — React + TypeScript Components and Props

## 1. Mutating props

❌ Do not mutate a prop inside the child:

```tsx
user.name = "New Name";
```

✅ Treat props as read-only. Ask the parent to update its state through a callback.

---

## 2. Using a broad `string` when values are known

❌

```tsx
variant: string;
```

✅

```tsx
type ButtonVariant = "primary" | "secondary" | "danger";
```

A union gives TypeScript a smaller, safer set of valid values.

---

## 3. Using array index as a key for changing lists

❌

```tsx
items.map((item, index) => <Row key={index} item={item} />);
```

✅

```tsx
items.map((item) => <Row key={item.id} item={item} />);
```

Use a stable identifier that belongs to the item whenever possible.

---

## 4. Forgetting optional props can be `undefined`

❌

```tsx
interface AlertProps {
    type?: "info" | "success" | "error";
}

function Alert({ type }: AlertProps) {
    return <p>{type.toUpperCase()}</p>;
}
```

✅ Provide a default or handle the missing value:

```tsx
function Alert({ type = "info" }: AlertProps) {
    return <p>{type.toUpperCase()}</p>;
}
```

---

## 5. Passing the wrong prop shape

❌

```tsx
<UserCard user="Sadhik" />
```

when the component expects:

```tsx
interface UserCardProps {
    user: User;
}
```

✅ Pass the expected object:

```tsx
<UserCard user={user} />
```

TypeScript should catch this during development.

---

## 6. Making components too dependent on parents

Avoid components that know page-specific state, API details, or unrelated business rules when they only need display data.

Prefer:

```tsx
<UserCard user={user} />
```

instead of making `UserCard` fetch the user's data itself for every use case.

---

## 7. Overusing components

Not every `<div>` needs to become a component. Extract a component when it has a meaningful responsibility, is reused, or makes the parent easier to understand.

---

## 8. Forgetting empty states

A list can legitimately be empty. Avoid assuming there will always be data.

✅

```tsx
{skills.length > 0 ? (
    <SkillList skills={skills} />
) : (
    <p>No skills added.</p>
)}
```

---

## 9. Confusing props with state

Props are passed into a component by its parent. State is owned by a component and changes over time.

Remember:

```text
Parent state → props → Child
Child event → callback prop → Parent state update
```

---

## 10. Day 21 debugging checklist

When a typed component does not work, check:

1. Does the component name use PascalCase?
2. Does the props interface match the JSX usage?
3. Are optional props handled when omitted?
4. Are array items given stable keys?
5. Is the child trying to mutate a prop?
6. Does the parent own the state that should change?
7. Are union types too broad or too narrow?
8. Is an empty array handled correctly?
9. Is `children` typed appropriately as `ReactNode` when needed?
10. Does the TypeScript build pass after the change?
