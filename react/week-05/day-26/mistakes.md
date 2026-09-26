# Day 26 Common Mistakes

1. Mutating arrays or objects inside a reducer.
2. Performing fetch/API calls inside reducers.
3. Creating a reducer for trivial state.
4. Using a generic SET_STATE action for everything.
5. Mixing UI side effects into transition logic.
6. Forgetting immutable nested updates.
7. Assuming useReducer automatically improves performance.
8. Assuming Context + useReducer equals every state library.
9. Ignoring impossible state combinations.
10. Designing actions around button names instead of domain events.
