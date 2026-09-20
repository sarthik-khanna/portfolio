import type { Metadata } from "next";
import { Space_Grotesk, JetBrains_Mono } from "next/font/google";
import { profile } from "@/lib/data";
import "./globals.css";

const SITE_URL = "https://sarthikkhanna.in";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-space-grotesk",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Sarthik Khanna | Full Stack Developer",
    template: "%s | Sarthik Khanna",
  },
  description:
    "Sarthik Khanna is a Full Stack Developer based in Chandigarh, India, specializing in React, Next.js, Node.js, TypeScript and AI-integrated web applications.",
  keywords: [
    "Sarthik Khanna",
    "Sarthik Khanna Full Stack Developer",
    "Sarthik Khanna developer",
    "Full Stack Developer Chandigarh",
    "React developer",
    "Next.js developer",
    "Node.js developer",
  ],
  // Explicit <link rel="icon"> tags so Google and browsers find the SK logo;
  // the .ico lives in /public and is no longer auto-linked from /app.
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "48x48" },
      { url: "/icon.svg", type: "image/svg+xml" },
      { url: "/icon.png", type: "image/png", sizes: "192x192" },
    ],
    shortcut: "/favicon.ico",
    apple: "/apple-icon.png",
  },
  authors: [{ name: "Sarthik Khanna", url: SITE_URL }],
  creator: "Sarthik Khanna",
  alternates: {
    canonical: SITE_URL,
  },
  openGraph: {
    type: "website",
    url: SITE_URL,
    siteName: "Sarthik Khanna",
    title: "Sarthik Khanna | Full Stack Developer",
    description:
      "Full Stack Developer specializing in React, Next.js, Node.js and AI-integrated web applications.",
    images: [{ url: "/photo1.jpg", width: 1200, height: 630, alt: profile.name }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Sarthik Khanna | Full Stack Developer",
    description:
      "Full Stack Developer specializing in React, Next.js, Node.js and AI-integrated web applications.",
    images: ["/photo1.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  // TODO: paste the verification code Google Search Console gives you (see chat for instructions)
  verification: {
    google: "",
  },
};

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: profile.name,
  jobTitle: "Full Stack Developer",
  url: SITE_URL,
  image: `${SITE_URL}/photo1.jpg`,
  email: `mailto:${profile.email}`,
  address: {
    "@type": "PostalAddress",
    addressLocality: "Chandigarh",
    addressCountry: "IN",
  },
  worksFor: {
    "@type": "Organization",
    name: "Needle Ads Technology",
  },
  knowsAbout: [
    "React.js",
    "Next.js",
    "Node.js",
    "TypeScript",
    "Full Stack Development",
  ],
  sameAs: [
    "https://www.linkedin.com/in/sarthik-khanna-05650a276/",
    "https://github.com/sarthik-khanna",
  ] as string[],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${spaceGrotesk.variable} ${jetbrainsMono.variable}`}>
      <body>
        <script
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}