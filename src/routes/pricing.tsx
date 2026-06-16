import { useMemo, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Check, Minus } from "lucide-react";
import { useTranslation } from "react-i18next";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import i18n from "@/i18n";
import { GovernanceIQChip } from "@/components/pricing/GovernanceIQChip";
import { type GovernancePlan } from "@/components/pricing/GovernanceIQModal";
import { ProductLogo } from "@/components/ProductLogo";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { createStaticMeta } from "@/lib/site";
import { trackEvent } from "@/lib/analytics";
import { cn } from "@/lib/utils";

type PlanId = "starter" | "pro" | "business";
type ProductId = "proposaliq" | "growthiq";
type BillingMode = "monthly" | "annual";

// TODO: remplace les placeholders par tes vrais Stripe Price IDs (format: price_1xxx...)
const PRICE_IDS: Record<ProductId, Record<PlanId, Record<BillingMode, string>>> = {
  proposaliq: {
    starter:  { monthly: "price_1TLPIYPRgRrg8XxA4hWlXxrW",  annual: "price_1TLQkPRgRrg8XxAqxMDeTQu" },
    pro:      { monthly: "price_1TPA5sPRgRrg8XxAzShRwhNR",  annual: "price_1TPA6IPRgRrg8XxA8mTgEQn5" },
    business: { monthly: "price_1TLPKSPRgRrg8XxAkb2Uep0s",  annual: "price_1TLPMBPRgRrg8XxAVHmo0QQr" },
  },
  growthiq: {
    starter:  { monthly: "price_1TN0vTPRgRrg8XxAzjRbgLdF",  annual: "price_1TN0wJPRgRrg8XxA6gjahwBt" },
    pro:      { monthly: "price_1TN0wqPRgRrg8XxAD3bnMQtu",  annual: "price_1TN0xIPRgRrg8XxAYtJAiUbw" },
    business: { monthly: "price_1TN0xiPRgRrg8XxAG7GLpihz",  annual: "price_1TN0y3PRgRrg8XxAQXuLmtf9" },
  },
};

function handleCheckout(priceId: string) {
  window.location.href = `https://app.mindorion.com/signup?priceId=${priceId}`;
}

type PlanColumn = "starter" | "pro" | "business" | "enterprise";
type LocalizedPlan = {
  label: string;
  name: string;
  description: string;
  outcome: string;
  upgradeWhen?: string;
  includes?: string;
  monthlyPrice?: string;
  annualPrice?: string;
  annualNote?: string;
  cta: string;
  href: string;
  featured?: boolean;
  enterprise?: boolean;
  fixedNote?: string;
  suiteCards?: Array<{ icon: string; title: string; description: string }>;
  sections?: Array<{ title: string; items: Array<{ label: string; included: boolean | "partial"; note?: string }> }>;
};
type LocalizedProduct = {
  key: "proposaliq" | "growthiq";
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
  productSelectorHelper: string;
  maturityPath: string;
  roiHeadline: string;
  faqTitle: string;
  faq: Array<{ question: string; answer: string }>;
  finalCtaTitle: string;
  finalCtaPrimary: string;
  finalCtaSecondary: string;
  products: LocalizedProduct[];
};

