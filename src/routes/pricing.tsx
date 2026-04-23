import { useMemo, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Check, Minus } from "lucide-react";
import { useTranslation } from "react-i18next";

import i18n from "@/i18n";
import { ProductLogo } from "@/components/ProductLogo";
import { SEOHead } from "@/components/SEOHead";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { createStaticMeta } from "@/lib/site";
import { cn } from "@/lib/utils";

type PlanId = "starter" | "pro" | "business";
type ProductId = "qualion" | "prospectiq";

const PAYMENT_LINKS: Record<ProductId, Record<PlanId, Record<BillingMode, string>>> = {
  qualion: {
    starter:  { monthly: "https://buy.stripe.com/3cI4gBc8u29Capw4w7bAs02", annual: "https://buy.stripe.com/dRm8wRegCbKceFM1jVbAs03" },
    pro:      { monthly: "https://buy.stripe.com/14AeVf5K6cOgcxEaUvbAs00", annual: "https://buy.stripe.com/4gMfZjc8u6pSgNU5AbbAs01" },
    business: { monthly: "https://buy.stripe.com/eVq28tgoK29C55c1jVbAs04", annual: "https://buy.stripe.com/00w14p4G2g0sdBI6EfbAs05" },
  },
  prospectiq: {
    starter:  { monthly: "https://buy.stripe.com/eVqdRb5K629CcxE8MnbAs0a", annual: "https://buy.stripe.com/28E4gB4G25lO69g0fRbAs0b" },
    pro:      { monthly: "https://buy.stripe.com/cNi6oJegCaG87dk9QrbAs08", annual: "https://buy.stripe.com/7sYcN7dcycOgcxE5AbbAs09" },
    business: { monthly: "https://buy.stripe.com/fZufZj4G29C455c0fRbAs06", annual: "https://buy.stripe.com/7sYdRb8WiaG8dBI3s3bAs07" },
  },
};

type BillingMode = "monthly" | "annual";
type PlanColumn = "starter" | "pro" | "business" | "enterprise";
type LocalizedPlan = {
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
  sections?: Array<{ title: string; items: Array<{ label: string; included: boolean }> }>;
};
type LocalizedProduct = {
  key: "qualion" | "prospectiq";
  title: string;
  subtitle: string;
  plans: LocalizedPlan[];
  comparison: Array<{ title: string; rows: Array<{ feature: string; values: Record<PlanColumn, string> }> }>;
};
type PricingCopy = {
  seoTitle: string;
  seoDescription: string;
  heroTitle: string;
  heroSubtitle: string;
  monthly: string;
  annual: string;
  annualBadge: string;
  popular: string;
  custom: string;
  includedInSuite: string;
  comparisonFeature: string;
  products: LocalizedProduct[];
};

