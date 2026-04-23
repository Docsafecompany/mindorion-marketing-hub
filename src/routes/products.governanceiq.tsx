import { createFileRoute } from "@tanstack/react-router";
import { Bell, ChartColumn, ClipboardCheck, LayoutDashboard, ScrollText } from "lucide-react";
import { useTranslation } from "react-i18next";

import { FadeSection } from "@/components/FadeSection";
import { FinalCTA } from "@/components/FinalCTA";
import { SEOHead } from "@/components/SEOHead";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { SIGNUP_URL } from "@/lib/site";
import { createStaticMeta } from "@/lib/site";

export const Route = createFileRoute("/products/governanceiq")({
  head: () =>
    createStaticMeta({
      title: "GovernanceIQ — Team document compliance",
      description: "GovernanceIQ gives managers the indicators, alerts and reporting they need to run team document compliance.",
      path: "/products/governanceiq",
    }),
  component: GovernanceIQPage,
});

function GovernanceIQPage() {
  const { t } = useTranslation();
  const features = t("products.governanceiq.features", { returnObjects: true }) as string[];
  const audiences = t("products.governanceiq.audiences", { returnObjects: true }) as string[];
  const icons = [LayoutDashboard, ChartColumn, Bell, ClipboardCheck, ScrollText] as const;

  return (
    <div className="section-shell section-space">
      <SEOHead title={t("products.governanceiq.seoTitle")} description={t("products.governanceiq.seoDescription")} path="/products/governanceiq" />
      <FadeSection className="hero-wash max-w-4xl rounded-[28px] px-6 py-12">
        <div className="eyebrow">{t("products.governanceiq.eyebrow")}</div>
        <div className="mt-4 flex items-start gap-5">
          <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-full bg-surface-amber text-surface-amber-foreground shadow-[0_12px_32px_rgba(245,158,11,0.24)]">
            <LayoutDashboard className="h-9 w-9" />
          </div>
          <div>
            <h1 className="text-[32px] font-bold leading-tight text-foreground md:text-[48px] lg:text-[56px]">{t("products.governanceiq.title").split(" ").map((word, index) => <span key={`${word}-${index}`}>{index === 0 ? <span className="brand-gradient-text">{word}</span> : word}{index < t("products.governanceiq.title").split(" ").length - 1 ? " " : ""}</span>)}</h1>
            <p className="mt-5 text-lg leading-8 text-muted-foreground">{t("products.governanceiq.subtitle")}</p>
          </div>
        </div>
      </FadeSection>
      <FadeSection className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-5" delay={0.1}>
        {features.map((feature, index) => {
          const Icon = icons[index];
          return (
            <Card key={feature}>
              <CardContent className="p-6">
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-surface-amber text-surface-amber-foreground"><Icon className="h-4 w-4" /></div>
                <h2 className="font-semibold text-foreground">{feature}</h2>
              </CardContent>
            </Card>
          );
        })}
      </FadeSection>
      <FadeSection className="mt-14 rounded-2xl border border-border bg-card p-8" delay={0.15}>
        <div className="eyebrow">Pour qui</div>
        <div className="mt-5 flex flex-wrap gap-3">
          {audiences.map((audience) => (
            <span key={audience} className="rounded-full bg-surface-amber px-4 py-2 text-sm font-medium text-surface-amber-foreground">{audience}</span>
          ))}
        </div>
        <div className="mt-8"><a href={SIGNUP_URL}><Button>{t("nav.start")}</Button></a></div>
      </FadeSection>
      <div className="mt-16 -mx-4 sm:-mx-6 lg:-mx-8"><FinalCTA /></div>
    </div>
  );
}
