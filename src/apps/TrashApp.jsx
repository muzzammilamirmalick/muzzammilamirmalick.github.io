// The Trash can, which holds one very sad file.
import { useState } from "react";
import { toast } from "sonner";
import Icon from "../components/ui/Icon.jsx";
import "./TrashApp.css";

export default function TrashApp() {
  const [open, setOpen] = useState(false);

  return (
    <div className="app-pad trash">
      <button type="button" className="trash-file" aria-expanded={open} onClick={() => setOpen(!open)}>
        <Icon name="resume" size={20} />
        <span className="trash-file-name">free_time.zip</span>
        <span className="trash-file-size">0 KB</span>
      </button>

      {open && (
        <div className="trash-contents">
          <p>Archive is empty. Between IKEA, a detailing business and school, this was bound to happen.</p>
          <button
            type="button"
            className="btn"
            onClick={() => toast("Restore failed: no free time found")}
          >
            Restore
          </button>
        </div>
      )}
    </div>
  );
}
