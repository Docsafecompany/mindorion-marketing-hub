import type { CSSProperties } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowRight, Check } from "lucide-react";

import { Button } from "@/components/ui/button";
import { ProductLogo } from "@/components/ProductLogo";
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

export type ProductPageData = {
  product: "qualion" | "prospectiq" | "governanceiq";
  eyebrow: string;
  title: string;
  subtitle: string;
  theme: Theme;
  heroPanel: HeroPanel;
  howItWorks: Step[];
  featureColumns: [FeatureColumn, FeatureColumn];
  scenarioLabel: string;
  scenarios: Scenario[];
  ctaTitle: string;
  ctaSubtitle: string;
  primaryCta: string;
};

export function ProductPageTemplate({ data }: { data: ProductPageData }) {
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
    <div className="bg-[var(--color-product-page)] [font-family:var(--font-pricing)]" style={style}>
      <div className="section-shell section-space space-y-8">
        <section className="grid gap-6 rounded-xl bg-[var(--product-hero-bg)] p-6 lg:grid-cols-[1.38fr_1fr] lg:p-8">
          <div>
            <div className="mb-6 h-16 w-44">
              <ProductLogo product={data.product} className="object-left" />
            </div>
            <div className="text-xs font-bold uppercase tracking-[0.18em] text-[var(--product-accent-text)]">{data.eyebrow}</div>
            <h1 className="headline-balance mt-5 text-4xl font-extrabold leading-tight text-white sm:text-5xl">
              {data.title}
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-8 text-[var(--product-dark-muted)]">{data.subtitle}</p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button asChild className="rounded-xl bg-[var(--product-accent-strong)] text-white shadow-none hover:bg-[var(--product-accent-strong)]/95">
                <Link to="/pricing">
                  {data.primaryCta}
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                className="rounded-xl border-white/12 bg-transparent text-white shadow-none hover:bg-white/5 hover:text-white"
              >
                <Link to="/pricing">Voir les tarifs</Link>
              </Button>
            </div>
          </div>

          <div className="rounded-xl bg-[var(--product-hero-card)] p-5 text-white">
            <HeroPanelView panel={data.heroPanel} />
          </div>
        </section>

        <section className="rounded-xl border border-[var(--color-product-card-border)] bg-card p-6 sm:p-8">
          <div className="text-xs font-bold uppercase tracking-[0.18em] text-muted-foreground">COMMENT ÇA MARCHE</div>
          <div className="mt-6 grid gap-4 lg:grid-cols-[1fr_auto_1fr_auto_1fr] lg:items-center">
            {data.howItWorks.map((step, index) => (
              <StepCard key={step.title} accent={index + 1} step={step} showArrow={index < data.howItWorks.length - 1} />
            ))}
          </div>
        </section>

        <section className="grid gap-6 lg:grid-cols-2">
          {data.featureColumns.map((column) => (
            <article key={column.title} className="rounded-xl border border-[var(--color-product-card-border)] bg-card p-6 sm:p-8">
              <h2 className="text-2xl font-extrabold text-foreground">{column.title}</h2>
              <div className="mt-6 space-y-4">
                {column.items.map((item) => (
                  <div key={item.title} className="flex items-start gap-4 rounded-xl bg-[var(--product-accent-soft)]/35 px-4 py-4">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[var(--product-accent-soft)] text-lg">
                      {item.icon}
                    </span>
                    <div>
                      <div className="font-semibold text-foreground">{item.title}</div>
                      <div className="mt-1 text-sm leading-6 text-muted-foreground">{item.text}</div>
                    </div>
                  </div>
                ))}
              </div>
            </article>
          ))}
        </section>

        <section>
          <div className="text-xs font-bold uppercase tracking-[0.18em] text-muted-foreground">{data.scenarioLabel}</div>
          <div className="mt-6 grid gap-6 lg:grid-cols-3">
            {data.scenarios.map((scenario) => (
              <article key={scenario.title} className="rounded-xl border border-[var(--color-product-card-border)] bg-card p-6">
                <div className="inline-flex rounded-full bg-[var(--product-accent-soft)] px-3 py-1.5 text-xs font-bold uppercase tracking-[0.12em] text-[var(--product-accent)]">
                  {scenario.tag}
                </div>
                <h3 className="mt-5 text-xl font-bold text-foreground">{scenario.title}</h3>
                <p className="mt-4 text-sm leading-7 text-muted-foreground">{scenario.text}</p>
                <div className="mt-6 inline-flex items-center gap-2 rounded-full bg-[var(--color-usecase-good-soft)] px-3 py-2 text-sm font-medium text-[var(--color-usecase-good)]">
                  <Check className="h-4 w-4" />
                  <span>{scenario.result}</span>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="flex flex-col gap-5 rounded-xl bg-[var(--product-cta-bg)] px-6 py-6 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h2 className="text-2xl font-extrabold text-white">{data.ctaTitle}</h2>
            <p className="mt-2 text-sm leading-7 text-white/78">{data.ctaSubtitle}</p>
          </div>
          <Button asChild className="rounded-xl bg-white text-[var(--product-cta-bg)] shadow-none hover:bg-white/95">
            <Link to="/pricing">
              Voir les tarifs
              <ArrowRight className="h-4 w-4" />
            </Link>
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
