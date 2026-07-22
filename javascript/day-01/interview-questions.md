what is engine?

Runtime diagram:

┌─────────────────────────────────────────────────────────────────────────┐
│                        JAVASCRIPT RUNTIME                               │
│  ┌─────────────────────────────────────────────────────────────────┐   │
│  │                      JAVASCRIPT ENGINE (V8, SpiderMonkey, etc.) │   │
│  │  ┌───────────────────────┐    ┌───────────────────────────┐     │   │
│  │  │      CALL STACK       │    │          HEAP             │     │   │
│  │  │                       │    │                           │     │   │
│  │  │  ┌─────────────────┐  │    │   { objects stored here } │     │   │
│  │  │  │ processData()   │  │    │   [ arrays stored here ]  │     │   │
│  │  │  ├─────────────────┤  │    │   function references     │     │   │
│  │  │  │ fetchUser()     │  │    │                           │     │   │
│  │  │  ├─────────────────┤  │    │                           │     │   │
│  │  │  │ main()          │  │    │                           │     │   │
│  │  │  └─────────────────┘  │    └───────────────────────────┘     │   │
│  │  └───────────────────────┘                                      │   │
│  └─────────────────────────────────────────────────────────────────┘   │
│                                                                         │
│  ┌─────────────────────────────────────────────────────────────────┐   │
│  │                    BROWSER / NODE.js APIs                        │   │
│  │                                                                  │   │
│  │   setTimeout()    setInterval()    fetch()    DOM events         │   │
│  │   requestAnimationFrame()    IndexedDB    WebSockets             │   │
│  │                                                                  │   │
│  │   (These are handled outside of JavaScript execution!)           │   │
│  └─────────────────────────────────────────────────────────────────┘   │
│                                    │                                    │
│                                    │ callbacks                          │
│                                    ▼                                    │
│  ┌──────────────────────────────────────────────────────────────────┐  │
│  │  MICROTASK QUEUE                    TASK QUEUE (Macrotask)       │  │
│  │  ┌────────────────────────┐        ┌─────────────────────────┐   │  │
│  │  │ Promise.then()         │        │ setTimeout callback     │   │  │
│  │  │ queueMicrotask()       │        │ setInterval callback    │   │  │
│  │  │ MutationObserver       │        │ I/O callbacks           │   │  │
│  │  │ async/await (after)    │        │ UI event handlers       │   │  │
│  │  └────────────────────────┘        │ Event handlers          │   │  │
│  │         ▲                          └─────────────────────────┘   │  │
│  │         │ HIGHER PRIORITY                    ▲                   │  │
│  └─────────┼────────────────────────────────────┼───────────────────┘  │
│            │                                    │                       │
│            └──────────┬─────────────────────────┘                       │
│                       │                                                 │
│              ┌────────┴────────┐                                        │
│              │   EVENT LOOP    │                                        │
│              │                 │                                        │
│              │  "Is the call   │                                        │
│              │   stack empty?" ├──────────► Push next callback          │
│              │                 │            to call stack               │
│              └─────────────────┘                                        │
└─────────────────────────────────────────────────────────────────────────┘

def:
JavaScript engines are interpreters that parse and execute JavaScript code. Modern JavaScript engines use just-in-time (JIT) compilation to convert JavaScript code into machine code that can be executed by a computer's processor. A JavaScript engine is typically developed and used in web browsers to run client-side code but can also be used in server-side environments like Node.js.

why js is singlke threaded?

JavaScript was designed as a single-threaded language by Brendan Eich in 1995 to keep the language simple and safe for manipulating the browser's Document Object Model (DOM).

what is call stack in js?

A call stack is a mechanism for an interpreter (like the JavaScript interpreter in a web browser) to keep track of its place in a script that calls multiple functions — what function is currently being run and what functions are called from within that function, etc.

Global Execution Context in js?

In js in call stack execution work based on LIFO principle step by step.

When the JavaScript engine scans a script file, it makes an environment called the Execution Context that handles the entire transformation and execution of the code.

