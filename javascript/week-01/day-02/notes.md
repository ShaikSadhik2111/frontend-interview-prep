Topic: functions

We'll cover:

JavaScript Functions
Function Declaration vs Expression
Anonymous Functions
Arrow Functions
First-Class Functions
Higher-Order Functions
Callback Functions
this
call()
apply()
bind()


Function declaration:

what is a function?
function let us write a flexible,resuable and abstarct of code. insted of writing a same logic to multiple code we can apply one logic with diference on requiremnt and can be used multiple ways .

what is a higher order function?

this is a function which that does have atleat one o fthis things or if a function takes a fubction or returns a function its higher order
1 accepts one ormore function arguments.
2 returns a function as result

// 1. Accepts a function as an argument
function doTwice(action) {
  action()
  action()
}

doTwice(() => console.log('Hello!'))
// Hello!
// Hello!

// 2. Returns a function as its result
function createGreeter(greeting) {
  return function(name) {
    return `${greeting}, ${name}!`
  }
}

const sayHello = createGreeter('Hello')
console.log(sayHello('Alice'))  // Hello, Alice!
console.log(sayHello('Bob'))    // Hello, Bob!

fUNCTION DECLARATION:

function greet(name) {
    return `Hello ${name}`;
}

console.log(greet("Sadhik"));

Characteristics
Hoisted completely
Can be called before declaration

Characteristics
Hoisted completely
Can be called before declaration

Function expression:

const greet = function(name) {
    return `Hello ${name}`;
};
unlike declarations:

sayHello();

const sayHello = function () {};

const sayHello = function () {};  //❌ Throws an error because only the variable is hoisted—not the assigned function.

Anonymous Function:

a function wothout a name

const add = function(a, b) {
    return a + b;
};

    why we use?
    Callbacks
Event listeners
Timers
Higher-order functions

Named Function Expression:

const factorial = function fact(n) {
    if (n <= 1) return 1;

    return n * fact(n - 1);
};

used for recurrsion and debugging stack traces.

Arrow function:

const add = (a, b) => a + b;

(or)

const square = num => num * num;

multiple statements:

const multiply = (a, b) => {
    const result = a * b;
    return result;
};

arrow vs normal functions

| Feature               | Normal | Arrow |
| --------------------- | ------ | ----- |
| Has own `this`        | ✅      | ❌     |
| Has `arguments`       | ✅      | ❌     |
| Can be constructor    | ✅      | ❌     |
| Hoisted (declaration) | ✅      | ❌     |


First-Class Functions
note: js treats functions like values.

store:

const greet = function() {};

pass

function execute(fn) {
    fn();
}

execute(function() {
    console.log("Running...");
});

return

function outer() {
    return function() {
        console.log("Hello");
    };
}

outer()();


Higher-Order Functions:

-> takes another function as an argument
-> Or retuens a function


function calculator(a, b, operation) {
    return operation(a, b);
}

function add(a, b) {
    return a + b;
}

console.log(calculator(2, 3, add));

Callback functions:

function greet(name, callback) {

    console.log("Hello", name);

    callback();

}

greet("Sadhik", () => {

    console.log("Welcome!");

});
why callbackds?
they allows us to decide what happens after a task finishes.

(this) Introduction:

consuing topic - note 

make as simple - this is determined by how a function is called, not where it is defined.

const person = {

    name: "Sadhik",

    greet() {
        console.log(this.name);
    }

};

person.greet();