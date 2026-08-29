import type { MetadataRoute } from "next";
// TODO: replace with your real deployed domain (no trailing slash)
const BASE_URL = "https://sarthikkhanna.in";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: "/api/",
    },
    sitemap: `${BASE_URL}/sitemap.xml`,
  };
}
