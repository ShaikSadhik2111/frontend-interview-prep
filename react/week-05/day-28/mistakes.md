# Day 28 Common Mistakes

1. Using useEffect to calculate derived state.
2. Omitting dependencies to avoid reruns.
3. Forgetting cleanup for listeners or timers.
4. Starting async requests without handling obsolete requests.
5. Treating Strict Mode development behavior as a production bug.
6. Using an Effect for a button-click action.
7. Making the Effect callback itself async.
8. Fixing repeated Effects with arbitrary refs instead of fixing synchronization.
9. Ignoring loading, error and empty states.
10. Assuming every server request must be implemented directly with useEffect instead of considering server-state tooling.
