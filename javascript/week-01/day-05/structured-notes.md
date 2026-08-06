# JavaScript Runtime & Asynchronous Programming

## JavaScript Engine Architecture

```
JavaScript Engine
↓
Call Stack
↓
Browser APIs
↓
Callback Queue
↓
Microtask Queue
↓
Event Loop
```

### Complete JavaScript Runtime Diagram

```
┌─────────────────────────────────────────────────────────────────────────┐
│                        JAVASCRIPT RUNTIME                               │
│  ┌─────────────────────────────────────────────────────────────────┐   │
│  │                      JAVASCRIPT ENGINE (V8, SpiderMonkey, etc.) │   │
│  │  ┌───────────────────────┐    ┌───────────────────────────┐     │   │
│  │  │      CALL STACK       │    │          HEAP             │     │   │
│  │  │                       │    │                           │     │   │
│  │  │  ┌─────────────────┐  │    │   { objects stored here } │     │   │
│  │  │  │ processData()   │  │    │   [ arrays stored here ]  │     │   │
│  │  │  ├─────────────────┤  │    │   function references     │     │   │
│  │  │  │ fetchUser()     │  │    │                           │     │   │
│  │  │  ├─────────────────┤  │    │                           │     │   │
│  │  │  │ main()          │  │    │                           │     │   │
│  │  │  └─────────────────┘  │    └───────────────────────────┘     │   │
│  │  └───────────────────────┘                                      │   │
│  └─────────────────────────────────────────────────────────────────┘   │
│                                                                         │
│  ┌─────────────────────────────────────────────────────────────────┐   │
│  │                    BROWSER / NODE.js APIs                        │   │
│  │                                                                  │   │
│  │   setTimeout()    setInterval()    fetch()    DOM events         │   │
│  │   requestAnimationFrame()    IndexedDB    WebSockets             │   │
│  │                                                                  │   │
│  │   (These are handled outside of JavaScript execution!)           │   │
│  └─────────────────────────────────────────────────────────────────┘   │
│                                    │                                    │
│                                    │ callbacks                          │
│                                    ▼                                    │
│  ┌──────────────────────────────────────────────────────────────────┐  │
│  │  MICROTASK QUEUE                    TASK QUEUE (Macrotask)       │  │
│  │  ┌────────────────────────┐        ┌─────────────────────────┐   │  │
│  │  │ Promise.then()         │        │ setTimeout callback     │   │  │
│  │  │ queueMicrotask()       │        │ setInterval callback    │   │  │
│  │  │ MutationObserver       │        │ I/O callbacks           │   │  │
│  │  │ async/await (after)    │        │ UI event handlers       │   │  │
│  │  └────────────────────────┘        │ Event handlers          │   │  │
│  │         ▲                          └─────────────────────────┘   │  │
│  │         │ HIGHER PRIORITY                    ▲                   │  │
│  └─────────┼────────────────────────────────────┼───────────────────┘  │
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

## Call Stack

### How Call Stack Works

1. Works with **LIFO** (Last In, First Out)
2. Keeps track of what function is running

### Example

```javascript
function one() {
    two();
}

function two() {
    three();
}

function three() {
    console.log("Done");
}

one();
```

### Call Stack Execution Trace

```
1. one() - called
   [one]

2. Inside one(), two() is called
   [one, two]

3. Inside two(), three() is called
   [one, two, three]

4. Inside three(), console.log("Done") executes
   [one, two, three]
   Output: "Done"

5. three() returns, popped from stack
   [one, two]

6. two() returns, popped from stack
   [one]

7. one() returns, popped from stack
   []

Final Trace:
-> one()
   -> two()
      -> three()
         -> console.log("Done")
      <- three() returns
   <- two() returns
