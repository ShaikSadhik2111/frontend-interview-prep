Here are your notes perfectly structured and formatted into a Markdown file. I have organized the concepts logically and fixed a small duplicate code block in your raw notes (under "change the prototype") to make sure it accurately shows `Object.setPrototypeOf()`.

Click **"Copy code"** in the top right corner of the box below to grab the perfectly formatted text for your Git repository.

```markdown
# JavaScript Objects & Prototypes: In-Depth Guide

## 1. Objects & The Prototype Chain

### What is a Prototype?
Every JavaScript object has a hidden internal link to another object. This linked object is called its **prototype** (`[[Prototype]]`). 

When you try to access a property or method on an object (like `person.toString()`), and JavaScript cannot find it on the object itself, it will automatically look inside the object's prototype.

### The Prototype Chain
This fallback search mechanism creates a chain. If the property isn't found in the first prototype, it looks at that prototype's prototype, continuing until it reaches `null`.

**Example:**
```javascript
const person = {
    name: "Sadhik",
    age: 26
};

// We never defined toString(), but this works!
console.log(person.toString()); 
```
**Why it works (The Chain):**
`person` ➔ `Object.prototype` (where toString lives) ➔ `null`

**Custom Prototype Chain Example:**
```javascript
const animal = { eats: true };
const dog = Object.create(animal);
dog.name = "Rocky";

console.log(dog.eats); // Output: true
```
**The Chain:**
`dog` (has name) ➔ `animal` (has eats) ➔ `Object.prototype` ➔ `null`

---

## 2. Constructor Functions & The `new` Keyword

Before ES6 classes, JavaScript used constructor functions to create objects.

```javascript
function Person(name) {
    this.name = name;
}
const p1 = new Person("Sadhik");
```

### What exactly does the `new` keyword do?
When you call `new Constructor(args)`, JavaScript performs 4 exact steps under the hood:

1. **Create an empty object:** Creates a fresh object: `const obj = {}`
2. **Link the prototype:** Sets `obj`'s hidden `[[Prototype]]` to `Constructor.prototype`.
3. **Execute the constructor:** Runs the constructor function with `this` bound to the new `obj`.
4. **Return the object:** Automatically returns `obj` (unless the constructor explicitly returns another object).

```text
┌─────────────────────────────────────────────────────────────────────────┐
│               WHAT new Player("Alice", 100) DOES                        │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                         │
│  Step 1: Create a new empty object                                      │
│          const obj = {}                                                 │
│                                                                         │
│  Step 2: Link the object's prototype to Constructor.prototype           │
│          Object.setPrototypeOf(obj, Player.prototype)                   │
│                                                                         │
│  Step 3: Run the constructor with 'this' bound to the new object        │
│          Player.call(obj, "Alice", 100)                                 │
│          // Now obj.name = "Alice", obj.health = 100                    │
│                                                                         │
│  Step 4: Return the object (unless constructor returns an object)       │
│          return obj                                                     │
│                                                                         │
│  ─────────────────────────────────────────────────────────────────────  │
│                                                                         │
│  RESULT:                                                                │
│                                                                         │
│     Player.prototype                                                    │
│     ┌─────────────────────┐                                             │
│     │ attack: function()  │◄───── Shared by all instances               │
│     │ constructor: Player │                                             │
│     └─────────────────────┘                                             │
│              ▲                                                          │
│              │ [[Prototype]]                                            │
│              │                                                          │
│     ┌────────┴────────┐                                                 │
│     │      alice      │                                                 │
│     │─────────────────│                                                 │
│     │ name: "Alice"   │                                                 │
│     │ health: 100     │                                                 │
│     └─────────────────┘                                                 │
│                                                                         │
└─────────────────────────────────────────────────────────────────────────┘
```

**Simulating `new` manually:**
```javascript
function myNew(Constructor, ...args) {
  const obj = Object.create(Constructor.prototype); // Steps 1 & 2
  const result = Constructor.apply(obj, args);      // Step 3
  return (result !== null && typeof result === 'object') ? result : obj; // Step 4
}
```

---

## 3. `prototype` vs `__proto__`

This is a common point of confusion. 
*   **`prototype`** is a property that belongs strictly to **functions** (specifically constructor functions).
*   **`__proto__`** (or `[[Prototype]]`) is the actual hidden link that belongs to **instance objects**.

**The Relationship:**
When you create an instance, its `__proto__` points to the constructor's `prototype`.
```javascript
const person = new Person();
console.log(person.__proto__ === Person.prototype); // true
```

---

## 4. Four Ways to Create Objects

An object is a standalone data structure that stores collections of data as key-value pairs.

### 1. Object Literals
The simplest way. Great for one-off objects. The prototype is automatically `Object.prototype`.
```javascript
const player = { name: "Alice", health: 100 };
```

### 2. `Object.create()`
Creates a new object with a *specific* prototype of your choosing.

```javascript
const animalProto = { speak() { return "Sound!"; } };
const dog = Object.create(animalProto); // dog inherits from animalProto

