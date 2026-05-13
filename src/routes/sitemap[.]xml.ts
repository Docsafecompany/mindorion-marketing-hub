import { createFileRoute } from "@tanstack/react-router";
import type {} from "@tanstack/react-start";

import { blogPosts } from "@/lib/site-data";

const BASE_URL = "https://mindorion.com";

interface SitemapEntry {
  path: string;
  lastmod?: string;
  changefreq?: "always" | "hourly" | "daily" | "weekly" | "monthly" | "yearly" | "never";
  priority?: string;
}

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: async () => {
        const staticEntries: SitemapEntry[] = [
          { path: "/", changefreq: "weekly", priority: "1.0" },
          { path: "/about", changefreq: "monthly", priority: "0.7" },
          { path: "/contact", changefreq: "monthly", priority: "0.7" },
          { path: "/pricing", changefreq: "weekly", priority: "0.9" },
          { path: "/use-cases", changefreq: "monthly", priority: "0.7" },
          { path: "/security", changefreq: "monthly", priority: "0.5" },
          { path: "/products/qualion", changefreq: "monthly", priority: "0.8" },
          { path: "/products/prospectiq", changefreq: "monthly", priority: "0.8" },
          { path: "/products/governanceiq", changefreq: "monthly", priority: "0.8" },
          { path: "/blog", changefreq: "weekly", priority: "0.8" },
          { path: "/legal/privacy", changefreq: "yearly", priority: "0.3" },
          { path: "/legal/terms", changefreq: "yearly", priority: "0.3" },
        ];

        const blogEntries: SitemapEntry[] = blogPosts.map((post) => ({
          path: `/blog/${post.slug}`,
          changefreq: "monthly",
          priority: "0.6",
        }));

        const entries = [...staticEntries, ...blogEntries];

        const urls = entries.map((e) =>
          [
            `  <url>`,
            `    <loc>${BASE_URL}${e.path}</loc>`,
            e.lastmod ? `    <lastmod>${e.lastmod}</lastmod>` : null,
            e.changefreq ? `    <changefreq>${e.changefreq}</changefreq>` : null,
            e.priority ? `    <priority>${e.priority}</priority>` : null,
            `  </url>`,
          ]
            .filter(Boolean)
            .join("\n"),
        );

        const xml = [
          `<?xml version="1.0" encoding="UTF-8"?>`,
          `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`,
          ...urls,
          `</urlset>`,
        ].join("\n");

        return new Response(xml, {
          headers: {
            "Content-Type": "application/xml",
            "Cache-Control": "public, max-age=3600",
          },
        });
      },
    },
  },
});
