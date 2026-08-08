# Interview Questions & Answers - Day 08

## 1. Explain debounce.

**Debounce** delays function execution until after a specified wait period has passed with no new calls.

**Analogy**: Like waiting for someone to stop talking before you respond.

**How it works**:
- User calls function repeatedly
- Each call cancels the previous timer using `clearTimeout()`
- New timer starts counting down
- Only when the countdown completes (no more calls), the function executes
- Uses the LATEST arguments from the last call

**Code Flow**:
```
Call 1 (0ms):    Timer starts (500ms)
Call 2 (100ms):  Timer CLEARED, new timer starts (500ms)
Call 3 (200ms):  Timer CLEARED, new timer starts (500ms)
User stops...
After 500ms:     Function executes with Call 3 data
```

**Real-world use**: Search input, auto-save, form validation

**Key Point**: The function is called ONLY ONCE after the user stops interacting.

---

## 2. Explain throttle.

**Throttle** ensures a function executes AT MOST once every N milliseconds.

**Analogy**: Like a water faucet releasing water at a steady rate.

**How it works**:
- Tracks `lastExecutedTime` when function last ran
- Each call checks: "Has enough time passed since last execution?"
- If YES → execute immediately and update `lastExecutedTime`
- If NO → ignore the call (silently rate-limit)
- Functions runs periodically, not just once

**Code Flow**:
```
Time 0ms:    User scrolls → Execute ✓ (lastExecutedTime = 0)
Time 200ms:  User scrolls → Ignored (only 200ms passed, need 1000ms)
Time 400ms:  User scrolls → Ignored
Time 1000ms: User scrolls → Execute ✓ (lastExecutedTime = 1000)
Time 1200ms: User scrolls → Ignored
```

**Real-world use**: Scroll events, mousemove, resize events, button clicks (prevent double-click)

**Key Point**: The function runs multiple times at regular intervals (every N milliseconds).

---

## 3. Debounce vs Throttle?

| Feature | Debounce | Throttle |
|---------|----------|----------|
| **Execution** | Once after activity stops | Multiple times at intervals |
| **Timing** | Waits for idle period | Regular fixed intervals |
| **When to use** | User typing, form input | Scroll, mousemove, resize |
| **Example** | Search (wait for user to stop) | Scroll (process every 100ms) |
| **Function calls** | 100 calls → 1 execution | 100 calls → ~10 executions |
| **Response time** | Slower (waits for pause) | Faster (executes constantly) |

**Memory Aid**:
- **Debounce** = "Bounce" the call back until you stop
- **Throttle** = "Throttle" the rate to regular intervals

**Visual**:
```
Debounce:   ▌  ▌  ▌  ▌  ▌ (pause) ====► EXECUTE
                         (ignores these)

Throttle:   ✓  ▌  ▌  ✓  ▌  ▌  ✓  ▌  ▌
            (regular spacing)
```

---

## 4. Explain currying.

**Currying** transforms a function with multiple arguments into a series of functions with ONE argument each.

**Why**: Enables partial application, code reuse, and cleaner functional programming.

**Example**:
```javascript
// Normal function
function add(a, b) {
  return a + b;
}
add(2, 3); // 5

// Curried version
function curry(a) {
  return function(b) {
    return a + b;
  };
}
const add5 = curry(5);      // Returns a function
add5(3);                     // 8 (uses stored a=5, applies b=3)
add5(10);                    // 15 (reuses stored a=5)
```

**How it works**:
- First function captures the first argument (closure)
- Returns another function waiting for next argument
- Keeps capturing arguments until all are provided
- Only then executes the actual logic

**Benefits**:
- Create specialized functions from general ones
- Function composition
- Partial application
- Better code reuse

---

## 5. Difference between currying and partial application?

| Feature | Currying | Partial Application |
|---------|----------|---------------------|
| **Definition** | Transform multi-arg function into chain of single-arg functions | Pre-fill some arguments, get a function waiting for rest |
| **Args per step** | ONE argument at a time | MULTIPLE arguments at once |
| **Strictness** | Strict: exactly one arg per call | Flexible: any number of args |
| **Example** | `curry(a)(b)(c)` | `partial(func, a, b)(c)` |
| **When done** | Must call all functions in chain | Can stop at any point |
| **Reusability** | Easy to create variations | Less flexible |

