import type { CSSProperties } from "react";
import { ArrowRight, Check } from "lucide-react";
import { useTranslation } from "react-i18next";

import { Button } from "@/components/ui/button";
import { ProductLogo } from "@/components/ProductLogo";
import { SIGNUP_URL } from "@/lib/site";
import { trackEvent } from "@/lib/analytics";
import { cn } from "@/lib/utils";

type Theme = {
  heroBg: string;
  heroCardBg: string;
  accent: string;
  accentSoft: string;
  accentText: string;
  accentStrong: string;
  darkMuted: string;
  ctaBg: string;
};

type HeroItem = {
  text: string;
  tone: "danger" | "warning" | "success";
};

type HeroPanel =
  | {
      type: "analysis";
      label: string;
      score: string;
      scoreTone: "danger" | "warning" | "success";
      items: HeroItem[];
    }
  | {
      type: "pipeline";
      label: string;
      rows: Array<{ initials: string; title: string; city: string; score: string }>;
    }
  | {
      type: "dashboard";
      label: string;
      stats: Array<{ value: string; label: string }>;
      policies: HeroItem[];
    };

type Step = { title: string; text: string };
type Feature = { icon: string; title: string; text: string };
type FeatureColumn = { title: string; items: Feature[] };
type Scenario = { tag: string; title: string; text: string; result: string };
type CostCard = { title: string; text: string };
type Availability = {
  label?: string;
  availableTitle: string;
  comingTitle: string;
  available: string[];
  coming: string[];
};

export type ProductPageData = {
  product: "proposaliq" | "growthiq" | "governanceiq";
  eyebrow: string;
  title: string;
  subtitle: string;
  theme: Theme;
  heroPanel: HeroPanel;
  howItWorks?: Step[];
  workflowLabel?: string;
  workflowSteps?: string[];
  costsLabel?: string;
  costs?: CostCard[];
  availability?: Availability;
  featureColumns?: [FeatureColumn, FeatureColumn];
  scenarioLabel?: string;
  scenarios?: Scenario[];
  ctaTitle: string;
  ctaSubtitle: string;
  primaryCta: string;
  secondaryCta?: { label: string; href: string };
  ctaButton?: { label: string; href: string };
};

