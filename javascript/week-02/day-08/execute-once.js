// ONCE: Function executes only ONCE, all subsequent calls do nothing
// Use case: Initialization functions, event listeners that should fire once, 
//           API calls that should happen once, form submission handlers

function once(callback) {
  // Flag to track whether function has already been executed
  // Initialize to false - function hasn't run yet
  let hasBeenCalled = false;
  
  // Variable to store the result from first execution
  // Subsequent calls will return this cached result
  let result;
  
  // Return a new function that wraps the callback
  // This wrapper will enforce the "execute only once" behavior
  return function(...args) {
    // Check if function has already been executed
    if (hasBeenCalled) {
      // Function already ran, so ignore this call
      // Just return the result from the first execution
      console.log("⊘ Function already executed once, ignoring this call");
      return result;
    }
    
    // First time calling the function
    // Mark that we're executing the callback now
    hasBeenCalled = true;
    
    // Execute the callback with the provided arguments
    // Store the result so we can return it on subsequent calls
    console.log("✓ Executing function for the FIRST time");
    result = callback(...args);
    
    // Return the result
    return result;
  };
}

// ============================================
// ALTERNATIVE: Once with Context Binding
// ============================================
// If you need to preserve 'this' context (for methods)

function onceWithContext(callback, context) {
  let hasBeenCalled = false;
  let result;
  
  return function(...args) {
    if (hasBeenCalled) {
      console.log("⊘ Function already executed once, ignoring this call");
      return result;
    }
    
    hasBeenCalled = true;
    console.log("✓ Executing function for the FIRST time");
    
    // Call callback with specific context using .call()
    // This ensures 'this' points to the correct object
    result = callback.call(context, ...args);
    
    return result;
  };
}

// ============================================
// EXAMPLE USAGE
// ============================================

console.log("=== ONCE FUNCTION DEMO ===\n");

// Example 1: Simple function that only runs once
console.log("Example 1: Initialize System");
const initializeSystem = once(() => {
  console.log("   → System initialized!");
  return "initialization complete";
});

console.log("Call 1:", initializeSystem()); // Executes ✓
console.log("Call 2:", initializeSystem()); // Ignored ⊘
console.log("Call 3:", initializeSystem()); // Ignored ⊘

// Example 2: Function with arguments
console.log("\nExample 2: Register User");
const registerUser = once((username) => {
  console.log(`   → User "${username}" registered!`);
  return { username, registered: true };
});

console.log("Call 1:", registerUser("alice"));   // Executes ✓
console.log("Call 2:", registerUser("bob"));     // Ignored ⊘ (still returns alice result)
console.log("Call 3:", registerUser("charlie")); // Ignored ⊘

// Example 3: Event listener that fires only once
console.log("\nExample 3: Button Click Handler");
const handleFirstClick = once(() => {
  console.log("   → Button clicked for the FIRST time!");
  return "button activated";
});

// Simulating multiple clicks
console.log("User clicks button (1st):", handleFirstClick()); // Executes ✓
console.log("User clicks button (2nd):", handleFirstClick()); // Ignored ⊘
console.log("User clicks button (3rd):", handleFirstClick()); // Ignored ⊘

// ============================================
// REAL-WORLD SCENARIOS
// ============================================

// Scenario 1: API call that should only happen once
console.log("\nScenario 1: Fetch Data (Once Only)");
const fetchUserData = once(async () => {
  console.log("   → Fetching data from API...");
  // In real code: const data = await fetch('api/user').then(r => r.json());
  // For demo: simulating with delay
  return { id: 1, name: "Alice" };
});

// fetchUserData(); // Makes API call
// fetchUserData(); // Returns cached result, no API call
// fetchUserData(); // Returns cached result, no API call

// Scenario 2: Initialize connection pool
console.log("\nScenario 2: Database Connection");
const initDatabase = once(() => {
  console.log("   → Creating database connection pool...");
  return { connected: true, poolSize: 10 };
});

console.log("Init DB (1st):", initDatabase()); // Creates connection ✓
console.log("Init DB (2nd):", initDatabase()); // Returns existing connection ⊘
console.log("Init DB (3rd):", initDatabase()); // Returns existing connection ⊘

// ============================================
// HOW ONCE DIFFERS FROM DEBOUNCE/THROTTLE
// ============================================
// ONCE: Executes exactly 1 time, ignores all future calls
//       Example: initialize(), register user, first payment
//
// DEBOUNCE: Waits for calls to stop, then executes once
//           Example: Search input (wait for user to stop typing)
//
// THROTTLE: Executes at regular intervals
//           Example: Scroll event (every 100ms)
