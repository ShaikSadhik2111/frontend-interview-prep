# Day 23 Common Mistakes

## 1. Effect for derived state
❌ Store fullName in state and update it in an effect.
✅ Calculate fullName from firstName and lastName.

## 2. Missing dependency
❌ Read userId in an effect but omit it.
✅ Include reactive values used by the effect.

## 3. No cleanup
❌ Create an interval/listener and never remove it.
✅ Return cleanup.

## 4. Async effect callback
❌ `useEffect(async () => {})`
✅ Define an async function inside the effect and invoke it.

## 5. Ignoring race conditions
❌ Assume the latest request finishes last.
✅ Abort obsolete requests or ignore obsolete results.

## 6. Fighting Strict Mode
❌ Add flags only to hide development behavior.
✅ Make setup and cleanup symmetrical.

## 7. Using an effect for button logic
❌ Set shouldSave state and let an effect watch it.
✅ Save directly in the submit handler.

## 8. Treating dependencies as an optimization list
Dependencies are part of the synchronization contract. Do not omit them merely to reduce executions.

## 9. Overusing effects
If the requirement can be solved by rendering a calculated value or handling an event directly, the effect may be unnecessary.
