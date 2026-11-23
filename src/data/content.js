// All of the website's content lives in this one file.
// To change the site's text, add a project or update a certification, edit it here.

// Your IKEA job title. It is used in About, Journey and Experience.
const ikeaTitle = "Logistics Associate, Level 3 (Acting Warehouse Supervisor)";

export const profile = {
  name: "Muzzammil Malick",
  role: "Software development student at Mohawk College",
  availability: "Looking for a May 2027 co-op",
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

// The lines typed at the top of Simple view. Keep them under 34 letters so they fit on a phone.
export const simpleBoot = [
  "> open quick_view",
  "[ OK ] Loading projects",
  "[ OK ] Loading experience",
  "[ OK ] Ready",
];

// The full About text. It appears in Simple view. Each string is one paragraph.
export const about = [
  "I've been writing code since I was 8 and taking computers apart for almost as long. During COVID I turned that into a business, repairing phones and computers across the GTA and setting up home offices.",
  `Today I'm a ${ikeaTitle} at IKEA, where I find what slows the team down and fix it. I study software development at Mohawk College, and I'm happiest where code meets hardware: embedded systems, aviation and logistics.`,
  "I build things that work in the real world, and I'm looking for a May 2027 co-op where I can do that on a real team.",
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
    when: "Oct 2026",
    title: "Built the My Sky flight tracker",
    detail:
      "A live map of planes over Hamilton from my own ADS-B antenna on a Raspberry Pi.",
    status: "Built",
    link: "https://github.com/muzzammilamirmalick/flight-tracker",
    icon: "projects",
  },
  {
    when: "Nov 2026",
    title: "Launched the MXM Detailing booking app",
    detail: "Built for my own detailing business",
    status: "Live",
    link: "https://mxmdetailing.com",
    icon: "car",
  },
  {
    when: "Nov 2026",
    title: "Built gesture control for my computer",
    detail: "Hand and voice control for my computer: both hands tracked, finger counting, gestures I train myself and offline voice commands.",
    status: "Built",
    link: "https://github.com/muzzammilamirmalick/gesture-desktop",
    icon: "projects",
  },
  {
    when: "Now",
    title: "Working on the Drone and Object Tracker",
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
  credit: "Built for my own detailing business",
  description:
    "Online booking with photo quotes, an owner dashboard and retainer accounts for dealerships.",
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
  description:
    "A live map of planes over Hamilton from my own ADS-B antenna on a Raspberry Pi. It shows which way to look and what each plane is.",
  tech: ["C#", "ASP.NET Core", "PostgreSQL", "React", "TypeScript", "Raspberry Pi"],
  highlights: [
    "Reads planes from my own antenna, with OpenSky as a backup source behind one interface",
    "Look Up card: the compass direction and angle to find the plane in the real sky",
    "Live map with altitude colours, smooth motion and fading trails",
    "Split-flap board, a day replay and a Today over Hamilton stats page",
    "Aviation history: 10 famous flights mapped from official accident reports, with the ATC exchange and the safety lessons",
    "xUnit and Vitest tests, with a GitHub Actions pipeline",
  ],
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
      src: "/projects/flight-tracker/flight-history.webp",
      width: 1440,
      height: 900,
      alt: "The Aviation history page showing Air Transat 236's path across the Atlantic with numbered key points and a timeline",
      caption: "Aviation history, from the accident reports",
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
    {
      src: "/projects/flight-tracker/flight-phone-history.webp",
      width: 390,
      height: 844,
      alt: "The Aviation history page on a phone, with the map on top and the list of flights below",
      caption: "Aviation history, phone",
      phone: true,
    },
  ],
};

// The two standalone tools in public/tools/. Their windows, Projects and Simple view
// all read from here, so a change made once shows up everywhere.
export const operationsTool = {
  name: "Team Operations Dashboard",
  status: "Built",
  url: "/tools/operations-dashboard.html",
  description:
    "A live operations screen for running a shift. It shows the order breakdown, a daily priority recommendation, alerts, team and breaks, a task board and task assignment. Built from scratch with no libraries. It has light and dark themes and saves its state in the browser.",
  tech: ["HTML", "CSS", "JavaScript"],
  image: {
    src: "/projects/tools/operations-dashboard.webp",
    width: 1200,
    height: 750,
    alt: "The Team Operations Dashboard with sample orders and a priority recommendation",
  },
};

