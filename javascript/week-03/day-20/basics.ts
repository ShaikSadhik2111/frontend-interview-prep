// TypeScript Day 20 - Type Narrowing and Advanced Unions

function formatInput(input: string | number | boolean): string {
    if (typeof input === "string") {
        return input.trim().toUpperCase();
    }

    if (typeof input === "number") {
        return input.toFixed(2);
    }

    return input ? "Enabled" : "Disabled";
}

function handleError(error: unknown): string {
    if (error instanceof Error) {
        return error.message;
    }

    return "Unknown error";
}

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

interface Product {
    id: number;
    title: string;
    price: number;
}

function isProduct(value: unknown): value is Product {
    if (typeof value !== "object" || value === null) {
        return false;
    }

    return (
        "id" in value &&
        typeof value.id === "number" &&
        "title" in value &&
        typeof value.title === "string" &&
        "price" in value &&
        typeof value.price === "number"
    );
}

type RequestState =
    | { status: "loading" }
    | { status: "success"; data: string[] }
    | { status: "error"; message: string };

function assertNever(value: never): never {
    throw new Error(`Unexpected state: ${String(value)}`);
}

function renderState(state: RequestState): string {
    switch (state.status) {
        case "loading":
            return "Loading...";
        case "success":
            return `Loaded ${state.data.length} records`;
        case "error":
            return `Error: ${state.message}`;
        default:
            return assertNever(state);
    }
}

console.log(formatInput(" hello "));
console.log(formatInput(42));
console.log(formatInput(true));
console.log(handleError(new Error("Request failed")));
console.log(describeUser({ role: "admin", permissions: ["read"] }));
console.log(isProduct({ id: 1, title: "Laptop", price: 50000 }));
console.log(renderState({ status: "success", data: ["A", "B"] }));