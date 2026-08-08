// DEBOUNCE: Delays execution until after specified time passes with no new calls
// Use case: search boxes, window resize, form input validation

function debounce(callback, delay) {
  // 'timer' holds the timeout ID - scoped to this debounce instance
  // Each debounced function gets its own timer variable
  let timer;
  
  // Return a new function that will be called repeatedly
  // ...args captures all arguments passed to the debounced function
  return function(...args) {
    // Clear the previous timer - this resets the countdown
    // If user calls function again before delay ends, previous timer is cancelled
    clearTimeout(timer);
    
    // Start a NEW timer with the specified delay
    timer = setTimeout(() => {
      // After 'delay' milliseconds (if no more calls), execute the callback
      // Pass along the latest arguments from the last call
      callback(...args);
    }, delay);
  };
}

// EXAMPLE USAGE:
// const debouncedSearch = debounce(performSearch, 500);
// input.addEventListener('input', (e) => debouncedSearch(e.target.value));
//
// Flow:
// User types "j" → Timer starts (500ms)
// User types "a" → Previous timer CLEARED, new timer starts (500ms)
// User types "v" → Previous timer CLEARED, new timer starts (500ms)
// User stops typing → Timer completes → performSearch("jav") is called

