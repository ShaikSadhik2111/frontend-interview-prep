
## Polyfill Basics

### What is a polyfill?

A **polyfill** is custom code that recreates built-in methods. It allows you to use modern features in older browsers that don't support them.

**Example:**
```javascript
// Modern browsers have Array.prototype.includes()
[1, 2, 3].includes(2) // true

// But old browsers don't, so we create a polyfill:
Array.prototype.myIncludes = function(element) {
    for (let i = 0; i < this.length; i++) {
        if (this[i] === element) return true;
    }
    return false;
};

[1, 2, 3].myIncludes(2) // true
```

---

## Array Methods

### How does `map()` work internally?

`map()` **loops through each element, transforms it using a callback function, and returns a NEW array** with the transformed values.

**Step by step:**
```javascript
const nums = [1, 2, 3];
const doubled = nums.map(x => x * 2);

// What happens internally:
// 1. Create empty result array: []
// 2. Loop through each element
// 3. For each element, call callback function: callback(1) → 2
// 4. Push result to new array: [2]
// 5. Continue for all elements: [2, 4, 6]
// 6. Return new array
```

---

### Difference between `map()` and `forEach()`?

| Feature | map() | forEach() |
|---------|-------|-----------|
| **Returns** | NEW array | undefined |
| **Use When** | Need transformed data | Only executing side effects |
| **Example** | `nums.map(x => x * 2)` | `nums.forEach(x => console.log(x))` |

**Code:**
```javascript
const nums = [1, 2, 3];

// map() - transforms and returns
const doubled = nums.map(x => x * 2);
console.log(doubled); // [2, 4, 6]

// forEach() - just executes, returns nothing
nums.forEach(x => console.log(x)); // prints 1, 2, 3
```

---

### Difference between `map()` and `filter()`?

| Feature | map() | filter() |
|---------|-------|----------|
| **Purpose** | TRANSFORM data | SELECT data |
| **Changes Values** | YES | NO |
| **Example** | `[1, 2, 3].map(x => x * 2)` → `[2, 4, 6]` | `[1, 2, 3].filter(x => x > 1)` → `[2, 3]` |

**Code:**
```javascript
const nums = [1, 2, 3, 4];

// map() - change each value
const doubled = nums.map(x => x * 2); // [2, 4, 6, 8]

// filter() - keep only matching values
const evens = nums.filter(x => x % 2 === 0); // [2, 4]
```

---

### How does `reduce()` work?

`reduce()` **combines all array elements into a SINGLE value** using an accumulator.

**Step by step:**
```javascript
const nums = [1, 2, 3];
const sum = nums.reduce((acc, num) => acc + num, 0);

// Process:
// Step 1: acc = 0, num = 1 → acc = 0 + 1 = 1
// Step 2: acc = 1, num = 2 → acc = 1 + 2 = 3
// Step 3: acc = 3, num = 3 → acc = 3 + 3 = 6
// Result: 6
```

**Visual:**
```
[1, 2, 3] with initial value 0
    ↓
0 + 1 = 1
    ↓
1 + 2 = 3
    ↓
3 + 3 = 6
    ↓
return 6
```

---

### What happens when `reduce()` is called on an empty array without an initial value?

**It throws a TypeError!**

```javascript
[].reduce((acc, num) => acc + num);
// ❌ TypeError: Reduce of empty array with no initial value

// Fix: Provide initial value
[].reduce((acc, num) => acc + num, 0);
// ✅ Returns 0
```

---

### What is `this` inside an Array prototype method?

`this` refers to **the array itself** that the method is called on.

```javascript
const arr = [1, 2, 3];

Array.prototype.myMethod = function() {
    console.log(this); // [1, 2, 3] - the array
    console.log(this.length); // 3
};

arr.myMethod();
```

---

## Function Methods (call, apply, bind)

### Explain `call()`, `apply()`, and `bind()`.

All three methods are used to control **what `this` refers to**, but they work differently:

**Code:**
```javascript
const person = { name: "Alice" };

function greet(greeting, punctuation) {
    return `${greeting}, I'm ${this.name}${punctuation}`;
}

// call() - immediate execution, pass args one by one
greet.call(person, "Hello", "!"); // "Hello, I'm Alice!"

// apply() - immediate execution, pass args as array
greet.apply(person, ["Hi", "?"]);  // "Hi, I'm Alice?"

// bind() - return NEW function, don't execute immediately
const boundGreet = greet.bind(person, "Hey");
boundGreet("~"); // "Hey, I'm Alice~"
```

**Quick Comparison:**
```
call()   → execute NOW, args separated by comma
apply()  → execute NOW, args as array
bind()   → execute LATER, return new function
```

---

### Why does `bind()` return a function?

`bind()` returns a **new function so you can use it later** with already-set `this` value.

```javascript
const user = { name: "Bob" };

function sayHi() {
    console.log(`Hi ${this.name}`);
}