const pricingCopy: Record<"fr" | "en", PricingCopy> = {
  fr: {
    seoTitle: "Tarifs | Qualion & ProspectIQ | Mindorion",
    seoDescription:
      "Découvrez les plans Mindorion — Qualion et ProspectIQ. Starter, Pro, Business et Enterprise. Un prix par utilisateur, zéro frais cachés.",
    heroTitle: "Un prix par utilisateur. Zéro frais cachés.",
    heroSubtitle: "Commencez avec un outil. Passez à Enterprise pour la suite complète avec intégrations CRM.",
    monthly: "Mensuel",
    annual: "Annuel",
    annualBadge: "−20% sur l'annuel",
    popular: "Le plus populaire",
    custom: "Sur devis",
    includedInSuite: "INCLUS DANS LA SUITE",
    comparisonFeature: "Fonctionnalité",
    products: [
      {
        key: "qualion",
        title: "Qualion",
        subtitle: "Réputation documentaire",
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
              { title: "VOLUME", items: [{ label: "30 analyses / mois", included: true }, { label: "30 téléchargements / mois", included: true }] },
              { title: "DOCUMENTS", items: [{ label: "Word, PPT, Excel", included: true }] },
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
              { title: "VOLUME", items: [{ label: "100 analyses / mois", included: true }, { label: "100 téléchargements / mois", included: true }] },
              { title: "DOCUMENTS", items: [{ label: "Word, PPT, Excel", included: true }] },
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
              { title: "VOLUME", items: [{ label: "Analyses illimitées", included: true }, { label: "Téléchargements illimités", included: true }] },
              { title: "DOCUMENTS", items: [{ label: "Word, PDF, PPT, Excel", included: true }] },
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
          {
            label: "SUITE COMPLÈTE",
            name: "Enterprise",
            description: "Suite complète — CRM, gouvernance et sécurité avancée inclus.",
            cta: "Demander une démo",
            href: "/contact",
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
          },
        ],
        comparison: [
          { title: "VOLUME", rows: [{ feature: "Analyses / mois", values: { starter: "30", pro: "100", business: "Illimité", enterprise: "Illimité" } }] },
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
          {
            label: "SUITE COMPLÈTE",
            name: "Enterprise",
            description: "Suite complète — CRM, gouvernance et sécurité avancée inclus.",
            cta: "Demander une démo",
            href: "/contact",
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
          },
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
    ],
  },
  en: {
    seoTitle: "Pricing | Qualion & ProspectIQ | Mindorion",
    seoDescription:
      "Discover Mindorion plans for Qualion and ProspectIQ. Starter, Pro, Business and Enterprise. One price per user, no hidden fees.",
    heroTitle: "One price per user. No hidden fees.",
    heroSubtitle: "Start with one product. Move to Enterprise for the full suite with CRM integrations.",
    monthly: "Monthly",
    annual: "Annual",
    annualBadge: "−20% yearly",
    popular: "Most popular",
    custom: "Custom",
    includedInSuite: "INCLUDED IN THE SUITE",
    comparisonFeature: "Feature",
    products: [
      {
        key: "qualion",
        title: "Qualion",
        subtitle: "Document reputation",
        plans: [
          {
            label: "ENTRY PLAN",
            name: "Starter",
            description: "For independent professionals getting started.",
            monthlyPrice: "€19/user/month",
            annualPrice: "€228/user/year",
            annualNote: "or €15/month · −20%",
            cta: "Choose Starter",
            href: "/pricing",
            sections: [
              { title: "VOLUME", items: [{ label: "30 analyses / month", included: true }, { label: "30 downloads / month", included: true }] },
              { title: "DOCUMENTS", items: [{ label: "Word, PPT, Excel", included: true }] },
              {
                title: "DETECTION",
                items: [
                  { label: "Metadata & comments", included: true },
                  { label: "Forgotten placeholders", included: true },
                  { label: "Personal data", included: true },
                  { label: "Quality score /100", included: true },
                  { label: "Spelling", included: false },
                  { label: "AI tone", included: false },
                ],
              },
            ],
          },
          {
            label: "SALES TEAMS",
            name: "Pro",
            description: "For consultants and active teams.",
            monthlyPrice: "€39/user/month",
            annualPrice: "€468/user/year",
            annualNote: "or €31/month · −20%",
            cta: "Choose Pro",
            href: "/pricing",
            featured: true,
            sections: [
              { title: "VOLUME", items: [{ label: "100 analyses / month", included: true }, { label: "100 downloads / month", included: true }] },
              { title: "DOCUMENTS", items: [{ label: "Word, PPT, Excel", included: true }] },
              {
                title: "EVERYTHING IN STARTER +",
                items: [
                  { label: "Spelling", included: true },
                  { label: "Detectable AI tone", included: true },
                  { label: "Shared dashboards", included: true },
                  { label: "Exportable PDF report", included: true },
                ],
              },
            ],
          },
          {
            label: "AGENCY · FIRM",
            name: "Business",
            description: "For structured teams.",
            monthlyPrice: "€59/user/month",
            annualPrice: "€708/user/year",
            annualNote: "or €47/month · −20%",
            cta: "Choose Business",
            href: "/pricing",
            sections: [
              { title: "VOLUME", items: [{ label: "Unlimited analyses", included: true }, { label: "Unlimited downloads", included: true }] },
              { title: "DOCUMENTS", items: [{ label: "Word, PDF, PPT, Excel", included: true }] },
              {
                title: "EVERYTHING IN PRO +",
                items: [
                  { label: "API + webhooks", included: true },
                  { label: "Unlimited storage", included: true },
                  { label: "Multi-user access", included: true },
                  { label: "Priority support", included: true },
                ],
              },
            ],
          },
          {
            label: "FULL SUITE",
            name: "Enterprise",
            description: "Complete suite with CRM, governance and advanced security included.",
            cta: "Request a demo",
            href: "/contact",
            enterprise: true,
            fixedNote: "Annual contract · Onboarding included",
            suiteCards: [
              { icon: "🛡", title: "Qualion Business", description: "Word, PDF, PPT, Excel · unlimited" },
              { icon: "🎯", title: "ProspectIQ Business", description: "Full outreach" },
              { icon: "📋", title: "GovernanceIQ", description: "Governance & compliance" },
            ],
            sections: [
              {
                title: "ENTERPRISE ONLY",
                items: [
                  { label: "CRM integrations (Salesforce, HubSpot)", included: true },
                  { label: "SSO & advanced security", included: true },
                  { label: "Dedicated CSM", included: true },
                  { label: "Guaranteed SLA", included: true },
                  { label: "Onboarding included", included: true },
                ],
              },
            ],
          },
        ],
        comparison: [
          { title: "VOLUME", rows: [{ feature: "Analyses / month", values: { starter: "30", pro: "100", business: "Unlimited", enterprise: "Unlimited" } }] },
          {
            title: "SUPPORTED DOCUMENTS",
            rows: [
              { feature: "Word, PPT, Excel", values: { starter: "✓", pro: "✓", business: "✓", enterprise: "✓" } },
              { feature: "PDF", values: { starter: "—", pro: "—", business: "✓", enterprise: "✓" } },
            ],
          },
          {
            title: "DETECTIONS",
            rows: [
              { feature: "Metadata & comments", values: { starter: "✓", pro: "✓", business: "✓", enterprise: "✓" } },
              { feature: "Spelling", values: { starter: "—", pro: "✓", business: "✓", enterprise: "✓" } },
              { feature: "Detectable AI tone", values: { starter: "—", pro: "✓", business: "✓", enterprise: "✓" } },
            ],
          },
          {
            title: "INTEGRATIONS & SECURITY",
            rows: [
              { feature: "API + webhooks", values: { starter: "—", pro: "—", business: "✓", enterprise: "✓" } },
              { feature: "CRM integrations", values: { starter: "—", pro: "—", business: "—", enterprise: "✓" } },
              { feature: "SSO & advanced security", values: { starter: "—", pro: "—", business: "—", enterprise: "✓" } },
              { feature: "GovernanceIQ included", values: { starter: "—", pro: "—", business: "—", enterprise: "✓" } },
            ],
          },
        ],
      },
      {
        key: "prospectiq",
        title: "ProspectIQ",
        subtitle: "Intelligent B2B outreach",
        plans: [
          {
            label: "ENTRY PLAN",
            name: "Starter",
            description: "For independent sales reps.",
            monthlyPrice: "€49/user/month",
            annualPrice: "€588/user/year",
            annualNote: "or €39/month · −20%",
            cta: "Choose Starter",
            href: "/pricing",
            sections: [
              {
                title: "INCLUDED",
                items: [
                  { label: "Unlimited prospects", included: true },
                  { label: "AI qualification", included: true },
                  { label: "Intelligence Flags", included: true },
                  { label: "Basic sequences", included: true },
                  { label: "Strategy Hub", included: false },
                  { label: "Meeting Intelligence", included: false },
                  { label: "CRM integrations", included: false },
                ],
              },
            ],
          },
          {
            label: "SALES TEAMS",
            name: "Pro",
            description: "For growing commercial teams.",
            monthlyPrice: "€69/user/month",
            annualPrice: "€828/user/year",
            annualNote: "or €55/month · −20%",
            cta: "Choose Pro",
            href: "/pricing",
            featured: true,
            sections: [
              {
                title: "EVERYTHING IN STARTER +",
                items: [
                  { label: "Strategy Hub", included: true },
                  { label: "Meeting Intelligence", included: true },
                  { label: "Multi-channel sequences", included: true },
                  { label: "Team dashboards", included: true },
                  { label: "Performance reports", included: true },
                ],
              },
            ],
          },
          {
            label: "AGENCY · ENTERPRISE ACCOUNT",
            name: "Business",
            description: "For structured revenue teams.",
            monthlyPrice: "€89/user/month",
            annualPrice: "€1,068/user/year",
            annualNote: "or €71/month · −20%",
            cta: "Choose Business",
            href: "/pricing",
            sections: [
              {
                title: "EVERYTHING IN PRO +",
                items: [
                  { label: "Custom workflows", included: true },
                  { label: "API + webhooks", included: true },
                  { label: "Multi-team access", included: true },
                  { label: "Dedicated priority support", included: true },
                  { label: "CRM integrations", included: false },
                ],
              },
            ],
          },
          {
            label: "FULL SUITE",
            name: "Enterprise",
            description: "Complete suite with CRM, governance and advanced security included.",
            cta: "Request a demo",
            href: "/contact",
            enterprise: true,
            fixedNote: "Annual contract · Onboarding included",
            suiteCards: [
              { icon: "🛡", title: "Qualion Business", description: "Word, PDF, PPT, Excel · unlimited" },
              { icon: "🎯", title: "ProspectIQ Business", description: "Full outreach" },
              { icon: "📋", title: "GovernanceIQ", description: "Governance & compliance" },
            ],
            sections: [
              {
                title: "ENTERPRISE ONLY",
                items: [
                  { label: "CRM integrations (Salesforce, HubSpot)", included: true },
                  { label: "SSO & advanced security", included: true },
                  { label: "Dedicated CSM", included: true },
                  { label: "Guaranteed SLA", included: true },
                  { label: "Onboarding included", included: true },
                ],
              },
            ],
          },
        ],
        comparison: [
          {
            title: "PROSPECTING",
            rows: [
              { feature: "Qualified prospects", values: { starter: "Unlimited", pro: "Unlimited", business: "Unlimited", enterprise: "Unlimited" } },
              { feature: "Strategy Hub", values: { starter: "—", pro: "✓", business: "✓", enterprise: "✓" } },
              { feature: "Meeting Intelligence", values: { starter: "—", pro: "✓", business: "✓", enterprise: "✓" } },
            ],
          },
          {
            title: "OUTREACH",
            rows: [
              { feature: "Basic sequences", values: { starter: "✓", pro: "✓", business: "✓", enterprise: "✓" } },
              { feature: "Multi-channel sequences", values: { starter: "—", pro: "✓", business: "✓", enterprise: "✓" } },
            ],
          },
          {
            title: "INTEGRATIONS & SECURITY",
            rows: [
              { feature: "API + webhooks", values: { starter: "—", pro: "—", business: "✓", enterprise: "✓" } },
              { feature: "CRM integrations", values: { starter: "—", pro: "—", business: "—", enterprise: "✓" } },
              { feature: "SSO & advanced security", values: { starter: "—", pro: "—", business: "—", enterprise: "✓" } },
              { feature: "GovernanceIQ included", values: { starter: "—", pro: "—", business: "—", enterprise: "✓" } },
            ],
          },
        ],
      },
    ],
  },
};

const headCopy = () => pricingCopy[(i18n.language?.slice(0, 2) === "fr" ? "fr" : "en") as "fr" | "en"];

export const Route = createFileRoute("/pricing")({
  head: () =>
    createStaticMeta({
      title: headCopy().seoTitle,
      description: headCopy().seoDescription,
      path: "/pricing",
    }),
  component: PricingPage,
});

function PricingPage() {
  const { i18n: currentI18n } = useTranslation();
  const [billing, setBilling] = useState<BillingMode>("monthly");
  const locale = (currentI18n.language?.slice(0, 2) === "fr" ? "fr" : "en") as "fr" | "en";
  const copy = useMemo(() => pricingCopy[locale], [locale]);

  return (
    <div className="pricing-page section-shell section-space">
      <SEOHead title={copy.seoTitle} description={copy.seoDescription} path="/pricing" />

      <section className="mx-auto max-w-6xl text-center">
        <div className="mx-auto max-w-4xl space-y-4">
          <h1 className="headline-balance text-4xl font-extrabold text-foreground sm:text-5xl">{copy.heroTitle}</h1>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground">{copy.heroSubtitle}</p>
        </div>

        <div className="mt-8 flex flex-col items-center gap-4">
          <div className="inline-flex rounded-xl border border-border bg-card p-1">
            <button
              className={cn("rounded-[10px] px-5 py-2.5 text-sm font-semibold transition-colors", billing === "monthly" ? "bg-[var(--color-pricing-primary)] text-white" : "text-muted-foreground")}
              onClick={() => setBilling("monthly")}
              type="button"
            >
              {copy.monthly}
            </button>
            <button
              className={cn("rounded-[10px] px-5 py-2.5 text-sm font-semibold transition-colors", billing === "annual" ? "bg-[var(--color-pricing-primary)] text-white" : "text-muted-foreground")}
              onClick={() => setBilling("annual")}
              type="button"
            >
              {copy.annual}
            </button>
          </div>
          <span className="inline-flex w-fit rounded-full bg-[var(--color-pricing-success-soft)] px-3 py-1 text-sm font-semibold text-[var(--color-pricing-success)]">{copy.annualBadge}</span>
        </div>
      </section>

      <Tabs defaultValue="qualion" className="mt-12">
        <TabsList className="mx-auto grid h-auto w-full max-w-3xl grid-cols-1 gap-4 rounded-none bg-transparent p-0 md:grid-cols-2">
          {copy.products.map((product) => (
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
          ))}
        </TabsList>

        {copy.products.map((product) => (
          <TabsContent key={product.key} value={product.key} className="mt-8 space-y-10">
            <div className="grid gap-4 lg:grid-cols-4 xl:gap-6">
              {product.plans.map((plan) => (
                <PlanCard key={`${product.key}-${plan.name}`} productKey={product.key} billing={billing} plan={plan} popularLabel={copy.popular} customLabel={copy.custom} suiteLabel={copy.includedInSuite} />
              ))}
            </div>
            <ComparisonTable product={product} featureLabel={copy.comparisonFeature} />
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}

function PlanCard({ productKey, billing, plan, popularLabel, customLabel, suiteLabel }: { productKey: ProductId; billing: BillingMode; plan: LocalizedPlan; popularLabel: string; customLabel: string; suiteLabel: string }) {
  const isEnterprise = Boolean(plan.enterprise);
  const isFeatured = Boolean(plan.featured);
  const isStandardPlan = !isEnterprise;
  const priceNote = isEnterprise ? plan.fixedNote : billing === "annual" ? plan.annualNote : undefined;
  const priceValue = isEnterprise ? customLabel : billing === "monthly" ? plan.monthlyPrice : plan.annualPrice;

  const planIdMap: Record<string, PlanId> = { Starter: "starter", Pro: "pro", Business: "business" };
  const stripePlanId = planIdMap[plan.name];
  const paymentHref = stripePlanId ? PAYMENT_LINKS[productKey][stripePlanId][billing] : undefined;

  return (
    <article
      className={cn(
        "flex min-h-full flex-col rounded-xl border bg-card p-5 lg:p-4 xl:p-5",
        isEnterprise && "border-[var(--color-pricing-enterprise-border)] bg-[var(--color-pricing-enterprise-soft)]",
        isFeatured && "border-2 border-[var(--color-pricing-primary)]",
        !isEnterprise && !isFeatured && "border-border",
      )}
    >
      <div className="flex min-h-[20rem] flex-col">
        <div className="flex h-8 items-start">{isFeatured ? <div className="inline-flex rounded-full bg-[var(--color-pricing-primary)] px-3 py-1 text-xs font-semibold text-white">{popularLabel}</div> : null}</div>

        <div className={cn("text-xs font-bold uppercase tracking-[0.18em] text-muted-foreground", isEnterprise && "text-[var(--color-pricing-primary)]")}>{plan.label}</div>
        <div className={cn("mt-3 text-2xl font-extrabold text-foreground", isEnterprise && "text-[var(--color-pricing-enterprise)]")}>{plan.name}</div>
        <p className={cn("mt-2 min-h-16 text-sm leading-6 text-muted-foreground", isEnterprise && "text-[var(--color-pricing-enterprise)]")}>{plan.description}</p>

        <div className="mt-5 min-h-[5.5rem]">
          <div className={cn("text-3xl font-extrabold", isEnterprise ? "text-[var(--color-pricing-enterprise)]" : "text-foreground")}>{priceValue}</div>
          {priceNote ? <div className={cn("mt-2 text-sm font-medium", isEnterprise ? "text-[var(--color-pricing-enterprise)]" : "text-[var(--color-pricing-success)]")}>{priceNote}</div> : null}
        </div>

        <div className="mt-5">
          {isEnterprise ? (
            <Link to={plan.href}>
              <Button className="w-full rounded-xl bg-[var(--color-pricing-primary)] text-white shadow-none hover:bg-[var(--color-pricing-primary)]/95">
                {plan.cta}
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          ) : paymentHref ? (
            <a href={paymentHref} target="_blank" rel="noopener noreferrer" className="block">
              <Button
                variant="outline"
                className="w-full rounded-xl border-border bg-card text-foreground shadow-none hover:bg-muted/40"
              >
                {plan.cta}
                <ArrowRight className="h-4 w-4" />
              </Button>
            </a>
          ) : null}
        </div>
      </div>

      {isEnterprise && plan.suiteCards ? (
        <>
          <div className="mt-8">
            <div className="text-xs font-bold uppercase tracking-[0.18em] text-[var(--color-pricing-enterprise)]">{suiteLabel}</div>
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

      <div className={cn("mt-7 flex flex-1 flex-col gap-6", isStandardPlan && "border-t border-border pt-6")}>
        {plan.sections?.map((section) => (
          <div key={section.title}>
            <div className={cn("text-xs font-bold uppercase tracking-[0.18em] text-muted-foreground", isEnterprise && "text-[var(--color-pricing-enterprise)]")}>{section.title}</div>
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
    <li className={cn("flex items-start gap-3", !included && !enterprise && "text-muted-foreground")}>
      <span className={cn("mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full", iconWrapper)}>
        {included ? <Check className="h-3.5 w-3.5" /> : <Minus className="h-3.5 w-3.5" />}
      </span>
      <span>{label}</span>
    </li>
  );
}

function ComparisonTable({ product, featureLabel }: { product: LocalizedProduct; featureLabel: string }) {
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
              <th className="border-b border-border bg-card px-5 py-4 font-semibold text-foreground">{featureLabel}</th>
              {columns.map((column) => (
                <th
                  key={column.key}
                  className={cn("border-b border-border px-5 py-4 font-semibold text-foreground", column.key === "enterprise" ? "bg-[var(--color-pricing-primary-soft)]" : "bg-card")}
                >
                  {column.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {product.comparison.map((section) =>
              section.rows.map((row, index) => (
                <tr key={`${section.title}-${row.feature}`}>
                  <td className={cn("border-b border-border px-5 py-4 align-top text-foreground", index === 0 && "pt-7", index === section.rows.length - 1 && "border-b-0 pb-7")}>
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
              )),
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
}

function ComparisonValue({ enterprise, value }: { enterprise?: boolean; value: string }) {
  if (value === "✓") {
    return (
      <span className={cn("inline-flex h-6 w-6 items-center justify-center rounded-full", enterprise ? "bg-[var(--color-pricing-primary-soft)] text-[var(--color-pricing-primary)]" : "bg-[var(--color-pricing-success-soft)] text-[var(--color-pricing-success)]")}>
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
