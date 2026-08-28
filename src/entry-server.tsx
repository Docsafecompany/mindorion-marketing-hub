import { StrictMode } from "react";
import { renderToString } from "react-dom/server";
import { RouterProvider, createMemoryHistory } from "@tanstack/react-router";

import { getRouter } from "./router";

export { ROUTE_SEO, SEO_OG_IMAGE, SEO_SITE_URL } from "./lib/seo-routes";

export async function render(url: string) {
  const router = getRouter();
  router.update({
    history: createMemoryHistory({ initialEntries: [url] }),
  });
  await router.load();

  return renderToString(
    <StrictMode>
      <RouterProvider router={router} />
    </StrictMode>,
  );
}
