## 1. Choosing the Right Method

The most common struggle with Array methods is simply knowing which one to use. Here is a quick reference guide:

```text
┌─────────────────────────────────────────────────────────────────────────┐
│                    CHOOSING THE RIGHT METHOD                            │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                         │
│  WHAT DO YOU NEED?                    USE THIS                          │
│  ─────────────────                    ────────                          │
│                                                                         │
│  Transform every element          →   map()                             │
│  Keep some elements               →   filter()                          │
│  Combine into single value        →   reduce()                          │
│  Find first matching element      →   find()                            │
│  Check if any element matches     →   some()                            │
│  Check if all elements match      →   every()                           │
│  Check if value exists            →   includes()                        │
│  Get index of element             →   findIndex() or indexOf()          │
│  Just do something with each      →   forEach()                         │
│  Flatten nested arrays            →   flat() or flatMap()               │
│                                                                         │
└─────────────────────────────────────────────────────────────────────────┘

```

---

## 2. Transforming & Filtering Data

### `map()`

Creates a new array by applying a callback function to each element of the original array.

* Returns an array of the *exact same length*.
* **Pure function:** It never modifies the original array (non-mutating).

**Syntax:** `array.map(callback(element, index, array), thisArg)`

```javascript
const users = [
  { id: 1, name: 'Alice' },
  { id: 2, name: 'Bob' }
];

// Extracting specific data (Plucking)
const names = users.map(user => user.name);
console.log(names); // ['Alice', 'Bob']

// Using the index parameter
const indexed = ['a', 'b'].map((letter, index) => `${index}: ${letter}`);
console.log(indexed); // ['0: a', '1: b']

```

### `filter()`

Creates a new array containing *only* the elements that pass a test implemented by the callback function (where the callback returns `true`).

* Does not modify the original array.

**Syntax:** `array.filter(callback(element, index, array), thisArg)`

```javascript
const numbers = [1, 2, 3, 4, 5, 6];
const evens = numbers.filter(n => n % 2 === 0);
console.log(evens); // [2, 4, 6]

// Query filtering
const products = [
  { name: 'MacBook', category: 'laptops' },
  { name: 'iPhone', category: 'phones' }
];
const laptops = products.filter(p => p.category === 'laptops');

```

---

## 3. The Power of `reduce()`

### What is `reduce()`?

It executes a "reducer" callback function on each element, accumulating the results into a **single output value**. This single value can be a number, string, object, or even another array.

* The callback receives an `accumulator` (the running total) and the `currentValue`.
* *Always provide an initial value* to avoid bugs on empty arrays.

**Syntax:** `array.reduce(callback(accumulator, currentValue, index, array), initialValue)`

```text
┌─────────────────────────────────────────────────────────────────────────┐
│                         reduce() STEP BY STEP                           │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                         │
│  Initial value: 0                                                       │
│                                                                         │
│  [1, 2, 3, 4].reduce((acc, curr) => acc + curr, 0)                      │
│                                                                         │
│  Step 1:  acc=0, curr=1  →  0 + 1 = 1   (accumulator becomes 1)         │
│  Step 2:  acc=1, curr=2  →  1 + 2 = 3   (accumulator becomes 3)         │
│  Step 3:  acc=3, curr=3  →  3 + 3 = 6   (accumulator becomes 6)         │
│  Step 4:  acc=6, curr=4  →  6 + 4 = 10  (final result!)                 │
│                                                                         │
│  Result: 10                                                             │
│                                                                         │
└─────────────────────────────────────────────────────────────────────────┘

```

**Advanced Use Case: Grouping Data by Property**

```javascript
const people = [
  { name: 'Alice', department: 'Engineering' },
  { name: 'Bob', department: 'Marketing' },
  { name: 'Charlie', department: 'Engineering' }
];

const byDepartment = people.reduce((acc, person) => {
  const dept = person.department;
  if (!acc[dept]) {
    acc[dept] = []; // Initialize array if it doesn't exist
  }
  acc[dept].push(person);
  return acc;
}, {}); // Initial value is an empty object

console.log(byDepartment);
/* Output: {
    Engineering: [{ name: 'Alice', ... }, { name: 'Charlie', ... }],
    Marketing: [{ name: 'Bob', ... }]
   } 
*/

```

