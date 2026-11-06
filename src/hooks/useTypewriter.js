// Counts up one character at a time, so a component can show text being typed.
import { useEffect, useState } from "react";

export function useTypewriter(length, { run, charMs, onChar }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!run) return undefined;

    let current = 0;
    const timer = setInterval(() => {
      current += 1;
      setCount(current);
      onChar?.(current);
      if (current >= length) clearInterval(timer);
    }, charMs);

    return () => clearInterval(timer);
  }, [run, length, charMs]);

  return count;
}
