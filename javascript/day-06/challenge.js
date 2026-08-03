// implement promise.all() approch
const promiseAll = (promises) => {
  return new Promise((resolve, reject) => {
    const results = [];
    let completedPromises = 0;

    if (promises.length === 0) {
      resolve([]);
      return;
    }

    promises.forEach((promise, index) => {
      Promise.resolve(promise)
        .then((value) => {
          results[index] = value;
          completedPromises += 1;

          if (completedPromises === promises.length) {
            resolve(results);
          }
        })
        .catch(reject);
    });
  });
};

// Example usage
const promise1 = Promise.resolve(1);
const promise2 = Promise.resolve(2);
const promise3 = new Promise((resolve) => setTimeout(() => resolve(3), 100));

promiseAll([promise1, promise2, promise3]).then(console.log).catch(console.error);
