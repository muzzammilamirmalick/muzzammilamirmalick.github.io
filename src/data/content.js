// All of the website's content lives in this one file.
// To change the site's text, add a project or update a certification, edit it here.

export const profile = {
  name: "Muzzammil Malick",
  role: "Software development student at Mohawk College",
  availability: "Looking for a summer 2027 co-op",
  email: "muzzammilmalick@gmail.com",
  // Placeholder links. Replace these with your real profile addresses.
  linkedin: "https://www.linkedin.com/",
  github: "https://github.com/",
  // Replace public/resume.pdf with your real resume. This path can stay the same.
  resume: "/resume.pdf",
};

// Each string is one paragraph.
export const about = [
  "I've been writing code since I was 8 and taking computers apart for almost as long. When COVID sent everyone home, I turned that into a business: I repaired phones and computers across the GTA and built home office setups so people could keep working.",
  "Today I'm a Logistics Coordinator at IKEA, where I find what slows the team down and fix it, with software and on the floor. I study software development at Mohawk College, and I'm happiest where code meets hardware: embedded systems, aviation and logistics.",
  "I build things that work in the real world, and I'm looking for a summer 2027 co-op where I can do that on a real team.",
];

// To add a project, copy one block and change the values.
// Status can be any short label, such as "Live", "Building", "Up next" or "Planned".
export const projects = [
  {
    name: "Portfolio website",
    description:
      "A terminal-style portfolio with a cinematic intro, an interactive command line and sound design",
    tech: ["React", "Vite", "Motion"],
    status: "Live",
  },
  {
    name: "Live flight tracker",
    description:
      "A real-time map of aircraft in the sky right now, with search by flight number or airport and a saved history of each flight's path",
    tech: ["C#", "ASP.NET Core", "SQL", "REST APIs"],
    status: "Building",
  },
  {
    name: "ADS-B receiver",
    description:
      "My own ground station: a Raspberry Pi and radio antenna that catch signals broadcast by planes overhead, decode them and feed my flight tracker",
    tech: ["Raspberry Pi", "RTL-SDR", "Python", "Linux"],
    status: "Up next",
  },
  {
    name: "PC health monitor",
    description:
      "A custom desk display that shows my PC's live temperatures and CPU and GPU usage, streamed from the computer over USB",
    tech: ["ESP32", "C++", "serial communication"],
    status: "Planned",
  },
  {
    name: "Logistics workflow tool",
    description:
      "A web app that tracks and schedules warehouse tasks, built around real bottlenecks I see at work",
    tech: ["C#", "ASP.NET Core", "SQL"],
    status: "Planned",
  },
  {
    name: "Mini flight instrument",
    description:
      "A working artificial horizon like the one in a cockpit, driven by a motion sensor and drawn on a small screen in real time",
    tech: ["Microcontroller", "C++", "motion sensor"],
    status: "Planned",
  },
];

export const experience = [
  {
    role: "Logistics Coordinator",
    company: "IKEA",
    period: "2024 to present",
    points: [
      "Plan and run logistics projects from start to finish.",
      "Design new systems and processes, in software and on the floor, that make daily operations faster and more accurate.",
      "Trusted to lead the team and solve problems as they happen.",
    ],
  },
  {
    role: "Owner",
    company: "Phone and Computer Repair",
    period: "During COVID",
    points: [
      "Repaired phones and computers for customers across the GTA.",
      "Built home office setups so people could keep working remotely.",
      "Ran every part of the business myself, from finding customers to finishing the job.",
    ],
  },
];

export const education = [
  {
    school: "Mohawk College",
    program: "Computer Systems Technology, Software Development (co-op diploma)",
    period: "Expected 2028",
  },
];

// "learning" is shown as its own row. Use an empty list [] when there is nothing to show.
export const skills = [
  {
    group: "Software",
    items: ["C#", "Java", "SQL", "Python", "HTML", "CSS", "JavaScript"],
    learning: ["C", "C++"],
  },
  {
    group: "Hardware",
    items: ["PC building and repair", "phone repair", "home network setup"],
    learning: ["Raspberry Pi", "ESP32"],
  },
  {
    group: "Tools",
    items: ["Git", "GitHub", "Visual Studio", "VS Code", "Linux"],
    learning: [],
  },
];

// When you earn one, change its status and add the date, like this:
// { name: "GitHub Foundations", status: "Earned", date: "June 2027" },
export const certifications = [
  { name: "GitHub Foundations", status: "In progress" },
  { name: "Foundational C# with Microsoft (freeCodeCamp)", status: "In progress" },
  { name: "Transport Canada drone pilot certificate (Basic)", status: "In progress" },
  { name: "Oracle Cloud Infrastructure Foundations", status: "Planned" },
  { name: "Cisco Networking Academy: Linux and IoT", status: "Planned" },
];

// The links in the navigation bar. Each id matches a section on the page.
export const navLinks = [
  { id: "about", label: "About" },
  { id: "projects", label: "Projects" },
  { id: "experience", label: "Experience" },
  { id: "skills", label: "Skills" },
  { id: "certifications", label: "Certifications" },
  { id: "contact", label: "Contact" },
];
