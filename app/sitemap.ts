import type { MetadataRoute } from "next";

const BASE_URL = "https://sarthikkhanna.in";

// Single-page site: Google ignores #fragments, so only the root URL is listed.
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
  ];
}
