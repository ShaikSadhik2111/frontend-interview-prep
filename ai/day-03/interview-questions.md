# AI Day 3 — Interview Questions

1. Why not call an LLM directly from React? Browser code cannot safely protect a provider secret key. A backend can enforce credentials and application controls.

2. Is a backend enough for security? No. You still need authentication, authorization, input validation, output validation, rate limits and appropriate data handling.

3. Why validate model output? Model output can be malformed or semantically wrong, so deterministic checks are required before using it.

4. What should not be delegated to a prompt? Security authorization, database permissions, deterministic financial calculations and other business-critical invariants.

5. How do you handle timeouts? Use bounded timeouts, an appropriate retry policy for transient errors, clear status and observability.

6. How do you reduce cost? Reduce unnecessary context/output, choose an appropriate model, cache valid repeated work, batch suitable work and avoid uncontrolled retries.

7. What is streaming? Returning generated output incrementally instead of waiting for the full response.

8. Logging concern? Do not blindly log prompts or responses containing credentials, personal data, proprietary data or uploaded documents.

9. Excel application? Backend parses and validates the spreadsheet, calls AI for semantic tasks, validates structured output, then performs deterministic application operations.

Self-test: draw the browser -> backend -> model -> backend -> browser lifecycle and mark every trust boundary.
