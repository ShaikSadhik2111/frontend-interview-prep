import React, { createContext, useContext, useMemo, useState } from "react";

type Locale = "en" | "de";
const LocaleContext = createContext<Locale>("en");

function Label() {
  const locale = useContext(LocaleContext);
  return <span>{locale === "de" ? "Speichern" : "Save"}</span>;
}

export function LocaleExample() {
  return <LocaleContext.Provider value="de"><Label /></LocaleContext.Provider>;
}

// Split unrelated dependencies into separate contexts.
type User = { id: string; name: string };
const UserContext = createContext<User | null>(null);
const ThemeContext = createContext<"light" | "dark">("light");

export function Profile() {
  const user = useContext(UserContext);
  const theme = useContext(ThemeContext);
  return <section data-theme={theme}><h2>{user?.name ?? "Guest"}</h2></section>;
}

// Provider value identity matters.
const SettingsContext = createContext<{ compact: boolean; toggle: () => void } | null>(null);

export function SettingsProvider({ children }: { children: React.ReactNode }) {
  const [compact, setCompact] = useState(false);
  const toggle = () => setCompact(value => !value);
  const value = useMemo(() => ({ compact, toggle }), [compact]);
  return <SettingsContext.Provider value={value}>{children}</SettingsContext.Provider>;
}
