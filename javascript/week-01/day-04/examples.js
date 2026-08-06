const grandparent = {
  familyName: "Smith",
  sayHello() {
    return `Hello from the ${this.familyName} family!`
  }
}

const parent = Object.create(grandparent)
parent.job = "Engineer"

const child = Object.create(parent)
child.name = "Alice"

// Property lookup in action:
console.log(child.name)        // "Alice" (found on child)
console.log(child.job)         // "Engineer" (found on parent)
console.log(child.familyName)  // "Smith" (found on grandparent)
console.log(child.sayHello())  // "Hello from the Smith family!"
console.log(child.age)         // undefined (not found anywhere)

// Visualizing the chain
console.log(Object.getPrototypeOf(child) === parent)       // true
console.log(Object.getPrototypeOf(parent) === grandparent) // true
console.log(Object.getPrototypeOf(grandparent) === Object.prototype) // true
console.log(Object.getPrototypeOf(Object.prototype))       // null


// prperty shadowing

const prototype = {
  greeting: "Hello",
  count: 0
}

const obj = Object.create(prototype)

// Reading — uses prototype's value
console.log(obj.greeting)  // "Hello" (from prototype)
console.log(obj.count)     // 0 (from prototype)

// Writing — creates property on obj, "shadows" the prototype's
obj.greeting = "Hi"
obj.count = 5

console.log(obj.greeting)        // "Hi" (own property)
console.log(prototype.greeting)  // "Hello" (unchanged!)

console.log(obj.count)           // 5 (own property)
console.log(prototype.count)     // 0 (unchanged!)

// Check what's "own" vs inherited
console.log(obj.hasOwnProperty("greeting"))  // true (it's on obj now)
console.log(obj.hasOwnProperty("count"))     // true