During the context runtime, the parser parses the source code and allocates memory for the variables and functions. The source code is generated and gets executed.

There are two types of execution contexts: global and function. 
--> The global execution context is created when a JavaScript script first starts to run, and it represents the global scope in JavaScript. 
--> A function execution context is created whenever a function is called, representing the function's local scope.

Memory Creation Phase in js?

Execution Context: Where the Magic Happens:
Before we dive into the intricacies of JavaScript execution, let’s understand the concept of the execution context. An Execution context is like a bubble or a container where all the magic happens in JavaScript. It includes everything needed to manage and execute your code effectively. Execution context manages JavaScript code in two phases:

Memory creation phase.
Code execution phase.
Let’s Discuss both phases in detail.

Memory creation phase:
The first phase of an execution context is the memory creation phase. During this stage, JavaScript prepares the groundwork by allocating memory for variables and functions, scanning for declarations, and setting up the stage for the code execution. In the memory creation phase, the execution context stores the values of variables and functions in key-value pairs.

Let’s take an example of how the memory is allocated to the variables and functions.

var n = 4;
function sum(num) {
    var ans = num + num;
    return ans;
}
var answer = sum(n);
console.log(answer);
Now as I mentioned execution context is created for this code and memory is allocated for this code. Basically what will happen is JavaScript engine assign the value to each of the variable and function like this:

Memory Creation->

key  :  value

n     :  undefined (special keyword in JavaScript)

sum   :  {
            var ans = num + num;
            return ans;
          }

answer :   undefined


Code Execution Phase: The Grand Performance
With the memory allocation complete, JavaScript moves on to the code execution phase. This is where the real performance takes place. JavaScript executes your code line by line, following the order in which it was written.

During the code execution phase, variable values are initialized according to their assignments. As you can see in the first line of the code in memory allocation phase n was declared as undefined. But now 4 is placed in the memory of n.

Get Rana MS’s stories in your inbox
Join Medium for free to get updates from this writer.

Enter your email
Subscribe

Remember me for faster sign in

Now as the code moves to the next line and as you can also see there is nothing to execute here so the code moves to line number 6 and there you can see there is a function invocation or a function is getting called. Functions in JavaScript behave differently than in any other language. Basically whenever there is a function invoked or called a brand new execution context is created. This execution context has also two phases one is memory creation and the other is code execution. Let’s see what memory allocation looks like in this:

key  :  value

num    :   undefined 

answer  :  undefined
Now after this calculation code moves to the next line of the program and as there is a return it will give the whole control back to the previous execution context.

After returning the flow of the code to the previous execution context this execution context is deleted and the code move to the next line and it will print the answer in the console as you can see.

Learn this too:
Variables
Function Basics
Execution Context (through functions and scope)

Hoisting:

Hoisting is JavaScript’s behavior of moving declarations to the top of their scope during the compilation phase, before any code is executed. When JavaScript prepares to run your code, it first scans for all variable and function declarations and “hoists” them to the top of their containing scope. Only the declarations are hoisted, not the initializations. According to the ECMAScript specification, variable declarations are instantiated when their containing environment record is created, which is why they appear to “move” to the top.

Here’s the key insight: hoisting isn’t actually moving your code around. It’s about when JavaScript becomes aware of your variables and functions during its two-phase execution process.

Intialization vs declarion?

Declaration registers a variable name within its scope.
Intialization allocates the memory and gives the variable its very first value.

ex: let a; declaation
        a = 10, intialization
        let a= 10 ; both 

Hosting moving anology;

