import { createFileRoute } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";

import { ProductPageTemplate, type ProductPageData } from "@/components/ProductPageTemplate";
import { createStaticMeta } from "@/lib/site";

const theme = {
  heroBg: "#1a1a18",
  heroCardBg: "#111110",
  accent: "#534AB7",
  accentSoft: "#EEEDFE",
  accentText: "#7F77DD",
  accentStrong: "#534AB7",
  darkMuted: "#A5A49B",
  ctaBg: "#534AB7",
};

const heroItemTones = ["danger", "danger", "warning", "success"] as const;

export const Route = createFileRoute("/products/proposaliq")({
  head: () => {
    const base = createStaticMeta({
      title: "Mindorion ProposalIQ | Pre-Sales & Proposal Intelligence for Engineering Firms",
      description:
        "From RFQ intake to final submission, ProposalIQ helps engineering and IT services firms create compliant, high-quality proposals faster.",
      path: "/products/proposaliq",
    });
    return {
      ...base,
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            name: "ProposalIQ",
            applicationCategory: "BusinessApplication",
            operatingSystem: "Web",
            description:
              "Pre-sales operating system for engineering and IT services firms. From RFQ intake to validated proposal submission.",
            url: "https://mindorion.com/products/proposaliq",
            offers: {
              "@type": "Offer",
              price: "19",
              priceCurrency: "EUR",
            },
          }),
        },
      ],
    };
  },
  component: ProposalIQPage,
});

function ProposalIQPage() {
  const { t } = useTranslation();
  const heroItems = (t("products.proposaliq.heroItems", { returnObjects: true }) as string[]).map((text, i) => ({ text, tone: heroItemTones[i] }));
  const costs = t("products.proposaliq.costs", { returnObjects: true }) as Array<{ title: string; text: string }>;
  const workflowSteps = t("products.proposaliq.workflowSteps", { returnObjects: true }) as string[];
  const availability = t("products.proposaliq.availability", { returnObjects: true }) as {
    availableTitle: string;
    comingTitle: string;
    available: string[];
    coming: string[];
  };

  const data: ProductPageData = {
    product: "proposaliq",
    eyebrow: t("products.proposaliq.eyebrow"),
    title: t("products.proposaliq.title"),
    subtitle: t("products.proposaliq.subtitle"),
    theme,
    heroPanel: {
      type: "analysis",
      label: t("products.proposaliq.heroLabel"),
      score: "34/100",
      scoreTone: "danger",
      items: heroItems,
    },
    costsLabel: t("products.proposaliq.costsLabel"),
    costs,
    workflowLabel: t("products.proposaliq.workflowLabel"),
    workflowSteps,
    availability,
    ctaTitle: t("products.proposaliq.ctaTitle"),
    ctaSubtitle: t("products.proposaliq.ctaSubtitle"),
    primaryCta: t("products.proposaliq.primaryCta"),
    secondaryCta: { label: t("products.proposaliq.secondaryCta"), href: "#workflow" },
    ctaButton: { label: t("products.proposaliq.ctaButton"), href: "/pricing" },
  };

  return (
    <>
      <ProductPageTemplate data={data} />
    </>
  );
}
