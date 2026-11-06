// The Contact section: click the email to copy it, or follow a profile link.
import { profile } from "../../data/content.js";
import { copyEmail } from "../../utils/copyEmail.js";
import SectionHeading from "../layout/SectionHeading.jsx";
import "./Contact.css";

export default function Contact() {
  return (
    <section className="section contact" aria-labelledby="contact">
      <SectionHeading id="contact">Contact</SectionHeading>
      <dl className="contact-list">
        <div className="contact-row">
          <dt>Email</dt>
          <dd>
            <button className="contact-email" type="button" onClick={copyEmail}>
              {profile.email}
            </button>
          </dd>
        </div>
        <div className="contact-row">
          <dt>LinkedIn</dt>
          <dd>
            <a href={profile.linkedin} target="_blank" rel="noreferrer">
              LinkedIn profile
            </a>
          </dd>
        </div>
        <div className="contact-row">
          <dt>GitHub</dt>
          <dd>
            <a href={profile.github} target="_blank" rel="noreferrer">
              GitHub profile
            </a>
          </dd>
        </div>
      </dl>
    </section>
  );
}
