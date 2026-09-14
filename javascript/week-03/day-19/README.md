# Day 19 - TypeScript Utility Types

## Objective

Learn how to transform existing TypeScript types without rewriting them manually.

## Core utility types

- `Partial<T>`: makes every property optional.
- `Required<T>`: makes every property required.
- `Readonly<T>`: prevents property reassignment.
- `Pick<T, K>`: keeps only selected properties.
- `Omit<T, K>`: removes selected properties.
- `Record<K, T>`: creates an object type with known keys and a common value type.
- `Exclude<T, U>`: removes members from a union.
- `Extract<T, U>`: keeps members shared by two unions.
- `NonNullable<T>`: removes `null` and `undefined`.
- `ReturnType<T>`: extracts a function's return type.
- `Parameters<T>`: extracts a function's parameter tuple.

## Frontend applications

- `Partial<User>` for PATCH/update request bodies.
- `Pick<User, "id" | "name">` for list previews.
- `Omit<User, "password">` for safe public user objects.
- `Record<Status, string>` for status-message maps.
- `ReturnType<typeof createConfig>` for derived configuration types.
- `Parameters<typeof submitForm>` for strongly typed wrappers.

## Practice order

1. Read `basics.ts`.
2. Solve `exercises.ts` without checking the answers.
3. Review `interview-questions.md`.
4. Use `revision.md` before interviews.
5. Record personal errors in `mistakes.md`.
