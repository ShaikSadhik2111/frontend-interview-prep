// Write a Promise that rejects after 3 seconds.
// Create a new Promise that ignores the resolve parameter and uses reject
const promise = new Promise((_, reject) => {  
    // Set a timer for 3 seconds before rejecting the promise
    setTimeout(() => {
        // Reject the promise with an error message
        reject('Promise rejected after 3 seconds');
    }, 3000);
});

// Use the Promise
// Handle the rejected promise using catch()
promise.catch((error) => {
    // Log the error message to the console
    console.log(error);
});