# Day 25 — Context API Interview Questions with Answers

Read each question together with its answer. The goal is direct interview preparation without needing separate notes.

## 1. What problem does Context solve?
Answer: Context lets a component receive a value from a Provider higher in the React tree without manually passing that value through every intermediate component as props. It is mainly a dependency-propagation mechanism and is commonly used for theme, locale, authentication information and feature configuration.

## 2. Is Context the same as global state?
Answer: No. A Context value is available to descendants of its Provider. It is scoped to that Provider subtree and is not automatically application-global state.

## 3. What does createContext do?
Answer: createContext creates a Context object that React components can provide and consume. Its argument is the default value used when a matching Provider does not exist above the consumer.

## 4. What does useContext do?
Answer: useContext reads the value from the nearest matching Provider above the component. If Providers are nested, the closest matching Provider wins.

## 5. When should props be preferred over Context?
Answer: Prefer props when the dependency is local, the component relationship is simple, or explicit data flow improves readability. Do not introduce Context merely to avoid passing one value through one or two components.

## 6. Why can Context cause re-renders?
Answer: Consumers respond when the value supplied by their Provider changes. If the Provider creates a new object or function value, its identity can change even when the logical data appears unchanged.

## 7. How can Provider value identity be stabilized?
Answer: When justified, use useMemo for object values and useCallback for functions so their identities do not change unnecessarily. Memoization is an optimization, not a correctness requirement.

## 8. Does useMemo automatically stop all Context re-renders?
Answer: No. Consumers still update when the Context value actually changes. useMemo only helps when unstable object or function identity was causing unnecessary value changes.

## 9. Should all shared state go into Context?
Answer: No. Context is best for cross-cutting dependencies. Frequently changing or highly complex application state may need different state boundaries or a dedicated state-management library.

## 10. What is Context splitting?
Answer: Context splitting means separating unrelated concerns into different Contexts, such as ThemeContext, AuthContext and LocaleContext. This gives clearer ownership and narrower update boundaries.

## 11. Context vs Redux or Zustand?
Answer: Context is built into React and primarily solves dependency propagation. Redux and Zustand are dedicated state-management solutions with additional patterns and APIs. The choice depends on application state complexity, update characteristics and architectural needs.

## 12. Why create a custom hook such as useAuth?
Answer: A custom hook centralizes Context access and gives components a clean API. It can also provide a clear error when the hook is used outside its Provider, reducing repeated Context-specific code.

## 13. What is the Context default value?
Answer: It is the fallback value returned when no matching Provider exists above the consumer. It should not be confused with dynamically managed application state.

## 14. What happens with nested Providers?
Answer: A consumer receives the value from the nearest matching Provider. This allows different subtrees to have different values for the same Context.

## 15. Give a production example where Context is appropriate.
Answer: A theme system is a strong example because many deeply nested components may need the current theme. Locale, authentication/session information and feature configuration are other common examples.

## 16. What is the biggest Context mistake?
Answer: Treating Context as the default place for every shared value. Multiple consumers alone do not automatically justify Context. Consider ownership, scope, update frequency, component reuse and dependency boundaries.

## 17. Does Context improve performance?
Answer: Context itself is not a performance optimization. Poorly designed Context can cause unnecessary updates. Keep state close to where it is used, split unrelated Contexts when appropriate, stabilize Provider values when justified, and measure actual rendering behavior.

## 18. Can Context completely replace prop drilling?
Answer: Context can remove many prop chains, but props remain valuable because they make dependencies explicit. Use Context when the dependency is genuinely cross-cutting or needed by many descendants.

## 19. Can Context be used with useState?
Answer: Yes. A Provider can own state with useState and expose the state plus its updater through Context. Context distributes the dependency while useState manages the state.

## 20. Can Context be used with useReducer?
Answer: Yes. A common bounded-feature pattern is useReducer for explicit state transitions plus Context for distributing state and dispatch to descendants. They solve different problems and complement each other.

## 21. A component tree is six levels deep and only the last component needs a value. Should you automatically use Context?
Answer: No. First consider whether normal props or component composition are clearer. Context becomes more attractive when the dependency is cross-cutting, reused by many descendants, or passing it through intermediates creates meaningful architectural noise.

## 22. A Context Provider contains 15 unrelated values. Is that automatically wrong?
Answer: No, but it is a strong signal to inspect the design. Ask whether consumers need all values, whether values change at different frequencies, and whether separate Contexts would create clearer boundaries.

## 23. Why does an inline object passed as a Context value matter?
Answer: An object literal creates a new object identity whenever the Provider renders. That can make the Context value appear changed even if its fields are logically the same. useMemo can stabilize it when there is a demonstrated reason to do so.

## 24. How would you investigate a slow Context-based application?
Answer: Identify which Provider updates, how often it updates, which consumers respond, whether unrelated state is bundled together, whether Provider values are recreated unnecessarily, and whether state can be moved closer to where it is consumed. Diagnose the actual bottleneck before optimizing.

## 25. Context vs props — what is the simplest interview rule?
Answer: Use props for local and explicit dependencies. Consider Context for cross-cutting dependencies needed by many descendants. This is a guideline, not an absolute rule.

## 26. What is the relationship between Context and state management?
Answer: Context answers how a dependency reaches components. State management answers how state is owned, updated, derived, persisted and coordinated. Context can carry state, but providing state through Context does not automatically create a complete state-management architecture.

## 27. Does Context prevent unnecessary rendering of the entire application?
Answer: No. Context does not mean the entire application re-renders for every update, nor does it guarantee perfect rendering isolation. Consumer boundaries, Provider structure and value identity determine the practical update behavior.

## 28. How would you explain Context in a 30-second interview answer?
Answer: React Context is a built-in mechanism for passing a dependency through a component tree without manually forwarding props through every intermediate component. I use it for cross-cutting values such as theme, locale or authentication. I do not treat it as a universal state-management solution because large or frequently changing state may need different boundaries or a dedicated state library.

## Quick self-test
1. What problem does Context solve?
2. Why is Context not automatically global state?
3. What do createContext and useContext do?
4. When should props be preferred?
5. Why does Provider value identity matter?
6. What is Context splitting?
7. Context vs Redux/Zustand?
8. Why use a custom Context hook?
9. How does Context work with useReducer?
10. How would you diagnose unnecessary Context updates?

If you can answer these questions in your own words and explain the trade-offs, your Day 25 Context interview preparation is complete.