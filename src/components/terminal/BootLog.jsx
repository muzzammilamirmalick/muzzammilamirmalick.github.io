// The boot messages. The intro passes in how much has been typed so far.
// The hero shows the same component fully typed, which is what makes the handoff seamless.
import { boot } from "../../data/content.js";

export default function BootLog({
  commandChars = boot.command.length,
  stepsShown = boot.steps.length,
  welcomeChars = boot.welcome.length,
  showCursor = false,
  dimmed = false,
}) {
  const cursor = showCursor ? <span className="terminal-cursor" /> : null;
  const commandFinished = commandChars >= boot.command.length;
  const welcomeStarted = welcomeChars > 0;

  // Only for decoration: screen readers skip this and go straight to my name.
  return (
    <div className={dimmed ? "boot-log boot-log-dimmed" : "boot-log"} aria-hidden="true">
      <p>
        <span className="terminal-prompt">&gt;</span> {boot.command.slice(0, commandChars)}
        {!commandFinished && cursor}
      </p>
      {boot.steps.slice(0, stepsShown).map((step) => (
        <p key={step}>
          <span className="terminal-prompt">[ OK ]</span> {step}
        </p>
      ))}
      {welcomeStarted && (
        <p>
          {boot.welcome.slice(0, welcomeChars)}
          {cursor}
        </p>
      )}
      {commandFinished && !welcomeStarted && <p>{cursor}</p>}
    </div>
  );
}
