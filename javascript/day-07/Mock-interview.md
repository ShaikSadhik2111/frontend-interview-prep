<!-- Mock interview practice -->
## Mock Interview Practice

### Tell me about yourself

My name is Sadhik, have experiance around......intro I can manage (not writing here)
## Questions in Mock

### 1. What is JavaScript?

JavaScript is a high-level, interpreted programming language mainly used to make web pages interactive. It runs in the browser and also on the server through environments like Node.js. With JavaScript, we can handle user interactions, update the UI dynamically, make API calls, and build full web applications.

### 2. Why is JavaScript Single Threaded?

JavaScript is single threaded because it was designed to keep the language simple and safe, especially for browser tasks like updating the DOM. Single threaded means it executes one task at a time on one call stack. To still handle async work like timers, API calls, and events, JavaScript uses Web APIs, queues, and the event loop.

### 3. What is Closure?

A closure is when a function remembers variables from its outer scope even after the outer function has finished execution. It is useful for data privacy, maintaining state, and creating function factories.

Example: if an inner function uses a variable from the outer function, that variable stays available to the inner function.

### 4. Explain Event Loop.

JavaScript executes synchronous code first using the call stack. When asynchronous operations like `setTimeout`, promises, or events happen, they are handled outside the call stack. Once they are ready, their callbacks move to queues. The event loop checks whether the call stack is empty, and if it is, it pushes pending callbacks into the stack.

One important point is that microtasks like promise callbacks run before macrotasks like `setTimeout` callbacks.

### 5. Why React?

React is useful because it helps us build UI in a component-based way. That means we can split large screens into small reusable pieces. It also makes UI updates efficient using virtual DOM concepts and supports one-way data flow, which makes applications easier to manage and debug. React is widely used, has strong ecosystem support, and is a good fit for building modern frontend applications.

 