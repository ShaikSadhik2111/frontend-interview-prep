# AI Day 4 — Embeddings and RAG Fundamentals

## Goal
Understand how applications retrieve relevant private knowledge before asking an LLM to generate an answer.

## Pipeline
Documents -> chunk -> embeddings -> vector store
User query -> embedding -> similarity search -> relevant chunks -> LLM -> validated answer

## Learn
- embeddings
- semantic similarity
- chunking
- metadata
- vector databases
- retrieval
- RAG
- retrieval quality vs generation quality
- grounding and source metadata
- stale documents
- tenant/user authorization
- RAG vs fine-tuning

## Excel project
Use deterministic code for arithmetic, filtering, aggregation and validation. RAG becomes useful when users ask natural-language questions over business documentation, definitions or uploaded knowledge.

## Key distinction
RAG supplies external context at request time. Fine-tuning changes model behavior through training.

## Checklist
- [ ] Explain embeddings simply
- [ ] Explain RAG end to end
- [ ] Explain chunking
- [ ] Explain vector similarity
- [ ] Explain authorization risks
- [ ] Design a basic RAG API
