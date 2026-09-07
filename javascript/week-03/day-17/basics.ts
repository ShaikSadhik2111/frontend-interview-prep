// TypeScript Day 17 - Functions & Advanced Function Typing

// 1. Function type alias
// A reusable contract for functions with the same parameter/return types.
type MathOperation = (a: number, b: number) => number;

const add: MathOperation = (a, b) => a + b;
const subtract: MathOperation = (a, b) => a - b;
const multiply: MathOperation = (a, b) => a * b;

// 2. Callback typing
function processNumbers(
    numbers: number[],
    callback: (value: number) => void
): void {
    numbers.forEach(callback);
}

processNumbers([1, 2, 3], (number) => {
    console.log(`Processing ${number}`);
});

// 3. Optional callbacks
function fetchData(
    url: string,
    onSuccess?: (data: string) => void
): void {
    const data = `Data from ${url}`;
    onSuccess?.(data);
}

fetchData("/users");
fetchData("/users", (data) => console.log(data));

// 4. Rest parameters
function sum(...numbers: number[]): number {
    return numbers.reduce((total, number) => total + number, 0);
}

// 5. Function overloads
function formatValue(value: string): string;
function formatValue(value: number): string;
function formatValue(value: string | number): string {
    if (typeof value === "string") {
        return value.toUpperCase();
    }

    return value.toFixed(2);
}

// 6. Practical overload example
function getUser(id: number): string;
function getUser(email: string): string;
function getUser(identifier: number | string): string {
    if (typeof identifier === "number") {
        return `User ID: ${identifier}`;
    }

    return `User Email: ${identifier}`;
}

// 7. Event-handler style callback
// This pattern maps directly to common frontend props/event APIs.
type ButtonClickHandler = (buttonId: string) => void;

function registerButton(
    id: string,
    onClick: ButtonClickHandler
): void {
    console.log(`Registered: ${id}`);
    onClick(id);
}

registerButton("save-button", (id) => {
    console.log(`Clicked: ${id}`);
});

console.log(add(10, 20));
console.log(subtract(20, 5));
console.log(multiply(4, 5));
console.log(sum(10, 20, 30));
console.log(formatValue("hello"));
console.log(formatValue(10));
console.log(getUser(101));
console.log(getUser("user@example.com"));
