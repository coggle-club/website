import type { MetadataRoute } from "next";
import { fetchApi } from "@/lib/api";

const BASE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:8001";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: BASE_URL, lastModified: new Date(), changeFrequency: "daily", priority: 1.0 },
    { url: `${BASE_URL}/blog`, lastModified: new Date(), changeFrequency: "daily", priority: 0.9 },
    { url: `${BASE_URL}/tutorials`, lastModified: new Date(), changeFrequency: "daily", priority: 0.9 },
    { url: `${BASE_URL}/competitions`, lastModified: new Date(), changeFrequency: "daily", priority: 0.9 },
    { url: `${BASE_URL}/links`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.5 },
    { url: `${BASE_URL}/tools`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.6 },
    { url: `${BASE_URL}/statistics`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.5 },
    { url: `${BASE_URL}/about`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.4 },
    { url: `${BASE_URL}/privacy`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.3 },
  ];

  // Fetch dynamic content slugs
  try {
    const [blogData, tutorialData, competitionData] = await Promise.allSettled([
      fetchApi<{ items: { slug: string }[] }>("/blog?page_size=100"),
      fetchApi<{ items: { slug: string }[] }>("/tutorials?page_size=100"),
      fetchApi<{ items: { slug: string }[] }>("/competitions?page_size=100"),
    ]);

    const blogRoutes: MetadataRoute.Sitemap =
      blogData.status === "fulfilled"
        ? blogData.value.items.map((post) => ({
            url: `${BASE_URL}/blog/${post.slug}`,
            lastModified: new Date(),
            changeFrequency: "weekly" as const,
            priority: 0.8,
          }))
        : [];

    const tutorialRoutes: MetadataRoute.Sitemap =
      tutorialData.status === "fulfilled"
        ? tutorialData.value.items.map((tutorial) => ({
            url: `${BASE_URL}/tutorials/${tutorial.slug}`,
            lastModified: new Date(),
            changeFrequency: "weekly" as const,
            priority: 0.8,
          }))
        : [];

    const competitionRoutes: MetadataRoute.Sitemap =
      competitionData.status === "fulfilled"
        ? competitionData.value.items.map((competition) => ({
            url: `${BASE_URL}/competitions/${competition.slug}`,
            lastModified: new Date(),
            changeFrequency: "weekly" as const,
            priority: 0.7,
          }))
        : [];

    return [
      ...staticRoutes,
      ...blogRoutes,
      ...tutorialRoutes,
      ...competitionRoutes,
    ];
  } catch {
    return staticRoutes;
  }
}
