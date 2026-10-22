import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { profile } from "@/lib/data";
import "./globals.css";

const SITE_URL = "https://sarthikkhanna.in";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-inter",
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
  // Icons come from the /app file convention (favicon.ico, icon.png,
  // apple-icon.png) — all generated from public/logo.png.
  // Share images come from app/opengraph-image.tsx and app/twitter-image.tsx.
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
  },
  twitter: {
    card: "summary_large_image",
    title: "Sarthik Khanna | Full Stack Developer",
    description:
      "Full Stack Developer specializing in React, Next.js, Node.js and AI-integrated web applications.",
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
    <html lang="en" className={inter.variable}>
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