# Interview Questions & Answers - Day 09

---

## 1. What is the difference between value and reference?

JavaScript is pass-by-value.

For objects, the value held by a variable is a reference to the object.

When an object is assigned to another variable, the reference value is copied, so both variables can refer to the same object.

```javascript
const obj1 = { name: "Alice" };
const obj2 = obj1;

obj2.name = "Bob";

console.log(obj1.name); // "Bob"
```

**Memory Analogy**:
- Value = Copy of house keys (independent)
- Reference = Shared house key (same house, multiple keys)

---

## 2. What is a shallow copy?

A **shallow copy** creates a new object, but only copies the **top-level properties**.
- Primitive values are copied independently.
- Nested objects/arrays remain shared references.

```javascript
const original = { name: "Alice", address: { city: "Hyderabad" } };
const copy = { ...original };

copy.name = "Bob";
copy.address.city = "Mumbai";

console.log(original.name); // "Alice"
console.log(original.address.city); // "Mumbai"
```

**Rule**: Shallow copy creates a new top-level object; nested objects are not recursively copied.

---

## 3. What is a deep copy?

A **deep copy** creates an independent clone of the supported nested structure.

```javascript
const original = { name: "Alice", address: { city: "Hyderabad" } };
const copy = structuredClone(original);

copy.address.city = "Mumbai";

console.log(original.address.city); // "Hyderabad"
console.log(copy.address.city); // "Mumbai"
```

---

## 4. Why does spread syntax create only a shallow copy?

Spread copies the top-level property values. For nested objects, the copied value is still a reference to the same nested object.

```javascript
const original = { a: 1, nested: { b: 2 } };
const copy = { ...original };

console.log(copy.nested === original.nested); // true
```

---

## 5. Is `Object.assign()` a deep copy?

**No. `Object.assign()` performs a shallow copy.**

```javascript
const original = { name: "Alice", address: { city: "Hyderabad" } };
const copy = Object.assign({}, original);

copy.address.city = "Mumbai";
console.log(original.address.city); // "Mumbai"
```

---

## 6. Difference between `Object.freeze()` and `Object.seal()`?

| Action | `freeze()` | `seal()` |
|--------|-----------|---------|
| Modify existing property | ✗ NO | ✓ YES |
| Add new property | ✗ NO | ✗ NO |
| Delete property | ✗ NO | ✗ NO |

Both are shallow operations.

---

## 7. Is `Object.freeze()` deep?

**No. `Object.freeze()` is shallow.** Nested objects can still be mutated unless they are frozen recursively.

```javascript
const obj = Object.freeze({
  name: "Alice",
  address: { city: "Hyderabad" }
});

obj.address.city = "Mumbai";
console.log(obj.address.city); // "Mumbai"
```

---

## 8. What does `Object.create()` do?

`Object.create(proto)` creates a new object whose internal `[[Prototype]]` is set to `proto`.

```javascript
const animal = {
  speak() {
    console.log(`${this.name} makes a sound`);
  }
};

const dog = Object.create(animal);
dog.name = "Rex";
dog.speak(); // Rex makes a sound
```

`Object.create(null)` creates an object with no prototype.

---

## 9. What is the relationship between `Object.create()` and prototypes?

`Object.create(proto)` explicitly establishes the prototype relationship.

```text
car → vehicle → Object.prototype → null
```

Property lookup checks the object first and then follows the prototype chain when the property is not found.

---

## 10. Difference between `Object.keys()` and `Object.entries()`?

Both return arrays of an object's own enumerable properties, but their shapes differ:

- `Object.keys(obj)` → keys
- `Object.values(obj)` → values
- `Object.entries(obj)` → `[key, value]` pairs

---

## 11. What does `Object.fromEntries()` do?

It converts an iterable of `[key, value]` pairs into an object.

```javascript
const entries = [["name", "Alice"], ["age", 25]];
const obj = Object.fromEntries(entries);
```

It is useful for transforming objects together with `Object.entries()` and array methods such as `map()` and `filter()`.

---

## 12. Why is `structuredClone()` preferable to JSON cloning in many cases?

JSON cloning has important limitations with `undefined`, `Date`, `Map`, `Set`, `RegExp`, circular references, and other non-JSON data.

`structuredClone()` supports many structured-clonable built-in types and handles circular references.

```javascript
const data = {
  date: new Date(),
  map: new Map([["a", 1]]),
  undef: undefined
};

const clone = structuredClone(data);

console.log(clone.date instanceof Date); // true
console.log(clone.map instanceof Map); // true
console.log("undef" in clone); // true
```

Note: `structuredClone()` does not clone every possible JavaScript value, such as functions.

---

## 13. Why does React care about object references?

React relies heavily on object identity when determining whether values have changed.

For state updates, React can bail out when the new state is `Object.is`-equal to the previous state. Memoized components also use prop comparisons to determine whether rendering can be skipped.

Therefore, mutating an existing state object and passing the same reference can prevent React from recognizing the update as a state change.

```javascript
const obj1 = { name: "Alice" };
const obj2 = { name: "Alice" };

console.log(obj1 === obj2); // false
```

### React state update

```javascript
// ❌ Avoid direct mutation
state.name = "Bob";
setState(state);

// ✓ Create a new object
setState({ ...state, name: "Bob" });
```

**Key rule:** Treat React state as immutable and create new references when updating state.

---

## 14. How would you update deeply nested React state immutably?

Every level from the state root to the changed property needs a new object reference.

```javascript
const state = {
  user: {
    profile: {
      address: {
        city: "Hyderabad"
      }
    }
  }
};

setState({
  ...state,
  user: {
    ...state.user,
    profile: {
      ...state.user.profile,
      address: {
        ...state.user.profile.address,
        city: "Mumbai"
      }
    }
  }
});
```

For deeply nested state, consider flatter state structures or an immutability helper such as Immer when appropriate.

**Golden rule:** Do not mutate existing React state directly. Create the appropriate new references for the updated path.
