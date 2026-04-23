import { Link, createFileRoute } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";

import { FadeSection } from "@/components/FadeSection";
import { SEOHead } from "@/components/SEOHead";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { blogPosts } from "@/lib/site-data";
import { createStaticMeta } from "@/lib/site";

export const Route = createFileRoute("/blog")({
  head: () =>
    createStaticMeta({
      title: "Mindorion Blog — Guides and professional advice",
      description: "Mindorion articles on document quality, compliance, B2B outreach and operational best practices.",
      path: "/blog",
    }),
  component: BlogPage,
});

function BlogPage() {
  const { t } = useTranslation();

  return (
    <div className="section-shell section-space">
      <SEOHead title={t("blog.seoTitle")} description={t("blog.seoDescription")} path="/blog" />
      <FadeSection className="hero-wash max-w-4xl rounded-[28px] px-6 py-12 text-center">
        <h1 className="text-[32px] font-bold leading-tight text-foreground md:text-[48px] lg:text-[56px]">{t("blog.title").split(" ").map((word, index) => <span key={`${word}-${index}`}>{index === 0 ? <span className="brand-gradient-text">{word}</span> : word}{index < t("blog.title").split(" ").length - 1 ? " " : ""}</span>)}</h1>
        <p className="mx-auto mt-5 max-w-[600px] text-lg leading-8 text-muted-foreground">{t("blog.subtitle")}</p>
      </FadeSection>
      <FadeSection className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-3" delay={0.1}>
        {blogPosts.map((post) => (
          <Link key={post.slug} to="/blog/$slug" params={{ slug: post.slug }}>
            <Card className="h-full transition-transform duration-200 hover:-translate-y-1">
              <CardContent className="p-6">
                <Badge variant="outline" className="brand-badge rounded-full border-border bg-transparent text-primary">{t(post.categoryKey)}</Badge>
                <div className="mt-4 text-sm text-muted-foreground">{new Date(post.date).toLocaleDateString()}</div>
                <h2 className="mt-4 text-xl font-bold text-foreground">{t(post.titleKey)}</h2>
                <p className="mt-3 text-sm leading-6 text-muted-foreground">{t(post.excerptKey)}</p>
                <div className="mt-6 text-sm font-semibold text-primary">{t("common.readArticle")} →</div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </FadeSection>
    </div>
  );
}
