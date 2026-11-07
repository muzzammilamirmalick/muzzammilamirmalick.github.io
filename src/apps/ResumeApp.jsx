// The Resume.pdf "file". PDFs show badly in small windows and on phones, so it offers
// two clear choices instead of trying to display the file here.
import { profile } from "../data/content.js";
import Icon from "../components/ui/Icon.jsx";
import "./ResumeApp.css";

export default function ResumeApp() {
  return (
    <div className="app-pad resume">
      <span className="resume-icon">
        <Icon name="resume" size={44} />
      </span>
      <p className="resume-name">Resume.pdf</p>
      <a className="btn btn-primary resume-button" href={profile.resume} download>
        <Icon name="download" size={18} />
        Download
      </a>
      <a className="btn resume-button" href={profile.resume} target="_blank" rel="noreferrer">
        Open in a new tab
      </a>
    </div>
  );
}
