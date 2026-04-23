import { createFileRoute } from "@tanstack/react-router";
import { Database, Lock, ShieldCheck, TimerOff } from "lucide-react";
import { useTranslation } from "react-i18next";

import { FadeSection } from "@/components/FadeSection";
import { SEOHead } from "@/components/SEOHead";
import { Card, CardContent } from "@/components/ui/card";
import { createStaticMeta } from "@/lib/site";

export const Route = createFileRoute("/security")({
  head: () =>
    createStaticMeta({
      title: "Security & Compliance — Mindorion",
      description: "Mindorion commitments on EU hosting, encryption, GDPR and zero unnecessary data retention.",
      path: "/security",
    }),
  component: SecurityPage,
});

function SecurityPage() {
  const { t } = useTranslation();
  const cards = t("security.cards", { returnObjects: true }) as Array<{ title: string; text: string }>;
  const icons = [Database, Lock, ShieldCheck, TimerOff] as const;

  return (
    <div className="section-shell section-space">
      <SEOHead title={t("security.seoTitle")} description={t("security.seoDescription")} path="/security" />
      <FadeSection className="max-w-4xl">
        <h1 className="text-4xl font-extrabold text-foreground sm:text-5xl">{t("security.title")}</h1>
        <p className="mt-5 text-lg leading-8 text-muted-foreground">{t("security.subtitle")}</p>
      </FadeSection>
      <FadeSection className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-4" delay={0.1}>
        {cards.map((card, index) => {
          const Icon = icons[index];
          return (
            <Card key={card.title} className="rounded-lg">
              <CardContent className="p-6">
                <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-lg bg-muted text-primary"><Icon className="h-5 w-5" /></div>
                <h2 className="text-lg font-semibold text-foreground">{card.title}</h2>
                <p className="mt-3 text-sm leading-6 text-muted-foreground">{card.text}</p>
              </CardContent>
            </Card>
          );
        })}
      </FadeSection>
    </div>
  );
}
