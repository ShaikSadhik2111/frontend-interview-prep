# AI Day 3 — OpenAI API and Production Integration

## Goal

Move from LLM and prompt fundamentals to understanding how an application safely calls an AI API.

## 45-minute session

15 min API lifecycle, 10 min request/response contract, 10 min security and backend boundary, 10 min Excel-platform architecture.

## Request lifecycle

1. User submits input.
2. Frontend calls your backend.
3. Backend authenticates and authorizes.
4. Backend validates input.
5. Backend constructs the model request.
6. Model returns output.
7. Backend validates and parses output.
8. Application applies business rules.
9. Frontend receives the application response.

## API key rule

Never expose a provider API key in browser code. The frontend should call your trusted backend, which owns provider credentials.

## Structured output

When the application needs machine-readable data, prefer a defined schema and validate it. A model response is not automatically business truth.

## Excel project application

Browser -> backend -> Excel parser -> AI service -> schema validation -> business logic -> database -> frontend.

Use AI for semantic tasks such as classification, explanation and natural-language mapping. Keep deterministic calculations, authorization, database writes and business rules in application code.

## Interview questions

Why server-side API calls? How do you protect credentials? Why validate output? How do you handle timeouts? How do you control cost? How do you prevent user data from becoming trusted instructions?
