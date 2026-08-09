// problem 1 Object Methods
//Given
 const user = {
  name: "A",
  age: 25,
  city: "Hyderabad"
};

//using object keys , values, entries methods
//1. Get all the keys of the object
const keys = Object.keys(user);
console.log("Keys:", keys); // Output: ["name", "age", "city"]

//2. Get all the values of the object
const values = Object.values(user);
console.log("Values:", values); // Output: ["A", 25, "Hyderabad"]

//3. Get all the entries of the object
const entries = Object.entries(user);
console.log("Entries:", entries); // Output: [["name", "A"], ["age", 25], ["city", "Hyderabad"]]


//problem 2 convert object to array then to object
//Given
const user = {
  name: "A",
  age: 25
};

//Convert it to entries, modify the entries, then reconstruct the object using: Object.fromEntries()
const entries = Object.entries(user);
console.log("Entries:", entries); // Output: [["name", "A"], ["age", 25]]

// Modify the entries (for example, change the name and age)
entries[0][1] = "B";
entries[1][1] = 30;

// Reconstruct the object using Object.fromEntries()
const modifiedUser = Object.fromEntries(entries);
console.log("Modified User:", modifiedUser); // Output: { name: "B", age: 30 }

//problem 3 shallow copy
//create an object containing nested data and create a shallow copy an dproce that copy !=== original object but copy.nestedObject === original.nestedObject 

const originalObject = {
  name: "A",
  nestedObject: { a: 1, b: 2 }
};

// Create a shallow copy using Object.assign()
const shallowCopy = Object.assign({}, originalObject);
console.log("Original Object:", originalObject); // Output: { name: "A", nestedObject: { a: 1, b: 2 } }
console.log("Shallow Copy:", shallowCopy); // Output: { name: "A", nestedObject: { a: 1, b: 2 } }
console.log("Are original and shallow copy the same object?", originalObject === shallowCopy); // Output: false
console.log("Are nested objects the same?", originalObject.nestedObject === shallowCopy.nestedObject); // Output: true

// problem 4 deep copy 
//use structuredClone() to create a deep copy of an object containing nested data and prove that the deep copy !== original object and deepCopy.nestedObject !== original.nestedObject
//and also prov ethat nested objects are no longer shared

const originalObject = {
    name: "A",
    nestedObject: { a: 1, b: 2 }
};

const deepCopy = structuredClone(originalObject);
console.log("Original Object:", originalObject);
console.log("Deep Copy:", deepCopy);
console.log("Are original and deep copy the same object?", originalObject === deepCopy);// Output: false
console.log("Are nested objects the same?", originalObject.nestedObject === deepCopy.nestedObject); // Output: false
//no longer shared
console.log("Modifying deep copy's nested object...");
deepCopy.nestedObject.a = 42;
console.log("Original Object after modification:", originalObject);
// Output: { name: "A", nestedObject: { a: 1, b: 2 } }
console.log("Deep Copy after modification:", deepCopy);
// Output: { name: "A", nestedObject: { a: 42, b: 2 } }

//this proves that the nested objects are no longer shared between the original and deep copy.


//problem 5 shallow copy without using Object.assign() or spread operator
//write a function shallowCopy(obj) that takes an object as input and returns a shallow copy of that object without using Object.assign() or the spread operator. The function should create a new object and copy the properties from the original object to the new object.

function shallowCopy(obj) {
    const copy = {};
    for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
            copy[key] = obj[key];
        }
    }
    return copy;
}

shallowCopy({ name: "A", age: 25 }); // Output: { name: "A", age: 25 }
const originalObject = { name: "A", age: 25 };
const copiedObject = shallowCopy(originalObject);
console.log("Original Object:", originalObject); // Output: { name: "A", age: 25 }
console.log("Copied Object:", copiedObject); // Output: { name: "A", age: 25 }


//problem 6 deep clone challenge
//impelment a basic recursive deepClone(value)
//start with primitives, arrays, plain objects

function deepClone(value) {
    // STEP 1: Handle primitives (string, number, boolean, null, undefined)
    // These are NOT objects, so just return them directly - no cloning needed
    if (value === null || typeof value !== 'object') {
        return value;
    }

    // STEP 2: Handle Arrays
    // Check if it's an array BEFORE handling objects (arrays are also objects)
    if (Array.isArray(value)) {
        // Create a new empty array, then recursively clone each element
        return value.map(item => deepClone(item));
    }

    // STEP 3: Handle plain Objects
    // Create a new empty object, then recursively clone each property
    const clonedObj = {};
    for (const key in value) {
        if (value.hasOwnProperty(key)) {
            // Recursively clone the value of each key
            // This handles nested objects and arrays inside objects
            clonedObj[key] = deepClone(value[key]);
        }
    }
    return clonedObj;
}

