// for debounce

function debounce(callback, delay) {
  let timer;

  return function (...args) {
    clearTimeout(timer);

    timer = setTimeout(() => {
      callback.apply(this, args);
    }, delay);
  };
}

// questions:

// Why is clearTimeout() needed? -- it is needed to clear the previous timer so that the callback function is not called multiple times if the returned function is invoked repeatedly within the delay period. This ensures that the callback is only executed after the specified delay has passed since the last invocation.
// Why does timer remain available? -- The timer variable remains available because it is defined in the closure created by the debounce function. When the returned function is invoked, it has access to the timer variable, allowing it to clear the previous timeout and set a new one. This closure allows the returned function to maintain state between invocations, enabling the debounce functionality to work correctly.
// Why do we use apply()? -- We use apply() to call the callback function with the correct this context and the arguments passed to the returned function. This ensures that the callback behaves as expected when invoked.
// Where is the closure? -- The closure is created when the debounce function returns the inner function. The inner function retains access to the timer variable defined in the outer debounce function, even after the debounce function has finished executing. This allows the inner function to maintain state between invocations.

// throttling

function throttle(callback, delay) {
  let waiting = false;

  return function (...args) {
    if (waiting) return;

    callback.apply(this, args);

    waiting = true;

    setTimeout(() => {
      waiting = false;
    }, delay);
  };
}


// currying

// normal func
function add(a, b, c) {
  return a + b + c;
}
//currying
function add(a) {
  return function (b) {
    return function (c) {
      return a + b + c;
    };
  };
}
add(1)(2)(3); // returns 6

//why useful? -- Currying is useful because it allows you to create specialized functions by fixing some arguments of a function. This can lead to more reusable and composable code, as you can create new functions with specific behaviors based on the original function. It also enables partial application, where you can provide some arguments now and the rest later, making it easier to work with functions in a functional programming style.
const discount10 = calculateDiscount(10);

// Reuse later
discount10(500);
discount10(1000);

//This avoids repeatedly passing the same parameter.

//memoization
function memoize(fn) {
  const cache = {};

  return function (...args) {
    const key = JSON.stringify(args);

    if (key in cache) {
      return cache[key];
    }

    const result = fn(...args);

    cache[key] = result;

    return result;
  };
}