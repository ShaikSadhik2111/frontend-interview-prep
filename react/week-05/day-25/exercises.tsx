import React, { createContext, useContext, useState } from "react";

// Exercise 1: Create LanguageContext with en/de, a switcher and a Greeting consumer.
// Exercise 2: Create AuthContext with user, login(name), logout(), and a useAuth hook.
// Exercise 3: Design SettingsContext with theme and language, then explain why unrelated consumers can re-render.
// Exercise 4: Replace App -> Layout -> Sidebar -> Button prop drilling with Context. Then explain why props may still be clearer in a small tree.
// Exercise 5: Before creating production Context, document owner, consumers, update frequency, reason props are insufficient, and re-render boundary.

type CountContextValue = { count: number; increment: () => void };
const CountContext = createContext<CountContextValue | null>(null);

function CountProvider({ children }: { children: React.ReactNode }) {
  const [count, setCount] = useState(0);
  const value = { count, increment: () => setCount(current => current + 1) };
  return <CountContext.Provider value={value}>{children}</CountContext.Provider>;
}

function Counter() {
  const context = useContext(CountContext);
  if (!context) throw new Error("Counter must be rendered inside CountProvider");
  return <button onClick={context.increment}>{context.count}</button>;
}

export function ExerciseStarter() {
  return <CountProvider><Counter /></CountProvider>;
}
