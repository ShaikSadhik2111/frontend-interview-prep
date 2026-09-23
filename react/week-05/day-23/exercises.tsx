# Day 23 Exercises — useEffect

## Exercise 1 — Document title
Create a component that accepts `title` and synchronizes `document.title`.

Reference:
```tsx
function PageTitle({ title }: { title: string }) {
  useEffect(() => {
    document.title = title;
  }, [title]);

  return <h1>{title}</h1>;
}
```

## Exercise 2 — Timer
Build a timer that increments once per second.
Requirements: useEffect, setInterval, functional update, cleanup.

Reference:
```tsx
function Timer() {
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    const id = window.setInterval(() => {
      setSeconds((previous) => previous + 1);
    }, 1000);

    return () => window.clearInterval(id);
  }, []);

  return <p>{seconds}</p>;
}
```

## Exercise 3 — Window resize
Display current browser width. Subscribe to resize and remove the listener in cleanup.
Reference:
```tsx
function WindowWidth() {
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return <p>{width}</p>;
}
```

## Exercise 4 — Fetch a user
Create loading, error and user states. Depend on userId, check response.ok, and cancel obsolete requests with AbortController.

Reference:
```tsx
useEffect(() => {
  const controller = new AbortController();

  async function load() {
    try {
      setLoading(true);
      const response = await fetch(`/api/users/${userId}`, {
        signal: controller.signal,
      });
      if (!response.ok) throw new Error("Request failed");
      setUser(await response.json());
    } catch (error: unknown) {
      if (error instanceof DOMException && error.name === "AbortError") return;
      setError(error instanceof Error ? error.message : "Unknown error");
    } finally {
      setLoading(false);
    }
  }

  load();
  return () => controller.abort();
}, [userId]);
```

## Exercise 5 — Find the bug
Why is this usually unnecessary?
```tsx
const [fullName, setFullName] = useState("");
useEffect(() => {
  setFullName(`${firstName} ${lastName}`);
}, [firstName, lastName]);
```
Answer: fullName is derived data. Calculate it during render.

## Exercise 6 — Stale closure
Explain why an interval with [] can keep reading an older count. Then decide whether dependencies, a ref, or a redesign is appropriate.
Reference:
```tsx
function StaleCounter() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setCount(count + 1); // This will always use the initial count value
    }, 1000);
    return () => clearInterval(id);
  }, []);

  return <p>{count}</p>;
}
```

## Exercise 7 — Production review
In your real company project, inspect one effect and answer:
1. What external system is being synchronized?
2. What triggers it?
3. What are its dependencies?
4. What cleanup is required?
5. Can requests race?
6. Could TanStack Query handle this server-state concern?
7. Is any state unnecessarily derived?

## Exercise 8 — Custom hook
Implement:
```tsx
function useDocumentTitle(title: string) {
  useEffect(() => {
    document.title = title;
  }, [title]);
}
```

## Exercise 9 — Interview coding
Design a reusable `useOnlineStatus` hook. Include event subscription and cleanup.
```tsx
function useOnlineStatus() {
  const [isOnline, setIsOnline] = useState(() => navigator.onLine);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  return isOnline;
}
```