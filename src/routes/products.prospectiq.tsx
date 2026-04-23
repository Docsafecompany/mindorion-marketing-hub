import { createFileRoute } from "@tanstack/react-router";

import { ProductPageTemplate, type ProductPageData } from "@/components/ProductPageTemplate";
import { SEOHead } from "@/components/SEOHead";
import { createStaticMeta } from "@/lib/site";

const prospectiqPage: ProductPageData = {
  product: "prospectiq",
  eyebrow: "🎯 PROSPECTIQ · OUTREACH B2B INTELLIGENT",
  title: "Trouvez les bons prospects. Au bon moment.",
  subtitle:
    "ProspectIQ identifie vos meilleurs prospects B2B, qualifie les opportunités par IA et génère des séquences d'outreach personnalisées pour maximiser vos taux de réponse.",
  theme: {
    heroBg: "#0a1f16",
    heroCardBg: "#061410",
    accent: "#1D9E75",
    accentSoft: "#E1F5EE",
    accentText: "#5DCAA5",
    accentStrong: "#1D9E75",
    darkMuted: "#A6B7B0",
    ctaBg: "#0F6E56",
  },
  heroPanel: {
    type: "pipeline",
    label: "PIPELINE · PROSPECTIQ",
    rows: [
      { initials: "DL", title: "Dir. Commercial · Pharma", city: "Lyon", score: "94%" },
      { initials: "VP", title: "VP Achats · Aérospatial", city: "Toulouse", score: "88%" },
      { initials: "DG", title: "DG · Cabinet conseil", city: "Paris", score: "81%" },
    ],
  },
  howItWorks: [
    { title: "Définissez", text: "Décrivez votre cible idéale — secteur, taille, fonction, zone géographique." },
    { title: "Qualifiez", text: "L'IA identifie et score vos meilleurs prospects. Strategy Hub analyse les opportunités." },
    { title: "Contactez", text: "Lancez des séquences multi-canal personnalisées et laissez ProspectIQ gérer le suivi." },
  ],
  featureColumns: [
    {
      title: "Prospection & qualification",
      items: [
        { icon: "🎯", title: "Qualification IA", text: "Score de pertinence sur chaque prospect." },
        { icon: "🏢", title: "Intelligence Flags", text: "Signaux d'affaires : croissance, recrutements, levées de fonds, actualités." },
        { icon: "🧠", title: "Strategy Hub", text: "Analyse approfondie des comptes cibles et recommandations d'approche." },
        { icon: "📅", title: "Meeting Intelligence", text: "Préparation automatisée de vos réunions commerciales avec contexte prospect." },
      ],
    },
    {
      title: "Outreach & suivi",
      items: [
        { icon: "✉️", title: "Séquences multi-canal", text: "Email, LinkedIn, appel — séquences personnalisées par profil et secteur." },
        { icon: "🔄", title: "Suivi automatisé", text: "Relances intelligentes selon les comportements : ouverture, clic, réponse." },
        { icon: "📊", title: "Tableaux de bord équipe", text: "Performances d'outreach, taux de réponse et pipeline en temps réel." },
        { icon: "🔗", title: "Intégrations CRM", text: "Salesforce, HubSpot (Enterprise)." },
      ],
    },
  ],
  scenarioLabel: "CAS D'USAGE",
  scenarios: [
    {
      tag: "CONSULTANT",
      title: "Développement portefeuille clients",
      text: "ProspectIQ identifie les décideurs dans le secteur cible et génère les séquences d'approche.",
      result: "Pipeline alimenté",
    },
    {
      tag: "SALES B2B",
      title: "Qualification grands comptes",
      text: "Strategy Hub analyse les comptes cibles et recommande les meilleurs angles d'approche.",
      result: "Bons prospects ciblés",
    },
    {
      tag: "ESN",
      title: "Approche DSI & CTO",
      text: "ProspectIQ construit des séquences adaptées aux cycles longs de l'industrie tech.",
      result: "Cycle raccourci",
    },
  ],
  ctaTitle: "Prêt à trouver vos prochains clients ?",
  ctaSubtitle: "Qualifiez vos prospects et lancez vos séquences aujourd'hui.",
  primaryCta: "Essayer ProspectIQ",
};

export const Route = createFileRoute("/products/prospectiq")({
  head: () =>
    createStaticMeta({
      title: "ProspectIQ | Outreach B2B intelligent | Mindorion",
      description:
        "ProspectIQ identifie vos meilleurs prospects B2B, qualifie les opportunités par IA et génère des séquences d'outreach personnalisées pour maximiser vos taux de réponse.",
      path: "/products/prospectiq",
    }),
  component: ProspectIQPage,
});

function ProspectIQPage() {
  return (
    <>
      <SEOHead
        title="ProspectIQ | Outreach B2B intelligent | Mindorion"
        description="ProspectIQ identifie vos meilleurs prospects B2B, qualifie les opportunités par IA et génère des séquences d'outreach personnalisées pour maximiser vos taux de réponse."
        path="/products/prospectiq"
      />
      <ProductPageTemplate data={prospectiqPage} />
    </>
  );
}
