# TypeScript Day 18 Revision

## Core idea

Generics let us write reusable code while preserving the specific type information passed to the code.

```ts
function identity<T>(value: T): T {
    return value;
}
```

## Generic inference

TypeScript usually infers `T` from the arguments:

```ts
identity(10);       // T = number
identity("hello"); // T = string
```

Explicit type arguments are possible but usually unnecessary when inference is clear.

## Generic constraints

Use `extends` when a generic needs a minimum shape or capability:

```ts
function getId<T extends { id: number }>(item: T): number {
    return item.id;
}
```

Here `T` can have additional properties, but it must contain `id: number`.

## Multiple generics

```ts
function createPair<T, U>(first: T, second: U): [T, U] {
    return [first, second];
}
```

`T` and `U` represent independently inferred types.

## Generic interfaces

```ts
interface ApiResponse<T> {
    success: boolean;
    data: T;
}
```

This allows `ApiResponse<User>` and `ApiResponse<User[]>` to share the same response structure.

## `keyof` + generics

```ts
function getProperty<T, K extends keyof T>(object: T, key: K): T[K] {
    return object[key];
}
```

- `T` = object type.
- `keyof T` = union of valid property names.
- `K extends keyof T` = `K` must be a valid key of `T`.
- `T[K]` = type of the selected property.

## Generics vs `any`

- `any` largely disables type checking.
- Generics preserve the relationship between inputs and outputs.

Prefer generics when the code should work with multiple types while retaining type safety.

## Interview checklist

1. Explain generics in simple terms.
2. Explain generic inference.
3. Explain `T extends SomeType`.
4. Explain generic interfaces.
5. Explain `keyof`.
6. Explain `K extends keyof T`.
7. Explain indexed access types such as `T[K]`.
8. Explain why generics are safer than `any`.
