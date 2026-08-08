#debounce in js

Search Box

↓

Username Validation

↓

API Search

↓

Auto Complete

↓

Save Draft


Typing

A

AB

ABC

ABCD

ABCDE

──────────────

500ms Wait

↓

One API Call

Debouncing delayes the exccution pf a function  untila  specific time has passed  sinc ethe last call.
if the function called again before delay expiries, the timer resets
the function only executes when the calls stops coming for the specified duration.
it uses a stetimeout  to shedule a  callback  afetr the delay.

ex: if elevator door , when someone approches the door stays open , if anotheer person arrives , the timer resest and door stays a open longer
the door closes only in the specific time if no one approches for that particular of time.


ex:

fucntion debounce(fun, delay )
{
  let timeoutID;
  retuyrn fucntion(...args){
    clearTimeout(timeoutId) //clear any existing timer
    temeoutID = setTimeout(() => { //set a new timer
      fn.apply(this, args)
    }delay)
  }
}

const debounceSearch = debounce((query) => {
  cosole.log('searching for', query)
  fetchSearchResults(query)
},300)

input.addEventListener('input',(e) => {
  debounceSearch(e.target.value)
})

step bt step:

User types:  h     e     l     l     o     [stops]
             │     │     │     │     │         │
Time (ms):   0    50   100   150   200       500
             │     │     │     │     │         │
Timer:     start  reset reset reset reset   FIRES!
             │     │     │     │     │         │
                                              └── fn('hello') executes

                                              User types “h” — timer starts (300ms countdown)


User types “e” (50ms later) — timer resets (new 300ms countdown)
User types “l” (100ms later) — timer resets again
User types another “l” (150ms later) — timer resets again
User types “o” (200ms later) — timer resets again
User stops typing — timer expires after 300ms
Function executes once with “hello”


<!-- Throttling -->

Scrolling

↓

Mouse Move

↓

Window Resize

↓

Game Controls

↓

Infinite Scroll

Visual flow:

User Scrolls

██████████████████

↓

Every 500ms

↓

Execute Once
 
 It ensures a function at most once within specified time interval.
 unlike debouncing, throttling guratnees regular execution duering the continuos events - it doesnt wait for events to stop.

 ex real life: it is like a water faucet with a flow restrictor, no matter how much
 you turn the handle, wate ronly flows at a maximum rate.
 the restrictor ensures consistent output regardless of input pressure.

 code: 
 function throttle(fn, interval) {
  let lastTime =0;
  return function(...args){
    const now  = Date.now()
    //only execure if enough time is passed
    if(now - lastTime >= interval){
    lastTime = now
    fn.apply(this,args)
    }
  }
 }

 //usage: update position at most every 100ms while scrolling
 const throttledScroll =  throttle(() => {
  cosnole.log('scroll: position',window.scrollY)
  updateScrollIndicator()
 },100)

 window.addEVentListener('scroll', throttledScroll)

 step by step:

 Scroll events: ─●──●──●──●──●──●──●──●──●──●──●──●──●──●──●─►
               │  │  │  │  │  │  │  │  │  │  │  │  │  │  │
Time (ms):     0  10 20 30 40 50 60 70 80 90 100 110 120...
               │                          │              │
Executes:      ✓ (first call)             ✓ (100ms)      ✓ (200ms)
               └──────────────────────────┴──────────────┴──►

               First scroll event at 0ms — function executes immediately
Events at 10ms, 20ms… 90ms — ignored (within 100ms window)
Event at 100ms — function executes (100ms has passed)
Events at 110ms, 120ms… 190ms — ignored
Event at 200ms — function executes again

Note: Throttle guarantees a function runs every X milliseconds during continuous activity.
where as debounce waist for activity to stop.

Debounce vs Throttle comparison:

