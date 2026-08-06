# JavaScript Prototype Interview Questions

## 1. What is Prototype?

A prototype is an object that contains shared properties and methods. Every function in JavaScript has a `prototype` property that points to an object. When you create instances, they inherit from this prototype object.

```javascript
function Car(name) {
  this.name = name;
}
Car.prototype.drive = function() {
  return this.name + " is driving";
};
```

---

## 2. Why do we need Prototype?

- **Memory efficiency**: Methods are stored once on the prototype, not duplicated for each instance
- **Code reusability**: Share common methods across multiple objects
- **Easy maintenance**: Update a method in one place affects all instances

```javascript
const car1 = new Car("Tesla");
const car2 = new Car("BMW");
// Both share the drive method from prototype
```

---

## 3. What is Prototype Chain?

The prototype chain is a series of connections between objects. When you access a property, JavaScript looks for it:
1. In the object itself
2. In the object's prototype
3. In the prototype's prototype
4. Until it reaches `null`

```javascript
const obj = {};
obj.toString(); // Found in Object.prototype
```

---

## 4. Difference between `prototype` vs `__proto__`

| prototype | __proto__ |
|-----------|-----------|
| Property of **functions** | Property of **objects/instances** |
| Used to define inherited properties | Points to the constructor's prototype |
| Static property | Dynamic reference |

```javascript
function User() {}
User.prototype.name = "John"; // prototype property
const user = new User();
console.log(user.__proto__ === User.prototype); // true
```

---

## 5. What is Object.create()?

`Object.create()` creates a new object with a specified prototype object. It's useful for explicit prototype inheritance.

```javascript
const parent = { greet: function() { return "Hello"; } };
const child = Object.create(parent);
console.log(child.greet()); // "Hello" - inherited from parent
```

---

## 6. What does new keyword do internally?

1. Creates a new empty object
2. Sets the object's `__proto__` to the constructor's `prototype`
3. Calls the constructor with `this` bound to the new object
4. Returns the object (if constructor doesn't return an object)

```javascript
function Person(name) {
  this.name = name;
}
const person = new Person("Alice");
// Internally: person.__proto__ = Person.prototype
```

---

## 7. How does inheritance work?

Inheritance works through the prototype chain. A child object inherits properties from its parent prototype.

```javascript
function Animal(name) { this.name = name; }
Animal.prototype.sound = function() { return "noise"; };

function Dog(name) { Animal.call(this, name); }
Dog.prototype = Object.create(Animal.prototype);
Dog.prototype.constructor = Dog;

const dog = new Dog("Rex");
console.log(dog.sound()); // "noise"
```

---

## 8. Why does toString() work?

`toString()` works because it's defined in `Object.prototype`. Every object inherits from `Object.prototype` through the prototype chain, so all objects have access to `toString()`.

```javascript
const num = 42;
console.log(num.toString()); // "42" - inherited from Number.prototype -> Object.prototype
```

---

## 9. Why is JavaScript called prototype-based language?

JavaScript uses prototypes for inheritance instead of classical class inheritance (though ES6 classes are syntactic sugar). Objects inherit directly from other objects through their prototypes.

```javascript
const parent = { x: 1 };
const child = Object.create(parent);
console.log(child.x); // 1 - inherited from prototype
```

---

## 10. Difference between ES6 Classes and Constructor Functions?

| ES6 Classes | Constructor Functions |
|-------------|----------------------|
| Syntactic sugar over prototypes | Direct prototype manipulation |
| `constructor()` method | Function acts as constructor |
| `super()` for inheritance | `.call()` for inheritance |
| Methods non-enumerable by default | Methods enumerable on prototype |
| More readable and familiar syntax | More verbose |

```javascript
// ES6 Class
class Car { constructor(name) { this.name = name; } }

// Constructor Function
function Car(name) { this.name = name; }
```