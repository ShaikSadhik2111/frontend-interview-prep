# AI Day 4 Basics

## Embeddings
An embedding is a numerical representation that lets an application compare content by semantic similarity.

## RAG
Retrieval-Augmented Generation:
1. receive query
2. represent query
3. retrieve relevant chunks
4. build grounded context
5. ask the model to answer using that context
6. validate and present the result

## Chunking
Whole documents are often too large or too coarse for useful retrieval. Chunk boundaries should preserve meaningful context. Size and overlap are engineering parameters, not universal constants.

## Metadata
Useful fields include document ID, tenant/user ID, source, page/section, timestamp and permissions.

## Security
Retrieved does not mean authorized. Enforce access control before private content reaches the model.

## Grounding
Tell the model what evidence it has and what to do when evidence is insufficient. Application code still validates permissions, schema and business rules.

## RAG vs fine-tuning
RAG injects external knowledge at runtime and is easy to update. Fine-tuning changes learned behavior and does not automatically provide current private documents.

## Excel architecture
Keep exact calculations and validation deterministic. Use AI for natural-language questions, explanations and knowledge retrieval where appropriate.
