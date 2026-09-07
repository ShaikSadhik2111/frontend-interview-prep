<!-- notes -->
<!-- TypeScript Functions & Advanced Function Typing -->

Functions in TypeScript
│
├── Function parameter types
├── Return types
├── Optional parameters
├── Default parameters
├── Rest parameters
├── Function type aliases
├── Callback typing
├── Function overloads
└── Practical frontend examples

<!-- 1 function type alias -->

Here you can define the shape of teh function

type Calculate = (a: number, b: number) => number;

const add: Calculate = (a, b) => {
    return a + b;
};

const multiply: Calculate = (a, b) => a * b;

This is useful when multiple functions must follow the same contract.

think like this,

Calculate

Input:
number + number

Output:
number

<!-- 2. callback typing -->  
<!-- very imp ****** -->

function processNumbers(
    numbers: number[],
    callback: (number: number) => void
): void {
    numbers.forEach((number) => {
        callback(number);
    });
}

processNumbers([1, 2, 3], (number) => {
    console.log(number);
});

so the contrsct is,

Input → number
Output → void

<!-- 3 optional callback -->

sometimes callback may be not provided

function fetchData(
    url: string,
    onSuccess?: (data: string) => void
): void {
    const data = `Data from ${url}`;

    onSuccess?.(data);
    //notice here
//This safely calls the callback only if it exists.
}

<!-- 4. rest parameters -->

//in js
function sum(...numbers) {
}

//in ts

function sum(...numbers: number[]): number {
    return numbers.reduce(
        (total, number) => total + number,
        0
    );
}

sum(10, 20, 30);//60

The rest parameter is typed as an array.

<!-- 5 function overlaods -->
//new comcept in ts for improvement

lets see we want,

formatValue("hello");

to return,

HELLO

and,

formatValue(10);

to return,

10.0

in tahat case we can define, overload signatures

function formatValue(value: string): string;
function formatValue(value: number): string;

then provide implementation,

function formatValue(
    value: string | number
): string {
    if (typeof value === "string") {
        return value.toUpperCase();
    }

    return value.toFixed(2);
}


structure,

Overload signatures
        ↓
Implementation signature

<!-- 6 practcial overlaod example -->


a frotend utility,

function getUser(id: number): string;
function getUser(email: string): string;

implementation,

function getUser(
    identifier: number | string
): string {
    if (typeof identifier === "number") {
        return `User ID: ${identifier}`;
    }

    return `User Email: ${identifier}`;
}


usage,

getUser(101);

getUser("user@example.com");


<!-- 7 function parameetrs (imp rule) -->

Required parameters should generally come before optional parameters.

good case,
function createUser(
    name: string,
    age?: number
) {}


invalid,

function createUser(
    age?: number,
    name: string
) {}

//note: always put required 1st then optional

//beacsue: Because TypeScript doesn't know how to skip the first parameter positionally.


<!-- 8. void in callbacks -->

a useful case,

type Callback = () => void;

This means callers don't rely on a return value.

Functions assigned to a () => void callback can still sometimes return a value; that value is simply ignored by the caller.

//rememeve rpractcial rule

Callback performs an action
↓
Caller does not use its return value
↓
void

<!-- 9 practical ex of event handler -->

type ButtonClickHandler = (
    buttonId: string
) => void;

function registerButton(
    id: string,
    onClick: ButtonClickHandler
): void {
    console.log(`Registered: ${id}`);
    onClick(id);
}

usage,


registerButton("save-button", (id) => {
    console.log(`Clicked: ${id}`);
});

in reacyt case,

Props
│
├── title: string
├── isLoading: boolean
└── onClick: () => void