export const APP_URL = "https://app.mindorion.com";
export const SIGNUP_URL = `${APP_URL}/signup`;
export const LOGIN_URL = `${APP_URL}/login`;
export const SITE_URL = "https://mindorion.com";
export const LINKEDIN_URL = "https://www.linkedin.com/company/mindorion";
export const DEFAULT_OG_IMAGE = `${SITE_URL}/og-default.jpg`;

export function absoluteUrl(path: string) {
  return `${SITE_URL}${path}`;
}

type JsonLd = Record<string, unknown> | Array<Record<string, unknown>>;

export function createStaticMeta({
  title,
  description,
  path,
  ogImage,
  jsonLd,
}: {
  title: string;
  description: string;
  path: string;
  ogImage?: string;
  jsonLd?: JsonLd;
}) {
  const image = ogImage ?? DEFAULT_OG_IMAGE;
  const url = absoluteUrl(path);
  const head: {
    meta: Array<Record<string, string>>;
    links: Array<Record<string, string>>;
    scripts?: Array<{ type: string; children: string }>;
  } = {
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: path.startsWith("/blog/") ? "article" : "website" },
      { property: "og:url", content: url },
      { property: "og:image", content: image },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      { property: "og:site_name", content: "Mindorion" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: title },
      { name: "twitter:description", content: description },
      { name: "twitter:image", content: image },
    ],
    links: [{ rel: "canonical", href: url }],
  };

  if (jsonLd) {
    head.scripts = [
      {
        type: "application/ld+json",
        children: JSON.stringify(jsonLd),
      },
    ];
  }

  return head;
}
