# JavaScript + TypeScript Consolidated Cheatsheet

This is the fast-revision sheet for Weeks 1–3. Use it before interviews, coding rounds, and project work. Detailed explanations remain inside each day folder.

---

## Week 1 — JavaScript Foundations

### Execution and language basics

- JavaScript is dynamically typed; values have types, variables do not have fixed compile-time types.
- Primitive values: `string`, `number`, `bigint`, `boolean`, `undefined`, `null`, `symbol`.
- Reference values: objects, arrays, and functions.
- `typeof null` is `"object"` — historical language behavior.
- `NaN` means an invalid numeric result; use `Number.isNaN(value)`.
- Prefer `const`; use `let` when reassignment is required; avoid `var`.

### Equality and coercion

- `===` checks value and type without coercion.
- `==` allows coercion; avoid it unless the coercion is intentional.
- Falsy values: `false`, `0`, `-0`, `0n`, `""`, `null`, `undefined`, `NaN`.
- `||` returns the first truthy value.
- `??` returns the right side only for `null` or `undefined`.

### Scope and hoisting

- Scope types: global, function, and block scope.
- `let` and `const` are block-scoped and have a temporal dead zone.
- Function declarations are hoisted with their implementation.
- `var` declarations are hoisted and initialized with `undefined`.
- Closures retain access to variables from their lexical scope.

### Functions

```js
function add(a, b) {
  return a + b;
}

const multiply = (a, b) => a * b;
```

- Function declarations, expressions, and arrow functions differ in hoisting and `this` behavior.
- Arrow functions do not create their own `this`, `arguments`, or `prototype`.
- Higher-order functions receive functions or return functions.
- Callback functions are commonly used with array methods, events, and async operations.

### Arrays and objects

- `map` transforms and returns a new array.
- `filter` keeps matching items.
- `reduce` accumulates into one result.
- `find` returns the first matching item.
- `some` checks whether at least one item matches.
- `every` checks whether all items match.
- Spread syntax creates shallow copies.
- `structuredClone` can create a deep clone for supported data types.
- Object mutation affects all references pointing to the same object.

### Must-remember differences

| Topic | Key point |
|---|---|
| `map` | Same number of output positions in normal use |
| `filter` | Zero or more matching items |
| `reduce` | Produces one accumulated result |
| Shallow copy | Nested references are shared |
| Deep copy | Nested data is copied recursively |
| `Object.freeze` | Shallow immutability only |
| `const` | Prevents reassignment, not object mutation |

---

## Week 2 — Advanced JavaScript and Coding Patterns

### Closures

A closure is a function bundled with access to its lexical environment.

```js
function createCounter() {
  let count = 0;
  return () => ++count;
}
```

Common uses: private state, factories, memoization, event handlers, and React hooks.

### `this`

- Regular function: `this` depends on the call site.
- Arrow function: `this` is inherited lexically.
- `call`: invokes with a chosen `this` and comma-separated arguments.
- `apply`: invokes with a chosen `this` and an array of arguments.
- `bind`: returns a new function with fixed `this` and optional preset arguments.

### Debounce vs throttle

- **Debounce:** execute after calls stop for a specified delay. Useful for search inputs.
- **Throttle:** execute at most once per interval. Useful for scroll or resize handlers.

### Currying

Transforms `f(a, b, c)` into `f(a)(b)(c)`.

### Memoization

Caches a function result based on its inputs. Use only when the function is deterministic and cache growth is controlled.

### Promises and async JavaScript

Promise states: `pending`, `fulfilled`, `rejected`.

- `then` handles fulfillment.
- `catch` handles rejection.
- `finally` runs after settlement.
- `async` functions always return promises.
- `await` pauses the async function, not the entire JavaScript runtime.

| Method | Behavior |
|---|---|
| `Promise.all` | Fails fast when one promise rejects |
| `Promise.allSettled` | Waits for every promise |
| `Promise.race` | Settles with the first settled promise |
| `Promise.any` | Fulfills with the first fulfilled promise |

### Event loop

- Synchronous code runs on the call stack.
- Promise callbacks use the microtask queue.
- Timers and many browser events use task/macrotask queues.
- After the current stack completes, microtasks are processed before the next task.

### Polyfill mindset

When writing a polyfill:

