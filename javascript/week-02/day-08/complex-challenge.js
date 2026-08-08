// ============================================
// SEARCH COMPONENT PATTERN
// ============================================
//
// Mental Flow:
//   User Types
//        │
//        ▼
//   Debounce (500ms)
//        │
//        ▼
//   Fetch API
//        │
//        ▼
//   Display Results
//
// Key insight: We DON'T make an API call for every keystroke
// Instead, we wait 500ms after user stops typing, THEN fetch

// ============================================
// STEP 1: DEBOUNCE UTILITY (Already know this)
// ============================================

function debounce(callback, delay) {
  // Timer to hold the timeout ID
  let timer;
  
  // Return the debounced function
  return function(...args) {
    // Clear previous timer (user typed again, restart countdown)
    clearTimeout(timer);
    
    // Start new timer
    timer = setTimeout(() => {
      // After delay with no new calls, execute callback
      callback(...args);
    }, delay);
  };
}

// ============================================
// STEP 2: MOCK API SERVICE (Simulates backend)
// ============================================

// Simulate API call to backend search endpoint
// In real app: fetch('https://api.example.com/search?q=' + query)
function mockSearchAPI(query) {
  // Mock database of users
  const mockDatabase = [
    { id: 1, name: "Alice Johnson", email: "alice@example.com" },
    { id: 2, name: "Bob Smith", email: "bob@example.com" },
    { id: 3, name: "Alice Cooper", email: "acooper@example.com" },
    { id: 4, name: "Charlie Brown", email: "charlie@example.com" },
    { id: 5, name: "David Allen", email: "david@example.com" },
    { id: 6, name: "Eve Anderson", email: "eve@example.com" },
    { id: 7, name: "Frank Martinez", email: "frank@example.com" },
    { id: 8, name: "Alice Wonder", email: "awonder@example.com" },
  ];
  
  // Return a Promise (simulating async API call)
  return new Promise((resolve) => {
    // Simulate network delay (300-600ms)
    const delay = Math.random() * 300 + 300;
    
    setTimeout(() => {
      // Filter results based on query
      // Search in both name and email
      const results = mockDatabase.filter(user =>
        user.name.toLowerCase().includes(query.toLowerCase()) ||
        user.email.toLowerCase().includes(query.toLowerCase())
      );
      
      console.log(`✓ API responded after ${Math.round(delay)}ms with ${results.length} results`);
      resolve(results);
    }, delay);
  });
}

// ============================================
// STEP 3: SEARCH COMPONENT (The Main Logic)
// ============================================

class SearchComponent {
  constructor() {
    // DOM elements
    this.inputElement = null;
    this.resultsContainer = null;
    this.loadingElement = null;
    
    // State
    this.currentQuery = "";
    this.currentResults = [];
    this.isLoading = false;
    
    // Cache for previous searches to avoid redundant API calls
    this.cache = {};
    
    // Create the debounced search function
    // Waits 500ms after user stops typing before calling performSearch
    this.debouncedSearch = debounce(
      this.performSearch.bind(this),
      500
    );
  }
  
  // Initialize the component with DOM elements
  init(inputSelector, resultsSelector, loadingSelector) {
    this.inputElement = document.querySelector(inputSelector);
    this.resultsContainer = document.querySelector(resultsSelector);
    this.loadingElement = document.querySelector(loadingSelector);
    
    // Attach event listener to input
    // Each keystroke triggers debouncedSearch
    this.inputElement.addEventListener('input', (e) => {
      this.handleInput(e.target.value);
    });
    
    console.log("✓ Search component initialized");
  }
  
  // Step 1: User types - this gets called on every keystroke
  handleInput(query) {
    console.log(`\n📝 User typed: "${query}"`);
    this.currentQuery = query;
    
    // Show loading state
    this.showLoading();
    
    // Clear previous results while user is typing
    this.clearResults();
    
    // Call debounced search
    // Real search only happens after 500ms of inactivity
    this.debouncedSearch(query);
  }
  
