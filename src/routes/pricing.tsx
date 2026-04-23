import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Check, FileText, Minus, Shield, Target } from "lucide-react";

import { ProductLogo } from "@/components/ProductLogo";
import { SEOHead } from "@/components/SEOHead";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { createStaticMeta } from "@/lib/site";
import { cn } from "@/lib/utils";

type BillingMode = "monthly" | "annual";
type PlanColumn = "starter" | "pro" | "business" | "enterprise";
type PlanSection = {
  title: string;
  items: Array<{ label: string; included: boolean }>;
};
type Plan = {
  label: string;
  name: string;
  description: string;
  monthlyPrice?: string;
  annualPrice?: string;
  annualNote?: string;
  cta: string;
  href: string;
  featured?: boolean;
  enterprise?: boolean;
  fixedNote?: string;
  suiteCards?: Array<{ icon: string; title: string; description: string }>;
  sections?: PlanSection[];
};
type ComparisonSection = {
  title: string;
  rows: Array<{ feature: string; values: Record<PlanColumn, string> }>;
};
type ProductConfig = {
  key: "qualion" | "prospectiq";
  title: string;
  subtitle: string;
  icon: typeof Shield;
  plans: Plan[];
  comparison: ComparisonSection[];
};

const enterprisePlan: Plan = {
  label: "SUITE COMPLÈTE",
  name: "Enterprise",
  description: "Suite complète — CRM, gouvernance et sécurité avancée inclus.",
  cta: "Demander une démo",
  href: "mailto:contact@mindorion.com",
  enterprise: true,
  fixedNote: "Contrat annuel · Onboarding inclus",
  suiteCards: [
    { icon: "🛡", title: "Qualion Business", description: "Word, PDF, PPT, Excel · illimité" },
    { icon: "🎯", title: "ProspectIQ Business", description: "Outreach complet" },
    { icon: "📋", title: "GovernanceIQ", description: "Gouvernance & conformité" },
  ],
  sections: [
    {
      title: "UNIQUEMENT ENTERPRISE",
      items: [
        { label: "Intégrations CRM (Salesforce, HubSpot)", included: true },
        { label: "SSO & sécurité avancée", included: true },
        { label: "CSM dédié", included: true },
        { label: "SLA garanti", included: true },
        { label: "Onboarding inclus", included: true },
      ],
    },
  ],
};

