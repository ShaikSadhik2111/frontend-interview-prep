# Context API — Deep Theory

## 1. What Context is

React Context provides a way to make a value available to descendants without explicitly passing it through every intermediate component.

The important concept is dependency access, not magic global state.

## 2. createContext

createContext creates a Context object with a default value. The default is used when no matching Provider exists above the consumer.

## 3. Provider

A Provider supplies the current value to descendants. When the supplied value changes, Context consumers may render with the new value.

## 4. useContext

useContext reads the nearest matching Provider value.

## 5. Props vs Context

Use props when the dependency is local and explicit ownership improves readability. Use Context when many descendants need the same dependency and prop drilling is creating unnecessary coupling.

Do not introduce Context simply because passing one prop feels inconvenient.

## 6. Context and state

Context does not store state by itself. A common architecture is useState or useReducer inside a Provider, followed by exposing the state and actions through Context.

## 7. Re-render implications

Provider value identity matters. For example, creating a new object on every Provider render can make the Context value appear changed even when the logical data has not changed.

useMemo and useCallback can sometimes stabilize value identity, but they should be used intentionally rather than mechanically.

## 8. Split contexts

Avoid one giant context containing unrelated user, theme, locale, filters and application data when consumers have different update patterns. Separate contexts can create clearer dependency and update boundaries.

## 9. Context is not a universal state manager

Context is a React primitive for dependency propagation. A dedicated state library may be useful when an application needs more sophisticated subscriptions, selectors, middleware, persistence or devtools.

## 10. Testing

A Context consumer can be tested under a test Provider with a controlled value. A custom hook can also throw a useful error when used outside its required Provider.

## Interview principle

Context solves dependency propagation. It does not automatically solve state architecture.
