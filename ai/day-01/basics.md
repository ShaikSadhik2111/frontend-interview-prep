# AI Day 1 — Deep Fundamentals

## 1. LLM mental model

An LLM generates token sequences from the provided context using patterns learned during training.

Think of it as:

```text
context + instructions
        ↓
       model
        ↓
generated output
```

It is **not automatically a database, calculator, business-rule engine, or source of guaranteed truth**.

The application remains responsible for correctness.

## 2. Traditional software vs LLM application

### Traditional deterministic flow

```text
input → explicit rules/code → predictable output
```

### LLM-assisted flow

```text
input
  ↓
instructions + context
  ↓
probabilistic model
  ↓
generated output
  ↓
validation / business rules
  ↓
application behavior
```

The important engineering boundary is:

> Let the model handle language/reasoning tasks; keep critical deterministic rules in application code.

## 3. Prompt/context layers

A practical request can contain:

- system/developer-level instructions
- user input
- retrieved information
- tool results
- conversation/application context

The exact API terminology varies by provider, but the engineering principle is the same: separate trusted application instructions from untrusted user-provided data.

## 4. Tokens

Models process tokenized text.

Token usage matters because it can affect:

- context-window limits
- latency
- API cost
- amount of information available to the model

Do not assume one token equals one word.

## 5. Context window

The context window is the amount of tokenized information a model can consider within its supported request/output limits.

If context is too large, applications may need:
- summarization
- chunking
- retrieval
- selective context
- conversation compression

## 6. Temperature

Temperature is a generation-control parameter available in some model/API configurations.

Higher values can make outputs more varied; lower values can make generation more constrained. The exact effect depends on the model/provider.

Do not use temperature as a substitute for validation.

## 7. Structured output

Free-form text is difficult for application code to consume reliably.

Prefer a defined schema when downstream code needs structured data.

Example:

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

The application should still validate the returned structure.

## 8. Hallucination

A hallucination is generated content that is unsupported, incorrect, or fabricated.

Risk reduction techniques include:

- retrieval of authoritative context
- constrained/structured outputs
- schema validation
- deterministic business rules
- citations where appropriate
- evaluation
- human review for high-impact workflows

No single technique guarantees correctness.

## 9. API request lifecycle

Typical flow:

```text
Frontend
   ↓
Backend
   ↓
Authentication / authorization
   ↓
Prompt construction
   ↓
LLM API
   ↓
Parse + validate
   ↓
Business logic
   ↓
Response
   ↓
Frontend
```

Avoid putting provider secrets directly in browser code when the provider expects server-side secret management.

## 10. Latency and cost

AI application design must consider:

- input token count
- output token count
- model selection
- request frequency
- retries
- streaming
- caching where appropriate
- batching where appropriate

A faster model is not automatically cheaper, and streaming improves perceived responsiveness rather than reducing the model's underlying computation.

## 11. Streaming

Instead of waiting for the complete response:

```text
request → [complete answer] → UI
```

streaming can provide:

```text
request → chunk → chunk → chunk → UI
```

This can improve perceived latency.

The backend still needs authentication, validation, error handling and appropriate cancellation.

## 12. Backend validation

Never assume:

```text
model output = valid application data
```

Instead:

```text
model output
    ↓
parse
    ↓
schema validation
    ↓
business validation
    ↓
trusted application state
```

This is especially important when the output drives database writes or automated actions.

## 13. Excel platform application

For the planned Excel platform:

```text
Excel upload
   ↓
backend parses workbook
   ↓
deterministic calculations / validation
   ↓
selected data + task sent to model
   ↓
structured AI result
   ↓
backend validates result
   ↓
UI displays explanation / suggestions
```

Do not send an entire workbook blindly to the model. Decide what data is necessary, what is sensitive, and what should be handled deterministically.

## 14. AI engineering principle

The model is one component of the system.

A production AI feature still needs:

- authentication
- authorization
- input validation
- prompt/context construction
- model invocation
- output validation
- observability
- retries/timeouts
- rate limiting where appropriate
- error handling
- evaluation
- business rules

## 15. Interview mental model

A strong answer:

> An LLM is a probabilistic generation component. A production AI application wraps it with trusted context, validation, business rules, error handling and observability rather than treating model output as guaranteed truth.
