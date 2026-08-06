// Write a Promise that resolves after 2 seconds.
// Create a new Promise with a resolve callback function
const promise = new Promise((resolve) => {
    // Use setTimeout to delay execution by 2000 milliseconds (2 seconds)
    setTimeout(() => {
        // Call resolve with the success message
        resolve('Promise resolved after 2 seconds');
    }, 2000);
});

// Use the Promise
// Attach a .then() handler to execute when the Promise resolves
promise.then((message) => {
    // Log the resolved message to the console
    console.log(message);
});