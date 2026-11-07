// One app window. It grows out of its icon, can be dragged by the title bar,
// and shrinks back into its icon or the dock.
import { Suspense, useEffect, useRef } from "react";
import { motion, useDragControls, useMotionValue, useReducedMotion } from "motion/react";
import { appById } from "./appList.js";
import WindowChrome from "./WindowChrome.jsx";

const EASE_OUT = [0.22, 1, 0.36, 1];

export default function Window({ win, areaRef, getIcon, onClose, onMinimize, onFocus, onMove }) {
  const app = appById[win.id];
  const reducedMotion = useReducedMotion();
  const dragControls = useDragControls();
  const windowRef = useRef(null);

  const x = useMotionValue(win.x);
  const y = useMotionValue(win.y);

  // The point the window grows from and shrinks to, measured from its top left corner.
  function originAt(element) {
    if (!element || !areaRef.current) return "50% 50%";
    const icon = element.getBoundingClientRect();
    const area = areaRef.current.getBoundingClientRect();
    const originX = icon.left + icon.width / 2 - area.left - x.get();
    const originY = icon.top + icon.height / 2 - area.top - y.get();
    return `${originX}px ${originY}px`;
  }
  const origin = useMotionValue(originAt(getIcon(win.id)));

  // Follow position changes from the window manager, such as the browser being resized.
  useEffect(() => {
    x.set(win.x);
    y.set(win.y);
  }, [win.x, win.y, x, y]);

  // When a window opens or comes back from the dock, move keyboard focus into it.
  const wasMinimized = useRef(false);
  useEffect(() => {
    const justOpened = win.animateIn && !wasMinimized.current;
    const justRestored = wasMinimized.current && !win.minimized;
    wasMinimized.current = win.minimized;
    if (win.minimized) return;
    if (justOpened || justRestored) {
      // Tablets skip the text box, so the on-screen keyboard does not pop up.
      const hasMouse = window.matchMedia("(pointer: fine)").matches;
      const textBox = hasMouse ? windowRef.current.querySelector("[data-autofocus]") : null;
      const target = textBox ?? windowRef.current;
      target.focus({ preventScroll: true });
    }
    // Only runs when minimized changes, or once when the window first opens.
  }, [win.minimized, win.animateIn]);

  function close() {
    origin.set(originAt(getIcon(win.id)));
    onClose(win.id);
  }

  function minimize() {
    origin.set(originAt(getIcon(win.id, true)));
    onMinimize(win.id);
  }

  // Dragging only starts from the title bar, and not from its buttons.
  function startDrag(event) {
    if (!event.target.closest("button")) dragControls.start(event);
  }

  // With reduced motion, windows simply fade instead of growing and shrinking.
  const hiddenScale = reducedMotion ? 1 : 0.08;
  const variants = {
    shown: {
      opacity: 1,
      scale: 1,
      transition: { duration: reducedMotion ? 0.12 : 0.26, ease: EASE_OUT },
    },
    hidden: {
      opacity: 0,
      scale: hiddenScale,
      transition: { duration: reducedMotion ? 0.12 : 0.18, ease: "easeIn" },
    },
  };

  return (
    <motion.section
      ref={windowRef}
      className="window"
      data-window={win.id}
      role="dialog"
      aria-labelledby={`window-title-${win.id}`}
      tabIndex={-1}
      inert={win.minimized}
      variants={variants}
      initial={win.animateIn ? "hidden" : false}
      animate={win.minimized ? "hidden" : "shown"}
      exit="hidden"
      drag
      dragListener={false}
      dragControls={dragControls}
      dragConstraints={areaRef}
      dragElastic={0}
      dragMomentum={false}
      onDragEnd={() => onMove(win.id, x.get(), y.get())}
      onPointerDownCapture={() => onFocus(win.id)}
      onFocusCapture={() => onFocus(win.id)}
      style={{
        x,
        y,
        transformOrigin: origin,
        width: win.width,
        height: win.height,
        zIndex: win.z,
      }}
    >
      <WindowChrome
        app={app}
        titleId={`window-title-${win.id}`}
        onClose={close}
        onMinimize={minimize}
        onPointerDown={startDrag}
      />
      <div className="window-body">
        <Suspense fallback={<p className="app-pad app-loading">Loading...</p>}>
          <app.Component />
        </Suspense>
      </div>
    </motion.section>
  );
}
