# Interview Questions & Answers - Day 09

---

## 1. What is the difference between value and reference?

**Primitives** (string, number, boolean, null, undefined) are stored by **value**.
- Variable holds the actual data
- Copying a primitive creates a completely independent copy

**Objects** (objects, arrays, functions) are stored by **reference**.
- Variable holds a memory address (pointer) to where data lives
- Copying an object copies the address, NOT the data — both variables point to same object

```javascript
// Value (primitive)
let a = 10;
let b = a;       // b gets a copy of 10
b = 99;
console.log(a);  // 10 — unchanged, completely independent

// Reference (object)
let obj1 = { name: "Alice" };
let obj2 = obj1;       // obj2 gets the same memory address
obj2.name = "Bob";
console.log(obj1.name); // "Bob" — BOTH changed! Same object in memory
```

**Memory Analogy**:
- Value = Copy of house keys (independent)
- Reference = Shared house key (same house, multiple keys)

---

## 2. What is a shallow copy?

A **shallow copy** creates a new object, but only copies the **top-level properties**.
- Primitive values are copied independently
- Nested objects/arrays are still **shared references** (not copied, just their address is copied)

```javascript
const original = { name: "Alice", address: { city: "Hyderabad" } };
const copy = { ...original }; // spread operator = shallow copy

copy.name = "Bob";            // independent — only changes copy
copy.address.city = "Mumbai"; // SHARED — changes BOTH original and copy!

console.log(original.name);         // "Alice" ✓ (independent)
console.log(original.address.city); // "Mumbai" ✗ (shared reference!)
```

**Rule**: Shallow copy = one level deep only. Anything nested is still shared.

---

## 3. What is a deep copy?

A **deep copy** creates a completely independent clone — every level of nesting is copied.
- No shared references at any level
- Modifying the copy never affects the original

```javascript
const original = { name: "Alice", address: { city: "Hyderabad" } };
const copy = structuredClone(original); // deep copy

copy.address.city = "Mumbai";

console.log(original.address.city); // "Hyderabad" ✓ — NOT affected
console.log(copy.address.city);     // "Mumbai" ✓ — completely independent
```

**Rule**: Deep copy = all levels copied. Zero shared references.

---

## 4. Why does spread syntax create only a shallow copy?

Spread (`...`) iterates over the **top-level keys** of an object and copies their values.
- For primitives: the value itself is copied (independent)
- For nested objects: the **reference** (memory address) is copied — not the object

So the new object has different top-level structure, but nested objects still point to the same place in memory.

```javascript
const original = { a: 1, nested: { b: 2 } };
const copy = { ...original };

// What spread actually does internally:
// copy.a = original.a         → copies primitive value 1
// copy.nested = original.nested → copies the REFERENCE, not the object!

console.log(copy.nested === original.nested); // true — same object in memory!
```

**Short answer**: Spread only goes ONE level deep. It doesn't recursively copy nested objects.

---

## 5. Is `Object.assign()` a deep copy?

**No. `Object.assign()` is a shallow copy.**

It behaves exactly like spread for this purpose — copies top-level properties, but nested objects are still shared references.

```javascript
const original = { name: "Alice", address: { city: "Hyderabad" } };
const copy = Object.assign({}, original);

copy.address.city = "Mumbai";
console.log(original.address.city); // "Mumbai" — SHARED! Not a deep copy.
```

**Key point**: `Object.assign()` and `spread (...)` are functionally equivalent for copying — both shallow.

---

## 6. Difference between `Object.freeze()` and `Object.seal()`?

Both prevent structural changes but differ in what's allowed:

| Action | `freeze()` | `seal()` |
|--------|-----------|---------|
| Modify existing property | ✗ NO | ✓ YES |
| Add new property | ✗ NO | ✗ NO |
| Delete property | ✗ NO | ✗ NO |

```javascript
// freeze — FULLY locked
const frozen = Object.freeze({ name: "Alice" });
frozen.name = "Bob";  // silently fails
console.log(frozen.name); // "Alice"

// seal — PARTIALLY locked
const sealed = Object.seal({ name: "Alice" });
sealed.name = "Bob";  // WORKS
sealed.age = 25;      // silently fails (can't add)
console.log(sealed.name); // "Bob" ✓
console.log(sealed.age);  // undefined ✓
```

**Memory Aid**:
- `freeze` = frozen solid, nothing can change
- `seal` = sealed box, you can modify contents but can't add/remove slots

