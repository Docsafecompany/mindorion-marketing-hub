import { useEffect, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import { ArrowRight, BriefcaseBusiness, Check, Cog, Shield, TrendingUp, Users } from "lucide-react";

import { SEOHead } from "@/components/SEOHead";
import { ProductLogo } from "@/components/ProductLogo";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { createStaticMeta } from "@/lib/site";
import { cn } from "@/lib/utils";

type ToolTone = "qualion" | "prospectiq" | "governance";
type RiskTone = "critical" | "warning" | "good";
type PersonaKey = "consultants" | "sales" | "rh" | "esn";

type ToolRow = { name: string; text: string };
type MockItem = string;
type MockCard = { title: string; badge: string; items: MockItem[] };
type Lead = { initials: string; role: string; city: string; score: string };
type Scenario = { tool: string; title: string; text: string; result: string };

type PersonaContent = {
  badge: string;
  title: string;
  text: string;
  tools: ToolRow[];
  mocks?: MockCard[];
  leads?: Lead[];
  pipelineLabel?: string;
  scenarios: Scenario[];
};

const personaMeta: Record<PersonaKey, {
  tabIcon: typeof Shield;
  badgeTone: ToolTone | "neutral";
  toolTones: ToolTone[];
  scenarioTones: ToolTone[];
  heroVariant: "document" | "pipeline";
  mockTones: { badge: RiskTone; items: RiskTone[] }[];
}> = {
  consultants: {
    tabIcon: BriefcaseBusiness,
    badgeTone: "qualion",
    toolTones: ["qualion", "prospectiq"],
    scenarioTones: ["qualion", "qualion", "prospectiq"],
    heroVariant: "document",
    mockTones: [
      { badge: "critical", items: ["critical", "critical", "warning"] },
      { badge: "good", items: ["good"] },
    ],
  },
  sales: {
    tabIcon: TrendingUp,
    badgeTone: "prospectiq",
    toolTones: ["qualion", "prospectiq"],
    scenarioTones: ["qualion", "prospectiq", "prospectiq"],
    heroVariant: "pipeline",
    mockTones: [],
  },
  rh: {
    tabIcon: Users,
    badgeTone: "governance",
    toolTones: ["qualion", "governance"],
    scenarioTones: ["qualion", "qualion", "governance"],
    heroVariant: "document",
    mockTones: [
      { badge: "critical", items: ["critical", "critical", "warning"] },
      { badge: "good", items: ["good"] },
    ],
  },
  esn: {
    tabIcon: Cog,
    badgeTone: "neutral",
    toolTones: ["qualion", "prospectiq", "governance"],
    scenarioTones: ["qualion", "prospectiq", "governance"],
    heroVariant: "document",
    mockTones: [
      { badge: "critical", items: ["critical", "critical", "warning"] },
      { badge: "good", items: ["good"] },
    ],
  },
};

const personaOrder: PersonaKey[] = ["consultants", "sales", "rh", "esn"];

export const Route = createFileRoute("/use-cases")({
  head: () =>
    createStaticMeta({
      title: "Cas d'usage | Consultants, Sales, RH, ESN | Mindorion",
      description:
        "Découvrez comment consultants, équipes sales, recruteurs et ESN utilisent Qualion, ProspectIQ et GovernanceIQ pour protéger leur réputation, prospecter et rester conformes.",
      path: "/use-cases",
    }),
  component: UseCasesPage,
});

function UseCasesPage() {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState<PersonaKey>("consultants");

  useEffect(() => {
    if (typeof window === "undefined") return;

    const hashToTab: Record<string, PersonaKey> = {
      "#consultants": "consultants",
      "#sales": "sales",
      "#rh": "rh",
      "#esn": "esn",
    };

    const applyHash = () => {
      const nextTab = hashToTab[window.location.hash] ?? "consultants";
      setActiveTab(nextTab);

      if (hashToTab[window.location.hash]) {
        window.requestAnimationFrame(() => {
          document.querySelector(".persona-tabs")?.scrollIntoView({ behavior: "smooth", block: "start" });
        });
      }
    };

    applyHash();
    window.addEventListener("hashchange", applyHash);

    return () => {
      window.removeEventListener("hashchange", applyHash);
    };
  }, []);

  const pageTitle = t("usecasesPage.title");
  const pageSubtitle = t("usecasesPage.subtitle");

  return (
    <div className="use-cases-page section-space">
      <SEOHead title={pageTitle} description={pageSubtitle} path="/use-cases" />

      <div className="section-shell">
        <section className="mx-auto max-w-4xl text-center">
          <div className="eyebrow">{t("usecasesPage.eyebrow")}</div>
          <h1 className="headline-balance mt-4 text-4xl font-extrabold text-foreground sm:text-5xl">
            {pageTitle}
          </h1>
          <p className="mx-auto mt-5 max-w-3xl text-lg leading-8 text-muted-foreground">
            {pageSubtitle}
          </p>
        </section>

        <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as PersonaKey)} className="mt-12">
          <TabsList className="persona-tabs mx-auto grid h-auto w-full max-w-5xl grid-cols-1 gap-3 rounded-none bg-transparent p-0 md:grid-cols-2 xl:grid-cols-4">
            {personaOrder.map((key) => {
              const Icon = personaMeta[key].tabIcon;
              return (
                <TabsTrigger
                  key={key}
                  value={key}
                  className="persona-tab h-auto rounded-xl border border-border bg-card px-5 py-4 text-left data-[state=active]:border-[var(--color-pricing-primary)] data-[state=active]:border-2 data-[state=active]:bg-[var(--color-pricing-primary-soft)] data-[state=active]:text-foreground data-[state=active]:shadow-none"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-muted text-foreground">
                      <Icon className="h-4.5 w-4.5" />
                    </div>
                    <div className="text-sm font-semibold leading-5">{t(`usecasesPage.tabs.${key}`)}</div>
                  </div>
                </TabsTrigger>
              );
            })}
          </TabsList>

          {personaOrder.map((key) => {
            const meta = personaMeta[key];
            const persona = t(`usecasesPage.personas.${key}`, { returnObjects: true }) as PersonaContent;
            return (
              <TabsContent key={key} value={key} className="persona-panel mt-8 space-y-8">
                <section className="grid gap-6 xl:grid-cols-[1.15fr_0.85fr]">
                  <div className="rounded-xl border border-border bg-card p-6 sm:p-8">
                    <Badge tone={meta.badgeTone}>{persona.badge}</Badge>
                    <h2 className="mt-5 text-3xl font-extrabold leading-tight text-foreground sm:text-4xl">{persona.title}</h2>
                    <p className="mt-5 text-base leading-8 text-muted-foreground">{persona.text}</p>
                    <div className="mt-8 grid gap-3 sm:grid-cols-2">
                      {persona.tools.map((tool, i) => (
                        <ToolCard key={tool.name + i} tool={tool} tone={meta.toolTones[i] ?? "qualion"} />
                      ))}
                    </div>
                  </div>

                  <div className="rounded-xl border border-border bg-card p-5 sm:p-6">
                    {meta.heroVariant === "pipeline" && persona.leads ? (
                      <PipelineCard leads={persona.leads} label={persona.pipelineLabel ?? ""} />
                    ) : (
                      <DocumentMock cards={persona.mocks ?? []} tones={meta.mockTones} />
                    )}
                  </div>
                </section>

                <section className="grid gap-6 xl:grid-cols-3">
                  {persona.scenarios.map((scenario, i) => (
                    <article key={scenario.title} className="rounded-xl border border-border bg-card p-6">
                      <div className="flex items-center gap-3">
                        <ToolPill tone={meta.scenarioTones[i] ?? "qualion"} label={scenario.tool} />
                      </div>
                      <h3 className="mt-5 text-xl font-bold text-foreground">{scenario.title}</h3>
                      <p className="mt-4 text-sm leading-7 text-muted-foreground">{scenario.text}</p>
                      <div className="mt-6 inline-flex items-center gap-2 rounded-full bg-[var(--color-usecase-page)] px-3 py-2 text-sm font-medium text-foreground">
                        <Check className="h-4 w-4 text-[var(--color-usecase-good)]" />
                        <span>{scenario.result}</span>
                      </div>
                    </article>
                  ))}
                </section>
              </TabsContent>
            );
          })}
        </Tabs>

        <section className="mt-12 flex flex-col gap-6 rounded-[10px] bg-[var(--color-pricing-primary)] px-6 py-6 sm:px-8 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h2 className="text-2xl font-extrabold text-white">{t("usecasesPage.ctaTitle")}</h2>
            <p className="mt-2 max-w-2xl text-base text-[var(--color-pricing-primary-soft)]">
              {t("usecasesPage.ctaText")}
            </p>
          </div>
          <Button asChild className="rounded-xl bg-white text-[var(--color-pricing-primary)] shadow-none hover:bg-white/95">
            <Link to="/pricing">
              {t("usecasesPage.ctaButton")}
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </section>
      </div>
    </div>
  );
}

