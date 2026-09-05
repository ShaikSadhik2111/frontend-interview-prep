# TypeScript Interfaces and Types

## 1. What is an interface?

An interface describes the shape an object must have. It tells us which properties and methods are required, and what types they should use.

```ts
interface User {
	id: number;
	name: string;
}

const user: User = {
	id: 1,
	name: "Alice",
};
```

The object must have an `id` number and a `name` string.

## 2. What is a type alias?

A type alias gives a name to a type. It can describe an object, a primitive, a union, a tuple, or a function.

```ts
type User = {
	id: number;
	name: string;
};

type Status = "loading" | "success" | "error";
```

The `type` keyword does not create a value at runtime. It only helps TypeScript check our code while developing.

## 3. Interface vs type: what is the difference?

Both can describe the shape of an object:

```ts
interface User {
	id: number;
}

type Product = {
	id: number;
};
```

The main differences are:

- An interface is designed mainly for object shapes and can be extended or merged.
- A type alias can represent almost any type, including unions, tuples, and primitive aliases.
- Interfaces use `extends` for inheritance.
- Types use intersections such as `A & B` to combine types.
- An interface with the same name can be declared more than once, and TypeScript merges the declarations. A type alias cannot be redeclared with the same name.

In everyday object code, they often provide the same result.

## 4. When would you prefer an interface?

Prefer an interface when:

- You are describing an object or class contract.
- Other developers may extend the shape later.
- You are creating a public API, library, or reusable data model.
- You want declaration merging.

```ts
interface User {
	id: number;
	name: string;
}

interface Admin extends User {
	permissions: string[];
}
```

The `Admin` interface automatically receives `id` and `name` from `User`.

## 5. When would you prefer a type alias?

Prefer a type alias when you need a union, intersection, tuple, function type, or another type that is not just an object shape.

```ts
type ID = string | number;

type Point = [number, number];

type Result = Success | Failure;
```

Type aliases are also perfectly fine for object shapes. The choice is often based on team style and whether the type needs interface extension or declaration merging.

## 6. What does `readonly` do?

`readonly` prevents a property from being changed after the object is created through that type.

```ts
interface Account {
	readonly id: number;
	owner: string;
}

const account: Account = {
	id: 101,
	owner: "Alice",
};

account.owner = "Bob"; // Allowed
account.id = 202; // Error: id is readonly
```

`readonly` is a TypeScript check. It does not automatically freeze the object at runtime. For runtime protection, use `Object.freeze()` when appropriate.

## 7. What are optional properties?

An optional property uses `?`. It may be present, but it is not required.

```ts
interface User {
	name: string;
	email?: string;
}

const user: User = {
	name: "Alice",
};
```

Because `email` may be missing, its value can be `undefined`. Code should check for it before using it:

```ts
if (user.email) {
	console.log(user.email.toLowerCase());
}
```

## 8. What is interface extension?

Interface extension lets one interface reuse and add to another interface. Use the `extends` keyword.

```ts
interface User {
	id: number;
	name: string;
}

interface Admin extends User {
	permissions: string[];
}
```

An `Admin` must contain `id`, `name`, and `permissions`.

This is useful when several objects share common properties but one object needs extra properties.

## 9. What is an intersection type?

An intersection type combines multiple types into one type using `&`.

```ts
type HasName = {
	name: string;
};

type HasAge = {
	age: number;
};

type Person = HasName & HasAge;

const person: Person = {
	name: "Alice",
	age: 25,
};
```

`Person` must satisfy both `HasName` and `HasAge`.

## 10. Difference between `A | B` and `A & B`

### `A | B`: union type

`A | B` means the value can be either `A` or `B`.

```ts
type ID = string | number;

let userId: ID;
userId = 123; // Allowed
userId = "abc"; // Allowed
```

Think of `|` as **OR**.

When using a union, TypeScript only lets you use members that are safe for both possibilities until you narrow the type.

```ts
function printId(id: string | number) {
	console.log(id); // Allowed

	if (typeof id === "string") {
		console.log(id.toUpperCase());
	} else {
		console.log(id.toFixed(2));
	}
}
```

### `A & B`: intersection type

`A & B` means the value must be both `A` and `B` at the same time.

```ts
type HasName = {
	name: string;
};

type HasRole = {
	role: string;
};

type Employee = HasName & HasRole;

const employee: Employee = {
	name: "Alice",
	role: "Developer",
};
```

Think of `&` as **AND**.

### Easy way to remember

```ts
type StringOrNumber = string | number; // A value can be one of them
type NamedAndAged = HasName & HasAge; // A value must have both shapes
```

Use `|` when you are choosing between alternatives. Use `&` when you are combining requirements.
