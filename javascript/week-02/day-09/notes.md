<!-- object fundamentals -->

what is a object?
An object is an dynamic data structure taht stores the value as key value pairs, wher eeach key uniquely identifies its value.

- the value sof properties can be primitive , objects, or functions also known as methods when defined inside a object

- objects are mutable and dynamic properties can be added, modified and deleted at any time.

- object allows data grouoing and encapsulation , making it easier to manage related infirmaion and behaviour together



<!-- Objects methods -->
Object methods are static functions on JS buit in object constructor that let you inspect, manipulate and transform object.
unlike instance methods you call on object itself like toSTring(), these are called an object directly with target object passed as an argument.

according to mdn , th eobject const provides 30 static methods, with new ones like 
object .groupBT() added restenlt as ES2024.


const product = { name: 'Laptop', price: 999 }

// Static method: called on Object
Object.keys(product)  // ['name', 'price']

// Instance method: called on the object
product.toString()    // '[object Object]'

ex:

Think of Object as a toolbox sitting next to your workbench. You don’t modify the toolbox itself. You reach into it, grab a tool, and use it on whatever object you’re working with.

The tool box analogy:

┌─────────────────────────────────────────────────────────────────────────┐
│                        THE OBJECT TOOLBOX                                │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                          │
│   YOUR OBJECT (Filing Cabinet)          THE TOOLS (Object.*)             │
│   ┌─────────────────────┐               ┌────────────────────────────┐   │
│   │ name: "Alice"       │               │ keys()     → list labels   │   │
│   │ age: 30             │    ────►      │ values()   → list contents │   │
│   │ city: "NYC"         │               │ entries()  → list both     │   │
│   └─────────────────────┘               │ assign()   → copy/merge    │   │
│                                         │ hasOwn()   → check exists  │   │
│                                         │ groupBy()  → organize      │   │
│                                         └────────────────────────────┘   │
│                                                                          │
│   You don't modify the toolbox. You use the tools ON your object.        │
│                                                                          │
└─────────────────────────────────────────────────────────────────────────┘

iteration methods:

thes three methods converts an object into array you can loop over or transform,

1 objcet.keys()

- return s an array of objects own ennumerable property names.

what is ennumerable?
In JavaScript, an enumerable property is an object property that will show up when you loop over the object using a for...in loop or when you fetch its keys using methods like Object.keys().

Every property in JavaScript has an internal enumerable flag. If this flag is set to true, the property is visible to iteration loops; if it is set to false, the property is hidden from those loops.

code:

