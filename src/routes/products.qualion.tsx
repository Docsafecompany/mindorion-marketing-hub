import { Link, createFileRoute } from "@tanstack/react-router";
import { Eye, FileCheck, MessageSquare, Shield, SpellCheck, UserRoundX } from "lucide-react";
import { useTranslation } from "react-i18next";

import { FadeSection } from "@/components/FadeSection";
import { SEOHead } from "@/components/SEOHead";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { SIGNUP_URL } from "@/lib/site";
import { createStaticMeta } from "@/lib/site";

export const Route = createFileRoute("/products/qualion")({
  head: () =>
    createStaticMeta({
      title: "Qualion — Document reputation before send",
      description: "Qualion detects metadata, comments, personal data and writing issues before you send Word, PDF and PowerPoint documents.",
      path: "/products/qualion",
    }),
  component: QualionPage,
});

function QualionPage() {
  const { t } = useTranslation();
  const features = t("products.qualion.features", { returnObjects: true }) as Array<{ title: string; text: string }>;
  const steps = t("products.qualion.steps", { returnObjects: true }) as string[];
  const audiences = t("products.qualion.audiences", { returnObjects: true }) as string[];
  const icons = [Shield, MessageSquare, UserRoundX, SpellCheck, Eye, FileCheck] as const;

  return (
    <div className="section-shell section-space">
      <SEOHead title={t("products.qualion.seoTitle")} description={t("products.qualion.seoDescription")} path="/products/qualion" />
      <FadeSection className="max-w-4xl">
        <div className="eyebrow">{t("products.qualion.eyebrow")}</div>
        <h1 className="mt-4 text-4xl font-extrabold text-foreground sm:text-5xl">{t("products.qualion.title")}</h1>
        <p className="mt-5 max-w-3xl text-lg leading-8 text-muted-foreground">{t("products.qualion.subtitle")}</p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <a href={SIGNUP_URL}><Button size="lg">{t("nav.start")}</Button></a>
          <Link to="/contact"><Button variant="outline" size="lg">{t("common.requestDemo")}</Button></Link>
        </div>
      </FadeSection>

      <FadeSection className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-3" delay={0.1}>
        {features.map((feature, index) => {
          const Icon = icons[index];
          return (
            <Card key={feature.title} className="rounded-lg">
              <CardContent className="p-6">
                <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-lg bg-muted text-primary"><Icon className="h-5 w-5" /></div>
                <h2 className="text-lg font-semibold text-foreground">{feature.title}</h2>
                <p className="mt-3 text-sm leading-6 text-muted-foreground">{feature.text}</p>
              </CardContent>
            </Card>
          );
        })}
      </FadeSection>

      <FadeSection className="mt-14 grid gap-6 lg:grid-cols-2" delay={0.15}>
        <Card className="rounded-lg">
          <CardHeader><CardTitle>Comment ça marche</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            {steps.map((step, index) => (
              <div key={step} className="flex items-center gap-4 rounded-lg border border-border/70 bg-muted/40 px-4 py-4">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground">{index + 1}</div>
                <div className="font-medium text-foreground">{step}</div>
              </div>
            ))}
          </CardContent>
        </Card>
        <Card className="rounded-lg">
          <CardHeader><CardTitle>Pour qui</CardTitle></CardHeader>
          <CardContent className="space-y-3">
            {audiences.map((audience) => (
              <div key={audience} className="rounded-lg border border-border/70 bg-muted/40 px-4 py-4 text-muted-foreground">{audience}</div>
            ))}
            <div className="pt-4"><a href={SIGNUP_URL}><Button>{t("common.startFree")}</Button></a></div>
          </CardContent>
        </Card>
      </FadeSection>
    </div>
  );
}
