## 1. JavaScript Engine & Runtime

A **JavaScript Engine** is an interpreter that parses and executes JavaScript code. Modern engines use **Just-In-Time (JIT) compilation** to convert JavaScript into machine code for the processor. While primarily used in web browsers for client-side code, they also power server-side environments like Node.js.

### Major JavaScript Engines

* **V8:** Google Chrome, Edge, Opera, Brave, Node.js
* **SpiderMonkey:** Mozilla Firefox
* **Nitro (JavaScriptCore):** Apple Safari

### Why is JavaScript Single-Threaded?

JavaScript was designed as a single-threaded language by Brendan Eich in 1995 to keep the language simple and safe for manipulating the browser's Document Object Model (DOM) without concurrency conflicts.

### The JavaScript Runtime Architecture

The engine does not work alone; it operates within a larger runtime environment that handles asynchronous tasks.

```text
┌─────────────────────────────────────────────────────────────────────────┐
│                        JAVASCRIPT RUNTIME                               │
│  ┌─────────────────────────────────────────────────────────────────┐    │
│  │                      JAVASCRIPT ENGINE (V8, SpiderMonkey, etc.) │    │
│  │  ┌───────────────────────┐    ┌───────────────────────────┐     │    │
│  │  │       CALL STACK      │    │           HEAP            │     │    │
│  │  │                       │    │                           │     │    │
│  │  │  ┌─────────────────┐  │    │   { objects stored here } │     │    │
│  │  │  │ processData()   │  │    │   [ arrays stored here ]  │     │    │
│  │  │  ├─────────────────┤  │    │   function references     │     │    │
│  │  │  │ fetchUser()     │  │    │                           │     │    │
│  │  │  ├─────────────────┤  │    │                           │     │    │
│  │  │  │ main()          │  │    │                           │     │    │
│  │  │  └─────────────────┘  │    └───────────────────────────┘     │    │
│  │  └───────────────────────┘                                      │    │
│  └─────────────────────────────────────────────────────────────────┘    │
│                                                                         │
│  ┌─────────────────────────────────────────────────────────────────┐    │
│  │                    BROWSER / NODE.js APIs                       │    │
│  │                                                                 │    │
│  │   setTimeout()    setInterval()    fetch()    DOM events        │    │
│  │   requestAnimationFrame()    IndexedDB    WebSockets            │    │
│  │                                                                 │    │
│  │   (These are handled outside of JavaScript execution!)          │    │
│  └─────────────────────────────────────────────────────────────────┘    │
│                                    │                                    │
│                                    │ callbacks                          │
│                                    ▼                                    │
│  ┌──────────────────────────────────────────────────────────────────┐   │
│  │  MICROTASK QUEUE                    TASK QUEUE (Macrotask)       │   │
│  │  ┌────────────────────────┐        ┌─────────────────────────┐   │   │
│  │  │ Promise.then()         │        │ setTimeout callback     │   │   │
│  │  │ queueMicrotask()       │        │ setInterval callback    │   │   │
│  │  │ MutationObserver       │        │ I/O callbacks           │   │   │
│  │  │ async/await (after)    │        │ UI event handlers       │   │   │
│  │  └────────────────────────┘        │ Event handlers          │   │   │
│  │         ▲                          └─────────────────────────┘   │   │
│  │         │ HIGHER PRIORITY                    ▲                   │   │
│  └─────────┼────────────────────────────────────┼───────────────────┘   │
│            │                                    │                       │
│            └──────────┬─────────────────────────┘                       │
│                       │                                                 │
│              ┌────────┴────────┐                                        │
│              │   EVENT LOOP    │                                        │
│              │                 │                                        │
│              │  "Is the call   │                                        │
│              │   stack empty?" ├──────────► Push next callback          │
│              │                 │            to call stack               │
│              └─────────────────┘                                        │
└─────────────────────────────────────────────────────────────────────────┘

```

---

## 2. The Call Stack & Execution Context

### The Call Stack

A mechanism for the interpreter to keep track of its place in a script that calls multiple functions. It operates on a **LIFO (Last In, First Out)** principle. It tracks what function is currently running and what functions are called from within that function.

### Execution Context (EC)

When the JS engine scans a script file, it creates an environment called the Execution Context to handle the transformation and execution of the code.

There are two main types:

1. **Global Execution Context:** Created when a script first starts running. Represents the global scope.
2. **Function Execution Context:** Created brand new *every time* a function is invoked. Represents the function's local scope.

### The Two Phases of an Execution Context

1. **Memory Creation Phase:**
The engine allocates memory for variables and functions, scanning for declarations, and setting up the stage. Variables are stored as key-value pairs and are initially set to `undefined`. Function declarations are stored entirely in memory.
2. **Code Execution Phase:**
Code is executed line-by-line top to bottom. Variable values are initialized according to their assignments (replacing `undefined` with actual data).

