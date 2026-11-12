// The My Sky flight tracker: screenshots, what it does, how it's built and a link to the code.
import StatusLabel from "../components/layout/StatusLabel.jsx";
import Icon from "../components/ui/Icon.jsx";
import { flightApp } from "../data/content.js";
import "./FlightProjectApp.css";

export default function FlightProjectApp() {
  return (
    <div className="app-pad flight">
      <header className="flight-header">
        <div className="flight-title-row">
          <h2 className="flight-name">{flightApp.name}</h2>
          <StatusLabel status={flightApp.status} />
        </div>
        <p className="flight-credit">{flightApp.credit}</p>
        <p className="flight-description">{flightApp.description}</p>
        <div className="flight-actions">
          <a
            className="btn btn-primary flight-repo"
            href={flightApp.repo}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Icon name="link" size={18} />
            View on GitHub
            <span className="sr-only"> (opens in a new tab)</span>
          </a>
          <p className="flight-code-note">{flightApp.codeNote}</p>
        </div>
      </header>

      {flightApp.video && (
        <section aria-labelledby="flight-video">
          <h3 className="flight-heading" id="flight-video">
            Demo
          </h3>
          <video
            className="flight-video"
            src={flightApp.video}
            controls
            playsInline
            preload="metadata"
          />
        </section>
      )}

      <section aria-labelledby="flight-screens">
        <h3 className="flight-heading" id="flight-screens">
          Screenshots
        </h3>
        <ul className="flight-shots">
          {flightApp.screenshots.map((shot) => (
            <li className={shot.phone ? "flight-shot flight-shot-phone" : "flight-shot"} key={shot.src}>
              <figure>
                <img
                  src={shot.src}
                  width={shot.width}
                  height={shot.height}
                  alt={shot.alt}
                  loading="lazy"
                  decoding="async"
                />
                <figcaption>{shot.caption}</figcaption>
              </figure>
            </li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="flight-highlights">
        <h3 className="flight-heading" id="flight-highlights">
          Highlights
        </h3>
        <ul className="flight-highlights">
          {flightApp.highlights.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="flight-tech">
        <h3 className="flight-heading" id="flight-tech">
          Built with
        </h3>
        <ul className="flight-tech">
          {flightApp.tech.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </section>
    </div>
  );
}
