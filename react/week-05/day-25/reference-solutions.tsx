import React, { createContext, useContext, useMemo, useState } from "react";

type Language = "en" | "de";
const LanguageContext = createContext<{ language: Language; setLanguage: (language: Language) => void } | null>(null);

function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>("en");
  const value = useMemo(() => ({ language, setLanguage }), [language]);
  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

function Greeting() {
  const context = useContext(LanguageContext);
  if (!context) throw new Error("Greeting must be inside LanguageProvider");
  return <div><p>{context.language === "en" ? "Hello" : "Hallo"}</p><button onClick={() => context.setLanguage(context.language === "en" ? "de" : "en")}>Switch</button></div>;
}

export function LanguageSolution() {
  return <LanguageProvider><Greeting /></LanguageProvider>;
}

// Design answer: split unrelated settings when their update patterns and consumer groups differ. Do not memoize by habit; first understand the rendering boundary.
