import { useEffect } from "react";
import { useRouterState } from "@tanstack/react-router";

import { SEO_OG_IMAGE, absoluteSeoUrl, getRouteSeo } from "@/lib/seo-routes";

function upsertMeta(selector: string, attrs: Record<string, string>) {
  let el = document.head.querySelector<HTMLMetaElement>(selector);
  if (!el) {
    el = document.createElement("meta");
    document.head.appendChild(el);
  }
  for (const [key, value] of Object.entries(attrs)) el.setAttribute(key, value);
}

function removeAll(selector: string) {
  document.head.querySelectorAll(selector).forEach((el) => el.remove());
}

/**
 * Runtime head sync (layer 2). Keeps title, description, canonical and og:*
 * aligned with the current route during client-side navigation.
 * The build-time prerender (layer 1) writes the same values into the served HTML.
 */
export function RouteHead() {
  const pathname = useRouterState({ select: (state) => state.location.pathname });

  useEffect(() => {
    const seo = getRouteSeo(pathname);
    const url = absoluteSeoUrl(pathname);

    if (!seo) {
      // Unknown route: never point the canonical at the homepage.
      removeAll('link[rel="canonical"]');
      document.title = "Page not found | Mindorion";
      upsertMeta('meta[name="robots"]', { name: "robots", content: "noindex, follow" });
      upsertMeta('meta[name="description"]', { name: "description", content: "This page does not exist." });
      removeAll('meta[property^="og:"][property$="url"]');
      return;
    }

    removeAll('meta[name="robots"]');
    document.title = seo.title;
    upsertMeta('meta[name="description"]', { name: "description", content: seo.description });

    let canonical = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.setAttribute("rel", "canonical");
      document.head.appendChild(canonical);
    }
    canonical.setAttribute("href", url);

    upsertMeta('meta[property="og:url"]', { property: "og:url", content: url });
    upsertMeta('meta[property="og:title"]', { property: "og:title", content: seo.title });
    upsertMeta('meta[property="og:description"]', { property: "og:description", content: seo.description });
    upsertMeta('meta[property="og:type"]', { property: "og:type", content: "website" });
    upsertMeta('meta[property="og:image"]', { property: "og:image", content: SEO_OG_IMAGE });
    upsertMeta('meta[name="twitter:title"]', { name: "twitter:title", content: seo.title });
    upsertMeta('meta[name="twitter:description"]', { name: "twitter:description", content: seo.description });
    upsertMeta('meta[name="twitter:image"]', { name: "twitter:image", content: SEO_OG_IMAGE });
  }, [pathname]);

  return null;
}