**Code Comparison**:
```javascript
// Currying: one arg at a time
curry(2)(3)(4); // Must call all 3

// Partial: multiple args at once
const step1 = partial(func, 2, 3);
step1(4); // Call with remaining args
```

**Relationship**: Currying IS a specific type of partial application (where you pre-fill exactly one argument).

---

## 6. Explain memoization.

**Memoization** caches function results so repeated calls with same arguments return cached result instantly instead of recalculating.

**Why**: Prevents redundant calculations, massive performance improvement for recursive/expensive functions.

**How it works**:
1. Create a `cache` object to store results
2. Before calculating, check: "Is result already in cache?"
3. If YES → return cached result instantly
4. If NO → calculate, store in cache, return result

**Performance Impact**:
```
Without memoization: fib(50) = 40+ BILLION calculations (takes minutes!)
With memoization:    fib(50) = 50 calculations (takes milliseconds!)
```

**Time Complexity**:
- Without: O(2^n) - EXPONENTIAL and TERRIBLE
- With: O(n) - LINEAR and FAST

**Code Flow - Fibonacci**:
```
Call fib(5):
  ├─ Call fib(4) → caches results
  ├─ Call fib(3) → finds in cache ✓
  └─ Result: cached

Next call fib(5): Returns instantly from cache!
```

**Trade-off**: Use extra memory (storage for cache) to save massive computation time. WORTH IT!

---

## 7. Difference between memoization and caching?

| Feature | Memoization | Caching |
|---------|------------|---------|
| **Scope** | Specific to one function | General-purpose storage |
| **When to use** | Function results | Any data (API responses, database queries) |
| **Implementation** | Inside function (closures) | Separate layer (Redis, browser cache) |
| **Lifespan** | Lives as long as closure exists | Can be persistent or temporary |
| **Control** | Automatic (no manual management) | Manual (set, get, invalidate) |
| **Example** | Memoized fibonacci | Browser cache, Redis cache |

**Relationship**: Memoization is a SPECIFIC TYPE of caching applied to function results.

**Analogy**:
- **Memoization**: Writing down answers to homework so you don't recalculate
- **Caching**: General storage system (can store anything)

---

## 8. How do closures enable debounce?

**Closures** allow debounce to work by creating a persistent scope that "remembers" variables across multiple function calls.

**The Magic**:
```javascript
function debounce(callback, delay) {
  let timer;  // ← Closure: remembers timer across calls
  
  return function(...args) {
    clearTimeout(timer);
    timer = setTimeout(() => {
      callback(...args);
    }, delay);
  };
}
```

**Why closures are essential**:

1. **Persistent state**: Each debounced function has its OWN `timer` variable
2. **Encapsulation**: `timer` is private, can't be accessed from outside
3. **Memory**: When `return function` is called, it "closes over" the `timer` variable
4. **Multiple instances**: Two debounced functions have completely separate timers

**Closure illustration**:
```javascript
const debouncedSearch1 = debounce(search, 500);
const debouncedSearch2 = debounce(search, 500);

// Each has its own timer closure!
debouncedSearch1("abc"); // Uses timer1
debouncedSearch2("xyz"); // Uses timer2 (separate!)
```

**Without closures**: Wouldn't be possible to maintain state between calls. Timer variable would be lost after function ends.

---

## 9. Where have you used debounce in React?

**Common React use cases**:

### 1. **Search Input (Most Common)**
```javascript
const [query, setQuery] = useState("");
const debouncedSearch = debounce((searchTerm) => {
  // API call only after user stops typing
  fetchSearchResults(searchTerm);
}, 500);

const handleSearch = (e) => {
  setQuery(e.target.value);
  debouncedSearch(e.target.value);
};
```

