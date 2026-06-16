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

const policyTones = ["success", "warning"] as const;
const featureIcons: [string[], string[]] = [
  ["🎯", "🏢", "🧠", "📅"],
  ["✉️", "🔄", "📊", "🔗"],
];

export const Route = createFileRoute("/products/growthiq")({
  head: () => {
    const base = createStaticMeta({
      title: "GrowthIQ | Commercial Execution Intelligence for Engineering & IT Services | Mindorion",
      description:
        "GrowthIQ helps Engineering & IT Services firms guide business development, capture high-value operational signals and turn commercial activity into decision intelligence.",
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
            name: "GrowthIQ",
            applicationCategory: "BusinessApplication",
            operatingSystem: "Web",
            description:
              "Commercial execution intelligence for engineering and IT services firms. Align strategy with business development and operational signals.",
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
  const heroStats = t("products.growthiq.heroStats", { returnObjects: true }) as Array<{ value: string; label: string }>;
  const heroPolicies = (t("products.growthiq.heroPolicies", { returnObjects: true }) as string[]).map((text, i) => ({ text, tone: policyTones[i] }));
  const howItWorks = t("products.growthiq.howItWorks", { returnObjects: true }) as Array<{ title: string; text: string }>;
  const cols = t("products.growthiq.featureColumns", { returnObjects: true }) as Array<{ title: string; items: Array<{ title: string; text: string }> }>;
  const scenarios = t("products.growthiq.scenarios", { returnObjects: true }) as Array<{ tag: string; title: string; text: string; result: string }>;

  const data: ProductPageData = {
    product: "growthiq",
    eyebrow: t("products.growthiq.eyebrow"),
    title: t("products.growthiq.title"),
    subtitle: t("products.growthiq.subtitle"),
    theme,
    heroPanel: { type: "dashboard", label: t("products.growthiq.heroLabel"), stats: heroStats, policies: heroPolicies },
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
    secondaryCta: { label: t("products.growthiq.secondaryCta"), href: "/products/growthiq#workflow" },
    ctaButton: { label: t("products.growthiq.ctaButton"), href: "/pricing" },
  };

  return (
    <>
      <ProductPageTemplate data={data} />
    </>
  );
}
