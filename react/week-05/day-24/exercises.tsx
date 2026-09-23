import { useEffect, useRef, useState } from "react";

// 1. Focus an input when the button is clicked.
export function Exercise1() {
  return null;
}

// 2. Build a stopwatch. Store the interval ID in a ref.
// The displayed elapsed time must use state.
export function Exercise2() {
  return null;
}

// 3. Show current and previous prop/value.
export function Exercise3({ value }: { value: string }) {
  return null;
}

// 4. Build a search box where Escape focuses/selects the input.
export function Exercise4() {
  return null;
}

// 5. Explain and fix this anti-pattern:
// const value = useRef("");
// return <p>{value.current}</p>;
// value.current = nextValue;
// Why does the UI not update?
export function Exercise5() {
  return null;
}

// 6. Production review:
// A component starts a setInterval and stores its ID in a normal local variable.
// Explain why cleanup can fail and rewrite it using a ref.
export function Exercise6() {
  return null;
}