### 2. **Window Resize**
```javascript
useEffect(() => {
  const debouncedResize = debounce(() => {
    // Recalculate layout only after resize stops
    handleWindowResize();
  }, 300);
  
  window.addEventListener('resize', debouncedResize);
  return () => window.removeEventListener('resize', debouncedResize);
}, []);
```

### 3. **Auto-save Form**
```javascript
const debouncedSave = debounce((formData) => {
  // Save to database only after user stops typing
  saveFormData(formData);
}, 2000);

const handleInputChange = (data) => {
  debouncedSave(data);
};
```

### 4. **Autocomplete with validation**
```javascript
const debouncedValidate = debounce((email) => {
  // Check if email exists only after user stops typing
  checkEmailAvailability(email);
}, 800);
```

**Benefits in React**:
- Reduces API calls (saves bandwidth and server load)
- Prevents multiple re-renders
- Better user experience
- Cleaner component code

---

## 10. How would you optimize an autocomplete search?

**Complete solution combining all techniques**:

### 1. **Debounce API calls** (wait for user to stop typing)
```javascript
const debouncedSearch = debounce((query) => {
  fetchSuggestions(query);
}, 300);
```

### 2. **Memoize results** (cache search results)
```javascript
const searchCache = {};
const memoizedSearch = (query) => {
  if (searchCache[query]) return searchCache[query];
  
  const results = performSearch(query);
  searchCache[query] = results;
  return results;
};
```

### 3. **Throttle dropdown rendering** (for large result sets)
```javascript
const throttledRender = throttle(() => {
  updateDropdownUI();
}, 100);
```

### 4. **Local filtering** (filter cached results without API call)
```javascript
// If searching "java" after "jav" is cached, filter locally
const localFilter = (query, cachedResults) => {
  return cachedResults.filter(item => 
    item.toLowerCase().startsWith(query.toLowerCase())
  );
};
```

### 5. **Min characters before search** (prevent too many requests)
```javascript
if (query.length < 3) return; // Wait until user types 3+ chars
debouncedSearch(query);
```

### 6. **Limit results** (prevent huge lists)
```javascript
const MAX_RESULTS = 10;
const limitedResults = results.slice(0, MAX_RESULTS);
```

### 7. **Loading state** (show user activity is happening)
```javascript
const [isLoading, setIsLoading] = useState(false);
const [results, setResults] = useState([]);

const handleSearch = (query) => {
  if (!cachedResults[query]) {
    setIsLoading(true);
  }
  debouncedSearch(query);
};
```

### **Complete Optimized Component**:
```javascript
function AutocompleteSearch() {
  const [input, setInput] = useState("");
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const cacheRef = useRef({});
  
  const fetchAndCache = useCallback((query) => {
    // Check cache first
    if (cacheRef.current[query]) {
      setResults(cacheRef.current[query]);
      setIsLoading(false);
      return;
    }
    
    // If not cached, fetch from API
    setIsLoading(true);
    fetch(`/api/search?q=${query}`)
      .then(r => r.json())
      .then(data => {
        cacheRef.current[query] = data;
        setResults(data);
        setIsLoading(false);
      });
  }, []);
  
  const debouncedSearch = useCallback(
    debounce((query) => {
      if (query.length >= 3) {
        fetchAndCache(query);
      }
    }, 300),
    [fetchAndCache]
  );
  
  return (
    <div>
      <input 
        value={input}
        onChange={(e) => {
          setInput(e.target.value);
          debouncedSearch(e.target.value);
        }}
        placeholder="Search..."
      />
      {isLoading && <div>Loading...</div>}
      <ul>
        {results.slice(0, 10).map(item => (
          <li key={item.id}>{item.name}</li>
        ))}
      </ul>
    </div>
  );
}
```

**Optimization techniques summary**:
1. ✓ Debounce API calls (prevent excessive requests)
2. ✓ Memoize/cache results (reuse previous searches)
3. ✓ Throttle rendering (if needed for large lists)
4. ✓ Minimum character threshold (start searching after 3+ chars)
5. ✓ Limit results (show only top 10)
6. ✓ Loading state (user feedback)
7. ✓ Local filtering (don't call API for similar queries)

**Result**: Faster UX, fewer API calls, better performance! 🚀