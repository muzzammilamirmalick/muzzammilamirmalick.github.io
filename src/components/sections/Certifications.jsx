// The Certifications section: each row shows a name and its status label.
import { certifications } from "../../data/content.js";
import SectionHeading from "../layout/SectionHeading.jsx";
import StatusLabel from "../layout/StatusLabel.jsx";
import "./Certifications.css";

export default function Certifications() {
  return (
    <section className="section" aria-labelledby="certifications">
      <SectionHeading id="certifications">Certifications</SectionHeading>
      <ul className="cert-list">
        {certifications.map((cert) => (
          <li className="cert" key={cert.name}>
            <span>{cert.name}</span>
            <StatusLabel status={cert.status} date={cert.date} />
          </li>
        ))}
      </ul>
    </section>
  );
}
