import { createFileRoute } from "@tanstack/react-router";

import { ProductPageTemplate, type ProductPageData } from "@/components/ProductPageTemplate";
import { SEOHead } from "@/components/SEOHead";
import { createStaticMeta } from "@/lib/site";

const qualionPage: ProductPageData = {
  product: "qualion",
  eyebrow: "🛡 QUALION · RÉPUTATION DOCUMENTAIRE",
  title: "Votre document est-il vraiment prêt à être envoyé ?",
  subtitle:
    "Qualion analyse chaque document en 30 secondes et détecte tout ce qui peut nuire à votre réputation professionnelle avant que votre client ne l'ouvre.",
  theme: {
    heroBg: "#1a1a18",
    heroCardBg: "#111110",
    accent: "#534AB7",
    accentSoft: "#EEEDFE",
    accentText: "#7F77DD",
    accentStrong: "#534AB7",
    darkMuted: "#A5A49B",
    ctaBg: "#534AB7",
  },
  heroPanel: {
    type: "analysis",
    label: "RAPPORT D'ANALYSE · QUALION",
    score: "34/100",
    scoreTone: "danger",
    items: [
      { text: "Auteur interne dans les propriétés", tone: "danger" },
      { text: "3 commentaires de révision cachés", tone: "danger" },
      { text: "Placeholder [NOM CLIENT] non remplacé", tone: "warning" },
      { text: "✓ Document nettoyé — Télécharger", tone: "success" },
    ],
  },
  howItWorks: [
    { title: "Uploadez", text: "Glissez votre document — Word, PDF, PPT ou Excel — directement dans Qualion." },
    { title: "Analysez", text: "Qualion scanne 14 catégories de risques en moins de 30 secondes et génère un rapport complet." },
    { title: "Envoyez", text: "Téléchargez la version nettoyée et envoyez avec confiance. Score qualité garanti." },
  ],
  featureColumns: [
    {
      title: "14 catégories de risques détectées",
      items: [
        { icon: "🔴", title: "Métadonnées cachées", text: "Auteur, entreprise, historique de révision, chemin de fichier." },
        { icon: "🔴", title: "Commentaires & track changes", text: "Commentaires de révision, modifications suivies encore actives." },
        { icon: "🔴", title: "Données personnelles", text: "Noms, emails, numéros dans les propriétés ou le contenu." },
        { icon: "🟡", title: "Placeholders oubliés", text: "[NOM CLIENT], TODO, INSÉRER ICI." },
        { icon: "🟡", title: "Ton IA détectable", text: "Formulations trop génériques ou typiquement générées par IA." },
        { icon: "🟡", title: "Fautes d'orthographe", text: "Correction orthographique et grammaticale avant envoi." },
      ],
    },
    {
      title: "Formats supportés & fonctionnalités",
      items: [
        { icon: "📄", title: "Word (.docx)", text: "Analyse complète contenu, propriétés, révisions." },
        { icon: "📊", title: "Excel & PowerPoint", text: "Métadonnées, commentaires, données cachées." },
        { icon: "📋", title: "PDF (Business+)", text: "Propriétés et contenu embarqué dans les PDFs." },
        { icon: "⚡", title: "Résultats en 30 secondes", text: "Rapport complet, sans installation." },
        { icon: "🔒", title: "0 donnée stockée", text: "Fichiers supprimés après analyse. RGPD by design." },
        { icon: "📥", title: "Nettoyage en un clic", text: "Téléchargez la version propre depuis le rapport." },
      ],
    },
  ],
  scenarioLabel: "ILS UTILISENT QUALION",
  scenarios: [
    {
      tag: "CONSULTANT",
      title: "Proposition client avec métadonnées internes",
      text: "Qualion détecte l'auteur interne et 3 commentaires de révision avant envoi.",
      result: "Réputation protégée",
    },
    {
      tag: "COMMERCIAL",
      title: "Offre RFP avec prix de revient visible",
      text: "Le suivi des modifications révélait la marge. Qualion le détecte avant soumission.",
      result: "Marge protégée",
    },
    {
      tag: "RECRUTEUR",
      title: "CV candidat avec notes de disqualification",
      text: "Les commentaires internes étaient encore visibles. Qualion nettoie avant transmission.",
      result: "RGPD conforme",
    },
  ],
  ctaTitle: "Prêt à envoyer avec confiance ?",
  ctaSubtitle: "Analysez votre prochain document — résultat en 30 secondes.",
  primaryCta: "Essayer Qualion",
};

export const Route = createFileRoute("/products/qualion")({
  head: () =>
    createStaticMeta({
      title: "Qualion | Réputation documentaire avant envoi | Mindorion",
      description:
        "Qualion analyse chaque document en 30 secondes et détecte tout ce qui peut nuire à votre réputation professionnelle avant envoi — métadonnées, commentaires, données sensibles, ton IA.",
      path: "/products/qualion",
    }),
  component: QualionPage,
});

function QualionPage() {
  return (
    <>
      <SEOHead
        title="Qualion | Réputation documentaire avant envoi | Mindorion"
        description="Qualion analyse chaque document en 30 secondes et détecte tout ce qui peut nuire à votre réputation professionnelle avant envoi — métadonnées, commentaires, données sensibles, ton IA."
        path="/products/qualion"
      />
      <ProductPageTemplate data={qualionPage} />
    </>
  );
}
