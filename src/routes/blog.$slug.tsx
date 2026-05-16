import { Link, createFileRoute, notFound, useRouter } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";

import { FinalCTA } from "@/components/FinalCTA";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { getBlogPost } from "@/lib/site-data";
import { createStaticMeta } from "@/lib/site";

type BlogSection = {
  id: string;
  headingKey: string;
  bodyKey: string;
};

function BlogArticleError({ error, reset }: { error: Error; reset: () => void }) {
  const router = useRouter();
  const { t } = useTranslation();
  return (
    <div className="section-shell py-20">
      <Card className="mx-auto max-w-xl rounded-lg p-8 text-center">
        <h1 className="text-2xl font-bold text-foreground">{t("blog.page.article.unavailable")}</h1>
        <p className="mt-4 text-muted-foreground">{error.message}</p>
        <div className="mt-6 flex justify-center gap-3">
          <Button onClick={() => { router.invalidate(); reset(); }}>{t("blog.page.article.retry")}</Button>
          <Link to="/blog"><Button variant="outline">{t("blog.page.article.back")}</Button></Link>
        </div>
      </Card>
    </div>
  );
}

function BlogArticleNotFound() {
  const { t } = useTranslation();
  return (
    <div className="section-shell py-20">
      <Card className="mx-auto max-w-xl rounded-lg p-8 text-center">
        <h1 className="text-2xl font-bold text-foreground">{t("blog.page.article.notFound")}</h1>
        <p className="mt-4 text-muted-foreground">{t("blog.page.article.notFoundText")}</p>
        <div className="mt-6 flex justify-center"><Link to="/blog"><Button>{t("blog.page.article.back")}</Button></Link></div>
      </Card>
    </div>
  );
}

export const Route = createFileRoute("/blog/$slug")({
  loader: ({ params }) => {
    const post = getBlogPost(params.slug);
    if (!post) {
      throw notFound();
    }
    return { post };
  },
  head: ({ loaderData, params }) => {
    if (!loaderData) {
      return createStaticMeta({
        title: "Mindorion Blog",
        description: "Mindorion articles on document quality, compliance and B2B workflows.",
        path: "/blog",
      });
    }

    const post = loaderData.post;
    const base = createStaticMeta({
      title: `${post.seoTitle} | Mindorion Blog`,
      description: post.description,
      path: `/blog/${params.slug}`,
    });
    return {
      ...base,
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            headline: post.seoTitle,
            description: post.description,
            datePublished: post.date,
            author: { "@type": "Organization", name: "Mindorion" },
            publisher: { "@type": "Organization", name: "Mindorion" },
            mainEntityOfPage: `https://mindorion.com/blog/${params.slug}`,
          }),
        },
      ],
    };
  },
  component: BlogArticlePage,
  errorComponent: BlogArticleError,
  notFoundComponent: BlogArticleNotFound,
});

function BlogArticlePage() {
  const { t } = useTranslation();
  const { post } = Route.useLoaderData();

  return (
    <div className="section-shell section-space">
      <div className="grid gap-10 lg:grid-cols-[280px_minmax(0,1fr)]">
        <aside className="lg:sticky lg:top-24 lg:self-start">
          <div className="rounded-2xl border border-border bg-card p-6">
            <Link to="/blog" className="text-sm font-semibold text-primary">← {t("blog.back")}</Link>
            <h1 className="mt-5 text-2xl font-bold text-foreground">{t(post.titleKey)}</h1>
            <div className="mt-6 text-sm font-bold uppercase tracking-[0.18em] text-muted-foreground">{t("blog.toc")}</div>
            <nav className="mt-4 space-y-3 text-sm">
              {post.sections.map((section: BlogSection) => (
                <a key={section.id} href={`#${section.id}`} className="block text-muted-foreground transition-colors hover:text-foreground">
                  {t(section.headingKey)}
                </a>
              ))}
            </nav>
          </div>
        </aside>
        <article className="max-w-3xl">
          <p className="text-lg leading-8 text-muted-foreground">{t(post.excerptKey)}</p>
          <div className="mt-10 space-y-10">
            {post.sections.map((section: BlogSection) => (
              <section key={section.id} id={section.id} className="scroll-mt-28">
                <h2 className="text-3xl font-bold text-foreground">{t(section.headingKey)}</h2>
                <p className="mt-4 text-lg leading-8 text-muted-foreground">{t(section.bodyKey)}</p>
              </section>
            ))}
          </div>
        </article>
      </div>
      <div className="mt-16 -mx-4 sm:-mx-6 lg:-mx-8"><FinalCTA /></div>
    </div>
  );
}
