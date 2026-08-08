// MEMOIZATION: Cache results of expensive function calls
// So if same input is requested again, return cached result instead of recalculating
// Use case: Factorial, Fibonacci, recursive functions with repeated calculations

// Memoized Factorial Implementation
function memorizeFactorial() {
  // Create a cache object to store already calculated factorials
  // Key: the number, Value: its factorial result
  // Example: cache[5] = 120, cache[3] = 6
  const cache = {};
  
  // Return a function that calculates factorial
  return function factorial(n) {
    // Validate input
    if (n < 0) return undefined;
    if (n === 0 || n === 1) return 1;
    
    // Check if result is already in cache
    // If yes, return immediately without recalculating (HUGE performance gain!)
    if (cache[n]) {
      console.log(`✓ Cache hit for ${n}!`);
      return cache[n];
    }
    
    // If not in cache, calculate it
    // Factorial formula: n! = n * (n-1)!
    // This recursively calls factorial with n-1
    console.log(`⊘ Computing factorial(${n})...`);
    cache[n] = n * factorial(n - 1);
    
    // Store result in cache before returning
    // Next time factorial(n) is called, result will be found in cache
    return cache[n];
  };
}

// ============================================
// EXAMPLE USAGE & PERFORMANCE COMPARISON
// ============================================

// Create the memoized factorial function
const factorial = memorizeFactorial();

// First call to factorial(5):
// Flow: factorial(5) → factorial(4) → factorial(3) → factorial(2) → factorial(1)
// All values get cached: cache = {1:1, 2:2, 3:6, 4:24, 5:120}
console.log("First call:");
console.log("factorial(5) =", factorial(5));

// Second call to factorial(5):
// CACHE HIT! Returns immediately from cache without recursion
console.log("\nSecond call:");
console.log("factorial(5) =", factorial(5));

// Third call to factorial(7):
// Already have cached results for 1-5
// Only need to calculate 6 and 7
console.log("\nThird call:");
console.log("factorial(7) =", factorial(7));

// ============================================
// WHY MEMOIZATION MATTERS
// ============================================
// Without memoization: factorial(100) might recalculate factorial(50) millions of times
// With memoization: Once factorial(50) is calculated, it's stored and reused instantly
//
// Performance improvement: O(n) exponential calculations → O(n) with caching
// Space tradeoff: Uses extra memory to store cache, but saves computation time
