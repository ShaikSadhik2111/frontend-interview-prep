# JavaScript Interview Questions - Day 05

## 1. What is Synchronous JavaScript?

Synchronous JavaScript executes code line by line in a blocking manner. Each statement waits for the previous one to complete before executing. The execution is sequential and predictable.

```javascript
console.log('Start');
console.log('Middle');
console.log('End');
// Output: Start, Middle, End (in order)
```

**Characteristics:**
- Blocking execution
- One operation at a time
- Simple to understand and debug
- Can block the UI if long-running operations are performed

---

## 2. What is Asynchronous JavaScript?

Asynchronous JavaScript allows code to execute without blocking. Operations can be initiated and the code can continue to execute while waiting for those operations to complete. Results are handled through callbacks, promises, or async/await.

```javascript
console.log('Start');
setTimeout(() => console.log('Delayed'), 1000);
console.log('End');
// Output: Start, End, Delayed
```

**Characteristics:**
- Non-blocking execution
- Multiple operations can be in progress
- Better performance and responsiveness
- More complex error handling

---

## 3. What is the Call Stack?

The Call Stack is a data structure that keeps track of function calls in a program. It works on the LIFO (Last In, First Out) principle.

**How it works:**
- When a function is called, it's pushed onto the stack
- When a function returns, it's popped off the stack
- The stack executes functions in order

```javascript
function a() {
  console.log('a called');
  b();
}

function b() {
  console.log('b called');
}

a();
// Call Stack: a() → b() → (empty)
```

---

## 4. What is the Event Loop?

The Event Loop is a mechanism that continuously checks if the Call Stack is empty and if there are any callbacks in the Callback Queue or Microtask Queue. If the stack is empty, it moves callbacks from the queues to the stack for execution.

**How it works:**
1. Check if the Call Stack is empty
2. If empty, check the Microtask Queue first
3. Execute all microtasks
4. Check the Callback Queue
5. Execute one callback
6. Repeat

```javascript
console.log('Start');
setTimeout(() => console.log('Timeout'), 0);
Promise.resolve().then(() => console.log('Promise'));
console.log('End');

// Output: Start, End, Promise, Timeout
```

---

## 5. What are Web APIs?

Web APIs are browser-provided APIs that enable asynchronous operations. They are not part of the JavaScript language itself but are available in the browser environment.

**Common Web APIs:**
- `setTimeout()` / `setInterval()`
- `fetch()`
- `XMLHttpRequest`
- `localStorage` / `sessionStorage`
- `Geolocation API`
- `DOM APIs`
- `Audio/Video APIs`

```javascript
// Web API example
fetch('https://api.example.com/data')
  .then(response => response.json())
  .then(data => console.log(data));
```

---

## 6. Difference between Callback Queue and Microtask Queue?

| Callback Queue | Microtask Queue |
|---|---|
| Contains callbacks from Web APIs like `setTimeout()`, `setInterval()`, I/O operations | Contains results from Promises, `queueMicrotask()`, MutationObserver |
| Processed after the Microtask Queue is empty | Processed before the Callback Queue |
| One callback per event loop iteration | All microtasks processed per event loop iteration |
| Lower priority | Higher priority |

```javascript
// Microtask Queue (Promises) executes first
Promise.resolve().then(() => console.log('Microtask'));

// Callback Queue (setTimeout) executes after
setTimeout(() => console.log('Callback'), 0);

// Output: Microtask, Callback
```

---

## 7. Why do Promises execute before `setTimeout()`?

Promises are microtasks, and microtasks have higher priority than macrotasks (like `setTimeout`). The Event Loop processes all microtasks in the Microtask Queue before checking the Callback Queue (which contains macrotasks).

```javascript
console.log('Script Start');

setTimeout(() => console.log('setTimeout'), 0);

Promise.resolve()
  .then(() => console.log('Promise 1'))
  .then(() => console.log('Promise 2'));

console.log('Script End');

// Output:
// Script Start
// Script End
// Promise 1
// Promise 2
// setTimeout
```

**Priority Order:** Call Stack → Microtask Queue → Callback Queue

---

## 8. What is Callback Hell?

Callback Hell (also called Pyramid of Doom) occurs when multiple nested callbacks are used, resulting in deeply indented and hard-to-read code.

```javascript
// Callback Hell Example
getData(function(a) {
  getMoreData(a, function(b) {
    getMoreData(b, function(c) {
      getMoreData(c, function(d) {
        console.log(d);
      });
    });
  });
});
```

**Problems:**
- Code is hard to read and maintain
- Error handling becomes complex
- Difficult to debug
- Code reusability is low

**Solution:** Use Promises or Async/Await

```javascript
// Using Promises
getData()
  .then(a => getMoreData(a))
  .then(b => getMoreData(b))
  .then(c => getMoreData(c))
  .then(d => console.log(d));

// Using Async/Await
async function process() {
  const a = await getData();
  const b = await getMoreData(a);
  const c = await getMoreData(b);
  const d = await getMoreData(c);
  console.log(d);
}
```

---

## 9. What problem do Promises solve?

Promises solve the problem of **Callback Hell** and provide better error handling and code readability.

**Problems Solved:**
1. **Callback Hell:** Allows chaining instead of nesting
2. **Error Handling:** Single `.catch()` for the entire chain
3. **Code Readability:** Linear flow of operations
4. **Multiple Operations:** Easy to handle multiple async operations

```javascript
// Better Error Handling
Promise.resolve()
  .then(() => fetchData())
  .then(data => processData(data))
  .catch(error => console.error('Error:', error)); // Catches errors from any step

// Parallel Operations
Promise.all([promise1, promise2, promise3])
  .then(results => console.log(results));
```

**Benefits:**
- Better code structure
- Easier error handling
- More maintainable code
- Clear separation of concerns

---

## 10. Difference between Promise and Async/Await?

| Promise | Async/Await |
|---|---|
| Returns a Promise object | Returns a Promise implicitly |
| Uses `.then()` and `.catch()` chains | Uses `try/catch` blocks |
| Syntax can be verbose for long chains | Syntax is cleaner and more readable |
| Parallel operations use `.all()`, `.race()` | Can use similar patterns with cleaner syntax |
| Introduced in ES6 | Introduced in ES8 (ES2017) |

```javascript
// Promise approach
function fetchData() {
  return fetch('api/data')
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.error(error));
}

// Async/Await approach
async function fetchData() {
  try {
    const response = await fetch('api/data');
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}
```

**Advantages of Async/Await:**
- More readable and looks like synchronous code
- Easier error handling with try/catch
- Better debugging experience
- Simpler to understand for beginners
- Reduced cognitive load
