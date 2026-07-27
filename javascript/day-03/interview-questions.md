## What is this?
`this` is a special keyword that refers to the object that a function is called on or the global object in certain contexts.

## How is this decided?
`this` is determined by how a function is called, not where it's defined. It can be: global object, instance object (implicit binding), explicitly set (call/apply/bind), or undefined in strict mode.

## Difference between regular and arrow function?
Regular functions have their own `this` context determined by how they're called. Arrow functions don't have their own `this`—they inherit it from the enclosing scope (lexical this).

## What is lexical this?
Lexical `this` means the `this` value is determined by the scope in which a function is defined, not where it's called. Arrow functions use lexical `this`.

## What is implicit binding?
When a function is called as a method of an object, `this` is implicitly bound to that object. Example: `obj.method()` binds `this` to `obj`.

## What is explicit binding?
Explicit binding sets `this` manually using methods like `call()`, `apply()`, or `bind()`. This overrides the normal binding rules.

## Difference between call and apply?
Both invoke a function with explicit `this` binding. `call()` takes arguments as separate parameters, while `apply()` takes arguments as an array.
Example: `func.call(obj, arg1, arg2)` vs `func.apply(obj, [arg1, arg2])`

## Difference between call and bind?
`call()` invokes the function immediately with explicit `this`. `bind()` returns a new function with `this` permanently bound, but doesn't invoke it immediately.
Example: `func.call(obj)` executes now, `func.bind(obj)` returns a bound function.

## Why doesn't arrow function have its own this?
Arrow functions were designed to maintain the `this` of their surrounding context. They capture `this` lexically from their parent scope rather than creating their own binding based on how they're called.

## What happens to this in strict mode?
In strict mode, if `this` is not explicitly bound, it becomes `undefined` instead of defaulting to the global object. This prevents accidental global object modification.
