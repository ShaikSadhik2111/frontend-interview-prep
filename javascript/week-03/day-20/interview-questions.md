## TypeScript Interview Questions with Simple Answers

### What is type narrowing?
Type narrowing means reducing a broad type to a more specific type inside a certain block of code. TypeScript analyzes your conditions and understands what kind of value you have.

Example:
```ts
function printValue(value: string | number) {
  if (typeof value === "string") {
    console.log(value.toUpperCase()); // here value is a string
  } else {
    console.log(value.toFixed(2)); // here value is a number
  }
}
```

Type narrowing helps you safely use properties and methods that belong to only one type.

### Difference between any and unknown?
`any` means “I trust this value completely,” so TypeScript stops checking it.
`unknown` means “this value could be anything, so I must check before using it.”

Example:
```ts
let a: any = 5;
a.toFixed(); // works

let b: unknown = 5;
if (typeof b === "number") {
  b.toFixed(); // works only after checking
}
```

Use `unknown` when you want safety. Use `any` only when you intentionally want to bypass type checking.

### How does typeof narrowing work?
`typeof` checks the primitive type of a value such as `string`, `number`, `boolean`, `object`, `function`, etc.

Example:
```ts
function check(value: string | number | null) {
  if (typeof value === "string") {
    console.log(value.toUpperCase());
  } else if (typeof value === "number") {
    console.log(value.toFixed(2));
  } else {
    console.log("Value is null or something else");
  }
}
```

This is one of the simplest and most common ways to narrow types.

### When should you use `in`?
Use the `in` operator when you want to check whether a property exists on an object. It is especially helpful with union types.

Example:
```ts
type Cat = { meow: () => void };
type Dog = { bark: () => void };

function speak(animal: Cat | Dog) {
  if ("meow" in animal) {
    animal.meow();
  } else {
    animal.bark();
  }
}
```

This works well when each type has different properties.

### What is a custom type guard?
A custom type guard is a function that checks whether a value belongs to a specific type. It helps TypeScript narrow the value safely.

Example:
```ts
type User = { id: number; name: string };

function isUser(value: unknown): value is User {
  return typeof value === "object" && value !== null && "id" in value && "name" in value;
}
```

Then:
```ts
const data: unknown = { id: 1, name: "Alice" };

if (isUser(data)) {
  console.log(data.name); // TypeScript knows data is a User here
}
```

This is useful for validating values from APIs, forms, or local storage.

### What does `value is User` mean?
It means “this function returns true only when the value is a `User`.”

It is called a type predicate. After this check passes, TypeScript treats the value as the specific type.

Example:
```ts
function isUser(value: unknown): value is User {
  return typeof value === "object" && value !== null && "id" in value;
}
```

If `isUser(value)` is true, TypeScript knows that `value` is a `User` inside that block.

### What is a discriminated union?
A discriminated union is a union of objects that share a common property, usually called a discriminator, which makes them different from each other.

Example:
```ts
type Circle = { kind: "circle"; radius: number };
type Square = { kind: "square"; side: number };

type Shape = Circle | Square;
```

Now TypeScript can narrow by checking `kind`:
```ts
function area(shape: Shape) {
  if (shape.kind === "circle") {
    return Math.PI * shape.radius ** 2;
  }
  return shape.side ** 2;
}
```

The shared property `kind` tells TypeScript which object type it is dealing with.

### Why are discriminated unions useful in React?
They are very useful for handling UI state, especially when a component can be in different modes like loading, success, or error.

Example:
```ts
type State =
  | { status: "loading" }
  | { status: "success"; data: string }
  | { status: "error"; message: string };
```

Then you can handle each state cleanly:
```ts
if (state.status === "success") {
  console.log(state.data);
} else if (state.status === "error") {
  console.log(state.message);
}
```

This reduces bugs and makes React state logic easier to understand.

### What is the purpose of `never`?
`never` means “this code path cannot happen.”

It is often used for:
- functions that always throw
- impossible states
- exhaustive checking in switches

Example:
```ts
function throwError(message: string): never {
  throw new Error(message);
}
```

It tells TypeScript that the function never returns normally.

### How do you enforce exhaustive checking?
You use a `switch` statement and make the final default case assign to `never`.

Example:
```ts
type Status = "idle" | "loading" | "success";

function getMessage(status: Status) {
  switch (status) {
    case "idle":
      return "Waiting";
    case "loading":
      return "Loading...";
    case "success":
      return "Done";
    default:
      const check: never = status;
      return check;
  }
}
```

If a new status is added later and not handled, TypeScript complains immediately.

### Does TypeScript validate API response data at runtime?
No. TypeScript is only used during development and compile time. It does not run in the browser or Node to check the API response at runtime.

Example:
```ts
type User = { id: number; name: string };

const user = await fetch("/api/user").then(res => res.json()) as User;
```

This does not guarantee the response is valid. You still need runtime validation with libraries like `Zod`, `Joi`, or `Yup`.

### Why can type assertions be dangerous?
Type assertions tell TypeScript to trust you, even if the value may not actually match the type.

Example:
```ts
const data = JSON.parse("{ }") as { name: string };
console.log(data.name.toUpperCase()); // runtime error
```

The assertion does not check actual runtime data. If the value is wrong, your app can break unexpectedly.

Use assertions carefully, and prefer runtime validation when data comes from external sources like APIs.

---

## Short takeaway
TypeScript is about making code safer and easier to reason about. Narrowing, guards, discriminated unions, and `never` help you handle data correctly and prevent bugs before they happen.