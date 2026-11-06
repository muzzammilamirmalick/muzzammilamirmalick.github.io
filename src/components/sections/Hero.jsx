// The first thing on the page: a terminal showing who I am, plus the main buttons.
import { profile } from "../../data/content.js";
import { copyEmail } from "../../utils/copyEmail.js";
import TerminalWindow from "../terminal/TerminalWindow.jsx";
import "./Hero.css";

export default function Hero() {
  return (
    <section className="hero" id="top">
      <TerminalWindow>
        <p>
          <span className="terminal-prompt">&gt;</span> whoami
        </p>
        <h1 className="hero-name">{profile.name}</h1>
        <p className="hero-role">{profile.role}</p>
        <p className="hero-availability">{profile.availability}</p>
      </TerminalWindow>

      <div className="hero-actions">
        <button className="btn btn-primary" type="button" onClick={copyEmail}>
          Email
        </button>
        <a className="btn" href={profile.linkedin} target="_blank" rel="noreferrer">
          LinkedIn
        </a>
        <a className="btn" href={profile.github} target="_blank" rel="noreferrer">
          GitHub
        </a>
        <a className="btn" href={profile.resume} download>
          Download resume
        </a>
      </div>
    </section>
  );
}
