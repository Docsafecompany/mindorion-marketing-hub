import { useMemo, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { CheckCircle2 } from "lucide-react";
import { useTranslation } from "react-i18next";

import { FadeSection } from "@/components/FadeSection";
import { SEOHead } from "@/components/SEOHead";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { SIGNUP_URL } from "@/lib/site";
import { createStaticMeta } from "@/lib/site";

export const Route = createFileRoute("/pricing")({
  head: () =>
    createStaticMeta({
      title: "Mindorion Pricing — Simple, transparent plans",
      description: "Compare Mindorion Starter, Pro, Business and Enterprise plans for document quality, sales execution and compliance needs.",
      path: "/pricing",
    }),
  component: PricingPage,
});

function PricingPage() {
  const { t } = useTranslation();
  const [annual, setAnnual] = useState(false);
  const plans = t("pricing.plans", { returnObjects: true }) as Array<{
    name: string;
    priceMonthly: string;
    priceAnnual: string;
    cta: string;
    description: string;
    features: string[];
  }>;
  const rows = t("pricing.tableRows", { returnObjects: true }) as Array<Record<string, string>>;
  const planValues = useMemo(() => plans.map((plan) => ({ ...plan, price: annual ? plan.priceAnnual : plan.priceMonthly })), [annual, plans]);

  return (
    <div className="section-shell section-space">
      <SEOHead title={t("pricing.seoTitle")} description={t("pricing.seoDescription")} path="/pricing" />
      <FadeSection className="hero-wash mx-auto max-w-4xl rounded-[28px] px-6 py-12 text-center">
        <h1 className="text-[32px] font-bold leading-tight text-foreground md:text-[48px] lg:text-[56px]">{t("pricing.title").split(" ").map((word, index) => <span key={`${word}-${index}`}>{index === 3 ? <span className="brand-gradient-text">{word}</span> : word}{index < t("pricing.title").split(" ").length - 1 ? " " : ""}</span>)}</h1>
        <p className="mx-auto mt-4 max-w-[600px] text-lg text-muted-foreground">{t("pricing.subtitle")}</p>
        <div className="mt-8 inline-flex rounded-full border border-border bg-card p-1">
          <button className={`rounded-full px-4 py-2 text-sm font-semibold ${!annual ? "bg-primary text-primary-foreground" : "text-muted-foreground"}`} onClick={() => setAnnual(false)}>
            {t("common.monthly")}
          </button>
          <button className={`rounded-full px-4 py-2 text-sm font-semibold ${annual ? "bg-primary text-primary-foreground" : "text-muted-foreground"}`} onClick={() => setAnnual(true)}>
            {t("common.annual")} {annual ? t("common.save") : ""}
          </button>
        </div>
      </FadeSection>

      <FadeSection className="mt-12 grid gap-6 xl:grid-cols-4" delay={0.1}>
        {planValues.map((plan) => (
          <Card key={plan.name} className={plan.name === "Pro" ? "relative border-2 border-transparent bg-[linear-gradient(var(--color-card),var(--color-card)),var(--gradient-brand)] bg-[padding-box,border-box]" : undefined}>
            <CardHeader>
              {plan.name === "Pro" ? <div className="brand-badge mb-3 inline-flex w-fit rounded-full px-3 py-1 text-xs font-semibold text-primary">Populaire</div> : null}
              <CardTitle className="text-2xl">{plan.name}</CardTitle>
              <p className="text-sm text-muted-foreground">{plan.description}</p>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-extrabold text-foreground">{plan.price}</div>
              <ul className="mt-6 space-y-3">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-3 text-sm text-muted-foreground">
                    <CheckCircle2 className="h-4 w-4 text-secondary" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-8">
                {plan.name === "Enterprise" ? (
                  <a href="/contact">
                    <Button variant="outline" className="w-full">{plan.cta}</Button>
                  </a>
                ) : (
                  <a href={SIGNUP_URL}>
                    <Button className="w-full">{plan.cta}</Button>
                  </a>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </FadeSection>

      <FadeSection className="mt-14" delay={0.15}>
        <Card className="overflow-hidden">
          <CardHeader>
            <CardTitle className="text-2xl">{t("pricing.tableTitle")}</CardTitle>
          </CardHeader>
          <CardContent className="overflow-x-auto">
            <table className="min-w-full text-left text-sm">
              <thead>
                <tr className="border-b border-border/80 text-muted-foreground">
                  <th className="pb-4 pr-6 font-semibold">Feature</th>
                  <th className="pb-4 pr-6 font-semibold">Starter</th>
                  <th className="pb-4 pr-6 font-semibold">Pro</th>
                  <th className="pb-4 pr-6 font-semibold">Business</th>
                  <th className="pb-4 font-semibold">Enterprise</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((row) => (
                  <tr key={row.feature} className="border-b border-border/60 last:border-none">
                    <td className="py-4 pr-6 font-medium text-foreground">{row.feature}</td>
                    <td className="py-4 pr-6 text-muted-foreground">{row.starter}</td>
                    <td className="py-4 pr-6 text-muted-foreground">{row.pro}</td>
                    <td className="py-4 pr-6 text-muted-foreground">{row.business}</td>
                    <td className="py-4 text-muted-foreground">{row.enterprise}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </CardContent>
        </Card>
      </FadeSection>
    </div>
  );
}