┌─────────────────────────────────────────────────────────────────────────────┐
│                    DEBOUNCE VS THROTTLE COMPARISON                           │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  Raw Events (e.g., keystrokes, scroll):                                      │
│  ─●─●─●─●─●─●─●─●─●─●─●─●─●─●─●─●───────────●─●─●─●─●────────►              │
│   └─────────────────────────────┘           └─────────┘                      │
│         Burst 1                               Burst 2                        │
│                                                                              │
│  ─────────────────────────────────────────────────────────────────────────── │
│                                                                              │
│  DEBOUNCE (300ms):                                                           │
│  Waits for events to stop, then fires once                                   │
│                                                                              │
│  ────────────────────────────────────●────────────────────●────────►        │
│                                      │                    │                  │
│                                   Fires!               Fires!                │
│                            (300ms after              (300ms after            │
│                             last event)               last event)            │
│                                                                              │
│  ─────────────────────────────────────────────────────────────────────────── │
│                                                                              │
│  THROTTLE (100ms):                                                           │
│  Fires at regular intervals during activity                                  │
│                                                                              │
│  ─●───────●───────●───────●───────●────────●───────●───────●────►           │
│   │       │       │       │       │        │       │       │                 │
│   0ms    100ms   200ms   300ms   400ms   ...ms    ...ms   ...ms             │
│                                                                              │
│  Guarantees execution every 100ms while events continue                      │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘

Aspect	Debounce	Throttle
Executes	After events stop	During events, at intervals
Guarantees	Single execution per burst	Regular execution rate
Best for	Final value matters (search)	Continuous updates (scroll position)
During 1000ms of events	1 execution (at end)	~10 executions (every 100ms)


when to use:

┌─────────────────────────────────────────────────────────────────────────────┐
│                       WHICH TECHNIQUE SHOULD I USE?                          │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│                    ┌─────────────────────────┐                               │
│                    │  You have a function    │                               │
│                    │  being called too often │                               │
│                    └───────────┬─────────────┘                               │
│                                │                                             │
│                                ▼                                             │
│           ┌────────────────────────────────────────┐                         │
│           │  Do you need updates DURING activity?  │                         │
│           └────────────────────┬───────────────────┘                         │
│                    ┌───────────┴───────────┐                                 │
│                    │                       │                                 │
│                   YES                      NO                                │
│                    │                       │                                 │
│                    ▼                       ▼                                 │
│          ┌─────────────────┐     ┌─────────────────────┐                     │
│          │    THROTTLE     │     │  Do you only care   │                     │
│          │                 │     │  about the FINAL    │                     │
│          │  • Scroll       │     │  value?             │                     │
│          │  • Resize       │     └──────────┬──────────┘                     │
│          │  • Mouse move   │           ┌────┴────┐                           │
│          │  • Game loops   │          YES       NO                           │
│          │  • Progress     │           │         │                           │
│          │                 │           ▼         ▼                           │
│          └─────────────────┘  ┌────────────┐ ┌────────────┐                  │
│                               │  DEBOUNCE  │ │  Consider  │                  │
│                               │            │ │  both or   │                  │
│                               │ • Search   │ │  leading   │                  │
│                               │ • Auto-save│ │  debounce  │                  │
│                               │ • Validate │ │            │                  │
│                               │ • Resize   │ └────────────┘                  │
│                               │   (final)  │                                 │
│                               └────────────┘                                 │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘

common use cases:

Use Case	Technique	Why
Search autocomplete	Debounce	Only fetch after user stops typing
Form validation	Debounce	Validate after user finishes input
Auto-save drafts	Debounce	Save after user pauses editing
Window resize layout	Debounce	Recalculate once at final size
Scroll position tracking	Throttle	Need regular position updates
Infinite scroll	Throttle	Check proximity to bottom regularly
Mouse move tooltips	Throttle	Update position smoothly
Rate-limited API calls	Throttle	Respect API rate limits
Button click (prevent double)	Debounce (leading)	Execute first click, ignore rapid repeats
Live preview	Throttle	Show changes without lag

Leading vs Trailing Edge:

Both debounce and throttle can execute on the leading edge (immediatly on first call) or trailig edge (after delat/at end of interval). some
implementations support both.

Trailing edge:

