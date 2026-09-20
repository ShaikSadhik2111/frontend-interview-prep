# Day 22 Common Mistakes

## 1. Mutating state
Bad:
```tsx
users.push(newUser);
```

Use a new array:
```tsx
setUsers((current) => [...current, newUser]);
```

## 2. Mutating objects
Bad:
```tsx
user.isOnline = true;
```

Use:
```tsx
setUser((current) => ({ ...current, isOnline: true }));
```

## 3. Not using functional updates
If the next state depends on the previous state, use the functional form.

## 4. Forgetting preventDefault
Form submission can reload the page if the default browser action is not prevented.

## 5. Controlled/uncontrolled inputs
Initialize controlled values consistently, for example `useState("")`, rather than starting with undefined.

## 6. Index as a key
Prefer `key={user.id}` over `key={index}` for dynamic lists.

## 7. Duplicating derived state
Do not store `onlineCount` separately if it can be calculated from `users`.

## 8. Setting state during render
Do not call a setter unconditionally in the component body.

## 9. Replacing an object accidentally
Use the spread operator when existing fields must be retained.

## Debug checklist
- Did I mutate state?
- Does this update depend on previous state?
- Is the input controlled?
- Did I prevent the default form submission?
- Are list keys stable?
- Am I storing unnecessary derived state?
