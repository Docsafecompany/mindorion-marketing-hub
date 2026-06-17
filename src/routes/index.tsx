import { Link, createFileRoute } from "@tanstack/react-router";
import { ArrowRight, BriefcaseBusiness, ChevronRight, FileText, Shield, Sparkles, Users } from "lucide-react";
import { useTranslation } from "react-i18next";

import { FadeSection } from "@/components/FadeSection";
import { ProductLogo } from "@/components/ProductLogo";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { createStaticMeta } from "@/lib/site";
import { trackEvent } from "@/lib/analytics";

export const Route = createFileRoute("/")({
  head: () => ({
    ...createStaticMeta({
      title: "Mindorion | Enterprise OS for Engineering & IT Services",
      description: "Mindorion helps engineering and IT services firms align strategy, commercial execution and governance through unified operational data and enterprise AI.",
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
          description: "Enterprise intelligence for engineering and consulting organizations.",
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
  const useCases = t("home.useCases", { returnObjects: true }) as Array<{ title: string; text: string }>;
  const whyItems = t("home.whyItems", { returnObjects: true }) as Array<{ title: string; text: string }>;
  const testimonials = t("home.testimonials", { returnObjects: true }) as Array<{ role: string; quote: string }>;
  const industries = t("home.industries", { returnObjects: true }) as string[];
  const leaders = t("home.leaders", { returnObjects: true }) as string[];
  const useCaseIcons = [BriefcaseBusiness, Users, Sparkles, FileText] as const;

  return (
    <>
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
              <Link to="/contact" onClick={() => trackEvent("cta_clicked", { cta: "hero_demo" })}>
                <Button size="lg" className="min-w-44 gap-1">
                  {t("home.primaryCta")}
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link to="/pricing" onClick={() => trackEvent("cta_clicked", { cta: "hero_pricing" })}>
                <Button size="lg" variant="outline" className="min-w-44">
                  {t("home.secondaryCta")}
                </Button>
              </Link>
            </div>
          </FadeSection>

          <FadeSection className="mt-14" delay={0.1}>
            <div className="eyebrow text-center">{t("home.productsSectionTitle")}</div>

            {/* Connecting flow strip */}
            <div className="mt-6 flex flex-wrap items-center justify-center gap-2 text-xs font-medium">
              <span className="rounded-full editorial-gray-soft px-3 py-1">Strategy</span>
              <ChevronRight className="h-3.5 w-3.5 text-muted-foreground/50" />
              <span className="rounded-full editorial-purple-soft px-3 py-1">ProposalIQ</span>
              <ChevronRight className="h-3.5 w-3.5 text-muted-foreground/50" />
              <span className="rounded-full editorial-green-soft px-3 py-1">GrowthIQ</span>
              <ChevronRight className="h-3.5 w-3.5 text-muted-foreground/50" />
              <span className="rounded-full editorial-amber-soft px-3 py-1">Governance</span>
              <ChevronRight className="h-3.5 w-3.5 text-muted-foreground/50" />
              <span className="rounded-full editorial-gray-soft px-3 py-1">Decision Intelligence</span>
            </div>

            {/* Primary product cards */}
            <div className="mt-8 grid gap-5 lg:grid-cols-2">
              {/* ProposalIQ */}
              <Card className="h-full">
                <CardHeader>
                  <div className="mb-2 flex h-16 w-40 items-center justify-start rounded-xl">
                    <ProductLogo product="proposaliq" className="object-left" />
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{t("home.heroProducts.0.text")}</p>
                  <div className="mt-6">
                    <Link to="/products/proposaliq" onClick={() => trackEvent("cta_clicked", { cta: "hero_explore_proposaliq" })} className="inline-flex items-center gap-1 text-sm font-semibold text-primary transition-colors hover:text-primary/80">
                      {t("home.heroProducts.0.cta")}
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </div>
                </CardContent>
              </Card>

              {/* GrowthIQ */}
              <Card className="h-full">
                <CardHeader>
                  <div className="mb-2 flex h-16 w-40 items-center justify-start rounded-xl">
                    <ProductLogo product="growthiq" className="object-left" />
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{t("home.heroProducts.1.text")}</p>
                  <div className="mt-6">
                    <Link to="/products/growthiq" onClick={() => trackEvent("cta_clicked", { cta: "hero_explore_growthiq" })} className="inline-flex items-center gap-1 text-sm font-semibold text-primary transition-colors hover:text-primary/80">
                      {t("home.heroProducts.1.cta")}
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Governance Layer - subordinate band */}
            <Card className="mt-5">
              <CardContent className="flex flex-col gap-4 p-6 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg editorial-amber-soft">
                    <Shield className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="text-base font-semibold text-foreground">Governance Layer</h3>
                    <p className="mt-1 text-sm text-muted-foreground">{t("home.governanceLayer.text")}</p>
                  </div>
                </div>
                <Link to="/why-mindorion" onClick={() => trackEvent("cta_clicked", { cta: "hero_learn_governance" })} className="inline-flex shrink-0 items-center gap-1 text-sm font-semibold text-primary transition-colors hover:text-primary/80">
                  {t("home.governanceLayer.cta")}
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </CardContent>
            </Card>
          </FadeSection>

          <FadeSection className="mt-12 grid gap-8 md:grid-cols-2" delay={0.15}>
            <div className="text-center md:text-left">
              <div className="eyebrow mb-3">{t("home.industriesTitle")}</div>
              <div className="flex flex-wrap items-center justify-center gap-2 md:justify-start">
                {industries.map((item) => (
                  <span key={item} className="brand-badge rounded-full px-3 py-1 text-sm font-medium text-primary">
                    {item}
                  </span>
                ))}
              </div>
            </div>
            <div className="text-center md:text-left">
              <div className="eyebrow mb-3">{t("home.leadersTitle")}</div>
              <div className="flex flex-wrap items-center justify-center gap-2 md:justify-start">
                {leaders.map((item) => (
                  <span key={item} className="brand-badge rounded-full px-3 py-1 text-sm font-medium text-primary">
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </FadeSection>
        </section>
      </div>

      <section className="section-shell pb-8">
        <FadeSection className="grid gap-4 md:grid-cols-3">
          {stats.map((stat) => (
            <Card key={stat.label} className="bg-card/78">
              <CardContent className="p-6">
                <div className="brand-gradient-text text-2xl font-extrabold">{stat.value}</div>
                <div className="mt-2 text-sm text-muted-foreground">{stat.label}</div>
              </CardContent>
            </Card>
          ))}
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
        <FadeSection className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5" delay={0.1}>
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
          <div className="mt-8 flex items-center justify-center">
            <Link to="/contact" onClick={() => trackEvent("cta_clicked", { cta: "final_demo" })}>
              <Button size="lg" className="h-[52px] px-8 gap-1">
                {t("home.ctaSecondary")}
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </FadeSection>
      </section>
    </>
  );
}