the funtion executes afte rthe delay/interval.
ex:
 //Traiiling debounce: excutes after user stops typing
 const trailingDebounce = debounce(search, 300)
 //timlinr: type "hi" => wait 300ms  -> search("hi") executes

 Leading edge:

 it excute simmediatly on fiest call, then ignores subsequesn tcalls until the delay expires.

 function debounceLeading(fn, delay) {
  let timeoutId
  
  return function(...args) {
    // Execute immediately if no pending timeout
    if (!timeoutId) {
      fn.apply(this, args)
    }
    
    // Clear and reset the timeout
    clearTimeout(timeoutId)
    timeoutId = setTimeout(() => {
      timeoutId = null  // Allow next leading call
    }, delay)
  }
}

// Usage: Prevent double-click on submit button
const handleSubmit = debounceLeading(() => {
  console.log('Form submitted!')
  submitForm()
}, 1000)

submitButton.addEventListener('click', handleSubmit)
// First click: submits immediately
// Rapid clicks: ignored for 1 second

leading edge throttle:

function throttleLeading(fn, interval) {
  let lastTime = 0
  
  return function(...args) {
    const now = Date.now()
    
    if (now - lastTime >= interval) {
      lastTime = now
      fn.apply(this, args)
    }
  }
}

// This is actually the same as our basic throttle!
// Throttle naturally executes on leading edge

Both edges;

function debounceBothEdges(fn, delay) {
  let timeoutId
  let lastCallTime = 0
  
  return function(...args) {
    const now = Date.now()
    const timeSinceLastCall = now - lastCallTime
    
    // Leading edge: execute if enough time has passed
    if (timeSinceLastCall >= delay) {
      fn.apply(this, args)
    }
    
    lastCallTime = now
    
    // Trailing edge: also execute after delay
    clearTimeout(timeoutId)
    timeoutId = setTimeout(() => {
      fn.apply(this, args)
      lastCallTime = Date.now()
    }, delay)
  }
}


Note: the deboucne and throttle available in Lodash package.

<!-- currying -->



Def: 

It is a transformation taht coinverts a fucntion with multiple arguments into a sequence of functions, each taking a single argument.
its names after mathemeatecian Haskell curry, who formalized the concept in combinatory logic during 1930's,
through the techniques was firest described by Moses Schonfinkel in 1924.

thsi is liek instead of call add(1,2,3)  we can do bycurring add(1)(2)(3)
prociding one argument a t a time each call returns a new fucntion waiting for next argument.

// Regular function: takes all arguments at once
function add(a, b, c) {
  return a + b + c
}
add(1, 2, 3)  // 6

// Curried function: takes one argument at a time
function curriedAdd(a) {
  return function(b) {
    return function(c) {
      return a + b + c
    }
  }
}
curriedAdd(1)(2)(3)  // 6

with arrow funcions,

const add = a => b => c => a + b + c
add(1)(2)(3)  // 6

a simple anlogy,

┌─────────────────────────────────────────────────────────────────────────┐
│                    THE PIZZA RESTAURANT ANALOGY                          │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                          │
│   orderPizza(size)(crust)(toppings)                                      │
│                                                                          │
│   ┌───────────────┐     ┌───────────────┐     ┌───────────────┐          │
│   │  SIZE STATION │     │ CRUST STATION │     │TOPPING STATION│          │
│   │               │     │               │     │               │          │
│   │ "What size?"  │ ──► │ "What crust?" │ ──► │  "Toppings?"  │ ──► 🍕   │
│   │   "Large"     │     │    "Thin"     │     │  "Pepperoni"  │          │
│   │               │     │               │     │               │          │
│   └───────────────┘     └───────────────┘     └───────────────┘          │
│          │                     │                     │                   │
│          ▼                     ▼                     ▼                   │
│   Returns function       Returns function      Returns the               │
│   that remembers         that remembers        final pizza!              │
│   size="Large"           size + crust                                    │
│                                                                          │
│   Each station REMEMBERS your previous choices using closures!           │
│                                                                          │
└─────────────────────────────────────────────────────────────────────────┘

