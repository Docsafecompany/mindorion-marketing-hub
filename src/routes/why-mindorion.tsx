import { createFileRoute } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { useTranslation } from "react-i18next";

import FoundersSection from "@/components/FoundersSection";
import { Button } from "@/components/ui/button";
import { LINKEDIN_URL, createStaticMeta } from "@/lib/site";

export const Route = createFileRoute("/why-mindorion")({
  head: () =>
    createStaticMeta({
      title: "Pourquoi Mindorion | Intelligence professionnelle B2B",
      description:
        "Mindorion est un éditeur SaaS fondé en Estonie pour l'Engineering & IT Services. Découvrez notre mission, notre équipe et notre approche build in public. ProposalIQ, GrowthIQ, Governance Layer.",
      path: "/why-mindorion",
    }),
  component: WhyMindorionPage,
});

function WhyMindorionPage() {
  const { t } = useTranslation();
  const tags = t("about.tags", { returnObjects: true }) as string[];
  const stats = t("about.stats", { returnObjects: true }) as Array<{ value: string; label: string }>;
  const values = t("about.values", { returnObjects: true }) as Array<{ icon: string; title: string; text: string }>;

  return (
    <div className="section-shell section-space space-y-8">

      <section className="grid gap-6 rounded-xl bg-[var(--color-about-dark)] p-6 text-white lg:grid-cols-[1.5fr_1fr] lg:p-8">
        <div>
          <div className="text-xs font-bold uppercase tracking-[0.18em] text-[var(--color-pricing-primary)]">{t("about.eyebrow")}</div>
          <h1 className="headline-balance mt-5 text-4xl font-extrabold leading-tight sm:text-5xl">
            {t("about.heroTitle1")}<span className="font-medium italic text-[var(--color-pricing-primary-soft)]">{t("about.heroTitle2")}</span>
          </h1>
          <p className="mt-5 max-w-3xl text-sm leading-7 text-[var(--color-about-dark-muted)] sm:text-base">
            {t("about.heroText")}
          </p>
          <div className="mt-6 flex flex-wrap gap-3 text-sm text-white/90">
            {tags.map((tag) => (
              <span key={tag} className="rounded-full bg-white/6 px-3 py-1.5 text-sm text-white/85 ring-1 ring-white/8">
                {tag}
              </span>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          {stats.map((stat) => (
            <div key={stat.label} className="rounded-xl border border-white/8 bg-white/4 px-5 py-5">
              <div className="text-4xl font-extrabold text-white">{stat.value}</div>
              <div className="mt-2 text-xs font-medium tracking-[0.14em] text-[var(--color-about-dark-muted)]">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="rounded-xl border border-[var(--color-about-card-border)] bg-card px-6 py-10 text-center sm:px-8">
        <div className="text-xs font-bold uppercase tracking-[0.18em] text-muted-foreground">{t("about.missionEyebrow")}</div>
        <h2 className="headline-balance mx-auto mt-4 max-w-3xl text-3xl font-extrabold leading-tight text-foreground sm:text-4xl">
          {t("about.missionTitle1")}<span className="italic text-[var(--color-pricing-primary)]">{t("about.missionTitle2")}</span>
        </h2>
        <p className="mx-auto mt-5 max-w-md text-sm leading-7 text-muted-foreground">
          {t("about.missionText")}
        </p>
      </section>

      <FoundersSection />

      <section className="grid gap-6 md:grid-cols-3">
        {values.map((value) => (
          <article key={value.title} className="rounded-xl border border-[var(--color-about-card-border)] bg-card p-6">
            <div className="text-3xl">{value.icon}</div>
            <h3 className="mt-5 text-xl font-bold text-foreground">{value.title}</h3>
            <p className="mt-4 text-sm leading-7 text-muted-foreground">{value.text}</p>
          </article>
        ))}
      </section>

      <section className="flex flex-col gap-5 rounded-[10px] bg-[var(--color-about-dark)] px-6 py-6 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white">{t("about.ctaTitle")}</h2>
          <p className="mt-2 text-sm leading-7 text-[var(--color-about-dark-muted)]">
            {t("about.ctaText")}
          </p>
        </div>
        <Button asChild className="rounded-xl bg-[var(--color-pricing-primary)] text-white shadow-none hover:bg-[var(--color-pricing-primary)]/95">
          <a href={LINKEDIN_URL} target="_blank" rel="noreferrer">
            {t("about.ctaButton")}
            <ArrowRight className="h-4 w-4" />
          </a>
        </Button>
      </section>
    </div>
  );
}
