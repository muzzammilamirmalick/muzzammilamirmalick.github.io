// Each certification and its status. These come straight from the list in content.js.
import { certifications } from "../data/content.js";
import Icon from "../components/ui/Icon.jsx";
import StatusLabel from "../components/layout/StatusLabel.jsx";
import "./CertificationsApp.css";

export default function CertificationsApp() {
  return (
    <ul className="app-pad certs">
      {certifications.map((cert) => (
        <li className="cert" key={cert.name}>
          <Icon name="certifications" size={18} />
          <div className="cert-body">
            <div className="cert-top">
              <span className="cert-name">{cert.name}</span>
              <StatusLabel status={cert.status} date={cert.date} />
            </div>
            {cert.image && (
              <a className="cert-image" href={cert.url} target="_blank" rel="noreferrer">
                <img src={cert.image} alt={`${cert.name} certificate`} loading="lazy" />
                <span className="cert-verify">Verify certificate</span>
              </a>
            )}
          </div>
        </li>
      ))}
    </ul>
  );
}