code:

const orderPizza = size => crust => topping => {
  return `${size} ${crust}-crust ${topping} pizza`
}

// Full order at once
orderPizza("Large")("Thin")("Pepperoni")
// "Large Thin-crust Pepperoni pizza"

// Or step by step
const largeOrder = orderPizza("Large")           // Remembers size
const largeThinOrder = largeOrder("Thin")        // Remembers size + crust
const myPizza = largeThinOrder("Pepperoni")      // Final pizza!
// "Large Thin-crust Pepperoni pizza"

// Create reusable "order templates"
const orderLarge = orderPizza("Large")
const orderLargeThin = orderLarge("Thin")

orderLargeThin("Mushroom")   // "Large Thin-crust Mushroom pizza"
orderLargeThin("Hawaiian")   // "Large Thin-crust Hawaiian pizza"

How it works,

const add = a => b => c => a + b + c

// Step 1: Call add(1)
const step1 = add(1)
// Returns: b => c => 1 + b + c
// The value 1 is "closed over" - remembered by the returned function

// Step 2: Call step1(2)  
const step2 = step1(2)
// Returns: c => 1 + 2 + c
// Now both 1 and 2 are remembered

// Step 3: Call step2(3)
const result = step2(3)
// Returns: 1 + 2 + 3 = 6
// All arguments collected, computation happens!

console.log(result)  // 6


┌─────────────────────────────────────────────────────────────────────────┐
│                     HOW CURRYING EXECUTES                                │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                          │
│   add(1)(2)(3)                                                           │
│                                                                          │
│   ┌─────────────────────────────────────────────────────────────────┐    │
│   │ add(1)                                                          │    │
│   │   a = 1                                                         │    │
│   │   Returns: b => c => 1 + b + c                                  │    │
│   └──────────────────────────────┬──────────────────────────────────┘    │
│                                  │                                       │
│                                  ▼                                       │
│   ┌─────────────────────────────────────────────────────────────────┐    │
│   │ (2)  ← called on returned function                              │    │
│   │   b = 2, a = 1 (from closure)                                   │    │
│   │   Returns: c => 1 + 2 + c                                       │    │
│   └──────────────────────────────┬──────────────────────────────────┘    │
│                                  │                                       │
│                                  ▼                                       │
│   ┌─────────────────────────────────────────────────────────────────┐    │
│   │ (3)  ← called on returned function                              │    │
│   │   c = 3, b = 2, a = 1 (all from closures)                       │    │
│   │   Returns: 1 + 2 + 3 = 6                                        │    │
│   └─────────────────────────────────────────────────────────────────┘    │
│                                                                          │
└─────────────────────────────────────────────────────────────────────────┘

Note: this mainly depends on CLosures to work. as you see each function is depends nested fucntion from parent function keepin alive ebven afte rparent retursns.


By usibg a curry helper(),

function curry(fn) {
  return function(a) {
    return function(b) {
      return fn(a, b)
    }
  }
}

// Usage
const add = (a, b) => a + b
const curriedAdd = curry(add)

curriedAdd(1)(2)  // 3


┌─────────────────────────────────────────────────────────────────────────┐
│              CURRYING VS PARTIAL APPLICATION                             │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                          │
│   Original: greet(greeting, punctuation, name)                           │
│                                                                          │
│   CURRYING:                                                              │
│   ─────────                                                              │
│   curriedGreet("Hello")("!")("Alice")                                    │
│        │           │         │                                           │
│        ▼           ▼         ▼                                           │
│   [1 arg]  →  [1 arg]  →  [1 arg]  →  result                             │
│                                                                          │
│   PARTIAL APPLICATION:                                                   │
│   ────────────────────                                                   │
│   partial(greet, "Hello", "!")("Alice")                                  │
│        │                         │                                       │
│        ▼                         ▼                                       │
│   [2 args fixed]       →    [1 arg]    →  result                         │
│                                                                          │
└─────────────────────────────────────────────────────────────────────────┘

