import { useMemo, useState } from "react";
import { Link, createFileRoute } from "@tanstack/react-router";

import { SEOHead } from "@/components/SEOHead";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { createStaticMeta } from "@/lib/site";

export const Route = createFileRoute("/blog")({
  head: () =>
    createStaticMeta({
      title: "Blog | Conseils et guides professionnels B2B | Mindorion",
      description: "Articles, guides et ressources pour les professionnels B2B — réputation documentaire, prospection intelligente et conformité.",
      path: "/blog",
    }),
  component: BlogPage,
});

type BlogFilter = "Tous" | "Qualion" | "ProspectIQ" | "GovernanceIQ" | "Guides";

const filterTags: { label: string; value: BlogFilter }[] = [
  { label: "Tous", value: "Tous" },
  { label: "🛡 Qualion", value: "Qualion" },
  { label: "🎯 ProspectIQ", value: "ProspectIQ" },
  { label: "📋 GovernanceIQ", value: "GovernanceIQ" },
  { label: "Guides", value: "Guides" },
];

const featuredArticle = {
  slug: "track-changes-proposals",
};

const blogCards = [
  {
    slug: "remove-metadata-word-before-sending",
    filter: "Qualion",
    icon: "🛡",
    category: "QUALION",
    title: "Comment supprimer les métadonnées d'un document Word avant envoi",
    excerpt: "Guide pas à pas pour nettoyer vos documents Word de toutes leurs données cachées.",
    meta: "10 avril · 5 min",
    headerClass: "editorial-purple-soft",
    pillClass: "editorial-purple-soft",
  },
  {
    slug: "hidden-risks-documents",
    filter: "ProspectIQ",
    icon: "🎯",
    category: "PROSPECTIQ",
    title: "Prospection B2B : pourquoi 80% de vos emails restent sans réponse",
    excerpt: "Les erreurs de ciblage et de personnalisation qui tuent vos taux de réponse.",
    meta: "5 avril · 7 min",
    headerClass: "editorial-green-soft",
    pillClass: "editorial-green-soft",
  },
  {
    slug: "roi-document-cleanup",
    filter: "GovernanceIQ",
    icon: "📋",
    category: "GOUVERNANCE",
    title: "RGPD et documents RH : ce que votre équipe doit vérifier avant chaque envoi",
    excerpt: "Les obligations RGPD souvent ignorées dans les processus RH quotidiens.",
    meta: "1 avril · 6 min",
    headerClass: "editorial-amber-soft",
    pillClass: "editorial-amber-soft",
  },
  {
    slug: "consulting-quality-gate",
    filter: "Guides",
    icon: "💼",
    category: "GUIDE",
    title: "Comment répondre à un appel d'offres sans exposer vos données internes",
    excerpt: "Les bonnes pratiques pour sécuriser vos RFP avant soumission.",
    meta: "25 mars · 9 min",
    headerClass: "editorial-gray-soft",
    pillClass: "editorial-gray-soft",
  },
  {
    slug: "what-gets-cleaned",
    filter: "Qualion",
    icon: "📄",
    category: "QUALION",
    title: "Pourquoi le ton IA dans vos documents nuit à votre crédibilité professionnelle",
    excerpt: "Comment détecter et corriger les formulations trop génériques avant envoi.",
    meta: "20 mars · 5 min",
    headerClass: "editorial-purple-soft",
    pillClass: "editorial-purple-soft",
  },
  {
    slug: "track-changes-proposals",
    filter: "ProspectIQ",
    icon: "🔍",
    category: "PROSPECTIQ",
    title: "Les 7 signaux d'affaires à surveiller pour prospecter au bon moment",
    excerpt: "Recrutements, levées de fonds, nouvelles directions — les signaux qui indiquent une opportunité.",
    meta: "15 mars · 6 min",
    headerClass: "editorial-green-soft",
    pillClass: "editorial-green-soft",
  },
] as const;

