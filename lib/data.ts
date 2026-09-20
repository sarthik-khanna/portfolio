export const profile = {
  name: "Sarthik Khanna",
  title: "Full Stack Developer at Needle Ads Technology",
  stack: "React.js, Next.js, Node.js, TypeScript",
  location: "Chandigarh, India",
  summary:
    "Full Stack Developer with hands-on experience building production-style, AI-integrated web applications using Next.js, React.js, Node.js, and TypeScript.",
  email: "sarthikkhanna28@gmail.com",
  phone: "+91 9855328428",
  whatsapp: "919855328428",
  resumeUrl: "/Resume.pdf",
  resumeFileName: "Sarthik-Khanna-Resume.pdf",
};

export const whatsappLinks = {
  nav: `https://wa.me/${profile.whatsapp}`,
  hero: `https://wa.me/${profile.whatsapp}?text=${encodeURIComponent(
    "Hi Sarthik, I visited your portfolio!"
  )}`,
  floating: `https://wa.me/${profile.whatsapp}?text=${encodeURIComponent(
    "Hi Sarthik, I would like to connect!"
  )}`,
};

export const navLinks = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Achievements", href: "#achievements" },
  { label: "Contact", href: "#contact" },
];

export const experience = {
  role: "Full Stack Developer",
  company: "Needle Ads Technology",
  period: "Present",
};

export const education = {
  degree: "B.E. in Computer Science (AI & Data Science)",
  school: "Chandigarh Group of Colleges, Landran, Mohali",
  period: "Aug 2023 – Jul 2027",
  cgpa: "7.0 / 10",
};

export const aboutParagraphs = [
  "I'm a Full Stack Developer at Needle Ads Technology and a final-year B.E. student in AI & Data Science. I like owning a product end-to-end: database design, authentication, REST APIs, and the interface people actually use.",
  "Most of my recent work mixes web apps with AI and automation. I built Dost AI, a Gemini-powered suite of four AI tools on React, Node.js, Neon Postgres and Clerk auth, and Code-X, a coding practice platform with its own code execution engine, hidden test-case grading and a 4-level AI mentor whose hints are gated on the server. I also shipped FastMyPC, a PC performance and tech service site, in Next.js.",
  "My latest build steps outside the browser: Truecaller Extractor, a Windows desktop app in Python that automates number lookups with Playwright and exports the results to CSV and HTML. It has a persistent one-time sign-in, bulk search from Excel or CSV files, and rate-limiting safeguards, and it ships as a standalone .exe.",
];

export type SkillGroup = {
  label: string;
  items: string[];
};

export const skillGroups: SkillGroup[] = [
  {
    label: "Languages",
    items: ["JavaScript (ES6+)", "TypeScript", "Java", "SQL", "Python"],
  },
  {
    label: "Frontend",
    items: [
      "React.js",
      "Next.js",
      "HTML5",
      "CSS3",
      "Tailwind CSS",
      "Responsive Web Design",
    ],
  },
  {
    label: "Backend",
    items: ["Node.js", "Express.js", "RESTful API Design"],
  },
  {
    label: "Databases",
    items: ["MongoDB", "MySQL", "PostgreSQL (Neon)", "Firestore"],
  },
  {
    label: "Cloud & Auth",
    items: [
      "Firebase (Auth/Firestore)",
      "Clerk Authentication",
      "AWS (Cloud Operations)",
      "Vercel",
    ],
  },
  {
    label: "AI/ML & Automation",
    items: [
      "Gemini API (LLM Integration)",
      "Pandas",
      "NumPy",
      "N8N (Workflow Automation)",
    ],
  },
];

export type Project = {
  index: string;
  name: string;
  description: string;
  tech: string[];
  liveUrl?: string;
  codeUrl?: string;
};

export const projects: Project[] = [
  {
    index: "01",
    name: "Dost AI",
    description:
      "Full-stack AI platform integrating the Gemini API to power four distinct AI tools: image generation, blog creation, object removal, and article generation.",
    tech: ["React.js", "Node.js", "Neon (PostgreSQL)", "Clerk", "Gemini API"],
    liveUrl: "https://dost-ai-three.vercel.app/",
  },
  {
    index: "02",
    name: "FastMyPC",
    description:
      "Performance optimization and tech service platform web application.",
    tech: ["Next.js", "React.js", "Web Performance"],
    liveUrl: "https://fastmypc.com",
  },
  {
    index: "03",
    name: "Code-X",
    description:
      "Full-stack coding practice platform with a custom code execution engine, hidden test case grading, and a 4-level AI mentor with server-side hint-progression gating.",
    tech: [
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "Firebase",
      "Gemini API",
      "Monaco Editor",
    ],
  },
  {
    index: "04",
    name: "Truecaller Extractor",
    description:
      "Windows desktop app that looks up phone numbers on your own Truecaller account, one at a time or from an Excel/CSV list, and saves the name, email and location to a CSV plus the result page as HTML. Built with Playwright browser automation, a one-time OTP sign-in that persists between sessions, number normalisation for +91 formats, and built-in safeguards: randomised delays, a daily search limit and status detection for hidden, signed-out and human-check results. Packaged as a standalone .exe.",
    tech: [
      "Python",
      "Tkinter",
      "Playwright",
      "BeautifulSoup",
      "phonenumbers",
      "PyInstaller",
    ],
  },
];

export type Achievement = {
  title: string;
  detail: string;
  year: string;
};

export const achievements: Achievement[] = [
  {
    title: "Runner-up, Smart India Hackathon",
    detail: "Placed 2nd in a national-level hackathon competition.",
    year: "2025",
  },
  {
    title: "State-Level Handball Champion",
    detail: "Placed 1st representing the state in a competitive championship.",
    year: "2022",
  },
  {
    title: "AWS Certified Cloud Operations",
    detail: "Amazon Web Services certification.",
    year: "2024",
  },
  {
    title: "MERN Stack Development Certification",
    detail: "Completed a full-stack development certification program.",
    year: "2025",
  },
];
