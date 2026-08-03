console.log("A");

setTimeout(() => {

console.log("B");

},0);

Promise.resolve()

.then(() => {

console.log("C");

})

.then(() => {

console.log("D");

});

console.log("E");

//op: A E C D B

// Output? - A E C D B
// Why? - Because synchronous code runs first, then microtasks (Promises), then macrotasks (setTimeout).
// Which queue executes first? - Microtask queue (Promises) executes before the macrotask queue (setTimeout).
// When does the Event Loop move callbacks? - The Event Loop moves callbacks from the macrotask queue after the current stack is empty and all microtasks are processed.