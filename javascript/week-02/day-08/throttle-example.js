// THROTTLE: Ensures function executes at most once every N milliseconds
// Different from debounce - executes periodically instead of waiting for pauses
// Use case: scroll events, mousemove, resize events, API rate limiting

function throttle(callback, delay) {
  // Track when the function was last executed
  // Initialize to 0 so first call executes immediately
  let lastExecutedTime = 0;
  
  // Return a new function that will be called repeatedly
  // ...args captures all arguments passed to the throttled function
  return function(...args) {
    // Get the current time in milliseconds
    const now = Date.now();
    
    // Check if enough time has passed since last execution
    // If (now - lastExecutedTime) >= delay, then we can execute
    if (now - lastExecutedTime >= delay) {
      // Execute the callback with the latest arguments
      callback(...args);
      
      // Update lastExecutedTime to current time
      // This ensures next execution won't happen for at least 'delay' ms
      lastExecutedTime = now;
    }
    // If not enough time has passed, do nothing
    // The call is silently ignored (rate-limited)
  };
}

// ALTERNATIVE: Throttle with trailing call (executes pending call after delay)
function throttleWithTrailing(callback, delay) {
  let lastExecutedTime = 0;
  let timer;
  
  return function(...args) {
    const now = Date.now();
    
    // If enough time has passed, execute immediately
    if (now - lastExecutedTime >= delay) {
      callback(...args);
      lastExecutedTime = now;
      // Clear any pending trailing execution
      clearTimeout(timer);
    } else {
      // Not enough time passed - schedule a trailing execution
      // This ensures the latest call will execute after the delay period
      clearTimeout(timer);
      timer = setTimeout(() => {
        callback(...args);
        lastExecutedTime = Date.now();
      }, delay);
    }
  };
}

// EXAMPLE USAGE - Scroll Event:
// const throttledScroll = throttle(handleScroll, 1000);
// window.addEventListener('scroll', throttledScroll);
//
// Flow (1000ms delay):
// Time 0ms:   User scrolls → "scroll 1" executes ✓ (lastExecutedTime = 0)
// Time 200ms: User scrolls → Ignored (only 200ms passed, need 1000ms)
// Time 400ms: User scrolls → Ignored (only 400ms passed)
// Time 600ms: User scrolls → Ignored (only 600ms passed)
// Time 1000ms: User scrolls → "scroll 5" executes ✓ (lastExecutedTime updated)
// Result: Function runs ~once per second despite many scroll events

// DEBOUNCE vs THROTTLE:
// Debounce: Waits for activity to stop, then executes once
//           Example: Search input (wait for user to finish typing)
//
// Throttle: Executes at regular intervals regardless of activity
//           Example: Scroll events (process every N milliseconds)
