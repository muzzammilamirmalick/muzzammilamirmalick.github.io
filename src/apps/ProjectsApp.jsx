// Project cards with previews. Planned projects are tucked away in a "Coming later" folder.
// A live project with screenshots shows one on its card and can open its own window.
import StatusLabel from "../components/layout/StatusLabel.jsx";
import Icon from "../components/ui/Icon.jsx";
import LiveSiteButton from "../components/ui/LiveSiteButton.jsx";
import ProjectPreview from "../components/ui/ProjectPreview.jsx";
import { projects } from "../data/content.js";
import { useOs } from "../os/OsContext.js";
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

function ProjectImage({ image }) {
  return (
    <img
      className="project-image"
      src={image.src}
      width={image.width}
      height={image.height}
      alt={image.alt}
      loading="lazy"
      decoding="async"
    />
  );
}

export default function ProjectsApp() {
  const { openApp } = useOs();
  const active = projects.filter((project) => project.status !== "Planned");
  const planned = projects.filter((project) => project.status === "Planned");

  return (
    <div className="app-pad projects">
      <ul className="project-grid">
        {active.map((project) => (
          <li className="project-card" key={project.name}>
            {project.image ? <ProjectImage image={project.image} /> : <ProjectPreview project={project} />}
            <div className="project-info">
              <div className="project-heading">
                <h2 className="project-name">{project.name}</h2>
                <StatusLabel status={project.status} />
              </div>
              {project.credit && <p className="project-credit">{project.credit}</p>}
              <p className="project-description">{project.description}</p>
              <TechList tech={project.tech} />
              {(project.url || project.repo || project.opensApp) && (
                <div className="project-actions">
                  {project.url && <LiveSiteButton url={project.url} />}
                  {project.repo && (
                    <a className="btn" href={project.repo} target="_blank" rel="noopener noreferrer">
                      View code
                      <span className="sr-only"> (opens in a new tab)</span>
                    </a>
                  )}
                  {project.opensApp && (
                    <button
                      type="button"
                      className="btn"
                      onClick={(event) => openApp(project.opensApp, event.currentTarget)}
                    >
                      Screenshots
                    </button>
                  )}
                </div>
              )}
              {project.codeNote && <p className="project-code-note">{project.codeNote}</p>}
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
