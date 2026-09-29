# AI Day 6 — Tool Calling and Agentic Workflows

## Goal
Understand how an AI application can select and use tools while keeping deterministic application logic and authorization outside the model's control.

## Core architecture

User
→ Backend
→ LLM
→ proposed tool call
→ validation/authorization
→ tool
→ tool result
→ LLM
→ validated response

The model proposes an action. The application controls execution.

## Topics
- Tool/function calling
- Tool schemas
- Validation
- Authorization
- Multi-step agent loops
- State and memory
- Prompt injection
- Maximum steps and timeouts
- Idempotency
- Observability
- Deterministic vs agentic workflows

## Excel connection
Safe narrow tools could include listColumns, filterRows, aggregateColumn and createChartData.

The backend validates parameters and permissions before execution.
