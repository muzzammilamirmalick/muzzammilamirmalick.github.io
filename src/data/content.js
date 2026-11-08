// All of the website's content lives in this one file.
// To change the site's text, add a project or update a certification, edit it here.

// Your IKEA job title. It is used in About, Journey and Experience.
const ikeaTitle = "[YOUR IKEA TITLE]";

export const profile = {
  name: "Muzzammil Malick",
  role: "Software development student at Mohawk College",
  availability: "Looking for a summer 2027 co-op",
  email: "muzzammilmalick@gmail.com",
  linkedin: "https://www.linkedin.com/in/muzzammil-malick-2a8346346/",
  github: "https://github.com/muzzammilamirmalick",
  // The Resume buttons stay hidden while this is null. When you add public/resume.pdf,
  // change this to "/resume.pdf".
  resume: null,
};

// The messages typed on the monitor during the intro.
export const boot = {
  command: "boot portfolio --user muzzammil",
  steps: ["Loading skills", "Mounting projects", "Starting detailing app"],
};

// The full About text. It appears in Simple view. Each string is one paragraph.
export const about = [
  "I've been writing code since I was 8 and taking computers apart for almost as long. When COVID sent everyone home, I turned that into a business: I repaired phones and computers across the GTA and built home office setups so people could keep working.",
  `Today I'm a ${ikeaTitle} at IKEA, where I find what slows the team down and fix it, with software and on the floor. I study software development at Mohawk College, and I'm happiest where code meets hardware: embedded systems, aviation and logistics.`,
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
    title: "Started MXM Detailing",
    detail: "With a wagon, going door to door in my neighbourhood.",
    icon: "car",
  },
  {
    when: "2024",
    title: `${ikeaTitle} at IKEA`,
    detail: "Building systems and processes that make daily work faster.",
    icon: "experience",
  },
  {
    when: "2025",
    title: "Started Software Development at Mohawk College",
    icon: "school",
  },
  {
    when: "March 2026",
    title: "Project Lead, Riipen Labs consulting project for EduTutor",
    detail:
      "Built a growth strategy for EduTutor, a Toronto tutoring company, and kept the team on track after two members left.",
    icon: "projects",
  },
  {
    when: "April 2026",
    title: "Operations Lead, Riipen Labs project for the Art Circle of Alberta",
    detail: "Built a revenue strategy and a new website in Next.js.",
    icon: "projects",
  },
  {
    when: "Now",
    title: "Building the MXM Detailing app, with Shot AI up next",
    icon: "spark",
  },
];

// The numbers that count up on the Journey app.
export const stats = [
  { value: 1000, prefix: "About ", label: "cars detailed" },
  { value: 100, suffix: "+", label: "customers" },
  { value: 2, label: "businesses started" },
  { value: 2, suffix: "+", label: "years at IKEA" },
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
    name: "MXM Detailing booking app and website",
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

// "points" is optional. Leave it out when a job has no details to show.
export const experience = [
  {
    role: ikeaTitle,
    company: "IKEA",
    period: "Aug 2024 to present",
    location: "Burlington",
    points: [
      "Found that evening home delivery staging lost 4 to 5 hours of labour per shift because the delivery platform and the warehouse picking system shared order data with no automated link.",
      "Proposed an automated sync between the two systems and a 3-person picking pod that sorts carts by route; the process was adopted, cutting up to 4 to 5 hours of staging per shift for staff who use it.",
      "Built an interactive web simulation to present the old and new process to management.",
      "Trained 15+ coworkers on the Click & Collect process using an interactive training page I built.",
    ],
  },
  {
    role: "Founder and Owner",
    company: "MXM Detailing",
    period: "Jan 2022 to present",
    location: "GTA",
    points: [
      "Started with a wagon in my neighbourhood, then grew through door-to-door sales and advertising.",
      "About 1,000 cars detailed for 100+ customers.",
      "Businesses and dealerships on monthly retainers.",
    ],
  },
  {
    role: "Academic Tutor",
    company: "Tutor Teach",
    period: "Nov 2024 to Feb 2026",
    points: ["Tutored computer science and general subjects."],
  },
  {
    role: "Team Lead",
    company: "Tim Hortons",
    period: "Oct 2022 to Feb 2024",
    location: "Burlington",
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
  { name: "Oracle Cloud Infrastructure Foundations", status: "Planned" },
];

// Everything in the MXM Detailing app.
export const detailing = {
  name: "MXM Detailing",
  tagline: "From a wagon to monthly retainers.",
  instagram: "https://www.instagram.com/mxmdetailing/",
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

