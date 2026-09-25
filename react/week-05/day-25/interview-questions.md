# Day 25 — Context API Interview Questions

1. What problem does Context solve? It avoids passing a shared dependency through unrelated intermediate components.

2. Is Context global state? No. A value is available to descendants of a Provider.

3. What does createContext do? It creates the Context object and defines its default value.

4. What does useContext do? It reads the nearest matching Provider value.

5. When should props be preferred? When the dependency is local, explicit ownership is valuable, or the tree is small.

6. Why can Context cause re-renders? Consumers respond when the Provider value changes; object and function identity therefore matters.

7. How can Provider value identity be stabilized? useMemo/useCallback can help when justified by the value's construction and rendering behavior.

8. Should all shared state go into Context? No. Context is primarily a dependency propagation primitive.

9. What is Context splitting? Separate contexts for unrelated concerns to create narrower dependencies and update boundaries.

10. Context vs Redux/Zustand? Context is built into React for dependency propagation; dedicated libraries can provide richer state-management and subscription features.

11. Why create a custom useAuth hook? It centralizes access and can fail clearly when the Provider is missing.

12. What is the default value? The fallback returned when no matching Provider exists above the consumer.

13. Production example? Theme, locale, authentication/session information, or feature configuration can be cross-cutting dependencies.

14. Common trap? Context prevents prop drilling, therefore everything belongs in Context. This is false.

Self-test: explain Context, Provider, consumer updates, splitting, and Context versus a state library in under three minutes.