function BlogPage() {
  const [activeFilter, setActiveFilter] = useState<BlogFilter>("Tous");
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const filteredArticles = useMemo(
    () => (activeFilter === "Tous" ? blogCards : blogCards.filter((article) => article.filter === activeFilter)),
    [activeFilter],
  );

  return (
    <div className="editorial-page font-pricing">
      <div className="section-shell section-space">
        <SEOHead
          title="Blog | Conseils et guides professionnels B2B | Mindorion"
          description="Articles, guides et ressources pour les professionnels B2B — réputation documentaire, prospection intelligente et conformité."
          path="/blog"
        />

        <section className="mx-auto max-w-4xl text-center">
          <div className="text-xs font-bold uppercase tracking-[0.22em] editorial-purple-text">BLOG MINDORION</div>
          <h1 className="mt-4 text-balance text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl">
            Conseils, guides et ressources professionnelles.
          </h1>
          <p className="mx-auto mt-5 max-w-3xl text-balance text-base leading-7 text-muted-foreground sm:text-lg">
            Tout ce que les professionnels B2B doivent savoir sur la réputation documentaire, la prospection et la conformité.
          </p>
        </section>

        <section className="mt-10 flex flex-wrap items-center justify-center gap-3">
          {filterTags.map((tag) => {
            const active = tag.value === activeFilter;
            return (
              <button
                key={tag.value}
                type="button"
                onClick={() => setActiveFilter(tag.value)}
                className={active ? "rounded-full px-4 py-2 text-sm font-semibold editorial-purple-bg text-white" : "rounded-full border border-[#e8e6e0] bg-white px-4 py-2 text-sm font-semibold text-muted-foreground"}
              >
                {tag.label}
              </button>
            );
          })}
        </section>

        <section className="editorial-dark-surface mt-12 grid gap-6 rounded-xl p-6 lg:grid-cols-[1.1fr_0.9fr] lg:p-8">
          <div>
            <div className="flex flex-wrap gap-2">
              <span className="rounded-full px-3 py-1 text-xs font-bold uppercase tracking-[0.16em] editorial-purple-soft">🛡 QUALION</span>
              <span className="rounded-full px-3 py-1 text-xs font-bold uppercase tracking-[0.16em] editorial-dark-soft">GUIDE</span>
            </div>
            <h2 className="mt-5 text-balance text-3xl font-extrabold leading-tight editorial-on-dark sm:text-4xl">
              5 erreurs documentaires qui coûtent des deals aux consultants
            </h2>
            <p className="mt-4 max-w-2xl text-base leading-7 editorial-on-dark-muted">
              Les métadonnées révélatrices, les commentaires oubliés, les placeholders non remplacés — voici les 5 erreurs les plus courantes et comment les éviter avant d'envoyer votre prochain document.
            </p>
            <div className="mt-6 text-sm editorial-on-dark-muted">15 avril 2026 · 8 min de lecture</div>
            <Link to="/blog/$slug" params={{ slug: featuredArticle.slug }} className="mt-8 inline-flex">
              <Button className="editorial-purple-bg rounded-lg px-5 text-sm font-semibold text-white hover:opacity-95">Lire l'article →</Button>
            </Link>
          </div>

          <div className="editorial-dark-panel rounded-xl p-5">
            <div className="text-xs font-bold uppercase tracking-[0.2em] editorial-on-dark-muted">TOP 5 ERREURS</div>
            <div className="mt-4 space-y-3">
              {[
                ["01", "Auteur interne dans les métadonnées", "editorial-danger"],
                ["02", "Commentaires de révision oubliés", "editorial-danger"],
                ["03", "Placeholders non remplacés", "editorial-warning"],
                ["04", "Ton IA détectable par le client", "editorial-warning"],
                ["05", "Prix de revient dans le suivi", "editorial-warning"],
              ].map(([index, label, tone]) => (
                <div key={index} className="flex items-center gap-4 rounded-lg bg-[#181816] px-4 py-3">
                  <span className={`text-sm font-extrabold ${tone}`}>{index}</span>
                  <span className="text-sm editorial-on-dark">{label}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {filteredArticles.map((article) => (
            <article key={article.slug} className="editorial-card-tight flex h-full flex-col overflow-hidden">
              <div className={`flex h-[70px] items-center px-5 text-3xl ${article.headerClass}`}>{article.icon}</div>
              <div className="flex h-full flex-col p-5">
                <div className={`inline-flex w-fit rounded-full px-3 py-1 text-xs font-bold uppercase tracking-[0.16em] ${article.pillClass}`}>
                  {article.category}
                </div>
                <h3 className="mt-4 text-xl font-bold leading-7 text-foreground">{article.title}</h3>
                <p className="mt-3 text-sm leading-6 text-muted-foreground">{article.excerpt}</p>
                <div className="mt-5 text-sm text-muted-foreground">{article.meta}</div>
                <Link to="/blog/$slug" params={{ slug: article.slug }} className="mt-5 text-sm font-semibold editorial-purple-text">
                  Lire →
                </Link>
              </div>
            </article>
          ))}
        </section>

        <section className="editorial-purple-bg mt-14 rounded-xl px-6 py-6 lg:px-8 lg:py-7">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h2 className="text-2xl font-bold text-white">Recevez nos meilleurs articles chaque semaine.</h2>
              <p className="mt-2 text-sm text-[#d9d4ff]">Conseils, guides et ressources pour les professionnels B2B.</p>
            </div>

            <form
              className="flex w-full max-w-xl flex-col gap-3 sm:flex-row"
              onSubmit={(event) => {
                event.preventDefault();
                if (!email.trim()) {
                  return;
                }
                setSubmitted(true);
                window.location.href = `mailto:contact@mindorion.com?subject=${encodeURIComponent("Abonnement newsletter Mindorion")}&body=${encodeURIComponent(`Merci d'ajouter cette adresse à la newsletter : ${email.trim()}`)}`;
                setEmail("");
              }}
            >
              <Input
                type="email"
                placeholder="votre@email.com"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                className="h-11 flex-1 border-0 bg-white px-4 text-sm shadow-none"
                required
              />
              <Button type="submit" className="editorial-purple-bg-deep h-11 rounded-lg px-5 text-sm font-semibold text-white hover:opacity-95">
                S'abonner →
              </Button>
            </form>
          </div>
          {submitted ? <p className="mt-3 text-sm text-white/90">Votre demande d'abonnement est prête à être envoyée.</p> : null}
        </section>
      </div>
    </div>
  );
}