  // Step 2: After debounce delay - perform the actual search
  async performSearch(query) {
    // Handle empty query
    if (!query || query.trim() === "") {
      this.hideLoading();
      this.clearResults();
      return;
    }
    
    console.log(`🔍 Debounce complete! Starting search for: "${query}"`);
    
    // Step 2a: Check cache first (avoid redundant API calls)
    if (this.cache[query]) {
      console.log(`✓ Cache HIT for "${query}" - using cached results`);
      this.currentResults = this.cache[query];
      this.displayResults(this.currentResults);
      this.hideLoading();
      return;
    }
    
    console.log(`⊘ Cache MISS for "${query}" - fetching from API`);
    
    try {
      // Step 3: Fetch API
      this.isLoading = true;
      this.showLoading();
      
      console.log(`📡 Making API call for: "${query}"`);
      const results = await mockSearchAPI(query);
      
      // Cache the results for future identical queries
      this.cache[query] = results;
      
      // Step 4: Display Results
      this.currentResults = results;
      this.displayResults(results);
      
    } catch (error) {
      console.error("❌ API Error:", error);
      this.showError("Failed to fetch results");
    } finally {
      this.isLoading = false;
      this.hideLoading();
    }
  }
  
  // Display results in the DOM
  displayResults(results) {
    console.log(`\n✓ Displaying ${results.length} results`);
    
    // Clear previous results
    this.resultsContainer.innerHTML = "";
    
    // Handle no results
    if (results.length === 0) {
      this.resultsContainer.innerHTML = "<p>No results found</p>";
      return;
    }
    
    // Render each result
    results.forEach((user, index) => {
      const resultItem = document.createElement("div");
      resultItem.className = "result-item";
      resultItem.innerHTML = `
        <div class="result-header">
          <strong>${user.name}</strong>
          <span class="result-id">#${user.id}</span>
        </div>
        <div class="result-email">${user.email}</div>
      `;
      this.resultsContainer.appendChild(resultItem);
      
      console.log(`  ${index + 1}. ${user.name} (${user.email})`);
    });
  }
  
  // Clear results display
  clearResults() {
    this.resultsContainer.innerHTML = "";
  }
  
  // Show loading indicator
  showLoading() {
    this.loadingElement.style.display = "block";
  }
  
  // Hide loading indicator
  hideLoading() {
    this.loadingElement.style.display = "none";
  }
  
  // Show error message
  showError(message) {
    this.resultsContainer.innerHTML = `<p class="error">${message}</p>`;
  }
  
  // Get cache statistics (for debugging)
  getCacheStats() {
    return {
      cachedQueries: Object.keys(this.cache),
      totalCached: Object.keys(this.cache).length,
    };
  }
}

// ============================================
// STEP 4: HTML & CSS (For browser implementation)
// ============================================

const HTML = `
<!DOCTYPE html>
<html>
<head>
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }
    
    body {
      font-family: Arial, sans-serif;
      background: #f5f5f5;
      padding: 20px;
    }
    
    .container {
      max-width: 600px;
      margin: 0 auto;
      background: white;
      padding: 30px;
      border-radius: 8px;
      box-shadow: 0 2px 10px rgba(0,0,0,0.1);
    }
    
    h1 {
      margin-bottom: 20px;
      color: #333;
    }
    
    .search-box {
      position: relative;
      margin-bottom: 20px;
    }
    
    input {
      width: 100%;
      padding: 12px;
      font-size: 16px;
      border: 2px solid #ddd;
      border-radius: 4px;
      transition: border-color 0.3s;
    }
    
    input:focus {
      outline: none;
      border-color: #4CAF50;
    }
    
    .loading {
      display: none;
      text-align: center;
      padding: 15px;
      color: #4CAF50;
    }
    
    .spinner {
      display: inline-block;
      animation: spin 1s linear infinite;
    }
    
    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }
    
    .results {
      max-height: 400px;
      overflow-y: auto;
    }
    
    .result-item {
      padding: 15px;
      border: 1px solid #eee;
      border-radius: 4px;
      margin-bottom: 10px;
      transition: background 0.3s;
    }
    
    .result-item:hover {
      background: #f9f9f9;
    }
    
    .result-header {
      display: flex;
      justify-content: space-between;
      margin-bottom: 5px;
    }
    
    .result-id {
      color: #999;
      font-size: 12px;
    }
    
    .result-email {
      color: #666;
      font-size: 14px;
    }
    
    .error {
      color: #d32f2f;
    }
  </style>
</head>
<body>
  <div class="container">
    <h1>Search Users</h1>
    <div class="search-box">
      <input
        type="text"
        id="search-input"
        placeholder="Search by name or email (e.g., 'Alice')..."
      />
    </div>
    <div class="loading" id="loading">
      <span class="spinner">⟳</span> Searching...
    </div>
    <div class="results" id="results"></div>
  </div>
  
  <script>
    // Initialize the search component when page loads
    const searchComponent = new SearchComponent();
    searchComponent.init('#search-input', '#results', '#loading');
    
    // Log cache stats periodically
    setInterval(() => {
      const stats = searchComponent.getCacheStats();
      if (stats.totalCached > 0) {
        console.log("Cache stats:", stats);
      }
    }, 5000);
  </script>
</body>
</html>
`;