const PRODUCTS: ProductConfig[] = [
  {
    key: "qualion",
    title: "Qualion",
    subtitle: "Réputation documentaire",
    icon: Shield,
    plans: [
      {
        label: "POINT D'ENTRÉE",
        name: "Starter",
        description: "Pour les indépendants qui démarrent.",
        monthlyPrice: "19€/user/mois",
        annualPrice: "228€/user/an",
        annualNote: "soit 15€/mois · −20%",
        cta: "Choisir Starter",
        href: "/pricing",
        sections: [
          {
            title: "VOLUME",
            items: [
              { label: "30 analyses / mois", included: true },
              { label: "30 téléchargements / mois", included: true },
            ],
          },
          {
            title: "DOCUMENTS",
            items: [{ label: "Word, PPT, Excel", included: true }],
          },
          {
            title: "DÉTECTIONS",
            items: [
              { label: "Métadonnées & commentaires", included: true },
              { label: "Placeholders oubliés", included: true },
              { label: "Données personnelles", included: true },
              { label: "Score qualité /100", included: true },
              { label: "Fautes d'orthographe", included: false },
              { label: "Ton IA", included: false },
            ],
          },
        ],
      },
      {
        label: "ÉQUIPES SALES",
        name: "Pro",
        description: "Pour les consultants et équipes actifs.",
        monthlyPrice: "39€/user/mois",
        annualPrice: "468€/user/an",
        annualNote: "soit 31€/mois · −20%",
        cta: "Choisir Pro",
        href: "/pricing",
        featured: true,
        sections: [
          {
            title: "VOLUME",
            items: [
              { label: "100 analyses / mois", included: true },
              { label: "100 téléchargements / mois", included: true },
            ],
          },
          {
            title: "DOCUMENTS",
            items: [{ label: "Word, PPT, Excel", included: true }],
          },
          {
            title: "TOUT STARTER +",
            items: [
              { label: "Fautes d'orthographe", included: true },
              { label: "Ton IA détectable", included: true },
              { label: "Tableaux de bord partagés", included: true },
              { label: "Rapport PDF exportable", included: true },
            ],
          },
        ],
      },
      {
        label: "AGENCE · CABINET",
        name: "Business",
        description: "Pour les équipes structurées.",
        monthlyPrice: "59€/user/mois",
        annualPrice: "708€/user/an",
        annualNote: "soit 47€/mois · −20%",
        cta: "Choisir Business",
        href: "/pricing",
        sections: [
          {
            title: "VOLUME",
            items: [
              { label: "Analyses illimitées", included: true },
              { label: "Téléchargements illimités", included: true },
            ],
          },
          {
            title: "DOCUMENTS",
            items: [{ label: "Word, PDF, PPT, Excel", included: true }],
          },
          {
            title: "TOUT PRO +",
            items: [
              { label: "API + webhooks", included: true },
              { label: "Stockage illimité", included: true },
              { label: "Accès multi-utilisateurs", included: true },
              { label: "Support prioritaire", included: true },
            ],
          },
        ],
      },
      enterprisePlan,
    ],
    comparison: [
      {
        title: "VOLUME",
        rows: [{ feature: "Analyses / mois", values: { starter: "30", pro: "100", business: "Illimité", enterprise: "Illimité" } }],
      },
      {
        title: "DOCUMENTS SUPPORTÉS",
        rows: [
          { feature: "Word, PPT, Excel", values: { starter: "✓", pro: "✓", business: "✓", enterprise: "✓" } },
          { feature: "PDF", values: { starter: "—", pro: "—", business: "✓", enterprise: "✓" } },
        ],
      },
      {
        title: "DÉTECTIONS",
        rows: [
          { feature: "Métadonnées & commentaires", values: { starter: "✓", pro: "✓", business: "✓", enterprise: "✓" } },
          { feature: "Fautes d'orthographe", values: { starter: "—", pro: "✓", business: "✓", enterprise: "✓" } },
          { feature: "Ton IA détectable", values: { starter: "—", pro: "✓", business: "✓", enterprise: "✓" } },
        ],
      },
      {
        title: "INTÉGRATIONS & SÉCURITÉ",
        rows: [
          { feature: "API + webhooks", values: { starter: "—", pro: "—", business: "✓", enterprise: "✓" } },
          { feature: "Intégrations CRM", values: { starter: "—", pro: "—", business: "—", enterprise: "✓" } },
          { feature: "SSO & sécurité avancée", values: { starter: "—", pro: "—", business: "—", enterprise: "✓" } },
          { feature: "GovernanceIQ inclus", values: { starter: "—", pro: "—", business: "—", enterprise: "✓" } },
        ],
      },
    ],
  },
  {
    key: "prospectiq",
    title: "ProspectIQ",
    subtitle: "Outreach B2B intelligent",
    icon: Target,
    plans: [
      {
        label: "POINT D'ENTRÉE",
        name: "Starter",
        description: "Pour les commerciaux indépendants.",
        monthlyPrice: "49€/user/mois",
        annualPrice: "588€/user/an",
        annualNote: "soit 39€/mois · −20%",
        cta: "Choisir Starter",
        href: "/pricing",
        sections: [
          {
            title: "INCLUS",
            items: [
              { label: "Prospects illimités", included: true },
              { label: "Qualification IA", included: true },
              { label: "Intelligence Flags", included: true },
              { label: "Séquences simples", included: true },
              { label: "Strategy Hub", included: false },
              { label: "Meeting Intelligence", included: false },
              { label: "Intégrations CRM", included: false },
            ],
          },
        ],
      },
      {
        label: "ÉQUIPES COMMERCIALES",
        name: "Pro",
        description: "Pour les équipes commerciales en croissance.",
        monthlyPrice: "69€/user/mois",
        annualPrice: "828€/user/an",
        annualNote: "soit 55€/mois · −20%",
        cta: "Choisir Pro",
        href: "/pricing",
        featured: true,
        sections: [
          {
            title: "TOUT STARTER +",
            items: [
              { label: "Strategy Hub", included: true },
              { label: "Meeting Intelligence", included: true },
              { label: "Séquences multi-canal", included: true },
              { label: "Tableaux de bord équipe", included: true },
              { label: "Rapports de performance", included: true },
              { label: "Intégrations CRM", included: false },
            ],
          },
        ],
      },
      {
        label: "AGENCE · GRAND COMPTE",
        name: "Business",
        description: "Pour les équipes revenue structurées.",
        monthlyPrice: "89€/user/mois",
        annualPrice: "1 068€/user/an",
        annualNote: "soit 71€/mois · −20%",
        cta: "Choisir Business",
        href: "/pricing",
        sections: [
          {
            title: "TOUT PRO +",
            items: [
              { label: "Workflows personnalisés", included: true },
              { label: "API + webhooks", included: true },
              { label: "Accès multi-équipes", included: true },
              { label: "Support prioritaire dédié", included: true },
              { label: "Intégrations CRM", included: false },
            ],
          },
        ],
      },
      enterprisePlan,
    ],
    comparison: [
      {
        title: "PROSPECTION",
        rows: [
          { feature: "Prospects qualifiés", values: { starter: "Illimité", pro: "Illimité", business: "Illimité", enterprise: "Illimité" } },
          { feature: "Strategy Hub", values: { starter: "—", pro: "✓", business: "✓", enterprise: "✓" } },
          { feature: "Meeting Intelligence", values: { starter: "—", pro: "✓", business: "✓", enterprise: "✓" } },
        ],
      },
      {
        title: "OUTREACH",
        rows: [
          { feature: "Séquences simples", values: { starter: "✓", pro: "✓", business: "✓", enterprise: "✓" } },
          { feature: "Séquences multi-canal", values: { starter: "—", pro: "✓", business: "✓", enterprise: "✓" } },
        ],
      },
      {
        title: "INTÉGRATIONS & SÉCURITÉ",
        rows: [
          { feature: "API + webhooks", values: { starter: "—", pro: "—", business: "✓", enterprise: "✓" } },
          { feature: "Intégrations CRM", values: { starter: "—", pro: "—", business: "—", enterprise: "✓" } },
          { feature: "SSO & sécurité avancée", values: { starter: "—", pro: "—", business: "—", enterprise: "✓" } },
          { feature: "GovernanceIQ inclus", values: { starter: "—", pro: "—", business: "—", enterprise: "✓" } },
        ],
      },
    ],
  },
];

