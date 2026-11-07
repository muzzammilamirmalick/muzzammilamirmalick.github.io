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

// The messages typed on the monitor during the intro.
export const boot = {
  command: "boot portfolio --user muzzammil",
  steps: ["Loading skills", "Mounting projects", "Starting detailing app"],
  welcome: `Welcome, ${profile.name}`,
};

// The full About text. It appears in Simple view. Each string is one paragraph.
export const about = [
  "I've been writing code since I was 8 and taking computers apart for almost as long. When COVID sent everyone home, I turned that into a business: I repaired phones and computers across the GTA and built home office setups so people could keep working.",
  "Today I'm a Logistics Coordinator at IKEA, where I find what slows the team down and fix it, with software and on the floor. I study software development at Mohawk College, and I'm happiest where code meets hardware: embedded systems, aviation and logistics.",
  "I build things that work in the real world, and I'm looking for a summer 2027 co-op where I can do that on a real team.",
];

// The two lines the "about" terminal command prints.
export const aboutShort = [
  "I'm happiest where code meets hardware: embedded systems, aviation and logistics.",
  "I build things that work in the real world.",
];

// The stops on the Journey timeline. "detail" appears when someone clicks a stop.
// "icon" is a name from src/components/ui/Icon.jsx.
export const journey = [
  {
    when: "Age 8",
    title: "Wrote my first code",
    icon: "terminal",
  },
  {
    when: "2020",
    title: "Started a repair business",
    detail:
      "A phone and computer repair business in the GTA during COVID. I built home office setups so people could keep working.",
    icon: "wrench",
  },
  {
    when: "2022",
    title: "Started M&M Detailing",
    detail: "With a wagon, going door to door in my neighbourhood.",
    icon: "car",
  },
  {
    when: "2024",
    title: "Logistics Coordinator at IKEA",
    detail: "Building systems and processes that make daily work faster.",
    icon: "experience",
  },
  {
    when: "2025",
    title: "Started Software Development at Mohawk College",
    icon: "school",
  },
  {
    when: "Now",
    title: "Building the M&M Detailing app, with Shot AI up next",
    icon: "spark",
  },
];

// The numbers that count up on the Journey app.
export const stats = [
  { value: 1000, prefix: "About ", label: "cars detailed" },
  { value: 100, suffix: "+", label: "customers" },
  { value: 2, label: "businesses started" },
  { value: 2.5, decimals: 1, label: "years at IKEA" },
];

export const codingSince = "Coding since age 8";

// To add a project, copy one block and change the values.
// Status can be "Live", "Building", "Up next" or "Planned". Planned projects go in the
// "Coming later" folder. To add a video preview, put the file in public/videos/ and
// add a line like this to the project: video: "/videos/shot-ai.mp4",
// "preview" picks the animated placeholder shown until there is a video.
export const projects = [
  {
    name: "Portfolio website (MuzzOS)",
    description:
      "A hacker desktop in the browser with a cinematic intro, draggable windows and sound design.",
    tech: ["React", "Vite", "Motion"],
    status: "Live",
    preview: "desktop",
  },
  {
    name: "M&M Detailing booking app and website",
    description:
      "Online booking, an admin dashboard, retainer accounts for dealerships and a before and after gallery for my detailing business.",
    tech: ["React", "C#", "ASP.NET Core", "SQL", "Azure"],
    status: "Building",
    preview: "calendar",
  },
  {
    name: "Shot AI",
    description:
      "An AI basketball coach that counts my makes and misses, tracks my shot arc, checks my form and maps my hot spots.",
    tech: ["Computer vision", "Python", "OpenCV"],
    status: "Up next",
    preview: "basketball",
  },
  {
    name: "Live flight tracker",
    description:
      "A real-time map of aircraft in the sky right now, with search by flight number or airport and a saved history of each flight's path.",
    tech: ["C#", "ASP.NET Core", "SQL", "REST APIs"],
    status: "Planned",
  },
  {
    name: "ADS-B receiver",
    description:
      "My own ground station: a Raspberry Pi and radio antenna that catch signals broadcast by planes overhead, decode them and feed my flight tracker.",
    tech: ["Raspberry Pi", "RTL-SDR", "Python", "Linux"],
    status: "Planned",
  },
  {
    name: "PC health monitor",
    description:
      "A custom desk display that shows my PC's live temperatures and CPU and GPU usage, streamed from the computer over USB.",
    tech: ["ESP32", "C++", "serial communication"],
    status: "Planned",
  },
  {
    name: "Logistics workflow tool",
    description:
      "A web app that tracks and schedules warehouse tasks, built around real bottlenecks I see at work.",
    tech: ["C#", "ASP.NET Core", "SQL"],
    status: "Planned",
  },
  {
    name: "Mini flight instrument",
    description:
      "A working artificial horizon like the one in a cockpit, driven by a motion sensor and drawn on a small screen in real time.",
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
    company: "M&M Detailing",
    period: "2022 to present",
    location: "GTA",
    points: [
      "Started with a wagon in my neighbourhood, then grew through door-to-door sales and advertising.",
      "About 1,000 cars detailed for 100+ customers.",
      "Businesses and dealerships on monthly retainers.",
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

// Everything in the M&M Detailing app.
export const detailing = {
  name: "M&M Detailing",
  tagline: "From a wagon to monthly retainers.",
  // Placeholder link. Replace this with the real Instagram address.
  instagram: "https://www.instagram.com/",
  story: [
    { title: "A wagon", text: "Started with a wagon in my neighbourhood.", icon: "wagon" },
    { title: "Door to door", text: "Sold door to door.", icon: "door" },
    { title: "Advertising", text: "Used advertising to grow.", icon: "megaphone" },
    { title: "Retainers", text: "Businesses and dealerships on monthly retainers.", icon: "building" },
  ],
  stats: [
    { value: 1000, prefix: "About ", label: "cars detailed" },
    { value: 100, suffix: "+", label: "customers" },
    { value: 2022, plain: true, label: "started in the GTA" },
  ],
  services: [
    { name: "Interior", icon: "seat" },
    { name: "Exterior", icon: "car" },
    { name: "Engine bay", icon: "engine" },
    { name: "Disaster detail", icon: "alert" },
    { name: "Ceramic coating", icon: "shield" },
    { name: "Mobile detailing", icon: "van" },
  ],
  // To use real photos, put them in public/detailing/ and change these two paths.
  // Both photos should be the same size so the slider lines up.
  beforeAfter: {
    before: "/detailing/before-placeholder.svg",
    after: "/detailing/after-placeholder.svg",
  },
  comingSoon: {
    title: "Booking app and website",
    text: "Online booking, an admin dashboard and retainer accounts.",
  },
};

// The links in the navigation bar. Each id matches a section on the page.
export const navLinks = [
  { id: "about", label: "About" },
  { id: "projects", label: "Projects" },
  { id: "experience", label: "Experience" },
  { id: "skills", label: "Skills" },
  { id: "certifications", label: "Certifications" },
  { id: "contact", label: "Contact" },
];
