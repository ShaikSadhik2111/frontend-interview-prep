import { useEffect, useRef, useState } from "react";

export function Exercise1Solution() {
  const inputRef = useRef<HTMLInputElement>(null);
  return (
    <>
      <input ref={inputRef} placeholder="Search..." />
      <button onClick={() => inputRef.current?.focus()}>Focus</button>
    </>
  );
}

export function Exercise2Solution() {
  const [elapsed, setElapsed] = useState(0);
  const [running, setRunning] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const start = () => {
    if (intervalRef.current !== null) return;
    setRunning(true);
    intervalRef.current = setInterval(() => {
      setElapsed((value) => value + 1);
    }, 1000);
  };

  const stop = () => {
    if (intervalRef.current !== null) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    setRunning(false);
  };

  useEffect(() => {
    return () => {
      if (intervalRef.current !== null) clearInterval(intervalRef.current);
    };
  }, []);

  return (
    <div>
      <p>{elapsed}s</p>
      <button onClick={start} disabled={running}>Start</button>
      <button onClick={stop}>Stop</button>
    </div>
  );
}

export function Exercise3Solution({ value }: { value: string }) {
  const previous = useRef<string | undefined>(undefined);

  useEffect(() => {
    previous.current = value;
  }, [value]);

  return <p>Current: {value} | Previous: {previous.current ?? "none"}</p>;
}

export function Exercise4Solution() {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        inputRef.current?.focus();
        inputRef.current?.select();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return <input ref={inputRef} placeholder="Press Escape..." />;
}

// A ref is not reactive. If the displayed value must update, use state.
export function Exercise5Solution() {
  const [value, setValue] = useState("");

  return (
    <>
      <input value={value} onChange={(event) => setValue(event.target.value)} />
      <p>{value}</p>
    </>
  );
}

export function Exercise6Solution() {
  const [ticks, setTicks] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setTicks((value) => value + 1);
    }, 1000);

    return () => {
      if (intervalRef.current !== null) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, []);

  return <p>Ticks: {ticks}</p>;
}

export function usePrevious<T>(value: T): T | undefined {
  const previous = useRef<T | undefined>(undefined);

  useEffect(() => {
    previous.current = value;
  }, [value]);

  return previous.current;
}
