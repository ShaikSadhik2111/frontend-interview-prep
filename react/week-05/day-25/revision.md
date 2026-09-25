# Day 25 Revision — Context

30-second model: Context lets descendants read a shared dependency without manually threading props through every intermediate component.

API: createContext -> define context; Provider -> supply value; useContext -> consume value.

Decision rule:
- Local dependency -> props
- Cross-cutting dependency -> Context candidate
- Complex or high-frequency shared state -> evaluate dedicated state architecture

Remember: Provider value changes can update Context consumers. Object/function identity matters.

Interview sentence: Context solves dependency propagation; it does not automatically solve state management.
