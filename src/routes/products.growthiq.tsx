import { createFileRoute } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";

import { ProductPageTemplate, type ProductPageData } from "@/components/ProductPageTemplate";
import { createStaticMeta } from "@/lib/site";

const theme = {
  heroBg: "#0a1f16",
  heroCardBg: "#061410",
  accent: "#1D9E75",
  accentSoft: "#E1F5EE",
  accentText: "#5DCAA5",
  accentStrong: "#1D9E75",
  darkMuted: "#A6B7B0",
  ctaBg: "#0F6E56",
};

const featureIcons: [string[], string[]] = [
  ["🎯", "🏢", "🧠", "📅"],
  ["✉️", "🔄", "📊", "🔗"],
];

export const Route = createFileRoute("/products/growthiq")({
  head: () => {
    const base = createStaticMeta({
      title: "Growth IQ | Outreach B2B intelligent | Mindorion",
      description:
        "Growth IQ identifie vos meilleurs prospects B2B, qualifie les opportunités par IA et génère des séquences d'outreach personnalisées pour maximiser vos taux de réponse.",
      path: "/products/growthiq",
    });
    return {
      ...base,
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            name: "Growth IQ",
            applicationCategory: "BusinessApplication",
            operatingSystem: "Web",
            description:
              "Structured B2B prospecting and outreach. Qualify opportunities with AI and generate personalized sequences.",
            url: "https://mindorion.com/products/growthiq",
            offers: {
              "@type": "Offer",
              price: "29",
              priceCurrency: "EUR",
            },
          }),
        },
      ],
    };
  },
  component: GrowthIQPage,
});

function GrowthIQPage() {
  const { t } = useTranslation();
  const rows = t("products.growthiq.heroRows", { returnObjects: true }) as Array<{ initials: string; title: string; city: string; score: string }>;
  const howItWorks = t("products.growthiq.howItWorks", { returnObjects: true }) as Array<{ title: string; text: string }>;
  const cols = t("products.growthiq.featureColumns", { returnObjects: true }) as Array<{ title: string; items: Array<{ title: string; text: string }> }>;
  const scenarios = t("products.growthiq.scenarios", { returnObjects: true }) as Array<{ tag: string; title: string; text: string; result: string }>;

  const data: ProductPageData = {
    product: "growthiq",
    eyebrow: t("products.growthiq.eyebrow"),
    title: t("products.growthiq.title"),
    subtitle: t("products.growthiq.subtitle"),
    theme,
    heroPanel: { type: "pipeline", label: t("products.growthiq.heroLabel"), rows },
    howItWorks,
    featureColumns: [
      { title: cols[0].title, items: cols[0].items.map((it, i) => ({ ...it, icon: featureIcons[0][i] })) },
      { title: cols[1].title, items: cols[1].items.map((it, i) => ({ ...it, icon: featureIcons[1][i] })) },
    ],
    scenarioLabel: t("products.growthiq.scenarioLabel"),
    scenarios,
    ctaTitle: t("products.growthiq.ctaTitle"),
    ctaSubtitle: t("products.growthiq.ctaSubtitle"),
    primaryCta: t("products.growthiq.primaryCta"),
  };

  return (
    <>
      <ProductPageTemplate data={data} />
    </>
  );
}
