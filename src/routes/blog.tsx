import { useMemo, useState } from "react";
import { Link, createFileRoute } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";

import i18n from "@/i18n";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { createStaticMeta } from "@/lib/site";
import { trackEvent } from "@/lib/analytics";

const blogHead = () => {
  const lang = i18n.language?.slice(0, 2) === "fr" ? "fr" : "en";
  if (lang === "fr") {
    return {
      title: "Blog | Conseils et guides professionnels B2B | Mindorion",
      description: "Articles, guides et ressources pour les professionnels B2B — réputation documentaire, prospection intelligente et conformité.",
    };
  }
  return {
    title: "Blog | B2B professional tips and guides | Mindorion",
    description: "Articles, guides and resources for B2B professionals — document reputation, intelligent prospecting and compliance.",
  };
};

export const Route = createFileRoute("/blog")({
  head: () => createStaticMeta({ ...blogHead(), path: "/blog" }),
  component: BlogPage,
});

type BlogFilter = "all" | "Proposal IQ" | "Growth IQ" | "GovernanceIQ" | "Guides";

const featuredArticle = { slug: "track-changes-proposals" };

const blogCards = [
  { slug: "remove-metadata-word-before-sending", filter: "Proposal IQ",     icon: "🛡", categoryKey: "blog.page.categories.proposaliq",    headerClass: "editorial-purple-soft", pillClass: "editorial-purple-soft" },
  { slug: "hidden-risks-documents",              filter: "Growth IQ",  icon: "🎯", categoryKey: "blog.page.categories.growthiq", headerClass: "editorial-green-soft",  pillClass: "editorial-green-soft" },
  { slug: "roi-document-cleanup",                filter: "GovernanceIQ",icon: "📋", categoryKey: "blog.page.categories.governance", headerClass: "editorial-amber-soft",  pillClass: "editorial-amber-soft" },
  { slug: "consulting-quality-gate",             filter: "Guides",      icon: "💼", categoryKey: "blog.page.categories.guide",      headerClass: "editorial-gray-soft",   pillClass: "editorial-gray-soft" },
  { slug: "what-gets-cleaned",                   filter: "Proposal IQ",     icon: "📄", categoryKey: "blog.page.categories.proposaliq",    headerClass: "editorial-purple-soft", pillClass: "editorial-purple-soft" },
  { slug: "track-changes-proposals",             filter: "Growth IQ",  icon: "🔍", categoryKey: "blog.page.categories.growthiq", headerClass: "editorial-green-soft",  pillClass: "editorial-green-soft" },
] as const;

const topErrorTones = ["editorial-danger", "editorial-danger", "editorial-warning", "editorial-warning", "editorial-warning"] as const;

