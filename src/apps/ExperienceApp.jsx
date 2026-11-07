// Jobs and education as short rows. Clicking a job shows its details.
import { education, experience } from "../data/content.js";
import Icon from "../components/ui/Icon.jsx";
import "./ExperienceApp.css";

export default function ExperienceApp() {
  return (
    <div className="app-pad experience">
      {experience.map((job) => (
        <details className="job" key={job.company}>
          {/* <summary> is the browser's built-in click to open, and it works with the keyboard. */}
          <summary className="job-summary">
            <span className="job-text">
              <span className="job-role">{job.role}</span>
              <span className="job-company">{job.company}</span>
            </span>
            <span className="job-period">
              {job.period}
              {job.location ? `, ${job.location}` : ""}
            </span>
          </summary>
          <ul className="job-points">
            {job.points.map((point) => (
              <li key={point}>{point}</li>
            ))}
          </ul>
        </details>
      ))}

      <h2 className="experience-heading">
        <Icon name="school" size={18} />
        Education
      </h2>
      {education.map((item) => (
        <div className="job-summary school" key={item.school}>
          <span className="job-text">
            <span className="job-role">{item.school}</span>
            <span className="job-company">{item.program}</span>
          </span>
          <span className="job-period">{item.period}</span>
        </div>
      ))}
    </div>
  );
}
