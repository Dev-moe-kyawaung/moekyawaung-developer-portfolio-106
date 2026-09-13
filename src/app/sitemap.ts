import type { MetadataRoute } from "next";
import { projectSeed, postSeed } from "@/lib/content";

const BASE = "https://moekyawaung.dev";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = ["", "/work", "/writing"].map((path) => ({
    url: `${BASE}${path}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: path === "" ? 1 : 0.7,
  }));

  const projectRoutes = projectSeed.map((p) => ({
    url: `${BASE}/work/${p.slug}`,
    lastModified: new Date(),
    changeFrequency: "yearly" as const,
    priority: 0.8,
  }));

  const postRoutes = postSeed.map((p) => ({
    url: `${BASE}/writing/${p.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [...staticRoutes, ...projectRoutes, ...postRoutes];
}
