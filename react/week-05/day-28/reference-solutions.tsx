import { useEffect, useState } from "react";

export function WindowWidth() {
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return <p>Width: {width}px</p>;
}

export function Counter() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const id = window.setInterval(() => {
      setCount((current) => current + 1);
    }, 1000);

    return () => window.clearInterval(id);
  }, []);

  return <p>{count}</p>;
}

// Async pattern: create a controller inside the Effect and abort it in cleanup.
// Ignore AbortError because cancellation is expected during cleanup.
export async function fetchWithCancellation(
  query: string,
  signal: AbortSignal
) {
  const response = await fetch(
    "/api/search?q=" + encodeURIComponent(query),
    { signal }
  );

  if (!response.ok) {
    throw new Error("Request failed");
  }

  return response.json();
}
