# TypeScript Function Typing Interview Questions

## 1. What is function typing in TypeScript?

Function typing means describing the parameters a function accepts and the value it returns. TypeScript uses this information to catch incorrect function calls before the code runs.

```ts
function add(a: number, b: number): number {
	return a + b;
}

add(2, 3); // 5
// add("2", 3); // Error: the first argument must be a number
```

Here, both parameters must be numbers, and the function must return a number.

## 2. Why use a function type alias?

A function type alias gives a reusable name to a function contract. It is helpful when several functions should accept the same inputs and return the same type.

```ts
type MathOperation = (a: number, b: number) => number;

const add: MathOperation = (a, b) => a + b;
const multiply: MathOperation = (a, b) => a * b;
```

Both functions must accept two numbers and return a number. The alias also makes the code easier to read and maintain.

## 3. How do you type callbacks?

A callback is a function passed to another function. Describe the callback's parameters and return type where it is received.

```ts
function processUsers(
	users: string[],
	callback: (user: string) => void
): void {
	users.forEach((user) => {
		callback(user);
	});
}
```

The callback must receive one string. Its return value is not needed, so its return type is `void`.

## 4. What are rest parameters?

Rest parameters collect any number of arguments into an array. In TypeScript, the type is written after the parameter name.

```ts
function sum(...numbers: number[]): number {
	return numbers.reduce((total, number) => total + number, 0);
}

sum(10, 20, 30); // 60
```

Inside the function, `numbers` is `[10, 20, 30]`. The `number[]` type means every collected argument must be a number.

## 5. What are function overloads?

Function overloads allow one function to support different call signatures. Each overload describes a valid call, and one implementation handles the logic.

```ts
function formatValue(value: string): string;
function formatValue(value: number): string;

function formatValue(value: string | number): string {
	if (typeof value === "string") {
		return value.toUpperCase();
	}

	return value.toFixed(2);
}

formatValue("hello"); // "HELLO"
formatValue(10); // "10.00"
```

The overload signatures are visible to callers. The implementation signature is used internally.

## 6. What is the difference between a union parameter and function overloads?

A union uses one signature where a parameter can have more than one type:

```ts
function test(value: string | number): string {
	return String(value);
}
```

Overloads give each valid input its own signature:

```ts
function test(value: string): string;
function test(value: number): number;

function test(value: string | number): string | number {
	if (typeof value === "string") {
		return value.toUpperCase();
	}

	return value * 2;
}
```

The union version is simpler and gives one shared return type. The overload version can describe the relationship between the input and return types more precisely.

## 7. When should you use overloads instead of unions?

Use a union when the function behaves similarly for all input types and a shared return type is enough.

Use overloads when:

- Different input types produce different return types.
- The function accepts different combinations of parameters.
- You want precise autocomplete and type checking for callers.

Do not use overloads just to make a simple union more complicated. Choose the simpler union when it accurately describes the behavior.

## 8. How do optional callbacks work?

Add `?` to make the callback optional. Since it may be missing, call it safely with optional chaining.

```ts
function fetchData(
	url: string,
	onSuccess?: (data: string) => void
): void {
	const data = `Data from ${url}`;
	onSuccess?.(data);
}

fetchData("/users");
fetchData("/users", (data) => console.log(data));
```

Without `?.`, calling a missing callback could cause a runtime error.

## 9. Why should required parameters come before optional parameters?

Function arguments are matched by position. If an optional parameter came first, it would be unclear how to provide a later required parameter.

```ts
function createUser(name: string, age?: number): void {
	console.log(name, age);
}
```

This is clear: `name` is required and `age` is optional. TypeScript therefore requires required parameters to come before optional parameters.

If an optional value needs to come before another required value, use an options object:

```ts
function createUser(options: { age?: number; name: string }): void {
	console.log(options.name, options.age);
}
```

## 10. What does `void` mean for a callback?

For a callback, `void` means the caller does not use the callback's return value. The callback usually performs an action, such as logging or updating the screen.

```ts
function runTask(task: () => void): void {
	task();
}

runTask(() => {
	console.log("Task completed");
});
```

An important TypeScript detail is that a function returning a value can also be passed where a `void` callback is expected. The returned value is simply ignored:

```ts
runTask(() => "This result is ignored");
```
