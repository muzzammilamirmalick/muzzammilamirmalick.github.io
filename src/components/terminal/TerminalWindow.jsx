// The terminal frame: a title bar, a body, and an optional footer under the body.
// With "scrollable" on, long output scrolls inside the body and the keyboard can scroll it too.
import "./Terminal.css";

export default function TerminalWindow({ children, footer, scrollable, bodyRef, onBodyClick }) {
  return (
    <div className="terminal">
      <div className="terminal-bar">muzzammil@portfolio</div>
      <div
        className={scrollable ? "terminal-body terminal-body-scroll" : "terminal-body"}
        ref={bodyRef}
        onClick={onBodyClick}
        tabIndex={scrollable ? 0 : undefined}
        role={scrollable ? "region" : undefined}
        aria-label={scrollable ? "Terminal" : undefined}
      >
        {children}
      </div>
      {footer && <div className="terminal-footer">{footer}</div>}
    </div>
  );
}
