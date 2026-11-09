// Every app in MuzzOS. To add an app, build its component and add one block here.
// "width" and "height" are its starting window size on desktop.
// lazy() means an app's code only downloads when it is needed, which keeps the site fast.
import { lazy } from "react";
import TerminalApp from "../apps/TerminalApp.jsx";
import WelcomeApp from "../apps/WelcomeApp.jsx";
import { profile } from "../data/content.js";

const loaders = {
  journey: () => import("../apps/JourneyApp.jsx"),
  projects: () => import("../apps/ProjectsApp.jsx"),
  detailing: () => import("../apps/DetailingApp.jsx"),
  mxm: () => import("../apps/MxmProjectApp.jsx"),
  experience: () => import("../apps/ExperienceApp.jsx"),
  skills: () => import("../apps/SkillsApp.jsx"),
  certifications: () => import("../apps/CertificationsApp.jsx"),
  contact: () => import("../apps/ContactApp.jsx"),
  resume: () => import("../apps/ResumeApp.jsx"),
  trash: () => import("../apps/TrashApp.jsx"),
};

export const apps = [
  { id: "terminal", label: "Terminal", icon: "terminal", width: 600, height: 460, Component: TerminalApp },
  { id: "journey", label: "Journey", icon: "journey", width: 620, height: 610, Component: lazy(loaders.journey) },
  { id: "projects", label: "Projects", icon: "projects", width: 780, height: 610, Component: lazy(loaders.projects) },
  { id: "detailing", label: "MXM Detailing", icon: "car", width: 700, height: 610, Component: lazy(loaders.detailing) },
  // The MXM booking app project. It opens from Projects, MXM Detailing and the terminal, so it has no desktop icon.
  { id: "mxm", label: "MXM booking app", icon: "car", width: 760, height: 620, Component: lazy(loaders.mxm), hidden: true },
  { id: "experience", label: "Experience", icon: "experience", width: 560, height: 480, Component: lazy(loaders.experience) },
  { id: "skills", label: "Skills", icon: "skills", width: 520, height: 400, Component: lazy(loaders.skills) },
  { id: "certifications", label: "Certifications", icon: "certifications", width: 540, height: 360, Component: lazy(loaders.certifications) },
  { id: "contact", label: "Contact", icon: "contact", width: 400, height: 270, Component: lazy(loaders.contact) },
  // Hidden until profile.resume is set in content.js.
  { id: "resume", label: "Resume.pdf", icon: "resume", width: 320, height: 290, Component: lazy(loaders.resume), hidden: !profile.resume },
  { id: "trash", label: "Trash", icon: "trash", width: 400, height: 260, Component: lazy(loaders.trash) },
  // Welcome opens by itself on arrival, so it has no desktop icon.
  { id: "welcome", label: "Welcome", icon: "spark", width: 360, height: 330, Component: WelcomeApp, hidden: true },
];

export const appById = Object.fromEntries(apps.map((app) => [app.id, app]));

// The icons shown on the desktop.
export const desktopApps = apps.filter((app) => !app.hidden);

// The apps that always sit in the dock.
export const dockAppIds = ["terminal", "projects", "journey", "contact"];

// Quietly downloads the other apps once the browser is idle, so they open instantly later.
export function preloadApps() {
  const loadAll = () => Object.values(loaders).forEach((load) => load());
  if (window.requestIdleCallback) window.requestIdleCallback(loadAll);
  else setTimeout(loadAll, 1500); // Safari doesn't have requestIdleCallback yet.
}
