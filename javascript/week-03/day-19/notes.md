utility types,

1. why is utility types?
  
  we use this to modify the existing interfaces or types instead of creating repetative interfaces.

  lets see,

  suppose we have,
 interface User {
    id: number;
    name: string;
    email: string;
    age: number;
}

Now imagine we need:

a user update object where everything is optional
a public user object without email
a readonly user
a user with only id and name

We could create new interfaces manually, but that's repetitive.

Utility types let us transform the existing type.

2. Partial<T>

makes all properties optional.

interface User {
    id: number;
    name: string;
    email: string;
}

type UserUpdate = Partial<User>;

const update: UserUpdate = {
    name: "Sadhik"
};

all this are valid,

const update1: UserUpdate = {};

const update2: UserUpdate = {
    name: "John"
};

const update3: UserUpdate = {
    email: "john@example.com"
};

const update4: UserUpdate = {
    name: "John",
    email: "john@example.com"
};

real scenario,

This is extremely common for update APIs:
function updateUser(id: number, changes: Partial<User>) {
    // API request
}

then,

updateUser(101, {
    name: "Sadhik"
});

notes:  This is one of the most important utility types to remember.

3. Required<T>

This is opposite of partial.

it makes all properties are required.

lets see,

interface Config {
    host?: string;
    port?: number;
}

type RequiredConfig = Required<Config>;

now,
const config: RequiredConfig = {
    host: "localhost",
    port: 3000
};
//above is valid one

const config: RequiredConfig = {
    host: "localhost"
};

//now above is invalid due to port is now required

Noted:

Partial<T>
    ↓
everything optional

Required<T>
    ↓
everything required

4. Readonly<T>

This makes all properties read only.

lets see,

interface User {
    id: number;
    name: string;
}

type ReadonlyUser = Readonly<User>;

const user: ReadonlyUser = {
    id: 1,
    name: "Sadhik"
};

//trying to modify throws error

user.name = "John"; //error

Noted: readonly is a compile-time restriction. It does not automatically make the underlying JavaScript object deeply immutable at runtime.

5. Pick<T, Keys> 

This creates a type contianing only selected properties.

interface User {
    id: number;
    name: string;
    email: string;
    age: number;
}

suppose a component only needs,

id
name

we can write,

type userPreview = Pick<User, "id" | "name">;

now,

const user: UserPreview = {
    id: 1,
    name: "Sadhik"
};  //works fine

const user: UserPreview = {
    id: 1,
    name: "Sadhik",
    email: "test@example.com"
}; //throws error

Noted:
mental model,
Pick
 ↓
ALLOW-LIST
 ↓
keep these properties

6. Omit<T, Keys>

Omit basically the opposite of pick.

It creates a type containing everything except the specified properties.


interface User {
    id: number;
    name: string;
    email: string;
    password: string;
}

so we dont want to expose the password,

type PublicUser = Omit<User, "password">;

now,

const user: PublicUser = {
    id: 1,
    name: "Sadhik",
    email: "test@example.com"
};

mental model,

Pick
 ↓
keep specified properties

Omit
 ↓
remove specified properties

noted: This is extremely useful for API/domain models.

7. Record<K, T> // very important

Record creates an object type where a set of keys maps  to a particular value type.

example;

type Status = "loading" | "success" | "error";

type StatusMessages = Record<Status, string>;

now,

const messages: StatusMessages = {
    loading: "Loading...",
    success: "Completed!",
    error: "Something went wrong"
};

TypeScript requires all three keys.

this would be invalid,

const messages: StatusMessages = {
    loading: "Loading...",
    success: "Completed!"
}; // error due to error is missing as you see it is required.

another practical example,

type Role =  "admin" | "user" | "guest" ;
type Permissions = Record<Role, string[]>;

const permissions: Permissions = {
    admin: ["read", "write", "delete"],
    user: ["read", "write"],
    guest: ["read"]
};

Very useful for:

configuration maps
permission maps
status maps
route maps
feature flags
UI configuration


8. Exclude<T, U>

It works with union types.

it removes memebers from a union.

type Status = "loading" | "success" | "error";

type ErrorFreeStatus = Exclude<Status, "error">

Result,

"loading" | "success"

another example,

type Role = "admin" | "user" | "guest";

type NonAdminRole = Exclude<Role, "admin">;

Result,

"user" | "guest"

Notes:

Exclude
   ↓
REMOVE from union


9. Extract<T, U>

opposite idea, it keeps only union members taht match another union.

lets see example,

type Role = "admin" | "user" | "guest";

type UserRole = Extract<Role, "user" | "guest">;

result,

"user" | "guest"

think in this way,

Exclude → remove
Extract → keep


10. NonNullable<T>

It removed null and undefined from a type.

lets see,

type ApiResult = string | null | undefined;

type ValidResult = NonNullable<ApiResult>;

result,
string

another example,

type User = {
    id: number;
    name: string;
} | null | undefined;

type ValidUser = NonNullable<User>;

now,

ValidUser

is just,

{
    id: number;
    name: string;
}


11. ReturnType<T>

//noted: more useful in real world.

it extracts the return type of a function.

lets see,

function getUser() {
    return {
        id: 1,
        name: "Sadhik"
    };
}

type User = ReturnType<typeof getUser>;

ts understands,

type User = {
    id: number;
    name: string;
};

 So you don't need to manually duplicate the type.

 another example,

 function createProduct() {
    return {
        id: 1,
        name: "Laptop",
        price: 50000
    };
}

type Product = ReturnType<typeof createProduct>;

12. Parameters<T>

This extracts a function's parameter tuple.


function createUser(
    name: string,
    age: number
) {
    return {
        name,
        age
    };
}

then,

type UserParameters = Parameters<typeof createUser>;

result,

[string, number]

so,

type UserParameters = [string, number];

This is particularly useful when working with wrappers, higher-order functions, and reusable APIs.


Final note:

| Utility          | Meaning                      |
| ---------------- | ---------------------------- |
| `Partial<T>`     | Make everything optional     |
| `Required<T>`    | Make everything required     |
| `Readonly<T>`    | Make everything readonly     |
| `Pick<T, K>`     | Keep selected properties     |
| `Omit<T, K>`     | Remove selected properties   |
| `Record<K, T>`   | Map keys to a value type     |
| `Exclude<T, U>`  | Remove union members         |
| `Extract<T, U>`  | Keep matching union members  |
| `NonNullable<T>` | Remove `null`/`undefined`    |
| `ReturnType<T>`  | Get function return type     |
| `Parameters<T>`  | Get function parameter tuple |


rememeber this ,

OBJECT TRANSFORMATION
────────────────────────────

Partial
Required
Readonly
Pick
Omit
Record


UNION TRANSFORMATION
────────────────────────────

Exclude
Extract
NonNullable


FUNCTION TRANSFORMATION
────────────────────────────

ReturnType
Parameters