# AI Day 6 — Tool Calling Interview Questions

## 1. What is tool calling?
**Answer:** The model produces a structured request for a named tool and arguments; the application validates and executes it.

## 2. Is the model executing the tool?
**Answer:** No. The application executes it. The model proposes the call.

## 3. Why validate tool arguments?
**Answer:** Model output can be malformed, unsafe or unauthorized. Schema and business validation protect the application.

## 4. Should authorization happen in the prompt?
**Answer:** No. Authorization must be enforced by trusted application code.

## 5. What is an agent?
**Answer:** An application workflow where the model can decide among controlled actions and continue through multiple steps toward a goal.

## 6. When should you not use an agent?
**Answer:** If the workflow is deterministic and can be expressed clearly in application code, an agent can add unnecessary latency, cost and failure modes.

## 7. How do you control an agent?
**Answer:** Use an allowlisted tool set, schema validation, authorization, timeouts, maximum steps, budgets and logging.

## 8. What is prompt injection in tool workflows?
**Answer:** Untrusted content attempts to influence model behavior or tool selection. Treat retrieved/tool content as data and enforce permissions in application code.

## 9. How would you expose Excel operations safely?
**Answer:** Expose narrow deterministic tools such as filtering or aggregation, validate parameters and user permissions on the backend, and never expose unrestricted database execution.

## 10. Tool calling vs RAG?
**Answer:** RAG retrieves information for context; tool calling allows the model to request an application operation. They can be combined.

## 11. How do you make tool execution reliable?
**Answer:** Validate inputs, use bounded execution, handle retries carefully, design idempotent operations where possible, log calls and validate outputs.

## 12. 30-second answer
**Answer:** Tool calling lets the model propose a structured action, but the backend remains responsible for validation, authorization and execution. Agents need allowlists, limits, timeouts and observability because the model is not a security boundary.
