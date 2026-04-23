import { Link, createFileRoute } from "@tanstack/react-router";
import { Eye, FileCheck, MessageSquare, Shield, SpellCheck, UserRoundX } from "lucide-react";
import { useTranslation } from "react-i18next";

import { FadeSection } from "@/components/FadeSection";
import { FinalCTA } from "@/components/FinalCTA";
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
      <FadeSection className="hero-wash max-w-4xl rounded-[28px] px-6 py-12">
        <div className="eyebrow">{t("products.qualion.eyebrow")}</div>
        <div className="mt-4 flex items-start gap-5">
          <div className="brand-gradient flex h-20 w-20 shrink-0 items-center justify-center rounded-full text-primary-foreground shadow-[0_12px_32px_rgba(124,111,240,0.24)]">
            <Shield className="h-9 w-9" />
          </div>
          <div>
            <h1 className="text-[32px] font-bold leading-tight text-foreground md:text-[48px] lg:text-[56px]">{t("products.qualion.title").split(" ").map((word, index) => <span key={`${word}-${index}`}>{index === 0 ? <span className="brand-gradient-text">{word}</span> : word}{index < t("products.qualion.title").split(" ").length - 1 ? " " : ""}</span>)}</h1>
            <p className="mt-5 max-w-3xl text-lg leading-8 text-muted-foreground">{t("products.qualion.subtitle")}</p>
          </div>
        </div>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <a href={SIGNUP_URL} target="_blank" rel="noreferrer"><Button size="lg">{t("nav.start")}</Button></a>
          <Link to="/contact"><Button variant="outline" size="lg">{t("common.requestDemo")}</Button></Link>
        </div>
      </FadeSection>

      <FadeSection className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-3" delay={0.1}>
        {features.map((feature, index) => {
          const Icon = icons[index];
          return (
            <Card key={feature.title}>
              <CardContent className="p-6">
                <div className="brand-icon mb-4 flex h-10 w-10 items-center justify-center rounded-xl text-primary"><Icon className="h-5 w-5" /></div>
                <h2 className="text-lg font-semibold text-foreground">{feature.title}</h2>
                <p className="mt-3 text-sm leading-6 text-muted-foreground">{feature.text}</p>
              </CardContent>
            </Card>
          );
        })}
      </FadeSection>

      <FadeSection className="mt-14 grid gap-6 lg:grid-cols-2" delay={0.15}>
        <Card>
          <CardHeader><CardTitle>Comment ça marche</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            {steps.map((step, index) => (
              <div key={step} className="flex items-center gap-4 rounded-2xl border border-border bg-muted/40 px-4 py-4">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground">{index + 1}</div>
                <div className="font-medium text-foreground">{step}</div>
              </div>
            ))}
          </CardContent>
        </Card>
        <Card>
          <CardHeader><CardTitle>Pour qui</CardTitle></CardHeader>
          <CardContent className="space-y-3">
            {audiences.map((audience) => (
              <div key={audience} className="brand-badge rounded-full px-4 py-2 text-sm font-medium text-primary">{audience}</div>
            ))}
            <div className="pt-4"><a href={SIGNUP_URL} target="_blank" rel="noreferrer"><Button>{t("common.startFree")}</Button></a></div>
          </CardContent>
        </Card>
      </FadeSection>
      <div className="mt-16 -mx-4 sm:-mx-6 lg:-mx-8"><FinalCTA /></div>
    </div>
  );
}