<- one() returns
```

---

## Browser APIs

JavaScript itself doesn't provide `setTimeout()`, `fetch()`, `DOM`, or `addEventListener()`. These are provided by the **Browser Object Model**, which allows JS to communicate with the browser.

### The Window Object

- Supported by all browsers
- Represents the browser window
- All JS objects, functions, and variables automatically become members of the window object
- Global variables are properties of the window object
- Global functions are methods of the window object

### Common Browser APIs

**Window.screen** - Contains information about the user's screen

**Window.location** - Information about the current URL

**Window.history** - Browser history navigation

**Window.navigator** - Browser and OS information

**Popup boxes** - alert(), confirm(), prompt()

**Cookies** - Store user data in web pages

### Cookies

- Allow you to store user data in web pages as small text files
- Invented by Lou Montulli at Netscape in 1994
- Bridge the gap between client and server

---

## Callbacks

### What is a Callback?

A **callback** is a function passed as an argument to another function that gets called later. The other function decides when to run it.

```javascript
// greet is a callback function
function greet(name) {
  console.log(`Hello, ${name}!`)
}

// processUserInput accepts a callback
function processUserInput(callback) {
  const name = 'Alice'
  callback(name)  // "calling back" the function we received
}

processUserInput(greet)  // "Hello, Alice!"
```

### Callbacks & Higher-Order Functions

- **Higher-order function** - A function that accepts functions as arguments or returns them
- **Callback** - The function being passed to the higher-order function

```javascript
// forEach is a HIGHER-ORDER FUNCTION
// The arrow function is the CALLBACK

const numbers = [1, 2, 3]

numbers.forEach((num) => {    // ← This is the callback
  console.log(num * 2)
})
// 2, 4, 6
```

### Array Methods with Callbacks

Every time you use `map`, `filter`, `forEach`, `reduce`, `sort`, or `find`, you're passing callbacks to higher-order functions:

```javascript
const users = [
  { name: 'Alice', age: 25 },
  { name: 'Bob', age: 17 },
  { name: 'Charlie', age: 30 }
]

// filter accepts a callback that returns true/false
const adults = users.filter(user => user.age >= 18)

// map accepts a callback that transforms each element
const names = users.map(user => user.name)

// find accepts a callback that returns true when found
const bob = users.find(user => user.name === 'Bob')

// sort accepts a callback that compares two elements
const byAge = users.sort((a, b) => a.age - b.age)
```

---

## Synchronous vs Asynchronous Callbacks

### Synchronous Callbacks

Executed immediately, during the function call. They block until complete.

```javascript
const numbers = [1, 2, 3, 4, 5]

console.log('Before map')

const doubled = numbers.map(num => {
  console.log(`Doubling ${num}`)
  return num * 2
})

console.log('After map')
console.log(doubled)

// Output (all synchronous, in order):
// Before map
// Doubling 1
// Doubling 2
// Doubling 3
// Doubling 4
// Doubling 5
// After map
// [2, 4, 6, 8, 10]
```

**Common synchronous callbacks:** map, filter, forEach, reduce, find, sort, every, some

### Asynchronous Callbacks

Execute later once the current code finishes. They don't block.

```javascript
console.log('Before setTimeout')

setTimeout(() => {
  console.log('Inside setTimeout')
}, 0)  // Even with 0ms delay!

console.log('After setTimeout')

// Output:
// Before setTimeout
// After setTimeout
// Inside setTimeout (runs AFTER all sync code)
```

Even with a 0ms delay, the callback runs after the synchronous code because async callbacks go through the event loop.

**Common asynchronous callbacks:**
- Timers: `setTimeout`, `setInterval`
- Events: `addEventListener`, `onclick`
- Network: `XMLHttpRequest.onload`, `fetch().then()`
- Node.js I/O: `fs.readFile`, `http.get`

### Comparison Table

| Aspect | Synchronous Callbacks | Asynchronous Callbacks |
|--------|----------------------|----------------------|
| When executed | Immediately, during the function call | Later, via the event loop |
| Blocking | Yes — code waits for completion | No — code continues immediately |
| Examples | map, filter, forEach, sort | setTimeout, addEventListener, fetch |
| Use case | Data transformation, iteration | I/O, user interaction, timers |
| Error handling | Regular try/catch works | try/catch won't catch errors! |
| Return value | Can return values | Return values usually ignored |

### Error Handling in Callbacks

```javascript
// Synchronous callback - try/catch WORKS
try {
  [1, 2, 3].forEach(num => {
    if (num === 2) throw new Error('Found 2!')
  })
} catch (error) {
  console.log('Caught:', error.message)  // "Caught: Found 2!"
}

