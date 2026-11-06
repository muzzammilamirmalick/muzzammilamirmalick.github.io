// Prints one line of command output. It can be plain text, a link or a button.
function LineContent({ line }) {
  if (line.onClick) {
    return (
      <button className="terminal-action" type="button" onClick={line.onClick}>
        {line.text}
      </button>
    );
  }
  if (line.href) {
    return (
      <a href={line.href} target="_blank" rel="noreferrer">
        {line.text}
      </a>
    );
  }
  return line.text;
}

export default function OutputLine({ line }) {
  // A line with a label is shown as two columns, like "Email   me@example.com".
  if (line.label) {
    return (
      <p className="terminal-line terminal-row">
        <span className="terminal-label">{line.label}</span>
        <span>
          <LineContent line={line} />
        </span>
      </p>
    );
  }
  return (
    <p className={`terminal-line terminal-${line.kind}`}>
      <LineContent line={line} />
    </p>
  );
}
