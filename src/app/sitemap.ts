import type { MetadataRoute } from "next";
import { API_URL } from "@/url";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: `${API_URL}`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${API_URL}/upcoming`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${API_URL}/bizscribes`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.5,
    },
  ];
}
