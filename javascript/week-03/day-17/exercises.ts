// Day 17 Exercises - TypeScript Functions & Advanced Function Typing

// 1. Function type alias
 type MathOperation = (
    a: number,
    b: number
) => number;

const add: MathOperation = (a, b) => a + b;
const subtract: MathOperation = (a, b) => a - b;
const multiply: MathOperation = (a, b) => a * b;

// 2. Callback typing
function processUsers(
    users: string[],
    callback: (user: string) => void
): void {
    users.forEach(callback);
}

processUsers(["Alice", "Bob", "Charlie"], (user) => {
    console.log(`Processing ${user}`);
});

// 3. Optional callback
function downloadFile(
    fileName: string,
    onComplete?: () => void
): void {
    console.log(`Downloading ${fileName}...`);

    setTimeout(() => {
        console.log(`${fileName} downloaded.`);
        onComplete?.();
    }, 2000);
}

downloadFile("example.txt", () => {
    console.log("Download complete callback executed.");
});

// 4. Rest parameters
function calculateAverage(...numbers: number[]): number {
    if (numbers.length === 0) {
        return 0;
    }

    const total = numbers.reduce((sum, number) => sum + number, 0);
    return total / numbers.length;
}

console.log(calculateAverage(10, 20, 30, 40, 50));
console.log(calculateAverage()); // Documented edge-case behavior: returns 0.

// 5. Function overloads
function formatUser(value: string): string;
function formatUser(value: number): string;
function formatUser(value: string | number): string {
    if (typeof value === "string") {
        return `User: ${value.toUpperCase()}`;
    }

    return `User ID: ${value}`;
}

console.log(formatUser("sadhik"));
console.log(formatUser(101));
