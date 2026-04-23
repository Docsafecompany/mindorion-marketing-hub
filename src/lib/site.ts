export const SITE_URL = "https://mindorion.com";
export const APP_URL = SITE_URL;
export const SIGNUP_URL = SITE_URL;
export const LOGIN_URL = SITE_URL;
export const LINKEDIN_URL = "https://www.linkedin.com/company/mindorion";

export function absoluteUrl(path: string) {
  return `${SITE_URL}${path}`;
}

export function createStaticMeta({
  title,
  description,
  path,
}: {
  title: string;
  description: string;
  path: string;
}) {
  return {
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: path.startsWith("/blog/") ? "article" : "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: title },
      { name: "twitter:description", content: description },
    ],
    links: [{ rel: "canonical", href: absoluteUrl(path) }],
  };
}
