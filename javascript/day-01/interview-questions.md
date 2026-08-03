
What is JavaScript Engine?
- A program that executes JavaScript code. Examples: V8 (Chrome), SpiderMonkey (Firefox), JavaScriptCore (Safari)

Single Threaded
- JavaScript executes one operation at a time in a single call stack, handling asynchronous operations through the event loop

Call Stack
- A data structure that keeps track of function calls. When a function is called, it's pushed onto the stack; when it returns, it's popped off

Global Execution Context
- The outermost execution context created when the script starts. Contains global variables and functions

Function Execution Context
- Created when a function is called. Contains local variables, parameters, and the 'this' reference

Memory Creation Phase
- The first phase of execution context creation where variables are allocated memory and set to 'undefined', functions are fully stored

Code Execution Phase
- The second phase where code is executed line by line, variables are assigned actual values, functions are called

Resources
JavaScript.info
https://javascript.info
Read:
Variables
Function Basics
Execution Context (through functions and scope)
