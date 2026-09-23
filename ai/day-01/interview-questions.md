# AI Day 1 — Interview Questions

## 1. What is an LLM?

A large language model is a model trained to generate token sequences from context using patterns learned from large training datasets.

## 2. Is an LLM a database?

No. A model can generate information learned during training, but it should not be treated as an authoritative database or guaranteed source of current facts.

## 3. What is a hallucination?

Generated content that is unsupported, incorrect, or fabricated but presented as plausible output.

## 4. How do you reduce hallucination risk?

Use authoritative retrieval where appropriate, constrained/structured output, validation, deterministic rules, evaluation, and human review for high-impact workflows.

## 5. What is a token?

A unit used by the model's tokenizer. It is not equivalent to a character or necessarily a whole word.

## 6. What is a context window?

The amount of tokenized context a model can process within its supported limits.

## 7. Why does context size matter?

It can affect cost, latency and whether the model has enough relevant information. Large contexts may require chunking, summarization or retrieval.

## 8. What is structured output?

A mechanism/pattern for requesting model responses that conform to a defined schema so application code can parse and validate them more reliably.

## 9. Why must AI output be validated?

LLM output is probabilistic. Validation protects downstream code from malformed, unexpected, or semantically invalid data.

## 10. Where should the LLM API key live?

Normally on a trusted backend/server environment when the provider uses a secret API key. Do not expose provider secrets in client-side source code.

## 11. What is streaming?

Returning generated output incrementally rather than waiting for the entire response. It can improve perceived responsiveness.

## 12. Does streaming remove the need for validation?

No. The final assembled output still needs appropriate parsing and validation before trusted application behavior.

## 13. What is temperature?

A generation-control parameter in some model APIs that affects output variation. Its exact behavior depends on the model/provider.

## 14. Why not put business rules only in the prompt?

Prompts are not a reliable substitute for deterministic application logic. Critical rules should be enforced in code and validated independently.

## 15. What is RAG?

Retrieval-Augmented Generation retrieves relevant external information and supplies it as context for generation. It is useful when the application needs information from an external or changing knowledge source.

## 16. What is an AI agent?

An application pattern where a model can select/use tools or actions across multiple steps to accomplish a task.

## 17. LLM vs traditional API?

A traditional API usually follows an explicitly defined contract and deterministic business logic. An LLM API generates probabilistic output from context and therefore needs stronger output validation.

## 18. Production AI architecture?

A common architecture is:

```text
UI
 ↓
Backend
 ↓
auth + validation
 ↓
context/prompt construction
 ↓
LLM/tool calls
 ↓
parse + schema validation
 ↓
business rules
 ↓
persistence/response
```

## 19. Excel-platform scenario

**Question:** A model analyzes uploaded Excel data and returns anomaly information. Would you directly save its JSON to PostgreSQL?

**Strong answer:** No. Parse the response, validate the schema, validate business constraints, sanitize/normalize data as required, and only then persist trusted application data.

## 20. Day 1 interview summary

Remember:

> **Model output is untrusted application input until the application validates it.**

That principle will connect later topics such as structured outputs, RAG, tool calling and agents.