Real life examples;

1 configurable logging;

// Curried logger factory
const createLogger = level => timestamp => message => {
  const time = timestamp ? new Date().toISOString() : ''
  console.log(`[${level}]${time ? ' ' + time : ''} ${message}`)
}

// Create specialized loggers
const info = createLogger('INFO')(true)
const debug = createLogger('DEBUG')(true)
const error = createLogger('ERROR')(true)

// Use them
info('Application started')     // [INFO] 2024-01-15T10:30:00.000Z Application started
debug('Processing request')     // [DEBUG] 2024-01-15T10:30:00.000Z Processing request
error('Connection failed')      // [ERROR] 2024-01-15T10:30:00.000Z Connection failed

// Logger without timestamp for development
const quickLog = createLogger('LOG')(false)
quickLog('Quick debug message')  // [LOG] Quick debug message

2 APi client factory

const createApiClient = baseUrl => endpoint => options => {
  return fetch(`${baseUrl}${endpoint}`, options)
    .then(res => res.json())
}

// Create clients for different APIs
const githubApi = createApiClient('https://api.github.com')
const myApi = createApiClient('https://api.myapp.com')

// Create endpoint-specific fetchers
const getGithubUser = githubApi('/users')
const getMyAppUsers = myApi('/users')

// Use them
getGithubUser({ method: 'GET' })
  .then(users => console.log(users))

  3 eveny handler configuration

const handleEvent = eventType => element => callback => {
  element.addEventListener(eventType, callback)
  
  // Return cleanup function
  return () => element.removeEventListener(eventType, callback)
}

// Create specialized handlers
const onClick = handleEvent('click')
const onHover = handleEvent('mouseenter')

// Attach to elements
const button = document.querySelector('#myButton')
const removeClick = onClick(button)(() => console.log('Clicked!'))

// Later: cleanup
removeClick()

4 validations functions

const isGreaterThan = min => value => value > min
const isLessThan = max => value => value < max
const hasLength = length => str => str.length === length

// Create specific validators
const isAdult = isGreaterThan(17)
const isValidAge = isLessThan(120)
const isValidZipCode = hasLength(5)

// Use with array methods
const ages = [15, 22, 45, 8, 67]
const adults = ages.filter(isAdult)  // [22, 45, 67]

const zipCodes = ['12345', '1234', '123456', '54321']
const validZips = zipCodes.filter(isValidZipCode)  // ['12345', '54321']

5 discount calculator

const applyDiscount = discountPercent => price => {
  return price * (1 - discountPercent / 100)
}

const tenPercentOff = applyDiscount(10)
const twentyPercentOff = applyDiscount(20)
const blackFridayDeal = applyDiscount(50)

tenPercentOff(100)      // 90
twentyPercentOff(100)   // 80
blackFridayDeal(100)    // 50

// Apply to multiple items
const prices = [100, 200, 50, 75]
const discountedPrices = prices.map(tenPercentOff)  // [90, 180, 45, 67.5]


Function composition:

It is a process of combing 2 or more functions to produce a new function; the output of one function becomes the inpout of the next.
In mathematics, composition is written as (f ∘ g)(x) = f(g(x)). In code, we read this as “f after g” or “first apply g, then apply f to the result.”

// Individual functions
const add10 = x => x + 10
const multiply2 = x => x * 2
const subtract5 = x => x - 5

// Manual composition (nested calls)
const result = subtract5(multiply2(add10(5)))
// Step by step: 5 → 15 → 30 → 25

// With a compose function
const composed = compose(subtract5, multiply2, add10)
composed(5)  // 25

Why compose instead of nesting? Because this:
addGreeting(capitalize(trim(getName(user))))

const processUser = compose(
  addGreeting,
  capitalize,
  trim,
  getName
)
processUser(user)


