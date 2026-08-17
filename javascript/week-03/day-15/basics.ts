// TypeScript Day 1 - Fundamentals

// Type inference
const inferredAge = 25;
const inferredName = "Sadhik";
const inferredActive = true;

// Type annotations
let age: number = 25;
let name: string = "Sadhik";
let isActive: boolean = true;

const numbers: number[] = [1, 2, 3];
const names: Array<string> = ["A", "B", "C"];

// Function typing
function add(a: number, b: number): number {
    return a + b;
}

const multiply = (a: number, b: number): number => a * b;

function logMessage(message: string): void {
    console.log(message);
}

// Optional and default parameters
function greet(name: string, age?: number): void {
    console.log(name, age);
}

function greetWithRole(name: string, role: string = "developer"): void {
    console.log(name, role);
}

// Union and literal types
type Status = "loading" | "success" | "error";
let status: Status = "loading";

function printId(id: number | string): void {
    if (typeof id === "string") {
        console.log(id.toUpperCase());
    } else {
        console.log(id.toFixed(0));
    }
}

// any disables useful type checking - avoid when possible
let unsafeValue: any = "hello";
unsafeValue = 10;

// unknown requires narrowing before use
let safeValue: unknown = "hello";
if (typeof safeValue === "string") {
    console.log(safeValue.toUpperCase());
}

// never represents a function that never successfully returns
function throwError(message: string): never {
    throw new Error(message);
}

console.log(add(10, 20));
console.log(multiply(3, 4));
logMessage("TypeScript Day 1");
greet("Sadhik");
greetWithRole("Sadhik");
printId("ABC");
printId(123);
