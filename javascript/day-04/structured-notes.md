# OBJECTS

## Introduction

```javascript
const person = {
  name: "Sadhik",
  age: 26
};

person.toString() // How does JS know this method?
```

We never created `toString()` ourselves, so the answer is **prototype**.

---

## Prototype Chain

**Definition:** Every JS object has an internal link to another object called its **prototype**.

### Prototype Chain Lookup

When JS can't find a property, it looks inside the prototype:

```
person
  ↓
Prototype
  ↓
Object Prototype
  ↓
null
```

### Example

```javascript
const person = {
  name: "sadhik"
}

console.log(person.toString()) // works!
```

**Why it works:**
```
person
  ↓
Object.prototype
  ↓
toString()
```

### Prototype Chain Search

```javascript
const animal = {
  eats: true
}
const dog = Object.create(animal)
dog.name = "rocky"
console.log(dog.eats) // true
```

**Chain:**
```
dog
  ↓
animal
  ↓
Object.prototype
  ↓
null
```

---

## Constructor Functions

Before ES6 classes, we used constructor functions:

```javascript
function Person(name) {
  this.name = name
}

const p1 = new Person("sadhik")
```

---

## The `new` Keyword

When we write `const p = new Person("sadhik")`:

**Steps:**
1. Create empty object `{}`
2. Link prototype: `obj.__proto__` → `Person.prototype`
3. Execute: `Person.call(obj)`
4. Return object

---

## Prototype vs `__proto__`

**Confusing:** These are different!

- **`prototype`** belongs to **function**
  ```javascript
  function Person() {}
  Person.prototype // exists
  ```

- **`__proto__`** belongs to **object**
  ```javascript
  const person = {}
  person.__proto__ // exists
  ```

**Relationship:**
```
person.__proto__ === Person.prototype
```

---

## Object.create()

Create objects with a specific prototype:

```javascript
const animal = {
  eats: true
}

const dog = Object.create(animal)
dog.name = "rocky"
console.log(dog.eats) // true
```

---

## hasOwnProperty()

Check if property belongs to object itself (not inherited):

```javascript
const person = {
  name: "Sadhik"
}

console.log(person.hasOwnProperty("name"))      // true
console.log(person.hasOwnProperty("toString"))  // false (inherited)
```

**Note:** `toString` belongs to `Object.prototype`

---

## Ways to Create Objects in JS

**Object** = standalone data structure storing key-value pairs

<!-- hasOwnProperty() -->
const person = {

    name: "Sadhik"

};

console.log(

person.hasOwnProperty("name")

);

console.log(

person.hasOwnProperty("toString")

);
//op: true 
//op: false

reason:

toString

belongs to

Object.prototype

ways to create objs in js,
note: object means standalne data structure that stores collection data as keyvalue pairs.
1. object literals.
   The simplest way. Great for one-off objects:
// Object literal — prototype is automatically Object.prototype
const player = {
  name: "Alice",
  health: 100,
  attack() {
    return `${this.name} attacks!`
  }
}

console.log(Object.getPrototypeOf(player) === Object.prototype)  // true

2. already did above object.create()
   created a new object with a specific proto type

   // Create a prototype object
const animalProto = {
  speak() {
    return `${this.name} makes a sound.`
  },
  eat(food) {
    return `${this.name} eats ${food}.`
  }
}

// Create objects that inherit from animalProto
const dog = Object.create(animalProto)
dog.name = "Rex"
dog.breed = "German Shepherd"

const cat = Object.create(animalProto)
cat.name = "Whiskers"
cat.color = "orange"

console.log(dog.speak())  // "Rex makes a sound."
console.log(cat.eat("fish"))  // "Whiskers eats fish."

// Both share the same prototype
console.log(Object.getPrototypeOf(dog) === animalProto)  // true
console.log(Object.getPrototypeOf(cat) === animalProto)  // trues


<!-- creating objects with no proto type -->

pass null to create an object with no prototype, useful for dictionaries,

// Regular object inherits from Object.prototype
const regular = {}
console.log(regular.toString)  // [Function: toString]
console.log("toString" in regular)  // true

// Object with null prototype — truly empty
const dict = Object.create(null)
console.log(dict.toString)  // undefined
console.log("toString" in dict)  // false

// Useful for safe dictionaries (no inherited properties to collide with)
dict["hasOwnProperty"] = "I can use any key!"
console.log(dict["hasOwnProperty"])  // "I can use any key!"

// With regular object, this would shadow the method:
const risky = {}
risky["hasOwnProperty"] = "oops"
// risky.hasOwnProperty("x") would now throw an error!

with descriptors,

const person = Object.create(Object.prototype, {
  name: {
    value: "Alice",
    writable: true,
    enumerable: true,
    configurable: true
  },
  age: {
    value: 30,
    writable: false,  // Can't change age
    enumerable: true,
    configurable: false
  },
  secret: {
    value: "hidden",
    enumerable: false  // Won't show in for...in or Object.keys()
  }
})

console.log(person.name)  // "Alice"
console.log(person.age)   // 30
person.age = 25           // Silently fails (or throws in strict mode)
console.log(person.age)   // Still 30

console.log(Object.keys(person))  // ["name", "age"] (no "secret")


3. the new operator create from constructor

this creates  an object from a constructoe function

When you call new Constructor(args), JavaScript performs 4 steps:
1
Create a new empty object

JavaScript creates a fresh object: const obj = {}
2
Link the prototype

Sets obj’s [[Prototype]] to Constructor.prototype (if it’s an object). If Constructor.prototype is not an object (e.g., a primitive), the new object uses Object.prototype instead.
3
Execute the constructor

Runs the constructor with this bound to the new object
4
Return the object

Returns obj (unless the constructor explicitly returns a non-primitive value)

