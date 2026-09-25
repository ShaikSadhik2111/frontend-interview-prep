import React, { createContext, useContext, useMemo, useState } from "react";

type Theme = "light" | "dark";
const ThemeContext = createContext<Theme>("light");

function ThemeConsumer() {
  const theme = useContext(ThemeContext);
  return <p>Current theme: {theme}</p>;
}

export function BasicContextExample() {
  return (
    <ThemeContext.Provider value="dark">
      <ThemeConsumer />
    </ThemeContext.Provider>
  );
}

type AuthContextValue = {
  user: string | null;
  login: (name: string) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<string | null>(null);

  const login = (name: string) => setUser(name);
  const logout = () => setUser(null);

  const value = useMemo(() => ({ user, login, logout }), [user]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used inside AuthProvider");
  return context;
}
