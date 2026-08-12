Topic,

| Topic                     |   Time |
| ------------------------- | -----: |
| What is a Polyfill?       | 15 min |
| `map` / `forEach`         | 30 min |
| `filter` / `find`         | 25 min |
| `reduce`                  | 30 min |
| `some` / `every`          | 15 min |
| `call` / `apply` / `bind` | 35 min |
| `Promise.all`             | 25 min |
| Interview coding          | 25 min |


As discussed in previous topics...

A polyfill is a code that provides functonality that may not exit in native in an environment.

best defination:
A polyfill is a custom implementation that reproduces the behaviour of a built in js feature.

ex:

[1,2,3].map(...)

internally js provides Array.prototype.map

we are going to create someting like :

Array.prototype.myMap = function (callback) {
  //implementation
}

Then:

[1, 2, 3].myMap(...) -> this will behave simila rto [1,2,3].map(...)

<!-- now map() in polyfill -->

original..

const numbers = [1, 2, 3];

const result = numbers.map((num) => num * 2); 
op: [2, 4, 6]

now in polyfill way,

Array.prototype.myMap = function (callback) {
  const result = [];
  for( let i=0; i < this.length; i++){
    result.push(callback(this[i], i , this));
  }
  return result;
}

to test:

const numbers = [1, 2, 3];

console.log(
    numbers.myMap((num) => num * 2)
);

// here this refered to the numbers in inside Array.prototype.myMap = function ()  when you call numbers.myMap(...)

<!-- forEach() in polyfill -->
 as discussed like map forEach not return  new array.

 Array.prototype.myForEach = function (callback) {
    for (let i = 0; i < this.length; i++) {
        callback(this[i], i, this);
    }
};

to use:

[1, 2, 3].myForEach((value) => {
    console.log(value);
});

why no array return for forEach() -> because its purpose is side effects/iteration, not transformation.


<!-- filter() polyfill -->

original:

const result = [1, 2, 3, 4].filter(
    (num) => num > 2
);

op: [3, 4]

by polyfill,

Array.prototype.myFilter = function (callback) {
    const result = [];

    for (let i = 0; i < this.length; i++) {
        if (callback(this[i], i, this)) {
            result.push(this[i]);
        }
    }

    return result;
};

<!-- find() polyfill -->

Note:
filter()
   ↓
returns ALL matching values

find()
   ↓
returns FIRST matching value

in polyfill,

Array.prototype.myFind = function (callback) {
    for (let i = 0; i < this.length; i++) {
        if (callback(this[i], i, this)) {
            return this[i];
        }
    }

    return undefined;
};

<!-- reduce() polyfill -->  ********

in original;

as discussed reduce will it reduces the input into single output value.

const total = [1, 2, 3, 4].reduce(
    (acc, current) => acc + current,
    0
);

op:10

in polyfill:

Array.prototype.myReduce = function (callback, initialValue) {
    let accumulator;
    let startIndex;

    if (initialValue !== undefined) {
        accumulator = initialValue;
        startIndex = 0;
    } else {
        accumulator = this[0];
        startIndex = 1;
    }

    for (let i = startIndex; i < this.length; i++) {
        accumulator = callback(
            accumulator,
            this[i],
            i,
            this
        );
    }

    return accumulator;
};

flow:

[1, 2, 3, 4]

acc = 0

0 + 1 = 1
1 + 2 = 3
3 + 3 = 6
6 + 4 = 10

edge case:

what happens if ?
[].reduce((acc, value) => acc + value);

throw type error

so polyfill should eventually account for this.

<!-- some() polyfill-->

if given elementes is found then satisfies the condition.

polyfill;

Array.prototype.mySome = function (callback) {
    for (let i = 0; i < this.length; i++) {
        if (callback(this[i], i, this)) {
            return true;
        }
    }

    return false;
};

Does at least one element satisfy the condition?
Notice the early return.

<!-- every() polyfill -->

check if all elements in an array passes a specified test condition,.

Do all elements satisfy the condition?
No , according to given condition it satisfies.

polyfill,

Array.prototype.myEvery = function (callback) {
    for (let i = 0; i < this.length; i++) {
        if (!callback(this[i], i, this)) {
            return false;
        }
    }

    return true;
};


For Note:


map
 ↓
Transform every element
 ↓
New Array

filter
 ↓
Select matching elements
 ↓
New Array

reduce
 ↓
Accumulate
 ↓
Single result

find
 ↓
First matching element

some
 ↓
At least one?

every
 ↓
All?

<!-- call() polyfill--> 

suppose,

const person = {
    name: "Sadhik"
};

function greet(city) {
    console.log(
        `Hello ${this.name} from ${city}`
    );
}

greet.call(person, "Hyderabad");
op:// hello  sadhik from hyderabad

call() lets you explicitly control this.

in polyfill,

Function.prototype.myCall = function (context, ...args) {
    context = context || globalThis;

    const key = Symbol();

    context[key] = this;

    const result = context[key](...args);

    delete context[key];

    return result;
};


test: greet.myCall(person, "Hyderabad");

<!-- apply() polyfill-->

Note:

call
 ↓
arguments individually

apply
 ↓
arguments as an array

ex:

greet.call(person, "Hyderabad");

greet.apply(person, ["Hyderabad"]);

in polyfill,

Function.prototype.myApply = function (
    context,
    args = []
) {
    context = context || globalThis;

    const key = Symbol();

    context[key] = this;

    const result = context[key](...args);

    delete context[key];

    return result;
};


<!-- bind() polyfill -->

it is differ from call() - execute immediatly, apply() - execute immediatly, bind() - returns a new function

for bind ex:

const person = {
    name: "John",
    age: 30,
    greet: function (city) {
        return `Hello, my name is ${this.name}, I am ${this.age} years old and I live in ${city}.`;
    }
};

const greet = person.greet;

console.log(greet.bind(person, "Hyderabad"));

in polyfill;

Function.prototype.myBind = function (
    context,
    ...boundArgs
) {
    const originalFunction = this;

    return function (...args) {
        return originalFunction.apply(
            context,
            [...boundArgs, ...args]
        );
    };
};

const boundGreet = greet.myBind(
    person,
    "Hyderabad"
);

boundGreet();

reference,

| Method    | Executes immediately? | Arguments  |
| --------- | --------------------- | ---------- |
| `call()`  | ✅                     | Individual |
| `apply()` | ✅                     | Array      |
| `bind()`  | ❌                     | Individual |
| `bind()`  | Returns function      |            |


<!-- promise.all() polyfill -->

refer code in example.js file.

reference,

Input array
    ↓
Convert values using Promise.resolve()
    ↓
Run all promises
    ↓
Track completed count
    ↓
Preserve original index
    ↓
Resolve when count === length
    ↓
Reject on first rejection


polyfill,

Promise.myAll = function (promises) {
    return new Promise((resolve, reject) => {
        const results = [];
        let completed = 0;

        if (promises.length === 0) {
            resolve([]);
            return;
        }

        promises.forEach((promise, index) => {
            Promise.resolve(promise)
                .then((value) => {
                    results[index] = value;
                    completed++;

                    if (completed === promises.length) {
                        resolve(results);
                    }
                })
                .catch(reject);
        });
    });
};

Here the trap;

the results are returned in input order, not completion order.

ex:
Promise A → 3000ms
Promise B → 500ms
Promise C → 1000ms

completion:

B
C
A
but result: [A,B,C]
*** mark imp above onel