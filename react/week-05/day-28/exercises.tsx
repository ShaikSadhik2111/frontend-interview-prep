import { useEffect, useState } from "react";

// Exercise 1: synchronize document.title with a message count.
// Exercise 2: create a resize listener and clean it up.
// Exercise 3: explain why derived fullName should normally not be state + Effect.
// Exercise 4: fix an interval that uses a stale count.
// Exercise 5: build search with loading, error, cleanup and AbortController.
// Exercise 6: classify each as Effect or event handler:
// A. screen analytics synchronization
// B. form submission after click
// C. WebSocket subscription
// D. filteredProducts derived from products + query

export function EffectExercises() {
  const [value, setValue] = useState("");

  useEffect(() => {
    document.title = value ? "Search: " + value : "Search";
  }, [value]);

  return (
    <input
      value={value}
      onChange={(event) => setValue(event.target.value)}
      placeholder="Type to update the title"
    />
  );
}
