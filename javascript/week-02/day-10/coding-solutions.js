// ====== ARRAY METHODS ======

// 1. myForEach - Execute function for each element
console.log("=== forEach ===");
const arr1 = [1, 2, 3];

// Original Method
arr1.forEach(num => console.log("Original:", num));

// Polyfill
Array.prototype.myForEach = function(callback) {
    for (let i = 0; i < this.length; i++) {
        callback(this[i], i, this);
    }
};

arr1.myForEach(num => console.log("Polyfill:", num));


// 2. myMap - Transform each element and return new array
console.log("\n=== map ===");
const nums = [1, 2, 3];

// Original
const doubled = nums.map(x => x * 2);
console.log("Original map:", doubled); // [2, 4, 6]

// Polyfill
Array.prototype.myMap = function(callback) {
    const result = [];
    for (let i = 0; i < this.length; i++) {
        result.push(callback(this[i], i, this));
    }
    return result;
};

const doubled2 = nums.myMap(x => x * 2);
console.log("Polyfill map:", doubled2); // [2, 4, 6]


// 3. myFilter - Keep elements that pass test
console.log("\n=== filter ===");
const numbers = [1, 2, 3, 4, 5];

// Original
const evens = numbers.filter(x => x % 2 === 0);
console.log("Original filter:", evens); // [2, 4]

// Polyfill
Array.prototype.myFilter = function(callback) {
    const result = [];
    for (let i = 0; i < this.length; i++) {
        if (callback(this[i], i, this)) {
            result.push(this[i]);
        }
    }
    return result;
};

const evens2 = numbers.myFilter(x => x % 2 === 0);
console.log("Polyfill filter:", evens2); // [2, 4]


// 4. myFind - Return first element that passes test
console.log("\n=== find ===");
const users = [
    { id: 1, name: "Alice" },
    { id: 2, name: "Bob" }
];

// Original
const found = users.find(u => u.id === 2);
console.log("Original find:", found); // { id: 2, name: "Bob" }

// Polyfill
Array.prototype.myFind = function(callback) {
    for (let i = 0; i < this.length; i++) {
        if (callback(this[i], i, this)) {
            return this[i];
        }
    }
    return undefined;
};

const found2 = users.myFind(u => u.id === 2);
console.log("Polyfill find:", found2); // { id: 2, name: "Bob" }


// 5. myReduce - Combine all elements into single value
console.log("\n=== reduce ===");
const scores = [10, 20, 30];

// Original
const sum = scores.reduce((acc, num) => acc + num, 0);
console.log("Original reduce:", sum); // 60

// Polyfill
Array.prototype.myReduce = function(callback, initialValue) {
    let acc = initialValue;
    let start = 0;
    
    if (initialValue === undefined) {
        acc = this[0];
        start = 1;
    }
    
    for (let i = start; i < this.length; i++) {
        acc = callback(acc, this[i], i, this);
    }
    return acc;
};

const sum2 = scores.myReduce((acc, num) => acc + num, 0);
console.log("Polyfill reduce:", sum2); // 60


// 6. mySome - Check if ANY element passes test
console.log("\n=== some ===");
const ages = [12, 18, 25];

// Original
const hasAdult = ages.some(age => age >= 18);
console.log("Original some:", hasAdult); // true

// Polyfill
Array.prototype.mySome = function(callback) {
    for (let i = 0; i < this.length; i++) {
        if (callback(this[i], i, this)) {
            return true;
        }
    }
    return false;
};

const hasAdult2 = ages.mySome(age => age >= 18);
console.log("Polyfill some:", hasAdult2); // true


// 7. myEvery - Check if ALL elements pass test
console.log("\n=== every ===");
const prices = [5, 10, 15];

// Original
const allPositive = prices.every(p => p > 0);
console.log("Original every:", allPositive); // true

// Polyfill
Array.prototype.myEvery = function(callback) {
    for (let i = 0; i < this.length; i++) {
        if (!callback(this[i], i, this)) {
            return false;
        }
    }
    return true;
};

const allPositive2 = prices.myEvery(p => p > 0);
console.log("Polyfill every:", allPositive2); // true


// ====== FUNCTION METHODS ======

// 8. myCall - Call function with specified 'this' and args
console.log("\n=== call ===");
const person = { name: "Alice", age: 30 };

function greet(greeting) {
    return `${greeting}, I'm ${this.name}`;
}

// Original
const msg1 = greet.call(person, "Hello");
console.log("Original call:", msg1); // "Hello, I'm Alice"

// Polyfill
Function.prototype.myCall = function(context, ...args) {
    context.fn = this;
    const result = context.fn(...args);
    delete context.fn;
    return result;
};

const msg2 = greet.myCall(person, "Hello");
console.log("Polyfill call:", msg2); // "Hello, I'm Alice"


// 9. myApply - Call function with specified 'this' and array of args
console.log("\n=== apply ===");
function introduce(greeting, punctuation) {
    return `${greeting}, I'm ${this.name}${punctuation}`;
}

// Original
const msg3 = introduce.apply(person, ["Hi", "!"]);
console.log("Original apply:", msg3); // "Hi, I'm Alice!"

// Polyfill
Function.prototype.myApply = function(context, args = []) {
    context.fn = this;
    const result = context.fn(...args);
    delete context.fn;
    return result;
};

const msg4 = introduce.myApply(person, ["Hi", "!"]);
console.log("Polyfill apply:", msg4); // "Hi, I'm Alice!"


// 10. myBind - Return new function with specified 'this'
console.log("\n=== bind ===");
const car = { brand: "Toyota" };

function displayBrand(color) {
    return `${this.brand} - ${color}`;
}

// Original
const boundDisplay = displayBrand.bind(car);
console.log("Original bind:", boundDisplay("Red")); // "Toyota - Red"

// Polyfill
Function.prototype.myBind = function(context, ...args) {
    const fn = this;
    return function(...newArgs) {
        return fn.apply(context, [...args, ...newArgs]);
    };
};

const boundDisplay2 = displayBrand.myBind(car);
console.log("Polyfill bind:", boundDisplay2("Red")); // "Toyota - Red"


// ====== PROMISE METHODS ======

// 11. myPromiseAll - Wait for all promises to resolve
console.log("\n=== Promise.all ===");

// Original
const p1 = Promise.resolve(10);
const p2 = Promise.resolve(20);
Promise.all([p1, p2]).then(results => {
    console.log("Original Promise.all:", results); // [10, 20]
});

// Polyfill
function myPromiseAll(promises) {
    return new Promise((resolve, reject) => {
        const results = [];
        let completed = 0;

        promises.forEach((promise, index) => {
            Promise.resolve(promise)
                .then(value => {
                    results[index] = value;
                    completed++;
                    if (completed === promises.length) {
                        resolve(results);
                    }
                })
                .catch(error => reject(error));
        });
    });
}

myPromiseAll([p1, p2]).then(results => {
    console.log("Polyfill Promise.all:", results); // [10, 20]
});
