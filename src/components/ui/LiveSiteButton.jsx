// "Visit live site": opens a project's real website in a new tab.
import Icon from "./Icon.jsx";
import "./LiveSiteButton.css";

export default function LiveSiteButton({ url, primary = true, className = "" }) {
  return (
    <a
      className={`btn ${primary ? "btn-primary" : ""} live-site-button ${className}`.trim()}
      href={url}
      target="_blank"
      rel="noopener noreferrer"
    >
      <Icon name="link" size={18} />
      Visit live site
      <span className="sr-only"> (opens in a new tab)</span>
    </a>
  );
}