// A constructor function
function Player(name, health) {
  // Step 3: 'this' is bound to the new object
  this.name = name
  this.health = health
}

// Methods go on the prototype (shared by all instances)
Player.prototype.attack = function() {
  return `${this.name} attacks!`
}

// Create instance with 'new'
const alice = new Player("Alice", 100)

console.log(alice.name)    // "Alice"
console.log(alice.attack())  // "Alice attacks!"
console.log(alice instanceof Player)  // true
console.log(Object.getPrototypeOf(alice) === Player.prototype)  // true

flow:

┌─────────────────────────────────────────────────────────────────────────┐
│               WHAT new Player("Alice", 100) DOES                         │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                          │
│  Step 1: Create a new empty object                                       │
│          const obj = {}                                                  │
│                                                                          │
│  Step 2: Link the object's prototype to Constructor.prototype            │
│          Object.setPrototypeOf(obj, Player.prototype)                    │
│                                                                          │
│  Step 3: Run the constructor with 'this' bound to the new object         │
│          Player.call(obj, "Alice", 100)                                  │
│          // Now obj.name = "Alice", obj.health = 100                     │
│                                                                          │
│  Step 4: Return the object (unless constructor returns an object)        │
│          return obj                                                      │
│                                                                          │
│  ─────────────────────────────────────────────────────────────────────   │
│                                                                          │
│  RESULT:                                                                 │
│                                                                          │
│     Player.prototype                                                     │
│     ┌─────────────────────┐                                              │
│     │ attack: function()  │◄───── Shared by all instances                │
│     │ constructor: Player │                                              │
│     └─────────────────────┘                                              │
│              ▲                                                           │
│              │ [[Prototype]]                                             │
│              │                                                           │
│     ┌────────┴────────┐                                                  │
│     │      alice      │                                                  │
│     │─────────────────│                                                  │
│     │ name: "Alice"   │                                                  │
│     │ health: 100     │                                                  │
│     └─────────────────┘                                                  │
│                                                                          │
└─────────────────────────────────────────────────────────────────────────┘

simulating new;

function myNew(Constructor, ...args) {
  // Steps 1 & 2: Create object with correct prototype
  const obj = Object.create(Constructor.prototype)
  
  // Step 3: Run constructor with 'this' = obj
  const result = Constructor.apply(obj, args)
  
  // Step 4: Return result if it's a non-primitive, otherwise return obj
  // Note: Functions are also objects, so constructors returning functions
  // will override the default return as well
  return (result !== null && typeof result === 'object') ? result : obj
}

// These do the same thing:
const player1 = new Player("Alice", 100)
const player2 = myNew(Player, "Bob", 100)

console.log(player1 instanceof Player)  // true
console.log(player2 instanceof Player)  // true

4. object.assign() - copy properties

copies enuremable own properties from source objects to a target.


// Basic usage: copy properties to target
const target = { a: 1 }
const source = { b: 2, c: 3 }

const result = Object.assign(target, source)

console.log(result)  // { a: 1, b: 2, c: 3 }
console.log(target)  // { a: 1, b: 2, c: 3 } — target is modified!
console.log(result === target)  // true — returns the target

merging multiple objects,

const defaults = { theme: "light", fontSize: 14, showSidebar: true }
const userPrefs = { theme: "dark", fontSize: 16 }
const sessionOverrides = { fontSize: 18 }

// Later sources overwrite earlier ones
const settings = Object.assign({}, defaults, userPrefs, sessionOverrides)

console.log(settings)
// { theme: "dark", fontSize: 18, showSidebar: true }

// Original objects are unchanged (because we used {} as target)
console.log(defaults.fontSize)  // 14

cloning objects shallow,

const original = { name: "Alice", scores: [90, 85, 92] }

// Shallow clone
const clone = Object.assign({}, original)

clone.name = "Bob"
console.log(original.name)  // "Alice" — primitive copied by value

clone.scores.push(100)
console.log(original.scores)  // [90, 85, 92, 100] — array shared!

<!--  Object.getPrototypeOf() — Read the Prototype -->
const player = { name: "Alice" }

// Get the prototype
const proto = Object.getPrototypeOf(player)
console.log(proto === Object.prototype)  // true

// Works with any object
function Game() {}
const game = new Game()
console.log(Object.getPrototypeOf(game) === Game.prototype)  // true

// End of the chain
console.log(Object.getPrototypeOf(Object.prototype))  // null

<!-- change the prototype -->
const player = { name: "Alice" }

// Get the prototype
const proto = Object.getPrototypeOf(player)
console.log(proto === Object.prototype)  // true

// Works with any object
function Game() {}
const game = new Game()
console.log(Object.getPrototypeOf(game) === Game.prototype)  // true

// End of the chain
console.log(Object.getPrototypeOf(Object.prototype))  // null

<!-- instance of check the proto type chain -->
checks if Constructor.prototype exists in the object’s prototype chain
function Animal(name) {
  this.name = name
}

function Dog(name, breed) {
  Animal.call(this, name)
  this.breed = breed
}

// Set up inheritance
Dog.prototype = Object.create(Animal.prototype)
Dog.prototype.constructor = Dog

const rex = new Dog("Rex", "German Shepherd")

console.log(rex instanceof Dog)     // true
console.log(rex instanceof Animal)  // true
console.log(rex instanceof Object)  // true
console.log(rex instanceof Array)   // false


<!-- commom proto type methos -->
1 hasOwnProperty()
2 object.keys()


Method	Own?	Enumerable?	Inherited?
obj.hasOwnProperty(key)	Yes	Both	No
key in obj	Yes	Both	Yes
Object.keys(obj)	Yes	Yes only	No
Object.getOwnPropertyNames(obj)	Yes	Both	No
for...in	Yes	Yes only	Yes