# Day 22 Interview Questions

1. What is state in React?
2. What is useState?
3. What happens when state changes?
4. State vs props?
5. Why should React state not be mutated directly?
6. When should you use a functional state update?
7. What is a controlled component?
8. How do you type an input change event?
9. How do you type a form submit event?
10. Why is preventDefault used in forms?
11. How do you update an object in state?
12. How do you add an item to an array in state?
13. How do you delete an item from an array in state?
14. How do you update one object inside an array?
15. What is lifting state up?
16. How can a child update state owned by its parent?
17. What is derived state?
18. Why should stable IDs be used as React keys?
19. What causes controlled/uncontrolled input warnings?
20. Why should state setters not be called during render?

## Key answers

### Functional update
```tsx
setCount((current) => current + 1);
```

### Controlled input
```tsx
<input value={name} onChange={(event) => setName(event.target.value)} />
```

### Immutable array update
```tsx
setUsers((current) => current.filter((user) => user.id !== id));
```

### Child to parent
The parent passes a callback as a prop; the child calls it in response to an event.

### Derived state
Prefer calculating values such as counts from existing state rather than storing duplicate state.
