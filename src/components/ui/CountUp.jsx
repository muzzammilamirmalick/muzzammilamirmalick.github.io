// A number that counts up from zero the first time it appears on screen.
import { useEffect, useRef } from "react";
import { animate, useInView, useReducedMotion } from "motion/react";

function format(value, { decimals = 0, plain = false }) {
  if (plain) return String(Math.round(value)); // For years, which have no comma.
  return value.toLocaleString("en-CA", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
}

export default function CountUp({ value, prefix = "", suffix = "", decimals, plain }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const reducedMotion = useReducedMotion();
  const finalText = `${prefix}${format(value, { decimals, plain })}${suffix}`;

  useEffect(() => {
    // Years would look odd counting up from zero, so they just appear.
    if (!inView || reducedMotion || plain) return undefined;
    const counter = animate(0, value, {
      duration: 1.2,
      ease: [0.22, 1, 0.36, 1],
      // Changing the text directly is cheaper than redrawing React 60 times a second.
      onUpdate: (current) => {
        if (ref.current) ref.current.textContent = `${prefix}${format(current, { decimals })}${suffix}`;
      },
    });
    return () => counter.stop();
  }, [inView, reducedMotion, plain, value, prefix, suffix, decimals]);

  return (
    <>
      {/* Screen readers always get the final number, not every step of the count. */}
      <span className="sr-only">{finalText}</span>
      <span ref={ref} aria-hidden="true" style={{ fontVariantNumeric: "tabular-nums" }}>
        {finalText}
      </span>
    </>
  );
}