export const Route = createFileRoute("/pricing")({
  head: () =>
    createStaticMeta({
      title: "Tarifs | Qualion & ProspectIQ | Mindorion",
      description:
        "Découvrez les plans Mindorion — Qualion et ProspectIQ. Starter, Pro, Business et Enterprise. Un prix par utilisateur, zéro frais cachés.",
      path: "/pricing",
    }),
  component: PricingPage,
});

function PricingPage() {
  const [billing, setBilling] = useState<BillingMode>("monthly");

  return (
    <div className="pricing-page section-shell section-space">
      <SEOHead
        title="Tarifs | Qualion & ProspectIQ | Mindorion"
        description="Découvrez les plans Mindorion — Qualion et ProspectIQ. Starter, Pro, Business et Enterprise. Un prix par utilisateur, zéro frais cachés."
        path="/pricing"
      />

      <section className="mx-auto max-w-6xl text-center">
        <div className="mx-auto max-w-4xl space-y-4">
          <h1 className="headline-balance text-4xl font-extrabold text-foreground sm:text-5xl">
            Un prix par utilisateur. Zéro frais cachés.
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
            Commencez avec un outil. Passez à Enterprise pour la suite complète avec intégrations CRM.
          </p>
        </div>

        <div className="mt-8 flex flex-col items-center gap-4">
          <div className="inline-flex rounded-xl border border-border bg-card p-1">
            <button
              className={cn(
                "rounded-[10px] px-5 py-2.5 text-sm font-semibold transition-colors",
                billing === "monthly" ? "bg-[var(--color-pricing-primary)] text-white" : "text-muted-foreground",
              )}
              onClick={() => setBilling("monthly")}
              type="button"
            >
              Mensuel
            </button>
            <button
              className={cn(
                "rounded-[10px] px-5 py-2.5 text-sm font-semibold transition-colors",
                billing === "annual" ? "bg-[var(--color-pricing-primary)] text-white" : "text-muted-foreground",
              )}
              onClick={() => setBilling("annual")}
              type="button"
            >
              Annuel
            </button>
          </div>
          <span className="inline-flex w-fit rounded-full bg-[var(--color-pricing-success-soft)] px-3 py-1 text-sm font-semibold text-[var(--color-pricing-success)]">
            −20% sur l'annuel
          </span>
        </div>
      </section>

      <Tabs defaultValue="qualion" className="mt-12">
        <TabsList className="mx-auto grid h-auto w-full max-w-3xl grid-cols-1 gap-4 rounded-none bg-transparent p-0 md:grid-cols-2">
          {PRODUCTS.map((product) => {
            return (
              <TabsTrigger
                key={product.key}
                value={product.key}
                className="h-auto rounded-xl border border-border bg-card px-5 py-4 text-left data-[state=active]:border-[var(--color-pricing-primary)] data-[state=active]:border-2 data-[state=active]:bg-card data-[state=active]:shadow-none"
              >
                <div className="flex w-full items-center gap-4">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white p-1.5">
                    <ProductLogo product={product.key} />
                  </div>
                  <div>
                    <div className="text-base font-bold text-foreground">{product.title}</div>
                    <div className="text-sm text-muted-foreground">{product.subtitle}</div>
                  </div>
                </div>
              </TabsTrigger>
            );
          })}
        </TabsList>

        {PRODUCTS.map((product) => (
          <TabsContent key={product.key} value={product.key} className="mt-8 space-y-10">
            <div className="grid gap-4 lg:grid-cols-4 xl:gap-6">
              {product.plans.map((plan) => (
                <PlanCard key={`${product.key}-${plan.name}`} billing={billing} plan={plan} />
              ))}
            </div>
            <ComparisonTable product={product} />
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}

function PlanCard({ billing, plan }: { billing: BillingMode; plan: Plan }) {
  const isEnterprise = Boolean(plan.enterprise);
  const isFeatured = Boolean(plan.featured);

  return (
    <article
      className={cn(
        "flex min-h-full flex-col rounded-xl border bg-card p-6",
        isEnterprise && "border-[var(--color-pricing-enterprise-border)] bg-[var(--color-pricing-enterprise-soft)]",
        isFeatured && "border-2 border-[var(--color-pricing-primary)]",
        !isEnterprise && !isFeatured && "border-border",
      )}
    >
      {isFeatured ? (
        <div className="mb-4 inline-flex w-fit rounded-full bg-[var(--color-pricing-primary-soft)] px-3 py-1 text-xs font-semibold text-[var(--color-pricing-primary)]">
          Le plus populaire
        </div>
      ) : null}

      <div className={cn("text-xs font-bold uppercase tracking-[0.18em] text-muted-foreground", isEnterprise && "text-[var(--color-pricing-primary)]")}>{plan.label}</div>
      <div className={cn("mt-3 text-2xl font-extrabold text-foreground", isEnterprise && "text-[var(--color-pricing-enterprise)]")}>{plan.name}</div>
      <p className={cn("mt-2 min-h-12 text-sm leading-6 text-muted-foreground", isEnterprise && "text-[var(--color-pricing-enterprise)]")}>{plan.description}</p>

      <div className="mt-6">
        {isEnterprise ? (
          <>
            <div className="text-3xl font-extrabold text-[var(--color-pricing-enterprise)]">Sur devis</div>
            <div className="mt-2 text-sm font-medium text-[var(--color-pricing-enterprise)]">{plan.fixedNote}</div>
          </>
        ) : billing === "monthly" ? (
          <div className="text-3xl font-extrabold text-foreground">{plan.monthlyPrice}</div>
        ) : (
          <>
            <div className="text-3xl font-extrabold text-foreground">{plan.annualPrice}</div>
            <div className="mt-2 text-sm font-semibold text-[var(--color-pricing-success)]">{plan.annualNote}</div>
          </>
        )}
      </div>

      <div className="mt-6">
        {isEnterprise ? (
          <a href={plan.href}>
            <Button className="w-full rounded-xl bg-[var(--color-pricing-primary)] text-white shadow-none hover:bg-[var(--color-pricing-primary)]/95">
              {plan.cta}
              <ArrowRight className="h-4 w-4" />
            </Button>
          </a>
        ) : (
          <Button
            asChild
            className={cn(
              "w-full rounded-xl shadow-none",
              isFeatured
                ? "bg-[var(--color-pricing-primary)] text-white hover:bg-[var(--color-pricing-primary)]/95"
                : "border border-transparent bg-[var(--color-pricing-dash-soft)] text-foreground hover:bg-[var(--color-pricing-dash-soft)]/80",
            )}
          >
            <Link to={plan.href}>
              {plan.cta}
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        )}
      </div>

      {isEnterprise && plan.suiteCards ? (
        <>
          <div className="mt-8">
            <div className="text-xs font-bold uppercase tracking-[0.18em] text-[var(--color-pricing-enterprise)]">INCLUS DANS LA SUITE</div>
            <div className="mt-4 grid gap-3">
              {plan.suiteCards.map((card) => (
                <div key={card.title} className="rounded-xl bg-[var(--color-pricing-primary)] px-4 py-3 text-white">
                  <div className="text-sm font-bold">{card.icon} {card.title}</div>
                  <div className="mt-1 text-sm text-white/80">{card.description}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="my-6 h-px bg-[var(--color-pricing-primary-border)]" />
        </>
      ) : null}

      <div className="mt-8 flex flex-1 flex-col gap-6">
        {plan.sections?.map((section) => (
          <div key={section.title}>
            <div className={cn("text-xs font-bold uppercase tracking-[0.18em] text-muted-foreground", isEnterprise && "text-[var(--color-pricing-enterprise)]")}>
              {section.title}
            </div>
            <ul className="mt-3 space-y-2.5 text-sm text-foreground">
              {section.items.map((item) => (
                <FeaturePill key={item.label} enterprise={isEnterprise} included={item.included} label={item.label} />
              ))}
            </ul>
          </div>
        ))}
      </div>
    </article>
  );
}

function FeaturePill({ enterprise, included, label }: { enterprise?: boolean; included: boolean; label: string }) {
  const iconWrapper = enterprise
    ? "bg-[var(--color-pricing-primary-soft)] text-[var(--color-pricing-primary)]"
    : included
      ? "bg-[var(--color-pricing-success-soft)] text-[var(--color-pricing-success)]"
      : "bg-[var(--color-pricing-dash-soft)] text-[var(--color-pricing-dash)]";

  return (
    <li className={cn("flex items-start gap-3", !included && !enterprise && "text-muted-foreground") }>
      <span className={cn("mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full", iconWrapper)}>
        {included ? <Check className="h-3.5 w-3.5" /> : <Minus className="h-3.5 w-3.5" />}
      </span>
      <span>{label}</span>
    </li>
  );
}

function ComparisonTable({ product }: { product: ProductConfig }) {
  const columns: Array<{ key: PlanColumn; label: string }> = [
    { key: "starter", label: "Starter" },
    { key: "pro", label: "Pro" },
    { key: "business", label: "Business" },
    { key: "enterprise", label: "Enterprise" },
  ];

  return (
    <section className="overflow-hidden rounded-xl border border-border bg-card">
      <div className="overflow-x-auto">
        <table className="min-w-full border-separate border-spacing-0 text-left text-sm">
          <thead>
            <tr>
              <th className="border-b border-border bg-card px-5 py-4 font-semibold text-foreground">Feature</th>
              {columns.map((column) => (
                <th
                  key={column.key}
                  className={cn(
                    "border-b border-border px-5 py-4 font-semibold text-foreground",
                    column.key === "enterprise" ? "bg-[var(--color-pricing-primary-soft)]" : "bg-card",
                  )}
                >
                  {column.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {product.comparison.map((section) => (
              section.rows.map((row, index) => (
                <tr key={`${section.title}-${row.feature}`}>
                  <td
                    className={cn(
                      "border-b border-border px-5 py-4 align-top text-foreground",
                      index === 0 && "pt-7",
                      index === section.rows.length - 1 && "border-b-0 pb-7",
                    )}
                  >
                    {index === 0 ? <div className="mb-2 text-xs font-bold uppercase tracking-[0.18em] text-muted-foreground">{section.title}</div> : null}
                    <div className="font-medium">{row.feature}</div>
                  </td>
                  {columns.map((column) => (
                    <td
                      key={column.key}
                      className={cn(
                        "border-b border-border px-5 py-4 align-top text-muted-foreground",
                        index === 0 && "pt-7",
                        index === section.rows.length - 1 && "border-b-0 pb-7",
                        column.key === "enterprise" && "bg-[color-mix(in_oklab,var(--color-pricing-primary-soft)_65%,white)] text-foreground",
                      )}
                    >
                      <ComparisonValue value={row.values[column.key]} enterprise={column.key === "enterprise"} />
                    </td>
                  ))}
                </tr>
              ))
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

function ComparisonValue({ enterprise, value }: { enterprise?: boolean; value: string }) {
  if (value === "✓") {
    return (
      <span
        className={cn(
          "inline-flex h-6 w-6 items-center justify-center rounded-full",
          enterprise
            ? "bg-[var(--color-pricing-primary-soft)] text-[var(--color-pricing-primary)]"
            : "bg-[var(--color-pricing-success-soft)] text-[var(--color-pricing-success)]",
        )}
      >
        <Check className="h-3.5 w-3.5" />
      </span>
    );
  }

  if (value === "—") {
    return (
      <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-[var(--color-pricing-dash-soft)] text-[var(--color-pricing-dash)]">
        <Minus className="h-3.5 w-3.5" />
      </span>
    );
  }

  return <span className={cn("font-medium text-foreground", enterprise && "text-[var(--color-pricing-enterprise)]")}>{value}</span>;
}
