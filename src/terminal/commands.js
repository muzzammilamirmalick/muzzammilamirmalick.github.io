// Everything the terminal can do. Each command returns a list of lines to print.
// Commands for long content open the matching app instead of printing all of it.
import { aboutShort, profile } from "../data/content.js";
import { downloadResume } from "../utils/downloadResume.js";

const plain = (text) => ({ kind: "plain", text });

// A command that opens an app and prints one short line.
const opensApp = (id, label, description) => ({
  description,
  run: (os, opener) => {
    os.openApp(id, opener);
    return [plain(`Opening ${label}`)];
  },
});

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
    run: () => aboutShort.map(plain),
  },
  projects: opensApp("projects", "Projects", "What I'm building"),
  journey: opensApp("journey", "Journey", "How I got here"),
  detailing: opensApp("detailing", "MXM Detailing", "My detailing business"),
  experience: opensApp("experience", "Experience", "Work and education"),
  skills: opensApp("skills", "Skills", "Software, hardware and tools"),
  certifications: opensApp("certifications", "Certifications", "Certification status"),
  contact: opensApp("contact", "Contact", "How to reach me"),
  // Left out until profile.resume is set in content.js.
  resume: profile.resume && {
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

// Hidden commands. They stay out of "help" and the command buttons.
const secretCommands = {
  "sudo hire muzzammil": () => [
    plain("[ OK ] Permission granted"),
    plain(`[ OK ] Hiring ${profile.name}`),
    plain(`Next step: ${profile.email}`),
  ],
  reboot: (os) => {
    os.reboot();
    return [plain("Rebooting...")];
  },
};

// Drop commands that are switched off, like resume before there is a resume.
for (const name of Object.keys(commands)) {
  if (!commands[name]) delete commands[name];
}

// The visible command names, used by the buttons and by Tab autocomplete.
export const commandNames = Object.keys(commands);

// Runs what the visitor typed and returns the lines to print.
export function runCommand(input, os, opener) {
  // Ignore capital letters and extra spaces, so "  HELP " still works.
  const name = input.trim().toLowerCase().replace(/\s+/g, " ");

  // Object.hasOwn stops words like "constructor" from counting as commands.
  if (Object.hasOwn(secretCommands, name)) return secretCommands[name](os);
  if (Object.hasOwn(commands, name)) return commands[name].run(os, opener);

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

  // Secret commands only complete once someone has started typing them.
  const secrets = Object.keys(secretCommands).filter((name) => typed.length >= 2 && name.startsWith(typed));
  return [...commandNames.filter((name) => name.startsWith(typed)), ...secrets];
}
