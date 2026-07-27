# Day 03 Mistakes

## Mistake 1
Thought arrow functions have their own `this`.

### Correct Understanding
Arrow functions inherit `this` from the surrounding lexical scope.

---

## Mistake 2
Confused `call()` and `bind()`.

### Correct Understanding
- `call()` executes immediately.
- `bind()` returns a new function to call later.