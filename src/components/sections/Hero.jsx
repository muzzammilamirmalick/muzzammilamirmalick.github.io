// The first thing on the page: a terminal showing who I am, plus the main buttons.
import { profile } from "../../data/content.js";
import { copyEmail } from "../../utils/copyEmail.js";
import BootLog from "../terminal/BootLog.jsx";
import InteractiveTerminal from "../terminal/InteractiveTerminal.jsx";
import Whoami from "./Whoami.jsx";
import "./Hero.css";

export default function Hero({ whoamiMode, terminalRef }) {
  return (
    <section className="hero" id="top">
      <InteractiveTerminal frameRef={terminalRef}>
        <BootLog dimmed={whoamiMode !== "waiting"} />
        <Whoami mode={whoamiMode} />
      </InteractiveTerminal>

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