┌─────────────────────────────────────────────────────────────────────────┐
│                    THE ASSEMBLY LINE ANALOGY                             │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                          │
│   RAW INPUT ──► [Station A] ──► [Station B] ──► [Station C] ──► OUTPUT   │
│                                                                          │
│   pipe(stationA, stationB, stationC)(rawInput)                           │
│                                                                          │
│   ─────────────────────────────────────────────────────────────────────  │
│                                                                          │
│   Example: Transform user data                                           │
│                                                                          │
│   { name: "  ALICE  " }                                                  │
│         │                                                                │
│         ▼                                                                │
│   ┌─────────────┐                                                        │
│   │  getName    │  →  "  ALICE  "                                        │
│   └─────────────┘                                                        │
│         │                                                                │
│         ▼                                                                │
│   ┌─────────────┐                                                        │
│   │    trim     │  →  "ALICE"                                            │
│   └─────────────┘                                                        │
│         │                                                                │
│         ▼                                                                │
│   ┌─────────────┐                                                        │
│   │ toLowerCase │  →  "alice"                                            │
│   └─────────────┘                                                        │
│         │                                                                │
│         ▼                                                                │
│   Final output: "alice"                                                  │
│                                                                          │
└─────────────────────────────────────────────────────────────────────────┘

ompose() and pipe()
There are two ways to compose functions, differing only in direction:
Function	Direction	Reads like…
compose(f, g, h)	Right to left	Math: f(g(h(x)))
pipe(f, g, h)	Left to right	A recipe: “first f, then g, then h”


Implementing pipe()
pipe flows left-to-right, which many developers find more intuitive. It uses reduce() to chain functions together:

const pipe = (...fns) => x => fns.reduce((acc, fn) => fn(acc), x)

const getName = obj => obj.name
const toUpperCase = str => str.toUpperCase()
const addExclaim = str => str + '!'

const shout = pipe(getName, toUpperCase, addExclaim)

shout({ name: 'alice' })

// reduce trace:
// Initial: x = { name: 'alice' }
// Step 1: getName({ name: 'alice' }) → 'alice'
// Step 2: toUpperCase('alice') → 'ALICE'
// Step 3: addExclaim('ALICE') → 'ALICE!'
// Result: 'ALICE!'


Implementing compose()
compose flows right-to-left, matching mathematical notation. It uses reduceRight() instead:
const compose = (...fns) => x => fns.reduceRight((acc, fn) => fn(acc), x)

// compose processes right-to-left
const shout = compose(addExclaim, toUpperCase, getName)
shout({ name: 'alice' })  // 'ALICE!'

// This is equivalent to:
addExclaim(toUpperCase(getName({ name: 'alice' })))

ehich shoul duse:

// These produce the same result:
pipe(a, b, c)(x)      // a first, then b, then c
compose(c, b, a)(x)   // Same! c(b(a(x)))


Most developers prefer pipe because:
It reads left-to-right like English
Functions are listed in execution order
It’s easier to follow the data flow


// pipe: reads in order of execution
const processUser = pipe(
  validateInput,    // First
  sanitizeData,     // Second
  saveToDatabase,   // Third
  sendNotification  // Fourth
)

// compose: reads in reverse order
const processUser = compose(
  sendNotification, // Fourth (but listed first)
  saveToDatabase,   // Third
  sanitizeData,     // Second
  validateInput     // First (but listed last)
)


Why Currying and Composition Work Together?

Composition works best with functions that take a single argument and return a single value. But many useful functions need multiple arguments:


const add = (a, b) => a + b
const multiply = (a, b) => a * b

// This doesn't work!
const addThenMultiply = pipe(add, multiply)
addThenMultiply(1, 2)  // NaN - multiply receives one value, not two

The Solution: Currying
Currying converts multi-argument functions into chains of single-argument functions, making them perfect for composition:

// Curried versions
const add = a => b => a + b
const multiply = a => b => a * b

// Now we can compose!
const add5 = add(5)         // x => 5 + x
const double = multiply(2)  // x => 2 * x

const add5ThenDouble = pipe(add5, double)
add5ThenDouble(10)  // (10 + 5) * 2 = 30


