# TypeScript Day 18 Mistakes / Review Notes

## 1. Prefer inference when it is clear

The exercises sometimes explicitly supplied type arguments such as `getLastItem<number>(...)`. This is valid, but TypeScript can usually infer the type:

```ts
getLastItem([1, 2, 3]);
```

Use explicit generic arguments when they improve clarity or are actually needed.

## 2. Keep generic constraints precise

`T extends HasId` means the type itself must satisfy the `HasId` shape. It does not mean that `T` must literally be the `HasId` interface.

## 3. `K extends keyof T` constrains keys

This is different from `T extends HasId`:

- `T extends HasId` constrains the object/type shape.
- `K extends keyof T` constrains the property name.

## 4. `T[K]` preserves the selected property type

A generic property accessor should return `T[K]`, not a broad union such as `string | number`, because the return type should follow the key passed by the caller.

## 5. Avoid `any` for reusable code

A generic keeps the relationship between the input and output types. Replacing a generic with `any` loses that safety.

## 6. Empty collections are an edge case

Functions such as `getLastItem` should account for an empty array and return `undefined` when no item exists.

## 7. Generic API response types do not validate runtime data

`ApiResponse<User>` describes what the program expects at compile time. Data received from an external API still needs runtime validation when the source cannot be trusted.
