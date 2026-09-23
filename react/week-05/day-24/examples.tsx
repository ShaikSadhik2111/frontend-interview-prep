import { useEffect, useRef, useState } from "react";

// Example 1: focus + select is an imperative DOM operation.
export function SearchInput() {
  const inputRef = useRef<HTMLInputElement>(null);

  function focusSearch() {
    inputRef.current?.focus();
    inputRef.current?.select();
  }

  return (
    <div>
      <input ref={inputRef} placeholder="Search..." />
      <button type="button" onClick={focusSearch}>
        Focus + select
      </button>
    </div>
  );
}

// Example 2: the ref survives renders, but changing it does not render.
export function RenderCounter() {
  const renders = useRef(0);

  renders.current += 1;

  return <p>Rendered: {renders.current} times</p>;
}

// Example 3: a stable callback can read a latest-value ref.
export function LatestCallbackValue() {
  const [value, setValue] = useState("");
  const latestValue = useRef(value);

  useEffect(() => {
    latestValue.current = value;
  }, [value]);

  function logLatestValue() {
    console.log("Latest:", latestValue.current);
  }

  return (
    <>
      <input
        value={value}
        onChange={(event) => setValue(event.target.value)}
      />
      <button type="button" onClick={logLatestValue}>
        Log latest value
      </button>
    </>
  );
}

// Example 4: autofocus is an effect because it synchronizes the DOM.
export function AutoFocusModal() {
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    closeButtonRef.current?.focus();
  }, []);

  return (
    <section role="dialog" aria-label="Example modal">
      <p>Modal content</p>
      <button ref={closeButtonRef} type="button">
        Close
      </button>
    </section>
  );
}

// Example 5: state drives visible elapsed time; ref stores the handle.
export function Stopwatch() {
  const [seconds, setSeconds] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const start = () => {
    if (intervalRef.current !== null) return;

    intervalRef.current = setInterval(() => {
      setSeconds((current) => current + 1);
    }, 1000);
  };

  const stop = () => {
    if (intervalRef.current !== null) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  useEffect(() => stop, []);

  return (
    <div>
      <p>{seconds}s</p>
      <button type="button" onClick={start}>Start</button>
      <button type="button" onClick={stop}>Stop</button>
    </div>
  );
}
