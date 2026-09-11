//exercise 1
//generic function
//create
// function getLastItem<T>(
//     items: T[]
// ): T | undefined
//test with
// number[]
// string[]
function getLastItem<T>(items: T[]): T | undefined {
    if (items.length === 0) {
        return undefined;
    }
    return items[items.length - 1];
}


console.log(getLastItem<number>([1, 2, 3])); // 3
console.log(getLastItem<string>(["a", "b", "c"])); // "c"
console.log(getLastItem<number>([])); // undefined
//2. generic array  creater 
//create
// function createArray<T>(
//     value: T,
//     length: number
// ): T[]

//ip 
// createArray("hello", 3);
// createArray("hello", 3);
//op ["hello", "hello", "hello"]

function createArray<T>(value: T, length: number): T[] {
    const result: T[] = [];
    for (let i = 0; i < length; i++) {
        result.push(value);
    }
    return result;
}
console.log(createArray<string>("hello", 3)); // ["hello", "hello", "hello"]

//3 multiple generics
// function createPair<T, U>(
//     first: T,
//     second: U
// ): [T, U]
// function createPair<T, U>(
//     first: T,
//     second: U
// ): [T, U]

// createPair("Age", 25);

// createPair(true, {
//     name: "Sadhik"
// });

function createPair<T, U>(first: T, second: U): [T, U] {
    return [first, second];
}

createPair<string, number>("Age", 25); // ["Age", 25]
createPair<boolean, { name: string }>(true, { name: "Sadhik" }); // [true, { name: "Sadhik" }]

//4 generic interface
// interface ApiResponse<T> {
//     success: boolean;
//     data: T;
//     message?: string;
// }
//create user
//Then
// ApiResponse<User>
// also create ApiResponse<User[]>
interface ApiResponse<T> {
    success: boolean;
    data: T;
    message?: string;
}

const user = {
    id: 1,
    name: "John Doe",
    email: "123@example.com"
};

const apiResponse: ApiResponse<typeof user> = {
    success: true,
    data: user,
    message: "User fetched successfully"
};

const ApiResponseArray: ApiResponse<typeof user[]> = {
    success: true,
    data: [user],
    message: "Users fetched successfully"
};

//5 generic constraints
interface hasId {
    id: number;
}

function getItemById<T extends hasId>(items: T[], id: number): T | undefined {
    return items.find(item => item.id === id);
}

const items = [
    { id: 1, name: "Item 1" },
    { id: 2, name: "Item 2" },
    { id: 3, name: "Item 3" }
];

console.log(getItemById(items, 2)); // { id: 2, name: "Item 2" }

//user

getItemById([{ id: 1, name: "User 1" }, { id: 2, name: "User 2" }], 1); // { id: 1, name: "User 1" }

//6 keyof + generic
//CREATE
// function getProperty<T, K extends keyof T>(
//     object: T,
//     key: K
// ): T[K]
//test
// const user = {
//     id: 1,
//     name: "Sadhik",
//     email: "test@example.com"
// };
//then
// getProperty(user, "name");

// getProperty(user, "id");
//try
// getProperty(user, "salary");

function getProperty<T, K extends keyof T>(object: T, key: K): T[K] {
    return object[key];
}
const user1 = {
    id: 1,
    name: "Sadhik",
    email: "123@gmail.com"
};

console.log(getProperty(user1, "name")); // "Sadhik"
console.log(getProperty(user1, "id")); // 1
// console.log(getProperty(user1, "salary")); // Error: Argument

