# Day 21 Revision — React + TypeScript Components and Props

## Core concepts

- A functional component is a function that returns React UI.
- Use `.tsx` when a file contains TypeScript and JSX.
- Custom React components use PascalCase.
- Props are read-only inputs passed from parent to child.
- Type props with `type` or `interface`.
- Use optional props with `?` and provide a default when appropriate.
- Use string unions for known variants instead of unrestricted `string` values.
- Type arrays with `Item[]` and object props with dedicated types/interfaces.
- Use stable unique keys such as database IDs for changing lists.
- Type flexible `children` content with `ReactNode`.
- Keep state in the component that owns the data.
- Pass callback props when a child needs to request a parent-owned state change.
- Do not mutate props directly.
- Build reusable components around a clear responsibility and small prop API.

## Interview points

### Props vs state

- Props come from the parent and are read-only to the child.
- State is owned by a component and can change over time.

### Parent-to-child communication

Parent → child:

```tsx
<Child user={user} />
```

Child → parent event notification:

```tsx
<Child onSave={handleSave} />
```

The parent owns the state and passes a callback to the child.

### `type` vs `interface`

- `interface` is useful for object shapes and extension with `extends`.
- `type` is useful for unions, intersections, tuples, and other aliases.
- Both are valid for React props; follow the project's convention.

### `children`

Use `children: ReactNode` when the component owns the layout but should allow the parent to supply arbitrary renderable content.

### Keys

Prefer a stable unique identifier:

```tsx
items.map((item) => <Row key={item.id} item={item} />)
```

Avoid array indexes for lists that can be reordered, inserted, removed, or filtered.

## Day 21 self-check

Before moving on, I should be able to explain and code without copying:

- [ ] Functional component
- [ ] Typed required prop
- [ ] Optional prop with default value
- [ ] Union prop
- [ ] Object prop
- [ ] Array prop
- [ ] Stable list key
- [ ] `children: ReactNode`
- [ ] Parent callback prop
- [ ] Parent-owned state
- [ ] Reusable component
- [ ] Empty-state rendering
