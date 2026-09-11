// TypeScript Day 18 - Generics

// 1. Generic function
function identity<T>(value: T): T {
    return value;
}

const numberValue = identity(100);
const textValue = identity("hello");

// 2. Generic function with an array
function getFirstItem<T>(items: T[]): T | undefined {
    return items[0];
}

const firstNumber = getFirstItem([1, 2, 3]);
const firstName = getFirstItem(["Sadhik", "John"]);

// 3. Multiple generic parameters
function createPair<T, U>(first: T, second: U): [T, U] {
    return [first, second];
}

const pair = createPair("Age", 25);

// 4. Generic interface
interface ApiResponse<T> {
    success: boolean;
    data: T;
    message?: string;
}

interface User {
    id: number;
    name: string;
}

const userResponse: ApiResponse<User> = {
    success: true,
    data: { id: 1, name: "Sadhik" }
};

const usersResponse: ApiResponse<User[]> = {
    success: true,
    data: [
        { id: 1, name: "Sadhik" },
        { id: 2, name: "John" }
    ]
};

// 5. Generic constraint
interface HasId {
    id: number;
}

function getId<T extends HasId>(item: T): number {
    return item.id;
}

const userId = getId({ id: 1, name: "Sadhik" });

// 6. keyof + generics
function getProperty<T, K extends keyof T>(object: T, key: K): T[K] {
    return object[key];
}

const user = {
    id: 1,
    name: "Sadhik",
    email: "test@example.com"
};

const name = getProperty(user, "name");
const id = getProperty(user, "id");

console.log(numberValue, textValue);
console.log(firstNumber, firstName);
console.log(pair);
console.log(userResponse, usersResponse);
console.log(userId);
console.log(name, id);
