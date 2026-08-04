Here are your notes perfectly structured and formatted into a Markdown file. I have organized the duplicate definitions (like Higher-Order Functions) into a single, clean section to make studying easier.

Just like before, simply click **"Copy code"** in the top right corner of the box below and paste it directly into your `.md` file for Git.

```markdown
# JavaScript Functions: In-Depth Guide

## 1. What is a Function?
A function allows us to write flexible, reusable, and abstract blocks of code. Instead of writing the same logic multiple times throughout our application, we can write it once and apply it in multiple ways depending on the requirements.

---

## 2. Function Declarations vs. Expressions

### Function Declaration
A standard way to define a function using the `function` keyword. 

**Characteristics:**
*   **Hoisted completely:** The entire function is moved to the top of its scope before execution.
*   **Callable anywhere:** Can be called *before* it is actually defined in the code.

```javascript
console.log(greet("Sadhik")); // ✓ Works perfectly!

function greet(name) {
    return `Hello ${name}`;
}
```

### Function Expression
A function that is stored inside a variable.

**Characteristics:**
*   **Not fully hoisted:** Only the variable declaration (`const sayHello`) is hoisted, not the function assignment.
*   **Cannot be called before declaration:** Calling it too early throws an error.

```javascript
// sayHello(); // ❌ Throws an error (Cannot access before initialization)

const sayHello = function(name) {
    return `Hello ${name}`;
};
```

---

## 3. Anonymous & Named Functions

### Anonymous Functions
A function without a name. They are typically used in places where a function is needed temporarily or passed as an argument.

**Common Use Cases:** Callbacks, Event listeners, Timers (`setTimeout`), and Higher-order functions.

```javascript
const add = function(a, b) {
    return a + b;
};
```

### Named Function Expressions
A function expression that actually has a name. 

**Common Use Cases:** Recursion (a function calling itself) and getting clearer debugging stack traces.

```javascript
const factorial = function fact(n) {
    if (n <= 1) return 1;
    return n * fact(n - 1); // 'fact' is used to call itself
};
```

---

## 4. Arrow Functions
Introduced in ES6, arrow functions provide a shorter, cleaner syntax for writing function expressions.

```javascript
// Single statement (Implicit return)
const add = (a, b) => a + b;
const square = num => num * num;

// Multiple statements (Requires curly braces and explicit return)
const multiply = (a, b) => {
    const result = a * b;
    return result;
};
```

### Normal vs. Arrow Functions

| Feature | Normal Function | Arrow Function |
| :--- | :--- | :--- |
| **Has own `this` context** | ✅ Yes | ❌ No (inherits from parent) |
| **Has `arguments` object** | ✅ Yes | ❌ No |
| **Can be a constructor (`new`)** | ✅ Yes | ❌ No |
| **Hoisted (as declaration)** | ✅ Yes | ❌ No |

---

## 5. First-Class Functions
In JavaScript, functions are treated as **First-Class Citizens**, meaning they are treated exactly like regular values (like strings or numbers). 

Because of this, you can:

**1. Store them in variables:**
```javascript
const greet = function() { console.log("Hi"); };
```

**2. Pass them as arguments:**
```javascript
function execute(fn) {
    fn();
}
execute(function() { console.log("Running..."); });
```

**3. Return them from other functions:**
```javascript
function outer() {
    return function() {
        console.log("Hello");
    };
}
outer()(); // Calls outer, then immediately calls the returned inner function
```

---

## 6. Higher-Order Functions (HOF)
A Higher-Order Function is a function that does at least one of two things:
1.  Accepts one or more functions as arguments.
2.  Returns a function as its result.

```javascript
// 1. Accepts a function as an argument
function calculator(a, b, operation) {
    return operation(a, b);
}

function add(a, b) {
    return a + b;
}
console.log(calculator(2, 3, add)); // Output: 5

// 2. Returns a function as a result
function createGreeter(greeting) {
  return function(name) {
    return `${greeting},${name}!`;
  }
}

const sayHello = createGreeter('Hello');
console.log(sayHello('Alice'));  // "Hello, Alice!"
```

---

## 7. Callback Functions
A callback is simply a function that is passed into another function as an argument. 
**Why use them?** They allow us to dictate exactly what should happen *after* a specific task finishes executing.

```javascript
function greet(name, callback) {
    console.log("Hello", name);
    callback(); // Executes the passed-in function
}

greet("Sadhik", () => {
    console.log("Welcome!");
});
```

---

## 8. The `this` Keyword (Introduction)

**The Golden Rule:** The value of `this` is determined by *how* a function is called, not *where* it is defined.

```javascript
const person = {
    name: "Sadhik",
    greet() {
        // Here, 'this' refers to the 'person' object calling the method
        console.log(this.name); 
    }
};

person.greet(); // Output: "Sadhik"
```

*(Note: Concepts like `call()`, `apply()`, and `bind()` expand on manipulating the `this` keyword and should be covered next).*

```