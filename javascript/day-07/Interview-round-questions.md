# JavaScript Interview Round - Day 1 to Day 6

## 1. Explain Execution Context

Execution Context is the environment where JavaScript code runs.

Each context has two phases:
- Memory Creation Phase: variables and function declarations are prepared.
- Code Execution Phase: code runs line by line.

Types:
- Global Execution Context: created once when file starts.
- Function Execution Context: created every time a function is called.

Simple idea: it is like a workspace JavaScript creates to execute your code safely.

## 2. Difference between var, let, and const

- var
	- Function scoped
	- Can be re-declared and re-assigned
	- Hoisted with value undefined

- let
	- Block scoped
	- Can be re-assigned, cannot be re-declared in same scope
	- Hoisted but in TDZ (cannot use before declaration)

- const
	- Block scoped
	- Cannot be re-assigned or re-declared
	- Must be initialized at declaration
	- For objects/arrays, reference is constant but internal values can change

## 3. Explain Closure

A closure is when a function remembers variables from its outer scope even after the outer function has finished execution.

Why useful:
- Data privacy
- Function factories
- Keeping state between calls

Example:

```javascript
function counter() {
	let count = 0
	return function () {
		count++
		return count
	}
}

const inc = counter()
inc() // 1
inc() // 2
```

## 4. Difference between Function Declaration and Function Expression

Function Declaration:
- Defined with function name directly
- Fully hoisted
- Can be called before declaration

Function Expression:
- Function stored in a variable
- Variable is hoisted, function value is not
- Cannot be called before assignment

Example:

```javascript
sayHi() // works
function sayHi() {}

greet() // error if called before assignment
const greet = function () {}
```

## 5. Difference between call, apply, and bind

All three are used to set this value manually.

- call
	- Executes immediately
	- Arguments passed one by one

- apply
	- Executes immediately
	- Arguments passed as array

- bind
	- Does not execute immediately
	- Returns a new function with this fixed

## 6. Explain Prototype Chain

Every object in JavaScript has an internal link to another object called prototype.

When you access a property:
1. JavaScript checks current object.
2. If not found, it checks prototype.
3. Continues upward until null.

This lookup path is called the prototype chain.

## 7. What happens when new Person() is executed?

When you run new Person(), JavaScript does these steps:
1. Creates a new empty object.
2. Links that object to Person.prototype.
3. Calls Person function with this as new object.
4. Returns that object (unless constructor returns another object explicitly).

## 8. Explain Event Loop

JavaScript is single-threaded, so it uses the event loop to handle async work.

Flow:
1. Sync code runs on call stack.
2. Async tasks use Web APIs (like setTimeout, fetch, events).
3. Completed callbacks go to queues.
4. Event loop pushes callbacks to call stack when stack is empty.

Important: microtasks run before macrotasks.

## 9. Difference between Callback Queue and Microtask Queue

Microtask Queue:
- Higher priority
- Used by Promise.then, catch, finally, queueMicrotask
- Runs immediately after current sync code, before next macrotask

Callback Queue (Macrotask Queue):
- Lower priority than microtasks
- Used by setTimeout, setInterval, DOM events, I/O callbacks

Rule: after call stack becomes empty, JavaScript clears all microtasks first, then takes one macrotask.

## 10. Difference between map, filter, and reduce

- map
	- Transforms each element
	- Returns new array of same length

- filter
	- Keeps elements that pass condition
	- Returns new array, length can be smaller

- reduce
	- Combines all elements into one value
	- Return can be number, string, object, array, etc.

Quick examples:

```javascript
const nums = [1, 2, 3, 4]

const doubled = nums.map(n => n * 2) // [2, 4, 6, 8]
const evens = nums.filter(n => n % 2 === 0) // [2, 4]
const sum = nums.reduce((acc, n) => acc + n, 0) // 10
```

## 11. What is a Polyfill?

A polyfill is custom code that adds support for a feature that is not available in older browsers.

Simple meaning: it gives modern behavior in environments that do not support that feature natively.

Example idea:
- If old browser does not support Array.prototype.map, we can write our own implementation.