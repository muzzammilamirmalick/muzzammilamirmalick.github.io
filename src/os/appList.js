// Every app in MuzzOS. To add an app, build its component and add one block here.
// "width" and "height" are its starting window size on desktop.
// lazy() means an app's code only downloads when it is needed, which keeps the site fast.
import { lazy } from "react";
import TerminalApp from "../apps/TerminalApp.jsx";
import WelcomeApp from "../apps/WelcomeApp.jsx";

const ComingUp = lazy(() => import("../apps/ComingUpApp.jsx"));

export const apps = [
  { id: "terminal", label: "Terminal", icon: "terminal", width: 600, height: 460, Component: TerminalApp },
  { id: "journey", label: "Journey", icon: "journey", width: 640, height: 560, Component: ComingUp },
  { id: "projects", label: "Projects", icon: "projects", width: 720, height: 560, Component: ComingUp },
  { id: "detailing", label: "M&M Detailing", icon: "car", width: 680, height: 580, Component: ComingUp },
  { id: "experience", label: "Experience", icon: "experience", width: 560, height: 500, Component: ComingUp },
  { id: "skills", label: "Skills", icon: "skills", width: 520, height: 440, Component: ComingUp },
  { id: "certifications", label: "Certifications", icon: "certifications", width: 520, height: 380, Component: ComingUp },
  { id: "contact", label: "Contact", icon: "contact", width: 420, height: 320, Component: ComingUp },
  { id: "resume", label: "Resume.pdf", icon: "resume", width: 380, height: 300, Component: ComingUp },
  { id: "trash", label: "Trash", icon: "trash", width: 420, height: 320, Component: ComingUp },
  // Welcome opens by itself on arrival, so it has no desktop icon.
  { id: "welcome", label: "Welcome", icon: "spark", width: 360, height: 330, Component: WelcomeApp, hidden: true },
];

export const appById = Object.fromEntries(apps.map((app) => [app.id, app]));

// The icons shown on the desktop.
export const desktopApps = apps.filter((app) => !app.hidden);

// The apps that always sit in the dock.
export const dockAppIds = ["terminal", "projects", "journey", "contact"];