// Asynchronous callback - try/catch DOES NOT WORK!
try {
  setTimeout(() => {
    throw new Error('Async error!')  // This error escapes!
  }, 100)
} catch (error) {
  // This will NEVER run
  console.log('Caught:', error.message)
}
// The error crashes your program!
```

---

## How Callbacks Work with Event Loop

```
┌─────────────────────────────────────────────────────────────────────────┐
│                     ASYNC CALLBACK LIFECYCLE                             │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                          │
│  1. YOUR CODE RUNS                                                       │
│  ┌─────────────────────────────────────────────────────────────────┐    │
│  │  console.log('Start')                                            │    │
│  │  setTimeout(callback, 1000)  // Register callback with Web API   │    │
│  │  console.log('End')                                              │    │
│  └─────────────────────────────────────────────────────────────────┘    │
│                          │                                               │
│                          ▼                                               │
│  2. WEB API HANDLES THE ASYNC OPERATION                                  │
│  ┌─────────────────────────────────────────────────────────────────┐    │
│  │  Timer starts counting...                                        │    │
│  │  (Your code continues running - it doesn't wait!)                │    │
│  └─────────────────────────────────────────────────────────────────┘    │
│                          │                                               │
│                          ▼ (after 1000ms)                                │
│  3. CALLBACK QUEUED                                                      │
│  ┌─────────────────────────────────────────────────────────────────┐    │
│  │  Timer done! Callback added to Task Queue                        │    │
│  │  [callback] ← waiting here                                       │    │
│  └─────────────────────────────────────────────────────────────────┘    │
│                          │                                               │
│                          ▼ (when call stack is empty)                    │
│  4. EVENT LOOP EXECUTES CALLBACK                                         │
│  ┌─────────────────────────────────────────────────────────────────┐    │
│  │  Event Loop: "Call stack empty? Let me grab that callback..."    │    │
│  │  callback() runs!                                                │    │
│  └─────────────────────────────────────────────────────────────────┘    │
│                                                                          │
└─────────────────────────────────────────────────────────────────────────┘
```

### Example

```javascript
console.log('1: Script start')

setTimeout(function first() {
  console.log('2: First timeout')
}, 0)

setTimeout(function second() {
  console.log('3: Second timeout')
}, 0)

console.log('4: Script end')

// Execution order:
// 1. console.log('1: Script start') — runs immediately → "1: Script start"
// 2. setTimeout(first, 0) — registers first callback with Web APIs
// 3. setTimeout(second, 0) — registers second callback with Web APIs
// 4. console.log('4: Script end') — runs immediately → "4: Script end"
// 5. Call stack is now empty
// 6. Event Loop checks Task Queue — finds first
// 7. first() runs → "2: First timeout"
// 8. Event Loop checks Task Queue — finds second
// 9. second() runs → "3: Second timeout"

// Output:
// 1: Script start
// 4: Script end
// 2: First timeout
// 3: Second timeout
```

---

## Event Loop

The **Event Loop** is a JavaScript mechanism for handling asynchronous operations while remaining single-threaded.

### How Event Loop Works

```
Call Stack
↓
Empty?
↓
YES
↓
Take callback from queue
↓
Execute
```

**Key Points:**
- Checks callback queues when the call stack is empty
- Pushes callbacks to the call stack for execution
- Enables non-blocking behavior even though JS is single-threaded
- The Event Loop only moves tasks to the Call Stack when the stack is empty
- Has a crucial role managing callbacks, making JS asynchronous

---

## Microtask Queue

The **Microtask Queue** holds high-priority callbacks from:
- `Promise.then()`, `.catch()`, `.finally()`
- `queueMicrotask()`
- `MutationObserver`
- Code after `await` in async functions

**Important:** Microtasks ALWAYS run before the next task! The entire microtask queue is drained before moving to the task queue.

### MutationObserver

MutationObserver callbacks are scheduled as microtasks, meaning they run after the current script but before the browser renders. This batching behavior (per WHATWG HTML spec) allows multiple DOM changes to be processed in a single callback.

```javascript
console.log('1. Script start')

const observer = new MutationObserver(() => {
  console.log('3. MutationObserver callback')
})
observer.observe(document.body, { childList: true })

document.body.appendChild(document.createElement('div'))

Promise.resolve().then(() => {
  console.log('2. Promise callback')
})

console.log('4. Script end')

// Output:
// 1. Script start
// 4. Script end
// 2. Promise callback
// 3. MutationObserver callback
```

### Real-World MutationObserver Use Cases

1. Lazy loading images
2. Syntax highlighting dynamic code
3. Removing unwanted elements
4. Auto-saving form changes
5. Tracking class changes

### Comparison of DOM Observation Approaches

| Approach | When to Use | Drawbacks |
|----------|-----------|----------|
| MutationObserver | Reacting to any DOM change | Slightly complex API |
| Event delegation | Reacting to user events on dynamic content | Only works for events that bubble |
| Polling (setInterval) | Never for DOM watching | Wasteful, misses changes between checks |
| Mutation Events | Never (deprecated) | Performance killer, removed from standards |
| ResizeObserver | Watching element size changes | Only for size, not other attributes |
| IntersectionObserver | Watching element visibility | Only for visibility, not DOM changes |

### Microtask Example

```javascript
console.log("Start");

Promise.resolve().then(() => {
  console.log("Promise");
});

console.log("End");

// Output:
// Start
// End
// Promise
```

### Callback Queue vs Microtask Queue

```
Microtask Queue
↓
Higher Priority
↓
Callback Queue (Task Queue)
```

---

## Promises

A **promise** is the eventual completion (or failure) of an asynchronous operation. Introduced in ECMAScript 2015 (ES6), it's a placeholder for a value that can appear later.

**Think of it like an order ticket at a restaurant that will trade food when it's ready.**

**Deep explanation:** "I don't have the value right now, but I promise to give you a value or an error later."

```javascript
// A Promise that resolves after 1 second
const promise = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve('Hello from the future!')
  }, 1000)
})

