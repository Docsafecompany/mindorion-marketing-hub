import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";

import { SEOHead } from "@/components/SEOHead";
import { Button } from "@/components/ui/button";
import { LINKEDIN_URL } from "@/lib/site";
import { createStaticMeta } from "@/lib/site";

const stats = [
  { value: "3", label: "PRODUITS EN DÉVELOPPEMENT" },
  { value: "14", label: "CATÉGORIES DE RISQUES DÉTECTÉES" },
  { value: "0", label: "DONNÉE STOCKÉE · RGPD BY DESIGN" },
];

const buildInPublicItems = [
  "Roadmap publique et mise à jour régulièrement",
  "Retours utilisateurs intégrés à chaque sprint",
  "Transparence sur les décisions de pricing",
  "Suivi de la croissance partagé publiquement",
];

const values = [
  {
    icon: "🎯",
    title: "Résultats avant tout",
    text: "Chaque fonctionnalité que nous construisons doit résoudre un vrai problème professionnel. Pas de features gadgets — uniquement ce qui crée de la valeur mesurable.",
  },
  {
    icon: "🔒",
    title: "Privé par conception",
    text: "Vos documents ne sont jamais stockés. L'analyse se fait en temps réel et les fichiers sont supprimés immédiatement. La confidentialité n'est pas une option — c'est l'architecture.",
  },
  {
    icon: "⚡",
    title: "Simplicité radicale",
    text: "Les meilleurs outils professionnels sont invisibles. Vous uploadez, Mindorion analyse. Pas d'onboarding de 3 heures, pas de formation requise.",
  },
];

