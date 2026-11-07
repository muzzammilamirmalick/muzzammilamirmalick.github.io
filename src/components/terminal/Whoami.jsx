// The "whoami" command and its answer at the top of the terminal.
// mode: "waiting" (hidden behind the intro), "typing" (plays out) or "done" (already finished).
import { useEffect, useState } from "react";
import { playClick } from "../../audio/sounds.js";
import { profile } from "../../data/content.js";
import { useTypewriter } from "../../hooks/useTypewriter.js";

const COMMAND = "whoami";
const LINE_TIMES = [120, 200, 280]; // When each answer line prints, after the typing ends.

export default function Whoami({ mode }) {
  const [linesPrinted, setLinesPrinted] = useState(0);

  const typedChars = useTypewriter(COMMAND.length, {
    run: mode === "typing",
    charMs: 35,
    onChar: (count) => {
      if (count % 2 === 1) playClick();
    },
  });
  const typingFinished = typedChars === COMMAND.length;

  // Print the answer one line at a time, like a real terminal.
  useEffect(() => {
    if (!typingFinished) return undefined;
    const timers = LINE_TIMES.map((time, index) =>
      setTimeout(() => setLinesPrinted(index + 1), time)
    );
    return () => timers.forEach(clearTimeout);
  }, [typingFinished]);

  const isDone = mode === "done";
  const visibleLines = isDone ? LINE_TIMES.length : linesPrinted;
  const commandText = isDone ? COMMAND : COMMAND.slice(0, typedChars);

  // Hidden lines stay in place with opacity 0, so nothing moves when they print.
  const lineClass = (name, lineNumber) =>
    visibleLines >= lineNumber ? name : `${name} whoami-hidden`;

  return (
    <>
      <p className={mode === "waiting" ? "whoami-hidden" : undefined} aria-hidden="true">
        <span className="terminal-prompt">&gt;</span> {commandText}
        {mode === "typing" && !typingFinished && <span className="terminal-cursor" />}
      </p>
      <p className={lineClass("whoami-name", 1)}>{profile.name}</p>
      <p className={lineClass("whoami-role", 2)}>{profile.role}</p>
      <p className={lineClass("whoami-availability", 3)}>{profile.availability}</p>
    </>
  );
}
