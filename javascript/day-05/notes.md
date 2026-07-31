<!-- JS run time -->

Diagrams:

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

<!-- call stack -->

1 works with LIFO  (last in, first out);
2 leeps track of what function is running.

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

CALL STACK EXECUTION:

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

FINAL CALL STACK TRACE:
-> one()
   -> two()
      -> three()
         -> console.log("Done")
      <- three() returns
   <- two() returns
<- one() returns

<!-- Browser Apis -->
JS itself wont provide setTimeout(),fetch,dom,addEventListener

The browser object model, which allows js to talk with bnrowser.

The window object,

  is supported by the all browsers, it represents the browser window,
  all js objects, funcitons, and variables automatically become members of the window object.
  global variables are properties of window object.
  global functions are methods orf window object.

JavaScript

↓

Browser

↓

Web APIs

Window screen,

   thsi object contains information about the users screen,
   this cna be written without the window prefix.

window location,

this also can be written without prefix.


window history,
window navigotor,
popup boxes,
cookies,

what are cookies,

cookie slet you store user data in web pages.
this data can be stored in small texts in system.
Invented by Lou Montulli at Netscape in 1994
this are bridge the gap between client ans server.

<!-- Callback quue -->
what is a callback?

a callback is a function passed as an argument to anothe rfunction , that gets called later, the othe rfunction decides whgen to run it.
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

callbacks and higer order function go hand to hand,
a higher order function is a function that accepts function as a arguments or retuns to them.
a callback is the function being passed to the highe rorder function.


// forEach is a HIGHER-ORDER FUNCTION (it accepts a function)
// The arrow function is the CALLBACK (it's being passed in)

const numbers = [1, 2, 3]

numbers.forEach((num) => {    // ← This is the callback
  console.log(num * 2)
})
// 2, 4, 6

Every time you use map, filter, forEach, reduce, sort, or find, you’re passing callbacks to higher-order functions:


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

Synchronus and asunchoronus callbacks,

synchronus callbacks are executed immediatly, during teh function call they block untike the complete.

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

The callback runs for each element before map returns. Nothing else happens until it’s done.

common synchonus callbacks;

array methods map, filter,foreach, reduce, find, sort, evry, some

Asynchronous call backs,

thsi call back executes latetr once the cuurent code finishes.they dont block

console.log('Before setTimeout')

setTimeout(() => {
  console.log('Inside setTimeout')
}, 0)  // Even with 0ms delay!

console.log('After setTimeout')

// Output:
// Before setTimeout
// After setTimeout
// Inside setTimeout (runs AFTER all sync code)

Even with a 0ms delay, the callback runs after the synchronous code. This is because async callbacks go through the event loop.


Common asynchronous callbacks:
Timers: setTimeout, setInterval
Events: addEventListener, onclick
Network: XMLHttpRequest.onload, fetch().then()
Node.js I/O: fs.readFile, http.get


Aspect	Synchronous Callbacks	Asynchronous Callbacks
When executed	Immediately, during the function call	Later, via the event loop
Blocking	Yes — code waits for completion	No — code continues immediately
Examples	map, filter, forEach, sort	setTimeout, addEventListener, fetch
Use case	Data transformation, iteration	I/O, user interaction, timers
Error handling	Regular try/catch works	try/catch won’t catch errors!
Return value	Can return values	Return values usually ignored


Error handling:


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

<!-- How callback wotks with event loop -->

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

ex:

console.log('1: Script start')

setTimeout(function first() {
  console.log('2: First timeout')
}, 0)

setTimeout(function second() {
  console.log('3: Second timeout')
}, 0)

console.log('4: Script end')


console.log('1: Script start') — runs immediately → “1: Script start”
setTimeout(first, 0) — registers first callback with Web APIs
setTimeout(second, 0) — registers second callback with Web APIs
console.log('4: Script end') — runs immediately → “4: Script end”
Call stack is now empty
Event Loop checks Task Queue — finds first
first() runs → “2: First timeout”
Event Loop checks Task Queue — finds second
second() runs → “3: Second timeout”

op:
1: Script start
4: Script end
2: First timeout
3: Second timeout

<!-- EVent loop -->

note: covered breifly in above topics 


Call Stack

↓

Empty?

↓

YES

↓

Take callback

↓

Execute

Note: The Event Loop moves tasks to the Call Stack only when the stack is empty.

Its a js meachanism for handling asynchonous  operations while remaining single threaded.

its checks callbacks queues when the call stack is empty then pushes the que stack for executoion.
this rnable snon blocking behavior even js is single threaded.

this look simple but it has crusial role while managing callbacks until the stack is empty and this makes js is asynchronous.


<!-- Microtask queue -->

Thsi holds  a high rpority callbacks from 
Promise.then(), .catch(), .finally()
queueMicrotask()
MutationObserver
Code after await in async functions
Microtasks ALWAYS run before the next task! The entire microtask queue is drained before moving to the task queue.


When Callbacks Run: Microtasks
MutationObserver callbacks are scheduled as microtasks, meaning they run after the current script but before the browser renders. According to the WHATWG HTML specification, this batching behavior is intentional — it allows multiple DOM changes to be processed in a single callback invocation. This is the same queue as Promise callbacks.

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

realworls usages,

1 lazy lapding images
2 syntasxx highligting dynamic code
3 removing unwangted elements
4 auto savbing form changes
5 tracking class changes


Approach	When to Use	Drawbacks
MutationObserver	Reacting to any DOM change	Slightly complex API
Event delegation	Reacting to user events on dynamic content	Only works for events that bubble
Polling (setInterval)	Never for DOM watching	Wasteful, misses changes between checks
Mutation Events	Never (deprecated)	Performance killer, removed from standards
ResizeObserver	Watching element size changes	Only for size, not other attributes
IntersectionObserver	Watching element visibility	Only for visibility, not DOM changes


console.log("Start");

Promise.resolve().then(() => {

console.log("Promise");

});

console.log("End");

op:start 
    end
    promise

    <!-- – Callback Queue vs Microtask Queue -->


    Microtask Queue

↓

Higher Priority

↓

Callback Queue


<!-- promises -->

A promise is a eventual complettion or failure of an asynchonoys operation 
by standard ecma script  2015--es6 its a placeholder for a value which can show up later
ex: thinking of it like an order ticket at arestaurent taht will trade food when it is ready.

deep exp: saying like " i dont have teh value rigth now, but i promise to give you a value or a error later.

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

Unlike callbacks that you pass into functions, Promises are objects you get back from functions. This small change unlocks useful patterns like chaining, composition, and unified error handling.


<!-- promise chaining -->

Promise chaining is where promises shine.since each .then() returns a new promise, you can chain them together

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



If you return a Promise from a .then() callback, the chain waits for it to finish:


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

Errro handling in promises:

error handling is whre promises shine, errors automatically flow down teh chain until something cathes them.




Error Propagation
When a Promise is rejected or an error is thrown, it “skips” all .then() callbacks until it finds a .catch():


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

<!-- promises vs settimeout -->

predict this:

console.log(1);

setTimeout(() => {

console.log(2);

},0);

Promise.resolve()

.then(() => {

console.log(3);

});

console.log(4);

op:1 4 3 2