export const Route = createFileRoute("/about")({
  head: () =>
    createStaticMeta({
      title: "À propos | Mindorion — Intelligence professionnelle B2B",
      description:
        "Mindorion est un éditeur SaaS B2B fondé en Estonie. Découvrez notre mission, notre équipe et notre approche build in public. Qualion, ProspectIQ, GovernanceIQ.",
      path: "/about",
    }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <div className="section-shell section-space space-y-8">
      <SEOHead
        title="À propos | Mindorion — Intelligence professionnelle B2B"
        description="Mindorion est un éditeur SaaS B2B fondé en Estonie. Découvrez notre mission, notre équipe et notre approche build in public. Qualion, ProspectIQ, GovernanceIQ."
        path="/about"
      />

      <section className="grid gap-6 rounded-xl bg-[var(--color-about-dark)] p-6 text-white lg:grid-cols-[1.5fr_1fr] lg:p-8">
        <div>
          <div className="text-xs font-bold uppercase tracking-[0.18em] text-[var(--color-pricing-primary)]">À PROPOS DE MINDORION</div>
          <h1 className="headline-balance mt-5 text-4xl font-extrabold leading-tight sm:text-5xl">
            Construire les outils que les professionnels B2B <span className="font-medium italic text-[var(--color-pricing-primary-soft)]">méritent vraiment.</span>
          </h1>
          <p className="mt-5 max-w-3xl text-sm leading-7 text-[var(--color-about-dark-muted)] sm:text-base">
            Mindorion est un éditeur de logiciels B2B fondé en Estonie, qui construit une suite d'outils d'intelligence professionnelle pour les équipes qui opèrent à enjeux élevés — consultants, commerciaux, recruteurs et ingénieurs.
          </p>
          <div className="mt-6 flex flex-wrap gap-3 text-sm text-white/90">
            {[
              "Mindorion OÜ · Estonie",
              "Fondé en 2024",
              "B2B SaaS",
              "Build in public",
            ].map((tag) => (
              <span key={tag} className="rounded-full bg-white/6 px-3 py-1.5 text-sm text-white/85 ring-1 ring-white/8">
                {tag}
              </span>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          {stats.map((stat) => (
            <div key={stat.label} className="rounded-xl border border-white/8 bg-white/4 px-5 py-5">
              <div className="text-4xl font-extrabold text-white">{stat.value}</div>
              <div className="mt-2 text-xs font-medium tracking-[0.14em] text-[var(--color-about-dark-muted)]">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="rounded-xl border border-[var(--color-about-card-border)] bg-card px-6 py-10 text-center sm:px-8">
        <div className="text-xs font-bold uppercase tracking-[0.18em] text-muted-foreground">NOTRE MISSION</div>
        <h2 className="headline-balance mx-auto mt-4 max-w-3xl text-3xl font-extrabold leading-tight text-foreground sm:text-4xl">
          Donner aux professionnels B2B la certitude <span className="italic text-[var(--color-pricing-primary)]">d'opérer au plus haut niveau.</span>
        </h2>
        <p className="mx-auto mt-5 max-w-md text-sm leading-7 text-muted-foreground">
          Chaque document envoyé doit être impeccable. Chaque prospect doit être le bon. Chaque processus doit être conforme. Mindorion rend ça possible — sans friction, sans compromis.
        </p>
      </section>

      <section className="grid gap-6 lg:grid-cols-2">
        <article className="rounded-xl border border-[var(--color-about-card-border)] bg-card p-6">
          <div className="flex items-start gap-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[var(--color-pricing-primary-soft)] text-lg font-bold text-[var(--color-pricing-primary)]">
              CB
            </div>
            <div>
              <div className="text-xl font-bold text-foreground">Camille Baltazo</div>
              <div className="mt-1 text-sm text-muted-foreground">Founder & CEO · Mindorion OÜ</div>
              <div className="mt-4 flex flex-wrap gap-2">
                <a href="https://linkedin.com/in/camille-baltazo" target="_blank" rel="noreferrer" className="rounded-full border border-[var(--color-about-card-border)] px-3 py-1.5 text-sm font-medium text-foreground transition-colors hover:bg-[var(--color-pricing-primary-soft)]">
                  LinkedIn →
                </a>
                <a href="mailto:contact@mindorion.com" className="rounded-full border border-[var(--color-about-card-border)] px-3 py-1.5 text-sm font-medium text-foreground transition-colors hover:bg-[var(--color-pricing-primary-soft)]">
                  contact@mindorion.com
                </a>
              </div>
            </div>
          </div>

          <blockquote className="mt-6 border-l-2 border-[var(--color-pricing-primary)] pl-4 text-sm italic leading-7 text-muted-foreground">
            "J'ai passé des années dans le conseil et le développement commercial. J'ai vu trop de professionnels perdre des deals à cause de documents mal préparés ou de prospects mal qualifiés. Mindorion existe pour éliminer ces erreurs évitables."
          </blockquote>
        </article>

        <article className="rounded-xl bg-[var(--color-pricing-primary)] p-6 text-white">
          <div className="text-xs font-bold uppercase tracking-[0.18em] text-[var(--color-pricing-primary-soft)]">BUILD IN PUBLIC</div>
          <h2 className="mt-4 text-3xl font-extrabold leading-tight">On construit Mindorion en transparence, avec vous.</h2>
          <p className="mt-4 text-sm leading-7 text-[var(--color-pricing-primary-soft)]">
            Chaque décision produit, chaque apprentissage, chaque étape — partagés publiquement sur LinkedIn. Parce que les meilleurs outils se construisent avec ceux qui les utilisent.
          </p>
          <ul className="mt-6 space-y-3 text-sm text-[var(--color-pricing-primary-soft)]">
            {buildInPublicItems.map((item) => (
              <li key={item} className="flex items-start gap-3">
                <span className="mt-1.5 h-2 w-2 rounded-full bg-[var(--color-pricing-primary-soft)]" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </article>
      </section>

      <section className="grid gap-6 md:grid-cols-3">
        {values.map((value) => (
          <article key={value.title} className="rounded-xl border border-[var(--color-about-card-border)] bg-card p-6">
            <div className="text-3xl">{value.icon}</div>
            <h3 className="mt-5 text-xl font-bold text-foreground">{value.title}</h3>
            <p className="mt-4 text-sm leading-7 text-muted-foreground">{value.text}</p>
          </article>
        ))}
      </section>

      <section className="flex flex-col gap-5 rounded-[10px] bg-[var(--color-about-dark)] px-6 py-6 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white">Envie de suivre l'aventure Mindorion ?</h2>
          <p className="mt-2 text-sm leading-7 text-[var(--color-about-dark-muted)]">
            On partage tout sur LinkedIn — décisions, apprentissages, nouveaux produits.
          </p>
        </div>
        <Button asChild className="rounded-xl bg-[var(--color-pricing-primary)] text-white shadow-none hover:bg-[var(--color-pricing-primary)]/95">
          <a href={LINKEDIN_URL} target="_blank" rel="noreferrer">
            Suivre sur LinkedIn
            <ArrowRight className="h-4 w-4" />
          </a>
        </Button>
      </section>
    </div>
  );
}
