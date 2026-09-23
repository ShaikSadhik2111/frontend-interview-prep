import { useEffect, useRef, useState } from "react";

export function FocusInput() {
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <>
      <input ref={inputRef} />
      <button onClick={() => inputRef.current?.focus()}>
        Focus input
      </button>
    </>
  );
}

export function RefVsState() {
  const [renderCount, setRenderCount] = useState(0);
  const silentCount = useRef(0);

  function updateRef() {
    silentCount.current += 1;
    console.log("ref:", silentCount.current);
  }

  return (
    <>
      <button onClick={() => setRenderCount((count) => count + 1)}>
        Render: {renderCount}
      </button>
      <button onClick={updateRef}>Update ref</button>
    </>
  );
}

export function PreviousValue({ value }: { value: string }) {
  const previous = useRef(value);

  useEffect(() => {
    previous.current = value;
  }, [value]);

  return (
    <p>
      Current: {value} | Previous: {previous.current}
    </p>
  );
}

export function IntervalWithRef() {
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      console.log("tick");
    }, 1000);

    return () => {
      if (intervalRef.current !== null) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  return <p>Interval example</p>;
}