function Badge({ tone, children }: { tone: ToolTone | "neutral"; children: string }) {
  const className =
    tone === "qualion"
      ? "bg-[var(--color-pricing-primary-soft)] text-[var(--color-pricing-primary)]"
      : tone === "prospectiq"
        ? "bg-[var(--color-pricing-success-soft)] text-[var(--color-pricing-success)]"
        : tone === "governance"
          ? "bg-[var(--color-usecase-warning-soft)] text-[var(--color-usecase-warning)]"
          : "bg-[var(--color-pricing-dash-soft)] text-foreground";

  return <div className={cn("inline-flex rounded-full px-3 py-1.5 text-sm font-semibold", className)}>{children}</div>;
}

function ToolCard({ tool, tone }: { tool: ToolRow; tone: ToolTone }) {
  return (
    <div className="rounded-xl bg-[var(--color-pricing-dash-soft)] px-4 py-4">
      <div className="flex items-start gap-3">
        <ToolIcon tone={tone} label={tool.name} />
        <div>
          <div className="text-sm font-bold text-foreground">{tool.name}</div>
          <div className="mt-1 text-sm leading-6 text-muted-foreground">{tool.text}</div>
        </div>
      </div>
    </div>
  );
}

function ToolPill({ tone, label }: { tone: ToolTone; label: string }) {
  return (
    <div className="inline-flex items-center gap-2 rounded-full bg-[var(--color-usecase-page)] px-3 py-2 text-sm font-semibold text-foreground">
      <ToolIcon tone={tone} label={label} />
      <span>{label}</span>
    </div>
  );
}

