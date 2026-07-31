// Predict outputs for five Event Loop examples and explain why.

// Example 1: setTimeout vs Microtask
console.log('1: Start');
setTimeout(() => console.log('1: setTimeout'), 0);
Promise.resolve().then(() => console.log('1: Promise'));
console.log('1: End');

/* Output:
1: Start
1: End
1: Promise
1: setTimeout

Explanation: Synchronous code executes first, then microtasks (Promises), then macrotasks (setTimeout).
*/

console.log('\n---\n');

// Example 2: Multiple setTimeout and Promise
console.log('2: Start');
setTimeout(() => {
  console.log('2: setTimeout 1');
  Promise.resolve().then(() => console.log('2: Promise inside setTimeout'));
}, 0);
Promise.resolve().then(() => console.log('2: Promise 1'));
setTimeout(() => console.log('2: setTimeout 2'), 0);
console.log('2: End');

/* Output:
2: Start
2: End
2: Promise 1
2: setTimeout 1
2: Promise inside setTimeout
2: setTimeout 2

Explanation: All synchronous code first, then all microtasks (promises), then macrotasks (setTimeouts) one by one.
When setTimeout 1 executes, it creates a new microtask which runs before the next setTimeout.
*/

console.log('\n---\n');

// Example 3: Nested async/await
async function example3() {
  console.log('3: Start');
  await Promise.resolve();
  console.log('3: After await');
}
console.log('3: Before function');
example3();
console.log('3: After function call');

/* Output:
3: Before function
3: Start
3: After function call
3: After await

Explanation: Function execution is synchronous until await. The code after await is a microtask.
*/

console.log('\n---\n');

// Example 4: Promise chain and setTimeout
console.log('4: Start');
Promise.resolve()
  .then(() => {
    console.log('4: Promise then 1');
    setTimeout(() => console.log('4: setTimeout in Promise'), 0);
  })
  .then(() => console.log('4: Promise then 2'));
setTimeout(() => console.log('4: setTimeout 1'), 0);
console.log('4: End');

/* Output:
4: Start
4: End
4: Promise then 1
4: Promise then 2
4: setTimeout 1
4: setTimeout in Promise

Explanation: Promise chains are microtasks executed sequentially. All microtasks run before any macrotask.
*/

console.log('\n---\n');

// Example 5: queueMicrotask and setTimeout
console.log('5: Start');
queueMicrotask(() => console.log('5: queueMicrotask 1'));
setTimeout(() => console.log('5: setTimeout 1'), 0);
Promise.resolve().then(() => console.log('5: Promise'));
queueMicrotask(() => console.log('5: queueMicrotask 2'));
console.log('5: End');

/* Output:
5: Start
5: End
5: queueMicrotask 1
5: Promise
5: queueMicrotask 2
5: setTimeout 1

Explanation: All microtasks (queueMicrotask and Promises) are processed in order before any macrotask (setTimeout).
*/

