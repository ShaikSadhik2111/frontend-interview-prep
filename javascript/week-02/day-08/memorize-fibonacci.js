// MEMOIZED FIBONACCI: Cache results to avoid recalculating same values
// Fibonacci sequence: 0, 1, 1, 2, 3, 5, 8, 13, 21, 34...
// Each number is sum of previous two numbers: fib(n) = fib(n-1) + fib(n-2)
// Without memoization: EXTREMELY SLOW for large n (exponential time complexity)
// With memoization: BLAZING FAST (linear time complexity)

function memoizeFibonacci() {
  // Create a cache object to store already calculated Fibonacci numbers
  // Key: the number n, Value: the Fibonacci result
  // Example: cache[5] = 5, cache[6] = 8, cache[7] = 13
  const cache = {};
  
  // Return a function that calculates Fibonacci number
  return function fibonacci(n) {
    // Validate input - Fibonacci is not defined for negative numbers
    if (n < 0) return undefined;
    
    // Base cases: fibonacci(0) = 0, fibonacci(1) = 1
    // These don't need to be cached as they're instant
    if (n === 0) return 0;
    if (n === 1) return 1;
    
    // Check if result is already in cache
    // If yes, return immediately WITHOUT recalculating (MASSIVE performance gain!)
    if (cache[n]) {
      console.log(`✓ Cache hit for fib(${n})!`);
      return cache[n];
    }
    
    // If not in cache, calculate it using recursive formula
    // fib(n) = fib(n-1) + fib(n-2)
    // Both recursive calls will use the cache for previously computed values
    console.log(`⊘ Computing fib(${n})...`);
    cache[n] = fibonacci(n - 1) + fibonacci(n - 2);
    
    // Store result in cache before returning
    // Next time fibonacci(n) is called, result will be found in cache instantly
    return cache[n];
  };
}

// ============================================
// COMPARISON: WITHOUT vs WITH MEMOIZATION
// ============================================

// Without Memoization (EXPONENTIAL TIME - VERY SLOW):
// fib(5) recalculates fib(3) multiple times:
//                    fib(5)
//                   /      \
//              fib(4)        fib(3)
//             /      \       /      \
//        fib(3)    fib(2)  fib(2)   fib(1)
//       /      \   ...
//   fib(2)  fib(1)
//
// Notice: fib(3) is calculated 2 times, fib(2) is calculated 3 times!
// For fib(50): Over 40 BILLION redundant calculations!

// With Memoization (LINEAR TIME - BLAZING FAST):
// Calculate each fib(n) exactly once, store it, and reuse forever
// fib(50): Only need 50 calculations instead of 40 billion!

// ============================================
// EXAMPLE USAGE & PERFORMANCE COMPARISON
// ============================================

console.log("=== MEMOIZED FIBONACCI ===\n");

// Create the memoized fibonacci function
const fib = memoizeFibonacci();

// First call to fib(6):
// Calculates: fib(6) → fib(5) → fib(4) → fib(3) → fib(2) → fib(1), fib(0)
// All intermediate values get cached
console.log("First call:");
console.log("fib(6) =", fib(6));
console.log("Cache state:", {0: 0, 1: 1, 2: 1, 3: 2, 4: 3, 5: 5, 6: 8});

// Second call to fib(6):
// CACHE HIT! Returns immediately without any recursion
console.log("\nSecond call:");
console.log("fib(6) =", fib(6));

// Third call to fib(8):
// Already have cached results for 0-6
// Only needs to calculate fib(7) and fib(8)
// Both use cached fib(5) and fib(6) from previous calls
console.log("\nThird call:");
console.log("fib(8) =", fib(8));

// Fourth call to fib(10):
// Reuses cache for everything below 10
console.log("\nFourth call:");
console.log("fib(10) =", fib(10));

// ============================================
// WHY MEMOIZATION IS CRITICAL FOR FIBONACCI
// ============================================
// Without memoization: fib(50) takes MINUTES or HOURS
// With memoization: fib(50) takes MILLISECONDS
//
// Time Complexity:
// - Without memoization: O(2^n) - EXPONENTIAL and TERRIBLE
// - With memoization: O(n) - LINEAR and FAST
//
// Space Complexity:
// - Extra memory for cache: O(n)
// - Worth it! Trading tiny extra space for massive time savings
//
// Real-world analogy:
// Without memoization: Asking "what's 2+2?" 1000 times, recalculating each time
// With memoization: Asking once, writing it down, then just looking it up later
