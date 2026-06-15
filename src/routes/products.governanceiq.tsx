import { createFileRoute } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";

import { ProductPageTemplate, type ProductPageData } from "@/components/ProductPageTemplate";
import { createStaticMeta } from "@/lib/site";

const theme = {
  heroBg: "#1a1400",
  heroCardBg: "#0d0a00",
  accent: "#BA7517",
  accentSoft: "#FAEEDA",
  accentText: "#EF9F27",
  accentStrong: "#BA7517",
  darkMuted: "#B7AE94",
  ctaBg: "#BA7517",
};

const policyTones = ["success", "success", "warning"] as const;
const featureIcons: [string[], string[]] = [
  ["📋", "🔍", "⚠️", "📊"],
  ["🔒", "📁", "👥", "🔗"],
];

export const Route = createFileRoute("/products/governanceiq")({
  head: () => {
    const base = createStaticMeta({
      title: "Governance Layer | Conformité documentaire équipe | Mindorion",
      description:
        "Governance Layer centralise les politiques documentaires de votre organisation, automatise les audits et garantit que chaque équipe opère selon les mêmes standards.",
      path: "/products/governanceiq",
    });
    return {
      ...base,
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            name: "Governance Layer",
            applicationCategory: "BusinessApplication",
            operatingSystem: "Web",
            description:
              "Compliance and governance for external communications. Centralize policies, automate audits and align every team.",
            url: "https://mindorion.com/products/governanceiq",
            offers: {
              "@type": "Offer",
              price: "0",
              priceCurrency: "EUR",
            },
          }),
        },
      ],
    };
  },
  component: GovernanceIQPage,
});

function GovernanceIQPage() {
  const { t } = useTranslation();
  const stats = t("products.governanceiq.heroStats", { returnObjects: true }) as Array<{ value: string; label: string }>;
  const policies = (t("products.governanceiq.heroPolicies", { returnObjects: true }) as string[]).map((text, i) => ({ text, tone: policyTones[i] }));
  const howItWorks = t("products.governanceiq.howItWorks", { returnObjects: true }) as Array<{ title: string; text: string }>;
  const cols = t("products.governanceiq.featureColumns", { returnObjects: true }) as Array<{ title: string; items: Array<{ title: string; text: string }> }>;
  const scenarios = t("products.governanceiq.scenarios", { returnObjects: true }) as Array<{ tag: string; title: string; text: string; result: string }>;

  const data: ProductPageData = {
    product: "governanceiq",
    eyebrow: t("products.governanceiq.eyebrow"),
    title: t("products.governanceiq.title"),
    subtitle: t("products.governanceiq.subtitle"),
    theme,
    heroPanel: { type: "dashboard", label: t("products.governanceiq.heroLabel"), stats, policies },
    howItWorks,
    featureColumns: [
      { title: cols[0].title, items: cols[0].items.map((it, i) => ({ ...it, icon: featureIcons[0][i] })) },
      { title: cols[1].title, items: cols[1].items.map((it, i) => ({ ...it, icon: featureIcons[1][i] })) },
    ],
    scenarioLabel: t("products.governanceiq.scenarioLabel"),
    scenarios,
    ctaTitle: t("products.governanceiq.ctaTitle"),
    ctaSubtitle: t("products.governanceiq.ctaSubtitle"),
    primaryCta: t("products.governanceiq.primaryCta"),
  };

  return (
    <>
      <ProductPageTemplate data={data} />
    </>
  );
}