function ToolIcon({ tone, label }: { tone: ToolTone; label: string }) {
  const className =
    tone === "qualion"
      ? "bg-[var(--color-pricing-primary-soft)] text-[var(--color-pricing-primary)]"
      : tone === "prospectiq"
        ? "bg-[var(--color-pricing-success-soft)] text-[var(--color-pricing-success)]"
        : "bg-[var(--color-usecase-warning-soft)] text-[var(--color-usecase-warning)]";

  const product = label === "Qualion" ? "qualion" : label === "ProspectIQ" ? "prospectiq" : "governanceiq";

  return (
    <span className={cn("flex h-10 w-10 items-center justify-center rounded-xl overflow-hidden p-1", className)}>
      <ProductLogo product={product} />
    </span>
  );
}

function DocumentMock({ cards, tones }: { cards: MockCard[]; tones: { badge: RiskTone; items: RiskTone[] }[] }) {
  return (
    <div className="space-y-4 rounded-xl bg-[var(--color-pricing-dash-soft)] p-4">
      {cards.map((card, ci) => {
        const cardTones = tones[ci] ?? { badge: "good" as RiskTone, items: [] };
        return (
          <div key={card.title} className="rounded-xl border border-border bg-card p-4">
            <div className="flex items-center justify-between gap-3">
              <div className="text-sm font-bold text-foreground">{card.title}</div>
              <RiskBadge tone={cardTones.badge}>{card.badge}</RiskBadge>
            </div>
            <div className="mt-4 space-y-2.5">
              {card.items.map((item, i) => (
                <RiskItem key={item} text={item} tone={cardTones.items[i] ?? "good"} />
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}

function PipelineCard({ leads, label }: { leads: Lead[]; label: string }) {
  return (
    <div className="rounded-xl bg-[var(--color-pricing-dash-soft)] p-4">
      <div className="rounded-xl border border-border bg-card overflow-hidden">
        <div className="flex items-center gap-3 bg-[var(--color-pricing-success-soft)] px-4 py-3 text-sm font-bold text-[var(--color-pricing-success)]">
          <div className="h-9 w-24 overflow-hidden rounded-md bg-white/80 p-1">
            <ProductLogo product="prospectiq" />
          </div>
          <span>{label}</span>
        </div>
        <div className="space-y-3 p-4">
          {leads.map((lead) => (
            <div key={lead.initials + lead.role} className="flex items-center gap-3 rounded-xl border border-border bg-card px-3 py-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[var(--color-pricing-success-soft)] text-sm font-bold text-[var(--color-pricing-success)]">
                {lead.initials}
              </div>
              <div className="min-w-0 flex-1">
                <div className="truncate text-sm font-semibold text-foreground">{lead.role}</div>
                <div className="text-sm text-muted-foreground">{lead.city}</div>
              </div>
              <div className="rounded-full bg-[var(--color-pricing-success-soft)] px-2.5 py-1 text-sm font-bold text-[var(--color-pricing-success)]">
                {lead.score}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function RiskBadge({ tone, children }: { tone: RiskTone; children: string }) {
  return <span className={cn("rounded-full px-2.5 py-1 text-xs font-bold", riskToneClasses[tone])}>{children}</span>;
}

function RiskItem({ text, tone }: { text: string; tone: RiskTone }) {
  return <div className={cn("rounded-lg px-3 py-2 text-sm font-medium", riskToneClasses[tone])}>{text}</div>;
}

const riskToneClasses: Record<RiskTone, string> = {
  critical: "bg-[var(--color-usecase-critical-soft)] text-[var(--color-usecase-critical)]",
  warning: "bg-[var(--color-usecase-warning-soft)] text-[var(--color-usecase-warning)]",
  good: "bg-[var(--color-pricing-success-soft)] text-[var(--color-usecase-good)]",
};