// Consuming the Promise
promise.then(value => {
  console.log(value)  // "Hello from the future!" (after 1 second)
})
```

**Key Difference from Callbacks:** Unlike callbacks that you pass into functions, Promises are objects you get back from functions. This small change unlocks useful patterns like chaining, composition, and unified error handling.

---

## Promise Chaining

Promise chaining is where promises shine. Since each `.then()` returns a new promise, you can chain them together.

```javascript
Promise.resolve(1)
  .then(x => {
    console.log(x)     // 1
    return x + 1
  })
  .then(x => {
    console.log(x)     // 2
    return x + 1
  })
  .then(x => {
    console.log(x)     // 3
    return x + 1
  })
  .then(x => {
    console.log(x)     // 4
  })
```

### Promise Chaining Flow Diagram

```
┌─────────────────────────────────────────────────────────────────────────┐
│                       PROMISE CHAINING FLOW                              │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                          │
│   Promise.resolve(1)                                                     │
│         │                                                                │
│         ▼                                                                │
│   ┌─────────────────────────────────────────────┐                        │
│   │  .then(x => x * 2)                          │                        │
│   │                                             │                        │
│   │  Input: 1                                   │                        │
│   │  Return: 2                                  │                        │
│   │  Output Promise: fulfilled with 2           │                        │
│   └─────────────────────────────────────────────┘                        │
│         │                                                                │
│         ▼                                                                │
│   ┌─────────────────────────────────────────────┐                        │
│   │  .then(x => x + 10)                         │                        │
│   │                                             │                        │
│   │  Input: 2                                   │                        │
│   │  Return: 12                                 │                        │
│   │  Output Promise: fulfilled with 12          │                        │
│   └─────────────────────────────────────────────┘                        │
│         │                                                                │
│         ▼                                                                │
│   ┌─────────────────────────────────────────────┐                        │
│   │  .then(x => console.log(x))                 │                        │
│   │                                             │                        │
│   │  Input: 12                                  │                        │
│   │  Console: "12"                              │                        │
│   │  Return: undefined                          │                        │
│   │  Output Promise: fulfilled with undefined   │                        │
│   └─────────────────────────────────────────────┘                        │
│                                                                          │
└─────────────────────────────────────────────────────────────────────────┘
```

### Chaining with Nested Promises

If you return a Promise from a `.then()` callback, the chain waits for it to finish:

```javascript
function fetchUser(id) {
  return new Promise(resolve => {
    setTimeout(() => resolve({ id, name: 'Alice' }), 100)
  })
}