┌─────────────────────────────────────────────────────────────────────────┐
│                     HOISTING: THE MOVING DAY ANALOGY                     │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                          │
│   BEFORE YOU ARRIVE (Compilation Phase)                                  │
│   ─────────────────────────────────────                                  │
│                                                                          │
│   ┌──────────────┐  ┌──────────────┐  ┌──────────────┐                  │
│   │  LIVING ROOM │  │   BEDROOM    │  │   KITCHEN    │                  │
│   │              │  │              │  │              │                  │
│   │   [empty]    │  │   [empty]    │  │   [empty]    │                  │
│   │              │  │              │  │              │                  │
│   │  Reserved    │  │  Reserved    │  │  Reserved    │                  │
│   │  for: sofa   │  │  for: bed    │  │  for: table  │                  │
│   └──────────────┘  └──────────────┘  └──────────────┘                  │
│                                                                          │
│   AFTER UNPACKING (Execution Phase)                                      │
│   ─────────────────────────────────                                      │
│                                                                          │
│   ┌──────────────┐  ┌──────────────┐  ┌──────────────┐                  │
│   │  LIVING ROOM │  │   BEDROOM    │  │   KITCHEN    │                  │
│   │              │  │              │  │              │                  │
│   │   [SOFA]     │  │    [BED]     │  │   [TABLE]    │                  │
│   │              │  │              │  │              │                  │
│   └──────────────┘  └──────────────┘  └──────────────┘                  │
│                                                                          │
│   JavaScript knows about all variables before execution, but their       │
│   values are only assigned when the code actually runs.                  │
│                                                                          │
└─────────────────────────────────────────────────────────────────────────┘

