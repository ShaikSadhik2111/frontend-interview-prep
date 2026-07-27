//own example on lexical this

// Lexical 'this' - Arrow functions inherit 'this' from their enclosing scope

const person = {
  name: 'Alice',
  age: 30,
  
  // Regular function - 'this' is dynamic (depends on how it's called)
  greetRegular: function() {
    console.log(`Regular: Hello, I'm ${this.name}`);
  },
  
  // Arrow function - 'this' is lexically bound (inherits from parent scope)
  greetArrow: () => {
    console.log(`Arrow: Hello, I'm ${this.name}`);
  },
  
  // Arrow function inside object method
  delayedGreeting: function() {
    setTimeout(() => {
      console.log(`Delayed: Hello from ${this.name}`);
    }, 1000);
  },
  
  // Compare: Regular function inside setTimeout loses 'this'
  delayedGreetingRegular: function() {
    setTimeout(function() {
      console.log(`Delayed Regular: Hello from ${this.name}`);
    }, 1000);
  }
};

// Test cases
person.greetRegular();           // Output: "Regular: Hello, I'm Alice"
person.greetArrow();             // Output: "Arrow: Hello, I'm undefined" (arrow inherits global 'this')
person.delayedGreeting();        // Output: "Delayed: Hello from Alice" (arrow preserves 'this')
person.delayedGreetingRegular(); // Output: "Delayed Regular: Hello from undefined" (regular function loses 'this')

// Arrow function example in class/constructor pattern
class Calculator {
  value = 0;
  
  constructor(initialValue) {
    this.value = initialValue;
  }
  
  // Arrow function preserves 'this' reference
  addArrow = (num) => {
    this.value += num;
    return this.value;
  }
  
  // Regular method
  addRegular(num) {
    this.value += num;
    return this.value;
  }
}

const calc = new Calculator(10);
const addArrowCopy = calc.addArrow;
const addRegularCopy = calc.addRegular;

console.log(addArrowCopy(5));      // Works: 15 (arrow has bound 'this')
console.log(addRegularCopy(5));    // Undefined (regular function loses 'this')