const pricingCopy: Record<"fr" | "en", PricingCopy> = {
  fr: {
    seoTitle: "Mindorion Pricing | Proposal & Commercial Execution Software for Engineering & IT Services",
    seoDescription:
      "Explore Mindorion pricing for Engineering & IT Services firms. Start with ProposalIQ or GrowthIQ and scale toward governed proposal, pipeline and commercial execution workflows.",
    heroTitle: "Tarifs pour les équipes Engineering & IT Services qui font évoluer leur exécution commerciale.",
    heroSubtitle: "Choisissez ProposalIQ ou GrowthIQ, commencez avec l'équipe qui en a le plus besoin, puis évoluez vers une gouvernance unifiée couvrant les propositions, le pipeline et l'exécution commerciale.",
    monthly: "Mensuel",
    annual: "Annuel",
    annualBadge: "−20% sur l'annuel",
    popular: "Le plus populaire",
    custom: "Sur devis",
    includedInSuite: "INCLUS DANS LA SUITE",
    comparisonFeature: "Fonctionnalité",
    productSelectorHelper: "Chaque produit peut être adopté indépendamment. Enterprise combine les modules et la gouvernance.",
    maturityPath: "Excel → Starter → Pro → Business → Enterprise. Vous ne payez pas pour des fonctionnalités isolées — vous faites évoluer votre organisation vers un niveau supérieur de maturité opérationnelle.",
    roiHeadline: "Un requirement RFP manqué, un commentaire interne exposé, ou un mois de données pipeline médiocres peut coûter plus que l'abonnement annuel.",
    faqTitle: "Questions fréquentes",
    faq: [
      {
        question: "Pouvons-nous commencer avec seulement ProposalIQ ou GrowthIQ ?",
        answer: "Oui. Mindorion est conçu pour démarrer avec un workflow opérationnel et s'étendre au fur et à mesure que les équipes standardisent les propositions et l'exécution commerciale.",
      },
      {
        question: "Comment fonctionne la tarification Enterprise ?",
        answer: "La tarification Enterprise dépend du nombre d'utilisateurs, des intégrations CRM, des exigences de sécurité, des besoins de gouvernance et de la portée du déploiement.",
      },
      {
        question: "Intégrez-vous notre CRM ?",
        answer: "Oui — Enterprise se connecte à votre CRM pour que les données opérationnelles restent synchronisées et que le double reporting soit réduit.",
      },
      {
        question: "Comment Mindorion contrôle-t-il les coûts et la conformité de l'IA ?",
        answer: "Mindorion ne pousse pas l'IA partout par défaut. Il crée des workflows structurés et des données gouvernées pour que l'IA soit utilisée là où elle crée de la valeur tout en réduisant l'usage non contrôlé et les risques de conformité.",
      },
      {
        question: "Comment ProposalIQ et GrowthIQ fonctionnent-ils ensemble ?",
        answer: "ProposalIQ structure le workflow RFQ/proposition tandis que GrowthIQ connecte le pipeline, l'exécution commerciale et les résultats de win/loss, créant une boucle d'apprentissage à travers l'organisation.",
      },
    ],
    finalCtaTitle: "Prêt à standardiser les propositions et l'exécution commerciale ?",
    finalCtaPrimary: "Commencer avec un module",
    finalCtaSecondary: "Demander une démo Enterprise",
    products: [
      {
        key: "proposaliq",
        title: "ProposalIQ",
        subtitle: "Pré-vente et opérations de proposition pour les sociétés Engineering & IT Services.",
        plans: [
          {
            label: "Première utilisation équipe",
            name: "Starter",
            description: "Pour les petites équipes qui commencent à standardiser un workflow.",
            outcome: "Démarrer",
            upgradeWhen: "Plus de 5 utilisateurs, propositions incohérentes, reporting dupliqué ou manque de visibilité.",
            monthlyPrice: "19€/mois",
            annualPrice: "228€/an",
            annualNote: "1 utilisateur · soit 15€/mois · −20%",
            fixedNote: "1 utilisateur · facturation mensuelle",
            cta: "Choisir Starter",
            href: "/pricing",
            sections: [
              { title: "VOLUME", items: [{ label: "30 analyses / mois", included: true }, { label: "30 téléchargements / mois", included: true }] },
              { title: "DOCUMENTS", items: [{ label: "Word, PPT, Excel", included: true }] },
              {
                title: "VÉRIFICATIONS PROPOSITION",
                items: [
                  { label: "Données internes & commentaires", included: true },
                  { label: "Placeholders oubliés", included: true },
                  { label: "Données personnelles", included: true },
                  { label: "Score qualité proposition /100", included: true },
                  { label: "Fautes d'orthographe", included: false },
                  { label: "Ton IA", included: false },
                ],
              },
            ],
          },
          {
            label: "Standardisation équipe",
            name: "Pro",
            description: "Pour les équipes Engineering & IT Services en croissance qui ont besoin d'une exécution cohérente.",
            outcome: "Standardiser",
            upgradeWhen: "Les managers ont besoin de visibilité et de reporting sur plusieurs équipes, industries ou géographies.",
            monthlyPrice: "39€/mois",
            annualPrice: "468€/an",
            annualNote: "1 utilisateur · soit 31€/mois · −20%",
            fixedNote: "1 utilisateur · facturation mensuelle",
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
            label: "Gouvernance multi-équipes",
            name: "Business",
            description: "Pour les organisations structurées qui gèrent plusieurs équipes, marchés ou workflows de proposition.",
            outcome: "Gouverner",
            upgradeWhen: "La conformité, l'intégration CRM et la supervision exécutive deviennent critiques.",
            monthlyPrice: "59€/user/mois",
            annualPrice: "708€/user/an",
            annualNote: "Jusqu'à 5 utilisateurs · soit 47€/mois · −20%",
            fixedNote: "Jusqu'à 5 utilisateurs · facturation mensuelle",
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
            label: "Système d'exploitation gouverné",
            name: "Enterprise",
            description: "Connectez ProposalIQ, GrowthIQ et la Governance Layer pour faire évoluer les opérations assistées par l'IA avec CRM, sécurité et conformité.",
            outcome: "Passer à l'échelle",
            includes: "ProposalIQ + GrowthIQ + Governance Layer, intégration CRM, SSO/sécurité, CSM dédié.",
            cta: "Demander une démo",
            href: "/contact",
            enterprise: true,
            fixedNote: "Contrat annuel · Onboarding inclus",
            suiteCards: [
              { icon: "🛡", title: "ProposalIQ Business", description: "Word, PDF, PPT, Excel · illimité" },
              { icon: "🎯", title: "GrowthIQ Business", description: "Exécution commerciale complète" },
              { icon: "📋", title: "Governance Layer", description: "Gouvernance & conformité" },
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
            title: "VÉRIFICATIONS PROPOSITION",
            rows: [
              { feature: "Données internes & commentaires", values: { starter: "✓", pro: "✓", business: "✓", enterprise: "✓" } },
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
              { feature: "Governance Layer inclus", values: { starter: "—", pro: "—", business: "—", enterprise: "✓" } },
            ],
          },
        ],
      },
      {
        key: "growthiq",
        title: "GrowthIQ",
        subtitle: "Intelligence d'exécution commerciale pour les sociétés Engineering & IT Services.",
        plans: [
          {
            label: "Première utilisation équipe",
            name: "Starter",
            description: "Pour les petites équipes qui commencent à standardiser un workflow.",
            outcome: "Démarrer",
            upgradeWhen: "Plus de 5 utilisateurs, propositions incohérentes, reporting dupliqué ou manque de visibilité.",
            monthlyPrice: "49€/user/mois",
            annualPrice: "588€/user/an",
            annualNote: "soit 39€/mois · −20%",
            cta: "Choisir Starter",
            href: "/pricing",
            sections: [
              {
                title: "INCLUS",
                items: [
                  { label: "Couverture de comptes illimitée", included: true },
                  { label: "Qualification IA", included: true },
                  { label: "Intelligence Flags", included: true },
                  { label: "Cadences guidées", included: true },
                  { label: "Strategy Hub", included: false },
                  { label: "Meeting Intelligence", included: false },
                  { label: "Intégrations CRM", included: false },
                ],
              },
            ],
          },
          {
            label: "Standardisation équipe",
            name: "Pro",
            description: "Pour les équipes Engineering & IT Services en croissance qui ont besoin d'une exécution cohérente.",
            outcome: "Standardiser",
            upgradeWhen: "Les managers ont besoin de visibilité et de reporting sur plusieurs équipes, industries ou géographies.",
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
                  { label: "Cadences multi-étapes", included: true },
                  { label: "Tableaux de bord équipe", included: true },
                  { label: "Rapports de performance", included: true },
                ],
              },
            ],
          },
          {
            label: "Gouvernance multi-équipes",
            name: "Business",
            description: "Pour les organisations structurées qui gèrent plusieurs équipes, marchés ou workflows de proposition.",
            outcome: "Gouverner",
            upgradeWhen: "La conformité, l'intégration CRM et la supervision exécutive deviennent critiques.",
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
                  { label: "Intégrations CRM", included: "partial", note: "Lecture / push sans sync" },
                ],
              },
            ],
          },
          {
            label: "Système d'exploitation gouverné",
            name: "Enterprise",
            description: "Connectez ProposalIQ, GrowthIQ et la Governance Layer pour faire évoluer les opérations assistées par l'IA avec CRM, sécurité et conformité.",
            outcome: "Passer à l'échelle",
            includes: "ProposalIQ + GrowthIQ + Governance Layer, intégration CRM, SSO/sécurité, CSM dédié.",
            cta: "Demander une démo",
            href: "/contact",
            enterprise: true,
            fixedNote: "Contrat annuel · Onboarding inclus",
            suiteCards: [
              { icon: "🛡", title: "ProposalIQ Business", description: "Word, PDF, PPT, Excel · illimité" },
              { icon: "🎯", title: "GrowthIQ Business", description: "Exécution commerciale complète" },
              { icon: "📋", title: "Governance Layer", description: "Gouvernance & conformité" },
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
            title: "EXÉCUTION COMMERCIALE",
            rows: [
              { feature: "Couverture des comptes", values: { starter: "Illimité", pro: "Illimité", business: "Illimité", enterprise: "Illimité" } },
              { feature: "Strategy Hub", values: { starter: "—", pro: "✓", business: "✓", enterprise: "✓" } },
              { feature: "Meeting Intelligence", values: { starter: "—", pro: "✓", business: "✓", enterprise: "✓" } },
            ],
          },
          {
            title: "CADENCE D'EXÉCUTION",
            rows: [
              { feature: "Cadences guidées", values: { starter: "✓", pro: "✓", business: "✓", enterprise: "✓" } },
              { feature: "Cadences multi-étapes", values: { starter: "—", pro: "✓", business: "✓", enterprise: "✓" } },
            ],
          },
          {
            title: "INTÉGRATIONS & SÉCURITÉ",
            rows: [
              { feature: "API + webhooks", values: { starter: "—", pro: "—", business: "✓", enterprise: "✓" } },
              { feature: "Intégrations CRM", values: { starter: "—", pro: "—", business: "—", enterprise: "✓" } },
              { feature: "SSO & sécurité avancée", values: { starter: "—", pro: "—", business: "—", enterprise: "✓" } },
              { feature: "Governance Layer inclus", values: { starter: "—", pro: "—", business: "—", enterprise: "✓" } },
            ],
          },
        ],
      },
    ],
  },
  en: {
    seoTitle: "Mindorion Pricing | Proposal & Commercial Execution Software for Engineering & IT Services",
    seoDescription:
      "Explore Mindorion pricing for Engineering & IT Services firms. Start with ProposalIQ or GrowthIQ and scale toward governed proposal, pipeline and commercial execution workflows.",
    heroTitle: "Pricing for Engineering & IT Services teams scaling commercial execution.",
    heroSubtitle: "Choose ProposalIQ or GrowthIQ, start with the team that needs it most, then scale toward unified governance across proposals, pipeline and commercial execution.",
    monthly: "Monthly",
    annual: "Annual",
    annualBadge: "−20% yearly",
    popular: "Most popular",
    custom: "Custom",
    includedInSuite: "INCLUDED IN THE SUITE",
    comparisonFeature: "Feature",
    productSelectorHelper: "Each product can be adopted independently. Enterprise combines modules and governance.",
    maturityPath: "Excel → Starter → Pro → Business → Enterprise. You are not paying for isolated features — you are moving your organization to a higher level of operational maturity.",
    roiHeadline: "One missed RFP requirement, one exposed internal comment, or one month of poor pipeline data can cost more than the annual subscription.",
    faqTitle: "Frequently asked questions",
    faq: [
      {
        question: "Can we start with only ProposalIQ or GrowthIQ?",
        answer: "Yes. Mindorion is designed to start with one operational workflow and expand as teams standardize proposal and commercial execution.",
      },
      {
        question: "How does Enterprise pricing work?",
        answer: "Enterprise pricing depends on users, CRM integrations, security requirements, governance needs and deployment scope.",
      },
      {
        question: "Do you integrate with our CRM?",
        answer: "Yes — Enterprise connects to your CRM so operational data stays synchronized and double reporting is reduced.",
      },
      {
        question: "How does Mindorion control AI cost and compliance?",
        answer: "Mindorion does not push AI everywhere by default. It creates structured workflows and governed data so AI is used where it creates value while reducing uncontrolled usage and compliance risk.",
      },
      {
        question: "How do ProposalIQ and GrowthIQ work together?",
        answer: "ProposalIQ structures the RFQ/proposal workflow while GrowthIQ connects pipeline, commercial execution and win/loss outcomes, creating a learning loop across the organization.",
      },
    ],
    finalCtaTitle: "Ready to standardize proposal and commercial execution?",
    finalCtaPrimary: "Start with one module",
    finalCtaSecondary: "Book enterprise demo",
    products: [
      {
        key: "proposaliq",
        title: "ProposalIQ",
        subtitle: "Pre-sales and proposal operations for Engineering & IT Services firms.",
        plans: [
          {
            label: "First Team Use",
            name: "Starter",
            description: "For small teams starting to standardize one workflow.",
            outcome: "Start",
            upgradeWhen: "More than 5 users, inconsistent proposals, duplicate reporting or lack of visibility.",
            monthlyPrice: "€19/month",
            annualPrice: "€228/year",
            annualNote: "1 user · or €15/month · −20%",
            fixedNote: "1 user · billed monthly",
            cta: "Choose Starter",
            href: "/pricing",
            sections: [
              { title: "VOLUME", items: [{ label: "30 analyses / month", included: true }, { label: "30 downloads / month", included: true }] },
              { title: "DOCUMENTS", items: [{ label: "Word, PPT, Excel", included: true }] },
              {
                title: "PROPOSAL CHECKS",
                items: [
                  { label: "Internal data & comments", included: true },
                  { label: "Forgotten placeholders", included: true },
                  { label: "Personal data", included: true },
                  { label: "Proposal quality score /100", included: true },
                  { label: "Spelling", included: false },
                  { label: "AI tone", included: false },
                ],
              },
            ],
          },
          {
            label: "Team Standardization",
            name: "Pro",
            description: "For growing Engineering & IT Services teams that need consistent execution.",
            outcome: "Standardize",
            upgradeWhen: "Managers need visibility and reporting across multiple teams, industries or geographies.",
            monthlyPrice: "€39/month",
            annualPrice: "€468/year",
            annualNote: "1 user · or €31/month · −20%",
            fixedNote: "1 user · billed monthly",
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
            label: "Multi-Team Governance",
            name: "Business",
            description: "For structured organizations managing multiple teams, markets or proposal workflows.",
            outcome: "Govern",
            upgradeWhen: "Compliance, CRM integration and executive oversight become critical.",
            monthlyPrice: "€59/user/month",
            annualPrice: "€708/user/year",
            annualNote: "Up to 5 users · or €47/month · −20%",
            fixedNote: "Up to 5 users · billed monthly",
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
            label: "Governed Operating System",
            name: "Enterprise",
            description: "Connect ProposalIQ, GrowthIQ and the Governance Layer to scale AI-enabled operations with CRM, security and compliance.",
            outcome: "Scale",
            includes: "ProposalIQ + GrowthIQ + Governance Layer, CRM integration, SSO/security, dedicated CSM.",
            cta: "Request a demo",
            href: "/contact",
            enterprise: true,
            fixedNote: "Annual contract · Onboarding included",
            suiteCards: [
              { icon: "🛡", title: "ProposalIQ Business", description: "Word, PDF, PPT, Excel · unlimited" },
              { icon: "🎯", title: "GrowthIQ Business", description: "Full commercial execution" },
              { icon: "📋", title: "Governance Layer", description: "Governance & compliance" },
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
            title: "PROPOSAL CHECKS",
            rows: [
              { feature: "Internal data & comments", values: { starter: "✓", pro: "✓", business: "✓", enterprise: "✓" } },
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
              { feature: "Governance Layer included", values: { starter: "—", pro: "—", business: "—", enterprise: "✓" } },
            ],
          },
        ],
      },
      {
        key: "growthiq",
        title: "GrowthIQ",
        subtitle: "Commercial execution intelligence for Engineering & IT Services firms.",
        plans: [
          {
            label: "First Team Use",
            name: "Starter",
            description: "For small teams starting to standardize one workflow.",
            outcome: "Start",
            upgradeWhen: "More than 5 users, inconsistent proposals, duplicate reporting or lack of visibility.",
            monthlyPrice: "€49/user/month",
            annualPrice: "€588/user/year",
            annualNote: "or €39/month · −20%",
            cta: "Choose Starter",
            href: "/pricing",
            sections: [
              {
                title: "INCLUDED",
                items: [
                  { label: "Unlimited account coverage", included: true },
                  { label: "AI qualification", included: true },
                  { label: "Intelligence Flags", included: true },
                  { label: "Guided cadences", included: true },
                  { label: "Strategy Hub", included: false },
                  { label: "Meeting Intelligence", included: false },
                  { label: "CRM integrations", included: false },
                ],
              },
            ],
          },
          {
            label: "Team Standardization",
            name: "Pro",
            description: "For growing Engineering & IT Services teams that need consistent execution.",
            outcome: "Standardize",
            upgradeWhen: "Managers need visibility and reporting across multiple teams, industries or geographies.",
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
                  { label: "Multi-step cadences", included: true },
                  { label: "Team dashboards", included: true },
                  { label: "Performance reports", included: true },
                ],
              },
            ],
          },
          {
            label: "Multi-Team Governance",
            name: "Business",
            description: "For structured organizations managing multiple teams, markets or proposal workflows.",
            outcome: "Govern",
            upgradeWhen: "Compliance, CRM integration and executive oversight become critical.",
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
                  { label: "CRM integrations", included: "partial", note: "Read / push without sync" },
                ],
              },
            ],
          },
          {
            label: "Governed Operating System",
            name: "Enterprise",
            description: "Connect ProposalIQ, GrowthIQ and the Governance Layer to scale AI-enabled operations with CRM, security and compliance.",
            outcome: "Scale",
            includes: "ProposalIQ + GrowthIQ + Governance Layer, CRM integration, SSO/security, dedicated CSM.",
            cta: "Request a demo",
            href: "/contact",
            enterprise: true,
            fixedNote: "Annual contract · Onboarding included",
            suiteCards: [
              { icon: "🛡", title: "ProposalIQ Business", description: "Word, PDF, PPT, Excel · unlimited" },
              { icon: "🎯", title: "GrowthIQ Business", description: "Full commercial execution" },
              { icon: "📋", title: "Governance Layer", description: "Governance & compliance" },
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
            title: "COMMERCIAL EXECUTION",
            rows: [
              { feature: "Account coverage", values: { starter: "Unlimited", pro: "Unlimited", business: "Unlimited", enterprise: "Unlimited" } },
              { feature: "Strategy Hub", values: { starter: "—", pro: "✓", business: "✓", enterprise: "✓" } },
              { feature: "Meeting Intelligence", values: { starter: "—", pro: "✓", business: "✓", enterprise: "✓" } },
            ],
          },
          {
            title: "EXECUTION CADENCE",
            rows: [
              { feature: "Guided cadences", values: { starter: "✓", pro: "✓", business: "✓", enterprise: "✓" } },
              { feature: "Multi-step cadences", values: { starter: "—", pro: "✓", business: "✓", enterprise: "✓" } },
            ],
          },
          {
            title: "INTEGRATIONS & SECURITY",
            rows: [
              { feature: "API + webhooks", values: { starter: "—", pro: "—", business: "✓", enterprise: "✓" } },
              { feature: "CRM integrations", values: { starter: "—", pro: "—", business: "—", enterprise: "✓" } },
              { feature: "SSO & advanced security", values: { starter: "—", pro: "—", business: "—", enterprise: "✓" } },
              { feature: "Governance Layer included", values: { starter: "—", pro: "—", business: "—", enterprise: "✓" } },
            ],
          },
        ],
      },
    ],
  },
};

