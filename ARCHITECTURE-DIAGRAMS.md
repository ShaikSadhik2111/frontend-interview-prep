# JavaScript + TypeScript Architecture Diagrams

These diagrams provide visual revision for Weeks 1–3. They use Mermaid, so they can be viewed directly on GitHub.

---

## 1. JavaScript runtime architecture

```mermaid
flowchart TD
    A[JavaScript Source] --> B[Parser]
    B --> C[Execution Context]
    C --> D[Call Stack]
    D --> E[Web APIs / Host APIs]
    E --> F[Task Queue]
    E --> G[Microtask Queue]
    D --> H{Call Stack Empty?}
    H -->|Yes| I[Process Microtasks]
    I --> J[Process Next Task]
    J --> D
```

**Revision points:**

- The call stack executes synchronous code.
- Browser APIs handle timers, network requests, and DOM events.
- Promise reactions go to the microtask queue.
- Tasks such as timers and events are processed after microtasks.

---

## 2. Scope and closure model

```mermaid
flowchart TD
    A[Global Scope] --> B[Outer Function Scope]
    B --> C[Inner Function Scope]
    C --> D[Returned Function]
    D --> E[Closure retains lexical variables]
    E --> F[Private state survives after outer function returns]
```

Example concept:

```js
function createCounter() {
  let count = 0;

  return function increment() {
    count += 1;
    return count;
  };
}
```

The returned function retains access to `count` because of closure behavior.

---

## 3. Promise lifecycle

```mermaid
stateDiagram-v2
    [*] --> Pending
    Pending --> Fulfilled: resolve(value)
    Pending --> Rejected: reject(error)
    Fulfilled --> [*]
    Rejected --> [*]
```

### Promise composition

```mermaid
flowchart LR
    A[Promise A] --> C[Promise.all]
    B[Promise B] --> C
    C --> D[All fulfilled]
    C --> E[Reject on first failure]
```

Use `Promise.allSettled` when every result is required even if some operations fail.

---

## 4. Debounce and throttle decision diagram

```mermaid
flowchart TD
    A[Frequent event] --> B{Which behavior is needed?}
    B -->|Wait until events stop| C[Debounce]
    B -->|Limit execution frequency| D[Throttle]
    C --> E[Search input / validation]
    D --> F[Scroll / resize / mouse move]
```

---

## 5. Object mutation and copying

```mermaid
flowchart TD
    A[Original Object] --> B[Shallow Copy]
    A --> C[Deep Copy]
    B --> D[Nested references shared]
    C --> E[Nested values copied]
    D --> F[Mutation may affect original]
    E --> G[Mutation isolated for supported data]
```

Remember: spread syntax and `Object.assign` are shallow-copy operations.

---

## 6. TypeScript compilation architecture

```mermaid
flowchart TD
    A[TypeScript .ts / .tsx] --> B[Type Checker]
    B --> C{Type errors?}
    C -->|Yes| D[Fix source types]
    D --> B
    C -->|No| E[Compiler emits JavaScript]
    E --> F[JavaScript Runtime: Browser or Node.js]
```

TypeScript types are removed during compilation; normal JavaScript runtime does not understand annotations such as `value: string`.

---

## 7. TypeScript type-system relationships

```mermaid
flowchart TD
    A[TypeScript Types] --> B[Primitive Types]
    A --> C[Object Types]
    A --> D[Union Types]
    A --> E[Intersection Types]
    A --> F[Generics]
    C --> G[Interfaces / Type Aliases]
    D --> H[Narrowing Required]
    E --> I[Must satisfy all members]
    F --> J[Reusable type relationships]
```

---

## 8. Type narrowing flow

```mermaid
flowchart TD
    A[unknown or union value] --> B{typeof check}
    B -->|string| C[String operations]
    B -->|number| D[Number operations]
    B -->|object| E{null check / in / instanceof}
    E -->|Known shape| F[Safe property access]
    E -->|Unknown shape| G[Validate further]
```

Typical narrowing tools:

- `typeof`
- `instanceof`
- `in`
- Equality checks
- Custom type predicates
- Discriminated union fields

---

## 9. Generic API response architecture

```mermaid
flowchart TD
    A[API Response] --> B[ApiResponse<T>]
    B --> C[ApiResponse<User>]
    B --> D[ApiResponse<User[]>]
    C --> E[Single user data]
    D --> F[User collection data]
```

Example:

```ts
interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}
```

Generics preserve the specific type of `data` without using `any`.

---

## 10. Discriminated union state machine

```mermaid
stateDiagram-v2
    [*] --> Loading
    Loading --> Success: request succeeds
    Loading --> Error: request fails
    Success --> Loading: refetch
    Error --> Loading: retry
```

Type model:

```ts
type RequestState =
  | { status: "loading" }
  | { status: "success"; data: string[] }
  | { status: "error"; message: string };
```

The `status` field is the discriminant. It tells TypeScript which properties are available.

---

## 11. Frontend data flow using JavaScript and TypeScript

```mermaid
flowchart LR
    A[User Interaction] --> B[Event Handler]
    B --> C[Validation / Type Narrowing]
    C --> D[API Request]
    D --> E[Promise]
    E --> F[Typed API Response]
    F --> G[State Update]
    G --> H[UI Render]
```

This is the bridge from the completed JavaScript and TypeScript foundations to React + TypeScript.

---

## Revision method

For each diagram, explain:

1. What each box represents.
2. What triggers movement to the next box.
3. One practical frontend example.
4. One common interview mistake.
5. Time or memory implications when relevant.
