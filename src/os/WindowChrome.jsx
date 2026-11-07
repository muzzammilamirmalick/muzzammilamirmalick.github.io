// The title bar of a window. The intro draws the same bar on its terminal, so the two
// match exactly. Without onClose and onMinimize, the buttons are just for show.
import Icon from "../components/ui/Icon.jsx";

export default function WindowChrome({ app, titleId, onClose, onMinimize, onPointerDown }) {
  const isReal = Boolean(onClose);

  return (
    <div className="window-bar" onPointerDown={onPointerDown}>
      <span className="window-title" id={titleId}>
        <Icon name={app.icon} size={14} />
        {app.label}
      </span>
      <span className="window-controls">
        <button
          type="button"
          className="window-control"
          onClick={onMinimize}
          aria-label={`Minimize ${app.label}`}
          tabIndex={isReal ? undefined : -1}
        >
          <Icon name="minimize" size={14} />
        </button>
        <button
          type="button"
          className="window-control"
          onClick={onClose}
          aria-label={`Close ${app.label}`}
          tabIndex={isReal ? undefined : -1}
        >
          <Icon name="close" size={14} />
        </button>
      </span>
    </div>
  );
}
