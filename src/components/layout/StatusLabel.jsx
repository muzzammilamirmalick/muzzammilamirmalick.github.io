// A small label such as "Live" or "In progress". If a date is given, it is shown too.
import "./StatusLabel.css";

export default function StatusLabel({ status, date }) {
  // "In progress" becomes "in-progress" so the CSS file can style each status.
  const styleName = status.toLowerCase().replace(/\s+/g, "-");

  return (
    <span className={`status status-${styleName}`}>
      {status}
      {date ? ` ${date}` : ""}
    </span>
  );
}
