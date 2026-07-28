// Prototype Chain Implementation

// 1. Creating a constructor function
function Animal(name) {
  this.name = name;
}

// Adding methods to Animal's prototype
Animal.prototype.speak = function() {
  console.log(`${this.name} makes a sound`);
};

Animal.prototype.eat = function() {
  console.log(`${this.name} is eating`);
};

// 2. Creating another constructor function that inherits from Animal
function Dog(name, breed) {
  // Call parent constructor
  Animal.call(this, name);
  this.breed = breed;
}

// Setting up the prototype chain: Dog.prototype inherits from Animal.prototype
Dog.prototype = Object.create(Animal.prototype);
Dog.prototype.constructor = Dog;

// Adding Dog-specific methods
Dog.prototype.bark = function() {
  console.log(`${this.name} barks: Woof! Woof!`);
};

// Override the speak method
Dog.prototype.speak = function() {
  console.log(`${this.name} barks`);
};

// 3. Creating another constructor function that inherits from Dog
function GoldenRetriever(name, breed, color) {
  Dog.call(this, name, breed);
  this.color = color;
}

// Setting up prototype chain: GoldenRetriever inherits from Dog
GoldenRetriever.prototype = Object.create(Dog.prototype);
GoldenRetriever.prototype.constructor = GoldenRetriever;

// Adding GoldenRetriever-specific methods
GoldenRetriever.prototype.fetch = function() {
  console.log(`${this.name} fetches the ball happily`);
};

// Testing the prototype chain
console.log('=== Prototype Chain Demonstration ===\n');

const animal = new Animal('Generic Animal');
const dog = new Dog('Buddy', 'Labrador');
const goldenRetriever = new GoldenRetriever('Max', 'Golden Retriever', 'Golden');

// Test Animal
console.log('Animal Instance:');
animal.speak(); // Generic Animal makes a sound
animal.eat();   // Generic Animal is eating
console.log();

// Test Dog
console.log('Dog Instance:');
dog.speak();    // Buddy barks (overridden method)
dog.bark();     // Buddy barks: Woof! Woof!
dog.eat();      // Buddy is eating (inherited from Animal)
console.log();

// Test GoldenRetriever
console.log('GoldenRetriever Instance:');
goldenRetriever.speak();  // Max barks (inherited from Dog)
goldenRetriever.bark();   // Max barks: Woof! Woof! (inherited from Dog)
goldenRetriever.fetch();  // Max fetches the ball happily (own method)
goldenRetriever.eat();    // Max is eating (inherited from Animal)
console.log();

// Demonstrating the prototype chain
console.log('=== Prototype Chain Structure ===\n');
console.log('dog instanceof Dog:', dog instanceof Dog);              // true
console.log('dog instanceof Animal:', dog instanceof Animal);        // true
console.log('dog instanceof Object:', dog instanceof Object);        // true
console.log();

console.log('goldenRetriever instanceof GoldenRetriever:', goldenRetriever instanceof GoldenRetriever);  // true
console.log('goldenRetriever instanceof Dog:', goldenRetriever instanceof Dog);                          // true
console.log('goldenRetriever instanceof Animal:', goldenRetriever instanceof Animal);                    // true
console.log('goldenRetriever instanceof Object:', goldenRetriever instanceof Object);                    // true
console.log();

// Checking property ownership
console.log('=== Property Ownership ===\n');
console.log('dog.hasOwnProperty("name"):', dog.hasOwnProperty('name'));        // true
console.log('dog.hasOwnProperty("speak"):', dog.hasOwnProperty('speak'));      // false (in prototype)
console.log('"speak" in dog:', 'speak' in dog);                                // true (in prototype chain)
