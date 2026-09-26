# Project Day 26 — State + AI Architecture

## Objective
Apply Day 26 concepts without creating unnecessary tutorial code.

## Frontend
Choose one complex feature and map its state transitions.

## AI architecture
React -> backend API -> deterministic processing and/or retrieval -> AI service -> validated response

## Deliverable
Document:
1. Which state is local UI state?
2. Which state is feature state?
3. Which state belongs on the server?
4. Which transitions deserve reducer actions?
5. Which operations must remain deterministic?
6. Where would retrieval happen?
7. Where is authorization enforced?
8. Where is AI output validated?

## Interview goal
Explain not only how you implemented a feature, but why state, backend, retrieval and AI responsibilities are separated.
