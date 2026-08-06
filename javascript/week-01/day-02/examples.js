// //greet('sadhik'); throw error because greet is not defined yet
// const greet = function(name) {
//     return `Hello ${name}`;
// };
// console.log(greet('sadhik'));////can work because greet is defined now

function greet(name, callback) {

    console.log("Hello", name);

    callback();

}

greet("Sadhik", () => {

    console.log("Welcome!");

});