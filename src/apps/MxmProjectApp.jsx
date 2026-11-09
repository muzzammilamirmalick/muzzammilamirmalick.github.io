// The MXM Detailing booking app: screenshots of the live site, what it does and how it's built.
import StatusLabel from "../components/layout/StatusLabel.jsx";
import LiveSiteButton from "../components/ui/LiveSiteButton.jsx";
import { mxmApp } from "../data/content.js";
import "./MxmProjectApp.css";

export default function MxmProjectApp() {
  return (
    <div className="app-pad mxm">
      <header className="mxm-header">
        <div className="mxm-title-row">
          <h2 className="mxm-name">{mxmApp.name}</h2>
          <StatusLabel status={mxmApp.status} />
        </div>
        <p className="mxm-credit">{mxmApp.credit}</p>
        <p className="mxm-description">{mxmApp.description}</p>
        <div className="mxm-actions">
          <LiveSiteButton url={mxmApp.url} />
          <p className="mxm-code-note">{mxmApp.codeNote}</p>
        </div>
      </header>

      <section aria-labelledby="mxm-screens">
        <h3 className="mxm-heading" id="mxm-screens">
          Screenshots of the live site
        </h3>
        <ul className="mxm-shots">
          {mxmApp.screenshots.map((shot) => (
            <li className={shot.phone ? "mxm-shot mxm-shot-phone" : "mxm-shot"} key={shot.src}>
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

      <section aria-labelledby="mxm-highlights">
        <h3 className="mxm-heading" id="mxm-highlights">
          Highlights
        </h3>
        <ul className="mxm-highlights">
          {mxmApp.highlights.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="mxm-tech">
        <h3 className="mxm-heading" id="mxm-tech">
          Built with
        </h3>
        <ul className="mxm-tech">
          {mxmApp.tech.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </section>
    </div>
  );
}
