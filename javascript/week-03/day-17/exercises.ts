// 1. for function alias
type MathOperation = (
    a: number,
    b: number
) => number;

 const add : MathOperation = (a, b) => a + b;
 const subtract : MathOperation = (a, b) => a - b;
 const multiply : MathOperation = (a, b) => a * b;

//2 callback

function processUsers(
    users: string[],
    callback: (user: string) => void
): void {
    users.forEach((user) => {
        callback(user);
    });
}

//Call the callback for every user.
processUsers(["Alice", "Bob", "Charlie"], (user) => {
    console.log(`Processing ${user}`);
});

//3 optinnal callback

function downloadFile(
    fileName: string,
    onComplete?: () => void
): void {
    console.log(`Downloading ${fileName}...`);
    // Simulate file download
    setTimeout(() => {
        console.log(`${fileName} downloaded.`);
        if (onComplete) {
            onComplete();
        }
    }, 2000);
}

// Call the downloadFile function with an optional callback
downloadFile("example.txt", () => {
    console.log("Download complete callback executed.");
});

//4 rest parameters
function calculateAverage(
    ...numbers: number[]
): number {
    const total = numbers.reduce((sum, num) => sum + num, 0);
    return total / numbers.length;
}

calculateAverage(10, 20, 30, 40, 50); // Returns 30

//5 function overlaods
//create 
function formatUser(value: string): string;
function formatUser(value: number): string;
function formatUser(value: string | number): string {
    if (typeof value === "string") {
        return `User: ${value}`;
    } else {
        return `User ID: ${value}`;
    }
}


usage,

formatUser("sadhik");// Returns "User: sadhik"
formatUser(12345); // Returns "User ID: 12345"