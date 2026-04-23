import { Link, createFileRoute } from "@tanstack/react-router";
import { ArrowRight, BriefcaseBusiness, CheckCircle2, FileText, Shield, Sparkles, Target, Users } from "lucide-react";
import { useTranslation } from "react-i18next";

import { FadeSection } from "@/components/FadeSection";
import { SEOHead } from "@/components/SEOHead";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { SIGNUP_URL } from "@/lib/site";
import { createStaticMeta } from "@/lib/site";

export const Route = createFileRoute("/")({
  head: () => ({
    ...createStaticMeta({
      title: "Mindorion — Protect your professional reputation",
      description: "Mindorion helps B2B teams control documents, structure outreach and manage compliance before every external send.",
      path: "/",
    }),
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Organization",
          name: "Mindorion",
          url: "https://mindorion.com",
          email: "contact@mindorion.com",
          description: "Professional intelligence for B2B teams.",
        }),
      },
    ],
  }),
  component: HomePage,
});

function HomePage() {
  const { t } = useTranslation();
  const stats = t("home.stats", { returnObjects: true }) as Array<{ value: string; label: string }>;
  const productCards = t("home.productCards", { returnObjects: true }) as Array<{ title: string; text: string }>;
  const useCases = t("home.useCases", { returnObjects: true }) as Array<{ title: string; text: string }>;
  const whyItems = t("home.whyItems", { returnObjects: true }) as Array<{ title: string; text: string }>;
  const testimonials = t("home.testimonials", { returnObjects: true }) as Array<{ role: string; quote: string }>;
  const personas = t("home.personas", { returnObjects: true }) as string[];
  const qualionDocItems = t("home.qualionDocItems", { returnObjects: true }) as string[];
  const qualionProposalItems = t("home.qualionProposalItems", { returnObjects: true }) as string[];
  const productLinks = ["/products/qualion", "/products/prospectiq", "/products/governanceiq"] as const;
  const productIcons = [Shield, Target, FileText] as const;
  const useCaseIcons = [BriefcaseBusiness, Users, Sparkles, FileText] as const;

  return (
    <>
      <SEOHead title={t("home.seoTitle")} description={t("home.seoDescription")} path="/" />
      <div className="hero-grid overflow-hidden">
        <section className="section-shell section-space pb-12 pt-16 sm:pt-20 lg:pt-24">
          <FadeSection className="mx-auto max-w-4xl text-center">
            <Badge variant="outline" className="rounded-full border-primary/15 bg-card px-4 py-1 text-xs font-semibold text-muted-foreground">
              {t("home.badge")}
            </Badge>
            <h1 className="headline-balance mt-8 text-4xl font-extrabold leading-tight text-foreground sm:text-5xl lg:text-6xl">
              {t("home.title")}
            </h1>
            <p className="mx-auto mt-6 max-w-3xl text-balance text-lg leading-8 text-muted-foreground">
              {t("home.subtitle")}
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link to="/pricing">
                <Button size="lg" className="min-w-44 gap-1">
                  {t("common.viewPricing")}
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link to="/contact">
                <Button size="lg" variant="outline" className="min-w-44">
                  {t("common.requestDemo")}
                </Button>
              </Link>
            </div>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-2">
              {personas.map((persona) => (
                <span key={persona} className="rounded-full border border-border/80 bg-card px-3 py-1 text-sm text-muted-foreground">
                  {persona}
                </span>
              ))}
            </div>
          </FadeSection>

          <FadeSection className="mt-14 grid gap-5 lg:grid-cols-3" delay={0.1}>
            {productCards.map((card, index) => {
              const Icon = productIcons[index];
              return (
                <Link key={card.title} to={productLinks[index]}>
                  <Card className="h-full rounded-lg border-border/80 transition-transform duration-200 hover:-translate-y-1">
                    <CardHeader>
                      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-muted text-primary">
                        <Icon className="h-5 w-5" />
                      </div>
                      <CardTitle className="text-xl">{card.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground">{card.text}</p>
                    </CardContent>
                  </Card>
                </Link>
              );
            })}
          </FadeSection>
        </section>
      </div>

      <section className="section-shell pb-8">
        <FadeSection className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {stats.map((stat) => (
            <Card key={stat.label} className="rounded-lg bg-card/78">
              <CardContent className="p-6">
                <div className="text-3xl font-extrabold text-foreground">{stat.value}</div>
                <div className="mt-2 text-sm text-muted-foreground">{stat.label}</div>
              </CardContent>
            </Card>
          ))}
        </FadeSection>
      </section>

      <section className="section-shell section-space">
        <FadeSection>
          <div className="eyebrow">{t("home.productsIntro")}</div>
          <div className="mt-3 flex max-w-3xl flex-col gap-4">
            <h2 className="headline-balance text-3xl font-bold text-foreground sm:text-4xl">{t("home.productsTitle")}</h2>
            <p className="text-lg leading-8 text-muted-foreground">{t("home.productsSubtitle")}</p>
          </div>
        </FadeSection>
        <FadeSection className="mt-10 grid gap-6 lg:grid-cols-2" delay={0.1}>
          <Card className="rounded-lg">
            <CardHeader>
              <CardTitle className="text-2xl">{t("home.qualionDocTitle")}</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {qualionDocItems.map((item) => (
                  <li key={item} className="flex items-center gap-3 text-muted-foreground">
                    <CheckCircle2 className="h-4 w-4 text-secondary" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-8">
                <Link to="/products/qualion">
                  <Button variant="outline">{t("common.learnMore")}</Button>
                </Link>
              </div>
            </CardContent>
          </Card>
          <Card className="rounded-lg">
            <CardHeader>
              <CardTitle className="text-2xl">{t("home.qualionProposalTitle")}</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {qualionProposalItems.map((item) => (
                  <li key={item} className="flex items-center gap-3 text-muted-foreground">
                    <CheckCircle2 className="h-4 w-4 text-secondary" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-8">
                <Link to="/products/qualion">
                  <Button variant="outline">{t("common.learnMore")}</Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </FadeSection>
      </section>

      <section className="section-shell section-space pt-0">
        <FadeSection>
          <div className="eyebrow">{t("home.useCasesIntro")}</div>
          <h2 className="mt-3 text-3xl font-bold text-foreground sm:text-4xl">{t("home.useCasesTitle")}</h2>
        </FadeSection>
        <FadeSection className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-4" delay={0.1}>
          {useCases.map((item, index) => {
            const Icon = useCaseIcons[index];
            return (
              <Card key={item.title} className="rounded-lg">
                <CardContent className="p-6">
                  <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-lg bg-muted text-primary">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground">{item.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-muted-foreground">{item.text}</p>
                </CardContent>
              </Card>
            );
          })}
        </FadeSection>
      </section>

      <section className="section-shell section-space pt-0">
        <FadeSection>
          <div className="eyebrow">{t("home.whyIntro")}</div>
          <h2 className="mt-3 text-3xl font-bold text-foreground sm:text-4xl">{t("home.whyTitle")}</h2>
        </FadeSection>
        <FadeSection className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-4" delay={0.1}>
          {whyItems.map((item) => (
            <Card key={item.title} className="rounded-lg">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-foreground">{item.title}</h3>
                <p className="mt-3 text-sm leading-6 text-muted-foreground">{item.text}</p>
              </CardContent>
            </Card>
          ))}
        </FadeSection>
      </section>

      <section className="section-shell section-space pt-0">
        <FadeSection>
          <div className="eyebrow">{t("home.proofIntro")}</div>
          <h2 className="mt-3 text-3xl font-bold text-foreground sm:text-4xl">{t("home.proofTitle")}</h2>
        </FadeSection>
        <FadeSection className="mt-10 grid gap-5 lg:grid-cols-3" delay={0.1}>
          {testimonials.map((item) => (
            <Card key={item.role} className="rounded-lg">
              <CardContent className="p-6">
                <div className="mb-4 inline-flex rounded-full bg-muted px-3 py-1 text-xs font-semibold text-muted-foreground">{item.role}</div>
                <p className="text-base leading-7 text-foreground">“{item.quote}”</p>
              </CardContent>
            </Card>
          ))}
        </FadeSection>
      </section>

      <section className="section-shell pb-20">
        <FadeSection className="rounded-lg border border-border/80 bg-card px-6 py-10 text-center shadow-[0_24px_64px_-40px_color-mix(in_oklab,var(--color-primary)_30%,transparent)] sm:px-10">
          <h2 className="text-3xl font-bold text-foreground sm:text-4xl">{t("home.finalTitle")}</h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">{t("home.finalText")}</p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <a href={SIGNUP_URL}>
              <Button size="lg">{t("common.startFree")}</Button>
            </a>
            <Link to="/contact">
              <Button variant="outline" size="lg">{t("home.ctaSecondary")}</Button>
            </Link>
          </div>
        </FadeSection>
      </section>
    </>
  );
}
