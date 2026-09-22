# AI Day 1 Notes

## LLM mental model
An LLM generates a continuation based on the input context and learned statistical patterns. It is not a database that guarantees factual retrieval.

## Basic application flow

User input
→ application prompt
→ model API
→ model output
→ validation
→ application behavior

The application remains responsible for authorization, validation, business rules, persistence, and error handling.

## Tokens
Models process tokenized text rather than characters as a single unit. Context limits are measured in tokens. Larger prompts can increase latency and cost depending on the provider/model.

## Structured output
For application code, free-form text is often less useful than a schema.

Example target:
```json
{
  "summary": "Revenue increased",
  "anomalies": [
    {
      "column": "revenue",
      "reason": "Large month-over-month change"
    }
  ]
}
```

The backend should validate model output before trusting it.

## Hallucination
A model can generate plausible but unsupported information. Reduce risk with constrained outputs, retrieval, validation, citations where applicable, and deterministic business rules.

## Streaming
Streaming sends partial model output to the UI instead of waiting for the complete response. This can improve perceived responsiveness but does not remove backend validation requirements.

## AI engineering principle
Do not put business-critical truth entirely inside a prompt. Keep deterministic rules in application code.
