import { createFileRoute } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";

import { SEOHead } from "@/components/SEOHead";
import { createStaticMeta } from "@/lib/site";

export const Route = createFileRoute("/legal/terms")({
  head: () =>
    createStaticMeta({
      title: "Terms — Mindorion",
      description: "Read the terms of use for the Mindorion marketing website.",
      path: "/legal/terms",
    }),
  component: LegalTermsPage,
});

function LegalTermsPage() {
  const { t } = useTranslation();
  const sections = t("terms.sections", { returnObjects: true }) as Array<{ title: string; body: string }>;

  return (
    <div className="section-shell section-space">
      <SEOHead title={t("terms.seoTitle")} description={t("terms.seoDescription")} path="/legal/terms" />
      <div className="legal-copy">
        <h1 className="text-4xl font-extrabold text-foreground sm:text-5xl">{t("terms.title")}</h1>
        {sections.map((section) => (
          <section key={section.title}>
            <h2>{section.title}</h2>
            <p>{section.body}</p>
          </section>
        ))}
      </div>
    </div>
  );
}