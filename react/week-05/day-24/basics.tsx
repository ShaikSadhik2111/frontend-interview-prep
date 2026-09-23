import { useEffect, useRef, useState } from "react";

// 1. DOM ref: the ref points to the actual input element after commit.
export function FocusInput() {
  const inputRef = useRef<HTMLInputElement>(null);

  const focusInput = () => {
    inputRef.current?.focus();
  };

  return (
    <>
      <input ref={inputRef} placeholder="Search..." />
      <button type="button" onClick={focusInput}>
        Focus input
      </button>
    </>
  );
}

// 2. State is reactive; ref mutation is not.
export function RefVsState() {
  const [renderCount, setRenderCount] = useState(0);
  const silentCount = useRef(0);

  function updateRef() {
    silentCount.current += 1;
    console.log("ref:", silentCount.current);
  }

  return (
    <>
      <button type="button" onClick={() => setRenderCount((count) => count + 1)}>
        Render: {renderCount}
      </button>

      <button type="button" onClick={updateRef}>
        Update ref (no render)
      </button>
    </>
  );
}

// 3. The ref keeps the previous committed value.
export function PreviousValue({ value }: { value: string }) {
  const previous = useRef<string | undefined>(undefined);

  useEffect(() => {
    previous.current = value;
  }, [value]);

  return (
    <p>
      Current: {value} | Previous: {previous.current ?? "none"}
    </p>
  );
}

// 4. Resource handle in a ref; lifecycle owned by the effect.
export function IntervalWithRef() {
  const [ticks, setTicks] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setTicks((current) => current + 1);
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
