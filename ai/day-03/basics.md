# AI Day 3 — API Mental Model

## Model vs application

The model generates a response. Your application owns authentication, authorization, validation, database writes, deterministic calculations, business rules and observability.

## Backend boundary

Preferred architecture: Browser -> your backend -> AI provider.

The backend can enforce permissions, quotas, validation and output handling.

## Reliability

Treat model calls as external dependencies. Plan for timeouts, transient failures, rate limits, malformed output, provider errors and unexpected latency.

## Cost

Cost can be affected by input tokens, output tokens, request frequency, model selection and retries. Avoid unnecessary context.

## Streaming

Streaming can improve perceived responsiveness by showing generated output progressively. It does not automatically improve correctness or remove model cost.

## Excel architecture

Use AI where semantic interpretation helps: classify columns, explain anomalies, summarize rows or map natural-language instructions to an allowed operation.

Keep deterministic transformations in normal application code.

## Security principle

User data is data, not trusted instructions. Delimit and validate it. Do not let a model response directly execute privileged actions without application-level checks.
