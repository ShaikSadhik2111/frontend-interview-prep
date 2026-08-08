// ============================================
// 1. DEBOUNCE - Wait for activity to stop
// ============================================
// Use: Search input, auto-save, resize events
// Simple idea: Cancel timer if called again, only execute after silence

function debounce(fn, delay) {
  let timer;
  
  return function(...args) {
    clearTimeout(timer); // Cancel previous timer
    timer = setTimeout(() => {
      fn(...args); // Execute after delay
    }, delay);
  };
}

// Test Debounce
console.log("=== DEBOUNCE ===");
const debouncedSearch = debounce((query) => {
  console.log("🔍 Searching for:", query);
}, 300);

console.log("Typing 'j'...");
debouncedSearch("j");
console.log("Typing 'ja'...");
debouncedSearch("ja");
console.log("Typing 'java'...");
debouncedSearch("java");
console.log("(waiting 300ms...)");
// After 300ms: "Searching for: java" ✓

// ============================================
// 2. THROTTLE - Execute at regular intervals
// ============================================
// Use: Scroll events, mousemove, button clicks
// Simple idea: Allow one execution per delay period

function throttle(fn, delay) {
  let lastTime = 0;
  
  return function(...args) {
    const now = Date.now();
    
    // If enough time passed since last execution, execute now
    if (now - lastTime >= delay) {
      fn(...args);
      lastTime = now;
    }
  };
}

// Test Throttle
console.log("\n=== THROTTLE ===");
const throttledScroll = throttle((position) => {
  console.log("📜 Scroll position:", position);
}, 1000);

console.log("Scroll at 0ms:", throttledScroll(100));   // Executes ✓
console.log("Scroll at 200ms:", throttledScroll(200)); // Ignored
console.log("Scroll at 400ms:", throttledScroll(300)); // Ignored
console.log("Scroll at 1000ms:", throttledScroll(400)); // Executes ✓

// ============================================
// 3. MEMOIZATION - Cache function results
// ============================================
// Use: Expensive calculations, fibonacci, factorial
// Simple idea: Store results, return if already calculated

function memoize(fn) {
  const cache = {};
  
  return function(...args) {
    const key = JSON.stringify(args);
    
    if (key in cache) {
      console.log(`  ✓ Cache hit for ${key}`);
      return cache[key];
    }
    
    console.log(`  ⊘ Computing for ${key}...`);
    const result = fn(...args);
    cache[key] = result;
    return result;
  };
}

