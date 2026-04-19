export const profile = {
  name: "Nabin Khanal",
  role: "Computer Engineer",
  headline: "Building reliable backend systems and practical engineering workflows.",
  summary:
    "Backend-focused engineer helping teams stabilize services, shorten debugging loops, and automate repetitive operational work.",
  currentRole: "Solutions Engineer",
  currentCompany: "guardsix (formerly Logpoint)",
  location: "Lalitpur, Nepal",
  email: "nabinkhanal688@gmail.com",
  website: "https://nabinkhanal00.com.np",
  github: "https://github.com/nabinkhanal00",
  linkedin: "https://www.linkedin.com/in/nabinkhanal00",
};

export const siteMetadata = {
  siteName: "Nabin Khanal Portfolio",
  defaultTitle: "Nabin Khanal | Computer Engineer",
  defaultDescription:
    "Portfolio of Nabin Khanal, a backend-focused computer engineer working across support engineering, systems reliability, and practical automation.",
  defaultKeywords: [
    "Nabin Khanal",
    "Computer Engineer",
    "Backend Engineer",
    "Solutions Engineer",
    "Systems Reliability",
    "Portfolio",
    "guardsix",
  ],
  socialImage: {
    url: "/images/nabin-professional-headshot.jpg",
    width: 921,
    height: 1152,
    alt: "Professional portrait of Nabin Khanal",
  },
  routes: {
    home: {
      title: "Portfolio",
      path: "/",
      description:
        "Backend-focused computer engineer building reliable services, practical debugging workflows, and automation for production teams.",
    },
    about: {
      title: "About",
      path: "/about",
      description:
        "Background, communication strengths, and engineering focus across backend systems, support work, and production troubleshooting.",
    },
    projects: {
      title: "Projects",
      path: "/projects",
      description:
        "Selected backend, systems, graphics, and networking projects that show practical delivery and strong engineering fundamentals.",
    },
    skills: {
      title: "Skills",
      path: "/skills",
      description:
        "Programming languages, tools, and engineering foundations used in project work and production support.",
    },
    work: {
      title: "Work",
      path: "/work",
      description:
        "Professional roles and community work centered on reliability, customer-facing troubleshooting, and backend problem solving.",
    },
    contact: {
      title: "Contact",
      path: "/contact",
      description:
        "Contact Nabin Khanal for hiring conversations, backend engineering opportunities, and systems-focused collaboration.",
    },
  },
} as const;

export const pageCopy = {
  about: {
    paragraphs: [
      "I work where backend engineering, production support, and clear customer communication meet. The problems I enjoy most involve tracing hard failures, improving service behavior, and turning repeated operational pain into dependable fixes.",
      "My strongest work shows up in incident analysis, API behavior, and lightweight automation that helps teams move faster with less manual effort.",
    ],
  },
  contact: {
    heading: "Let's build something useful",
    intro: "Direct contact details for hiring conversations, collaboration, and engineering opportunities.",
    summary:
      "Reach out for hiring conversations, backend engineering roles, or collaboration on systems-focused projects. Email is the fastest way to reach me.",
  },
} as const;

export const navigation = [
  { href: "/", label: "Home", icon: "home" },
  { href: "/about", label: "About", icon: "person" },
  { href: "/projects", label: "Projects", icon: "deployed_code" },
  { href: "/skills", label: "Skills", icon: "terminal" },
  { href: "/work", label: "Work", icon: "work_history" },
  { href: "/contact", label: "Contact", icon: "mail" },
];

export const skillGroups = {
  languages: [
    "HTML",
    "CSS",
    "JavaScript",
    "SQL",
    "C",
    "C++",
    "Python",
    "Golang",
    "Rust",
  ],
  technologies: [
    "Git",
    "GitHub",
    "Linux",
    "Docker",
    "GitHub Actions",
    "React",
    "Svelte",
    "Flask",
    "Django",
    "Express",
    "OpenGL",
    "Cisco Packet Tracer",
  ],
  courses: [
    "Object Oriented Programming",
    "Software Engineering",
    "Project Management",
    "Data Structures and Algorithms",
    "Distributed Systems",
    "Computer Networks",
    "Security Operations Fundamentals",
  ],
};

