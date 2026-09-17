Type Narrowing and Advanced Unions

1. Type narrowing

TS can narrow a union type after checking its value.


lets see,

function printValue(value: string | number): void {
    if (typeof value === "string") {
        console.log(value.toUpperCase());
    } else {
        console.log(value.toFixed(2));
    }
}

printValue("hello");
printValue(42);

common narrowing types,

typeof
instanceof
in
Equality checks
Truthiness checks
custom type guards

2. typeof narrowing

function formatInput(input: string | number | boolean): string {
    if (typeof input === "string") {
        return input.trim();
    }

    if (typeof input === "number") {
        return input.toFixed(2);
    }

    return input ? "Enabled" : "Disabled";
}
3. in narrowing

Use in when different object types have different properties.

lets see,


interface Admin {
    role: "admin";
    permissions: string[];
}

interface Customer {
    role: "customer";
    purchaseCount: number;
}

function describeUser(user: Admin | Customer): string {
    if ("permissions" in user) {
        return `Admin permissions: ${user.permissions.length}`;
    }

    return `Purchases: ${user.purchaseCount}`;
}

4. instanceof narrowing

Prefer unknown over any when handling values from APIs, catch blocks, or external sources.

function handleError(error: unknown): string {
    if (error instanceof Error) {
        return error.message;
    }

    return "Unknown error";
}

5. custom type guards

A custom type guard used the value is Type syntax.


interface User {
    id: number;
    name: string;
}

function isUser(value: unknown): value is User {
    if (typeof value !== "object" || value === null) {
        return false;
    }

    return (
        "id" in value &&
        typeof value.id === "number" &&
        "name" in value &&
        typeof value.name === "string"
    );
}

function processResponse(response: unknown): void {
    if (isUser(response)) {
        console.log(response.id, response.name);
    } else {
        console.log("Invalid user response");
    }
}

noted: Important: TypeScript does not automatically validate runtime data. A type guard must perform real checks.


6. Discriminated Unions

it uses a common literal property to identify the object type.

interface LoadingState {
    status: "loading";
}

interface SuccessState {
    status: "success";
    data: string[];
}

interface ErrorState {
    status: "error";
    message: string;
}

type RequestState = LoadingState | SuccessState | ErrorState;

function renderState(state: RequestState): string {
    switch (state.status) {
        case "loading":
            return "Loading...";

        case "success":
            return `Loaded ${state.data.length} records`;

        case "error":
            return `Error: ${state.message}`;
    }
}

This pattern is very common in React state management and API handling.

7. Exhaustive checking with never

Use never to ensure every union case is handled.

function assertNever(value: never): never {
    throw new Error(`Unexpected value: ${String(value)}`);
}

function getStateLabel(state: RequestState): string {
    switch (state.status) {
        case "loading":
            return "Loading";

        case "success":
            return "Success";

        case "error":
            return "Error";

        default:
            return assertNever(state);
    }
}

If you later add another state, TypeScript will report an error until you handle it.