// A row of buttons that run commands without typing, mainly for phone users.
import { commandNames } from "../../terminal/commands.js";

export default function CommandButtons({ onRun }) {
  return (
    <div className="command-buttons" role="group" aria-label="Run a command">
      {commandNames.map((name) => (
        <button className="command-button" type="button" key={name} onClick={() => onRun(name)}>
          {name}
        </button>
      ))}
    </div>
  );
}
