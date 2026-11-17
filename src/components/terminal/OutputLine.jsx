// Prints one line of command output.
export default function OutputLine({ line }) {
  // A line with a label is shown as two columns, like "help   List all commands".
  if (line.label) {
    return (
      <p className="terminal-line terminal-row">
        <span className="terminal-label">{line.label}</span>
        <span>{line.text}</span>
      </p>
    );
  }
  return <p className="terminal-line">{line.text}</p>;
}
