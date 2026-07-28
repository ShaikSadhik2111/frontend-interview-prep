// Constructor function for Animal - creates an animal object with name, species, and sound properties
function Animal(name, species, sound) {
    this.name = name;
    this.species = species;
    this.sound = sound;
}

// Add a method to Animal.prototype so all animal instances can use makeSound()
Animal.prototype.makeSound = function() {
    console.log(`${this.name} the ${this.species} says ${this.sound}`);
};

// Constructor function for Dog - inherits from Animal
// Uses Animal.call(this, ...) to call the parent constructor and bind 'this' to the Dog instance
function Dog(name, sound) {
    Animal.call(this, name, "Dog", sound);
}

// Set up prototype chain: Dog.prototype inherits from Animal.prototype
// This allows Dog instances to access methods defined on Animal.prototype
Dog.prototype = Object.create(Animal.prototype);

// Restore the constructor property to point back to Dog (not Animal)
Dog.prototype.constructor = Dog;

// Create a new Dog instance with name "Buddy" and sound "Woof"
const dog = new Dog("Buddy", "Woof");

// Call the inherited makeSound() method - outputs: "Buddy the Dog says Woof"
dog.makeSound();

