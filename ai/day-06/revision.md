# AI Day 6 Revision

Tool calling:
model proposes → backend validates → backend authorizes → backend executes → result → final response

Remember:
- Model is not the security boundary.
- Tools need narrow schemas.
- Validate every argument.
- Authorization belongs in trusted code.
- Bound agent loops.
- Prefer deterministic orchestration when possible.
