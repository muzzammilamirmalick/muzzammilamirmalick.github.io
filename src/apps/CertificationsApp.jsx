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
          <span className="cert-name">{cert.name}</span>
          <StatusLabel status={cert.status} date={cert.date} />
        </li>
      ))}
    </ul>
  );
}
