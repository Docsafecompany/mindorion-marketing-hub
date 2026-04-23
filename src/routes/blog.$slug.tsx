import { Link, createFileRoute, notFound, useRouter } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";

import { SEOHead } from "@/components/SEOHead";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { getBlogPost } from "@/lib/site-data";
import { createStaticMeta } from "@/lib/site";

function BlogArticleError({ error, reset }: { error: Error; reset: () => void }) {
  const router = useRouter();
  return (
    <div className="section-shell py-20">
      <Card className="mx-auto max-w-xl rounded-lg p-8 text-center">
        <h1 className="text-2xl font-bold text-foreground">Article unavailable</h1>
        <p className="mt-4 text-muted-foreground">{error.message}</p>
        <div className="mt-6 flex justify-center gap-3">
          <Button onClick={() => { router.invalidate(); reset(); }}>Retry</Button>
          <Link to="/blog"><Button variant="outline">Back to blog</Button></Link>
        </div>
      </Card>
    </div>
  );
}

function BlogArticleNotFound() {
  return (
    <div className="section-shell py-20">
      <Card className="mx-auto max-w-xl rounded-lg p-8 text-center">
        <h1 className="text-2xl font-bold text-foreground">Article not found</h1>
        <p className="mt-4 text-muted-foreground">The requested article does not exist.</p>
        <div className="mt-6 flex justify-center"><Link to="/blog"><Button>Back to blog</Button></Link></div>
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
  head: ({ loaderData }) =>
    createStaticMeta({
      title: loaderData.post.slug.replaceAll("-", " "),
      description: loaderData.post.description,
      path: `/blog/${loaderData.post.slug}`,
    }),
  component: BlogArticlePage,
  errorComponent: BlogArticleError,
  notFoundComponent: BlogArticleNotFound,
});

function BlogArticlePage() {
  const { t } = useTranslation();
  const { post } = Route.useLoaderData();

  return (
    <div className="section-shell section-space">
      <SEOHead title={t(post.titleKey)} description={post.description} path={`/blog/${post.slug}`} />
      <div className="grid gap-10 lg:grid-cols-[280px_minmax(0,1fr)]">
        <aside className="lg:sticky lg:top-24 lg:self-start">
          <div className="rounded-lg border border-border/80 bg-card p-6">
            <Link to="/blog" className="text-sm font-semibold text-primary">← {t("blog.back")}</Link>
            <h1 className="mt-5 text-2xl font-bold text-foreground">{t(post.titleKey)}</h1>
            <div className="mt-6 text-sm font-bold uppercase tracking-[0.18em] text-muted-foreground">{t("blog.toc")}</div>
            <nav className="mt-4 space-y-3 text-sm">
              {post.sections.map((section) => (
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
            {post.sections.map((section) => (
              <section key={section.id} id={section.id} className="scroll-mt-28">
                <h2 className="text-3xl font-bold text-foreground">{t(section.headingKey)}</h2>
                <p className="mt-4 text-lg leading-8 text-muted-foreground">{t(section.bodyKey)}</p>
              </section>
            ))}
          </div>
        </article>
      </div>
    </div>
  );
}
