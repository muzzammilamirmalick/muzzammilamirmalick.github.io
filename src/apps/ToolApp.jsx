// Shows one of the standalone HTML tools from public/tools/ inside a MuzzOS window.
// Each tool has its own small app file that passes its details from content.js.
import { useEffect, useRef } from "react";
import Icon from "../components/ui/Icon.jsx";
import "./ToolApp.css";

export default function ToolApp({ tool }) {
  const frameRef = useRef(null);

  // Clicks inside a frame never reach the page around it. The page loses focus instead,
  // so use that to tell the window it was clicked and should come to the front.
  useEffect(() => {
    function handleBlur() {
      const frame = frameRef.current;
      if (document.activeElement === frame) {
        frame.dispatchEvent(new PointerEvent("pointerdown", { bubbles: true }));
      }
    }
    window.addEventListener("blur", handleBlur);
    return () => window.removeEventListener("blur", handleBlur);
  }, []);

  return (
    <div className="tool">
      <div className="tool-bar">
        <a className="btn tool-open" href={tool.url} target="_blank" rel="noopener noreferrer">
          <Icon name="link" size={14} />
          Open full screen
          <span className="sr-only"> (opens in a new tab)</span>
        </a>
      </div>
      <iframe className="tool-frame" ref={frameRef} src={tool.url} title={tool.name} />
    </div>
  );
}
