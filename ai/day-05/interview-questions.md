# AI Day 5 — RAG Interview Questions

## 1. Retrieval vs generation?
**Answer:** Retrieval selects relevant information; generation produces an answer using instructions and context.

## 2. Why can RAG hallucinate?
**Answer:** Retrieval may fail or return incomplete context, and the model can still generate unsupported content. RAG does not guarantee truth.

## 3. What is chunking?
**Answer:** Splitting source documents into retrievable units.

## 4. Chunk-size trade-off?
**Answer:** Small chunks improve precision but can lose context; large chunks preserve context but can reduce precision and increase context usage.

## 5. What is top-k?
**Answer:** The number of highest-ranked retrieval candidates returned.

## 6. Why rerank?
**Answer:** Initial retrieval efficiently finds candidates; reranking can order them using a stronger relevance signal.

## 7. How secure RAG?
**Answer:** Authenticate users, enforce tenant/document permissions before context construction, avoid unauthorized metadata exposure, and validate outputs.

## 8. How evaluate RAG?
**Answer:** Evaluate retrieval and generation separately: source retrieval, ranking, answer correctness, grounding/citations, latency and cost.

## 9. RAG vs fine-tuning?
**Answer:** RAG is useful for external/changing knowledge; fine-tuning is useful for learned behavior/style/task adaptation. They can be combined.

## 10. How handle stale documents?
**Answer:** Version, track updates, re-index changes, deactivate obsolete chunks, and retrieve only valid versions where required.

## 11. What if the right chunk is not retrieved?
**Answer:** Improve chunking, query transformation, indexing, metadata filters, retrieval or reranking and evaluate with representative queries.

## 12. 30-second answer
**Answer:** "Production RAG needs careful chunking and metadata, retrieval, optional reranking, authorization, relevant context selection, output validation and separate evaluation of retrieval and generation."