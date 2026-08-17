// 1. Typed function
function calculateTotal(price: number, quantity: number): number {
    return price * quantity;
}

// 2. User using interface
interface User {
    id: number;
    name: string;
    email: string;
    age: number;
}

const user1: User = {
    id: 1,
    name: "Alice",
    email: "123@gmail.com",
    age: 25
};

const user2: User = {
    id: 2,
    name: "Bob",
    email: "456@gmail.com",
    age: 30
};

// User using a type alias
type UserObject = {
    id: number;
    name: string;
    email: string;
    age: number;
};

const user3: UserObject = {
    id: 3,
    name: "Charlie",
    email: "789@gmail.com",
    age: 28
};

// 3. Literal union type
type Status = "loading" | "success" | "error";

function getStatusMessage(status: Status): string {
    switch (status) {
        case "loading":
            return "Loading...";
        case "success":
            return "Success!";
        case "error":
            return "Something went wrong.";
    }
}

// 4. Type narrowing
function formatId(id: number | string): string {
    if (typeof id === "string") {
        return `ID: ${id.toUpperCase()}`;
    }

    return `ID: ${id.toFixed(0)}`;
}

// 5. unknown example
function parseValue(value: unknown): string {
    if (typeof value === "string") {
        return value.toUpperCase();
    }

    if (typeof value === "number") {
        return value.toFixed(0);
    }

    if (typeof value === "boolean") {
        return value ? "true" : "false";
    }

    return "unsupported type";
}

// Example calls
console.log(calculateTotal(100, 2));
console.log(getStatusMessage("loading"));
console.log(formatId("abc"));
console.log(formatId(123));
console.log(parseValue("hello"));
console.log(parseValue(42));
console.log(parseValue(true));
