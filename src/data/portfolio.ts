export const profile = {
  name: "Nabin Khanal",
  role: "Systems Engineer • Distributed Systems & AI",
  headline: "Building reliable systems at the intersection of infrastructure and intelligence.",
  summary:
    "Systems-focused engineer passionate about distributed systems, infrastructure reliability, and AI — building low-level, production-grade systems and exploring how AI reshapes how we design, debug, and scale them.",
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
  defaultTitle: "Nabin Khanal | Systems Engineer",
  defaultDescription:
    "Portfolio of Nabin Khanal — systems engineer focused on distributed systems, operating systems, networking, and AI-augmented infrastructure. Building reliable, low-level systems and exploring AI for systems reliability and automation.",
  defaultKeywords: [
    "Nabin Khanal",
    "Systems Engineer",
    "Distributed Systems",
    "Operating Systems",
    "Computer Networks",
    "Infrastructure",
    "AI",
    "Machine Learning",
    "Backend Engineer",
    "Solutions Engineer",
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
        "Systems engineer focused on distributed systems, OS, networking, and reliability — building production-grade infrastructure and exploring AI for intelligent systems.",
    },
    about: {
      title: "About",
      path: "/about",
      description:
        "Systems-focused engineer with a deep interest in distributed systems, OS internals, networking, and how AI can make infrastructure more observable, resilient, and autonomous.",
    },
    projects: {
      title: "Projects",
      path: "/projects",
      description:
        "Systems, networking, and AI projects — from BitTorrent and network design to image inpainting with deep learning and high-performance backends.",
    },
    skills: {
      title: "Skills",
      path: "/skills",
      description:
        "Systems programming, distributed systems, networking, and AI/ML — languages, platforms, and fundamentals for building reliable infrastructure.",
    },
    work: {
      title: "Work",
      path: "/work",
      description:
        "Experience in systems reliability, production debugging, and customer-facing engineering across distributed and enterprise infrastructure.",
    },
    resume: {
      title: "Resume",
      path: "/resume",
      description:
        "Resume of Nabin Khanal — systems engineer specializing in distributed systems, infrastructure, and AI. Download PDF or view online.",
    },
    contact: {
      title: "Contact",
      path: "/contact",
      description:
        "Contact Nabin Khanal for systems engineering roles, distributed systems work, AI infrastructure, and collaboration.",
    },
  },
} as const;

export const pageCopy = {
  about: {
    paragraphs: [
      "I'm a systems-focused engineer who loves understanding how things work under the hood — from operating systems and networks to distributed coordination and failure modes. I enjoy tracing hard failures across the stack, reasoning about concurrency and consistency, and turning flaky, manual operations into reliable, observable systems.",
      "Recently, I've been exploring how AI augments systems work — from intelligent debugging and anomaly detection to ML-serving infrastructure and AI-assisted reliability. My goal is to build production-grade infrastructure that is both deeply principled in systems and augmented by intelligence.",
      "Currently a Solutions Engineer at guardsix (formerly Logpoint), I work close to production — debugging distributed enterprise systems across disk, network, database, and service layers in Java and Python environments.",
    ],
  },
  contact: {
    heading: "Let's build resilient systems",
    intro: "Direct contact details for hiring, collaboration, and systems & AI engineering opportunities.",
    summary:
      "Reach out for systems engineering roles, distributed systems / infrastructure work, or AI + systems collaboration. Email is the fastest way to reach me.",
  },
} as const;

export const navigation = [
  { href: "/", label: "Home", icon: "home" },
  { href: "/about", label: "About", icon: "person" },
  { href: "/projects", label: "Projects", icon: "deployed_code" },
  { href: "/skills", label: "Skills", icon: "terminal" },
  { href: "/work", label: "Work", icon: "work_history" },
  { href: "/resume", label: "Resume", icon: "description" },
  { href: "/contact", label: "Contact", icon: "mail" },
];

export const skillGroups = {
  languages: [
    "C",
    "C++",
    "Rust",
    "Go",
    "Python",
    "JavaScript",
    "SQL",
    "HTML",
    "CSS",
  ],
  technologies: [
    "Linux",
    "Git",
    "GitHub",
    "Docker",
    "GitHub Actions",
    "PyTorch",
    "FastAPI",
    "React",
    "Svelte",
    "Flask",
    "Django",
    "Express",
    "OpenGL",
    "Cisco Packet Tracer",
  ],
  courses: [
    "Distributed Systems",
    "Operating Systems",
    "Computer Networks",
    "Data Structures and Algorithms",
    "Object Oriented Programming",
    "Software Engineering",
    "Security Operations Fundamentals",
    "Project Management",
  ],
};

export const focusAreas = [
  {
    title: "Distributed Systems",
    icon: "lan",
    description: "Consistency, coordination, replication, and failure handling in real-world production systems.",
  },
  {
    title: "Systems & Infra",
    icon: "memory",
    description: "OS internals, networking, observability, and building reliable low-level components in Go / Rust / C++.",
  },
  {
    title: "AI for Systems",
    icon: "neurology",
    description: "Exploring ML-serving infra, anomaly detection, intelligent debugging, and AI-augmented reliability — e.g. partial-convolution inpainting with PyTorch.",
  },
];

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
