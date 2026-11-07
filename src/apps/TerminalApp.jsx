// The terminal visitors can type in. It keeps the printed output and the command history,
// and handles the Enter, Up, Down and Tab keys.
import { useEffect, useRef, useState } from "react";
import BootLog from "../components/terminal/BootLog.jsx";
import CommandButtons from "../components/terminal/CommandButtons.jsx";
import OutputLine from "../components/terminal/OutputLine.jsx";
import Whoami from "../components/terminal/Whoami.jsx";
import { useOs } from "../os/OsContext.js";
import { findMatches, isClearCommand, runCommand } from "../terminal/commands.js";
import "../components/terminal/Terminal.css";

export default function TerminalApp() {
  const os = useOs();
  const [entries, setEntries] = useState([]); // Everything printed so far.
  const [input, setInput] = useState(""); // What is currently typed.
  const [hint, setHint] = useState(""); // Tab suggestions when several commands match.
  const [history, setHistory] = useState([]); // Past commands, for the Up arrow.
  const [historyIndex, setHistoryIndex] = useState(null); // null means "not browsing history".

  const nextId = useRef(0);
  const bodyRef = useRef(null);
  const inputRef = useRef(null);
  const latestEntryRef = useRef(null);

  // After new output, scroll so the start of it is at the top of the terminal.
  useEffect(() => {
    const body = bodyRef.current;
    const latest = latestEntryRef.current;
    if (body) body.scrollTop = latest ? latest.offsetTop : 0;
  }, [entries]);

  function run(command) {
    if (!command.trim()) return;

    setHistory((past) => [...past, command]);
    setHistoryIndex(null);
    setInput("");
    setHint("");

    if (isClearCommand(command)) {
      setEntries([]);
      return;
    }

    const lines = runCommand(command, os, inputRef.current);
    const id = nextId.current++;
    setEntries((past) => [...past, { id, command, lines }]);
  }

  function handleSubmit(event) {
    event.preventDefault();
    run(input);
  }

  function handleChange(event) {
    setInput(event.target.value);
    setHint("");
    setHistoryIndex(null);
  }

  function showOlderCommand() {
    if (history.length === 0) return;
    const index = historyIndex === null ? history.length - 1 : Math.max(0, historyIndex - 1);
    setHistoryIndex(index);
    setInput(history[index]);
  }

  function showNewerCommand() {
    if (historyIndex === null) return;
    const index = historyIndex + 1;
    if (index >= history.length) {
      setHistoryIndex(null);
      setInput("");
    } else {
      setHistoryIndex(index);
      setInput(history[index]);
    }
  }

  // Tab only stays in the input when it has something to do. The rest of the time
  // it moves to the next element, so keyboard users never get stuck in the terminal.
  function handleTab(event) {
    if (event.shiftKey) return;

    const typed = input.trim().toLowerCase();
    const matches = findMatches(input);

    if (matches.length === 1 && matches[0] !== typed) {
      event.preventDefault();
      setInput(matches[0]);
      setHint("");
    } else if (matches.length > 1 && !hint) {
      event.preventDefault();
      setHint(matches.join("  "));
    }
  }

  function handleKeyDown(event) {
    if (event.key === "ArrowUp") {
      event.preventDefault();
      showOlderCommand();
    } else if (event.key === "ArrowDown") {
      event.preventDefault();
      showNewerCommand();
    } else if (event.key === "Tab") {
      handleTab(event);
    }
  }

  // Clicking the terminal puts the cursor in the input, unless the visitor is selecting
  // text or clicking a link. Touch screens are skipped so the keyboard doesn't pop up.
  function handleBodyClick(event) {
    const hasMouse = window.matchMedia("(pointer: fine)").matches;
    const isSelecting = window.getSelection().toString() !== "";
    const clickedControl = event.target.closest("a, button");
    if (hasMouse && !isSelecting && !clickedControl) inputRef.current.focus();
  }

  return (
    <div className="terminal">
      <div
        className="terminal-body"
        ref={bodyRef}
        onClick={handleBodyClick}
        tabIndex={0}
        role="region"
        aria-label="Terminal"
      >
        <BootLog dimmed={os.whoamiMode !== "waiting"} />
        <Whoami mode={os.whoamiMode} />

        {/* Screen readers announce anything new that appears in this log. */}
        <div role="log" aria-live="polite" aria-label="Command output">
          {entries.map((entry, index) => (
            <div
              className="terminal-entry"
              key={entry.id}
              ref={index === entries.length - 1 ? latestEntryRef : null}
            >
              <p className="terminal-line">
                <span className="terminal-prompt">&gt;</span> {entry.command}
              </p>
              {entry.lines.map((line, lineIndex) => (
                <OutputLine line={line} key={lineIndex} />
              ))}
            </div>
          ))}
        </div>

        <form className="terminal-form" onSubmit={handleSubmit}>
          <label className="terminal-prompt" htmlFor="terminal-input">
            &gt;
          </label>
          <input
            className="terminal-input"
            id="terminal-input"
            ref={inputRef}
            data-autofocus
            type="text"
            value={input}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            placeholder={'Type "help"'}
            aria-label="Terminal command"
            autoComplete="off"
            autoCapitalize="off"
            autoCorrect="off"
            spellCheck="false"
            enterKeyHint="send"
          />
        </form>
        <p className="terminal-hint" role="status">
          {hint}
        </p>
      </div>
      <div className="terminal-footer">
        <CommandButtons onRun={run} />
      </div>
    </div>
  );
}
