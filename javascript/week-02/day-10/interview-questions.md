## Polyfill Basics

### What is a polyfill?

A **polyfill** is custom code that recreates built-in functionality. It can provide similar functionality in environments that do not support a feature natively.

---

## Array Methods

### How does `map()` work internally?

`map()` iterates over an array, calls a callback for each applicable element, and returns a **new array** containing the callback results.

### Difference between `map()` and `forEach()`?

| Feature | map() | forEach() |
|---------|-------|-----------|
| Returns | New array | `undefined` |
| Purpose | Transform data | Perform side effects / iterate |

### Difference between `map()` and `filter()`?

| Feature | map() | filter() |
|---------|-------|----------|
| Purpose | Transform data | Select matching elements |
| Result | New array | New array |
| Length | Usually same as source | Same or smaller |

### How does `reduce()` work?

`reduce()` combines array elements into a single accumulated result using a callback and optional initial value.

### What happens when `reduce()` is called on an empty array without an initial value?

It throws a `TypeError`.

```javascript
[].reduce((acc, num) => acc + num);
// TypeError: Reduce of empty array with no initial value
```

### What is `this` inside an Array prototype method?

When called as `arr.myMethod()`, `this` refers to the array object `arr`.

---

## Function Methods: call, apply, bind

### Explain `call()`, `apply()`, and `bind()`.

All three can control the `this` value for a regular function, but they differ in execution and argument handling:

```text
call()   → execute immediately, arguments individually
apply()  → execute immediately, arguments as an array
bind()   → return a new function for later execution
```

### Why does `bind()` return a function?

`bind()` creates a new function with a bound `this` value and optionally pre-filled arguments. The returned function can be invoked later.

### How would you implement `call()`?

A basic approach is to temporarily attach the function to the context object using a unique `Symbol`, call it as a method, then remove the temporary property.

```javascript
Function.prototype.myCall = function(context, ...args) {
    context = context ?? globalThis;
    const key = Symbol("fn");

    context[key] = this;
    const result = context[key](...args);
    delete context[key];

    return result;
};
```

### Why use `Symbol()` in a `call()` polyfill?

A unique `Symbol` avoids colliding with an existing property on the context object.

```javascript
const obj = { fn: "existing value" };
const sym = Symbol("fn");
obj[sym] = myFunction;
```

The existing `obj.fn` property remains untouched.

### What happens if the context is `null`?

For a regular non-strict function, JavaScript converts `null`/`undefined` `this` to the global object. In strict mode, `this` remains `null`/`undefined`.

> Note: A production-quality polyfill also needs to reproduce JavaScript's `this` coercion rules for primitive contexts. Our implementation is an educational version.

---

## Promise Methods

### Explain `Promise.all()`.

`Promise.all()` returns a promise that fulfills when all input values/promises fulfill, producing results in **input order**. If an input rejects, the returned promise rejects with that rejection reason.

### Does `Promise.all()` preserve completion order or input order?

**Input order.** Completion order does not determine the result order.

```text
p1 → 2000ms
p2 → 500ms

completion: p2 → p1
result:     [p1Result, p2Result]
```

### What happens if one promise rejects?

The aggregate `Promise.all()` promise rejects as soon as a rejection is observed. **Other already-started promises are not automatically cancelled** and may continue running.

### What happens with an empty array passed to `Promise.all()`?

It fulfills immediately with an empty array:

```javascript
Promise.all([]).then(console.log); // []
```

### Why do we use `Promise.resolve()` inside the polyfill?

It normalizes both promises and ordinary values so the implementation can treat every input consistently.

```javascript
Promise.resolve(10).then(...); // works
Promise.resolve(Promise.resolve(10)).then(...); // works
```

---

## Important Day 10 Implementation Notes

### `reduce()` initial value

Do not rely only on:

```javascript
initialValue === undefined
```

to determine whether an initial value was supplied. `undefined` can itself be explicitly supplied. Use the number of arguments to distinguish the two cases.

### `bind()` limitation in our implementation

Our educational `myBind()` covers `this` binding and partial arguments. It does **not** fully reproduce native `bind()` constructor behavior when the bound function is invoked with `new`.

### `Promise.all()` cancellation

`Promise.all()` does not cancel the other input promises when one rejects. It only settles the aggregate promise as rejected.
