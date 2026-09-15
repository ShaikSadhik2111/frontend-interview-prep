# Day 20 - Type Narrowing and Advanced Unions

## Objective

Learn how TypeScript narrows union types and how to model safe application state with discriminated unions.

## Topics covered

- `typeof` narrowing for primitive values
- `instanceof` narrowing for class instances and errors
- `in` narrowing for object properties
- Equality and truthiness checks
- `unknown` versus `any`
- Custom type guards using type predicates
- Discriminated unions
- Exhaustive checking with `never`
- Runtime validation of API responses

## Why this matters in frontend development

Type narrowing is useful when handling API responses, form values, errors, event payloads, and React loading/success/error states. Discriminated unions help ensure that each state exposes only the properties that are valid for that state.

## Practice order

1. Read `basics.ts` and run the examples.
2. Complete `exercises.ts` without checking the answers.
3. Review `revision.md`.
4. Practice the questions in `interview-questions.md`.
5. Record any mistakes in `mistakes.md`.

## Important reminder

TypeScript types disappear at runtime. A type assertion does not validate external data. Use actual runtime checks or a validation library such as Zod when consuming untrusted API responses.