Point-Free Style
When currying and composition combine, you can write code without explicitly mentioning the data being processed. This is called point-free style:

// With explicit data parameter (pointed style)
const processNumbers = numbers => {
  return numbers
    .filter(x => x > 0)
    .map(x => x * 2)
    .reduce((sum, x) => sum + x, 0)
}

// Point-free style (no explicit 'numbers' parameter)
const isPositive = x => x > 0
const double = x => x * 2
const sum = (a, b) => a + b

const processNumbers = pipe(
  filter(isPositive),
  map(double),
  reduce(sum, 0)
)

// Both do the same thing:
processNumbers([1, -2, 3, -4, 5])  // 18



Lodash, Ramda, and Vanilla JavaScript
Libraries like Lodash and Ramda are popular because they provide battle-tested implementations of currying, composition, and many other utilities.



Why Use a Library?
Libraries offer features our simple implementations lack:


import _ from 'lodash'

// 1. Placeholder support
const greet = _.curry((greeting, name) => `${greeting}, ${name}!`)
greet(_.__, 'Alice')('Hello')  // "Hello, Alice!"
// The __ placeholder lets you skip arguments

// 2. Works with variadic functions  
const sum = _.curry((...nums) => nums.reduce((a, b) => a + b, 0), 3)
sum(1)(2)(3)  // 6

// 3. Auto-curried utility functions
_.map(x => x * 2)([1, 2, 3])  // [2, 4, 6]
// Lodash/fp provides auto-curried, data-last versions


Ramda: Built for Composition
Ramda is designed from the ground up for functional programming:


import * as R from 'ramda'

// All functions are auto-curried
R.add(1)(2)  // 3
R.add(1, 2)  // 3

// Data-last by default
R.map(x => x * 2, [1, 2, 3])      // [2, 4, 6]
R.map(x => x * 2)([1, 2, 3])      // [2, 4, 6]

// Built-in compose and pipe
const processUser = R.pipe(
  R.prop('name'),
  R.trim,
  R.toLower
)

processUser({ name: '  ALICE  ' })  // 'alice'


Lodash/fp: Functional Lodash
Lodash provides a functional programming variant:


import fp from 'lodash/fp'

// Auto-curried, data-last
const getAdultNames = fp.pipe(
  fp.filter(user => user.age >= 18),
  fp.map(fp.get('name')),
  fp.sortBy(fp.identity)
)

const users = [
  { name: 'Charlie', age: 25 },
  { name: 'Alice', age: 17 },
  { name: 'Bob', age: 30 }
]

getAdultNames(users)  // ['Bob', 'Charlie']


Vanilla JavaScript Alternatives
You don’t always need a library. Here are vanilla implementations for common patterns:


// Curry
const curry = fn => {
  return function curried(...args) {
    return args.length >= fn.length
      ? fn(...args)
      : (...next) => curried(...args, ...next)
  }
}

// Pipe and Compose
const pipe = (...fns) => x => fns.reduce((acc, fn) => fn(acc), x)
const compose = (...fns) => x => fns.reduceRight((acc, fn) => fn(acc), x)

// Partial Application
const partial = (fn, ...presetArgs) => (...laterArgs) => fn(...presetArgs, ...laterArgs)

// Data-last map and filter
const map = fn => arr => arr.map(fn)
const filter = fn => arr => arr.filter(fn)
const reduce = (fn, initial) => arr => arr.reduce(fn, initial)


<!-- Memoization -->
without memozitastaion:

fib(40)

↓

Calculates

↓

Again

↓

Calculates Again

with memozitation:

fib(40)

↓

Store Result

↓

Next Call

↓

Return Cache


It is an optimization technique that speeds up programs by storing the results th of expensive function calls and
returns the cached resaults when the sam input accur again.the term was coined by Donald Michie in 1968,
derivies from latin word "memorandom"(to be rememebered) , which is also root "memo"

ex: think of memoziio as giving your function a notepad. before doing any calculation, the function checks notes " 
have i solve dtis exact problem before? if yes it reads answer from notepad if no calcultes results awrite sit down and then return it.

