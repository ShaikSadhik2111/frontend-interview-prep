const person = {
  name: "Sadhik",
  greet() {
    return function () {
      console.log(this.name);
    };
  },
};

person.greet()();

//op: undefined

// Why does it behave that way? -> 
// The inner function has its own 'this' context, which defaults to the global object (or undefined in strict mode).
// How would you fix it using bind()? -> bind the inner function to 'this'
// Example: return function () { console.log(this.name); }.bind(this);
// How would you fix it using an arrow function? -> use an arrow function for the inner function
// Example: return () => { console.log(this.name); };
// Which solution would you prefer in a React codebase, and why? -> I would prefer using an arrow function in a React codebase because it is more concise and avoids the need for explicit binding,
//  making the code cleaner and easier to read. 
// Arrow functions also automatically inherit the 'this' context from their enclosing scope, which aligns well with React's component structure.