const user ={ name: "sadhik", age: 35, city: 'hyd}
const keys = Object.keys(user)
console.log(keys) // [name, age, city]

2 Object.values()

- returns an array of objects own enumerable property values.

code:
const user ={ name: 'sadhik', age: 35, city: 'hyd'}
const keys = Object.values(user)
console.log(keys) // ["sadhik", 35, 'hyd'']

//sum all numeric values
const scores = {
    math:95,
    science:88,
    history:92
}
const total = object.values(scores).reduce((sum, score) => sum + score, 0)
console.log(total) //op:275

3 Object.entries()

returns an array of [key, value] pairs.
this is more versatile of the three.

const user = { name: 'Alice', age: 30, city: 'NYC' }

const entries = Object.entries(user)
console.log(entries)
// [['name', 'Alice'], ['age', 30], ['city', 'NYC']]

// Destructure in a loop
for (const [key, value] of Object.entries(user)) {
  console.log(`${key}: ${value}`)
}
// name: Alice
// age: 30
// city: NYC

quick comparison,

Method	Returns	Use When
Object.keys(obj)	['key1', 'key2', ...]	You only need the property names
Object.values(obj)	[value1, value2, ...]	You only need the values
Object.entries(obj)	[['key1', value1], ...]	You need both keys and values


<!-- Objetcs with fromEntries() -->

Object.fromEntries() is the inverse of object.entries() , it takes an ierable of [key, value] pairs and build an object.

const entries = [['name', 'Alice'], ['age', 30]]
const user = Object.fromEntries(entries)
console.log(user)  // { name: 'Alice', age: 30 }


the rreal power come from combining entries() and fromEntries() with array methods like map() and filter()

Trasform object keys,

code:

const user = { name: 'Alice', age: 30, city: 'NYC' }

// Convert all keys to uppercase
const upperCased = Object.fromEntries(
  Object.entries(user).map(([key, value]) => [key.toUpperCase(), value])
)
console.log(upperCased)  // { NAME: 'Alice', AGE: 30, CITY: 'NYC' }

filter object properties,

const product = { name: 'Laptop', price: 999, inStock: true, sku: 'LP001' }

// Keep only string values
const stringsOnly = Object.fromEntries(
  Object.entries(product).filter(([key, value]) => typeof value === 'string')
)
console.log(stringsOnly)  // { name: 'Laptop', sku: 'LP001' }

Convert a Map to an Object

const map = new Map([
  ['name', 'Alice'],
  ['role', 'Admin']
])

const obj = Object.fromEntries(map)
console.log(obj)  // { name: 'Alice', role: 'Admin' }

NOte:

connection,

Object
   ↓
Object.entries()
   ↓
Array of [key, value]
   ↓
transform
   ↓
Object.fromEntries()
   ↓
Object

<!-- object assign -->

Cloning and merging objects,

note: js objects are assigned by reference , when you need a separate copy, you have several options.

Object.assign() copies all enumerable own properties from source object to target object.

code:

const target = { a: 1 }
const source = { b: 2 }

Object.assign(target, source)
console.log(target)  // { a: 1, b: 2 }

for cloning use empty object as traget,

const original = {
    name: "sadhik",
    age:25
}

const clone = Object.assign({}, original)

clone.name = 'Bob'
console.log(original.name) //"sadhik" - original unchanges

Merge multiple objects:
const defaults = { theme: 'light', fontSize: 14 }
const userPrefs = { theme: 'dark' }

const settings = Object.assign({}, defaults, userPrefs) // here performs a shallow copy when used like this 
console.log(settings)  // { theme: 'dark', fontSize: 14 }

NOte:
<!-- shalloe copy means - it is an duplicate of an object or collection only the top level structure is newly created, while any nested objects or
inner reference are shatred with the original -->

const original = { 
  name: 'Alice', 
  address: { city: 'NYC' } 
}

const clone = Object.assign({}, original)
clone.address.city = 'LA'

console.log(original.address.city)  // 'LA' — both changed!

<!-- referenc vs value -->

note: need to know reference vs value before shallow/deep copy

FOr primitive:
let a = 10;
let b = a;
b = 20;
console.log(a) //op: 10

Here the value is copied.

coming to object,

const user1 = {
    name: 'sadhik'
};

const user2 =  user1;
user2.name = 'shaik';
console.log(user1.name); //op: 'shaik'

//beacause the both variables refer to the same object

user1 ─────┐
           ▼
        Object
           ▲
           │
user2 ─────┘

Note:L basic fundamental  in react.

<!-- shallow copy -->

refere above once .

const user = {
    name: "A",
    address: {
        city: "HYD"
    }
};

const copy = {
    ...user
}
//the top level object is copied
but:
still -> copy.address === user.address this will be true.

because still the nested object is still shared.

rough diagram:

copy ────────→ new object
                 │
                 │ address
                 ▼
              address
                 ▲
                 │
user ─────────→ original object

clean way:

user.address ─────┐
                  ▼
              same nested object
                  ▲
                  │
copy.address ─────┘

<!-- deep copy -->

Deep copy creates independent copies of nested objects too.

structuredClone() creates a true deep copy, including nested objects, it was added to browswers node.js in 2022, as web dev team 
documented, structuredCLone() replaced the common JSON.parse(JSON.stringify(obj)) that failed date, ,map, set, regexp and circular references.

const original = {
    name: 'sadhik,
    address: { city: 'HYD' }
}

const clone = structuredClone(original)
clone.address.city = 'LA'

console.log(original.address.city) // 'HYD' - see original unchanged

also handles:

circular references
MOst built in types (Date, MAp, Set, ArrayBuffer, etc.)

const data = {
  date: new Date('2024-01-01'),
  items: new Set([1, 2, 3])
}

const clone = structuredClone(data)
console.log(clone.date instanceof Date)  // true
console.log(clone.items instanceof Set)  // true


Note:

structuredCLone() which cannot clone 

Functions
DOM nodes
Property descriptors (getters/setters become plain values)
Prototype chain (you get plain objects)


const obj = { 
  greet: () => 'Hello'  // Function
}

structuredClone(obj)  // Throws: DataCloneError



Shallow vs Deep: When to Use Each
Method	Depth	Speed	Use When
Object.assign()	Shallow	Fast	Merging objects, no nested objects
Spread {...obj}	Shallow	Fast	Quick clone, no nested objects
structuredClone()	Deep	Slower	Nested objects that must be independent


<!-- object.freeze() -->
 Complete Immutability

Object.freeze() makes an object completely immutable by setting writable: false and configurable: false on all properties:


const CONSTANTS = {
  PI: 3.14159,
  E: 2.71828,
  GOLDEN_RATIO: 1.61803
}

Object.freeze(CONSTANTS)

// Can't modify
CONSTANTS.PI = 3  // Silently fails
console.log(CONSTANTS.PI)  // 3.14159

// Can't add
CONSTANTS.NEW = 1  // Silently fails

// Can't delete
delete CONSTANTS.E  // Silently fails

console.log(Object.isFrozen(CONSTANTS))  // true

IN this object cannot be modify, add oe delete properties of frozen object

note: this is shallow

ex:

const user = {
    name: 'A'
};

object.freeze(user);
//now now modifications or add or delete

trap:
 
 const user = {
    age: 25,
    address: {
        city: 'HYD'
    }
 }

 Object.freeze(user) 

 but note:

 Tis still be neste dobject i modified user.address.city = "BAngalore" but outer objects are frozen.

 <!-- Object.seal -->

no add/deleteonly modification allowed

- it prevents adding or deleeting the properties by setting configurable : false on all existing properies.

according to MDN that sealed objects rae in eif the mostr commom patterns for creating confuguration objects
taht sshould not have ther structure modified at run time;


const config = { debug: true, version: 1 }

Object.seal(config)

// Can modify values
config.debug = false
console.log(config.debug)  // false

// Can't add properties
config.newProp = "test"  // Silently fails
console.log(config.newProp)  // undefined

// Can't delete properties
delete config.version  // Silently fails
console.log(config.version)  // 1

console.log(Object.isSealed(config))  // true

<!-- object.create -->
<!-- note:  connected to day 4 topic -->

Object.create() it creates new object with a specified prototype:

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
console.log(Object.getPrototypeOf(cat) === animalProto)  // true

another example:

const personMethods = {
  greet() {
    console.log("Hello");
  }
};

const person = Object.create(personMethods);

person.greet()//op: hello

works through prototype chain.

person
   │
   ▼
personMethods
   │
   ▼
Object.prototype
   │
   ▼
null


with no prototype;

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

with property descriptors;

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

NOte:

how new operator - create from cosntructor

 The new Operator — Create from Constructor
The new operator creates an object from a constructor function. When you call new Constructor(args), JavaScript performs 4 steps:
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

<!-- Object.hasOwn() -->
 
 safe property checking.

 - checks if an object has a property as its own(not inherited)
 - repalcement for hasOwnProperty() - introducted in ES2022
 - MDN recommands usinh Object.hasOwn() over Object.prototype.hasOwnProperty() in all new code beacuse it works correctly
  with null-prototype objects and cannoit be overridden.


  const user = { name: 'Alice', age: 30 }

console.log(Object.hasOwn(user, 'name'))      // true
console.log(Object.hasOwn(user, 'toString'))  // false (inherited)
console.log(Object.hasOwn(user, 'email'))     // false (doesn't exist)

why not hasOwnProperty() ?

Object.hasOwn() is safer in 2 scenarious

1 object with Null proptotype


const nullProto = Object.create(null)
nullProto.id = 1

// hasOwnProperty doesn't exist on null-prototype objects!
nullProto.hasOwnProperty('id')  // TypeError!

// Object.hasOwn works fine
Object.hasOwn(nullProto, 'id')  // true

2 objects that ovverride hasOwnProperty

const sneaky = {
  hasOwnProperty: () => false  // Someone overrode it!
}

sneaky.hasOwnProperty('hasOwnProperty')  // false (wrong!)
Object.hasOwn(sneaky, 'hasOwnProperty')  // true (correct!)

<!-- spread operator -->
//what is spread operator? 
// The spread operator (...) is a syntax in JavaScript that allows an iterable (like an array or object) to be expanded in places where zero or more arguments (for function calls) or elements (for array literals) are expected. In the context of objects, it creates a shallow copy of the object, allowing you to merge properties or create new objects with modified values without mutating the original object.