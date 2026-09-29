# Day 28 Revision

useEffect = synchronization with an external system.

Mental model:
render → commit → setup → dependency change/unmount → cleanup → next setup

Remember:
- Cleanup mirrors setup.
- Dependencies must be correct.
- Functional updates help avoid stale state.
- Abort obsolete async work.
- Derived data usually belongs in render.
- User actions usually belong in event handlers.
- Strict Mode can expose missing cleanup in development.
- useLayoutEffect is for rare pre-paint layout synchronization.

Interview line:
"Effects synchronize React with external systems; they are not a general-purpose place for calculations."