function BlogPage() {
  const { t } = useTranslation();
  const [activeFilter, setActiveFilter] = useState<BlogFilter>("all");
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const filterTags: { label: string; value: BlogFilter }[] = [
    { label: t("blog.page.filterAll"), value: "all" },
    { label: "🛡 Proposal IQ", value: "Proposal IQ" },
    { label: "🎯 Growth IQ", value: "Growth IQ" },
    { label: "📋 GovernanceIQ", value: "GovernanceIQ" },
    { label: t("blog.page.filterGuides"), value: "Guides" },
  ];

  const cards = t("blog.page.cards", { returnObjects: true }) as Array<{ title: string; excerpt: string; meta: string }>;
  const topErrors = t("blog.page.featured.topErrors", { returnObjects: true }) as string[];
  const head = blogHead();

  const filteredArticles = useMemo(
    () => (activeFilter === "all" ? blogCards.map((c, i) => ({ ...c, copy: cards[i] })) : blogCards.map((c, i) => ({ ...c, copy: cards[i] })).filter((article) => article.filter === activeFilter)),
    [activeFilter, cards],
  );

  return (
    <div className="editorial-page font-pricing">
      <div className="section-shell section-space">

        <section className="mx-auto max-w-4xl text-center">
          <div className="text-xs font-bold uppercase tracking-[0.22em] editorial-purple-text">{t("blog.page.eyebrow")}</div>
          <h1 className="mt-4 text-balance text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl">
            {t("blog.page.title")}
          </h1>
          <p className="mx-auto mt-5 max-w-3xl text-balance text-base leading-7 text-muted-foreground sm:text-lg">
            {t("blog.page.subtitle")}
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
              <span className="rounded-full px-3 py-1 text-xs font-bold uppercase tracking-[0.16em] editorial-purple-soft">🛡 {t("blog.page.categories.proposaliq")}</span>
              <span className="rounded-full px-3 py-1 text-xs font-bold uppercase tracking-[0.16em] editorial-dark-soft">{t("blog.page.featured.tagGuide")}</span>
            </div>
            <h2 className="mt-5 text-balance text-3xl font-extrabold leading-tight editorial-on-dark sm:text-4xl">
              {t("blog.page.featured.title")}
            </h2>
            <p className="mt-4 max-w-2xl text-base leading-7 editorial-on-dark-muted">
              {t("blog.page.featured.excerpt")}
            </p>
            <div className="mt-6 text-sm editorial-on-dark-muted">{t("blog.page.featured.meta")}</div>
            <Link
              to="/blog/$slug"
              params={{ slug: featuredArticle.slug }}
              className="mt-8 inline-flex"
              onClick={() => trackEvent("blog_article_clicked", { slug: featuredArticle.slug, location: "featured" })}
            >
              <Button className="editorial-purple-bg rounded-lg px-5 text-sm font-semibold text-white hover:opacity-95">{t("blog.page.readArticle")}</Button>
            </Link>
          </div>

          <div className="editorial-dark-panel rounded-xl p-5">
            <div className="text-xs font-bold uppercase tracking-[0.2em] editorial-on-dark-muted">{t("blog.page.featured.topErrorsTitle")}</div>
            <div className="mt-4 space-y-3">
              {topErrors.map((label, i) => (
                <div key={label} className="flex items-center gap-4 rounded-lg bg-[#181816] px-4 py-3">
                  <span className={`text-sm font-extrabold ${topErrorTones[i]}`}>{String(i + 1).padStart(2, "0")}</span>
                  <span className="text-sm editorial-on-dark">{label}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {filteredArticles.map((article) => (
            <article key={`${article.slug}-${article.filter}`} className="editorial-card-tight flex h-full flex-col overflow-hidden">
              <div className={`flex h-[70px] items-center px-5 text-3xl ${article.headerClass}`}>{article.icon}</div>
              <div className="flex h-full flex-col p-5">
                <div className={`inline-flex w-fit rounded-full px-3 py-1 text-xs font-bold uppercase tracking-[0.16em] ${article.pillClass}`}>
                  {t(article.categoryKey)}
                </div>
                <h3 className="mt-4 text-xl font-bold leading-7 text-foreground">{article.copy.title}</h3>
                <p className="mt-3 text-sm leading-6 text-muted-foreground">{article.copy.excerpt}</p>
                <div className="mt-5 text-sm text-muted-foreground">{article.copy.meta}</div>
                <Link
                  to="/blog/$slug"
                  params={{ slug: article.slug }}
                  className="mt-5 text-sm font-semibold editorial-purple-text"
                  onClick={() => trackEvent("blog_article_clicked", { slug: article.slug, location: "list" })}
                >
                  {t("blog.page.read")}
                </Link>
              </div>
            </article>
          ))}
        </section>

        <section className="editorial-purple-bg mt-14 rounded-xl px-6 py-6 lg:px-8 lg:py-7">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h2 className="text-2xl font-bold text-white">{t("blog.page.newsletter.title")}</h2>
              <p className="mt-2 text-sm text-[#d9d4ff]">{t("blog.page.newsletter.subtitle")}</p>
            </div>

            <form
              className="flex w-full max-w-xl flex-col gap-3 sm:flex-row"
              onSubmit={(event) => {
                event.preventDefault();
                if (!email.trim()) {
                  return;
                }
                setSubmitted(true);
                window.location.href = `mailto:contact@mindorion.com?subject=${encodeURIComponent(t("blog.page.newsletter.mailSubject"))}&body=${encodeURIComponent(`${t("blog.page.newsletter.mailBody")} ${email.trim()}`)}`;
                setEmail("");
              }}
            >
              <Input
                type="email"
                placeholder={t("blog.page.newsletter.placeholder")}
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                className="h-11 flex-1 border-0 bg-white px-4 text-sm shadow-none"
                required
              />
              <Button type="submit" className="editorial-purple-bg-deep h-11 rounded-lg px-5 text-sm font-semibold text-white hover:opacity-95">
                {t("blog.page.newsletter.submit")}
              </Button>
            </form>
          </div>
          {submitted ? <p className="mt-3 text-sm text-white/90">{t("blog.page.newsletter.success")}</p> : null}
        </section>
      </div>
    </div>
  );
}
