# Day 27 — Production Project

## Frontend
Find one real screen with a large list/table, expensive filtering/sorting or noticeable rendering work. Document the symptom, evidence, bottleneck, unstable props, whether React.memo/useMemo/useCallback help, whether virtualization/pagination/server-side work is better, and before/after measurements.

## AI
Document: User query → authentication/authorization → query processing → retrieval → optional reranking → context → LLM → schema/output validation → response.

Answer which operations are deterministic, which information needs retrieval, where permissions are enforced, how stale documents are handled, and how retrieval quality is measured.

A decision to make no change is valid when evidence does not justify an optimization.