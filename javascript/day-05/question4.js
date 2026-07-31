// Write your own delay function.

//Example:

//delay(2000)

function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

delay(2000).then(() => console.log('Executed after 2 seconds'));

//delay(5000)