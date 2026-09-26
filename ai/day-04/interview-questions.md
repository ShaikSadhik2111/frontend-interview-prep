# AI Day 4 Interview Questions

1. What is an embedding?
2. What is RAG?
3. Explain an end-to-end RAG request.
4. Why do documents need chunking?
5. What metadata should be stored with a chunk?
6. RAG vs fine-tuning?
7. How do you prevent one tenant's documents being retrieved for another tenant?
8. How can poor retrieval be improved?
9. What happens if retrieval returns irrelevant chunks?
10. Why should exact calculations remain deterministic?
11. How would you expose RAG through a backend API?
12. How would you evaluate a RAG system?
13. Retrieval quality vs generation quality?
14. Why are source references useful?
15. Design RAG for an internal engineering-document assistant.

## Strong interview principle
The LLM is one component. Retrieval, authorization, validation, observability and deterministic business logic remain application responsibilities.

## Simple Answers

1. **What is an embedding?**  
	An embedding is a list of numbers that represents the meaning of text. Similar meanings produce vectors that are close together.

2. **What is RAG?**  
	RAG means Retrieval-Augmented Generation. The system retrieves relevant information first and gives it to the LLM as context for its answer.

3. **Explain an end-to-end RAG request.**  
	The user sends a question, the system creates a query embedding, searches authorized document chunks, adds the results to the prompt, and generates an answer with sources.

4. **Why do documents need chunking?**  
	Large documents are split into smaller chunks so search can find the relevant section and the LLM receives focused context within its token limit.

5. **What metadata should be stored with a chunk?**  
	Store the document ID, title, source URL, tenant ID, permissions, page or section, version, timestamps, and chunk position.

6. **RAG vs fine-tuning?**  
	RAG gives the model current external information at request time. Fine-tuning changes the model's behavior or style using training examples; it is not a good replacement for frequently changing facts.

7. **How do you prevent one tenant's documents being retrieved for another tenant?**  
	Store tenant and permission metadata, apply authorization filters during retrieval, and enforce access again in the backend before returning sources.

8. **How can poor retrieval be improved?**  
	Improve chunk sizes, clean the documents, add useful metadata, use better embeddings, rewrite queries, apply hybrid search, rerank results, and tune the number of chunks retrieved.

9. **What happens if retrieval returns irrelevant chunks?**  
	The answer may be incorrect or unsupported. Use similarity thresholds, reranking, source validation, and an honest fallback such as “I could not find enough information.”

10. **Why should exact calculations remain deterministic?**  
	 LLMs can make arithmetic mistakes. Use normal application code or a trusted calculation service for money, dates, counts, and other exact results.

11. **How would you expose RAG through a backend API?**  
	 Create an authenticated endpoint that accepts the question and tenant context, performs authorized retrieval, calls the model, and returns the answer, sources, request ID, and errors in a stable response shape.

12. **How would you evaluate a RAG system?**  
	 Test retrieval relevance and coverage, answer correctness, faithfulness to sources, citation accuracy, latency, cost, and security with representative questions and expected results.

13. **Retrieval quality vs generation quality?**  
	 Retrieval quality asks whether the right information was found. Generation quality asks whether the model used that information to produce a correct, clear, and grounded answer.

14. **Why are source references useful?**  
	 Sources let users verify the answer, build trust, find more detail, and help engineers investigate incorrect retrieval or generation.

15. **Design RAG for an internal engineering-document assistant.**  
	 Ingest approved documents, split and embed their chunks, store permission-aware metadata, retrieve with tenant and user filters, rerank the results, generate a cited answer, log the request, and refuse to answer when evidence is insufficient.