// bind() doesn't execute, returns new function
const boundSayHi = sayHi.bind(user);

// Now you can call it anytime
boundSayHi(); // "Hi Bob"
boundSayHi(); // "Hi Bob" again

// Useful for event listeners
const button = document.querySelector("button");
button.addEventListener("click", boundSayHi);
```

---

### How would you implement `call()`?

```javascript
Function.prototype.myCall = function(context, ...args) {
    // Step 1: Attach function to context
    context.fn = this;
    
    // Step 2: Execute function with context as 'this'
    const result = context.fn(...args);
    
    // Step 3: Clean up and return result
    delete context.fn;
    return result;
};

// Test
const person = { name: "Alice" };
function greet(greeting) {
    return `${greeting}, I'm ${this.name}`;
}

greet.myCall(person, "Hello"); // "Hello, I'm Alice"
```

**How it works:**
1. We assign the function to a property on the context object
2. Call that property (now `this` = context)
3. Delete the temporary property
4. Return the result

---

### Why use `Symbol()` in a `call()` polyfill?

Using a **Symbol prevents conflicts** if the context object already has an `fn` property.

```javascript
// Without Symbol - PROBLEM
context.fn = this;  // What if context.fn already exists?

// With Symbol - SAFE
const fnSymbol = Symbol("fn");
context[fnSymbol] = this;  // No conflicts! Symbols are unique
```

**Example:**
```javascript
const obj = { fn: "existing value" };

// Bad: overwrites existing property
obj.fn = myFunction;
console.log(obj.fn); // myFunction (lost original value!)

// Good: Symbol is unique, no conflict
const sym = Symbol("fn");
obj[sym] = myFunction;
console.log(obj.fn); // "existing value" (preserved!)
```

---

### What happens if the context is `null`?

In **non-strict mode**, `this` becomes the **global object** (window/global).
In **strict mode**, `this` stays `null`.

```javascript
function sayHi() {
    console.log(this);
}

sayHi.call(null);
// Non-strict: Window object (or global)
// Strict: null
```

---

## Promise Methods

### Explain `Promise.all()`.

`Promise.all()` **waits for ALL promises to resolve, then returns an array of all results**.

```javascript
const p1 = Promise.resolve(10);
const p2 = Promise.resolve(20);
const p3 = Promise.resolve(30);

Promise.all([p1, p2, p3]).then(results => {
    console.log(results); // [10, 20, 30]
});
```

**Real-world use:**
```javascript
// Load multiple resources at once
Promise.all([
    fetch("/api/user"),
    fetch("/api/posts"),
    fetch("/api/comments")
]).then(([userData, posts, comments]) => {
    // All loaded successfully
    updateUI(userData, posts, comments);
});
```

---

### Does `Promise.all()` preserve completion order or input order?

**It preserves INPUT ORDER**, not completion order.

```javascript
const p1 = new Promise(resolve => setTimeout(() => resolve("First"), 2000));
const p2 = new Promise(resolve => setTimeout(() => resolve("Second"), 500));

Promise.all([p1, p2]).then(results => {
    console.log(results); // ["First", "Second"]
    // Even though p2 finished first, order is [p1, p2]
});
```

---

### What happens if one promise rejects?

`Promise.all()` **rejects immediately** with the error from the first failed promise.

```javascript
const p1 = Promise.resolve(10);
const p2 = Promise.reject("Error!");
const p3 = Promise.resolve(30);

Promise.all([p1, p2, p3])
    .then(results => console.log(results))
    .catch(error => console.log("Caught:", error)); // "Caught: Error!"
    // p3 never executes
```

---

### What happens with an empty array passed to `Promise.all()`?

**It resolves immediately with an empty array.**

```javascript
Promise.all([]).then(results => {
    console.log(results); // []
});
```

---

### Why do we use `Promise.resolve()` inside the polyfill?

`Promise.resolve()` **converts any value into a Promise**, so the polyfill works with both promises and regular values.

```javascript
function myPromiseAll(promises) {
    return new Promise((resolve, reject) => {
        const results = [];
        let completed = 0;

        promises.forEach((promise, index) => {
            // Convert to Promise (works if it's already a promise OR a regular value)
            Promise.resolve(promise)
                .then(value => {
                    results[index] = value;
                    completed++;
                    if (completed === promises.length) {
                        resolve(results);
                    }
                })
                .catch(error => reject(error));
        });
    });
}

// Works with promises
myPromiseAll([Promise.resolve(10), Promise.resolve(20)]);

// Also works with regular values!
myPromiseAll([10, 20, 30]); // Promise.resolve(10) → converts to Promise
```

**Why this matters:**
```javascript
// Without Promise.resolve() - FAILS
Promise.resolve(10).then(...) // Works ✅
10.then(...) // ❌ Error! Numbers don't have .then()

// With Promise.resolve() - WORKS
Promise.resolve(Promise.resolve(10)).then(...) // Works ✅
Promise.resolve(10).then(...) // Works ✅
```
