# Day 17 Mistakes / Review Notes

## 1. Invalid stray text

Avoid leaving plain English such as `usage,` directly inside a `.ts` file. It is parsed as code and causes a TypeScript error.

## 2. Empty rest-parameter input

`calculateAverage()` would otherwise divide by zero and produce `NaN`. The exercise now explicitly returns `0` for an empty input.

## 3. Function overload implementation

Overload signatures describe the public call shapes. The implementation must accept all of those input types, so `string | number` is used internally.

## 4. Callback safety

Optional callbacks should be invoked with optional chaining (`callback?.()`) or an equivalent guard.

## 5. Consistent formatting

Use standard spacing around declarations and keep examples executable where practical. Learning notes can explain concepts, but `.ts` files should remain valid TypeScript.