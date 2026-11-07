// A clickable app icon, used on the desktop, in the dock and on the phone home screen.
// The data attributes let windows find their icon to grow out of and return focus to.
import Icon from "../components/ui/Icon.jsx";
import { useOs } from "./OsContext.js";

export default function AppIcon({ app, place, isOpen }) {
  const { openApp } = useOs();
  const placeAttribute = place === "dock" ? { "data-dock-icon": app.id } : { "data-app-icon": app.id };

  return (
    <button
      type="button"
      className={`app-icon app-icon-${place}`}
      onClick={(event) => openApp(app.id, event.currentTarget)}
      aria-label={place === "dock" && isOpen ? `${app.label}, open` : app.label}
      {...placeAttribute}
    >
      <span className="app-icon-tile">
        <Icon name={app.icon} size={place === "dock" ? 22 : 26} />
      </span>
      {place !== "dock" && <span className="app-icon-label">{app.label}</span>}
      {isOpen && <span className="app-icon-dot" />}
    </button>
  );
}
