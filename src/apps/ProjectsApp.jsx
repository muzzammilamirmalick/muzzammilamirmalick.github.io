// Project cards with previews. Planned projects are tucked away in a "Coming later" folder.
import StatusLabel from "../components/layout/StatusLabel.jsx";
import Icon from "../components/ui/Icon.jsx";
import ProjectPreview from "../components/ui/ProjectPreview.jsx";
import { projects } from "../data/content.js";
import "./ProjectsApp.css";

function TechList({ tech }) {
  return (
    <ul className="project-tech" aria-label="Built with">
      {tech.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  );
}

export default function ProjectsApp() {
  const active = projects.filter((project) => project.status !== "Planned");
  const planned = projects.filter((project) => project.status === "Planned");

  return (
    <div className="app-pad projects">
      <ul className="project-grid">
        {active.map((project) => (
          <li className="project-card" key={project.name}>
            <ProjectPreview project={project} />
            <div className="project-info">
              <div className="project-heading">
                <h2 className="project-name">{project.name}</h2>
                <StatusLabel status={project.status} />
              </div>
              <p className="project-description">{project.description}</p>
              <TechList tech={project.tech} />
            </div>
          </li>
        ))}
      </ul>

      {/* The folder opens with the browser's built-in click, and each project inside can too. */}
      <details className="later-folder">
        <summary className="later-summary">
          <Icon name="projects" size={22} />
          <span className="later-name">Coming later</span>
          <span className="later-count">{planned.length} projects</span>
        </summary>
        <ul className="later-list">
          {planned.map((project) => (
            <li key={project.name}>
              <details className="later-project">
                <summary className="later-project-name">{project.name}</summary>
                <p className="project-description">{project.description}</p>
                <TechList tech={project.tech} />
              </details>
            </li>
          ))}
        </ul>
      </details>
    </div>
  );
}
