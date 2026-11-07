// The first thing visitors see: who I am and three big buttons to get started.
import { profile } from "../data/content.js";
import { useOs } from "../os/OsContext.js";
import "./WelcomeApp.css";

export default function WelcomeApp() {
  const { openApp } = useOs();

  const actions = [
    { id: "projects", label: "See my projects", primary: true },
    { id: "journey", label: "My journey" },
    { id: "contact", label: "Contact me" },
  ];

  return (
    <div className="welcome">
      <h2 className="welcome-name">{profile.name}</h2>
      <p className="welcome-line">
        {profile.role}. <span className="welcome-highlight">{profile.availability}.</span>
      </p>
      <div className="welcome-actions">
        {actions.map((action) => (
          <button
            key={action.id}
            type="button"
            className={action.primary ? "btn btn-primary" : "btn"}
            onClick={(event) => openApp(action.id, event.currentTarget)}
          >
            {action.label}
          </button>
        ))}
      </div>
    </div>
  );
}
