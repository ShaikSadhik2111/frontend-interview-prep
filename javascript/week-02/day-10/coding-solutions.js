// ====== ARRAY METHODS ======

// 1. myForEach - Execute function for each element
console.log("=== forEach ===");
const arr1 = [1, 2, 3];
arr1.forEach(num => console.log("Original:", num));

Array.prototype.myForEach = function(callback) {
    for (let i = 0; i < this.length; i++) {
        callback(this[i], i, this);
    }
};

arr1.myForEach(num => console.log("Polyfill:", num));

// 2. myMap - Transform each element and return new array
console.log("\n=== map ===");
const nums = [1, 2, 3];
console.log("Original map:", nums.map(x => x * 2)); // [2, 4, 6]

Array.prototype.myMap = function(callback) {
    const result = [];
    for (let i = 0; i < this.length; i++) {
        result.push(callback(this[i], i, this));
    }
    return result;
};

console.log("Polyfill map:", nums.myMap(x => x * 2)); // [2, 4, 6]

// 3. myFilter - Keep elements that pass test
console.log("\n=== filter ===");
const numbers = [1, 2, 3, 4, 5];
console.log("Original filter:", numbers.filter(x => x % 2 === 0)); // [2, 4]

Array.prototype.myFilter = function(callback) {
    const result = [];
    for (let i = 0; i < this.length; i++) {
        if (callback(this[i], i, this)) {
            result.push(this[i]);
        }
    }
    return result;
};

console.log("Polyfill filter:", numbers.myFilter(x => x % 2 === 0)); // [2, 4]

// 4. myFind - Return first element that passes test
console.log("\n=== find ===");
const users = [
    { id: 1, name: "Alice" },
    { id: 2, name: "Bob" }
];
console.log("Original find:", users.find(u => u.id === 2));

Array.prototype.myFind = function(callback) {
    for (let i = 0; i < this.length; i++) {
        if (callback(this[i], i, this)) {
            return this[i];
        }
    }
    return undefined;
};

console.log("Polyfill find:", users.myFind(u => u.id === 2));

// 5. myReduce - Combine all elements into single value
console.log("\n=== reduce ===");
const scores = [10, 20, 30];
console.log("Original reduce:", scores.reduce((acc, num) => acc + num, 0)); // 60

Array.prototype.myReduce = function(callback, initialValue) {
    let accumulator;
    let startIndex;

    // Distinguish an omitted initialValue from an explicitly supplied undefined.
    if (arguments.length >= 2) {
        accumulator = initialValue;
        startIndex = 0;
    } else {
        if (this.length === 0) {
            throw new TypeError("Reduce of empty array with no initial value");
        }
        accumulator = this[0];
        startIndex = 1;
    }

    for (let i = startIndex; i < this.length; i++) {
        accumulator = callback(accumulator, this[i], i, this);
    }

    return accumulator;
};

console.log("Polyfill reduce:", scores.myReduce((acc, num) => acc + num, 0)); // 60

try {
    [].myReduce((acc, num) => acc + num);
} catch (error) {
    console.log("Empty reduce error:", error.message);
}

// 6. mySome - Check if ANY element passes test
console.log("\n=== some ===");
const ages = [12, 18, 25];
console.log("Original some:", ages.some(age => age >= 18)); // true

Array.prototype.mySome = function(callback) {
    for (let i = 0; i < this.length; i++) {
        if (callback(this[i], i, this)) {
            return true;
        }
    }
    return false;
};

console.log("Polyfill some:", ages.mySome(age => age >= 18)); // true

// 7. myEvery - Check if ALL elements pass test
console.log("\n=== every ===");
const prices = [5, 10, 15];
console.log("Original every:", prices.every(p => p > 0)); // true

Array.prototype.myEvery = function(callback) {
    for (let i = 0; i < this.length; i++) {
        if (!callback(this[i], i, this)) {
            return false;
        }
    }
    return true;
};

console.log("Polyfill every:", prices.myEvery(p => p > 0)); // true

// ====== FUNCTION METHODS ======

// 8. myCall - Call function with specified 'this' and args
console.log("\n=== call ===");
const person = { name: "Alice", age: 30 };

function greet(greeting) {
    return `${greeting}, I'm ${this.name}`;
}

console.log("Original call:", greet.call(person, "Hello"));

Function.prototype.myCall = function(context, ...args) {
    context = context ?? globalThis;
    const key = Symbol("fn");

    context[key] = this;
    const result = context[key](...args);
    delete context[key];

    return result;
};

console.log("Polyfill call:", greet.myCall(person, "Hello"));

// 9. myApply - Call function with specified 'this' and array of args
console.log("\n=== apply ===");
function introduce(greeting, punctuation) {
    return `${greeting}, I'm ${this.name}${punctuation}`;
}

console.log("Original apply:", introduce.apply(person, ["Hi", "!"]));

Function.prototype.myApply = function(context, args = []) {
    context = context ?? globalThis;
    const key = Symbol("fn");

    context[key] = this;
    const result = context[key](...args);
    delete context[key];

    return result;
};

console.log("Polyfill apply:", introduce.myApply(person, ["Hi", "!"]));

// 10. myBind - Return new function with specified 'this'
console.log("\n=== bind ===");
const car = { brand: "Toyota" };

function displayBrand(color) {
    return `${this.brand} - ${color}`;
}

const boundDisplay = displayBrand.bind(car);
console.log("Original bind:", boundDisplay("Red")); // "Toyota - Red"

// Basic educational implementation: binding `this` and partial arguments.
// Limitation: does not fully reproduce native bind() constructor behavior with `new`.
Function.prototype.myBind = function(context, ...boundArgs) {
    const fn = this;

    return function(...newArgs) {
        return fn.apply(context, [...boundArgs, ...newArgs]);
    };
};

const boundDisplay2 = displayBrand.myBind(car);
console.log("Polyfill bind:", boundDisplay2("Red")); // "Toyota - Red"

// ====== PROMISE METHODS ======

// 11. myPromiseAll - Wait for all promises to resolve
console.log("\n=== Promise.all ===");

const p1 = Promise.resolve(10);
const p2 = Promise.resolve(20);

Promise.all([p1, p2]).then(results => {
    console.log("Original Promise.all:", results); // [10, 20]
});

function myPromiseAll(promises) {
    return new Promise((resolve, reject) => {
        const results = [];
        let completed = 0;

        if (promises.length === 0) {
            resolve([]);
            return;
        }

        promises.forEach((promise, index) => {
            Promise.resolve(promise)
                .then(value => {
                    results[index] = value;
                    completed++;

                    if (completed === promises.length) {
                        resolve(results);
                    }
                })
                .catch(reject);
        });
    });
}

myPromiseAll([p1, p2]).then(results => {
    console.log("Polyfill Promise.all:", results); // [10, 20]
});

// Promise.all preserves input order, not completion order.
// A rejection causes the aggregate promise to reject, but other
// already-started promises are not automatically cancelled.
