// //callback example that prints starting.. loading data.. completed!
// function printStatus(message) {
//     console.log(message);
// }

// printStatus("Starting...");
// printStatus("Loading data...");
// printStatus("Completed!");

//real example
//reference

// function greet(name, callback) {

//     console.log("Hello", name);

//     callback();

// }

// greet("Sadhik", () => {

//     console.log("Welcome!");

// });

function loadTest(callback) {

    console.log("Starting...");
    // Simulate some asynchronous operation
    setTimeout(() => {
        console.log("Loading data...");
        // Simulate data loading completion
        callback();
    }, 1000);
}

loadTest(() => {
    console.log("Completed!");
});