const headCopy = () => pricingCopy[(i18n.language?.slice(0, 2) === "fr" ? "fr" : "en") as "fr" | "en"];

export const Route = createFileRoute("/pricing")({
  head: () => {
    const base = createStaticMeta({
      title: headCopy().seoTitle,
      description: headCopy().seoDescription,
      path: "/pricing",
    });
    return {
      ...base,
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "OfferCatalog",
            name: "Mindorion Pricing",
            url: "https://mindorion.com/pricing",
            itemListElement: [
              {
                "@type": "Offer",
                name: "ProposalIQ",
                priceCurrency: "EUR",
                price: "19",
                url: "https://mindorion.com/products/proposaliq",
              },
              {
                "@type": "Offer",
                name: "GrowthIQ",
                priceCurrency: "EUR",
                price: "29",
                url: "https://mindorion.com/products/growthiq",
              },
            ],
          }),
        },
      ],
    };
  },
  component: PricingPage,
});

function PricingPage() {
  const { i18n: currentI18n } = useTranslation();
  const [billing, setBilling] = useState<BillingMode>("monthly");
  const locale = (currentI18n.language?.slice(0, 2) === "fr" ? "fr" : "en") as "fr" | "en";
  const copy = useMemo(() => pricingCopy[locale], [locale]);

  return (
    <div className="pricing-page section-shell section-space">

      <section className="mx-auto max-w-6xl text-center">
        <div className="mx-auto max-w-4xl space-y-4">
          <h1 className="headline-balance text-4xl font-extrabold text-foreground sm:text-5xl">{copy.heroTitle}</h1>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground">{copy.heroSubtitle}</p>
        </div>

        <div className="mt-8 flex flex-col items-center gap-4">
          <div className="inline-flex rounded-xl border border-border bg-card p-1">
            <button
              className={cn("rounded-[10px] px-5 py-2.5 text-sm font-semibold transition-colors", billing === "monthly" ? "bg-[var(--color-pricing-primary)] text-white" : "text-muted-foreground")}
              onClick={() => {
                setBilling("monthly");
                trackEvent("pricing_toggle", { billing: "monthly" });
              }}
              type="button"
            >
              {copy.monthly}
            </button>
            <button
              className={cn("rounded-[10px] px-5 py-2.5 text-sm font-semibold transition-colors", billing === "annual" ? "bg-[var(--color-pricing-primary)] text-white" : "text-muted-foreground")}
              onClick={() => {
                setBilling("annual");
                trackEvent("pricing_toggle", { billing: "annual" });
              }}
              type="button"
            >
              {copy.annual}
            </button>
          </div>
          <span className="inline-flex w-fit rounded-full bg-[var(--color-pricing-success-soft)] px-3 py-1 text-sm font-semibold text-[var(--color-pricing-success)]">{copy.annualBadge}</span>
        </div>
      </section>

      <Tabs defaultValue="proposaliq" className="mt-12">
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

        <p className="mx-auto mt-4 max-w-2xl text-center text-sm text-muted-foreground">
          {copy.productSelectorHelper}
        </p>

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

      {/* Maturity path */}
      <section className="mx-auto max-w-4xl text-center">
        <p className="text-sm font-medium text-muted-foreground">{copy.maturityPath}</p>
      </section>

      {/* ROI block */}
      <section className="mx-auto max-w-3xl">
        <div className="editorial-amber-soft rounded-2xl p-6 sm:p-8 text-center">
          <p className="text-base font-semibold leading-7">{copy.roiHeadline}</p>
        </div>
      </section>

      {/* FAQ */}
      <section className="mx-auto max-w-3xl">
        <h2 className="text-2xl font-bold text-foreground">{copy.faqTitle}</h2>
        <Accordion type="single" collapsible className="mt-6">
          {copy.faq.map((item, i) => (
            <AccordionItem key={i} value={`faq-${i}`}>
              <AccordionTrigger className="text-left text-sm font-semibold text-foreground">
                {item.question}
              </AccordionTrigger>
              <AccordionContent className="text-sm text-muted-foreground leading-6">
                {item.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              mainEntity: copy.faq.map((item) => ({
                "@type": "Question",
                name: item.question,
                acceptedAnswer: {
                  "@type": "Answer",
                  text: item.answer,
                },
              })),
            }),
          }}
        />
      </section>

      {/* Final CTA */}
      <section className="hero-wash rounded-2xl py-16 sm:py-20">
        <div className="mx-auto max-w-2xl px-6 text-center">
          <h2 className="text-2xl font-bold text-foreground sm:text-3xl">{copy.finalCtaTitle}</h2>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              to="/pricing"
              onClick={() => trackEvent("pricing_cta_clicked", { cta: "start_module" })}
            >
              <Button
                size="lg"
                className="h-[52px] rounded-xl bg-[var(--color-pricing-primary)] px-8 text-white shadow-none hover:bg-[var(--color-pricing-primary)]/95"
              >
                {copy.finalCtaPrimary}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link
              to="/contact"
              onClick={() => trackEvent("pricing_cta_clicked", { cta: "book_enterprise_demo" })}
            >
              <Button
                size="lg"
                variant="outline"
                className="h-[52px] rounded-xl border-border bg-card px-8 text-foreground shadow-none hover:bg-muted/40"
              >
                {copy.finalCtaSecondary}
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

function PlanCard({ productKey, billing, plan, popularLabel, customLabel, suiteLabel }: { productKey: ProductId; billing: BillingMode; plan: LocalizedPlan; popularLabel: string; customLabel: string; suiteLabel: string }) {
  const isEnterprise = Boolean(plan.enterprise);
  const isFeatured = Boolean(plan.featured);
  const isStandardPlan = !isEnterprise;
  const priceNote = isEnterprise
    ? plan.fixedNote
    : billing === "annual"
      ? plan.annualNote
      : plan.fixedNote;
  const priceValue = isEnterprise ? customLabel : billing === "monthly" ? plan.monthlyPrice : plan.annualPrice;

  const governancePlanMap: Record<string, GovernancePlan> = {
    Starter: "starter",
    Pro: "pro",
    Business: "business",
    Enterprise: "enterprise",
  };
  const governancePlan = governancePlanMap[plan.name];

  const planIdMap: Record<string, PlanId> = { Starter: "starter", Pro: "pro", Business: "business" };
  const stripePlanId = planIdMap[plan.name];
  const priceId = stripePlanId ? PRICE_IDS[productKey][stripePlanId][billing] : undefined;

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

        <div className="flex items-center gap-2">
          <div className={cn("text-xs font-bold uppercase tracking-[0.18em] text-muted-foreground", isEnterprise && "text-[var(--color-pricing-primary)]")}>{plan.label}</div>
          <span className="inline-flex rounded-full bg-[var(--color-pricing-success-soft)] px-2 py-0.5 text-xs font-semibold text-[var(--color-pricing-success)]">{plan.outcome}</span>
        </div>
        <div className={cn("mt-3 text-2xl font-extrabold text-foreground", isEnterprise && "text-[var(--color-pricing-enterprise)]")}>{plan.name}</div>
        <p className={cn("mt-2 min-h-16 text-sm leading-6 text-muted-foreground", isEnterprise && "text-[var(--color-pricing-enterprise)]")}>{plan.description}</p>
        {plan.upgradeWhen ? (
          <p className="mt-2 text-xs leading-5 text-muted-foreground">
            <span className="font-semibold text-foreground">Upgrade when:</span> {plan.upgradeWhen}
          </p>
        ) : null}
        {plan.includes ? (
          <p className="mt-2 text-xs leading-5 text-muted-foreground">
            <span className="font-semibold text-foreground">Includes:</span> {plan.includes}
          </p>
        ) : null}

        <div className="mt-5 min-h-[5.5rem]">
          <div className={cn("text-3xl font-extrabold", isEnterprise ? "text-[var(--color-pricing-enterprise)]" : "text-foreground")}>{priceValue}</div>
          {priceNote ? <div className={cn("mt-2 text-sm font-medium", isEnterprise ? "text-[var(--color-pricing-enterprise)]" : "text-[var(--color-pricing-success)]")}>{priceNote}</div> : null}
        </div>

        <div className="mt-5">
          {isEnterprise ? (
            <Link
              to={plan.href}
              onClick={() => trackEvent("pricing_plan_clicked", { plan: "enterprise", product: productKey, billing })}
            >
              <Button className="w-full rounded-xl bg-[var(--color-pricing-primary)] text-white shadow-none hover:bg-[var(--color-pricing-primary)]/95">
                {plan.cta}
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          ) : priceId ? (
            <Button
              variant="outline"
              className="w-full rounded-xl border-border bg-card text-foreground shadow-none hover:bg-muted/40"
              onClick={() => {
                console.log('button clicked', priceId);
                trackEvent("pricing_plan_clicked", { plan: stripePlanId, product: productKey, billing });
                void handleCheckout(priceId);
              }}
            >
              {plan.cta}
              <ArrowRight className="h-4 w-4" />
            </Button>
          ) : null}
          {governancePlan ? <GovernanceIQChip plan={governancePlan} /> : null}
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
                <FeaturePill key={item.label} enterprise={isEnterprise} included={item.included} label={item.label} note={item.note} />
              ))}
            </ul>
          </div>
        ))}
      </div>
    </article>
  );
}

function FeaturePill({ enterprise, included, label, note }: { enterprise?: boolean; included: boolean | "partial"; label: string; note?: string }) {
  const isPartial = included === "partial";
  const isIncluded = included === true;

  const iconWrapper = enterprise
    ? "bg-[var(--color-pricing-primary-soft)] text-[var(--color-pricing-primary)]"
    : isPartial
      ? "bg-amber-100 text-amber-600"
      : isIncluded
        ? "bg-[var(--color-pricing-success-soft)] text-[var(--color-pricing-success)]"
        : "bg-[var(--color-pricing-dash-soft)] text-[var(--color-pricing-dash)]";

  const Icon = isPartial ? Minus : isIncluded ? Check : Minus;

  return (
    <li className={cn("flex items-start gap-3", !isIncluded && !isPartial && !enterprise && "text-muted-foreground")}>
      <span className={cn("mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full", iconWrapper)}>
        <Icon className="h-3.5 w-3.5" />
      </span>
      <span className="flex-1">
        {label}
        {note ? <span className="block text-xs text-muted-foreground mt-0.5">{note}</span> : null}
      </span>
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
