// The Projects section: one row for each project in content.js.
import { projects } from "../../data/content.js";
import SectionHeading from "../layout/SectionHeading.jsx";
import StatusLabel from "../layout/StatusLabel.jsx";
import "./Projects.css";

export default function Projects() {
  return (
    <section className="section" aria-labelledby="projects">
      <SectionHeading id="projects">Projects</SectionHeading>
      <ul className="project-list">
        {projects.map((project) => (
          <li className="project" key={project.name}>
            <div className="project-header">
              <h3 className="project-name">{project.name}</h3>
              <StatusLabel status={project.status} />
            </div>
            <p className="project-description">{project.description}</p>
            <ul className="project-tech" aria-label="Built with">
              {project.tech.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </section>
  );
}
