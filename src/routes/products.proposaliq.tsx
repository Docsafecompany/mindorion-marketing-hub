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
const featureIcons: [string[], string[]] = [
  ["🔴", "🔴", "🔴", "🟡", "🟡", "🟡"],
  ["📄", "📊", "📋", "⚡", "🔒", "📥"],
];

export const Route = createFileRoute("/products/proposaliq")({
  head: () => {
    const base = createStaticMeta({
      title: "Proposal IQ | Réputation documentaire avant envoi | Mindorion",
      description:
        "Proposal IQ analyse chaque document en 30 secondes et détecte tout ce qui peut nuire à votre réputation professionnelle avant envoi — métadonnées, commentaires, données sensibles, ton IA.",
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
            name: "Proposal IQ",
            applicationCategory: "BusinessApplication",
            operatingSystem: "Web",
            description:
              "Document quality and metadata control for B2B teams. Detect risks before sending — metadata, comments, sensitive data, AI tone.",
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
  const howItWorks = t("products.proposaliq.howItWorks", { returnObjects: true }) as Array<{ title: string; text: string }>;
  const cols = t("products.proposaliq.featureColumns", { returnObjects: true }) as Array<{ title: string; items: Array<{ title: string; text: string }> }>;
  const scenarios = t("products.proposaliq.scenarios", { returnObjects: true }) as Array<{ tag: string; title: string; text: string; result: string }>;

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
    howItWorks,
    featureColumns: [
      { title: cols[0].title, items: cols[0].items.map((it, i) => ({ ...it, icon: featureIcons[0][i] })) },
      { title: cols[1].title, items: cols[1].items.map((it, i) => ({ ...it, icon: featureIcons[1][i] })) },
    ],
    scenarioLabel: t("products.proposaliq.scenarioLabel"),
    scenarios,
    ctaTitle: t("products.proposaliq.ctaTitle"),
    ctaSubtitle: t("products.proposaliq.ctaSubtitle"),
    primaryCta: t("products.proposaliq.primaryCta"),
  };

  return (
    <>
      <ProductPageTemplate data={data} />
    </>
  );
}
