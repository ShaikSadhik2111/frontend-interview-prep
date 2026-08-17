# TypeScript Day 1 Revision

## Core concepts

- Type annotation: explicitly declares a type.
- Type inference: TypeScript determines a type automatically from the value/context.
- Union type: allows one of multiple types, e.g. `number | string`.
- Literal type: restricts a value to specific allowed values.
- Type narrowing: checks a union value before using type-specific operations.

## Functions

```ts
function add(a: number, b: number): number {
    return a + b;
}
```

- Parameters can be typed.
- Return values can be typed.
- Optional parameters use `?`.
- Default parameters provide a fallback value.
- `void` is commonly used when a function does not return a useful value.

## Interfaces vs type aliases

```ts
interface User {
    id: number;
    name: string;
}

type Status = "loading" | "success" | "error";
```

An interface/type alias describes a structure or type contract. This is different from type inference, where TypeScript determines a type automatically.

## any vs unknown

- `any`: largely opts out of type checking. Avoid unless there is a strong reason.
- `unknown`: can hold any value, but must be narrowed before using it safely.

## never

`never` represents a value that never successfully occurs/returns, such as a function that always throws.

## Interview points

1. Explain type inference vs type annotation.
2. Explain `any` vs `unknown`.
3. Explain union types and narrowing.
4. Explain optional parameters.
5. Explain `void` vs `never`.
6. Explain why TypeScript still needs runtime validation for untrusted API data.
