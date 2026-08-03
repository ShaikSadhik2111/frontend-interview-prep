<!-- need to add above in structured notes -->
# JavaScript Day 01 - Core Concepts

## Table of Contents
1. [JavaScript Engine](#1-javascript-engine)
2. [Single-Threaded Nature](#2-single-threaded-nature)
3. [Call Stack](#3-call-stack)
4. [Execution Context](#4-execution-context)
5. [Hoisting](#5-hoisting)
6. [Memory Management](#6-memory-management)
7. [Scope](#7-scope)
8. [Closures](#8-closures)
9. [Variable Declaration Keywords](#9-variable-declaration-keywords)
10. [Scope vs Lexical Environment](#10-scope-vs-lexical-environment)

---

## 1. JavaScript Engine

### Definition
JavaScript engines are **interpreters** that parse and execute JavaScript code. Modern engines use **Just-In-Time (JIT) compilation** to convert JavaScript code into machine code executable by a computer's processor.

### Where It's Used
- **Web Browsers**: Client-side code execution
- **Server-Side**: Node.js and other server environments

### Common JavaScript Engines

| Engine | Used In |
|--------|---------|
| **V8** | Chrome, Brave, Node.js |
| **SpiderMonkey** | Firefox |
| **JavaScriptCore** | Safari |
| **Chakra** | Edge (legacy) |

### JavaScript Runtime Architecture

```
┌─────────────────────────────────────────────────────────────────────────┐
│                        JAVASCRIPT RUNTIME                               │
│                                                                         │
│  ┌─────────────────────────────────────────────────────────────────┐   │
│  │          JAVASCRIPT ENGINE (V8, SpiderMonkey, etc.)             │   │
│  │                                                                  │   │
│  │  ┌───────────────────────┐    ┌───────────────────────────┐     │   │
│  │  │      CALL STACK       │    │          HEAP             │     │   │
│  │  │                       │    │                           │     │   │
│  │  │  ┌─────────────────┐  │    │   { objects }             │     │   │
│  │  │  │ processData()   │  │    │   [ arrays ]              │     │   │
│  │  │  ├─────────────────┤  │    │   function references     │     │   │
│  │  │  │ fetchUser()     │  │    │   complex data structures │     │   │
│  │  │  ├─────────────────┤  │    │                           │     │   │
│  │  │  │ main()          │  │    │                           │     │   │
│  │  │  └─────────────────┘  │    └───────────────────────────┘     │   │
│  │  └───────────────────────┘                                      │   │
│  │                                                                  │   │
│  └─────────────────────────────────────────────────────────────────┘   │
│                                                                         │
│  ┌─────────────────────────────────────────────────────────────────┐   │
│  │              BROWSER / NODE.js APIs                              │   │
│  │        (Handled OUTSIDE JavaScript execution!)                  │   │
│  │                                                                  │   │
│  │   setTimeout()           setInterval()                          │   │
│  │   fetch()               DOM events                              │   │
│  │   requestAnimationFrame()      IndexedDB                         │   │
│  │   WebSockets            Console API                             │   │
│  │                                                                  │   │
│  └─────────────────────────────────────────────────────────────────┘   │
│                                  │                                      │
│                                  │ callbacks returned                   │
│                                  ▼                                      │
│  ┌──────────────────────────────────────────────────────────────────┐  │
│  │         EVENT LOOP MANAGES THESE TWO QUEUES                      │  │
│  │                                                                  │  │
│  │  ┌─ MICROTASK QUEUE (Higher Priority) ──┐                       │  │
│  │  │                                       │                       │  │
│  │  │  • Promise.then()                     │                       │  │
│  │  │  • Promise.catch()                    │                       │  │
│  │  │  • Promise.finally()                  │                       │  │
│  │  │  • queueMicrotask()                   │                       │  │
│  │  │  • MutationObserver                   │                       │  │
│  │  │  • async/await (after promise)        │                       │  │
│  │  │                                       │                       │  │
│  │  └───────────────────────────────────────┘                       │  │
│  │               ▲                                                   │  │
│  │               │ Executes ALL microtasks                          │  │
│  │               │ before moving to macrotasks                      │  │
│  │                                                                  │  │
│  │  ┌─ TASK QUEUE / MACROTASK QUEUE (Lower Priority) ──┐            │  │
│  │  │                                                   │            │  │
│  │  │  • setTimeout() callback                         │            │  │
│  │  │  • setInterval() callback                        │            │  │
│  │  │  • setImmediate() callback                       │            │  │
│  │  │  • I/O operations callbacks                      │            │  │
│  │  │  • UI event handlers (click, scroll, etc.)      │            │  │
│  │  │  • requestAnimationFrame() callback              │            │  │
│  │  │                                                   │            │  │
│  │  └───────────────────────────────────────────────────┘            │  │
│  │                                                                  │  │
│  └──────────────────────────────────────────────────────────────────┘  │
│                                                                         │
│              ┌────────────────────────────────────┐                    │
│              │      EVENT LOOP ALGORITHM          │                    │
│              ├────────────────────────────────────┤                    │
│              │  1. Execute sync code              │                    │
│              │  2. Is call stack empty?           │                    │
│              │     YES → Process ALL microtasks   │                    │
│              │  3. Process ONE macrotask          │                    │
│              │  4. Render if needed               │                    │
│              │  5. Repeat from step 2             │                    │
│              └────────────────────────────────────┘                    │
│                                                                         │
└─────────────────────────────────────────────────────────────────────────┘
```

---

## 2. Single-Threaded Nature

### Why JavaScript is Single-Threaded

**Designer**: Brendan Eich (1995)

**Reasons**:
1. **Simplicity** - Easier to understand and use
2. **DOM Safety** - Prevents race conditions when manipulating DOM
3. **No Thread Management Complexity** - No locks, semaphores, or concurrent access issues
4. **Consistency** - Predictable execution order

### What This Means

```javascript
// Only ONE line of code executes at a time
console.log("1");
console.log("2");
console.log("3");

// Output: Always 1, 2, 3 (in order)
// Never executes in parallel
```

### Asynchronous Operations Are NOT Parallel

Despite being single-threaded, JavaScript handles async operations via:
- **Web APIs** (handled by browser/Node.js)
- **Callbacks** (queued for later execution)
- **Event Loop** (coordinates execution)

```javascript
console.log("Start");

setTimeout(() => {
  console.log("Async operation");
}, 0);

console.log("End");

// Output: Start, End, Async operation
// setTimeout doesn't execute immediately!
```

---

## 3. Call Stack

### Definition
A **mechanism** for the JavaScript interpreter to track:
- What function is currently executing
- What function called it
- Where to return when function completes
- The order of function execution

### The LIFO Principle

**LIFO** = Last In, First Out

```
PUSH (Call)        │        POP (Return)
─────────────      │        ──────────────
                   │
function a() {     │        return "a result"
  b();             │        ▲ POPPED (3)
}                  │
                   │        
function b() {     │        return "b result"
  c();             │        ▲ POPPED (2)
}                  │
                   │        
function c() {     │        return "c result"
  return "done";   │        ▲ POPPED (1)
}                  │
                   │
a();               │        PUSHED (3): c()
                   │        PUSHED (2): b()
                   │        PUSHED (1): a()
```

### Call Stack Visualization

```
STACK STATE DURING EXECUTION

Step 1: a() called
┌──────────┐
│    a()   │ ← Top
└──────────┘

Step 2: b() called from a()
┌──────────┐
│    b()   │ ← Top
├──────────┤
│    a()   │
└──────────┘

Step 3: c() called from b()
┌──────────┐
│    c()   │ ← Top
├──────────┤
│    b()   │
├──────────┤
│    a()   │
└──────────┘

Step 4: c() returns
┌──────────┐
│    b()   │ ← Top
├──────────┤
│    a()   │
└──────────┘

Step 5: b() returns
┌──────────┐
│    a()   │ ← Top
└──────────┘

Step 6: a() returns (Stack empty)
┌──────────┐
│  (empty) │
└──────────┘
```

### Stack Overflow Example

```javascript
// Infinite recursion causes stack overflow
function infiniteLoop() {
  infiniteLoop();  // Calls itself forever
}

infiniteLoop();
// Error: Maximum call stack size exceeded
```

---

## 4. Execution Context

### Definition
An **execution context** is a container/bubble where JavaScript code is executed. It includes:
- Memory allocation for variables and functions
- Code execution management
- Variable scope references
- Lexical environment

### Two Phases of Execution

```
EXECUTION CONTEXT
│
├─► PHASE 1: Memory Creation Phase
│   ├─ Scan for variable declarations
│   ├─ Allocate memory for variables (undefined)
│   ├─ Allocate memory for functions (full body)
│   └─ Set up scope chain
│
└─► PHASE 2: Code Execution Phase
    ├─ Initialize variables with actual values
    ├─ Execute code line by line
    ├─ Create new context for function calls
    └─ Manage return values
```

### Phase 1: Memory Creation Phase

**What Happens:**
1. JavaScript scans the code
2. Finds all variable and function declarations
3. Allocates memory for each
4. Variables initialized as `undefined`
5. Functions stored with their body

**Example Code:**
```javascript
var n = 4;
function sum(num) {
    var ans = num + num;
    return ans;
}
var answer = sum(n);
console.log(answer);
```

**Memory State After Phase 1:**
```
Global Execution Context - Memory Table:
┌────────┬──────────────────────────────────────┐
│  key   │  value                               │
├────────┼──────────────────────────────────────┤
│   n    │  undefined                           │
├────────┼──────────────────────────────────────┤
│  sum   │  [function body]                     │
│        │  {                                   │
│        │    var ans = num + num;              │
│        │    return ans;                       │
│        │  }                                   │
├────────┼──────────────────────────────────────┤
│ answer │  undefined                           │
└────────┴──────────────────────────────────────┘
```

### Phase 2: Code Execution Phase

**Step-by-Step Execution:**

```
Line 1: var n = 4;
  └─► UPDATE: n from undefined → 4

Line 2-5: function sum() { ... }
  └─► SKIP: Already in memory from Phase 1

Line 6: var answer = sum(n);
  ├─► CALL sum(n) with n=4
  │
  ├─► NEW EXECUTION CONTEXT CREATED FOR sum()
  │   
  │   Memory Creation (for sum's context):
  │   ┌────────┬──────────┐
  │   │  num   │ undefined│
  │   ├────────┼──────────┤
  │   │  ans   │ undefined│
  │   └────────┴──────────┘
  │   
  │   Code Execution (for sum's context):
  │   ├─ num = 4 (from parameter)
  │   ├─ ans = 4 + 4 = 8
  │   └─ return 8 (DELETE this context, return value)
  │
  └─► BACK TO GLOBAL: answer = 8

Line 7: console.log(answer);
  └─► OUTPUT: 8
```

### Types of Execution Context

#### 1. Global Execution Context
```javascript
// Automatically created when script starts
// Represents global scope
console.log(this);  // window (browser) or global (Node.js)
```

#### 2. Function Execution Context
```javascript
function myFunction() {
  // NEW execution context created here
  // Has its own memory, scope, and 'this'
}

myFunction();  // Context created
// Context deleted after execution
```

### Execution Context Stack (Call Stack)

```
CALL STACK SHOWS ALL ACTIVE CONTEXTS

Execution starts
       ▼
┌──────────────────┐
│    GLOBAL EC     │ ← Always present
└──────────────────┘

function a() is called
       ▼
┌──────────────────┐
│   Function a EC  │ ← Stacked on top
├──────────────────┤
│    GLOBAL EC     │
└──────────────────┘

function b() is called from a()
       ▼
┌──────────────────┐
│   Function b EC  │ ← New context
├──────────────────┤
│   Function a EC  │
├──────────────────┤
│    GLOBAL EC     │
└──────────────────┘

b() returns
       ▼
┌──────────────────┐
│   Function a EC  │ ← b EC removed
├──────────────────┤
│    GLOBAL EC     │
└──────────────────┘

a() returns
       ▼
┌──────────────────┐
│    GLOBAL EC     │ ← a EC removed
└──────────────────┘
```

---

## 5. Hoisting

### Definition
**Hoisting** is JavaScript's behavior of **moving declarations to the top of their scope** during the compilation phase, BEFORE any code is executed.

**Key Point:** Only DECLARATIONS are hoisted, NOT INITIALIZATIONS.

### The Hoisting Analogy: Moving Day

```
┌─────────────────────────────────────────────────────────────────────────┐
│                  HOISTING: THE MOVING DAY ANALOGY                        │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                          │
│   BEFORE YOU ARRIVE (Compilation Phase)                                  │
│   ─────────────────────────────────────                                  │
│                                                                          │
│   ┌──────────────┐  ┌──────────────┐  ┌──────────────┐                  │
│   │  LIVING ROOM │  │   BEDROOM    │  │   KITCHEN    │                  │
│   │              │  │              │  │              │                  │
│   │   [empty]    │  │   [empty]    │  │   [empty]    │                  │
│   │   Reserved   │  │   Reserved   │  │   Reserved   │                  │
│   │   for: sofa  │  │   for: bed   │  │   for: table │                  │
│   └──────────────┘  └──────────────┘  └──────────────┘                  │
│                                                                          │
│   ↓ (Execution Phase - You're unpacking)                                │
│                                                                          │
│   AFTER UNPACKING (Execution Phase)                                      │
│   ─────────────────────────────────                                      │
│                                                                          │
│   ┌──────────────┐  ┌──────────────┐  ┌──────────────┐                  │
│   │  LIVING ROOM │  │   BEDROOM    │  │   KITCHEN    │                  │
│   │              │  │              │  │              │                  │
│   │   [SOFA]     │  │    [BED]     │  │   [TABLE]    │                  │
│   │              │  │              │  │              │                  │
│   └──────────────┘  └──────────────┘  └──────────────┘                  │
│                                                                          │
│   Analogy: JavaScript reserves space (declares) before                   │
│   you assign actual values (initialize) during execution.                │
│                                                                          │
└─────────────────────────────────────────────────────────────────────────┘
```

### Declaration vs Initialization

```javascript
// DECLARATION: Register variable name in scope
let x;                  // Just declare
var y;                  // Just declare

// INITIALIZATION: Assign first value
x = 5;                  // Just initialize (if already declared)
y = 10;                 // Just initialize

// BOTH: Declare and initialize together
let z = 15;             // Declare AND initialize
const PI = 3.14;        // Declare AND initialize
```

### Hoisting Behavior by Type

```
┌──────────────────┬──────────────┬──────────────────┬─────────────────────┐
│ Declaration Type │   Hoisted?   │   Initialized?   │ Accessible Before?  │
├──────────────────┼──────────────┼──────────────────┼─────────────────────┤
│      var         │      ✓ Yes   │  ✓ Yes (undef)   │ ✓ Yes (undefined)   │
├──────────────────┼──────────────┼──────────────────┼─────────────────────┤
│     let          │      ✓ Yes   │  ✗ No (TDZ)      │ ✗ No (ReferenceErr) │
├──────────────────┼──────────────┼──────────────────┼─────────────────────┤
│     const        │      ✓ Yes   │  ✗ No (TDZ)      │ ✗ No (ReferenceErr) │
├──────────────────┼──────────────┼──────────────────┼─────────────────────┤
│ Function Decl.   │      ✓ Yes   │ ✓ Yes (full fn)  │ ✓ Yes (usable)      │
├──────────────────┼──────────────┼──────────────────┼─────────────────────┤
│ Function Expr.   │    Depends   │      ✗ No        │ ✗ No                │
├──────────────────┼──────────────┼──────────────────┼─────────────────────┤
│      class       │      ✓ Yes   │  ✗ No (TDZ)      │ ✗ No (ReferenceErr) │
├──────────────────┼──────────────┼──────────────────┼─────────────────────┤
│      import      │      ✓ Yes   │  ✓ Yes           │ ✓ Yes               │
└──────────────────┴──────────────┴──────────────────┴─────────────────────┘
```

### Hoisting Examples

#### ✓ var - Fully Hoisted

```javascript
console.log(name);  // undefined (not an error!)
var name = "John";
console.log(name);  // "John"

// JavaScript interprets as:
var name;           // Hoisted to top
console.log(name);  // undefined
name = "John";      // Assignment stays in place
console.log(name);  // "John"
```

#### ✓ Function Declaration - Fully Hoisted

```javascript
// ✓ WORKS! Can call before declaration
sayHello("World");  // "Hello, World!"

function sayHello(name) {
  console.log(`Hello, ${name}!`);
}

// JavaScript hoists the entire function to the top
```

#### ✗ let/const - TDZ (Temporal Dead Zone)

```javascript
// ✗ ReferenceError: Cannot access 'message' before initialization
console.log(message);

let message = "Hello";

// Variable is hoisted but in Temporal Dead Zone
// Accessing it throws an error
```

#### ✗ Function Expression - Not Hoisted as Function

```javascript
// ✗ TypeError: greet is not a function
greet();

var greet = function() {
  console.log("Hello!");
};

// JavaScript interprets as:
var greet;           // Hoisted (undefined)
greet();             // Error: undefined is not a function
greet = function() { // Assignment stays in place
  console.log("Hello!");
};
```

#### ✗ Arrow Functions - Always Expressions

```javascript
// ✗ ReferenceError: Cannot access 'sayHi' before initialization
sayHi();

const sayHi = () => {
  console.log("Hi!");
};

// Arrow functions are always expressions, so they're NOT hoisted
```

### Temporal Dead Zone (TDZ)

#### What is TDZ?

The **Temporal Dead Zone** is the period between:
- **Start**: When execution enters a scope
- **End**: When the let/const declaration line is reached

During this time:
- Variable EXISTS in memory (hoisted)
- Variable is INACCESSIBLE (not initialized)
- Accessing it throws `ReferenceError`

#### TDZ Visualization

```
┌──────────────────────────────────────────────────────────────────────────┐
│                  TEMPORAL DEAD ZONE (TDZ) FOR 'x'                         │
│                                                                          │
│  function example() {                                                    │
│                                                                          │
│    // ┌────────────────────────────────────────────┐                    │
│    // │       TEMPORAL DEAD ZONE STARTS HERE       │                    │
│    // │                                            │                    │
│    console.log(x);  // ✗ ReferenceError            │                    │
│    console.log(x);  // ✗ ReferenceError            │                    │
│    console.log(x);  // ✗ ReferenceError            │                    │
│    //                                              │                    │
│    // │       TEMPORAL DEAD ZONE ENDS HERE        │                    │
│    // └────────────────────────────────────────────┘                    │
│                                                                          │
│    let x = 10;  // ← TDZ ENDS, 'x' is now initialized and accessible     │
│                                                                          │
│    console.log(x);  // ✓ 10                                              │
│  }                                                                       │
│                                                                          │
└──────────────────────────────────────────────────────────────────────────┘
```

#### Purpose of TDZ

Catch common bugs BEFORE they happen:

```javascript
// Without TDZ (var):
console.log(x);  // undefined (bug! silent)
if (someCondition) {
  var x = 5;
}

// With TDZ (let/const):
console.log(x);  // ✓ ReferenceError (caught immediately!)
if (someCondition) {
  let x = 5;
}
```

---

## 6. Memory Management

### Definition
Memory management is the process of:
1. **ALLOCATE** - Reserve memory when data is created
2. **USE** - Read/write data while it's needed
3. **RELEASE** - Free memory when data is no longer needed

In JavaScript, this is handled automatically by the **Garbage Collector**.

### Memory Lifecycle

```
┌──────────────────────────────────────────────────────────────────────────┐
│                        MEMORY LIFECYCLE                                   │
├──────────────────────────────────────────────────────────────────────────┤
│                                                                          │
│    ┌──────────────┐      ┌──────────────┐      ┌──────────────┐         │
│    │  ALLOCATE    │ ───► │     USE      │ ───► │   RELEASE    │         │
│    │              │      │              │      │              │         │
│    │ Reserve      │      │ Read/Write   │      │ Free memory  │         │
│    │ memory       │      │ data         │      │ when done    │         │
│    └──────────────┘      └──────────────┘      └──────────────┘         │
│                                                                          │
│    Automatic in JS    You write this code  Automatic (GC)               │
│                                                                          │
└──────────────────────────────────────────────────────────────────────────┘
```

### Garbage Collection

```javascript
// Object created, memory allocated
const user = { name: "Alice", age: 30 };

// Use the object
console.log(user.name);

// Remove reference
user = null;

// ✓ Garbage Collector detects no references
// ✓ Memory is automatically freed
```

### Stack vs Heap Memory

#### Stack Memory

**Characteristics:**
- ✓ **Fast** - Quick access
- ✓ **Ordered** - LIFO structure
- ✓ **Fixed Size** - Pre-allocated
- ✓ **Automatic Cleanup** - Freed when function returns
- ✗ **Limited Size** - Causes stack overflow if exceeded

**What's Stored:**
- Primitive data types (numbers, strings, booleans)
- Function call information (stack frames)
- References to heap objects

**Example:**
```javascript
let count = 42;      // Stored on stack
let active = true;   // Stored on stack
let price = 19.99;   // Stored on stack
```

#### Heap Memory

**Characteristics:**
- ✓ **Flexible** - Dynamic sizing
- ✓ **Large** - Nearly unlimited
- ✗ **Slower** - Slower than stack access
- ✓ **Garbage Collected** - Freed when unreachable
- ✗ **Unordered** - Random access (via references)

**What's Stored:**
- Objects `{ }`
- Arrays `[ ]`
- Functions
- Any dynamically sized data
- Complex data structures

**Example:**
```javascript
let user = { name: "Alice" };  // Reference on stack
                               // Object stored on heap
let numbers = [1, 2, 3];       // Reference on stack
                               // Array stored on heap
```

#### Stack vs Heap Diagram

```
┌─────────────────────────────────────────────────────────────────────────┐
│                    STACK vs HEAP MEMORY                                  │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                          │
│  STACK (Fast, Ordered)          │  HEAP (Flexible, Unordered)           │
│  ┌─────────────────────┐         │  ┌─────────────────────────────┐     │
│  │                     │         │  │                             │     │
│  │  let count = 42     │         │  │  ┌─────────────────────┐    │     │
│  │  ├─────────────────┤         │  │  │ { name: "Alice" }   │    │     │
│  │  │                 │         │  │  └─────────────────────┘    │     │
│  │  │ let active=true │         │  │         ┌───────────┐       │     │
│  │  │  ├────────────┤          │  │         │ [1, 2, 3] │       │     │
│  │  │              │           │  │         └───────────┘       │     │
│  │  │ let price=19.99          │  │     ┌─────────────────┐     │     │
│  │  │  ├────────────┤          │  │     │ function() {..} │     │     │
│  │  │              │           │  │     └─────────────────┘     │     │
│  │  │ ref to obj ──┼───────────┼─┼──►┌─────────────────┐        │     │
│  │  │              │           │  │   │ { id: 1 }       │        │     │
│  │  └─────────────────────┘   │  │   └─────────────────┘        │     │
│  │                             │  │                             │     │
│  │ ✓ Fixed size               │  │  ✓ Dynamic size             │     │
│  │ ✓ Very fast                │  │  ✓ Can grow/shrink          │     │
│  │ ✓ Auto cleanup             │  │  ✓ GC cleanup               │     │
│  │ ✗ Limited capacity         │  │  ✗ Slower access            │     │
│  │                             │  │                             │     │
│  └─────────────────────────────┘  └─────────────────────────────┘     │
│                                                                          │
└─────────────────────────────────────────────────────────────────────────┘
```

### Memory Allocation Examples

```javascript
// Primitive allocation
const n = 123;                      // Stack: number value
const s = "hello";                  // Stack: reference + Heap: string
const b = true;                     // Stack: boolean value

// Object allocation
const obj = { a: 1, b: 2 };         // Stack: ref + Heap: object data
const arr = [1, 2, 3];              // Stack: ref + Heap: array data
const fn = function() {};           // Stack: ref + Heap: function

// Allocation via operations (Creates NEW allocations)
const s2 = s.substring(0, 3);       // NEW string allocated on heap
const arr2 = arr.concat([4, 5]);    // NEW array allocated on heap
const obj2 = { ...obj, c: 3 };      // NEW object allocated on heap
```

### Initialization

**Definition:** Initialization is the process of assigning an initial value to a variable, object, or data structure at the time of creation or before first use.

```javascript
// Variable initialization
let name = "Alice";              // Initialize with string
let count = 0;                   // Initialize with number
let items = [];                  // Initialize with empty array

// Object initialization
const person = {                 // Initialize with values
  name: "Bob",
  age: 25,
  isActive: true
};

// Function initialization
const greet = (name) => {        // Function as value
  return `Hello, ${name}!`;
};
```

---

## 7. Scope

### Definition
**Scope** is the **theoretical space or region** in code where a variable is:
- Valid and accessible
- Can be referenced
- Can be used and modified

Scope is determined at **"lex time"** (parse time), BEFORE code execution.

### Types of Scope

#### 1. Global Scope

**Definition:** Variables accessible from ANYWHERE in the code.

```javascript
// Global scope
const appName = "MyApp";
let userCount = 0;
var globalVar = "I'm global";

function greet() {
  console.log(appName);   // ✓ Can access
  userCount++;            // ✓ Can modify
}

if (true) {
  console.log(appName);   // ✓ Can access
}

greet();
console.log(userCount);   // ✓ 1
```

**Global Object Property:**

```javascript
// In browsers:
var oldSchool = "I'm on window";      // ✓ window.oldSchool
let modern = "I'm NOT on window";     // ✗ NOT on window
const const_var = "Also NOT window";  // ✗ NOT on window

// In Node.js:
global.oldSchool;                     // ✓ Yes (var)
global.modern;                        // ✗ No (let)

// Universal (works everywhere):
console.log(globalThis);              // ✓ Works in browser, Node.js, etc.
```

#### 2. Function Scope

**Definition:** Variables only accessible within that function.

```javascript
function calculateTotal() {
  var subtotal = 100;    // Function scoped
  let tax = 10;          // Function scoped
  const total = subtotal + tax;
  
  console.log(total);    // ✓ 110
}

calculateTotal();
// console.log(subtotal);  // ✗ ReferenceError
// console.log(tax);       // ✗ ReferenceError
// console.log(total);     // ✗ ReferenceError
```

**var Hoisting in Functions:**

```javascript
function example() {
  console.log(message);  // undefined (not an error!)
  var message = "Hello";
  console.log(message);  // "Hello"
}

// JavaScript interprets as:
function exampleHoisted() {
  var message;           // Hoisted to top of function
  console.log(message);  // undefined
  message = "Hello";
  console.log(message);  // "Hello"
}

example();
```

#### 3. Block Scope

**Definition:** Variables only accessible within that block (if, for, while, try/catch, etc.).

```javascript
// if block
if (true) {
  let blockLet = "I'm block-scoped";
  const blockConst = "Me too";
  var functionVar = "I escape the block!";
}

// console.log(blockLet);     // ✗ ReferenceError
// console.log(blockConst);   // ✗ ReferenceError
console.log(functionVar);     // ✓ "I escape the block!"

// for block
for (let i = 0; i < 3; i++) {
  console.log(i);  // ✓ 0, 1, 2 (inside loop)
}
// console.log(i);  // ✗ ReferenceError (outside loop)

// try/catch block
try {
  let errorVar = "In try block";
  throw new Error("Test");
} catch (e) {
  let catchVar = "In catch block";
  console.log(e);  // ✓ Works
}
// console.log(errorVar);  // ✗ ReferenceError
// console.log(catchVar);  // ✗ ReferenceError
```

**Important:** `var` is NOT block-scoped!

```javascript
if (true) {
  var x = 10;     // Function scoped, not block scoped!
}

console.log(x);   // ✓ 10 (x escaped the block!)

// This is why var is problematic
for (var i = 0; i < 5; i++) {
  // ...
}
console.log(i);   // ✓ 5 (i escaped the loop!)
```

#### 4. Lexical Scope (Static Scope)

**Definition:** Scope is determined by **position in source code**, NOT by how functions are called at runtime.

Also called **"static scope"** - determined at "lex time" (parsing).

```javascript
const outer = "I'm outside!";

function outerFunction() {
  const middle = "I'm in the middle!";
  
  function innerFunction() {
    const inner = "I'm inside!";
    
    // innerFunction can access all three (by position)
    console.log(inner);   // ✓ Own scope
    console.log(middle);  // ✓ Parent scope (lexical)
    console.log(outer);   // ✓ Global scope (lexical)
  }
  
  innerFunction();
  // console.log(inner);  // ✗ ReferenceError (can't escape inner scope)
}

outerFunction();
// console.log(middle);   // ✗ ReferenceError
```

**Key Concept:** The scope is determined by WHERE the function is DEFINED, not WHERE it is CALLED.

```javascript
const x = "global";

function outer() {
  const x = "outer";
  inner();  // Call inner from here
}

function inner() {
  console.log(x);  // Which 'x'? 
}

outer();
// Output: "global"
// Because inner() is DEFINED in global scope
// (not because it was CALLED from outer())
```

---

## 8. Closures

### Definition

**Closure** is a **function together with the lexical environment** in which it was created.

**Mozilla Definition:** A closure gives a function access to variables from its outer enclosing scope.

**Key Point:** When an inner function references variables from its outer scope, JavaScript keeps those variables **alive** even after the outer function has finished executing.

### Important Note

**Every function in JavaScript creates a closure at creation time.** This is automatic - every function maintains a reference to its lexical environment.

### The Office Building Analogy

> A closure is like someone who worked in a private office, left the building, but still remembers exactly where everything was, and can still use that knowledge!

```
OFFICE BUILDING SCENARIO

Office Floor (Lexical Environment)
┌─────────────────────────────────┐
│  ┌─────────────────────────────┐│
│  │ Office Space (createGreeter)││
│  │                             ││
│  │  Files: greeting = "Hello"  ││
│  │                             ││
│  │  ┌───────────────────────┐  ││
│  │  │ Inner Function        │  ││
│  │  │ Returns with memory   │  ││
│  │  │ of "Hello"            │  ││
│  │  └───────────────────────┘  ││
│  └─────────────────────────────┘│
│  Person leaves building...      │
│  But REMEMBERS where files are! │
└─────────────────────────────────┘
       ↓
Can still access the knowledge/variables!
```

### Practical Examples

#### Example 1: Basic Closure

```javascript
function createGreeter(greeting) {
  // 'greeting' is in createGreeter's scope
  
  return function(name) {
    // This inner function is a CLOSURE!
    // It "closes over" the 'greeting' variable
    console.log(`${greeting}, ${name}!`);
  };
}

const sayHello = createGreeter("Hello");
const sayHola = createGreeter("Hola");

// createGreeter has FINISHED executing, but...
sayHello("Alice");  // "Hello, Alice!" ✓
sayHola("Bob");     // "Hola, Bob!" ✓

// The inner functions still remember their respective 'greeting' values!
```

**How It Works:**

```
Step 1: createGreeter("Hello") called
  ├─ Create execution context for createGreeter
  ├─ greeting = "Hello"
  ├─ Return inner function (closure)
  └─ Execution context destroyed, but 'greeting' kept alive!

Step 2: sayHello("Alice") called
  ├─ Execute inner function
  ├─ Access 'greeting' from closure (still "Hello")
  ├─ console.log("Hello, Alice!")
  └─ Done

Step 3: sayHola("Bob") called
  ├─ Execute inner function
  ├─ Access 'greeting' from closure (still "Hola")
  ├─ console.log("Hola, Bob!")
  └─ Done
```

#### Example 2: Counter Closure

```javascript
function createCounter() {
  let count = 0;  // Enclosed in closure
  
  return {
    increment: function() {
      count++;
      return count;
    },
    decrement: function() {
      count--;
      return count;
    },
    getCount: function() {
      return count;
    }
  };
}

const counter = createCounter();

console.log(counter.increment());  // 1
console.log(counter.increment());  // 2
console.log(counter.decrement());  // 1
console.log(counter.getCount());   // 1

// 'count' is private! Can't access directly
console// filepath: c:\Learning_journy\frontend-interview-prep\javascript\day-01\notes.md

# JavaScript Day 01 - Core Concepts

## Table of Contents
1. [JavaScript Engine](#1-javascript-engine)
2. [Single-Threaded Nature](#2-single-threaded-nature)
3. [Call Stack](#3-call-stack)
4. [Execution Context](#4-execution-context)
5. [Hoisting](#5-hoisting)
6. [Memory Management](#6-memory-management)
7. [Scope](#7-scope)
8. [Closures](#8-closures)
9. [Variable Declaration Keywords](#9-variable-declaration-keywords)
10. [Scope vs Lexical Environment](#10-scope-vs-lexical-environment)

---

## 1. JavaScript Engine

### Definition
JavaScript engines are **interpreters** that parse and execute JavaScript code. Modern engines use **Just-In-Time (JIT) compilation** to convert JavaScript code into machine code executable by a computer's processor.

### Where It's Used
- **Web Browsers**: Client-side code execution
- **Server-Side**: Node.js and other server environments

### Common JavaScript Engines

| Engine | Used In |
|--------|---------|
| **V8** | Chrome, Brave, Node.js |
| **SpiderMonkey** | Firefox |
| **JavaScriptCore** | Safari |
| **Chakra** | Edge (legacy) |

### JavaScript Runtime Architecture

```
┌─────────────────────────────────────────────────────────────────────────┐
│                        JAVASCRIPT RUNTIME                               │
│                                                                         │
│  ┌─────────────────────────────────────────────────────────────────┐   │
│  │          JAVASCRIPT ENGINE (V8, SpiderMonkey, etc.)             │   │
│  │                                                                  │   │
│  │  ┌───────────────────────┐    ┌───────────────────────────┐     │   │
│  │  │      CALL STACK       │    │          HEAP             │     │   │
│  │  │                       │    │                           │     │   │
│  │  │  ┌─────────────────┐  │    │   { objects }             │     │   │
│  │  │  │ processData()   │  │    │   [ arrays ]              │     │   │
│  │  │  ├─────────────────┤  │    │   function references     │     │   │
│  │  │  │ fetchUser()     │  │    │   complex data structures │     │   │
│  │  │  ├─────────────────┤  │    │                           │     │   │
│  │  │  │ main()          │  │    │                           │     │   │
│  │  │  └─────────────────┘  │    └───────────────────────────┘     │   │
│  │  └───────────────────────┘                                      │   │
│  │                                                                  │   │
│  └─────────────────────────────────────────────────────────────────┘   │
│                                                                         │
│  ┌─────────────────────────────────────────────────────────────────┐   │
│  │              BROWSER / NODE.js APIs                              │   │
│  │        (Handled OUTSIDE JavaScript execution!)                  │   │
│  │                                                                  │   │
│  │   setTimeout()           setInterval()                          │   │
│  │   fetch()               DOM events                              │   │
│  │   requestAnimationFrame()      IndexedDB                         │   │
│  │   WebSockets            Console API                             │   │
│  │                                                                  │   │
│  └─────────────────────────────────────────────────────────────────┘   │
│                                  │                                      │
│                                  │ callbacks returned                   │
│                                  ▼                                      │
│  ┌──────────────────────────────────────────────────────────────────┐  │
│  │         EVENT LOOP MANAGES THESE TWO QUEUES                      │  │
│  │                                                                  │  │
│  │  ┌─ MICROTASK QUEUE (Higher Priority) ──┐                       │  │
│  │  │                                       │                       │  │
│  │  │  • Promise.then()                     │                       │  │
│  │  │  • Promise.catch()                    │                       │  │
│  │  │  • Promise.finally()                  │                       │  │
│  │  │  • queueMicrotask()                   │                       │  │
│  │  │  • MutationObserver                   │                       │  │
│  │  │  • async/await (after promise)        │                       │  │
│  │  │                                       │                       │  │
│  │  └───────────────────────────────────────┘                       │  │
│  │               ▲                                                   │  │
│  │               │ Executes ALL microtasks                          │  │
│  │               │ before moving to macrotasks                      │  │
│  │                                                                  │  │
│  │  ┌─ TASK QUEUE / MACROTASK QUEUE (Lower Priority) ──┐            │  │
│  │  │                                                   │            │  │
│  │  │  • setTimeout() callback                         │            │  │
│  │  │  • setInterval() callback                        │            │  │
│  │  │  • setImmediate() callback                       │            │  │
│  │  │  • I/O operations callbacks                      │            │  │
│  │  │  • UI event handlers (click, scroll, etc.)      │            │  │
│  │  │  • requestAnimationFrame() callback              │            │  │
│  │  │                                                   │            │  │
│  │  └───────────────────────────────────────────────────┘            │  │
│  │                                                                  │  │
│  └──────────────────────────────────────────────────────────────────┘  │
│                                                                         │
│              ┌────────────────────────────────────┐                    │
│              │      EVENT LOOP ALGORITHM          │                    │
│              ├────────────────────────────────────┤                    │
│              │  1. Execute sync code              │                    │
│              │  2. Is call stack empty?           │                    │
│              │     YES → Process ALL microtasks   │                    │
│              │  3. Process ONE macrotask          │                    │
│              │  4. Render if needed               │                    │
│              │  5. Repeat from step 2             │                    │
│              └────────────────────────────────────┘                    │
│                                                                         │
└─────────────────────────────────────────────────────────────────────────┘
```

---

## 2. Single-Threaded Nature

### Why JavaScript is Single-Threaded

**Designer**: Brendan Eich (1995)

**Reasons**:
1. **Simplicity** - Easier to understand and use
2. **DOM Safety** - Prevents race conditions when manipulating DOM
3. **No Thread Management Complexity** - No locks, semaphores, or concurrent access issues
4. **Consistency** - Predictable execution order

### What This Means

```javascript
// Only ONE line of code executes at a time
console.log("1");
console.log("2");
console.log("3");

// Output: Always 1, 2, 3 (in order)
// Never executes in parallel
```

### Asynchronous Operations Are NOT Parallel

Despite being single-threaded, JavaScript handles async operations via:
- **Web APIs** (handled by browser/Node.js)
- **Callbacks** (queued for later execution)
- **Event Loop** (coordinates execution)

```javascript
console.log("Start");

setTimeout(() => {
  console.log("Async operation");
}, 0);

console.log("End");

// Output: Start, End, Async operation
// setTimeout doesn't execute immediately!
```

---
9. [Variable Declaration Keywords](#9-variable-declaration-keywords)
10. [Scope vs Lexical Environment](#10-scope-vs-lexical-environment) 

<!-- need to add above in structured notes -->