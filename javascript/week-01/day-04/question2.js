// Create a prototype chain: Vehicle -> Car -> BMW using Object.create()

// Base object: Vehicle
const Vehicle = {
  type: 'Vehicle',
  start() {
    return `${this.type} started`;
  },
  stop() {
    return `${this.type} stopped`;
  }
};

// Car inherits from Vehicle
const Car = Object.create(Vehicle);
Car.type = 'Car';
Car.drive = function() {
  return `${this.type} is driving`;
};

// BMW inherits from Car
const BMW = Object.create(Car);
BMW.type = 'BMW';
BMW.honk = function() {
  return `${this.type} is honking`;
};

// Test the prototype chain
console.log(BMW.start()); // Output: BMW started
console.log(BMW.drive()); // Output: BMW is driving
console.log(BMW.honk()); // Output: BMW is honking
console.log(BMW.stop()); // Output: BMW stopped

// Verify the prototype chain
console.log(Object.getPrototypeOf(BMW) === Car); // true
console.log(Object.getPrototypeOf(Car) === Vehicle); // true
