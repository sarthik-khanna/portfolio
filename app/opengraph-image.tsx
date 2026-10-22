import { ImageResponse } from "next/og";
import { profile } from "@/lib/data";

// Link-preview card for social shares. Next wires it into the og:image tags
// automatically. Edge runtime because the Node build of next/og crashes on
// Windows (it builds file paths from import.meta.url with backslashes).
export const runtime = "edge";
export const alt = `${profile.name} | Full Stack Developer`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Satori can't read woff2, so pull Inter as woff from Fontsource
const fontUrl = (weight: number) =>
  `https://cdn.jsdelivr.net/npm/@fontsource/inter@5.0.18/files/inter-latin-${weight}-normal.woff`;

const loadFont = async (weight: number) =>
  (await fetch(fontUrl(weight))).arrayBuffer();

const gradient = "linear-gradient(90deg, #EBC1A2 0%, #D894BA 55%, #BE79CF 100%)";

export default async function Image() {
  const [photo, regular, bold] = await Promise.all([
    fetch(new URL("../public/photo1.jpg", import.meta.url)).then((r) => r.arrayBuffer()),
    loadFont(400),
    loadFont(700),
  ]);
  const stack = profile.stack.split(", ");

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 90px",
          fontFamily: "Inter",
          color: "#F1EEF6",
          // Same glow as .glow-bg in globals.css
          background:
            "radial-gradient(ellipse 55% 60% at 30% 35%, rgba(110, 52, 125, 0.38), transparent 70%), radial-gradient(ellipse 50% 55% at 85% 80%, rgba(80, 40, 110, 0.28), transparent 70%), linear-gradient(180deg, #120d1f 0%, #0c0a17 100%)",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", maxWidth: 640 }}>
          <div style={{ fontSize: 26, color: "#C3BED0", letterSpacing: 4, textTransform: "uppercase" }}>
            Hi, I'm
          </div>
          <div
            style={{
              fontSize: 84,
              fontWeight: 700,
              lineHeight: 1.05,
              marginTop: 12,
              backgroundImage: gradient,
              backgroundClip: "text",
              color: "transparent",
            }}
          >
            {profile.name}
          </div>
          <div style={{ fontSize: 34, fontWeight: 700, marginTop: 20 }}>Full Stack Developer</div>
          <div style={{ fontSize: 24, color: "#C3BED0", marginTop: 8 }}>{profile.location}</div>

          <div style={{ display: "flex", flexWrap: "wrap", gap: 12, marginTop: 36 }}>
            {stack.map((tech) => (
              <div
                key={tech}
                style={{
                  fontSize: 22,
                  padding: "8px 18px",
                  borderRadius: 10,
                  border: "1.5px solid rgba(216, 148, 186, 0.45)",
                  background: "rgba(28, 22, 48, 0.7)",
                }}
              >
                {tech}
              </div>
            ))}
          </div>

          <div style={{ fontSize: 24, color: "#8E88A0", marginTop: 40 }}>sarthikkhanna.in</div>
        </div>

        {/* Gradient ring around the photo */}
        <div
          style={{
            display: "flex",
            padding: 6,
            borderRadius: 9999,
            backgroundImage: "linear-gradient(135deg, #EBC1A2, #BE79CF)",
            boxShadow: "0 0 60px rgba(190, 121, 207, 0.35)",
          }}
        >
          <img
            // Satori accepts raw image bytes; the DOM typings only allow strings
            src={photo as unknown as string}
            width={340}
            height={340}
            style={{ borderRadius: 9999, objectFit: "cover", border: "6px solid #0c0a17" }}
          />
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Inter", data: regular, weight: 400, style: "normal" },
        { name: "Inter", data: bold, weight: 700, style: "normal" },
      ],
    }
  );
}
