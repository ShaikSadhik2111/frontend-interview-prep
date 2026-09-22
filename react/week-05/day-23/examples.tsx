import { useEffect, useState } from "react";

type User = {
  id: number;
  name: string;
};

export function UserDetails({ userId }: { userId: number }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();

    async function loadUser() {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(`/api/users/${userId}`, {
          signal: controller.signal,
        });

        if (!response.ok) {
          throw new Error(`Request failed: ${response.status}`);
        }

        const data: User = await response.json();
        setUser(data);
      } catch (error: unknown) {
        if (error instanceof DOMException && error.name === "AbortError") {
          return;
        }
        setError(error instanceof Error ? error.message : "Unknown error");
      } finally {
        setLoading(false);
      }
    }

    loadUser();

    return () => controller.abort();
  }, [userId]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p role="alert">{error}</p>;
  if (!user) return <p>No user found.</p>;

  return <h2>{user.name}</h2>;
}

export function ThemePreference() {
  const [theme, setTheme] = useState<"light" | "dark">("light");

  useEffect(() => {
    window.localStorage.setItem("theme", theme);
  }, [theme]);

  return (
    <button
      type="button"
      onClick={() =>
        setTheme((current) => (current === "light" ? "dark" : "light"))
      }
    >
      Theme: {theme}
    </button>
  );
}

// Derived data normally does not need an effect.
export function PriceSummary({
  price,
  quantity,
}: {
  price: number;
  quantity: number;
}) {
  const total = price * quantity;

  return <p>Total: {total}</p>;
}

export function OnlineStatus() {
  const [online, setOnline] = useState(navigator.onLine);

  useEffect(() => {
    const handleOnline = () => setOnline(true);
    const handleOffline = () => setOnline(false);

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  return <p>{online ? "Online" : "Offline"}</p>;
}
