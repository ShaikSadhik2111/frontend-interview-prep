**1. What is TypeScript?**
It's JavaScript with types added on top. You write code almost like normal JS, but you can say "this variable must be a number" or "this function must return a string." It catches mistakes before you even run the code.

**2. Why use TypeScript instead of JavaScript?**
JavaScript doesn't check types, so bugs like "expected a number but got a string" only show up when the app is running (or crashes). TypeScript catches these while you're typing, in your editor — saves time and prevents dumb bugs, especially in big projects.

**3. What is type inference?**
TypeScript is smart enough to guess the type even if you don't write it. If you write `let age = 25`, TypeScript automatically knows `age` is a `number` — you didn't have to say so.

**4. What is a type annotation?**
When you manually tell TypeScript the type instead of letting it guess. Example: `let age: number = 25`. The `: number` part is the annotation.

**5. Difference between `any` and `unknown`?**
Both mean "I don't know the type yet." But `any` turns off type-checking completely — you can do anything with it, even wrong things, and TypeScript won't complain. `unknown` is safer — you can't use it directly; you must first check what it actually is (like with `typeof`) before doing anything with it.

**6. What is `never`?**
It means "this can never actually happen." Used for functions that always throw an error, or loops that never end — the function never successfully returns a value.

**7. What is `void`?**
Used for functions that don't return anything. Example: a function that just `console.log`s something and returns nothing has a `void` return type.

**8. What is a union type?**
When a value can be one of several types. Written with `|`. Example: `let id: string | number` means `id` can be either a string or a number.

**9. What is type narrowing?**
Starting with a broad type (like `unknown` or a union) and using checks (like `typeof`) to figure out exactly which type it is at that point in the code. Once you check `typeof value === 'string'`, TypeScript "narrows" it and now treats `value` as a string inside that block.

**10. What are optional parameters?**
Function parameters you don't have to pass in. Marked with a `?`. Example: `function greet(name?: string)` — you can call `greet()` or `greet("Sadhik")`, both work.

**11. What is a literal type?**
Instead of a general type like `string`, you lock it to one exact value. Example: `let direction: "left"` means the variable can ONLY ever be the exact text `"left"`, nothing else.

**12. When should you avoid `any`?**
Basically always, unless you have no other choice. `any` turns off all of TypeScript's safety checks, so you lose the whole point of using TypeScript. Prefer `unknown` (safer) or proper types instead.