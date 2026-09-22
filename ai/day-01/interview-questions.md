# AI Day 1 Interview Questions

## What is an LLM?
A large language model is a model trained on large amounts of data to predict/generate token sequences from context.

## What is a hallucination?
An output that presents unsupported or incorrect information as if it were reliable. Applications should validate and constrain outputs rather than assuming model output is truth.

## What is a context window?
The amount of tokenized context a model can consider for a request, subject to the model's limits.

## Why use structured output?
It gives the application a predictable schema that can be parsed and validated instead of depending on arbitrary natural-language formatting.

## Why should AI output be validated?
The model is probabilistic. Backend validation protects downstream code from malformed or unsafe data.

## What is RAG?
Retrieval-Augmented Generation retrieves relevant external information and provides it to a model as context before generation. We will learn it later.

## What is an AI agent?
An application pattern in which a model can reason over a task and use tools/actions across multiple steps. We will learn the architecture later.
