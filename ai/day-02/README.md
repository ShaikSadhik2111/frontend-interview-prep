# AI Day 2 — Prompt Engineering + Structured Outputs

## Position in the plan

AI is the **45-minute parallel track**. Day 1 established the LLM/application mental model. Day 2 focuses on designing reliable instructions and predictable model outputs.

- ⚛️ React / Frontend — primary track
- 🧠 DSA — morning coding track
- 🤖 AI — 45-minute AI engineering track
- 🛠️ Production Project — application track

## Goal

Move from "asking an LLM a question" to designing a prompt contract that an application can validate and use.

## 45-minute session

- 10 min — prompt anatomy
- 10 min — instructions, context and constraints
- 10 min — structured output/schema design
- 10 min — failure modes and validation
- 5 min — interview recall

## Topics

- Instruction hierarchy
- Role/task/context/constraints
- Good vs vague prompts
- Few-shot examples
- Delimiters and untrusted input
- Output schemas
- JSON vs validated structured output
- Prompt injection awareness
- Deterministic validation
- Prompt versioning
- Evaluation mindset

## Practical exercise

Design an AI prompt for the Excel platform that receives a selected dataset and asks the model to identify anomalies.

The prompt should define:

1. task
2. allowed context
3. constraints
4. output schema
5. uncertainty behavior
6. examples if useful

Then define backend validation separately.

## Time-saving rule

Do not spend 45 minutes experimenting with random prompts.

For every prompt, ask:

**What is the task? → What context does the model need? → What constraints apply? → What exact output does the application consume? → How will I validate it?**

## Completion checklist

- [ ] Explain prompt anatomy
- [ ] Distinguish instructions from untrusted user input
- [ ] Design a structured output schema
- [ ] Explain few-shot prompting
- [ ] Explain prompt injection at a high level
- [ ] Explain why validation remains necessary
- [ ] Create one Excel-analysis prompt contract
- [ ] Answer interview questions aloud
