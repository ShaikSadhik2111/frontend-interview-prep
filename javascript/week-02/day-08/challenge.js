// ENHANCED DEBOUNCE: With support for immediate execution on first call
// Signature: debounce(callback, delay, immediate)
// - callback: function to execute
// - delay: milliseconds to wait
// - immediate: true = execute immediately on first call, then debounce
//              false/omitted = wait for delay before executing (default behavior)
//
// Use cases:
// - immediate: true  → Button clicks (fire immediately, prevent double-clicks)
// - immediate: false → Search input (wait for user to stop typing)

function debounce(callback, delay, immediate) {
  // Timer ID for setTimeout - allows us to cancel pending executions
  let timer;
  
  // Flag to track if first call has been made
  // Used when immediate=true to determine behavior on first vs. subsequent calls
  let firstCall = true;
  
  // Return a new function that will be called repeatedly
  // ...args captures all arguments passed to the debounced function
  return function(...args) {
    // Check if immediate execution is enabled AND this is the first call
    if (immediate && firstCall) {
      // FIRST CALL with immediate=true
      // Execute immediately without waiting for delay
      console.log("✓ Executing immediately on FIRST call (immediate=true)");
      callback(...args);
      
      // Mark that first call has been made
      // Future calls won't execute immediately anymore
      firstCall = false;
      
      // Still set a timer to prevent rapid successive calls
      // During this delay period, all new calls are debounced
      clearTimeout(timer);
      timer = setTimeout(() => {
        // After delay expires, reset firstCall flag so next batch can execute immediately
        firstCall = true;
        console.log("⊘ Delay period expired, ready for next immediate execution");
      }, delay);
    } else {
      // NOT immediate, OR not the first call
      // Standard debounce behavior:
      // - Clear any pending execution
      // - Start a new countdown
      // - Execute when countdown completes (if no more calls come in)
      
      console.log("⊘ Debouncing call, waiting for delay period...");
      
      // Clear the previous timer
      // This resets the countdown if user calls function again before delay expires
      clearTimeout(timer);
      
      // Start a new timer
      timer = setTimeout(() => {
        // After delay, execute the callback with latest arguments
        console.log("✓ Delay period ended, executing callback");
        callback(...args);
        
        // If immediate mode, reset firstCall flag for next sequence
        if (immediate) {
          firstCall = true;
          console.log("⊘ Immediate mode: ready for next first call");
        }
      }, delay);
    }
  };
}

// ============================================
// COMPARISON: IMMEDIATE vs STANDARD DEBOUNCE
// ============================================

console.log("=== DEBOUNCE WITH IMMEDIATE: true ===\n");

// Example 1: Button with immediate=true
// Fires immediately, then ignores rapid clicks during delay period
console.log("Example 1: Button Click (immediate=true)");
const handleButtonClick = debounce((text) => {
  console.log(`   → Button action: ${text}`);
}, 1000, true);

console.log("Click 1 (0ms):", handleButtonClick("First"));   // Executes immediately ✓
console.log("Click 2 (100ms):", handleButtonClick("Second")); // Debounced (ignored)
console.log("Click 3 (200ms):", handleButtonClick("Third"));  // Debounced (ignored)
// After 1000ms: ready for next immediate call

console.log("\n" + "=".repeat(50) + "\n");

// Example 2: Search with immediate=false (default)
// Waits for user to stop typing, then executes once
console.log("Example 2: Search Input (immediate=false - default)");
const handleSearch = debounce((query) => {
  console.log(`   → Searching for: "${query}"`);
}, 500, false);

console.log("Type 'j' (0ms):", handleSearch("j"));       // Waits for delay
console.log("Type 'a' (100ms):", handleSearch("ja"));    // Debounced, restart timer
console.log("Type 'v' (200ms):", handleSearch("jav"));   // Debounced, restart timer
console.log("Type 'a' (300ms):", handleSearch("java"));  // Debounced, restart timer
console.log("User stops typing...");
// After 500ms from last call: search for "java" executes

console.log("\n" + "=".repeat(50) + "\n");

// Example 3: Form submission with immediate=true
// First submit goes through immediately, subsequent attempts are blocked
console.log("Example 3: Form Submission (immediate=true)");
const handleSubmit = debounce((formData) => {
  console.log(`   → Form submitted with: ${JSON.stringify(formData)}`);
}, 2000, true);

console.log("Submit 1 (0ms):", handleSubmit({name: "Alice"}));    // Executes ✓
console.log("Submit 2 (300ms):", handleSubmit({name: "Bob"}));    // Blocked ⊘
console.log("Submit 3 (500ms):", handleSubmit({name: "Charlie"})); // Blocked ⊘
// After 2000ms: next submit can execute immediately

console.log("\n" + "=".repeat(50) + "\n");

// ============================================
// REAL-WORLD SCENARIOS
// ============================================

console.log("Example 4: Auto-save with immediate=false");
// Wait for user to stop typing, then auto-save
const autoSave = debounce((content) => {
  console.log(`   → Auto-saving content: "${content}"`);
}, 3000, false);

console.log("User types... (constantly)");
console.log("Type 1:", autoSave("H"));      // Debounced
console.log("Type 2:", autoSave("He"));     // Debounced
console.log("Type 3:", autoSave("Hel"));    // Debounced
console.log("Type 4:", autoSave("Hell"));   // Debounced
console.log("Type 5:", autoSave("Hello"));  // Debounced
console.log("User pauses...");
// After 3000ms: auto-save executes with "Hello"

console.log("\n" + "=".repeat(50) + "\n");

// ============================================
// DECISION TREE: WHEN TO USE immediate=true vs false
// ============================================
//
// Use immediate=true when:
//   - You want IMMEDIATE action on first interaction
//   - Then PREVENT rapid repeated actions
//   - Examples: Button clicks, form submissions, payments
//
// Use immediate=false (default) when:
//   - You want to WAIT for activity to stop
//   - Then execute once with latest data
//   - Examples: Search, auto-save, resize events, API calls
//
// Flow comparison:
//
// immediate=true:
//   Call 1 (0ms):    Execute ✓
//   Call 2 (100ms):  Wait (debounced)
//   Call 3 (200ms):  Wait (debounced)
//   Call 4 (300ms):  Wait (debounced)
//   After 1000ms:    Ready for next batch
//
// immediate=false:
//   Call 1 (0ms):    Wait (debounced)
//   Call 2 (100ms):  Wait (debounced, timer restarts)
//   Call 3 (200ms):  Wait (debounced, timer restarts)
//   Call 4 (300ms):  Wait (debounced, timer restarts)
//   After 500ms idle: Execute with latest args
