import { useEffect } from "react";
import { Link, Outlet, createRootRoute, useRouterState } from "@tanstack/react-router";

import "@/i18n";
import { CookieBanner } from "@/components/CookieBanner";
import { ScrollToTop } from "@/components/ScrollToTop";
import { SiteLayout } from "@/components/SiteLayout";
import { Button } from "@/components/ui/button";
import { Toaster } from "@/components/ui/sonner";
import { trackPageView } from "@/lib/analytics";
import { DEFAULT_OG_IMAGE, LINKEDIN_URL, SITE_URL } from "@/lib/site";
function NotFoundComponent() {
  return (
    <div className="section-shell flex min-h-[70vh] items-center justify-center py-20">
      <div className="surface-panel max-w-lg rounded-lg p-10 text-center">
        <div className="eyebrow">404</div>
        <h1 className="mt-4 text-4xl font-extrabold text-foreground sm:text-5xl">Page not found</h1>
        <p className="mt-4 text-balance text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-8 flex justify-center">
          <Link to="/">
            <Button>Go home</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "UTF-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1.0" },
      { name: "theme-color", content: "#0F172A" },
      { property: "og:site_name", content: "Mindorion" },
      { property: "og:image", content: DEFAULT_OG_IMAGE },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:image", content: DEFAULT_OG_IMAGE },
    ],
    links: [
      { rel: "icon", href: "/favicon.ico" },
      { rel: "apple-touch-icon", href: "/apple-touch-icon.png" },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Organization",
          name: "Mindorion",
          url: SITE_URL,
          logo: `${SITE_URL}/favicon.ico`,
          description:
            "B2B intelligence suite that protects your documents, qualifies your pipeline, and governs your operations. From NDAs to proposals, from cold outreach to closed deals.",
          sameAs: [LINKEDIN_URL],
        }),
      },
    ],
  }),
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
});

function RootComponent() {
  return (
    <>
      <ScrollToTop />
      <SiteLayout>
        <Outlet />
      </SiteLayout>
      <Toaster position="top-right" />
    </>
  );
}