function fetchPosts(userId) {
  return new Promise(resolve => {
    setTimeout(() => resolve([
      { id: 1, title: 'First Post' },
      { id: 2, title: 'Second Post' }
    ]), 100)
  })
}

// Chain of async operations
fetchUser(1)
  .then(user => {
    console.log('Got user:', user.name)
    return fetchPosts(user.id)  // Return a Promise
  })
  .then(posts => {
    // This waits for fetchPosts to complete!
    console.log('Got posts:', posts.length)
  })

// Output:
// Got user: Alice
// Got posts: 2
```

---

## Error Handling in Promises

Error handling is where promises shine. Errors automatically flow down the chain until something catches them.

### Error Propagation

When a Promise is rejected or an error is thrown, it "skips" all `.then()` callbacks until it finds a `.catch()`:

```
┌─────────────────────────────────────────────────────────────────────────┐
│                      ERROR PROPAGATION                                   │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                          │
│   Promise.reject(new Error('Oops!'))                                     │
│         │                                                                │
│         ▼                                                                │
│   ┌─────────────────────────────────────────────┐                        │
│   │  .then(x => x * 2)                          │  ◄── SKIPPED           │
│   └─────────────────────────────────────────────┘                        │
│         │                                                                │
│         ▼                                                                │
│   ┌─────────────────────────────────────────────┐                        │
│   │  .then(x => x + 10)                         │  ◄── SKIPPED           │
│   └─────────────────────────────────────────────┘                        │
│         │                                                                │
│         ▼                                                                │
│   ┌─────────────────────────────────────────────┐                        │
│   │  .catch(err => console.log(err.message))    │  ◄── CAUGHT HERE!      │
│   │                                             │                        │
│   │  Output: "Oops!"                            │                        │
│   └─────────────────────────────────────────────┘                        │
│         │                                                                │
│         ▼                                                                │
│   ┌─────────────────────────────────────────────┐                        │
│   │  .then(() => console.log('Recovered!'))     │  ◄── RUNS (chain       │
│   └─────────────────────────────────────────────┘      continues)        │
│                                                                          │
└─────────────────────────────────────────────────────────────────────────┘
```

---

## Promises vs setTimeout

### Prediction Exercise

```javascript
console.log(1);

setTimeout(() => {
  console.log(2);
}, 0);

Promise.resolve()
  .then(() => {
    console.log(3);
  });

console.log(4);

// Output:
// 1
// 4
// 3
// 2
```

**Explanation:**
1. `console.log(1)` - runs immediately → **1**
2. `setTimeout()` - callback goes to Task Queue (macrotask)
3. `Promise.resolve().then()` - callback goes to Microtask Queue
4. `console.log(4)` - runs immediately → **4**
5. Call stack is empty, Event Loop checks Microtask Queue → **3**
6. Event Loop checks Task Queue → **2**