Types of hosting [link here](https://33jsconcepts.com/beyond/concepts/hoisting#the-four-types-of-hoisting)

Declaration Type	Hoisted?	Initialized?	Accessible Before Declaration?
var	Yes	Yes (undefined)	Yes (returns undefined)
let / const	Yes	No (TDZ)	No (ReferenceError)
Function Declaration	Yes	Yes (full function)	Yes (fully usable)
Function Expression	Depends on var/let/const	No	No
class	Yes	No (TDZ)	No (ReferenceError)
import	Yes	Yes	Yes (but side effects run first)


Temporary dead zone(TYZ):

The Temporal Dead Zone is the period between entering a scope and the actual declaration of a let or const variable. During this time, the variable exists (JavaScript knows about it), but accessing it throws a ReferenceError. Learn more about the TDZ in our dedicated Temporal Dead Zone guide.

┌─────────────────────────────────────────────────────────────────────────┐
│                        TEMPORAL DEAD ZONE (TDZ)                          │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                          │
│   function example() {                                                   │
│     // ┌─────────────────────────────────────────────┐                   │
│     // │         TEMPORAL DEAD ZONE FOR 'x'          │                   │
│     // │                                             │                   │
│     // │  console.log(x);  // ReferenceError!        │                   │
│     // │  console.log(x);  // ReferenceError!        │                   │
│     // │  console.log(x);  // ReferenceError!        │                   │
│     // └─────────────────────────────────────────────┘                   │
│                                                                          │
│     let x = 10;  // ← TDZ ends here, 'x' is now accessible               │
│                                                                          │
│     console.log(x);  // 10 ✓                                             │
│   }                                                                      │
│                                                                          │
└─────────────────────────────────────────────────────────────────────────┘

it exists to catch the bugs.

function declaration can be hoisted fully;

// This works perfectly!
sayHello("World")  // "Hello, World!"

function sayHello(name) {
  console.log(`Hello, ${name}!`)
}

this can throw erro:

// ✗ TypeError - greet is undefined, not a function
greet()  // TypeError: greet is not a function

var greet = function() {
  console.log("Hello!")
}

this too:

// ✗ ReferenceError - greet is in the TDZ
greet()  // ReferenceError: Cannot access 'greet' before initialization

const greet = function() {
  console.log("Hello!")
}

Note: Arrow functions are always expressions so they can never b hoisted as functions:
// ✗ ReferenceError
sayHi()  // ReferenceError: Cannot access 'sayHi' before initialization

const sayHi = () => {
  console.log("Hi!")
}

Momory allocation:

We have two memory allcations which are stack vs heap,

┌─────────────────────────────────────────────────────────────────────────┐
│                        MEMORY LIFECYCLE                                  │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                          │
│    ┌──────────────┐      ┌──────────────┐      ┌──────────────┐         │
│    │   ALLOCATE   │ ───► │     USE      │ ───► │   RELEASE    │         │
│    │              │      │              │      │              │         │
│    │ Reserve      │      │ Read/Write   │      │ Free memory  │         │
│    │ memory       │      │ data         │      │ when done    │         │
│    └──────────────┘      └──────────────┘      └──────────────┘         │
│                                                                          │
│    JavaScript does       You do this         Garbage collector          │
│    this automatically    explicitly          does this for you          │
│                                                                          │
└─────────────────────────────────────────────────────────────────────────┘

def: memory management is the process where your program needs it,using that memory and releasing itw hen no longer needed , in js it happens automnatically by sytem called garbage collection which tracks and free memory when it not needed which is no longer reach the code.

stack and heap are 2 types of memory:

┌─────────────────────────────────────────────────────────────────────────┐
│                    STACK vs HEAP MEMORY                                  │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                          │
│     STACK (Fast, Ordered)              HEAP (Flexible, Unordered)       │
│    ┌─────────────────────┐            ┌─────────────────────────────┐   │
│    │ let count = 42      │            │  ┌─────────────────────┐    │   │
│    ├─────────────────────┤            │  │ { name: "Alice" }   │    │   │
│    │ let active = true   │            │  └─────────────────────┘    │   │
│    ├─────────────────────┤            │       ┌───────────┐         │   │
│    │ let price = 19.99   │            │       │ [1, 2, 3] │         │   │
│    ├─────────────────────┤            │       └───────────┘         │   │
│    │ (reference to obj)──┼────────────┼──►┌─────────────────┐       │   │
│    └─────────────────────┘            │   │ { id: 1 }       │       │   │
│                                       │   └─────────────────┘       │   │
│    Primitives stored directly         │                             │   │
│    References point to heap           └─────────────────────────────┘   │
│                                        Objects stored here              │
└─────────────────────────────────────────────────────────────────────────┘


Stack memory:

whcih is fast ordered regeion of memory,
use for primitive dat atypes,references, function callinformation

Characteristics:
Fixed size, very fast access
Automatically managed (LIFO - Last In, First Out)
Memory is freed immediately when functions return
Limited in size (causes stack overflow if exceeded)


Heap momeory:

which is larger, unstructured region used for,
objects, dynamically sized data, data that outlives function calls.


Characteristics:
Dynamic size, slower access than stack
Managed by garbage collector
Memory freed only when values become unreachable
No size limit (except available system memory)


automatric allocations in js:

// Primitive allocation
const n = 123;                    // Allocates memory for a number
const s = "hello";                // Allocates memory for a string
const b = true;                   // Allocates memory for a boolean

// Object allocation
const obj = { a: 1, b: 2 };       // Allocates memory for object and values
const arr = [1, 2, 3];            // Allocates memory for array and elements
const fn = function() {};         // Allocates memory for function object

// Allocation via operations
const s2 = s.substring(0, 3);     // New string allocated
const arr2 = arr.concat([4, 5]);  // New array allocated
const obj2 = { ...obj, c: 3 };    // New object allocated

intialization in js:

Initialization in JavaScript is the process of assigning an initial value to a variable, object, or data structure at the time of its creation or before it is used. 

Scopes:
1 global scope

Variables declared outside of any function or block are in the global scope. They’re accessible from anywhere in your code.
// Global scope
const appName = "MyApp";
let userCount = 0;

function greet() {
  console.log(appName);  // ✓ Can access global variable
  userCount++;           // ✓ Can modify global variable
}

if (true) {
  console.log(appName);  // ✓ Can access global variable
}

note: In browsers, global variables become properties of the window object. In Node.js, they attach to global. The modern, universal way to access the global object is globalThis.

var oldSchool = "I'm on window";      // window.oldSchool (var only)
let modern = "I'm NOT on window";      // NOT on window

console.log(window.oldSchool);         // "I'm on window"
console.log(window.modern);            // undefined
console.log(globalThis);               // Works everywhere


2 function scope

Variables declared with var inside a function are function-scoped. They’re only accessible within that function.

function calculateTotal() {
  var subtotal = 100;
  var tax = 10;
  var total = subtotal + tax;
  
  console.log(total);  // ✓ 110
}

calculateTotal();
// console.log(subtotal);  // ✗ ReferenceError: subtotal is not defined



var Hoisting
Variables declared with var are “hoisted” to the top of their function. This means JavaScript knows about them before the code runs, but they’re initialized as undefined until the actual declaration line.


function example() {
  console.log(message);  // undefined (not an error!)
  var message = "Hello";
  console.log(message);  // "Hello"
}

// JavaScript interprets this as:
function exampleHoisted() {
  var message;           // Declaration hoisted to top
  console.log(message);  // undefined
  message = "Hello";     // Assignment stays in place
  console.log(message);  // "Hello"
}
3 block level scope


Variables declared with let and const are block-scoped. A block is any code within curly braces {}: if statements, for loops, while loops, or just standalone blocks.
if (true) {
  let blockLet = "I'm block-scoped";
  const blockConst = "Me too";
  var functionVar = "I escape the block!";
}

// console.log(blockLet);    // ✗ ReferenceError
// console.log(blockConst);  // ✗ ReferenceError
console.log(functionVar);    // ✓ "I escape the block!"

4   Lexical scope

called as static scope, means scope of variabel is determined by position in source code and not by how functions ate calle dt run time.

at "lex time" the time when the code is bneing parced - which is at why also called "static: scope.

const outer = "I'm outside!";

function outerFunction() {
  const middle = "I'm in the middle!";
  
  function innerFunction() {
    const inner = "I'm inside!";
    
    // innerFunction can access all three variables
    console.log(inner);   // ✓ Own scope
    console.log(middle);  // ✓ Parent scope
    console.log(outer);   // ✓ Global scope
  }
  
  innerFunction();
  // console.log(inner);  // ✗ ReferenceError
}

outerFunction();
// console.log(middle);   // ✗ ReferenceError

Closures: imp topis

better def:
A closure is a function together with the lexical environment in which it was created. If an inner function references variables from its outer scope, JavaScript keeps those variables alive even after the outer function has finished executing, allowing the inner function to access and modify them later.

Def: it is combination of function bundled together with refrences to its surrounding state - lexical environment;

acoording to Mozilla dev network -a closure gives a functioon access to variables from an outeer enclosing scope;

note: in every function in js creates a closure at creation time. this can be created auto every time when we create a function, then the functioin maintains a reference to its lexical environment.

just example:

Remember our office building analogy? A closure is like someone who worked in the private office, left the building, but still remembers exactly where everything was, and can still use that knowledge!

function createGreeter(greeting) {
  // 'greeting' is in createGreeter's scope
  
  return function(name) {
    // This inner function is a closure!
    // It "closes over" the 'greeting' variable
    console.log(`${greeting}, ${name}!`);
  };
}

const sayHello = createGreeter("Hello");
const sayHola = createGreeter("Hola");

// createGreeter has finished executing, but...
sayHello("Alice");  // "Hello, Alice!"
sayHola("Bob");     // "Hola, Bob!"

// The inner functions still remember their 'greeting' values!

var let vs const,
this are keywords to declare variables they has differ scope, ressign capabilities, hoisting behaviot

Feature	var	let	const
Scope	Function	Block	Block
Hoisting	Yes (undefined)	Yes (TDZ)	Yes (TDZ)
Redeclaration	Allowed	Error	Error
Reassignment	Allowed	Allowed	Error

scope vs lexical environment,

scope is determined as theoratically spavce or region in code where variabel is valid and accesible; global,function and bloack level scope

whwre as lexical scope is actial object like data structure created by js when code runs., made up local memory and referenc eto th eouter environment the parent scope.

by me defination:

scope is like declartion while code before run time and lexcial scope is static can be calle dat parsing of code.
 caled lex time.


