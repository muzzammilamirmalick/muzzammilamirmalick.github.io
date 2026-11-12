// All of the website's content lives in this one file.
// To change the site's text, add a project or update a certification, edit it here.

// Your IKEA job title. It is used in About, Journey and Experience.
const ikeaTitle = "Logistics Associate, Level 3 (Acting Warehouse Supervisor)";

export const profile = {
  name: "Muzzammil Malick",
  role: "Software development student at Mohawk College",
  availability: "Looking for a summer 2027 co-op",
  email: "muzzammilmalick@gmail.com",
  linkedin: "https://www.linkedin.com/in/muzzammil-malick-2a8346346/",
  github: "https://github.com/muzzammilamirmalick",
  // Set to null to hide the Resume window, terminal command and Simple view link.
  resume: "/resume.pdf",
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
    when: "Nov 2026",
    title: "Launched the MXM Detailing booking app",
    detail: "Designed and built by Muzzammil Malick for my own detailing business",
    status: "Live",
    link: "https://mxmdetailing.com",
    icon: "car",
  },
  {
    when: "Nov 2026",
    title: "Built the My Sky flight tracker",
    detail:
      "A live map of planes over Hamilton from my own ADS-B antenna on a Raspberry Pi.",
    status: "Built",
    link: "https://github.com/muzzammilamirmalick/flight-tracker",
    icon: "projects",
  },
  {
    when: "Now",
    title: "Shot AI is up next",
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

// The MXM Detailing booking app. Projects, the MXM Detailing app, Journey and Simple view
// all read from here, so a change made once shows up everywhere.
export const mxmApp = {
  name: "MXM Detailing booking app and website",
  status: "Live",
  url: "https://mxmdetailing.com",
  credit: "Designed and built by Muzzammil Malick for my own detailing business",
  description:
    "Online booking with photo quotes, an owner dashboard and retainer accounts for dealerships, running live for my detailing business.",
  tech: ["React", "C#", "ASP.NET Core", "SQL Server", "Azure"],
  highlights: [
    "Approval-based booking with photo quotes",
    "Owner dashboard with two-factor login and retainer tracking",
    "380+ automated tests",
    "GitHub Actions deploy pipeline",
  ],
  // The code is in a private repository.
  codeNote: "Code walkthrough available on request",
  // Screenshots of the live site, saved as WebP in public/projects/mxm/.
  screenshots: [
    {
      src: "/projects/mxm/home-desktop.webp",
      width: 1200,
      height: 750,
      alt: "The MXM Detailing home page on a desktop, with a Book now button and a car you can wipe clean",
      caption: "Home page, desktop",
    },
    {
      src: "/projects/mxm/booking-builder.webp",
      width: 1200,
      height: 750,
      alt: "The booking builder, with Full Detail chosen and an estimated total of $150",
      caption: "Booking builder with a live estimate",
    },
    {
      src: "/projects/mxm/home-phone.webp",
      width: 390,
      height: 844,
      alt: "The MXM Detailing home page on a phone",
      caption: "Home page, phone",
      phone: true,
    },
  ],
};

// The My Sky flight tracker. Projects, the My Sky window, Journey and Simple view
// all read from here, so a change made once shows up everywhere.
export const flightApp = {
  name: "My Sky flight tracker",
  status: "Built",
  repo: "https://github.com/muzzammilamirmalick/flight-tracker",
  credit: "Built by Muzzammil Malick",
  description:
    "A live map of planes over Hamilton, picked up by my own ADS-B antenna on a Raspberry Pi. It tells you which way to look in the sky and what the plane is, in plain words.",
  tech: ["C#", "ASP.NET Core", "PostgreSQL", "React", "TypeScript", "Raspberry Pi"],
  highlights: [
    "Reads planes from my own antenna, with OpenSky as a backup source behind one interface",
    "Look Up card: the compass direction and angle to find the plane in the real sky",
    "Live map with altitude colours, smooth motion and fading trails",
    "Split-flap board, a day replay and a Today over Hamilton stats page",
    "xUnit and Vitest tests, with a GitHub Actions pipeline",
  ],
  codeNote: "Open source on GitHub",
  // When the demo video is ready, put it in public/videos/ and set:
  // video: "/videos/my-sky.mp4",
  screenshots: [
    {
      src: "/projects/flight-tracker/flight-replay.webp",
      width: 1440,
      height: 900,
      alt: "The My Sky live map replaying the evening planes over Hamilton",
      caption: "Replaying the day over Hamilton",
    },
    {
      src: "/projects/flight-tracker/flight-details.webp",
      width: 1440,
      height: 900,
      alt: "Tapping a plane shows its airline, type, altitude, speed and route",
      caption: "Plane details in plain words",
    },
    {
      src: "/projects/flight-tracker/flight-today.webp",
      width: 1440,
      height: 900,
      alt: "The Today over Hamilton page, showing the planes picked up and the busiest hour",
      caption: "Today over Hamilton",
    },
    {
      src: "/projects/flight-tracker/flight-phone-live.webp",
      width: 390,
      height: 844,
      alt: "The live map on a phone",
      caption: "Live map, phone",
      phone: true,
    },
    {
      src: "/projects/flight-tracker/flight-phone-board.webp",
      width: 390,
      height: 844,
      alt: "The nearest planes board on a phone",
      caption: "Nearest planes, phone",
      phone: true,
    },
  ],
};

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
    name: mxmApp.name,
    description: mxmApp.description,
    credit: mxmApp.credit,
    tech: mxmApp.tech,
    status: mxmApp.status,
    url: mxmApp.url,
    codeNote: mxmApp.codeNote,
    // Shows the first screenshot on the card, and opens the MXM project window.
    image: mxmApp.screenshots[0],
    opensApp: "mxm",
    preview: "calendar",
  },
  {
    name: flightApp.name,
    description: flightApp.description,
    credit: flightApp.credit,
    tech: flightApp.tech,
    status: flightApp.status,
    codeNote: flightApp.codeNote,
    // Shows the first screenshot on the card, and opens the My Sky project window.
    image: flightApp.screenshots[0],
    opensApp: "flight",
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
      "Designed and built the business's booking app, live at mxmdetailing.com.",
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
    points: [
      "Led shifts of 10 team members in a high-volume store, running daily operations and the guest experience.",
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
// image and url are optional: a picture of the certificate and the link to verify it.
export const certifications = [
  {
    name: "Foundational C# with Microsoft (freeCodeCamp)",
    status: "Earned",
    date: "November 2026",
    image: "/certifications/foundational-csharp.webp",
    url: "https://freecodecamp.org/certification/fcc26fe8de7-3980-49b0-ac7e-e56cce1c8cf8/foundational-c-sharp-with-microsoft",
  },
  { name: "GitHub Foundations", status: "In progress" },
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
  // Before and after photos. Each pair gets a button above the slider.
  // To add a pair, put the two JPGs in photos/detailing/, run
  // "python scripts/detailing-photos.py", then add a block here.
  // "label" is the short button text, "caption" sits under the photo.
  beforeAfter: [
    {
      label: "Mini",
      caption: "Interior detail, Mini Cooper",
      before: "/detailing/mini-interior-before.webp",
      after: "/detailing/mini-interior-after.webp",
    },
    {
      label: "Truck",
      caption: "Interior detail, pickup truck",
      before: "/detailing/truck-interior-before.webp",
      after: "/detailing/truck-interior-after.webp",
    },
    {
      label: "Subaru",
      caption: "Engine bay detail, Subaru",
      before: "/detailing/subaru-engine-before.webp",
      after: "/detailing/subaru-engine-after.webp",
      wide: true,
    },
    {
      label: "Tiguan",
      caption: "Interior detail, VW Tiguan",
      before: "/detailing/tiguan-interior-before.webp",
      after: "/detailing/tiguan-interior-after.webp",
    },
  ],
};