---

## 4. Method Chaining

Because methods like `map()` and `filter()` return new arrays, you can chain them together for clean, readable data pipelines.

```javascript
const transactions = [
  { type: 'sale', amount: 100 },
  { type: 'refund', amount: 30 },
  { type: 'sale', amount: 200 }
];

const totalSales = transactions
  .filter(t => t.type === 'sale')           // Keep only sales
  .map(t => t.amount)                       // Extract amounts [100, 200]
  .reduce((sum, amount) => sum + amount, 0); // Sum them up: 300

```

---

## 5. Iteration & Searching

### `forEach()` vs `map()`

`forEach()` executes a function once for each element. It is an alternative to a traditional `for` loop.

| Aspect | `map()` | `forEach()` |
| --- | --- | --- |
| **Returns** | New array | `undefined` |
| **Purpose** | Transform data | Side effects (logging, DOM updates, etc.) |
| **Chainable** | Yes | No |

```javascript
const numbers = [1, 2, 3];

// ❌ WRONG: Using map for side effects (wasteful memory usage)
numbers.map(n => console.log(n)); 

// ✓ CORRECT: Use forEach for side effects
numbers.forEach(n => console.log(n)); 

```

### Search Methods

* **`find()`**: Returns the *first* matching element.
```javascript
const num = [1, 2, 3, 4];
console.log(num.find(n => n % 2 === 0)); // Output: 2

```


* **`findIndex()`**: Returns the *index* of the first matching element.
```javascript
const marks = [10, 20, 30, 40, 50];
console.log(marks.findIndex(m => m > 40)); // Output: 4 (index of 50)

```



### Validation Methods (Returning Booleans)

* **`some()`**: Checks if *at least one* element passes the test. Stops iterating immediately once a match is found (Short-circuiting).
```javascript
const numbers = [1, 3, 5, 7, 8];
console.log(numbers.some(num => num % 2 === 0)); // true (stops at 8)

```


* **`every()`**: Checks if *all* elements pass the test.
```javascript
const numbers = [10, 20, 30, 40];
console.log(numbers.every(n => n >= 10)); // true

```



---

## 6. Sorting & Flattening Arrays

### `sort()`

Rearranges the elements of an array *in place* (mutates the original array).
**Important Note:** By default, it converts elements into strings and sorts them in ascending order based on UTF-16 code units. This leads to bugs with numbers.

```javascript
// Default sorting works fine for strings
const fruits = ['orange', 'apple', 'banana'];
console.log(fruits.sort()); // ['apple', 'banana', 'orange']

// ❌ Default sorting breaks on numbers
const num = [1, 10, 2, 21];
console.log(num.sort()); // [1, 10, 2, 21] 

// ✓ CORRECT: Sorting numbers requires a compare function
console.log(num.sort((a, b) => a - b)); // [1, 2, 10, 21]

```

### `flat()` & `flatMap()`

* **`flat()`**: Creates a new array with all sub-array elements concatenated into it recursively up to the specified depth.
* **`flatMap()`**: Identical to running a `map()` followed by a `flat()` of depth 1.

```javascript
const nested = [1, 2, [3, 4]];
console.log(nested.flat()); // [1, 2, 3, 4]

const nums = [1, 2, 3];
console.log(nums.flatMap(x => [x * 2])); // [2, 4, 6]

```

---

## 7. Polyfills

### What is a Polyfill?

A polyfill is a piece of JavaScript code that provides modern functionality to older browsers that lack native support for those features. They bridge the gap between modern JS APIs and the limited capabilities of older browser versions (like Internet Explorer 11).

### How do they work?

They use feature detection (`if (!Array.prototype.methodName)`) to check if a feature is missing. If it is missing, they provide a custom implementation using older, widely supported JavaScript capabilities.

**Code Example: Writing a Polyfill for `includes()**`

```javascript
// Feature Detection
if (!Array.prototype.includes) {
  
  // Custom Implementation
  Array.prototype.includes = function(searchElement) {
    for (var i = 0; i < this.length; i++) {
      // 'this' refers to the array the method was called on
      if (this[i] === searchElement) {
        return true;
      }
    }
    return false;
  };
}

console.log([1, 2, 3].includes(2)); // true

```