// problem 1 Object Methods
const user1 = { name: "A", age: 25, city: "Hyderabad" };
const keys = Object.keys(user1);
console.log("Keys:", keys);
const values = Object.values(user1);
console.log("Values:", values);
const entries = Object.entries(user1);
console.log("Entries:", entries);

// problem 2 convert object to array then to object
const user2 = { name: "A", age: 25 };
const userEntries = Object.entries(user2);
userEntries[0][1] = "B";
userEntries[1][1] = 30;
const modifiedUser = Object.fromEntries(userEntries);
console.log("Modified User:", modifiedUser);

// problem 3 shallow copy
const originalObject1 = { name: "A", nestedObject: { a: 1, b: 2 } };
const shallowCopy = Object.assign({}, originalObject1);
console.log("Original Object:", originalObject1);
console.log("Shallow Copy:", shallowCopy);
console.log("Are original and shallow copy the same object?", originalObject1 === shallowCopy); // false
console.log("Are nested objects the same?", originalObject1.nestedObject === shallowCopy.nestedObject); // true

// problem 4 deep copy
const originalObject2 = { name: "A", nestedObject: { a: 1, b: 2 } };
const deepCopy = structuredClone(originalObject2);
console.log("Original Object:", originalObject2);
console.log("Deep Copy:", deepCopy);
console.log("Are original and deep copy the same object?", originalObject2 === deepCopy); // false
console.log("Are nested objects the same?", originalObject2.nestedObject === deepCopy.nestedObject); // false
deepCopy.nestedObject.a = 42;
console.log("Original Object after modification:", originalObject2);
console.log("Deep Copy after modification:", deepCopy);

// problem 5 shallow copy without Object.assign() or spread
function shallowCopy(obj) {
  const copy = {};
  for (const key in obj) {
    if (Object.hasOwn(obj, key)) {
      copy[key] = obj[key];
    }
  }
  return copy;
}

const originalObject3 = { name: "A", age: 25 };
const copiedObject = shallowCopy(originalObject3);
console.log("Original Object:", originalObject3);
console.log("Copied Object:", copiedObject);

// problem 6 deep clone challenge
// Limitation:
// Supports primitives, arrays and plain objects.
// Does not handle circular references, Date, Map, Set,
// functions, or custom prototypes.
function deepClone(value) {
  if (value === null || typeof value !== "object") {
    return value;
  }

  if (Array.isArray(value)) {
    return value.map((item) => deepClone(item));
  }

  const clonedObj = {};
  for (const key in value) {
    if (Object.hasOwn(value, key)) {
      clonedObj[key] = deepClone(value[key]);
    }
  }
  return clonedObj;
}

console.log("=== DEEP CLONE ===");
const original = {
  name: "Alice",
  scores: [1, 2, 3],
  address: { city: "Hyderabad", pin: { code: 500001 } }
};
const clone = deepClone(original);
console.log("Are objects same?", original === clone); // false
console.log("Are nested objects same?", original.address === clone.address); // false
console.log("Are arrays same?", original.scores === clone.scores); // false
console.log("Are deeply nested same?", original.address.pin === clone.address.pin); // false
clone.scores.push(99);
clone.address.city = "Mumbai";
console.log("Original scores:", original.scores); // [1, 2, 3]
console.log("Original city:", original.address.city); // Hyderabad
console.log("Clone scores:", clone.scores); // [1, 2, 3, 99]
console.log("Clone city:", clone.address.city); // Mumbai

// problem 7 freeze vs seal
console.log("=== OBJECT.FREEZE() ===");
const frozenUser = Object.freeze({ name: "Alice", age: 25 });
frozenUser.name = "Bob";
console.log("After modify name:", frozenUser.name); // Alice
frozenUser.city = "Hyderabad";
console.log("After add city:", frozenUser.city); // undefined
delete frozenUser.age;
console.log("After delete age:", frozenUser.age); // 25
console.log("Is frozen?", Object.isFrozen(frozenUser)); // true

console.log("\n=== OBJECT.SEAL() ===");
const sealedUser = Object.seal({ name: "Alice", age: 25 });
sealedUser.name = "Bob";
console.log("After modify name:", sealedUser.name); // Bob
sealedUser.city = "Hyderabad";
console.log("After add city:", sealedUser.city); // undefined
delete sealedUser.age;
console.log("After delete age:", sealedUser.age); // 25
console.log("Is sealed?", Object.isSealed(sealedUser)); // true

console.log("\n=== COMPARISON TABLE ===");
console.log("Action               | freeze() | seal()");
console.log("---------------------|----------|-------");
console.log("Modify existing prop |    X     |   ✓  ");
console.log("Add new property     |    X     |   X  ");
console.log("Delete property      |    X     |   X  ");
console.log("Read properties      |    ✓     |   ✓  ");

// challenge: update nested state immutably
const state = {
  user: {
    name: "A",
    address: { city: "Hyderabad" }
  }
};

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

console.log("Original State:", state);
console.log("Updated State:", updatedState);

// Each spread creates a new object at the level being updated.
// Without copying each level, nested objects could still reference
// the original state and a later mutation could affect the original.
