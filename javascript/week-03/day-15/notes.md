<!-- Typescript fundamentals and brush up -->
<!-- foundation -->
TypeScript
│
├── Type annotations       ✅
├── Type inference         ✅
├── Primitive types        ✅
├── Arrays                 ✅
├── Objects                ✅
├── Functions              ✅
├── Optional parameters    ✅
├── Union types            ✅
├── Literal types          ✅
├── Type narrowing         ✅
├── any                    ✅
├── unknown                ✅
├── void                   ✅
└── never                  ✅

<!-- Notes -->

why typescript?

In simple words, typescript act as a safety for JS code before it runs , in JS generally will pass a string or numebers or even boolen , so sometimes we may pass string params to number accepting function this cause type error which function fails to run the code so to prevent TS provide advance, optional safety while static typing on top JS.

lets see example:

in js:

const add= (x,y) => {
    return a+b;
}

console.log(add(1,4)); //this works fine
what about this? console.log(add('3','4')) //error which can throw error in function and this creates a problem this kind of problems can be avoided by using TS.

lets see same code in TS,
const add = (a: number, b: number): number => {
    return a + b;
};

add(10, 20);      // this works
add("10", "20");  // this before running of actual code this will throw error in compilation phase itself.

TypeScript catches many errors during development/compilation instead of waiting for runtime.


<!-- Type annotation?  -->

we can define the which type is the variabel by adding annotation this makes prevent code issue sat run time.

ex:

let age: number = 25;

let name: string = "Sadhik";

let isActive: boolean = true;

let numbers: number[] = [1, 2, 3];

let names: string[] = [
    "A",
    "B",
    "C"
];

let numbers: Array<number> = [1, 2, 3];

const users: User[] = [];


<!-- Type interface? *imp -->

In type interface we no need to annotate everything, TS can infer.

let age = 25;
so here age -> number
if tries age = '25' //throws error

no need to write unnessecary types const name: string = 'sadhik';

<!-- const ad type interface -->
const role = 'admin'; //TS may infer a literal type. 'admin'

while ,
let role = "admin" //this can eb generally inferred more brodly as string

we can go depth in this topic later...make note.

<!-- Objects -->

ex:

const user = {
    name: "Sadhik",
    age: 25
};

above one TS can infer structure automatically

you can also explictly describe,

const user: {
    name: string;
    age: number;
} = {
    name:"sadhik",
    age: 25
};
//this is not good look

so we use,

interface User {
    name: string;
    age: number;
}

const user: User = {
    name: "Sadhik",
    age: 25
};

<!-- Functions --> *imp for react
//normal function
function add(
    a: number,
    b: number
): number {
    return a + b;
}

//Arrow function
const add = (
    a: number,
    b: number
): number => {
    return a + b;
};

structure is,

function name(
    parameter: type
): returnType

<!-- Function return nothing -->

function logMessage(
    message: string
): void {  //void means the function isn't intended to return a useful value.
    console.log(message);
}

logMessage("Hello");

<!-- Optional parameters -->

function greet(
    name: string,
    age?: number
) {
    console.log(name, age);
}

greet("Sadhik");

greet("Sadhik", 25);

age → number | undefined

//this we widley use in react for components splitting

<!-- Default parameters -->

function greet(
    name: string,
    role: string = "developer"
) {
    console.log(name, role);
}

greet("Sadhik");


<!-- Union types --> very imp*****

A api can return id = number;  or id = string;
we can write like this, let id: number | string.

Now,

id = 101;      // ✅
id = "101";    // ✅
id = true;     // ❌

think,

number
   \
    OR
   /
string

<!-- Union types in function -->

function printId(
    id: number | string
) {
    console.log(id);
}

suppose we want string specifc behaviour,

function printId(
    id: number | string
) {
    if (typeof id === "string") {
        console.log(id.toUpperCase());
    } else {
        console.log(id.toFixed(0));
    }
}

//will go deeper ...make a note.

<!-- Literal Types -->

In this we can restrict a vlaue to specific values.

type Status =
    "loading"
    | "success"
    | "error";

    let status: Status;

status = "loading";  // ✅
status = "success";  // ✅
status = "error";    // ✅

status = "pending";  // ❌

// widley used in react

ex:

type ButtonVariant =
    "primary"
    | "secondary"
    | "danger";

    then,

    function Button(
    variant: ButtonVariant
) {}

we cant accidentally pass "green" until it explictly allowed it.

<!-- any -->

when we add type 'any' TS stops checkign value 

let value: any;

value = 10;
value = "hello";
value = true;
value.foo.bar();

this removes type safety.

mostly try to avoid use any.

<!-- unknown -->

we can keep value type as unknow and later can assign anything.

let value: unknown;

value = 10;
value = "hello";
value = true;

but cant directly use like this,

value.toUpperCase(); // ❌

narrow first,

if (typeof value === "string") {
    value.toUpperCase();
}

// This makes unknown much safer than any.

note:

any
 ↓
"Trust me, don't check."

unknown
 ↓
"Check before using me."

<!-- Never -->

never represents something that never successfully produces a value.

ex:

function throwError(
    message: string
): never {
    throw new Error(message);
}

common example,

function infiniteLoop(): never {
    while (true) {}
}

note:  We'll later use never for exhaustive checking.

<!-- Comparison -->

| Type        | Meaning                     |
| ----------- | --------------------------- |
| `string`    | Text                        |
| `number`    | Number                      |
| `boolean`   | true/false                  |
| `void`      | No useful return            |
| `any`       | Disable type safety         |
| `unknown`   | Unknown value; narrow first |
| `never`     | Never successfully returns  |
| `undefined` | Undefined value             |
| `null`      | Null value                  |


Done notes.
will practice exercises now.
