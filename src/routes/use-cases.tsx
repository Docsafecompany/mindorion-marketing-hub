import { useEffect, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import { ArrowRight, Check } from "lucide-react";

import { Button } from "@/components/ui/button";
import { createStaticMeta } from "@/lib/site";
import { cn } from "@/lib/utils";

type ModuleTone = "proposaliq" | "growthiq" | "ecosystem";
type RiskTone = "good" | "warning" | "critical";
type PersonaKey = "ceo" | "businessManager" | "headOfDelivery";

type ModuleRow = { name: string; tone: ModuleTone; text: string };
type RowItem = { tone: RiskTone; text: string };
type KpiItem = { value: string; label: string };
type QualityRow = { title: string; score: string; tone: RiskTone; items: RowItem[] };
type AccountRow = { dot: "green" | "amber" | "red"; name: string; badge: string; tone: RiskTone };

type CeoPanel = {
  kpiTitle: string;
  kpis: KpiItem[];
  listTitle: string;
  rows: QualityRow[];
};
type BMPanel = {
  accountsTitle: string;
  accounts: AccountRow[];
  alignmentTitle: string;
  alertTitle: string;
  alertText: string;
};
type HoDPanel = {
  validationTitle: string;
  validationCardTitle: string;
  validationBadge: string;
  validationItems: string[];
  flagsTitle: string;
  flagsCardTitle: string;
  flagsBadge: string;
  flagsItems: RowItem[];
};

type PersonaContent = {
  badge: string;
  title: string;
  quote: string;
  bullets: string[];
  modules: ModuleRow[];
  footnote: string;
  panel: CeoPanel | BMPanel | HoDPanel;
};

const personaOrder: PersonaKey[] = ["ceo", "businessManager", "headOfDelivery"];

export const Route = createFileRoute("/use-cases")({
  head: () =>
    createStaticMeta({
      title: "Who We Serve | Mindorion for Engineering Services & IT Consulting Firms",
      description:
        "Built for engineering services, ESNs and IT consulting firms. See exactly what ProposalIQ, GrowthIQ and the Mindorion ecosystem bring to CEOs, Business Managers and Heads of Delivery.",
      path: "/use-cases",
    }),
  component: UseCasesPage,
});

function UseCasesPage() {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState<PersonaKey>("ceo");

  useEffect(() => {
    if (typeof window === "undefined") return;
    const hashMap: Record<string, PersonaKey> = {
      "#ceo": "ceo",
      "#business-manager": "businessManager",
      "#head-of-delivery": "headOfDelivery",
    };
    const apply = () => {
      const next = hashMap[window.location.hash];
      if (next) setActiveTab(next);
    };
    apply();
    window.addEventListener("hashchange", apply);
    return () => window.removeEventListener("hashchange", apply);
  }, []);

  const persona = t(`usecasesPage.personas.${activeTab}`, { returnObjects: true }) as PersonaContent;

  return (
    <div className="use-cases-page section-space">
      <div className="section-shell">
        {/* Hero */}
        <section className="mx-auto max-w-4xl text-center">
          <div className="eyebrow">{t("usecasesPage.eyebrow")}</div>
          <h1 className="headline-balance mt-4 text-4xl font-extrabold text-foreground sm:text-5xl">
            {t("usecasesPage.title")}
          </h1>
          <p className="mx-auto mt-5 max-w-3xl text-lg leading-8 text-muted-foreground">
            {t("usecasesPage.subtitle")}
          </p>
        </section>

        {/* Persona switcher — pill style */}
        <div className="mx-auto mt-10 flex max-w-3xl flex-wrap items-center justify-center gap-3">
          {personaOrder.map((key) => {
            const active = activeTab === key;
            return (
              <button
                key={key}
                type="button"
                onClick={() => setActiveTab(key)}
                className={cn(
                  "rounded-full border px-5 py-2.5 text-sm font-semibold transition",
                  active
                    ? "border-[var(--color-pricing-primary)] bg-[var(--color-pricing-primary)] text-white shadow-sm"
                    : "border-border bg-card text-foreground hover:bg-muted"
                )}
                aria-pressed={active}
              >
                {t(`usecasesPage.tabs.${key}`)}
              </button>
            );
          })}
        </div>

        {/* Persona body */}
        <section className="mt-10 grid gap-6 xl:grid-cols-[1.15fr_0.85fr]">
          {/* Left — copy */}
          <div className="rounded-2xl border border-border bg-card p-6 sm:p-8">
            <span className="inline-flex rounded-full bg-[var(--color-pricing-primary-soft)] px-3 py-1 text-xs font-bold tracking-wide text-[var(--color-pricing-primary)]">
              {persona.badge}
            </span>
            <h2 className="mt-5 text-3xl font-extrabold leading-tight text-foreground sm:text-4xl">
              {persona.title}
            </h2>
            <blockquote className="mt-5 border-l-2 border-border pl-4 text-sm italic leading-7 text-muted-foreground">
              "{persona.quote}"
            </blockquote>

            <ul className="mt-6 space-y-3">
              {persona.bullets.map((b) => (
                <li key={b} className="flex gap-3 text-sm leading-7 text-foreground">
                  <span className="mt-2 inline-block h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[var(--color-pricing-success)]" />
                  <span>{b}</span>
                </li>
              ))}
            </ul>

            <div className="mt-8">
              <div className="text-xs font-bold uppercase tracking-wide text-muted-foreground">
                {t("usecasesPage.modulesLabel")}
              </div>
              <div className="mt-3 space-y-2.5">
                {persona.modules.map((m) => (
                  <ModuleCard key={m.name} module={m} />
                ))}
              </div>
            </div>

            <div className="mt-8 rounded-xl border-l-4 border-[var(--color-pricing-primary)] bg-[var(--color-usecase-page)] px-5 py-4 text-sm leading-6 text-foreground">
              {persona.footnote}
            </div>
          </div>

          {/* Right — panel */}
          <div className="rounded-2xl border border-border bg-[var(--color-pricing-dash-soft)] p-5 sm:p-6">
            {activeTab === "ceo" && <CeoPanelView panel={persona.panel as CeoPanel} />}
            {activeTab === "businessManager" && <BMPanelView panel={persona.panel as BMPanel} />}
            {activeTab === "headOfDelivery" && <HoDPanelView panel={persona.panel as HoDPanel} />}
          </div>
        </section>

        {/* Start with cards */}
        <section className="mt-12 grid gap-4 sm:grid-cols-2">
          <StartCard
            title={t("usecasesPage.startWith.proposaliq.title")}
            text={t("usecasesPage.startWith.proposaliq.text")}
            cta={t("usecasesPage.startWith.proposaliq.cta")}
            to="/products/proposaliq"
          />
          <StartCard
            title={t("usecasesPage.startWith.growthiq.title")}
            text={t("usecasesPage.startWith.growthiq.text")}
            cta={t("usecasesPage.startWith.growthiq.cta")}
            to="/products/growthiq"
          />
        </section>
      </div>
    </div>
  );
}

const moduleToneClasses: Record<ModuleTone, string> = {
  proposaliq: "border-[var(--color-pricing-success)]/30 bg-[var(--color-pricing-success-soft)] text-[var(--color-pricing-success)]",
  growthiq: "border-[var(--color-pricing-primary)]/30 bg-[var(--color-pricing-primary-soft)] text-[var(--color-pricing-primary)]",
  ecosystem: "border-[var(--color-usecase-warning)]/30 bg-[var(--color-usecase-warning-soft)] text-[var(--color-usecase-warning)]",
};

function ModuleCard({ module }: { module: ModuleRow }) {
  return (
    <div className={cn("rounded-xl border px-4 py-3", moduleToneClasses[module.tone])}>
      <div className="text-sm font-bold">{module.name}</div>
      <div className="mt-0.5 text-sm leading-6 opacity-90">{module.text}</div>
    </div>
  );
}

const riskToneClasses: Record<RiskTone, string> = {
  good: "bg-[var(--color-pricing-success-soft)] text-[var(--color-usecase-good)]",
  warning: "bg-[var(--color-usecase-warning-soft)] text-[var(--color-usecase-warning)]",
  critical: "bg-[var(--color-usecase-critical-soft)] text-[var(--color-usecase-critical)]",
};

function PanelHeader({ children }: { children: string }) {
  return <div className="text-xs font-bold uppercase tracking-wide text-muted-foreground">{children}</div>;
}

function CeoPanelView({ panel }: { panel: CeoPanel }) {
  return (
    <div className="space-y-5">
      <div>
        <PanelHeader>{panel.kpiTitle}</PanelHeader>
        <div className="mt-3 grid grid-cols-2 gap-3">
          {panel.kpis.map((k) => (
            <div key={k.label} className="rounded-xl border border-border bg-card px-4 py-3">
              <div className="text-2xl font-extrabold text-foreground">{k.value}</div>
              <div className="mt-1 text-xs text-muted-foreground">{k.label}</div>
            </div>
          ))}
        </div>
      </div>
      <div>
        <PanelHeader>{panel.listTitle}</PanelHeader>
        <div className="mt-3 space-y-3">
          {panel.rows.map((row) => (
            <div key={row.title} className="rounded-xl border border-border bg-card p-4">
              <div className="flex items-center justify-between gap-3">
                <div className="text-sm font-semibold text-foreground">{row.title}</div>
                <span className={cn("rounded-full px-2.5 py-1 text-xs font-bold", riskToneClasses[row.tone])}>
                  {row.score}
                </span>
              </div>
              <div className="mt-3 space-y-2">
                {row.items.map((it) => (
                  <div key={it.text} className={cn("rounded-lg px-3 py-2 text-xs font-medium", riskToneClasses[it.tone])}>
                    {it.text}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

const dotClasses = {
  green: "bg-[var(--color-pricing-success)]",
  amber: "bg-[var(--color-usecase-warning)]",
  red: "bg-[var(--color-usecase-critical)]",
};

function BMPanelView({ panel }: { panel: BMPanel }) {
  return (
    <div className="space-y-5">
      <div>
        <PanelHeader>{panel.accountsTitle}</PanelHeader>
        <div className="mt-3 rounded-xl border border-border bg-card divide-y divide-border">
          {panel.accounts.map((a) => (
            <div key={a.name} className="flex items-center justify-between gap-3 px-4 py-3">
              <div className="flex items-center gap-3">
                <span className={cn("h-2.5 w-2.5 rounded-full", dotClasses[a.dot])} />
                <span className="text-sm font-medium text-foreground">{a.name}</span>
              </div>
              <span className={cn("text-xs font-semibold", a.tone === "good" ? "text-foreground" : a.tone === "warning" ? "text-[var(--color-usecase-warning)]" : "text-[var(--color-usecase-critical)]")}>
                {a.badge}
              </span>
            </div>
          ))}
        </div>
      </div>
      <div>
        <PanelHeader>{panel.alignmentTitle}</PanelHeader>
        <div className="mt-3 rounded-xl border border-border bg-card p-4">
          <div className="border-l-2 border-[var(--color-pricing-primary)] pl-3">
            <div className="text-sm font-semibold text-foreground">{panel.alertTitle}</div>
            <div className="mt-2 rounded-lg bg-[var(--color-usecase-warning-soft)] px-3 py-2 text-xs font-medium text-[var(--color-usecase-warning)]">
              {panel.alertText}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function HoDPanelView({ panel }: { panel: HoDPanel }) {
  return (
    <div className="space-y-5">
      <div>
        <PanelHeader>{panel.validationTitle}</PanelHeader>
        <div className="mt-3 rounded-xl border border-border bg-card p-4">
          <div className="flex items-center justify-between gap-3">
            <div className="text-sm font-semibold text-foreground">{panel.validationCardTitle}</div>
            <span className={cn("rounded-full px-2.5 py-1 text-xs font-bold", riskToneClasses.good)}>{panel.validationBadge}</span>
          </div>
          <div className="mt-3 space-y-2">
            {panel.validationItems.map((it) => (
              <div key={it} className={cn("rounded-lg px-3 py-2 text-xs font-medium", riskToneClasses.good)}>
                {it}
              </div>
            ))}
          </div>
        </div>
      </div>
      <div>
        <PanelHeader>{panel.flagsTitle}</PanelHeader>
        <div className="mt-3 rounded-xl border border-border bg-card p-4">
          <div className="flex items-center justify-between gap-3">
            <div className="text-sm font-semibold text-foreground">{panel.flagsCardTitle}</div>
            <span className={cn("rounded-full px-2.5 py-1 text-xs font-bold", riskToneClasses.warning)}>{panel.flagsBadge}</span>
          </div>
          <div className="mt-3 space-y-2">
            {panel.flagsItems.map((it) => (
              <div key={it.text} className={cn("rounded-lg px-3 py-2 text-xs font-medium", riskToneClasses[it.tone])}>
                {it.text}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function StartCard({ title, text, cta, to }: { title: string; text: string; cta: string; to: string }) {
  return (
    <Link
      to={to}
      className="group rounded-2xl border border-border bg-card p-6 transition hover:border-[var(--color-pricing-primary)] hover:shadow-sm"
    >
      <div className="text-lg font-bold text-foreground">{title}</div>
      <div className="mt-2 text-sm text-muted-foreground">{text}</div>
      <div className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-[var(--color-pricing-primary)]">
        <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
        {cta}
      </div>
    </Link>
  );
}

// keep Check import used (badge tick fallback)
void Check;
void Button;