// Creating an object with NO prototype (truly empty dictionary)
const dict = Object.create(null);
console.log(dict.toString); // undefined
```

**Using Data Descriptors:**
```javascript
const person = Object.create(Object.prototype, {
  name: { value: "Alice", writable: true, enumerable: true },
  secret: { value: "hidden", enumerable: false } // Won't show in loops!
});
```

### 3. The `new` Operator (Constructor Functions)
Used to instantiate multiple objects sharing the same methods.
```javascript
function Player(name) { this.name = name; }
Player.prototype.attack = function() { return "Attack!"; };
const p = new Player("Alice");
```

### 4. `Object.assign()`
Copies enumerable own properties from one or more source objects to a target object. Great for merging or shallow cloning.

```javascript
// Merging Defaults
const defaults = { theme: "light", fontSize: 14 };
const userPrefs = { theme: "dark" };
const settings = Object.assign({}, defaults, userPrefs); 
// Output: { theme: "dark", fontSize: 14 }

// Shallow Cloning (Beware: Nested arrays/objects share the same reference!)
const original = { name: "Alice", scores: [90, 85] };
const clone = Object.assign({}, original);
```

---

## 5. Manipulating & Checking Prototypes

### `Object.getPrototypeOf()`
Safely reads an object's prototype.
```javascript
const player = { name: "Alice" };
console.log(Object.getPrototypeOf(player) === Object.prototype); // true
```

### `Object.setPrototypeOf()`
Changes an object's prototype after it is created. *(Note: This is generally bad for performance, prefer `Object.create`).*
```javascript
const user = { name: "Bob" };
const adminProto = { role: "admin" };
Object.setPrototypeOf(user, adminProto);
```

### `instanceof` Operator
Checks if a `Constructor.prototype` exists anywhere in an object’s prototype chain.
```javascript
function Dog() {}
const rex = new Dog();

console.log(rex instanceof Dog);    // true
console.log(rex instanceof Object); // true
```

---

## 6. Property Checking & Enumeration

When looping through or checking properties, JavaScript behaves differently depending on whether the property belongs to the object itself (Own) or its Prototype (Inherited).

| Method | Checks "Own" Properties? | Checks "Enumerable" Only? | Checks "Inherited" Properties? |
| :--- | :--- | :--- | :--- |
| `obj.hasOwnProperty(key)` | Yes | Both | No |
| `key in obj` | Yes | Both | Yes |
| `Object.keys(obj)` | Yes | Enumerable only | No |
| `Object.getOwnPropertyNames(obj)` | Yes | Both | No |
| `for...in` loop | Yes | Enumerable only | Yes |

```javascript
const person = { name: "Sadhik" };

console.log(person.hasOwnProperty("name"));     // true (Own property)
console.log(person.hasOwnProperty("toString")); // false (Inherited property)
console.log("toString" in person);              // true (Checks chain)
```

```