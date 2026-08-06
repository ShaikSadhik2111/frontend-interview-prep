<!-- Topic - array methods interview questions -->

# Day 06 - Interview Questions

## Quick Overview

| Topic | Core Idea |
| --- | --- |
| `map()` | Transform every item and return a new array |
| `forEach()` | Run a function for each item, usually for side effects |
| `filter()` | Keep only items that pass a condition |
| `find()` | Return the first matching item |
| `some()` | Check whether at least one item matches |
| `every()` | Check whether all items match |
| `reduce()` | Combine array values into one result |
| `flat()` | Flatten nested arrays |
| `flatMap()` | Map first, then flatten one level |
| Shallow copy | Copies top-level values only |
| Deep copy | Copies nested values too |

---

## 1. Difference between `map()` and `forEach()`

### `map()`

`map()` creates a new array by applying a callback to every element.

Use it when you want to transform data.

### `forEach()`

`forEach()` runs a callback for every element but does not return a new array.

Use it when you only want side effects like logging, updating variables, or making API calls.

### Key difference

- `map()` returns a new array
- `forEach()` returns `undefined`
- `map()` is for transformation
- `forEach()` is for iteration

### Example

```javascript
const nums = [1, 2, 3]

const doubled = nums.map(n => n * 2)
nums.forEach(n => console.log(n))

console.log(doubled) // [2, 4, 6]
```

---

## 2. Difference between `filter()` and `find()`

### `filter()`

`filter()` returns a new array containing all elements that match the condition.

### `find()`

`find()` returns only the first element that matches the condition.

### Key difference

- `filter()` returns an array
- `find()` returns a single value or `undefined`
- `filter()` checks all elements
- `find()` stops after the first match

### Example

```javascript
const nums = [1, 2, 3, 4, 5]

const evenNumbers = nums.filter(n => n % 2 === 0)
const firstEven = nums.find(n => n % 2 === 0)

console.log(evenNumbers) // [2, 4]
console.log(firstEven) // 2
```

---

## 3. Difference between `some()` and `every()`

### `some()`

`some()` returns `true` if at least one element passes the condition.

### `every()`

`every()` returns `true` only if all elements pass the condition.

### Key difference

- `some()` means “at least one”
- `every()` means “all”

### Example

```javascript
const nums = [2, 4, 6]

console.log(nums.some(n => n % 2 === 0)) // true
console.log(nums.every(n => n % 2 === 0)) // true

const mixed = [2, 3, 4]
console.log(mixed.some(n => n % 2 === 0)) // true
console.log(mixed.every(n => n % 2 === 0)) // false
```

---

## 4. Why is `reduce()` powerful?

`reduce()` is powerful because it can convert an array into almost any other data type.

It can be used to build:

- a number, like sum or average
- a string, like concatenation
- an object, like grouped data
- another array, like custom transformations

### Why it matters

`reduce()` lets you combine loop logic into one function, which makes it useful for aggregation and data shaping.

### Example

```javascript
const nums = [1, 2, 3, 4]

const sum = nums.reduce((acc, curr) => acc + curr, 0)
console.log(sum) // 10
```

---

## 5. Difference between `flat()` and `flatMap()`

### `flat()`

`flat()` removes nesting from an array by the given depth.

### `flatMap()`

`flatMap()` first maps each element, then flattens the result by one level.

### Key difference

- `flat()` only flattens
- `flatMap()` transforms and flattens in one step

### Example

```javascript
const arr = [1, 2, 3]

console.log(arr.flatMap(n => [n, n * 2]))
// [1, 2, 2, 4, 3, 6]

console.log([1, [2, [3]]].flat(2))
// [1, 2, 3]
```

---

## 6. Why doesn't `map()` modify the original array?

`map()` does not modify the original array because it creates a new array and stores the transformed values in that new array.

This makes `map()` a non-mutating method.

### Example

```javascript
const nums = [1, 2, 3]
const doubled = nums.map(n => n * 2)

console.log(nums) // [1, 2, 3]
console.log(doubled) // [2, 4, 6]
```

---

## 7. How would you implement `myMap()`?

You can implement `myMap()` by looping through the array, applying a callback to each item, and storing the result in a new array.

### Simple implementation

```javascript
Array.prototype.myMap = function (callback) {
	const result = []

	for (let i = 0; i < this.length; i++) {
		result.push(callback(this[i], i, this))
	}

	return result
}

const nums = [1, 2, 3]
const doubled = nums.myMap(n => n * 2)

console.log(doubled) // [2, 4, 6]
```

---

## 8. Time complexity of `map()`

The time complexity of `map()` is `O(n)` because it visits each element once.

The callback is called once for every item in the array.

---

## 9. Time complexity of `filter()`

The time complexity of `filter()` is also `O(n)` because it checks each element once.

It may return fewer elements, but it still iterates through the full array.

---

## 10. Difference between shallow copy and deep copy

### Shallow copy

A shallow copy copies only the top level of an array or object.

If the value contains nested objects or arrays, those nested references are still shared.

### Deep copy

A deep copy copies all levels of the structure, so nested values are fully independent.

### Key difference

- Shallow copy copies references for nested data
- Deep copy creates completely separate nested data

### Example

```javascript
const original = {
	name: 'Alice',
	address: { city: 'Delhi' }
}

const shallowCopy = { ...original }
const deepCopy = structuredClone(original)

shallowCopy.address.city = 'Mumbai'

console.log(original.address.city) // Mumbai
console.log(deepCopy.address.city) // Delhi
```

---

## Short Revision Notes

- `map()` transforms and returns a new array
- `forEach()` runs logic without returning a new array
- `filter()` returns all matching elements
- `find()` returns the first matching element
- `some()` checks if any element matches
- `every()` checks if all elements match
- `reduce()` combines array values into one result
- `flat()` removes nesting
- `flatMap()` maps and flattens one level
- `map()` does not mutate the original array
- `myMap()` can be built using a loop and callback
- `map()` and `filter()` both have `O(n)` time complexity
- Shallow copy shares nested references, deep copy does not
