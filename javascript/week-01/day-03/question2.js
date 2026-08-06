// const person = {

// name: "Sadhik",

// greet() {

// console.log(this.name);

// }

// }

// const fn = person.greet;

// fn();

//predict op: undefined
// why? The output is `undefined` because when you assign `person.greet` to the variable `fn`, you are not calling it as a method of the `person` object anymore. Instead,
//  `fn` is just a reference to the function itself, and when it is called, the value of `this` inside the function is determined by how the function is called. In this case, 
// it is called as a regular function, not as a method of an object,
//  so `this` is `undefined` in strict mode or the global object in non-strict mode.

//correction
//correction

// question 3 covered here 
const person = {
    name: "Sadhik",
    greet() {
        console.log(this.name);
    }
};

const fn = person.greet;
const boundGreet = fn.bind(person);  
boundGreet();