import { useEffect, useRef, useState } from "react";

export function SearchInput() {
  const inputRef = useRef<HTMLInputElement>(null);

  function focusSearch() {
    inputRef.current?.focus();
    inputRef.current?.select();
  }

  return (
    <div>
      <input ref={inputRef} placeholder="Search..." />
      <button onClick={focusSearch}>Focus + select</button>
    </div>
  );
}

export function RenderCounter() {
  const renders = useRef(0);
  renders.current += 1;

  return <p>Rendered: {renders.current} times</p>;
}

export function LatestCallbackValue() {
  const [value, setValue] = useState("");
  const latestValue = useRef(value);

  useEffect(() => {
    latestValue.current = value;
  }, [value]);

  function logLatestValue() {
    console.log(latestValue.current);
  }

  return (
    <>
      <input value={value} onChange={(e) => setValue(e.target.value)} />
      <button onClick={logLatestValue}>Log latest value</button>
    </>
  );
}

export function AutoFocusModal() {
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    closeButtonRef.current?.focus();
  }, []);

  return (
    <section role="dialog" aria-label="Example modal">
      <p>Modal content</p>
      <button ref={closeButtonRef}>Close</button>
    </section>
  );
}