// A memoized function has three parts:
// 1. A cache to store results
// 2. A lookup to check if we've seen this input before
// 3. The original calculation as a fallback

function memoizedDouble(n) {
  // Check the cache
  if (memoizedDouble.cache[n] !== undefined) {
    console.log(`Cache hit for ${n}`)
    return memoizedDouble.cache[n]
  }
  
  // Calculate and store
  console.log(`Calculating ${n} * 2`)
  const result = n * 2
  memoizedDouble.cache[n] = result
  return result
}
memoizedDouble.cache = {}

memoizedDouble(5)  // "Calculating 5 * 2" → 10
memoizedDouble(5)  // "Cache hit for 5" → 10 (no calculation!)
memoizedDouble(7)  // "Calculating 7 * 2" → 14

How to build a memozie function,

steps 

1 basic structure

function memoize(fn) {
  const cache = new Map()  // Store results here
  
  return function(arg) {
    // Check if we've seen this argument before
    if (cache.has(arg)) {
      return cache.get(arg)
    }
    
    // Calculate, cache, and return
    const result = fn(arg)
    cache.set(arg, result)
    return result
  }
}

The returned function uses a closure to maintain access to cache even after memoize has finished executing. This is how the function “remembers” previous results.

2 handleing multiple arguments

the basic version only work siwth single arguments, for multiple arguments, we need to create a cahe key:

function memoize(fn) {
  const cache = new Map()
  
  return function(...args) {
    // Create a key from all arguments
    const key = JSON.stringify(args)
    
    if (cache.has(key)) {
      return cache.get(key)
    }
    
    const result = fn.apply(this, args)
    cache.set(key, result)
    return result
  }
}

// Now it works with multiple arguments
const add = memoize((a, b) => {
  console.log('Calculating...')
  return a + b
})

add(2, 3)  // "Calculating..." → 5
add(2, 3)  // → 5 (cached!)
add(3, 2)  // "Calculating..." → 5 (different key: "[3,2]" vs "[2,3]")

step 3 preserve this context

Using fn.apply(this, args) ensures the memoized function works correctly as a method:

const calculator = {
  multiplier: 10,
  
  calculate: memoize(function(n) {
    console.log('Calculating...')
    return n * this.multiplier  // 'this' refers to calculator
  })
}

calculator.calculate(5)  // "Calculating..." → 50
calculator.calculate(5)  // → 50 (cached, 'this' preserved)

complete implementation,

function memoize(fn) {
  const cache = new Map()
  
  return function memoized(...args) {
    const key = JSON.stringify(args)
    
    if (cache.has(key)) {
      return cache.get(key)
    }
    
    const result = fn.apply(this, args)
    cache.set(key, result)
    return result
  }
}

Note: it shines nrightest with recursive functions that have overlapping subproblemsn, ex: fibonancci


The Problem: Exponential Time Complexity

function fibonacci(n) {
  if (n <= 1) return n
  return fibonacci(n - 1) + fibonacci(n - 2)
}

// fibonacci(5) creates this call tree:
//                    fib(5)
//                   /      \
//              fib(4)      fib(3)
//             /    \       /    \
//         fib(3)  fib(2) fib(2) fib(1)
//         /   \
//     fib(2) fib(1)
//
// Notice: fib(3) is calculated TWICE
//         fib(2) is calculated THREE times

solution in Memozied fibonanci:

const fibonacci = memoize(function fib(n) {
  if (n <= 1) return n
  return fibonacci(n - 1) + fibonacci(n - 2)
})

// Now the call tree is linear:
// fib(5) → fib(4) → fib(3) → fib(2) → fib(1) → fib(0)
//                                      ↑        ↑
//                            (cached)  └────────┘

fibonacci(40)  // Returns instantly
fibonacci(50)  // Still fast — reuses cached values from fib(40)!

Note:

it has draw backs

Memoization isn’t free. It trades memory for speed, and sometimes that trade isn’t worth it.