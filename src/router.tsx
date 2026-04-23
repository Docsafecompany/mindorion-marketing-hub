import { createRouter, useRouter } from "@tanstack/react-router";

import { Button } from "@/components/ui/button";
import { routeTree } from "./routeTree.gen";

function DefaultErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  const router = useRouter();

  return (
    <div className="section-shell flex min-h-[70vh] items-center justify-center py-20">
      <div className="surface-panel max-w-lg rounded-lg p-10 text-center">
        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-destructive/10 text-destructive">
          !
        </div>
        <h1 className="text-3xl font-bold text-foreground">Something went wrong</h1>
        <p className="mt-3 text-muted-foreground">An unexpected error occurred. Please try again.</p>
        {import.meta.env.DEV && error.message ? (
          <pre className="mt-4 max-h-40 overflow-auto rounded-lg bg-muted p-3 text-left text-xs text-destructive">{error.message}</pre>
        ) : null}
        <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
          <Button
            onClick={() => {
              router.invalidate();
              reset();
            }}
          >
            Try again
          </Button>
          <a href="/">
            <Button variant="outline">Go home</Button>
          </a>
        </div>
      </div>
    </div>
  );
}

export const getRouter = () => {
  const router = createRouter({
    routeTree,
    context: {},
    scrollRestoration: true,
    defaultPreloadStaleTime: 0,
    defaultErrorComponent: DefaultErrorComponent,
  });

  return router;
};
