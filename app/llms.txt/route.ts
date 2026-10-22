import {
  achievements,
  education,
  experience,
  otherSkills,
  profile,
  projects,
  services,
  socials,
  tools,
  type TimelineItem,
} from "@/lib/data";

const BASE_URL = "https://sarthikkhanna.in";

// Built at compile time from lib/data.ts, so it stays in sync with the site.
// Format follows https://llmstxt.org
export const dynamic = "force-static";

const timeline = (items: TimelineItem[]) =>
  items.map((item) => {
    const period = `${item.period}${item.periodEnd ?? ""}`.trim();
    return `- ${period ? `${period}: ` : ""}${item.lines.join(", ")}`;
  });

export function GET() {
  const lines = [
    `# ${profile.name}`,
    "",
    `> ${profile.summary}`,
    "",
    `${profile.name} is a ${profile.title}, based in ${profile.location}. Core stack: ${profile.stack}.`,
    "",
    "## Services",
    "",
    ...services.map((s) => `- ${s.title}: ${s.description}`),
    "",
    "## Projects",
    "",
    ...projects.map((p) => {
      const title = p.liveUrl ? `[${p.name}](${p.liveUrl})` : p.name;
      return `- ${title} (${p.tagline}): ${p.description} Tech: ${p.tech.join(", ")}.`;
    }),
    "",
    "## Skills",
    "",
    `- Main tools: ${tools.map((t) => t.name).join(", ")}`,
    `- Also: ${otherSkills.join(", ")}`,
    "",
    "## Experience",
    "",
    ...timeline(experience),
    "",
    "## Education & Certifications",
    "",
    ...timeline(education),
    "",
    "## Achievements",
    "",
    ...timeline(achievements),
    "",
    "## Contact",
    "",
    `- [Portfolio](${BASE_URL}): Main website`,
    `- [Resume](${BASE_URL}${profile.resumeUrl}): PDF resume`,
    ...socials.map((s) => `- [${s.label}](${s.href})`),
    "",
    "## Optional",
    "",
    `- [Sitemap](${BASE_URL}/sitemap.xml)`,
    "",
  ];

  return new Response(lines.join("\n"), {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
