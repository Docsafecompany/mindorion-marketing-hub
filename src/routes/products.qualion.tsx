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

export const Route = createFileRoute("/products/qualion")({
  head: () => {
    const base = createStaticMeta({
      title: "Qualion | Réputation documentaire avant envoi | Mindorion",
      description:
        "Qualion analyse chaque document en 30 secondes et détecte tout ce qui peut nuire à votre réputation professionnelle avant envoi — métadonnées, commentaires, données sensibles, ton IA.",
      path: "/products/qualion",
    });
    return {
      ...base,
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Product",
            name: "Qualion",
            description:
              "Document quality and metadata control for B2B teams. Detect risks before sending — metadata, comments, sensitive data, AI tone.",
            brand: { "@type": "Brand", name: "Mindorion" },
            url: "https://mindorion.com/products/qualion",
            offers: {
              "@type": "AggregateOffer",
              priceCurrency: "EUR",
              lowPrice: "19",
              highPrice: "99",
              offerCount: 3,
              url: "https://mindorion.com/pricing",
            },
          }),
        },
      ],
    };
  },
  component: QualionPage,
});

function QualionPage() {
  const { t } = useTranslation();
  const heroItems = (t("products.qualion.heroItems", { returnObjects: true }) as string[]).map((text, i) => ({ text, tone: heroItemTones[i] }));
  const howItWorks = t("products.qualion.howItWorks", { returnObjects: true }) as Array<{ title: string; text: string }>;
  const cols = t("products.qualion.featureColumns", { returnObjects: true }) as Array<{ title: string; items: Array<{ title: string; text: string }> }>;
  const scenarios = t("products.qualion.scenarios", { returnObjects: true }) as Array<{ tag: string; title: string; text: string; result: string }>;

  const data: ProductPageData = {
    product: "qualion",
    eyebrow: t("products.qualion.eyebrow"),
    title: t("products.qualion.title"),
    subtitle: t("products.qualion.subtitle"),
    theme,
    heroPanel: {
      type: "analysis",
      label: t("products.qualion.heroLabel"),
      score: "34/100",
      scoreTone: "danger",
      items: heroItems,
    },
    howItWorks,
    featureColumns: [
      { title: cols[0].title, items: cols[0].items.map((it, i) => ({ ...it, icon: featureIcons[0][i] })) },
      { title: cols[1].title, items: cols[1].items.map((it, i) => ({ ...it, icon: featureIcons[1][i] })) },
    ],
    scenarioLabel: t("products.qualion.scenarioLabel"),
    scenarios,
    ctaTitle: t("products.qualion.ctaTitle"),
    ctaSubtitle: t("products.qualion.ctaSubtitle"),
    primaryCta: t("products.qualion.primaryCta"),
  };

  return (
    <>
      <ProductPageTemplate data={data} />
    </>
  );
}
