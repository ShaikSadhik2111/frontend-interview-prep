//1.  Write a function that accepts:
//string | number | boolean | null
// Return:

// uppercase string

// number with two decimals

// "true" or "false"

// "empty" for null

function formatValue(value: string | number | boolean | null): string {
    if (typeof value === 'string') {
        return value.toUpperCase();
    } else if (typeof value === 'number') {
        return value.toFixed(2);
    } else if (typeof value === 'boolean') {
        return value ? "true" : "false";
    } else if (value === null) {
        return "empty";
    }   
}
console.log(formatValue("hello")); // "HELLO"
console.log(formatValue(3.14159)); // "3.14"
console.log(formatValue(true)); // "true"
console.log(formatValue(false)); // "false"
console.log(formatValue(null)); // "empty"

//2. Create these interfaces:
// interface Dog {
//     kind: "dog";
//     bark(): string;
// }

// interface Cat {
//     kind: "cat";
//     meow(): string;
// }

//Create a function that accepts Dog | Cat and calls the correct method.

interface Dog {
    kind: "dog";
    bark(): string;
}

interface Cat {
    kind: "cat";
    meow(): string;
}

type Animal = Dog | Cat;

function makeSound(animal: Animal): void {
    if (animal.kind === "dog") {
        console.log(animal.bark());
    } else if (animal.kind === "cat") {
        console.log(animal.meow());
    }
}

//3. create a custom type guard


// interface Product {
//     id: number;
//     title: string;
//     price: number;
// }

//The guard should verify that an unknown value is a valid Product.

interface Product {
    id: number;
    title: string;
    price: number;
}

function isProduct(value: unknown): value is Product {
    return (
        typeof value === 'object' &&
        value !== null &&
        'id' in value &&
        'title' in value &&
        'price' in value &&
        typeof (value as Product).id === 'number' &&
        typeof (value as Product).title === 'string' &&
        typeof (value as Product).price === 'number'
    );
}

// 5. Add a new state to above one  and confirm that your assertNever implementation catches the missing case.

function assertNever(value: never): never {
    throw new Error(`Unexpected value: ${value}`);
}


function isProductWithCategory(value: unknown): value is Product & { category: string } {
    return (
        isProduct(value) &&
        'category' in value &&
        typeof (value as Product & { category: string }).category === 'string'
    );
}