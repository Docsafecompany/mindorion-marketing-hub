import { Link, Outlet, createRootRoute } from "@tanstack/react-router";

import "@/i18n";
import { ScrollToTop } from "@/components/ScrollToTop";
import { SiteLayout } from "@/components/SiteLayout";
import { Button } from "@/components/ui/button";
import { Toaster } from "@/components/ui/sonner";
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
