// The About section: one paragraph for each string in content.js.
import { about } from "../../data/content.js";
import SectionHeading from "../layout/SectionHeading.jsx";
import "./About.css";

export default function About() {
  return (
    <section className="section" aria-labelledby="about">
      <SectionHeading id="about">About</SectionHeading>
      <div className="about-text">
        {about.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </div>
    </section>
  );
}