// Test deepClone
console.log("=== DEEP CLONE ===");

const original = {
    name: "Alice",
    scores: [1, 2, 3],
    address: {
        city: "Hyderabad",
        pin: { code: 500001 }   // deeply nested
    }
};

const clone = deepClone(original);

console.log("Are objects same?", original === clone);                             // false ✓
console.log("Are nested objects same?", original.address === clone.address);      // false ✓
console.log("Are arrays same?", original.scores === clone.scores);                // false ✓
console.log("Are deeply nested same?", original.address.pin === clone.address.pin); // false ✓

// Prove mutation doesn't affect original
clone.scores.push(99);
clone.address.city = "Mumbai";
console.log("Original scores:", original.scores);       // [1, 2, 3] - unchanged ✓
console.log("Original city:", original.address.city);   // "Hyderabad" - unchanged ✓
console.log("Clone scores:", clone.scores);             // [1, 2, 3, 99] ✓
console.log("Clone city:", clone.address.city);         // "Mumbai" ✓


// problem 7 freeze vs seal
// examples by using Object.freeze() and Object.seal() to demonstrate the differences between them. Show how freeze prevents any modifications, while seal allows modifications to existing properties but prevents adding or removing properties.
//test the modifications and additions/removals on both frozen and sealed objects, and log the results to the console.

console.log("=== OBJECT.FREEZE() ===");
// Object.freeze() → FULLY LOCKED - cannot add, remove, OR modify properties

const frozenUser = Object.freeze({ name: "Alice", age: 25 });

// Try to MODIFY existing property → silently fails (no error in non-strict mode)
frozenUser.name = "Bob";
console.log("After modify name:", frozenUser.name);       // "Alice" (unchanged ✓)

// Try to ADD new property → silently fails
frozenUser.city = "Hyderabad";
console.log("After add city:", frozenUser.city);          // undefined (not added ✓)

// Try to DELETE property → silently fails
delete frozenUser.age;
console.log("After delete age:", frozenUser.age);         // 25 (not deleted ✓)

// Check if frozen
console.log("Is frozen?", Object.isFrozen(frozenUser));   // true ✓

// -----------------------------------------------

console.log("\n=== OBJECT.SEAL() ===");
// Object.seal() → PARTIALLY LOCKED - can modify existing, but cannot add or remove

const sealedUser = Object.seal({ name: "Alice", age: 25 });

// Try to MODIFY existing property → WORKS! (seal allows this)
sealedUser.name = "Bob";
console.log("After modify name:", sealedUser.name);       // "Bob" (changed ✓)

// Try to ADD new property → silently fails
sealedUser.city = "Hyderabad";
console.log("After add city:", sealedUser.city);          // undefined (not added ✓)

// Try to DELETE property → silently fails
delete sealedUser.age;
console.log("After delete age:", sealedUser.age);         // 25 (not deleted ✓)

// Check if sealed
console.log("Is sealed?", Object.isSealed(sealedUser));   // true ✓

// -----------------------------------------------

console.log("\n=== COMPARISON TABLE ===");
console.log("Action               | freeze() | seal()");
console.log("---------------------|----------|-------");
console.log("Modify existing prop |    ✗     |   ✓  ");
console.log("Add new property     |    ✗     |   ✗  ");
console.log("Delete property      |    ✗     |   ✗  ");
console.log("Read properties      |    ✓     |   ✓  ");

// challenge 
//consider
const state = {
  user: {
    name: "A",
    address: {
      city: "Hyderabad"
    }
  }
};
//change only city ->banagalore  without mutating the original state object. Use object spread operator and nested destructuring to achieve this.

//in React style approch

const updatedState = {
  ...state,
  user: {
    ...state.user,
    address: {
      ...state.user.address,
      city: "Bangalore"
    }
  }
};

console.log("Original State:", state);// Output: { user: { name: "A", address: { city: "Hyderabad" } } }
console.log("Updated State:", updatedState);// Output: { user: { name: "A", address: { city: "Bangalore" } } }

// why every speread is necessary?
// Each spread is necessary to create a new object at each level of the nested structure. If we only spread the top-level object, the nested objects would still reference the original objects, leading to mutation of the original state. By spreading each level, we ensure that we create new copies of each nested object, allowing us to safely update the city without affecting the original state.
