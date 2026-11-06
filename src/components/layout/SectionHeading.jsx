// The heading at the top of each section. It types itself out the first time it scrolls into view.
import { useContext, useRef } from "react";
import { useInView, useReducedMotion } from "motion/react";
import { useTypewriter } from "../../hooks/useTypewriter.js";
import { SiteReady } from "./SiteReady.js";
import "./SectionHeading.css";

export default function SectionHeading({ id, children }) {
  const headingRef = useRef(null);
  const siteReady = useContext(SiteReady);
  const reducedMotion = useReducedMotion();

  // once: true means it only ever types the first time.
  const inView = useInView(headingRef, { once: true, amount: 0.6 });
  const shouldType = inView && siteReady && !reducedMotion;

  const typedChars = useTypewriter(children.length, { run: shouldType, charMs: 40 });
  const visibleChars = reducedMotion ? children.length : typedChars;
  const isTyping = shouldType && typedChars < children.length;

  return (
    <h2 className="section-heading" id={id} ref={headingRef}>
      <span className="section-heading-prompt" aria-hidden="true">
        &gt;{" "}
      </span>
      {/* Screen readers and search engines always get the full heading from this one. */}
      <span className="sr-only">{children}</span>
      {/* The untyped letters stay in place but invisible, so the heading never changes size. */}
      <span aria-hidden="true">
        {children.slice(0, visibleChars)}
        {isTyping && <span className="section-heading-cursor" />}
        <span className="section-heading-untyped">{children.slice(visibleChars)}</span>
      </span>
    </h2>
  );
}
