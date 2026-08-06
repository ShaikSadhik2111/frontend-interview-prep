// convert setTimeout to promise
const delayPromise = (message, delay) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(message);
    }, delay);
  });
};

// Use the Promise
delayPromise('Promise resolved after 2 seconds', 2000)
  .then((message) => {
    console.log(message);
  })
  .catch((error) => {
    console.error('Error:', error);
  });