export function ProductPageTemplate({ data }: { data: ProductPageData }) {
  const { t } = useTranslation();
  const style = {
    "--product-hero-bg": data.theme.heroBg,
    "--product-hero-card": data.theme.heroCardBg,
    "--product-accent": data.theme.accent,
    "--product-accent-soft": data.theme.accentSoft,
    "--product-accent-text": data.theme.accentText,
    "--product-accent-strong": data.theme.accentStrong,
    "--product-dark-muted": data.theme.darkMuted,
    "--product-cta-bg": data.theme.ctaBg,
  } as CSSProperties;

  return (
    <div className="overflow-x-hidden bg-[var(--color-product-page)] [font-family:var(--font-pricing)]" style={style}>
      <div className="section-shell section-space space-y-6 sm:space-y-8">
        <section className="grid gap-6 rounded-xl bg-[var(--product-hero-bg)] p-4 sm:p-6 lg:grid-cols-[1.38fr_1fr] lg:p-8">
          <div className="min-w-0">
            <div className="mb-5 h-12 w-32 sm:mb-6 sm:h-16 sm:w-44">
              <ProductLogo product={data.product} className="object-left" />
            </div>
            <div className="break-words text-[10px] font-bold uppercase tracking-[0.14em] text-[var(--product-accent-text)] sm:text-xs sm:tracking-[0.18em]">{data.eyebrow}</div>
            <h1 className="headline-balance mt-4 text-3xl font-extrabold leading-tight text-white sm:mt-5 sm:text-4xl lg:text-5xl">
              {data.title}
            </h1>
            <p className="mt-4 max-w-2xl text-sm leading-7 text-[var(--product-dark-muted)] sm:mt-5 sm:text-base sm:leading-8">{data.subtitle}</p>
            <div className="mt-6 flex flex-col gap-3 sm:mt-8 sm:flex-row">
              <Button asChild className="w-full rounded-xl bg-[var(--product-accent-strong)] text-white shadow-none hover:bg-[var(--product-accent-strong)]/95 sm:w-auto">
                <a
                  href={SIGNUP_URL}
                  onClick={() => trackEvent("cta_clicked", { cta: `${data.product}_try`, location: "product_hero" })}
                >
                  {data.primaryCta}
                  <ArrowRight className="h-4 w-4" />
                </a>
              </Button>
              <Button
                asChild
                variant="outline"
                className="w-full rounded-xl border-white/20 bg-transparent text-white shadow-none hover:bg-white/5 hover:text-white sm:w-auto"
              >
                <a href={data.secondaryCta?.href ?? "/pricing"}>{data.secondaryCta?.label ?? t("productsTemplate.viewPricing")}</a>
              </Button>
            </div>
          </div>

          <div className="min-w-0 rounded-xl bg-[var(--product-hero-card)] p-4 text-white sm:p-5">
            <HeroPanelView panel={data.heroPanel} />
          </div>
        </section>

        {data.costs && data.costs.length > 0 ? (
          <section className="rounded-xl border border-[var(--color-product-card-border)] bg-card p-5 sm:p-6 lg:p-8">
            <div className="break-words text-[10px] font-bold uppercase tracking-[0.14em] text-muted-foreground sm:text-xs sm:tracking-[0.18em]">
              {data.costsLabel ?? "What it costs you today"}
            </div>
            <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {data.costs.map((card) => (
                <article
                  key={card.title}
                  className="rounded-xl border border-[var(--color-usecase-critical)]/20 bg-[var(--color-usecase-critical-soft)]/40 p-4 sm:p-5"
                >
                  <div className="text-base font-bold text-[var(--color-usecase-critical)] sm:text-lg">{card.title}</div>
                  <p className="mt-2 text-sm leading-6 text-muted-foreground">{card.text}</p>
                </article>
              ))}
            </div>
          </section>
        ) : null}

        {data.workflowSteps && data.workflowSteps.length > 0 ? (
          <section id="workflow" className="rounded-xl border border-[var(--color-product-card-border)] bg-card p-5 sm:p-6 lg:p-8">
            <div className="break-words text-[10px] font-bold uppercase tracking-[0.14em] text-muted-foreground sm:text-xs sm:tracking-[0.18em]">
              {data.workflowLabel ?? t("productsTemplate.howItWorks")}
            </div>
            <div className="mt-6 flex flex-wrap items-center gap-2 sm:gap-3">
              {data.workflowSteps.map((step, index) => (
                <div key={step} className="flex items-center gap-2 sm:gap-3">
                  <span className="inline-flex items-center gap-2 rounded-full bg-[var(--product-accent-soft)] px-3 py-1.5 text-xs font-semibold text-[var(--product-accent)] sm:px-4 sm:py-2 sm:text-sm">
                    <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[var(--product-accent)] text-[10px] font-bold text-white sm:h-6 sm:w-6 sm:text-xs">
                      {index + 1}
                    </span>
                    {step}
                  </span>
                  {index < data.workflowSteps!.length - 1 ? (
                    <span className="text-sm text-[var(--product-accent)] sm:text-base">→</span>
                  ) : null}
                </div>
              ))}
            </div>
          </section>
        ) : data.howItWorks && data.howItWorks.length > 0 ? (
          <section id="workflow" className="rounded-xl border border-[var(--color-product-card-border)] bg-card p-5 sm:p-6 lg:p-8">
            <div className="break-words text-[10px] font-bold uppercase tracking-[0.14em] text-muted-foreground sm:text-xs sm:tracking-[0.18em]">{t("productsTemplate.howItWorks")}</div>
            <div className="mt-6 grid gap-4 lg:grid-cols-[1fr_auto_1fr_auto_1fr] lg:items-center">
              {data.howItWorks.map((step, index) => (
                <StepCard key={step.title} accent={index + 1} step={step} showArrow={index < data.howItWorks!.length - 1} />
              ))}
            </div>
          </section>
        ) : null}

        {data.availability ? (
          <section className="grid gap-6 lg:grid-cols-2">
            <article className="rounded-xl border border-[var(--color-product-card-border)] bg-card p-5 sm:p-6 lg:p-8">
              <div className="inline-flex rounded-full bg-[var(--color-usecase-good-soft)] px-3 py-1 text-[10px] font-bold uppercase tracking-[0.12em] text-[var(--color-usecase-good)] sm:text-xs">
                Available today
              </div>
              <h2 className="mt-4 text-xl font-extrabold text-foreground sm:text-2xl">{data.availability.availableTitle}</h2>
              <ul className="mt-5 space-y-3">
                {data.availability.available.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <Check className="mt-0.5 h-5 w-5 shrink-0 text-[var(--color-usecase-good)]" />
                    <span className="text-sm leading-6 text-muted-foreground">{item}</span>
                  </li>
                ))}
              </ul>
            </article>
            <article className="rounded-xl border border-dashed border-[var(--color-product-card-border)] bg-card p-5 sm:p-6 lg:p-8">
              <div className="inline-flex rounded-full bg-[var(--product-accent-soft)] px-3 py-1 text-[10px] font-bold uppercase tracking-[0.12em] text-[var(--product-accent)] sm:text-xs">
                Coming soon
              </div>
              <h2 className="mt-4 text-xl font-extrabold text-foreground sm:text-2xl">{data.availability.comingTitle}</h2>
              <ul className="mt-5 space-y-3">
                {data.availability.coming.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-[var(--product-accent)]" />
                    <span className="text-sm leading-6 text-muted-foreground">{item}</span>
                  </li>
                ))}
              </ul>
            </article>
          </section>
        ) : null}

        {data.featureColumns ? (
          <section className="grid gap-6 lg:grid-cols-2">
            {data.featureColumns.map((column) => (
              <article key={column.title} className="rounded-xl border border-[var(--color-product-card-border)] bg-card p-5 sm:p-6 lg:p-8">
                <h2 className="text-xl font-extrabold text-foreground sm:text-2xl">{column.title}</h2>
                <div className="mt-6 space-y-4">
                  {column.items.map((item) => (
                    <div key={item.title} className="flex items-start gap-3 rounded-xl bg-[var(--product-accent-soft)]/35 px-3 py-3 sm:gap-4 sm:px-4 sm:py-4">
                      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[var(--product-accent-soft)] text-lg">
                        {item.icon}
                      </span>
                      <div className="min-w-0">
                        <div className="font-semibold text-foreground">{item.title}</div>
                        <div className="mt-1 text-sm leading-6 text-muted-foreground">{item.text}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </article>
            ))}
          </section>
        ) : null}

        {data.scenarios && data.scenarios.length > 0 ? (
          <section>
            <div className="break-words text-[10px] font-bold uppercase tracking-[0.14em] text-muted-foreground sm:text-xs sm:tracking-[0.18em]">{data.scenarioLabel}</div>
            <div className="mt-6 grid gap-6 lg:grid-cols-3">
              {data.scenarios.map((scenario) => (
                <article key={scenario.title} className="rounded-xl border border-[var(--color-product-card-border)] bg-card p-5 sm:p-6">
                  <div className="inline-flex max-w-full rounded-full bg-[var(--product-accent-soft)] px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.1em] text-[var(--product-accent)] sm:text-xs sm:tracking-[0.12em]">
                    <span className="truncate">{scenario.tag}</span>
                  </div>
                  <h3 className="mt-5 text-lg font-bold text-foreground sm:text-xl">{scenario.title}</h3>
                  <p className="mt-4 text-sm leading-7 text-muted-foreground">{scenario.text}</p>
                  <div className="mt-6 inline-flex items-center gap-2 rounded-full bg-[var(--color-usecase-good-soft)] px-3 py-2 text-sm font-medium text-[var(--color-usecase-good)]">
                    <Check className="h-4 w-4 shrink-0" />
                    <span>{scenario.result}</span>
                  </div>
                </article>
              ))}
            </div>
          </section>
        ) : null}

        <section className="flex flex-col gap-5 rounded-xl bg-[var(--product-cta-bg)] p-5 sm:px-6 sm:py-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="min-w-0">
            <h2 className="text-xl font-extrabold text-white sm:text-2xl">{data.ctaTitle}</h2>
            <p className="mt-2 text-sm leading-7 text-white/80">{data.ctaSubtitle}</p>
          </div>
          <Button asChild className="w-full rounded-xl bg-white text-[var(--product-cta-bg)] shadow-none hover:bg-white/95 lg:w-auto">
            <a
              href={data.ctaButton?.href ?? SIGNUP_URL}
              onClick={() => trackEvent("cta_clicked", { cta: `${data.product}_try`, location: "product_footer" })}
            >
              {data.ctaButton?.label ?? t("productsTemplate.viewPricing")}
              <ArrowRight className="h-4 w-4" />
            </a>
          </Button>
        </section>
      </div>
    </div>
  );
}

function StepCard({ accent, step, showArrow }: { accent: number; step: Step; showArrow: boolean }) {
  return (
    <>
      <div className="rounded-xl bg-[var(--product-accent-soft)]/35 px-4 py-5">
        <div className="text-sm font-bold text-[var(--product-accent)]">{accent}. {step.title}</div>
        <p className="mt-2 text-sm leading-7 text-muted-foreground">{step.text}</p>
      </div>
      {showArrow ? <div className="hidden text-center text-2xl font-light text-[var(--product-accent)] lg:block">→</div> : null}
    </>
  );
}

function HeroPanelView({ panel }: { panel: HeroPanel }) {
  if (panel.type === "pipeline") {
    return (
      <div>
        <div className="text-xs font-bold uppercase tracking-[0.18em] text-[var(--product-accent-text)]">{panel.label}</div>
        <div className="mt-5 space-y-3">
          {panel.rows.map((row) => (
            <div key={row.initials + row.title} className="flex items-center gap-3 rounded-xl border border-white/8 bg-white/3 px-4 py-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[var(--product-accent-soft)] text-sm font-bold text-[var(--product-accent)]">
                {row.initials}
              </div>
              <div className="min-w-0 flex-1">
                <div className="truncate text-sm font-semibold text-white">{row.title}</div>
                <div className="text-sm text-[var(--product-dark-muted)]">{row.city}</div>
              </div>
              <div className="rounded-full bg-[var(--product-accent-soft)] px-2.5 py-1 text-sm font-bold text-[var(--product-accent)]">{row.score}</div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (panel.type === "dashboard") {
    return (
      <div>
        <div className="text-xs font-bold uppercase tracking-[0.18em] text-[var(--product-accent-text)]">{panel.label}</div>
        <div className="mt-5 grid gap-3 sm:grid-cols-2">
          {panel.stats.map((stat) => (
            <div key={stat.label} className="rounded-xl border border-white/8 bg-white/3 px-4 py-4">
              <div className="text-3xl font-extrabold text-white">{stat.value}</div>
              <div className="mt-1 text-sm text-[var(--product-dark-muted)]">{stat.label}</div>
            </div>
          ))}
        </div>
        <div className="mt-4 space-y-3">
          {panel.policies.map((item) => (
            <HeroBadge key={item.text} item={item} />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="text-xs font-bold uppercase tracking-[0.18em] text-[var(--product-accent-text)]">{panel.label}</div>
      <div className="mt-5 flex items-center gap-4">
        <div className={cn("flex h-20 w-20 items-center justify-center rounded-full border-4 text-xl font-extrabold", scoreToneClass(panel.scoreTone))}>{panel.score}</div>
      </div>
      <div className="mt-5 space-y-3">
        {panel.items.map((item) => (
          <HeroBadge key={item.text} item={item} />
        ))}
      </div>
    </div>
  );
}

function HeroBadge({ item }: { item: HeroItem }) {
  return <div className={cn("rounded-lg px-3 py-2 text-sm font-medium", toneClass(item.tone))}>{item.text}</div>;
}

function toneClass(tone: HeroItem["tone"]) {
  switch (tone) {
    case "danger":
      return "bg-[var(--color-usecase-critical-soft)] text-[var(--color-usecase-critical)]";
    case "warning":
      return "bg-[var(--color-usecase-warning-soft)] text-[var(--color-usecase-warning)]";
    case "success":
      return "bg-[var(--color-usecase-good-soft)] text-[var(--color-usecase-good)]";
  }
}

function scoreToneClass(tone: HeroItem["tone"]) {
  switch (tone) {
    case "danger":
      return "border-[var(--color-usecase-critical)]/30 bg-[var(--color-usecase-critical-soft)] text-[var(--color-usecase-critical)]";
    case "warning":
      return "border-[var(--color-usecase-warning)]/30 bg-[var(--color-usecase-warning-soft)] text-[var(--color-usecase-warning)]";
    case "success":
      return "border-[var(--color-usecase-good)]/30 bg-[var(--color-usecase-good-soft)] text-[var(--color-usecase-good)]";
  }
}
