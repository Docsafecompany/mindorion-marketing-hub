import { createFileRoute } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";

import { createStaticMeta } from "@/lib/site";

export const Route = createFileRoute("/legal/privacy")({
  head: () =>
    createStaticMeta({
      title: "Privacy, Mindorion",
      description: "Read the Mindorion privacy policy: collected data, usage, retention and GDPR rights.",
      path: "/legal/privacy",
    }),
  component: LegalPrivacyPage,
});

function LegalPrivacyPage() {
  const { t } = useTranslation();
  const sections = t("privacy.sections", { returnObjects: true }) as Array<{ title: string; body: string }>;

  return (
    <div className="section-shell section-space">
      <div className="legal-copy">
        <h1 className="text-4xl font-extrabold text-foreground sm:text-5xl">{t("privacy.title")}</h1>
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
