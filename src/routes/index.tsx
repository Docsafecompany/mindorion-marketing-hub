import { Link, createFileRoute } from "@tanstack/react-router";
import { ArrowRight, BriefcaseBusiness, CheckCircle2, FileText, Sparkles, Users } from "lucide-react";
import { useTranslation } from "react-i18next";

import { FadeSection } from "@/components/FadeSection";
import { ProductLogo } from "@/components/ProductLogo";
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
  const heroTitleWords = t("home.heroTitleWords", { returnObjects: true }) as string[];
  const heroProducts = t("home.heroProducts", { returnObjects: true }) as Array<{
    icon: string;
    title: string;
    text: string;
    cta: string;
  }>;
  const useCases = t("home.useCases", { returnObjects: true }) as Array<{ title: string; text: string }>;
  const whyItems = t("home.whyItems", { returnObjects: true }) as Array<{ title: string; text: string }>;
  const testimonials = t("home.testimonials", { returnObjects: true }) as Array<{ role: string; quote: string }>;
  const personas = t("home.personas", { returnObjects: true }) as string[];
  const qualionDocItems = t("home.qualionDocItems", { returnObjects: true }) as string[];
  const qualionProposalItems = t("home.qualionProposalItems", { returnObjects: true }) as string[];
  const useCaseIcons = [BriefcaseBusiness, Users, Sparkles, FileText] as const;
  const heroProductLogos = ["qualion", "prospectiq", "governanceiq"] as const;

  return (
    <>
      <SEOHead title={t("home.seoTitle")} description={t("home.seoDescription")} path="/" />
      <div className="hero-grid overflow-hidden">
        <section className="section-shell section-space pb-12 pt-16 sm:pt-20 lg:pt-24">
          <FadeSection className="mx-auto max-w-4xl text-center">
            <Badge variant="outline" className="brand-badge rounded-full border-border bg-transparent px-4 py-1 text-xs font-medium text-primary">
              {t("home.badge")}
            </Badge>
            <h1 className="headline-balance mt-8 text-[32px] font-bold leading-tight text-foreground md:text-[48px] lg:text-[56px]">
              {heroTitleWords.map((word, index) => {
                return (
                  <span key={`${word}-${index}`}>
                    <span className="brand-gradient-text">{word}</span>
                    {index < heroTitleWords.length - 1 ? " " : ""}
                  </span>
                );
              })}
            </h1>
            <p className="mx-auto mt-6 max-w-[600px] text-balance text-lg leading-8 text-muted-foreground">
              {t("home.subtitle")}
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link to="/pricing">
                <Button size="lg" className="min-w-44 gap-1">
                  {t("home.primaryCta")}
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <a href="mailto:contact@mindorion.com">
                <Button size="lg" variant="outline" className="min-w-44">
                  {t("home.secondaryCta")}
                </Button>
              </a>
            </div>
          </FadeSection>

          <FadeSection className="mt-14 grid gap-5 lg:grid-cols-3" delay={0.1}>
            {heroProducts.map((card, index) => {
              return (
                <Card key={card.title} className="h-full">
                  <CardHeader>
                    <div className="mb-2 flex h-16 w-40 items-center justify-start rounded-xl">
                      <ProductLogo product={heroProductLogos[index]} className="object-left" />
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{card.text}</p>
                    <div className="mt-6">
                      <Link to="/pricing" className="inline-flex items-center gap-1 text-sm font-semibold text-primary transition-colors hover:text-primary/80">
                        {card.cta}
                        <ArrowRight className="h-4 w-4" />
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </FadeSection>

          <FadeSection className="mt-8 flex flex-wrap items-center justify-center gap-2" delay={0.15}>
            {personas.map((persona) => (
              <span key={persona} className="brand-badge rounded-full px-3 py-1 text-sm font-medium text-primary">
                {persona}
              </span>
            ))}
          </FadeSection>
        </section>
      </div>

      <section className="section-shell pb-8">
        <FadeSection className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {stats.map((stat) => (
            <Card key={stat.label} className="bg-card/78">
              <CardContent className="p-6">
                <div className="brand-gradient-text text-3xl font-extrabold">{stat.value}</div>
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
            <h2 className="headline-balance text-[32px] font-bold text-foreground md:text-[38px]">{t("home.productsTitle").split(" ").map((word, index) => <span key={`${word}-${index}`}>{index === 2 ? <span className="brand-gradient-text">{word}</span> : word}{index < t("home.productsTitle").split(" ").length - 1 ? " " : ""}</span>)}</h2>
            <p className="max-w-[540px] text-lg leading-8 text-muted-foreground">{t("home.productsSubtitle")}</p>
          </div>
        </FadeSection>
        <FadeSection className="mt-10 grid gap-6 lg:grid-cols-2" delay={0.1}>
          <Card>
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
          <Card>
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
          <h2 className="mt-3 text-[32px] font-bold text-foreground md:text-[38px]">{t("home.useCasesTitle").split(" ").map((word, index) => <span key={`${word}-${index}`}>{index === t("home.useCasesTitle").split(" ").length - 1 ? <span className="brand-gradient-text">{word}</span> : word}{index < t("home.useCasesTitle").split(" ").length - 1 ? " " : ""}</span>)}</h2>
        </FadeSection>
        <FadeSection className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-4" delay={0.1}>
          {useCases.map((item, index) => {
            const Icon = useCaseIcons[index];
            return (
              <Card key={item.title}>
                <CardContent className="p-6">
                  <div className="brand-icon mb-4 flex h-10 w-10 items-center justify-center rounded-xl text-primary">
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
          <h2 className="mt-3 text-[32px] font-bold text-foreground md:text-[38px]">{t("home.whyTitle").split(" ").map((word, index) => <span key={`${word}-${index}`}>{index === 0 ? <span className="brand-gradient-text">{word}</span> : word}{index < t("home.whyTitle").split(" ").length - 1 ? " " : ""}</span>)}</h2>
        </FadeSection>
        <FadeSection className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-4" delay={0.1}>
          {whyItems.map((item) => (
            <Card key={item.title}>
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
          <h2 className="mt-3 text-[32px] font-bold text-foreground md:text-[38px]">{t("home.proofTitle").split(" ").map((word, index) => <span key={`${word}-${index}`}>{index === 0 ? <span className="brand-gradient-text">{word}</span> : word}{index < t("home.proofTitle").split(" ").length - 1 ? " " : ""}</span>)}</h2>
        </FadeSection>
        <FadeSection className="mt-10 grid gap-5 lg:grid-cols-3" delay={0.1}>
          {testimonials.map((item) => (
            <Card key={item.role}>
              <CardContent className="p-6">
                <div className="brand-badge mb-4 inline-flex rounded-full px-3 py-1 text-xs font-semibold text-primary">{item.role}</div>
                <p className="text-base leading-7 text-foreground">“{item.quote}”</p>
              </CardContent>
            </Card>
          ))}
        </FadeSection>
      </section>

      <section className="hero-wash py-20">
        <FadeSection className="section-shell mx-auto max-w-[600px] px-6 text-center">
          <h2 className="text-[32px] font-bold text-foreground">{t("home.finalTitle").split(" ").map((word, index) => <span key={`${word}-${index}`}>{index === t("home.finalTitle").split(" ").length - 1 ? <span className="brand-gradient-text">{word}</span> : word}{index < t("home.finalTitle").split(" ").length - 1 ? " " : ""}</span>)}</h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">{t("home.finalText")}</p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <a href={SIGNUP_URL} target="_blank" rel="noreferrer">
              <Button size="lg" className="h-[52px] px-8">{t("common.startFree")}</Button>
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
