// Single source of truth for per-route SEO metadata.
// Used by (1) the build-time prerenderer and (2) the runtime head sync component.

import { blogPosts } from "./site-data";

export const SEO_SITE_URL = "https://mindorion.com";
export const SEO_OG_IMAGE = `${SEO_SITE_URL}/og-default.jpg`;

export type RouteSeo = {
  title: string;
  description: string;
};

const STATIC_ROUTE_SEO: Record<string, RouteSeo> = {
  "/": {
    title: "Mindorion | Enterprise OS for Engineering & IT Services",
    description:
      "Mindorion unifies proposals, commercial execution and governance data so engineering and IT services firms align strategy with operations.",
  },
  "/why-mindorion": {
    title: "Why Mindorion | Operational Foundation for Engineering Firms",
    description:
      "Why engineering and IT services firms need structured workflows, governed data and controlled AI adoption before scaling. The Mindorion thesis and approach.",
  },
  "/products/proposaliq": {
    title: "ProposalIQ | Pre-Sales and Proposal Intelligence Software",
    description:
      "ProposalIQ takes engineering and IT services teams from RFQ intake to validated submission with structured templates, requirement checks and approval workflows.",
  },
  "/products/growthiq": {
    title: "GrowthIQ | Commercial Execution Intelligence for Services Firms",
    description:
      "GrowthIQ aligns commercial strategy with execution: capture high-value account signals, detect pipeline drift and turn business development into decision intelligence.",
  },
  "/pricing": {
    title: "Pricing | ProposalIQ and GrowthIQ Plans per User",
    description:
      "Transparent per-user pricing for ProposalIQ and GrowthIQ. Compare Starter, Pro, Business and Enterprise plans, monthly or annual, and scale toward unified governance.",
  },
  "/use-cases": {
    title: "Who We Serve | Use Cases for CEOs, BU Managers and Delivery",
    description:
      "See how executive leadership, business managers and delivery leaders in engineering and IT services firms use Mindorion to steer execution with real operational data.",
  },
  "/contact": {
    title: "Contact Mindorion | Request a Demo",
    description:
      "Talk to the Mindorion team. Request a demo, ask about deployment for your engineering or IT services firm, or get answers on plans and onboarding.",
  },
  "/security": {
    title: "Security and Data Governance | Mindorion",
    description:
      "How Mindorion handles EU hosting, encryption, access control and data minimization so your operational data stays governed and auditable.",
  },
  "/legal/privacy": {
    title: "Privacy Policy | Mindorion",
    description:
      "The Mindorion privacy policy: what data we collect, how it is used and retained, and how to exercise your GDPR rights.",
  },
  "/legal/terms": {
    title: "Terms of Use | Mindorion",
    description: "The terms of use governing access to the Mindorion marketing website and its content.",
  },
};

export const SEO_ROUTES = Object.keys(ROUTE_SEO);

export function getRouteSeo(pathname: string): RouteSeo | null {
  const clean = pathname.length > 1 ? pathname.replace(/\/+$/, "") : pathname;
  return ROUTE_SEO[clean] ?? null;
}

export function absoluteSeoUrl(pathname: string) {
  const clean = pathname.length > 1 ? pathname.replace(/\/+$/, "") : pathname;
  return `${SEO_SITE_URL}${clean}`;
}
