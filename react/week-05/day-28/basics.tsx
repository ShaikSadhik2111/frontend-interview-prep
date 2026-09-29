import { useEffect, useState } from "react";

export default function Basics() {
  const [count, setCount] = useState(0);
  const [online, setOnline] = useState(navigator.onLine);

  // Browser event subscription.
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

  // Functional update avoids capturing an old count.
  useEffect(() => {
    const timerId = window.setInterval(() => {
      setCount((current) => current + 1);
    }, 1000);

    return () => window.clearInterval(timerId);
  }, []);

  return (
    <section>
      <p>Status: {online ? "Online" : "Offline"}</p>
      <p>Seconds: {count}</p>
    </section>
  );
}