---

## 7. Is `Object.freeze()` deep?

**No. `Object.freeze()` is shallow (only one level deep).**

It freezes the top-level properties of an object, but nested objects are NOT frozen — they can still be mutated.

```javascript
const obj = Object.freeze({ name: "Alice", address: { city: "Hyderabad" } });

obj.name = "Bob";           // fails — top level frozen ✓
obj.address.city = "Mumbai"; // WORKS — nested object is NOT frozen!

console.log(obj.name);         // "Alice" ✓
console.log(obj.address.city); // "Mumbai" — nested changed!
```

**To deep freeze**, you need to recursively call `Object.freeze()` on every nested object:
```javascript
function deepFreeze(obj) {
    Object.keys(obj).forEach(key => {
        if (typeof obj[key] === 'object' && obj[key] !== null) {
            deepFreeze(obj[key]); // recursively freeze nested objects
        }
    });
    return Object.freeze(obj);
}
```

---

## 8. What does `Object.create()` do?

`Object.create(proto)` creates a **new object** with its prototype explicitly set to `proto`.

Unlike `{}` which always sets the prototype to `Object.prototype`, `Object.create()` lets you choose the prototype.

```javascript
const animal = {
    speak() { console.log(`${this.name} makes a sound`); }
};

const dog = Object.create(animal); // dog's prototype = animal
dog.name = "Rex";

dog.speak(); // "Rex makes a sound" ✓
// dog doesn't have 'speak' itself, it finds it via prototype chain

console.log(Object.getPrototypeOf(dog) === animal); // true
```

**Special case**: `Object.create(null)` creates a truly empty object with NO prototype at all — useful when you want a pure dictionary (no inherited methods).

---

## 9. What is the relationship between `Object.create()` and prototypes?

`Object.create()` is the **direct way** to set up prototype inheritance.

Every object in JS has a hidden `[[Prototype]]` link. When you access a property, JS first looks on the object itself — if not found, it walks UP the prototype chain.

`Object.create(proto)` explicitly sets what that prototype link points to.

```javascript
const vehicle = { hasWheels: true };
const car = Object.create(vehicle);  // car's [[Prototype]] = vehicle

car.brand = "Toyota";

console.log(car.brand);      // "Toyota" — found on car itself
console.log(car.hasWheels);  // true — found on prototype (vehicle)!
console.log(car.hasOwnProperty("hasWheels")); // false — it's inherited, not own

// Prototype chain: car → vehicle → Object.prototype → null
```

**Relationship**: `Object.create()` IS the mechanism to manually wire up prototype chains. Classes and constructor functions do this same thing under the hood automatically.

---

## 10. Difference between `Object.keys()` and `Object.entries()`?

Both iterate over **own enumerable properties** of an object, but return different shapes:

| Method | Returns | Example Output |
|--------|---------|---------------|
| `Object.keys(obj)` | Array of keys | `["name", "age"]` |
| `Object.values(obj)` | Array of values | `["Alice", 25]` |
| `Object.entries(obj)` | Array of `[key, value]` pairs | `[["name","Alice"], ["age",25]]` |

```javascript
const user = { name: "Alice", age: 25 };

Object.keys(user);    // ["name", "age"]
Object.values(user);  // ["Alice", 25]
Object.entries(user); // [["name", "Alice"], ["age", 25]]

// entries is useful when you need BOTH key and value together
Object.entries(user).forEach(([key, value]) => {
    console.log(`${key}: ${value}`);
});
// "name: Alice"
// "age: 25"
```

**When to use which:**
- `keys()` → when you only need keys (to check existence, iterate)
- `values()` → when you only need values (sum, filter)
- `entries()` → when you need both (transform, display, convert)

---

## 11. What does `Object.fromEntries()` do?

`Object.fromEntries()` is the **reverse of `Object.entries()`** — it converts an array of `[key, value]` pairs back into an object.

```javascript
const entries = [["name", "Alice"], ["age", 25]];
const obj = Object.fromEntries(entries);
console.log(obj); // { name: "Alice", age: 25 }
```

**Real power**: Combine with `entries()` + `map()` to transform objects:
```javascript
const prices = { apple: 100, banana: 50, mango: 80 };

// Apply 10% discount to all prices
const discounted = Object.fromEntries(
    Object.entries(prices).map(([item, price]) => [item, price * 0.9])
);
console.log(discounted); // { apple: 90, banana: 45, mango: 72 }
```

