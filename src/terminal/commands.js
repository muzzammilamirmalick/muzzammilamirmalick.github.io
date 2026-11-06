// Everything the terminal can do. Each command returns a list of lines to print.
// All of the facts come from content.js, so the terminal and the page always match.
import {
  about,
  certifications,
  education,
  experience,
  profile,
  projects,
  skills,
} from "../data/content.js";
import { copyEmail } from "../utils/copyEmail.js";
import { downloadResume } from "../utils/downloadResume.js";

// Small helpers that describe one printed line. "kind" picks its style in Terminal.css.
const heading = (text) => ({ kind: "heading", text });
const plain = (text) => ({ kind: "plain", text });
const dim = (text) => ({ kind: "dim", text });
const paragraph = (text) => ({ kind: "paragraph", text });

// The secret command. It stays out of "help" and the command buttons.
const SECRET_COMMAND = "sudo hire muzzammil";

// To add a command, add a block here. It appears in "help" and the buttons automatically.
const commands = {
  help: {
    description: "List all commands",
    run: () =>
      Object.entries(commands).map(([name, command]) => ({
        kind: "plain",
        label: name,
        text: command.description,
      })),
  },
  about: {
    description: "About me",
    run: () => about.map(paragraph),
  },
  projects: {
    description: "What I'm building",
    run: () =>
      projects.flatMap((project) => [
        heading(`${project.name} [${project.status}]`),
        plain(project.description),
        dim(project.tech.join(", ")),
      ]),
  },
  experience: {
    description: "Work and education",
    run: () => [
      ...experience.flatMap((job) => [
        heading(`${job.role}, ${job.company}`),
        dim(job.period),
        ...job.points.map((point) => plain(`- ${point}`)),
      ]),
      ...education.flatMap((item) => [
        heading(item.school),
        dim(item.period),
        plain(item.program),
      ]),
    ],
  },
  skills: {
    description: "Software, hardware and tools",
    run: () =>
      skills.flatMap((skill) => [
        heading(skill.group),
        plain(skill.items.join(", ")),
        ...(skill.learning.length > 0 ? [dim(`Learning: ${skill.learning.join(", ")}`)] : []),
      ]),
  },
  certifications: {
    description: "Certification status",
    run: () =>
      certifications.map((cert) => ({
        kind: "plain",
        text: `[${cert.status}${cert.date ? ` ${cert.date}` : ""}] ${cert.name}`,
      })),
  },
  contact: {
    description: "How to reach me",
    run: () => [
      { kind: "plain", label: "Email", text: profile.email, onClick: copyEmail },
      { kind: "plain", label: "LinkedIn", text: "LinkedIn profile", href: profile.linkedin },
      { kind: "plain", label: "GitHub", text: "GitHub profile", href: profile.github },
    ],
  },
  resume: {
    description: "Download my resume",
    run: () => {
      downloadResume();
      return [plain("[ OK ] Downloading resume")];
    },
  },
  clear: {
    description: "Clear the terminal",
    run: () => [],
  },
};

// The visible command names, used by the buttons and by Tab autocomplete.
export const commandNames = Object.keys(commands);

// Runs what the visitor typed and returns the lines to print.
export function runCommand(input) {
  // Ignore capital letters and extra spaces, so "  HELP " still works.
  const name = input.trim().toLowerCase().replace(/\s+/g, " ");

  if (name === SECRET_COMMAND) {
    return [
      plain("[ OK ] Permission granted"),
      plain(`[ OK ] Hiring ${profile.name}`),
      plain(`Next step: ${profile.email}`),
    ];
  }

  // Object.hasOwn stops words like "constructor" from counting as commands.
  if (Object.hasOwn(commands, name)) {
    return commands[name].run();
  }

  return [plain('command not found. Type "help" for a list of commands.')];
}

// True when the input should wipe the terminal instead of printing something.
export function isClearCommand(input) {
  return input.trim().toLowerCase() === "clear";
}

// Finds the commands that start with what has been typed so far, for Tab autocomplete.
export function findMatches(input) {
  const typed = input.trim().toLowerCase();
  if (!typed) return [];

  // The secret command only completes once someone has started typing "su".
  const candidates = typed.startsWith("su") ? [...commandNames, SECRET_COMMAND] : commandNames;
  return candidates.filter((name) => name.startsWith(typed));
}