// Test Memoization
console.log("\n=== MEMOIZATION ===");
const fibonacci = memoize((n) => {
  if (n <= 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
});

console.log("fib(5) =", fibonacci(5));
console.log("fib(5) again =", fibonacci(5)); // Cached! Instant

// ============================================
// 4. ONCE - Execute only once
// ============================================
// Use: Initialization, registration, payment
// Simple idea: Run once, ignore all future calls

function once(fn) {
  let called = false;
  let result;
  
  return function(...args) {
    if (!called) {
      console.log("✓ Executing for FIRST time");
      called = true;
      result = fn(...args);
    } else {
      console.log("⊘ Already executed, ignoring");
    }
    return result;
  };
}

// Test Once
console.log("\n=== ONCE ===");
const initialize = once(() => {
  console.log("  → System initialized!");
  return "ready";
});

console.log("Call 1:", initialize()); // Executes
console.log("Call 2:", initialize()); // Ignored
console.log("Call 3:", initialize()); // Ignored

// ============================================
// 5. CURRYING - Convert to single-arg functions
// ============================================
// Use: Function composition, partial application
// Simple idea: Each call takes ONE argument, returns a function

function curry(fn) {
  const arity = fn.length; // Number of parameters
  
  return function curried(...args) {
    // If we have enough arguments, execute
    if (args.length >= arity) {
      return fn(...args);
    }
    
    // Otherwise, return a function waiting for more args
    return (...nextArgs) => curried(...args, ...nextArgs);
  };
}

// Test Currying
console.log("\n=== CURRYING ===");
const add = (a, b, c) => a + b + c;
const curriedAdd = curry(add);

console.log("Full call: curry(1)(2)(3) =", curriedAdd(1)(2)(3)); // 6
console.log("Partial 1: curry(1)(2) returns function");
const addWith1and2 = curriedAdd(1)(2);
console.log("Then call with 3: addWith1and2(3) =", addWith1and2(3)); // 6

// ============================================
// 6. PARTIAL APPLICATION - Pre-fill some arguments
// ============================================
// Use: Create specialized functions
// Simple idea: Set some arguments now, rest later

function partial(fn, ...fixedArgs) {
  return function(...remainingArgs) {
    return fn(...fixedArgs, ...remainingArgs);
  };
}

// Test Partial Application
console.log("\n=== PARTIAL APPLICATION ===");
const multiply = (a, b, c) => a * b * c;
const double = partial(multiply, 2);
const doubleThenTriple = partial(double, 3);

console.log("multiply(2, 3, 4) =", multiply(2, 3, 4)); // 24
console.log("double(3, 4) =", double(3, 4)); // 24 (pre-filled 2)
console.log("doubleThenTriple(4) =", doubleThenTriple(4)); // 24 (pre-filled 2, 3)

// ============================================
// 7. COMPOSE - Combine multiple functions
// ============================================
// Use: Pipe data through functions
// Simple idea: f(g(h(x))) → compose(f, g, h)(x)

function compose(...fns) {
  return (value) => fns.reduceRight((acc, fn) => fn(acc), value);
}

// Test Compose
console.log("\n=== COMPOSE ===");
const add5 = (x) => x + 5;
const multiply2 = (x) => x * 2;
const subtract3 = (x) => x - 3;

const combined = compose(subtract3, multiply2, add5);
console.log("Input: 10");
console.log("Step 1 - add5(10) = 15");
console.log("Step 2 - multiply2(15) = 30");
console.log("Step 3 - subtract3(30) = 27");
console.log("compose(10) =", combined(10)); // 27

// ============================================
// 8. PIPE - Left-to-right function composition
// ============================================
// Use: Readable data transformation pipelines
// Simple idea: First function result → input to next

function pipe(...fns) {
  return (value) => fns.reduce((acc, fn) => fn(acc), value);
}

// Test Pipe
console.log("\n=== PIPE ===");
const piped = pipe(add5, multiply2, subtract3);
console.log("Input: 10");
console.log("Step 1 - add5(10) = 15");
console.log("Step 2 - multiply2(15) = 30");
console.log("Step 3 - subtract3(30) = 27");
console.log("pipe(10) =", piped(10)); // 27

// ============================================
// 9. DEBOUNCE WITH IMMEDIATE - Best of both
// ============================================
// Execute immediately, then debounce further calls

function debounceImmediate(fn, delay) {
  let timer;
  let firstCall = true;
  
  return function(...args) {
    if (firstCall) {
      console.log("✓ Execute immediately (first call)");
      fn(...args);
      firstCall = false;
      
      clearTimeout(timer);
      timer = setTimeout(() => {
        firstCall = true; // Ready for next batch
      }, delay);
    }
  };
}

// Test Debounce Immediate
console.log("\n=== DEBOUNCE WITH IMMEDIATE ===");
const clickHandler = debounceImmediate((action) => {
  console.log("  → Button clicked:", action);
}, 500);

console.log("Click 1:", clickHandler("submit")); // Executes ✓
console.log("Click 2:", clickHandler("submit")); // Ignored
console.log("Click 3:", clickHandler("submit")); // Ignored
console.log("(after 500ms: ready for next batch)");

// ============================================
// 10. REAL-WORLD COMBINATION
// ============================================
// Debounce + Memoization = Fast search

console.log("\n=== DEBOUNCE + MEMOIZATION ===");

const mockAPI = (query) => {
  console.log(`    📡 API call for "${query}"`);
  return [`Result for ${query}1`, `Result for ${query}2`];
};

const memoizedAPI = memoize(mockAPI);
const debouncedAPI = debounce(memoizedAPI, 300);

console.log('Searching "ali"...');
debouncedAPI("ali");
debouncedAPI("alic");
debouncedAPI("alice");
// After 300ms: 1 API call with "alice"

// Search "alice" again
console.log('Searching "alice" again...');
debouncedAPI("alice");
// Instant cache hit! No API call

// ============================================
// CHEAT SHEET - Quick Reference
// ============================================
/*
DEBOUNCE: Wait for silence, then execute ONCE
  → Use: Search, auto-save, resize
  → Pattern: Cancel timer on each call
  
THROTTLE: Execute at regular intervals
  → Use: Scroll, mousemove, clicks
  → Pattern: Track last execution time
  
MEMOIZATION: Cache results
  → Use: Fibonacci, expensive functions
  → Pattern: Store in object, check before computing
  
ONCE: Execute exactly ONE time
  → Use: Initialization, payment
  → Pattern: Boolean flag
  
CURRYING: Convert multi-arg to chain of single-arg
  → Use: Function composition
  → Pattern: Return function waiting for next arg
  
PARTIAL: Pre-fill some arguments
  → Use: Create specialized functions
  → Pattern: Bind arguments, return new function
  
COMPOSE: Right-to-left function pipeline
  → Use: f(g(h(x)))
  → Pattern: reduceRight
  
PIPE: Left-to-right function pipeline
  → Use: x → h → g → f
  → Pattern: reduce
*/