/**
 * Build guard: every route declared in src/routes/ must either have a ROUTE_SEO
 * entry (so it gets prerendered) or a matching redirect in vercel.json.
 * Runs before the prerender step and fails the build with the offending paths.
 */
import fs from "node:fs";
import path from "node:path";
import { pathToFileURL } from "node:url";

const routesDir = path.resolve("src/routes");
const ssrEntry = path.resolve("dist-ssr/entry-server.js");

const { ROUTE_SEO } = await import(pathToFileURL(ssrEntry).href);
const vercel = JSON.parse(fs.readFileSync(path.resolve("vercel.json"), "utf8"));
const redirectSources = new Set((vercel.redirects ?? []).map((r) => r.source));

function collectRouteFiles(dir, prefix = "") {
  const out = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (entry.isDirectory()) {
      // API handlers are not indexable pages.
      if (entry.name === "api") continue;
      out.push(...collectRouteFiles(path.join(dir, entry.name), `${prefix}${entry.name}/`));
      continue;
    }
    if (!/\.tsx$/.test(entry.name)) continue;
    if (entry.name.startsWith("__")) continue;
    out.push(`${prefix}${entry.name.replace(/\.tsx$/, "")}`);
  }
  return out;
}

function toRoutePath(file) {
  const segments = file.replace(/\//g, ".").split(".");
  const cleaned = segments.filter((s) => s && s !== "index" && s !== "route");
  return cleaned.length ? `/${cleaned.join("/")}` : "/";
}

const seoPaths = Object.keys(ROUTE_SEO);
const missing = [];

for (const file of collectRouteFiles(routesDir)) {
  const routePath = toRoutePath(file);

  if (routePath.includes("$")) {
    // Dynamic route: satisfied when at least one concrete SEO entry matches it.
    const pattern = new RegExp(`^${routePath.replace(/\$[^/]+/g, "[^/]+")}$`);
    if (!seoPaths.some((p) => pattern.test(p))) missing.push(routePath);
    continue;
  }

  if (ROUTE_SEO[routePath]) continue;
  if (redirectSources.has(routePath)) continue;
  missing.push(routePath);
}

if (missing.length) {
  console.error(
    `\nRoute coverage check failed. These routes have neither a ROUTE_SEO entry nor a vercel.json redirect:\n` +
      missing.map((p) => `  - ${p}`).join("\n") +
      `\n\nAdd them to src/lib/seo-routes.ts or add a redirect in vercel.json.\n`,
  );
  process.exit(1);
}

console.log(`route coverage OK (${seoPaths.length} prerendered routes)`);
