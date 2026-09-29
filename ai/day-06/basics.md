# AI Day 6 — Tool Calling Basics

## Safe execution loop
1. User sends a request.
2. Backend sends the request and allowed tool definitions to the model.
3. Model proposes a structured tool call.
4. Backend validates the tool name and arguments.
5. Backend checks authorization.
6. Backend executes the deterministic function.
7. Backend returns the result if another model step is needed.
8. Final output is validated.

## Never trust model arguments
Validate schema, ranges, resource ownership, query limits, permissions and execution limits.

## Agent loop
reason → tool call → result → next decision → final

Use maximum steps, timeouts and cost/token budgets.

## When not to use an agent
If the workflow is predictable, ordinary application code is usually simpler, cheaper and easier to test.

## Prompt injection
Retrieved documents and tool results are data, not trusted instructions. Authorization must be enforced by trusted code.

## Excel example
"Show average repair cost for Germany in 2026."
The model can select an aggregation tool, but deterministic backend code performs the arithmetic.
