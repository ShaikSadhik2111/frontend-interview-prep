 # TypeScript Generics: Interview Questions

 ## 1. What are generics in TypeScript?

 Generics let us write reusable code that works with different types while still keeping type safety.

 Think of a generic as a placeholder for a type. The actual type is provided when we use the function, class, or interface.

 ```ts
 function identity<T>(value: T): T {
	 return value;
 }

 const numberValue = identity(10);       // number
 const textValue = identity("hello");   // string
 ```

 The function works for both numbers and strings, and TypeScript remembers the correct type in each case.

 ## 2. Why use generics instead of `any`?

 `any` turns off type checking. Once a value becomes `any`, TypeScript allows almost anything, even code that can fail at runtime.

 ```ts
 function getValue(value: any) {
	 return value;
 }

 const result = getValue("hello");
 result.toFixed(); // TypeScript does not complain, but this fails at runtime
 ```

 A generic preserves the relationship between the input and output:

 ```ts
 function getValue<T>(value: T): T {
	 return value;
 }

 const result = getValue("hello");
 result.toUpperCase(); // valid
 // result.toFixed();  // TypeScript error
 ```

 In short:

 - `any` means: “I do not know or care about the type.”
 - A generic means: “I do not know the type yet, but I will preserve and check it.”

 ## 3. What does `<T>` represent?

 `<T>` declares a type parameter. `T` is only a conventional name for “Type”; it is not a special keyword. You could use another meaningful name, such as `<TData>` or `<TItem>`.

 ```ts
 function wrap<T>(value: T) {
	 return { value };
 }
 ```

 Here, `T` represents whatever type is passed to `wrap`:

 ```ts
 const item = wrap(42);
 // item has the type { value: number }
 ```

 The angle brackets are part of the TypeScript syntax for declaring a type parameter. They are not an HTML tag and do not create a value at runtime.

 ## 4. What is generic type inference?

 Generic type inference is when TypeScript figures out the generic type automatically from the value we pass in.

 ```ts
 function firstItem<T>(items: T[]): T {
	 return items[0];
 }

 const firstNumber = firstItem([1, 2, 3]);
 // T is inferred as number

 const firstName = firstItem(["Ada", "Grace"]);
 // T is inferred as string
 ```

 We can also provide the type explicitly when needed:

 ```ts
 const firstNumber = firstItem<number>([1, 2, 3]);
 ```

 Usually, inference makes the code shorter and easier to read.

 ## 5. What are generic constraints?

 A generic constraint limits the types that can be used for a type parameter. It is useful when a function needs a particular property or capability.

 ```ts
 function printId<T extends { id: number }>(item: T): number {
	 return item.id;
 }

 printId({ id: 1, name: "Ada" }); // valid
 // printId({ name: "Ada" });     // error: id is required
 ```

 The function still accepts different object shapes, but every accepted object must have an `id` property whose type is `number`.

 ## 6. What does `extends` mean in generic constraints?

 In a generic constraint, `extends` means “must be assignable to” or “must satisfy this shape.” It does not necessarily mean class inheritance.

 ```ts
 function getId<T extends { id: number }>(item: T) {
	 return item.id;
 }
 ```

 This says: `T` can be any type, as long as it has an `id: number` property.

 A type with extra properties is still valid because it satisfies the required shape:

 ```ts
 getId({ id: 1, title: "Book" });
 ```

 ## 7. What are generic interfaces?

 A generic interface is an interface that accepts a type parameter. It lets us reuse the same structure with different data types.

 ```ts
 interface Box<T> {
	 value: T;
 }

 const numberBox: Box<number> = { value: 100 };
 const messageBox: Box<string> = { value: "Done" };
 ```

 A common example is a reusable response structure:

 ```ts
 interface ApiResponse<T> {
	 data: T;
	 success: boolean;
	 message?: string;
 }
 ```

 ## 8. How are generics useful in API responses?

 API responses often have the same outer structure but different data inside. Generics describe that shared structure without losing the specific data type.

 ```ts
 interface ApiResponse<T> {
	 data: T;
	 success: boolean;
	 error?: string;
 }

 type User = {
	 id: number;
	 name: string;
 };

 const userResponse: ApiResponse<User> = {
	 data: { id: 1, name: "Ada" },
	 success: true,
 };

 const usersResponse: ApiResponse<User[]> = {
	 data: [{ id: 1, name: "Ada" }],
	 success: true,
 };
 ```

 Now TypeScript knows that `userResponse.data` is one `User`, while `usersResponse.data` is an array of `User` objects. This gives autocomplete and catches incorrect API data usage.

 ## 9. Explain `keyof` with generics

 `keyof T` produces a union of the property names of `T`.

 ```ts
 type User = {
	 id: number;
	 name: string;
 };

 type UserKeys = keyof User;
 // "id" | "name"
 ```

 With a generic, `K extends keyof T` means that `K` can only be a valid key of `T`.

 ```ts
 function getProperty<T, K extends keyof T>(object: T, key: K): T[K] {
	 return object[key];
 }

 const user = { id: 1, name: "Ada" };

 const name = getProperty(user, "name"); // string
 const id = getProperty(user, "id");     // number
 // getProperty(user, "email");           // error: email is not a key of user
 ```

 This is safer than using a plain `string` for `key`, because TypeScript checks that the key actually exists.

 ## 10. What does `T[K]` mean?

 `T[K]` is an indexed access type. It means: “the type of the property `K` on type `T`.”

 ```ts
 type User = {
	 id: number;
	 name: string;
 };

 type IdType = User["id"];       // number
 type NameType = User["name"];   // string
 type ValueType = User[keyof User]; // number | string
 ```

 In this function:

 ```ts
 function getProperty<T, K extends keyof T>(object: T, key: K): T[K] {
	 return object[key];
 }
 ```

 `T[K]` makes the return type depend on the key:

 - If `key` is `"id"`, the return type is `number`.
 - If `key` is `"name"`, the return type is `string`.

 That is why the function returns the correct type instead of a broad type such as `string | number` every time.

 ## 11. Difference between `T extends HasId` and `K extends keyof T`

 These constraints apply to different things.

 ### `T extends HasId`

 This constrains the type `T` itself. It says that `T` must have the structure required by `HasId`.

 ```ts
 type HasId = {
	 id: number;
 };

 function showId<T extends HasId>(item: T): number {
	 return item.id;
 }

 showId({ id: 1, name: "Ada" }); // valid
 // showId({ name: "Ada" });     // error: missing id
 ```

 Read it as: “`T` must be a type that has an `id`.”

 ### `K extends keyof T`

 This constrains the key type `K`. It says that `K` must be one of the property names in `T`.

 ```ts
 function readValue<T, K extends keyof T>(object: T, key: K): T[K] {
	 return object[key];
 }

 const book = { title: "TypeScript", pages: 300 };

 readValue(book, "title"); // valid
 readValue(book, "pages"); // valid
 // readValue(book, "author"); // error: author is not a key of book
 ```

 Read it as: “`K` must be a valid key of `T`.”

 ### Simple comparison

 | Constraint | What it restricts | Example meaning |
 | --- | --- | --- |
 | `T extends HasId` | The type `T` | `T` must contain `id` |
 | `K extends keyof T` | The key type `K` | `K` must be a property name of `T` |

 A helpful memory trick is:

 - `T extends HasId` checks the **object shape**.
 - `K extends keyof T` checks the **property name**.
