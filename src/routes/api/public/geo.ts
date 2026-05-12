import { createFileRoute } from "@tanstack/react-router";

const FRENCH_COUNTRIES = new Set([
  "FR", "BE", "CH", "LU", "MC",
  "CA", // partly francophone, default to FR for QC majority of CA fr-* browsers
  "SN", "CI", "ML", "BF", "NE", "TG", "BJ", "GN", "CM", "GA", "CG", "CD", "MG", "DJ", "TD", "RW", "BI", "CF", "KM",
  "HT", "PF", "NC", "RE", "GP", "MQ", "GF", "YT", "PM", "WF",
]);

export const Route = createFileRoute("/api/public/geo")({
  server: {
    handlers: {
      GET: async ({ request }) => {
        const headers = request.headers;
        const country =
          headers.get("cf-ipcountry") ||
          headers.get("x-vercel-ip-country") ||
          headers.get("x-country-code") ||
          "";
        const upper = country.toUpperCase();
        const language = FRENCH_COUNTRIES.has(upper) ? "fr" : "en";
        return Response.json(
          { country: upper || null, language },
          { headers: { "Cache-Control": "public, max-age=3600" } },
        );
      },
    },
  },
});
