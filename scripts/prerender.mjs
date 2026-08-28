/**
 * Build-time prerender (SEO layer 1).
 * Renders every public route to static HTML with its own <head> so crawlers
 * get the correct title/description/canonical/og:* without executing JS.
 */
import fs from "node:fs";
import path from "node:path";
import { pathToFileURL } from "node:url";

const dist = path.resolve("dist");
const ssrEntry = path.resolve("dist-ssr/entry-server.js");

const { render } = await import(pathToFileURL(ssrEntry).href);
const { ROUTE_SEO, SEO_OG_IMAGE, SEO_SITE_URL } = await import(pathToFileURL(path.resolve("dist-ssr/seo-routes.js")).href);

const template = fs.readFileSync(path.join(dist, "index.html"), "utf8");

function escapeHtml(value) {
  return value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

function seoBlock({ title, description, url, noindex }) {
  const t = escapeHtml(title);
  const d = escapeHtml(description);
  const tags = [
    `<title>${t}</title>`,
    `<meta name="description" content="${d}" />`,
  ];
  if (noindex) {
    tags.push(`<meta name="robots" content="noindex, follow" />`);
  } else {
    tags.push(`<link rel="canonical" href="${url}" />`);
    tags.push(`<meta property="og:url" content="${url}" />`);
  }
  tags.push(
    `<meta property="og:site_name" content="Mindorion" />`,
    `<meta property="og:type" content="website" />`,
    `<meta property="og:title" content="${t}" />`,
    `<meta property="og:description" content="${d}" />`,
    `<meta property="og:image" content="${SEO_OG_IMAGE}" />`,
    `<meta property="og:image:width" content="1200" />`,
    `<meta property="og:image:height" content="630" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:title" content="${t}" />`,
    `<meta name="twitter:description" content="${d}" />`,
    `<meta name="twitter:image" content="${SEO_OG_IMAGE}" />`,
  );
  return tags.map((tag) => `    ${tag}`).join("\n");
}

function buildPage({ title, description, url, html, noindex }) {
  let out = template.replace(
    /<!-- seo:start -->[\s\S]*?<!-- seo:end -->/,
    `<!-- seo:start -->\n${seoBlock({ title, description, url, noindex })}\n    <!-- seo:end -->`,
  );
  out = out.replace('<div id="root"></div>', `<div id="root">${html}</div>`);
  return out;
}

function writePage(routePath, contents) {
  const target =
    routePath === "/" ? path.join(dist, "index.html") : path.join(dist, routePath.replace(/^\//, ""), "index.html");
  fs.mkdirSync(path.dirname(target), { recursive: true });
  fs.writeFileSync(target, contents);
  console.log(`prerendered ${routePath}`);
}

for (const [routePath, seo] of Object.entries(ROUTE_SEO)) {
  const url = `${SEO_SITE_URL}${routePath === "/" ? "/" : routePath}`;
  let html = "";
  try {
    html = await render(routePath);
  } catch (error) {
    console.error(`prerender failed for ${routePath}:`, error);
    process.exitCode = 1;
  }
  writePage(routePath, buildPage({ ...seo, url, html }));
}

// Real 404: Vercel serves dist/404.html with HTTP status 404 for unknown paths.
fs.writeFileSync(
  path.join(dist, "404.html"),
  buildPage({
    title: "Page not found | Mindorion",
    description: "This page does not exist or has been moved.",
    url: "",
    html: "",
    noindex: true,
  }),
);
console.log("prerendered 404.html");
