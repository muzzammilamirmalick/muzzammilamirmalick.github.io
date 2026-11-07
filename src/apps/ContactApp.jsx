// Ways to reach me. Clicking the email copies it and shows a small toast.
import { profile } from "../data/content.js";
import Icon from "../components/ui/Icon.jsx";
import { copyEmail } from "../utils/copyEmail.js";
import "./ContactApp.css";

export default function ContactApp() {
  return (
    <div className="app-pad contact">
      <p className="contact-line">{profile.availability}.</p>
      <button type="button" className="btn btn-primary contact-button" onClick={copyEmail}>
        <Icon name="copy" size={18} />
        <span className="contact-email">{profile.email}</span>
      </button>
      <a className="btn contact-button" href={profile.linkedin} target="_blank" rel="noreferrer">
        <Icon name="link" size={18} />
        LinkedIn
      </a>
      <a className="btn contact-button" href={profile.github} target="_blank" rel="noreferrer">
        <Icon name="terminal" size={18} />
        GitHub
      </a>
    </div>
  );
}
