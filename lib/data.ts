export const profile = {
  name: "Sarthik Khanna",
  firstName: "Sarthik",
  title: "Full Stack Developer at Needle Ads Technology",
  stack: "React.js, Next.js, Node.js, TypeScript",
  location: "Chandigarh, India",
  summary:
    "Full Stack Developer with hands-on experience building production-style, AI-integrated web applications using Next.js, React.js, Node.js, and TypeScript. I own products end to end, from database design and APIs to the interface people actually use.",
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

export const socials = [
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/sarthik-khanna-05650a276/",
  },
  { label: "GitHub", href: "https://github.com/sarthik-khanna" },
  { label: "Email", href: `mailto:${profile.email}` },
];

export const navLinks = [
  { label: "Home", href: "#top" },
  { label: "Services", href: "#services" },
  { label: "Projects", href: "#projects" },
  { label: "Skills", href: "#skills" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

export type Service = {
  title: string;
  description: string;
};

export const services: Service[] = [
  {
    title: "Full Stack Web Apps",
    description:
      "I build complete products end to end: database design, authentication, REST APIs and the interface people actually use.",
  },
  {
    title: "Frontend Development",
    description:
      "Fast, responsive interfaces in React and Next.js with Tailwind CSS, built to feel smooth on every screen size.",
  },
  {
    title: "Backend & APIs",
    description:
      "Node.js and Express services with clean REST APIs, secure sign-in with Clerk or Firebase, and MongoDB or PostgreSQL behind them.",
  },
  {
    title: "AI & Automation",
    description:
      "Gemini-powered features, N8N workflows and Python automation that take repetitive work off your plate.",
  },
];

export type ProjectCategory = "Web" | "AI" | "Desktop";

export const projectFilters: ("All" | ProjectCategory)[] = ["All", "Web", "AI", "Desktop"];

export type Project = {
  name: string;
  tagline: string;
  description: string;
  tech: string[];
  categories: ProjectCategory[];
  // Colour the generated cover art is tinted with
  accent: string;
  // Optional screenshot in /public; when set it replaces the generated cover
  image?: string;
  liveUrl?: string;
  codeUrl?: string;
};

export const projects: Project[] = [
  {
    name: "Nexus Commerce",
    tagline: "E-Commerce Platform",
    description:
      "Full-stack online store with product categories, search, cart and checkout. Secure Razorpay payments (UPI, cards and netbanking) with signature verification, plus email updates at every order step.",
    tech: ["Next.js", "Razorpay", "REST APIs", "Email Notifications"],
    categories: ["Web"],
    accent: "#7C7CF5",
    image: "/projects/nexus-commerce.png",
    liveUrl: "https://e-commerce-rho-dusky.vercel.app/",
  },
  {
    name: "Dost AI",
    tagline: "AI Platform",
    description:
      "Full-stack AI platform integrating the Gemini API to power four distinct AI tools: image generation, blog creation, object removal, and article generation.",
    tech: ["React.js", "Node.js", "Neon (PostgreSQL)", "Clerk", "Gemini API"],
    categories: ["Web", "AI"],
    accent: "#B37BEA",
    image: "/projects/dost-ai.webp",
    liveUrl: "https://dost-ai-three.vercel.app/",
  },
  {
    name: "LearnHub",
    tagline: "Course Management System",
    description:
      "Online course platform where admins publish courses and manage enrollments, and students search, enroll and track lesson progress. JWT auth with httpOnly cookies and role-based access on every page and API route.",
    tech: ["REST APIs", "Neon (PostgreSQL)", "JWT Auth", "Role-based Access"],
    categories: ["Web"],
    accent: "#6AA8F7",
    image: "/projects/learnhub.png",
    liveUrl: "https://event-manager-eta-lime.vercel.app/",
  },
  {
    name: "Truecaller Extractor",
    tagline: "Windows Desktop App",
    description:
      "Looks up numbers on your own Truecaller account, one at a time or in bulk from Excel/CSV, and exports the results to CSV and HTML. Playwright automation, persistent one-time sign-in and rate-limit safeguards, shipped as a standalone .exe.",
    tech: ["Python", "Tkinter", "Playwright", "BeautifulSoup", "PyInstaller"],
    categories: ["Desktop"],
    accent: "#5ED3A0",
  },
];

// App-icon style tiles in the Skills section. `mark` is the two-letter
// monogram, `fg`/`bg` the brand-ish colours of the tile.
export type Tool = {
  name: string;
  mark: string;
  fg: string;
  bg: string;
};

export const tools: Tool[] = [
  { name: "JavaScript", mark: "Js", fg: "#F7DF1E", bg: "#2E2A0E" },
  { name: "TypeScript", mark: "Ts", fg: "#4D9BEF", bg: "#0E2238" },
  { name: "React", mark: "Re", fg: "#61DAFB", bg: "#0C2830" },
  { name: "Next.js", mark: "Nx", fg: "#FFFFFF", bg: "#000000" },
  { name: "Node.js", mark: "No", fg: "#6CC24A", bg: "#10260C" },
  { name: "Tailwind", mark: "Tw", fg: "#38BDF8", bg: "#0A2433" },
  { name: "Python", mark: "Py", fg: "#FFD43B", bg: "#14263F" },
  { name: "MongoDB", mark: "Mg", fg: "#4DB33D", bg: "#0D2412" },
  { name: "PostgreSQL", mark: "Pg", fg: "#6E9BE8", bg: "#111D3A" },
  { name: "Firebase", mark: "Fb", fg: "#FFCA28", bg: "#33210A" },
  { name: "Gemini", mark: "Ge", fg: "#B79CF2", bg: "#21173A" },
  { name: "AWS", mark: "Aw", fg: "#FF9900", bg: "#1C2430" },
];

// Everything else from the resume, listed under the tiles
export const otherSkills = [
  "Java",
  "SQL",
  "HTML5",
  "CSS3",
  "Express.js",
  "REST APIs",
  "MySQL",
  "Firestore",
  "Clerk Auth",
  "Vercel",
  "Pandas",
  "NumPy",
  "N8N",
  "Playwright",
];

export const aboutIntro =
  "I'm a Full Stack Developer at Needle Ads Technology and a final-year B.E. student in AI & Data Science, mixing web apps with AI and automation.";

export type TimelineItem = {
  period: string;
  // Rendered in white after the gradient `period`, e.g. "2023 - " + "Present"
  periodEnd?: string;
  certificate?: boolean;
  lines: string[];
};

export const education: TimelineItem[] = [
  {
    period: "2023 - 2027",
    lines: [
      "B.E. in Computer Science (AI & Data Science)",
      "Chandigarh Group of Colleges | Landran, Mohali",
      "CGPA 7.0 out of 10",
    ],
  },
  {
    period: "2025",
    certificate: true,
    lines: ["MERN Stack Development Certification", "Full-stack development program"],
  },
  {
    period: "2024",
    certificate: true,
    lines: ["AWS Certified Cloud Operations", "Amazon Web Services"],
  },
];

export const experience: TimelineItem[] = [
  {
    // Add the start year here, e.g. period: "2025 - "
    period: "",
    periodEnd: "Present",
    lines: ["Full Stack Developer", "Needle Ads Technology | Chandigarh, India"],
  },
];

export const achievements: TimelineItem[] = [
  {
    period: "2025",
    lines: ["Runner-up, Smart India Hackathon", "National-level hackathon, placed 2nd"],
  },
  {
    period: "2022",
    lines: ["State-Level Handball Champion", "Placed 1st representing the state"],
  },
];

// Numbers in the hero strip, derived from the data above so they stay honest
const technologyCount = tools.length + otherSkills.length;
const awardCount = education.filter((e) => e.certificate).length + achievements.length;

export const heroStats = [
  { value: String(projects.length).padStart(2, "0"), suffix: "+", label: ["Projects", "Shipped"] },
  { value: String(Math.floor(technologyCount / 5) * 5), suffix: "+", label: ["Tools &", "Technologies"] },
  {
    value: String(awardCount).padStart(2, "0"),
    suffix: "",
    label: ["Awards &", "Certificates"],
  },
];
