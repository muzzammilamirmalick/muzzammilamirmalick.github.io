// The Experience section: jobs first, then education underneath.
import { education, experience } from "../../data/content.js";
import SectionHeading from "../layout/SectionHeading.jsx";
import "./Experience.css";

export default function Experience() {
  return (
    <section className="section" aria-labelledby="experience">
      <SectionHeading id="experience">Experience</SectionHeading>

      <ul className="timeline">
        {experience.map((job) => (
          <li key={job.role}>
            <div className="timeline-header">
              <h3 className="timeline-title">
                {job.role}, {job.company}
              </h3>
              <p className="timeline-period">{job.period}</p>
            </div>
            <ul className="timeline-points">
              {job.points.map((point) => (
                <li key={point}>{point}</li>
              ))}
            </ul>
          </li>
        ))}
      </ul>

      <h3 className="timeline-subheading">Education</h3>
      <ul className="timeline">
        {education.map((item) => (
          <li key={item.school}>
            <div className="timeline-header">
              <h4 className="timeline-title">{item.school}</h4>
              <p className="timeline-period">{item.period}</p>
            </div>
            <p className="timeline-program">{item.program}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
