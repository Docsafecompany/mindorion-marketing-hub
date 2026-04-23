import { createFileRoute } from "@tanstack/react-router";

import { ProductPageTemplate, type ProductPageData } from "@/components/ProductPageTemplate";
import { SEOHead } from "@/components/SEOHead";
import { createStaticMeta } from "@/lib/site";

const governanceiqPage: ProductPageData = {
  product: "governanceiq",
  eyebrow: "📋 GOVERNANCEIQ · CONFORMITÉ DOCUMENTAIRE",
  title: "La conformité documentaire sans la complexité.",
  subtitle:
    "GovernanceIQ centralise les politiques documentaires de votre organisation, automatise les audits et garantit que chaque équipe opère selon les mêmes standards — sans effort de supervision.",
  theme: {
    heroBg: "#1a1400",
    heroCardBg: "#0d0a00",
    accent: "#BA7517",
    accentSoft: "#FAEEDA",
    accentText: "#EF9F27",
    accentStrong: "#BA7517",
    darkMuted: "#B7AE94",
    ctaBg: "#BA7517",
  },
  heroPanel: {
    type: "dashboard",
    label: "TABLEAU DE BORD · GOVERNANCEIQ",
    stats: [
      { value: "97%", label: "Conformité équipe" },
      { value: "24", label: "Docs audités ce mois" },
    ],
    policies: [
      { text: "Métadonnées — Obligatoire avant envoi", tone: "success" },
      { text: "RGPD — Données personnelles vérifiées", tone: "success" },
      { text: "Contrats — 2 docs en attente de révision", tone: "warning" },
    ],
  },
  howItWorks: [
    {
      title: "Définissez",
      text: "Créez vos politiques documentaires — standards requis, règles RGPD, niveaux de conformité par type de document.",
    },
    {
      title: "Déployez",
      text: "GovernanceIQ applique automatiquement vos politiques à toutes les équipes — sans formation ni supervision manuelle.",
    },
    {
      title: "Pilotez",
      text: "Suivez la conformité en temps réel via le tableau de bord et générez des rapports d'audit à la demande.",
    },
  ],
  featureColumns: [
    {
      title: "Gouvernance & politiques",
      items: [
        { icon: "📋", title: "Politiques centralisées", text: "Définissez une fois, appliquez à toute l'organisation automatiquement." },
        { icon: "🔍", title: "Audits automatisés", text: "Chaque document audité selon vos politiques — rapport généré automatiquement." },
        { icon: "⚠️", title: "Alertes de conformité", text: "Notification immédiate quand un document ne respecte pas les standards." },
        { icon: "📊", title: "Tableau de bord équipe", text: "Taux de conformité par équipe et par type de document, en temps réel." },
      ],
    },
    {
      title: "Conformité & sécurité",
      items: [
        { icon: "🔒", title: "RGPD by design", text: "Vérification automatique des données personnelles selon les réglementations en vigueur." },
        { icon: "📁", title: "Audit trail complet", text: "Historique de toutes les actions documentaires — traçabilité totale." },
        { icon: "👥", title: "Gestion des accès", text: "Rôles et permissions par équipe, département ou projet." },
        { icon: "🔗", title: "SSO & intégrations", text: "Connexion SSO, Google Workspace & Microsoft 365." },
      ],
    },
  ],
  scenarioLabel: "CAS D'USAGE",
  scenarios: [
    {
      tag: "RH",
      title: "Conformité RGPD des dossiers candidats",
      text: "GovernanceIQ garantit que tous les CVs transmis respectent les politiques RGPD de l'entreprise.",
      result: "Conformité garantie",
    },
    {
      tag: "ESN",
      title: "Standards documentaires inter-équipes",
      text: "Chefs de projet, consultants et développeurs suivent les mêmes politiques documentaires.",
      result: "Équipes alignées",
    },
    {
      tag: "ENTERPRISE",
      title: "Audit interne simplifié",
      text: "Rapports d'audit générés automatiquement — plus de collecte manuelle de preuves.",
      result: "Audit en 1 clic",
    },
  ],
  ctaTitle: "Prêt à garantir la conformité de votre équipe ?",
  ctaSubtitle: "Centralisez vos politiques documentaires dès aujourd'hui.",
  primaryCta: "Essayer GovernanceIQ",
};

export const Route = createFileRoute("/products/governanceiq")({
  head: () =>
    createStaticMeta({
      title: "GovernanceIQ | Conformité documentaire équipe | Mindorion",
      description:
        "GovernanceIQ centralise les politiques documentaires de votre organisation, automatise les audits et garantit que chaque équipe opère selon les mêmes standards.",
      path: "/products/governanceiq",
    }),
  component: GovernanceIQPage,
});

function GovernanceIQPage() {
  return (
    <>
      <SEOHead
        title="GovernanceIQ | Conformité documentaire équipe | Mindorion"
        description="GovernanceIQ centralise les politiques documentaires de votre organisation, automatise les audits et garantit que chaque équipe opère selon les mêmes standards."
        path="/products/governanceiq"
      />
      <ProductPageTemplate data={governanceiqPage} />
    </>
  );
}
