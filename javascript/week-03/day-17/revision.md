# TypeScript Day 17 Revision

## Function type aliases

```ts
type MathOperation = (a: number, b: number) => number;
```

A function type alias creates a reusable contract for parameters and return type.

## Callback typing

```ts
function processUsers(
    users: string[],
    callback: (user: string) => void
): void {}
```

A callback parameter is typed like any other function: specify its parameters and return type.

## Optional callbacks

```ts
onSuccess?: (data: string) => void;
onSuccess?.(data);
```

The callback may be omitted, so optional chaining avoids calling `undefined`.

## Rest parameters

```ts
function sum(...numbers: number[]): number {}
```

A rest parameter collects arguments into a typed array.

## Function overloads

```ts
function formatValue(value: string): string;
function formatValue(value: number): string;
function formatValue(value: string | number): string {
    // implementation
}
```

Overloads provide multiple valid call signatures while one implementation contains the runtime logic.

## Union vs overload

Use a union when one signature and one shared return type describe the behavior clearly.

Use overloads when callers need different call signatures or when the relationship between input and return type needs to be expressed more precisely.

## Interview takeaway

```text
Function type → reusable function contract
Callback → function passed to another function
Rest parameter → typed array of arguments
Overload → multiple call signatures + one implementation
```