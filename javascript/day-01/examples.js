// console.log(a);
// var a = 10;

// console.log(b);
// let b = 10;

// let name = "Bosch";

// function one() {

//     let age = 26;

//     function two() {
//         console.log(name);
//         console.log(age);
//     }

//     two();

// }


// function createGreeter(greeting) {
//   // 'greeting' is in createGreeter's scope
  
//   return function(name) {
//     // This inner function is a closure!
//     // It "closes over" the 'greeting' variable
//     console.log(`${greeting}, ${name}!`);
//   };
// }

// const sayHello = createGreeter("Hello");
// const sayHola = createGreeter("Hola");

// // createGreeter has finished executing, but...
// sayHello("Alice");  // "Hello, Alice!"
// sayHola("Bob");     // "Hola, Bob!"

// // The inner functions still remember their 'greeting' values!

function outer() {

    let count = 0;

    return function(){

        count++;

        console.log(count);

    }

}

const counter = outer();

counter();

counter();

counter();