Generics
│
├── Why generics exist
├── Generic functions
├── Generic type parameters
├── Multiple type parameters
├── Generic constraints
├── keyof with generics
├── Generic interfaces
└── Practical API/frontend examples

so why we need generics?

suppose if we write like this,

function getFirstItem(items: any[]): any {
    return items[0];
}

//we loose type safety, TypeScript may not know the exact type properly because of any.

We could write separate functions:

function getFirstNumber(items: number[]): number {
    return items[0];
}

function getFirstString(items: string[]): string {
    return items[0];
}

this is repetative,

so generics solve this cases,

function getFirstItem<T>(items: T[]): T | undefined {
    return items[0];
}


const number = getFirstItem([1, 2, 3]);
// number → number | undefined

const name = getFirstItem(["Sadhik", "John"]);
// name → string | undefined

Generics allow us to write reusable code while preserving type information.


<!-- so what <T> -->

function identity<T>(value: T): T {
    return value;
}

so here T means,  T = Type placeholder

example,

identity<string>("Hello");

identity<number>(100);

TS refer as,

identity("Hello");

identity(100);

thsi is hwo it looks,

T
↓
"I don't know the type yet"
↓
"When you call me,
TypeScript will determine it."

ex:

function wrap<T>(value: T): T[] {
    return [value];
}



wrap(10);

so ts understands,

T → number

number[]


<!-- Generic functions -->

function createArray<T>(value: T): T[]{
    return [value];
}


usage,

const numbers = createArray(10);
// number[]

const names = createArray("Sadhik");
// string[]


The function adapts while remaining type-safe.


<!-- multiple generic types -->

so not have to use only T,

we can use another also whcoh is U,

fucntion createPair<T, U>(first: T, second: U):[T, U] {
    return [first,second];
}

usage,

const pair = createPair("Age", 25);

TS inferes,

[string, number]

commn names;

T → Type
U → Another Type
K → Key
V → Value

<!-- Genertic interfaces -->

Generics become extremely useful with interfaces.

ex api response,

interface ApiResponse<T> {
    success: boolean;
    data: T;
}

now,

interface User {
    id: number;
    name: string;
}

we can create,

const response: ApiResponse<User> = {
    success: true,
    data: {
        id: 1,
        name: "Sadhik"
    }
};

for products,

interface Product {
    id: number;
    name: string;
}

const productResponse: ApiResponse<Product> = {
    success: true,
    data: {
        id: 1,
        name: "Laptop"
    }
};

Same reusable API structure, different data types

This is one of the most practical uses of generics in frontend development.


<!-- generic types alias -->

you can also use generics with type

type ApiResponse<T> = {
    success: boolean;
    data: T;
};

type UserResponse = ApiResponse<User>;

//usage is same 


<!-- Generic constarits -->

Sometimes you don't want T to accept absolutely anything.

ex,

function getLength<T>(value: T): number {
    return value.length;
}
//error

TypeScript doesn't know if every possible T has length.


so we can add constraint,

function getLength<T extends { length: number }>(value: T): number {
    return value.length;
}

so valid is,

getLength("Hello");

getLength([1, 2, 3]);

both  have length,


but,

getLength(123); //error

<!-- Generic Constraints with Interfaces -->

ex:

interface HasId {
    id: number;
}

now,

function getId<T extends HasId>(
    item: T
): number {
    return item.id;
}

this means,

T can be any type, as long as it has an id property.

ex:

interface User {
    id: number;
    name: string;
}

interface Product {
    id: number;
    price: number;
}

both work,

getId({
    id: 1,
    name: "Sadhik"
});

getId({
    id: 2,
    price: 500
});

<!-- Keyof with Genrics -->


suppose,

interface User {
    id: number;
    name: string;
    email: string;
}

we want a resusable function,

getProperty(user, "name");

make sure key actually exists,

generic solution,

function getProperty<T, K extends keyof T>(
    object: T,
    key: K
): T[K] {
    return object[key];
}

lets break down,

T
↓
The object type

K
↓
A key

K extends keyof T
↓
K must be a valid key of T

T[K]
↓
The type of that property's value

usage,

const user = {
    id: 1,
    name: "Sadhik",
    email: "test@example.com"
};

const name = getProperty(user, "name");

ts knows,
name → string


note:
a constraint is a way to limit the types that a generic type parameter can accep