import { createFileRoute } from "@tanstack/react-router";
import { BarChart3, Mail, Network, PlugZap, Radar } from "lucide-react";
import { useTranslation } from "react-i18next";

import { FadeSection } from "@/components/FadeSection";
import { SEOHead } from "@/components/SEOHead";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { SIGNUP_URL } from "@/lib/site";
import { createStaticMeta } from "@/lib/site";

export const Route = createFileRoute("/products/prospectiq")({
  head: () =>
    createStaticMeta({
      title: "ProspectIQ — Intelligent B2B outreach",
      description: "ProspectIQ helps sales teams target the right accounts, orchestrate sequences and track commercial performance.",
      path: "/products/prospectiq",
    }),
  component: ProspectIQPage,
});

function ProspectIQPage() {
  const { t } = useTranslation();
  const features = t("products.prospectiq.features", { returnObjects: true }) as string[];
  const audiences = t("products.prospectiq.audiences", { returnObjects: true }) as string[];
  const icons = [Radar, Mail, Network, BarChart3, PlugZap] as const;

  return (
    <div className="section-shell section-space">
      <SEOHead title={t("products.prospectiq.seoTitle")} description={t("products.prospectiq.seoDescription")} path="/products/prospectiq" />
      <FadeSection className="max-w-4xl">
        <div className="eyebrow">{t("products.prospectiq.eyebrow")}</div>
        <h1 className="mt-4 text-4xl font-extrabold text-foreground sm:text-5xl">{t("products.prospectiq.title")}</h1>
        <p className="mt-5 text-lg leading-8 text-muted-foreground">{t("products.prospectiq.subtitle")}</p>
      </FadeSection>
      <FadeSection className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-5" delay={0.1}>
        {features.map((feature, index) => {
          const Icon = icons[index];
          return (
            <Card key={feature} className="rounded-lg">
              <CardContent className="p-6">
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-muted text-primary"><Icon className="h-4 w-4" /></div>
                <h2 className="font-semibold text-foreground">{feature}</h2>
              </CardContent>
            </Card>
          );
        })}
      </FadeSection>
      <FadeSection className="mt-14 rounded-lg border border-border/80 bg-card p-8" delay={0.15}>
        <div className="eyebrow">Pour qui</div>
        <div className="mt-5 flex flex-wrap gap-3">
          {audiences.map((audience) => (
            <span key={audience} className="rounded-full border border-border/80 bg-muted/50 px-4 py-2 text-sm text-muted-foreground">{audience}</span>
          ))}
        </div>
        <div className="mt-8"><a href={SIGNUP_URL}><Button>{t("nav.start")}</Button></a></div>
      </FadeSection>
    </div>
  );
}