export const trainingTool = {
  name: "Click & Collect Training Simulator",
  status: "Built",
  url: "/tools/training-simulator.html",
  description:
    "An interactive trainer that walks new staff through the order pickup process with hands-on modules and a quiz.",
  tech: ["React"],
  image: {
    src: "/projects/tools/training-simulator.webp",
    width: 1200,
    height: 750,
    alt: "The Click & Collect Training Simulator home page with its list of modules",
  },
};

// To add a project, copy one block and change the values.
// Status can be "Live", "Built", "Working on it" or "Planned". Live and Built projects are
// shown first, then the ones in progress. Planned projects go in the "Coming later" folder.
// To add a video preview, put the file in public/videos/ and
// add a line like this to the project: video: "/videos/drone-tracker.mp4",
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
    tech: mxmApp.tech,
    status: mxmApp.status,
    url: mxmApp.url,
    codeNote: mxmApp.codeNote,
    highlights: mxmApp.highlights, // Only Simple view lists these.
    // Shows the first screenshot on the card, and opens the MXM project window.
    image: mxmApp.screenshots[0],
    opensApp: "mxm",
    opensLabel: "Screenshots",
    preview: "calendar",
  },
  {
    name: flightApp.name,
    description: flightApp.description,
    tech: flightApp.tech,
    status: flightApp.status,
    repo: flightApp.repo,
    highlights: flightApp.highlights,
    // Shows the first screenshot on the card, and opens the My Sky project window.
    image: flightApp.screenshots[0],
    opensApp: "flight",
    opensLabel: "Screenshots",
  },
  {
    name: operationsTool.name,
    description: operationsTool.description,
    tech: operationsTool.tech,
    status: operationsTool.status,
    tool: operationsTool.url, // Simple view links straight to the tool.
    image: operationsTool.image,
    opensApp: "operations",
    opensLabel: "Open dashboard",
  },
  {
    name: trainingTool.name,
    description: trainingTool.description,
    tech: trainingTool.tech,
    status: trainingTool.status,
    tool: trainingTool.url, // Simple view links straight to the tool.
    image: trainingTool.image,
    opensApp: "training",
    opensLabel: "Open simulator",
  },
  {
    name: "Gesture control",
    description:
      "Control my computer with my hands and voice. It tracks both hands at 60 fps, counts fingers, learns gestures I record and changes controls for the app in front. Voice runs offline.",
    tech: ["Python", "MediaPipe", "OpenCV", "Vosk", "PyInstaller", "pytest"],
    status: "Built",
    repo: "https://github.com/muzzammilamirmalick/gesture-desktop",
    preview: "hand",
  },
  {
    name: "Drone and Object Tracker",
    description:
      "A computer vision system that detects and identifies small flying objects like a drone, tracks it across the frame, and locks on as it moves.",
    tech: ["Python", "OpenCV", "Machine learning"],
    status: "Working on it",
    preview: "tracker",
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
      "Found that evening home delivery staging lost 4 to 5 hours of labour per shift because the delivery platform and the picking system had no automated link.",
      "Proposed an automated sync and a 3-person picking pod that sorts carts by route. It was adopted and cuts up to 4 to 5 hours of staging per shift.",
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
// { name: "Microsoft Azure Fundamentals (AZ-900)", status: "Earned", date: "June 2027" },
// image and url are optional: a picture of the certificate and the link to verify it.
export const certifications = [
  {
    name: "Foundational C# with Microsoft",
    status: "Earned",
    date: "November 2026",
    image: "/certifications/foundational-csharp.webp",
    url: "https://freecodecamp.org/certification/fcc26fe8de7-3980-49b0-ac7e-e56cce1c8cf8/foundational-c-sharp-with-microsoft",
  },
  { name: "Microsoft Azure Fundamentals (AZ-900)", status: "In progress" },
  { name: "Microsoft Azure Developer Associate (AZ-204)", status: "Planned" },
  { name: "Microsoft Azure AI Fundamentals (AI-900)", status: "Planned" },
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