1. Match the native method signature.
2. Validate inputs and callback behavior.
3. Preserve `this` semantics where relevant.
4. Avoid modifying built-ins in production applications.
5. Test empty arrays, invalid inputs, sparse arrays, and edge cases.

### Coding-round checklist

- Clarify input, output, constraints, and mutation requirements.
- Start with a simple correct solution.
- State time and space complexity.
- Test empty, single-item, duplicate, negative, and large inputs.
- Separate pure logic from side effects.
- Prefer readable names over clever code.

---

## Week 3 — TypeScript

### Type annotations and inference

```ts
let age: number = 25;
const userName = "Sadhik"; // inferred as string
```

- Type inference reduces unnecessary annotations.
- Use explicit types at public boundaries, function parameters, API contracts, and reusable utilities.
- Avoid `any`; it disables useful type checking.
- Use `unknown` for values that require validation before use.
- `never` represents impossible values or functions that never complete normally.
- `void` describes a function whose return value is not used.

### Interfaces and type aliases

```ts
interface User {
  id: number;
  name: string;
}

type Status = "loading" | "success" | "error";
```

- Interfaces are excellent for object contracts and extension.
- Type aliases are useful for unions, tuples, primitives, mapped types, and intersections.
- Intersection: `A & B` requires both types.
- Union: `A | B` allows either type and requires narrowing before type-specific access.
- `readonly` prevents reassignment through that type; it does not deep-freeze objects at runtime.

### Function typing

```ts
type Operation = (a: number, b: number) => number;

function process(values: number[], callback: (value: number) => void): void {
  values.forEach(callback);
}
```

- Type callback parameters and return values.
- Optional callback: `onSuccess?: (data: string) => void`.
- Rest parameters: `(...values: number[])`.
- Overloads provide multiple call signatures with one implementation.

### Generics

```ts
function identity<T>(value: T): T {
  return value;
}

function getProperty<T, K extends keyof T>(object: T, key: K): T[K] {
  return object[key];
}
```

- Generics preserve relationships between input and output types.
- Constraints limit acceptable types: `T extends HasId`.
- `keyof T` produces valid keys of `T`.
- `T[K]` produces the value type for key `K`.
- Prefer generics over `any` when writing reusable utilities.

### Utility types

| Utility | Meaning |
|---|---|
| `Partial<T>` | All properties optional |
| `Required<T>` | All properties required |
| `Readonly<T>` | Properties cannot be reassigned through the type |
| `Pick<T, K>` | Keep selected properties |
| `Omit<T, K>` | Remove selected properties |
| `Record<K, T>` | Map known keys to a value type |
| `Exclude<T, U>` | Remove union members |
| `Extract<T, U>` | Keep matching union members |
| `NonNullable<T>` | Remove `null` and `undefined` |
| `ReturnType<F>` | Extract function return type |
| `Parameters<F>` | Extract function parameter tuple |

### Narrowing and type guards

```ts
function isProduct(value: unknown): value is Product {
  return typeof value === "object" && value !== null && "id" in value;
}
```

Common narrowing tools:

- `typeof` for primitive types.
- `instanceof` for class instances.
- `in` for property existence.
- Equality checks for literal unions.
- Custom predicates using `value is SomeType`.

### Discriminated unions

```ts
type State =
  | { status: "loading" }
  | { status: "success"; data: string[] }
  | { status: "error"; message: string };
```

Use the discriminant (`status`) to safely access the correct fields.

### Exhaustive checking

```ts
function assertNever(value: never): never {
  throw new Error(`Unexpected value: ${String(value)}`);
}
```

Use `assertNever` in a `switch` default branch so adding a new union member creates a compile-time error until handled.

---

## Final interview revision order

1. Explain scope, hoisting, closures, and `this`.
2. Explain event loop, microtasks, macrotasks, and promises.
3. Implement debounce, throttle, curry, memoization, and promise utilities.
4. Explain mutation, shallow/deep copying, and immutability.
5. Explain TypeScript unions, intersections, interfaces, and aliases.
6. Write typed callbacks, overloads, and generic functions.
7. Use utility types for API request/response models.
8. Narrow `unknown`, model UI state with discriminated unions, and enforce exhaustiveness.
9. State complexity and edge cases for every coding problem.
10. Connect each concept to React, forms, API calls, and reusable components.