export const experience = [
  {
    period: "September 2025 - Present",
    role: "Solutions Engineer",
    organization: profile.currentCompany,
    highlights: [
      "Drove root cause analysis on complex technical issues and resolved the failures behind recurring escalations.",
      "Managed high-priority customer cases with practical workarounds and minimal service interruption.",
      "Built deeper hands-on debugging capability across Java and Python production environments.",
    ],
  },
  {
    period: "May 2024 - September 2025",
    role: "Associate Solutions Engineer",
    organization: profile.currentCompany,
    highlights: [
      "Resolved customer issues across disk management, networking, database operations, and web servers.",
      "Identified and fixed software defects that improved service stability and runtime behavior.",
      "Developed Go, Python, and Bash tooling to monitor disk health, memory usage, and network behavior.",
    ],
  },
  {
    period: "November 2023 - May 2024",
    role: "Backend Developer",
    organization: "Personalized Tutor Inc.",
    highlights: [
      "Developed REST APIs for an educational platform backend.",
      "Implemented OAuth-based authentication and authorization flows.",
      "Integrated the eSewa payment gateway into production workflows.",
    ],
  },
];

export const campusWork = [
  {
    year: "2023",
    title: "Software Fellowship Instructor",
    place: "LOCUS, Pulchowk Campus",
    details: "Delivered sessions on Python, Flask, and practical AI/ML foundations.",
  },
  {
    year: "2022",
    title: "Git Workshop Tutor",
    place: "IT Club, Pulchowk Campus",
    details: "Conducted hands-on workshops on Git and GitHub workflows.",
  },
  {
    year: "2023",
    title: "LOCUS Participant",
    place: "Pulchowk Campus",
    details: "Participated in Yomari Coding Competition, UxCam Codecamp, and Hitachi Technergy.",
  },
  {
    year: "2023",
    title: "LOCUS Organizer",
    place: "Pulchowk Campus",
    details: "Organized +2 Quiz, Typing Competition, and Hack A Week programs.",
  },
];

export const education = [
  {
    period: "November 2019 - April 2024",
    degree: "Bachelor in Computer Engineering",
    institution: "Pulchowk Campus, Lalitpur",
    notes: "IOE entrance rank 9 out of 12000 aspirants.",
  },
  {
    period: "2017 - 2019",
    degree: "+2 Science",
    institution: "Nepal Mega College, Babarmahal, Kathmandu",
    notes: "GPA 3.85, All Nepal second rank.",
  },
];

export const projects = [
  {
    title: "Image Inpainting with Partial Convolution",
    stack: ["SvelteKit", "Azure", "FastAPI", "PyTorch"],
    description:
      "Research-driven image restoration app that reconstructs missing regions with partial convolution and serves inference through a web interface.",
    href: "https://github.com/nabinkhanal00/image-inpainting-frontend",
  },
  {
    title: "Jobs API",
    stack: ["Node.js", "Express"],
    description:
      "REST API for managing clients, candidates, and job workflows with a predictable service-layer structure.",
    href: "https://github.com/nabinkhanal00/jobs-api",
  },
  {
    title: "Lekh",
    stack: ["Go", "Fiber", "MongoDB"],
    description:
      "Literature-focused publishing platform with social posting flows and Mongo-backed APIs for writers and readers.",
    href: "https://github.com/nabinkhanal00/lekh-backend",
  },
  {
    title: "BitTorrent Client",
    stack: ["Go"],
    description: "Command-line BitTorrent client in Go that parses torrents, connects to peers, and downloads pieces over the protocol.",
    href: "https://github.com/nabinkhanal00/gobittorrent",
  },
  {
    title: "Rubiks",
    stack: ["C++", "OpenGL"],
    description:
      "Interactive OpenGL Rubik's Cube simulator with 3D transforms, animation, and algorithmic move sequences.",
    href: "https://github.com/nabinkhanal00/rubiks",
  },
  {
    title: "Breakout",
    stack: ["C++", "OpenGL"],
    description: "Arcade-style Breakout clone built with C++ and OpenGL, including collision handling, rendering, and gameplay loops.",
    href: "https://github.com/nabinkhanal00/breakout",
  },
  {
    title: "Pulchowk Campus Network Design",
    stack: ["Cisco Packet Tracer"],
    description:
      "Simulated campus network design covering segmentation, routing, and service reliability across academic blocks.",
    href: "https://github.com/nabinkhanal00/computer-network-lab-files",
  },
];

export const spokenLanguages = [
  "Nepali (native)",
  "English (proficient)",
  "Hindi (conversational)",
];
