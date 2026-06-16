import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Target, Lock, Zap, Linkedin, Rocket, Gauge, Shield } from "lucide-react";
import { useTranslation } from "react-i18next";

import { Button } from "@/components/ui/button";
import i18n from "@/i18n";
import { LINKEDIN_URL, createStaticMeta } from "@/lib/site";
import { trackEvent } from "@/lib/analytics";
import camilleImg from "@/assets/founder-camille.jpg";
import romainImg from "@/assets/founder-romain.png";

export const Route = createFileRoute("/why-mindorion")({
  head: () =>
    createStaticMeta({
      title: i18n.t("whyMindorion.seoTitle"),
      description: i18n.t("whyMindorion.seoDescription"),
      path: "/why-mindorion",
    }),
  component: WhyMindorionPage,
});

function WhyMindorionPage() {
  const { t } = useTranslation();

  const founders = [
    {
      photo: romainImg,
      photoClassName: "object-top",
      name: "Camille-Aurélien Baltaze",
      roleKey: "founders.camille.role",
      locationKey: "founders.camille.location",
      linkedinUrl: "https://www.linkedin.com/in/camille-aur%C3%A9lien-baltaze",
      quoteKey: "founders.camille.quote",
      educationKey: "founders.camille.education" as string | undefined,
    },
    {
      photo: camilleImg,
      photoClassName: "scale-125 object-center",
      name: "Romain Ortis",
      roleKey: "founders.romain.role",
      locationKey: "founders.romain.location",
      linkedinUrl: "https://www.linkedin.com/in/romain-ortis-a97423113",
      quoteKey: "founders.romain.quote",
      educationKey: undefined as string | undefined,
    },
  ];

  const principleIcons = [Target, Lock, Zap] as const;
  const principles = (t("whyMindorion.principles.items", { returnObjects: true }) as Array<{ title: string; body: string }>).map((item, index) => ({
    ...item,
    icon: principleIcons[index],
  }));

  const differenceIcons = [Rocket, Gauge, Shield] as const;
  const differenceSoft = ["editorial-purple-soft", "editorial-green-soft", "editorial-amber-soft"] as const;
  const differenceCards = (t("whyMindorion.difference.cards", { returnObjects: true }) as Array<{ title: string; body: string }>).map((card, index) => ({
    ...card,
    icon: differenceIcons[index],
    soft: differenceSoft[index],
  }));

  return (
    <div className="section-shell section-space space-y-8">
      {/* Hero */}
      <section className="rounded-xl bg-[var(--color-about-dark)] px-6 py-12 text-white lg:px-8 lg:py-16">
        <div className="mx-auto max-w-4xl text-center">
          <h1 className="headline-balance text-4xl font-extrabold leading-tight sm:text-5xl lg:text-6xl">
            {t("whyMindorion.hero.title")}
          </h1>
          <p className="mx-auto mt-6 max-w-3xl text-base leading-7 text-[var(--color-about-dark-muted)] sm:text-lg">
            {t("whyMindorion.hero.subtitle")}
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link to="/contact" onClick={() => trackEvent("cta_clicked", { cta: "why_mindorion_demo" })}>
              <Button size="lg" className="min-w-44 gap-1 rounded-xl bg-[var(--color-pricing-primary)] text-white shadow-none hover:bg-[var(--color-pricing-primary)]/95">
                {t("whyMindorion.hero.primaryCta")}
              </Button>
            </Link>
            <Link to="/products/proposaliq" onClick={() => trackEvent("cta_clicked", { cta: "why_mindorion_explore" })}>
              <Button size="lg" variant="outline" className="min-w-44 rounded-xl border-white/20 text-white hover:bg-white/10 hover:text-white">
                {t("whyMindorion.hero.secondaryCta")}
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Problem */}
      <section className="rounded-xl border border-[var(--color-about-card-border)] bg-card px-6 py-10 sm:px-8 lg:py-14">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="headline-balance text-3xl font-extrabold leading-tight text-foreground sm:text-4xl">
            {t("whyMindorion.problem.title")}
          </h2>
          <p className="mx-auto mt-5 max-w-3xl text-sm leading-7 text-muted-foreground sm:text-base">
            {t("whyMindorion.problem.body")}
          </p>
        </div>
      </section>

      {/* Foundation thesis + pyramid */}
      <section className="rounded-xl border border-[var(--color-about-card-border)] bg-card px-6 py-10 sm:px-8 lg:py-14">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-lg font-semibold text-foreground sm:text-xl">
            {t("whyMindorion.foundation.thesis")}
          </p>
        </div>

        <div className="mx-auto mt-10 flex max-w-3xl flex-col-reverse items-center gap-1.5 sm:gap-2">
          {/* Bottom — widest */}
          <div className="w-full rounded-xl editorial-purple-bg px-5 py-5 text-center text-white sm:px-6 sm:py-6">
            <div className="text-xs font-bold uppercase tracking-[0.14em] opacity-80">{t("whyMindorion.foundation.base.label")}</div>
            <div className="mt-1 text-sm font-semibold sm:text-base">{t("whyMindorion.foundation.base.text")}</div>
          </div>
          <div className="w-[92%] rounded-xl editorial-purple-soft px-5 py-5 text-center sm:px-6 sm:py-6">
            <div className="text-xs font-bold uppercase tracking-[0.14em] opacity-70">{t("whyMindorion.foundation.process.label")}</div>
            <div className="mt-1 text-sm font-semibold sm:text-base">{t("whyMindorion.foundation.process.text")}</div>
          </div>
          <div className="w-[84%] rounded-xl editorial-green-soft px-5 py-5 text-center sm:px-6 sm:py-6">
            <div className="text-xs font-bold uppercase tracking-[0.14em] opacity-70">{t("whyMindorion.foundation.data.label")}</div>
            <div className="mt-1 text-sm font-semibold sm:text-base">{t("whyMindorion.foundation.data.text")}</div>
          </div>
          <div className="w-[76%] rounded-xl editorial-amber-soft px-5 py-5 text-center sm:px-6 sm:py-6">
            <div className="text-xs font-bold uppercase tracking-[0.14em] opacity-70">{t("whyMindorion.foundation.control.label")}</div>
            <div className="mt-1 text-sm font-semibold sm:text-base">{t("whyMindorion.foundation.control.text")}</div>
          </div>
          {/* Top — narrowest */}
          <div className="w-[68%] rounded-xl bg-[#1e3a5f] px-5 py-5 text-center text-white sm:px-6 sm:py-6">
            <div className="text-xs font-bold uppercase tracking-[0.14em] opacity-80">{t("whyMindorion.foundation.result.label")}</div>
            <div className="mt-1 text-sm font-semibold sm:text-base">{t("whyMindorion.foundation.result.text")}</div>
          </div>
        </div>
      </section>

      {/* Where Mindorion makes the difference */}
      <section className="rounded-xl border border-[var(--color-about-card-border)] bg-card px-6 py-10 sm:px-8 lg:py-14">
        <div className="mx-auto max-w-3xl text-center">
          <div className="text-xs font-bold uppercase tracking-[0.18em] text-muted-foreground">{t("whyMindorion.difference.eyebrow")}</div>
          <h2 className="headline-balance mx-auto mt-4 text-3xl font-extrabold leading-tight text-foreground sm:text-4xl">
            {t("whyMindorion.difference.title")}
          </h2>
          <p className="mx-auto mt-5 max-w-3xl text-sm leading-7 text-muted-foreground sm:text-base">
            {t("whyMindorion.difference.body")}
          </p>
        </div>

        <div className="mx-auto mt-10 grid max-w-5xl gap-6 md:grid-cols-3">
          {differenceCards.map(({ icon: Icon, title, body, soft }) => (
            <article key={title} className="rounded-xl border border-[var(--color-about-card-border)] bg-card p-6">
              <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${soft}`}>
                <Icon className="h-5 w-5" />
              </div>
              <h3 className="mt-5 text-xl font-bold text-foreground">{title}</h3>
              <p className="mt-4 text-sm leading-7 text-muted-foreground">{body}</p>
            </article>
          ))}
        </div>

        <div className="mx-auto mt-10 max-w-3xl text-center">
          <p className="text-sm font-semibold leading-7 text-foreground sm:text-base">
            {t("whyMindorion.difference.footer")}
          </p>
        </div>
      </section>

      <section className="rounded-xl border border-[var(--color-about-card-border)] bg-card px-6 py-10 sm:px-8 lg:py-14">
        <div className="mx-auto max-w-3xl text-center">
          <div className="text-xs font-bold uppercase tracking-[0.18em] text-muted-foreground">{t("whyMindorion.focus.eyebrow")}</div>
          <h2 className="headline-balance mx-auto mt-4 text-3xl font-extrabold leading-tight text-foreground sm:text-4xl">
            {t("whyMindorion.focus.title")}
          </h2>
          <p className="mx-auto mt-5 max-w-3xl text-sm leading-7 text-muted-foreground sm:text-base">
            {t("whyMindorion.focus.body")}
          </p>
        </div>
      </section>

      {/* The Mindorion approach */}
      <section className="rounded-xl border border-[var(--color-about-card-border)] bg-card px-6 py-10 sm:px-8 lg:py-14">
        <div className="mx-auto max-w-3xl text-center">
          <div className="text-xs font-bold uppercase tracking-[0.18em] text-muted-foreground">{t("whyMindorion.approach.eyebrow")}</div>
          <h2 className="headline-balance mx-auto mt-4 text-3xl font-extrabold leading-tight text-foreground sm:text-4xl">
            {t("whyMindorion.approach.title")}
          </h2>
          <p className="mx-auto mt-5 max-w-3xl text-sm leading-7 text-muted-foreground sm:text-base">
            {t("whyMindorion.approach.body")}
          </p>
        </div>
      </section>

      {/* Founders — after the market thesis */}
      <section className="space-y-8">
        <div className="text-center">
          <div className="text-xs font-bold uppercase tracking-[0.18em] text-[var(--color-pricing-primary)]">{t("whyMindorion.founders.eyebrow")}</div>
          <h2 className="headline-balance mx-auto mt-4 max-w-3xl text-3xl font-extrabold leading-tight text-foreground sm:text-4xl">
            {t("whyMindorion.founders.title")}
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-muted-foreground">
            {t("whyMindorion.founders.subtitle")}
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {founders.map((f) => (
            <article key={f.name} className="rounded-xl border border-[var(--color-about-card-border)] bg-card p-6">
              <div className="flex items-start gap-4">
                <div className="h-16 w-16 shrink-0 overflow-hidden rounded-full">
                  <img
                    src={f.photo}
                    alt={f.name}
                    className={`h-full w-full object-cover ${f.photoClassName ?? ""}`}
                    loading="lazy"
                  />
                </div>
                <div className="min-w-0">
                  <div className="text-xl font-bold text-foreground">{f.name}</div>
                  <div className="mt-1 text-sm text-muted-foreground">{t(f.roleKey)}</div>
                  <div className="mt-1 text-xs text-muted-foreground">{t(f.locationKey)} · Mindorion</div>
                </div>
              </div>
              <div className="mt-5 flex flex-wrap gap-2">
                <a
                  href={f.linkedinUrl}
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => trackEvent("social_clicked", { platform: "linkedin", context: `founder_${f.name}` })}
                  className="inline-flex items-center gap-1.5 rounded-full border border-[var(--color-about-card-border)] px-3 py-1.5 text-sm font-medium text-foreground transition-colors hover:bg-[var(--color-pricing-primary-soft)]"
                >
                  <Linkedin className="h-4 w-4" />
                  LinkedIn
                </a>
              </div>
              <blockquote className="mt-5 border-l-2 border-[var(--color-pricing-primary)] pl-4 text-sm italic leading-7 text-muted-foreground">
                “{t(f.quoteKey)}”
              </blockquote>
              {f.educationKey ? (
                <div className="mt-5 text-xs text-muted-foreground">
                  <span className="font-semibold text-foreground">{t("founders.educationLabel")} :</span>{" "}
                  {t(f.educationKey)}
                </div>
              ) : null}
            </article>
          ))}
        </div>

        {/* Built with operators — transparency as secondary */}
        <article className="rounded-xl bg-[var(--color-pricing-primary)] p-6 text-white sm:p-8">
          <div className="mx-auto max-w-3xl text-center">
            <div className="text-xs font-bold uppercase tracking-[0.18em] text-[var(--color-pricing-primary-soft)]">
              {t("whyMindorion.founders.builtWithEyebrow")}
            </div>
            <h3 className="mt-4 text-2xl font-extrabold leading-tight sm:text-3xl">
              {t("whyMindorion.founders.builtWithTitle")}
            </h3>
            <p className="mt-4 text-sm leading-7 text-[var(--color-pricing-primary-soft)]">
              {t("whyMindorion.founders.builtWithBody")}
            </p>
          </div>
        </article>
      </section>

      {/* Principles */}
      <section className="space-y-6">
        <div className="text-center">
          <div className="text-xs font-bold uppercase tracking-[0.18em] text-muted-foreground">{t("whyMindorion.principles.eyebrow")}</div>
          <h2 className="headline-balance mx-auto mt-4 max-w-3xl text-3xl font-extrabold leading-tight text-foreground sm:text-4xl">
            {t("whyMindorion.principles.title")}
          </h2>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {principles.map(({ icon: Icon, title, body }) => (
            <article key={title} className="rounded-xl border border-[var(--color-about-card-border)] bg-card p-6">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[var(--color-pricing-primary-soft)] text-[var(--color-pricing-primary)]">
                <Icon className="h-5 w-5" />
              </div>
              <h3 className="mt-5 text-xl font-bold text-foreground">{title}</h3>
              <p className="mt-4 text-sm leading-7 text-muted-foreground">{body}</p>
            </article>
          ))}
        </div>
      </section>

      {/* Final CTA */}
      <section className="rounded-xl bg-[var(--color-about-dark)] px-6 py-10 text-center sm:px-8 lg:py-14">
        <h2 className="headline-balance mx-auto max-w-3xl text-3xl font-extrabold leading-tight text-white sm:text-4xl">
          {t("whyMindorion.finalCta.title")}
        </h2>
        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link to="/contact" onClick={() => trackEvent("cta_clicked", { cta: "why_mindorion_final_demo" })}>
            <Button size="lg" className="min-w-44 gap-1 rounded-xl bg-[var(--color-pricing-primary)] text-white shadow-none hover:bg-[var(--color-pricing-primary)]/95">
              {t("whyMindorion.finalCta.primaryCta")}
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
          <Link to="/products/proposaliq" onClick={() => trackEvent("cta_clicked", { cta: "why_mindorion_final_explore" })}>
            <Button size="lg" variant="outline" className="min-w-44 rounded-xl border-white/20 text-white hover:bg-white/10 hover:text-white">
              {t("whyMindorion.finalCta.secondaryCta")}
            </Button>
          </Link>
        </div>
        <div className="mt-6 text-xs text-[var(--color-about-dark-muted)]">
          {t("whyMindorion.finalCta.alsoOn")}{" "}
          <a
            href={LINKEDIN_URL}
            target="_blank"
            rel="noreferrer"
            onClick={() => trackEvent("social_clicked", { platform: "linkedin", context: "why_mindorion_footer" })}
            className="inline-flex items-center gap-1 underline-offset-2 hover:underline"
          >
            <Linkedin className="h-3.5 w-3.5" />
            LinkedIn
          </a>
        </div>
      </section>
    </div>
  );
}
