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

export const aboutHighlight =
  "Final-year student who has independently shipped complete platforms end-to-end — including database design, authentication, RESTful API design, and AI-powered features.";

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
    name: "Radio Bill Pay",
    description:
      "Production-ready web platform for streamlined utility and bill payment services.",
    tech: ["Next.js", "React.js", "Payments"],
    liveUrl: "https://radiobillpay.com",
  },
  {
    index: "02",
    name: "Dost AI",
    description:
      "Full-stack AI platform integrating the Gemini API to power four distinct AI tools: image generation, blog creation, object removal, and article generation.",
    tech: ["React.js", "Node.js", "Neon (PostgreSQL)", "Clerk", "Gemini API"],
    liveUrl: "https://dost-ai-three.vercel.app/",
  },
  {
    index: "03",
    name: "FastMyPC",
    description:
      "Performance optimization and tech service platform web application.",
    tech: ["Next.js", "React.js", "Web Performance"],
    liveUrl: "https://fastmypc.com",
  },
  {
    index: "04",
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
