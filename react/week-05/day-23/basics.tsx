import { useEffect, useState } from "react";

export function DocumentTitleExample({ name }: { name: string }) {
  useEffect(() => {
    document.title = `User: ${name}`;
  }, [name]);

  return <h2>Hello, {name}</h2>;
}

// useEffect registers synchronization logic.
// document.title is outside React, so this is a side effect.
// [name] means the synchronization depends on name.

export function TimerExample() {
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    const timerId = window.setInterval(() => {
      setSeconds((previous) => previous + 1);
    }, 1000);

    return () => {
      window.clearInterval(timerId);
    };
  }, []);

  return <p>Seconds: {seconds}</p>;
}

// Setup creates the timer.
// Cleanup removes it.
// Functional update uses the latest previous state.

export function WindowWidthExample() {
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    function handleResize() {
      setWidth(window.innerWidth);
    }

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return <p>Width: {width}px</p>;
}

// addEventListener subscribes; cleanup unsubscribes.

export function UserEffectExample({ userId }: { userId: number }) {
  useEffect(() => {
    console.log("Synchronize user", userId);
  }, [userId]);

  return <p>User ID: {userId}</p>;
}
