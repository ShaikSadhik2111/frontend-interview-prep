// const person = {
//     name: "John",
//     age: 30,
//     greet: function (city) {
//         return `Hello, my name is ${this.name}, I am ${this.age} years old and I live in ${city}.`;
//     }
// };

// const greet = person.greet;

// console.log(greet.bind(person, "Hyderabad"));

// for promise.all() notes

//challenge

//Given

// Promise.all([
//     promise1,
//     promise2,
//     promise3
// ]);

// behaviour
// All fulfilled
//     ↓
// Return results in ORIGINAL ORDER

// Any rejected
//     ↓
// Reject immediately

// SIMPLE Example 1: All Promises resolved
console.log("Example 1: All Resolved");
const p1 = Promise.resolve(10);
const p2 = Promise.resolve(20);
const p3 = Promise.resolve(30);

Promise.all([p1, p2, p3]).then(result => {
    console.log(result); // [10, 20, 30] - in SAME ORDER
});

// SIMPLE Example 2: One Promise rejected
console.log("\nExample 2: One Rejected");
const success = Promise.resolve("OK");
const fail = Promise.reject("ERROR");

Promise.all([success, fail])
    .then(result => console.log(result))
    .catch(error => console.log("Caught:", error)); // Immediately catches ERROR

