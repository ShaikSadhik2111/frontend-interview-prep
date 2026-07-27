// // const person = {
// //     name: "Sadhik",

// //     greet() {
// //         console.log(this.name);
// //     }
// // };

// // person.greet();
// // //this = person

// // function greet() {
// //     console.log(this);
// // }

// // greet();

// const person = {

//     name: "Sadhik",

//     greet() {

//         function inner() {
//             const name = "Basha";

//             console.log(this.name);

//         }

//         inner();

//     }

// }

// person.greet();
// // op: undefined

// const person = {

//     name: "Sadhik",

//     greet() {

//         const inner = () => {

//             console.log(this.name);

//         }

//         inner();

//     }

// }

// person.greet();


// why? ->  arrow functions don't create their own this, they inherit it from the lexical this.

// const person = {

//     name: "Sadhik"

// };

// function greet(city) {

//     console.log(

//         this.name,

//         city

//     );

// }

// greet.call(person, "Hyderabad");


// call() method is used to invoke a function with a specific this value and arguments provided individually. In this case, we are calling the greet function with the person object as its this value and passing "Hyderabad" as an argument. The output will be "Sadhik Hyderabad".
// const person = {
//     name : "Sadhik"
// }

// function greet(city) {
//     console.log(this.name, city);
// }

// greet.call(person,"Hyderabad");


//apply() method is similar to call() method, but it takes an array of arguments instead of individual arguments. In this case, we are calling the greet function with the person object as its this value and passing ["Hyderabad"] as an argument. The output will be "Sadhik Hyderabad".
// const person = {
//     name: "Sadhik"
// }
// function greet(city) {
//     console.log(this.name, city);
// }
// greet.apply(person, ["Hyderabad"]);

//bind() method is used to create a new function that, when called, has its this keyword set to the provided value. In this case, we are creating a new function called boundGreet that has its this value set to the person object. When we call boundGreet with "Hyderabad" as an argument, it will output "Sadhik Hyderabad".
// unlike call() bind () does not execute immediatly 
const person = {
    name: "Sadhik"
}   
function greet(city) {
    console.log(this.name, city);
}
const greetLater = greet.bind(person);
//console.log(greetLater); //wont execute the function but will return a new function with this set to person
 greetLater("Hyderabad");//op: Sadhik Hyderabad runs as greetLater is a new function with this set to person

