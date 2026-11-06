// The terminal frame: a title bar on top and whatever is passed in as the body.
import "./Terminal.css";

export default function TerminalWindow({ children }) {
  return (
    <div className="terminal">
      <div className="terminal-bar">muzzammil@portfolio</div>
      <div className="terminal-body">{children}</div>
    </div>
  );
}
