# AI Day 5 — Retrieval Quality

### Chunking
Small chunks can improve precision but lose context; large chunks preserve context but can add irrelevant content and consume more context.

### Metadata
Document ID, section, version, timestamp, tenant and permissions can filter retrieval candidates.

### Top-k
The number of highest-ranked candidates returned. More is not automatically better because irrelevant context increases.

### Reranking
First-stage retrieval generates candidates; a stronger relevance model can rerank them.

### Authorization
Semantic retrieval is not an authorization system. Filter according to user/tenant permissions before model context is built.

### Freshness
Version documents and re-index changed content; deactivate stale chunks when appropriate.

### Evaluation
Measure retrieval hit/recall, ranking, answer correctness, citation correctness, latency and cost separately.