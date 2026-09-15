# TypeScript Revision

## 1) Type narrowing
Type narrowing means reducing a broad type into a more specific one inside a condition.

```ts
function printValue(value: string | number) {
  if (typeof value === "string") {
    console.log(value.toUpperCase()); // string
  } else {
    console.log(value.toFixed(2)); // number
  }
}
```

This helps TypeScript know which methods and properties are safe to use.

## 2) any vs unknown
- `any`: disables type checking completely.
- `unknown`: safer because you must check before using it.

```ts
let x: any = 5;
let y: unknown = 5;

if (typeof y === "number") {
  console.log(y.toFixed(2));
}
```

`unknown` is better when data is not trusted.

## 3) typeof narrowing
Use `typeof` to check the primitive type.

```ts
if (typeof value === "string") {
  value.toUpperCase();
} else if (typeof value === "number") {
  value.toFixed();
}
```

This is a common and useful TypeScript pattern.

## 4) Using `in`
Use `in` when checking whether an object has a property.

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

This is helpful when union types have different shapes.

## 5) Custom type guard
A custom type guard checks if a value matches a certain type and tells TypeScript about it.

```ts
type User = { id: number; name: string };

function isUser(value: unknown): value is User {
  return typeof value === "object" && value !== null && "id" in value && "name" in value;
}
```

After this check, TypeScript knows the value is a `User`.

## 6) `value is User`
This means: “if this function returns true, then the value is of type `User`.”

It is a type predicate and is used in type guards.

## 7) Discriminated union
A discriminated union is a union of objects with a common property that distinguishes them.

```ts
type Circle = { kind: "circle"; radius: number };
type Square = { kind: "square"; side: number };

type Shape = Circle | Square;
```

The `kind` property helps TypeScript know which type is being handled.

## 8) Why discriminated unions are useful in React
They make state handling easier and safer.

```ts
type State =
  | { status: "loading" }
  | { status: "success"; data: string }
  | { status: "error"; message: string };
```

This helps manage loading, success, and error states cleanly.

## 9) Purpose of `never`
`never` means the value cannot happen.

It is used for:
- impossible states
- functions that always throw
- exhaustive checks

```ts
function throwError(msg: string): never {
  throw new Error(msg);
}
```

## 10) Exhaustive checking
Use `switch` plus `never` in the default case to ensure all cases are handled.

```ts
type Status = "idle" | "loading" | "success";

function getStatusMessage(status: Status) {
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

If a new case is added, TypeScript will warn you.

## 11) Runtime validation of API data
TypeScript does not validate API response data at runtime.

```ts
type User = { id: number; name: string };
const user = await fetch("/api/user").then(res => res.json()) as User;
```

This is just a type assertion. Real runtime validation should be done with libraries like `Zod`, `Joi`, or `Yup`.

## 12) Why type assertions can be dangerous
Type assertions tell TypeScript to trust you, but they do not truly verify the data.

```ts
const data = JSON.parse("{}") as { name: string };
console.log(data.name.toUpperCase());
```

This can cause runtime errors if the value is not what you expect.

## Quick revision summary
- Narrow types using `typeof`, `in`, and custom guards.
- Prefer `unknown` over `any` for safety.
- Use discriminated unions for state management.
- Use `never` for impossible states and exhaustive checks.
- TypeScript does not validate runtime API data.
- Avoid unsafe type assertions unless you are absolutely sure.