// ============================================
// STEP 5: DEMO SIMULATION (Node.js environment)
// ============================================

console.log("=".repeat(60));
console.log("SEARCH COMPONENT - SIMULATION");
console.log("=".repeat(60));

// Create an instance of the search component
const search = new SearchComponent();

// Simulate user interactions
async function simulateUserInteraction() {
  console.log("\n📱 Simulating user typing 'alice'...\n");
  
  // Simulate typing: a, al, ali, alic, alice (5 keystrokes)
  const queries = ["a", "al", "ali", "alic", "alice"];
  
  for (let i = 0; i < queries.length; i++) {
    await new Promise(resolve => setTimeout(resolve, 150)); // 150ms between keystrokes
    search.handleInput(queries[i]);
  }
  
  // Wait for debounce to complete and API to respond
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  console.log("\n" + "=".repeat(60));
  console.log("Second search - should use cache");
  console.log("=".repeat(60));
  console.log("\n📱 User searches 'alice' again (should be faster)...\n");
  
  search.handleInput("alice");
  
  // Wait for results
  await new Promise(resolve => setTimeout(resolve, 800));
  
  console.log("\n" + "=".repeat(60));
  console.log("Cache Statistics");
  console.log("=".repeat(60));
  console.log(search.getCacheStats());
}

// Run simulation
simulateUserInteraction();

// ============================================
// KEY PATTERNS EXPLAINED
// ============================================
/*
1. DEBOUNCE:
   - User types 5 characters in quick succession
   - Only 1 API call is made (after 500ms of no typing)
   - Without debounce: 5 API calls would be made!
   - Performance gain: 80% fewer API calls

2. CACHING:
   - First search "alice": calls API, caches results
   - Second search "alice": returns cached results instantly
   - No duplicate API calls for same query

3. LOADING STATE:
   - Show loading indicator while fetching
   - Hide when results arrive
   - Better user experience

4. ERROR HANDLING:
   - Try/catch for API failures
   - Display error messages to user

5. FLOW GUARANTEE:
   User Types → Debounce 500ms → API Call → Cache Results → Display
   
   This ensures:
   - Minimum 500ms between API calls
   - Instant results for cached queries
   - Clean, responsive UI
*/

// ============================================
// INTERVIEW FOLLOW-UPS & OPTIMIZATIONS
// ============================================
/*
Q1: What if user clears the input?
A: Add a check for empty query, clear results

Q2: How to handle very slow network?
A: Add timeout for API calls, show error

Q3: How to limit results?
A: Show only top 10, add pagination

Q4: How to implement highlighting?
A: Highlight matched text in results

Q5: How to handle special characters?
A: Escape special characters, validate input

Q6: Mobile performance?
A: Increase debounce to 700-800ms, reduce results

Q7: What if API fails?
A: Implement retry logic with exponential backoff

Q8: Large dataset performance?
A: Use backend pagination, load more on scroll

Q9: Real-time suggestions?
A: Use WebSocket instead of HTTP polling

Q10: Analytics/tracking?
A: Track search queries, popular searches, click-through rate
*/
