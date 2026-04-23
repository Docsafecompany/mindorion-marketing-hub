import { useEffect } from "react";

import { absoluteUrl } from "@/lib/site";

type SEOHeadProps = {
  title: string;
  description: string;
  path: string;
};

function upsertMeta(selector: string, attributes: Record<string, string>) {
  if (typeof document === "undefined") return;
  let element = document.head.querySelector<HTMLMetaElement>(selector);
  if (!element) {
    element = document.createElement("meta");
    document.head.appendChild(element);
  }
  Object.entries(attributes).forEach(([key, value]) => {
    element?.setAttribute(key, value);
  });
}

function upsertCanonical(url: string) {
  if (typeof document === "undefined") return;
  let link = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
  if (!link) {
    link = document.createElement("link");
    link.rel = "canonical";
    document.head.appendChild(link);
  }
  link.href = url;
}

export function SEOHead({ title, description, path }: SEOHeadProps) {
  useEffect(() => {
    document.title = title;
    upsertMeta('meta[name="description"]', { name: "description", content: description });
    upsertMeta('meta[property="og:title"]', { property: "og:title", content: title });
    upsertMeta('meta[property="og:description"]', {
      property: "og:description",
      content: description,
    });
    upsertMeta('meta[name="twitter:title"]', { name: "twitter:title", content: title });
    upsertMeta('meta[name="twitter:description"]', {
      name: "twitter:description",
      content: description,
    });
    upsertCanonical(absoluteUrl(path));
  }, [description, path, title]);

  return null;
}
