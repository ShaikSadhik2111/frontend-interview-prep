React state updates commonly rely on creating new references.

Mutation
   ↓
same reference
   ↓
harder for React to detect changes correctly

vs

Immutable update
   ↓
new reference
   ↓
React can detect changed state more effectively

Don't reduce this to "React never allows mutation." The important concept is that state should be treated as immutable and updates should produce new references, especially when relying on reference equality for rendering and memoization.