> **Note on Function Returns:** When a function reaches a `return` statement, it hands control (and the return value) back to the previous execution context. The current function's execution context is then destroyed and removed from the Call Stack.

---

## 3. Hoisting & The Temporal Dead Zone (TDZ)

### Declaration vs. Initialization

* **Declaration:** Registers a variable name within its scope (e.g., `let a;`).
* **Initialization:** Allocates the memory and gives the variable its very first value (e.g., `a = 10;`).

### Hoisting

Hoisting is JavaScript’s behavior of moving *declarations* to the top of their scope during the compilation phase, before any code is executed. Only the declarations are hoisted, not the initializations.

*Analogy:* Moving into a new house. JavaScript knows about all the furniture (variables) before execution (reserving the living room for a sofa), but the actual items are only placed when the code runs.

#### How Different Types Hoist

| Declaration Type | Hoisted? | Initialized? | Accessible Before Declaration? |
| --- | --- | --- | --- |
| `var` | Yes | Yes (`undefined`) | Yes (returns `undefined`) |
| `let` / `const` | Yes | No (TDZ) | No (`ReferenceError`) |
| Function Declaration | Yes | Yes (full function) | Yes (fully usable) |
| Function Expression | Depends on keyword | No | No |
| Arrow Function | Depends on keyword | No | No |

### Temporal Dead Zone (TDZ)

The TDZ is the period between entering a scope and the actual declaration of a `let` or `const` variable. The variable exists in memory, but accessing it throws a `ReferenceError` to catch bugs early.

```javascript
function example() {
  // ┌─────────────────────────────────────────────┐
  // │        TEMPORAL DEAD ZONE FOR 'x'           │
  // │  console.log(x);  // ReferenceError!        │
  // └─────────────────────────────────────────────┘
  
  let x = 10;  // ← TDZ ends here, 'x' is now accessible
  console.log(x);  // 10 ✓
}

```

---

## 4. Memory Management

Memory management in JavaScript happens automatically via **Garbage Collection**, which tracks memory and frees it up when it is no longer reachable by the code.

**The Memory Lifecycle:**

1. **Allocate:** Reserve memory (Engine does this automatically).
2. **Use:** Read/Write data (You do this explicitly).
3. **Release:** Free memory when done (Garbage collector does this).

### Stack vs. Heap Memory

| Feature | Stack Memory | Heap Memory |
| --- | --- | --- |
| **Speed & Structure** | Fast, Ordered (LIFO) | Slower, Unordered, Flexible |
| **Data Stored** | Primitive data types (numbers, strings, booleans), object references, and function call information. | Objects, arrays, functions, and dynamically sized data. |
| **Lifecycle** | Memory is freed immediately when functions return. | Freed by the garbage collector when unreachable. |
| **Size Limit** | Limited (exceeding it causes a "stack overflow"). | No limit (except available system RAM). |

---

## 5. Scope, Variables, & Closures

### Types of Scope

1. **Global Scope:** Variables declared outside of any function or block. Accessible everywhere. In browsers, `var` attaches to the `window` object. Modern code uses `globalThis`.
2. **Function Scope:** Variables declared with `var` inside a function. Only accessible within that function.
3. **Block Scope:** Variables declared with `let` and `const` inside curly braces `{}` (if statements, loops). Not accessible outside the block.
4. **Lexical (Static) Scope:** The scope of a variable is determined by its position in the source code at parse-time ("lex-time"), not by how or where the function is called at runtime. Inner functions have access to their outer parent's scope.

### `var` vs `let` vs `const`

| Feature | `var` | `let` | `const` |
| --- | --- | --- | --- |
| **Scope** | Function | Block | Block |
| **Hoisting** | Yes (`undefined`) | Yes (TDZ) | Yes (TDZ) |
| **Redeclaration** | Allowed | Error | Error |
| **Reassignment** | Allowed | Allowed | Error |

### Closures

A closure is a function bundled together with references to its surrounding state (lexical environment).

If an inner function references variables from its outer scope, JavaScript keeps those variables alive *even after the outer function has finished executing*. Every function in JavaScript creates a closure at creation time.

```javascript
function createGreeter(greeting) {
  // 'greeting' is in createGreeter's scope
  return function(name) {
    // This inner function is a closure!
    // It "closes over" and remembers the 'greeting' variable
    console.log(`${greeting}, ${name}!`);
  };
}

const sayHello = createGreeter("Hello");
// createGreeter finishes executing here, but sayHello remembers "Hello"
sayHello("Alice");  // "Hello, Alice!"

```

### Scope vs. Lexical Environment

* **Scope** is the theoretical space or region in the code where a variable is valid and accessible (Global, Function, Block). It is defined at declaration.
* **Lexical Environment** is the actual, physical data structure created by the JavaScript engine under the hood when code runs. It consists of the local memory and a reference to the outer (parent) lexical environment.