**Also works with Map**:
```javascript
const map = new Map([["name", "Alice"], ["age", 25]]);
const obj = Object.fromEntries(map); // { name: "Alice", age: 25 }
```

---

## 12. Why is `structuredClone()` preferable to JSON cloning in many cases?

**JSON cloning** (`JSON.parse(JSON.stringify(obj))`) is a common deep copy hack but has serious limitations:

| Feature | `JSON.parse(stringify())` | `structuredClone()` |
|---------|--------------------------|---------------------|
| Functions | ✗ Drops them silently | ✗ Throws error |
| `undefined` values | ✗ Drops them silently | ✓ Preserved |
| `Date` objects | ✗ Converts to string | ✓ Preserved as Date |
| `Map`, `Set` | ✗ Converts to `{}` / `[]` | ✓ Preserved |
| `RegExp` | ✗ Converts to `{}` | ✓ Preserved |
| Circular references | ✗ Throws error | ✓ Handled |
| Performance | Slower (serialize + parse) | Faster (native) |

```javascript
const data = {
    date: new Date(),
    map: new Map([["a", 1]]),
    undef: undefined
};

// JSON cloning — data corruption!
const jsonClone = JSON.parse(JSON.stringify(data));
console.log(jsonClone.date); // string, not Date object!
console.log(jsonClone.map);  // {} — Map is lost!
console.log(jsonClone.undef); // undefined key is gone!

// structuredClone — correct!
const clone = structuredClone(data);
console.log(clone.date instanceof Date); // true ✓
console.log(clone.map instanceof Map);   // true ✓
console.log("undef" in clone);           // true ✓
```

**Short answer**: JSON cloning silently corrupts Dates, Maps, Sets, and undefined values. `structuredClone()` handles them all correctly and is faster.

---

## 13. Why does React care about object references?

React uses **reference equality** (`===`) to decide whether to re-render a component.

When you pass an object as a prop or store it in state, React checks: "Is this the same reference as before?" — not "Does it have the same content?"

```javascript
const obj1 = { name: "Alice" };
const obj2 = { name: "Alice" };

console.log(obj1 === obj2); // false — different references even though same content!

// React sees obj1 !== obj2 → triggers re-render
// React sees obj1 === obj1 → skips re-render
```

**Why this matters:**

```javascript
// ❌ WRONG — mutating state directly
// React sees same reference → NO re-render (state appears stuck!)
state.name = "Bob";
setState(state); // same object reference! React skips re-render

// ✓ CORRECT — creating new object (new reference)
// React sees different reference → triggers re-render
setState({ ...state, name: "Bob" }); // new object, new reference
```

**Key Rule**: In React, always **return a new object/array** when updating state. Never mutate existing state directly. Immutability is required because React compares references, not values.

---

## 14. How would you update deeply nested React state immutably?

Every level of nesting that changes needs a **new copy**. You must spread at every level up to the change.

```javascript
// State shape:
const state = {
    user: {
        profile: {
            address: {
                city: "Hyderabad"
            }
        }
    }
};

// ❌ WRONG — mutates deeply
state.user.profile.address.city = "Mumbai"; // React won't detect this!

// ✓ CORRECT — spread at EVERY level up to the changed property
setState({
    ...state,               // copy top level
    user: {
        ...state.user,      // copy user level
        profile: {
            ...state.user.profile,  // copy profile level
            address: {
                ...state.user.profile.address, // copy address level
                city: "Mumbai"    // only change this value
            }
        }
    }
});
```

**This feels verbose.** For deeply nested state, use one of these approaches:

**Option 1: `structuredClone()` + modify**
```javascript
const newState = structuredClone(state);
newState.user.profile.address.city = "Mumbai";
setState(newState); // new reference at every level ✓
```

**Option 2: Flatten state** (best long-term solution)
```javascript
// Instead of deeply nested, keep state flat:
const [city, setCity] = useState("Hyderabad");
const [userName, setUserName] = useState("Alice");
// No deep nesting = no deep spread needed
```

**Option 3: Immer library**
```javascript
import produce from "immer";
setState(produce(state, draft => {
    draft.user.profile.address.city = "Mumbai"; // write mutating code, Immer handles immutability
}));
```

**Golden Rule**: The deeper the nesting, the harder immutable updates become. Prefer flat state structures in React whenever possible.
