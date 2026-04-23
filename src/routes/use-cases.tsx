import { Link, createFileRoute } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { useTranslation } from "react-i18next";

import { FadeSection } from "@/components/FadeSection";
import { SEOHead } from "@/components/SEOHead";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { createStaticMeta } from "@/lib/site";

export const Route = createFileRoute("/use-cases")({
  head: () =>
    createStaticMeta({
      title: "Mindorion Solutions — Use cases by role",
      description: "Discover how Mindorion supports consultants, sales teams, HR and IT services across document and outreach workflows.",
      path: "/use-cases",
    }),
  component: UseCasesPage,
});

function UseCasesPage() {
  const { t } = useTranslation();
  const sections = t("useCases.sections", { returnObjects: true }) as Array<{
    id: string;
    title: string;
    text: string;
    problems: string[];
  }>;
  const ctas = ["/products/qualion", "/products/prospectiq", "/products/qualion", "/products/qualion"] as const;

  return (
    <div className="section-shell section-space">
      <SEOHead title={t("useCases.seoTitle")} description={t("useCases.seoDescription")} path="/use-cases" />
      <FadeSection className="max-w-4xl">
        <h1 className="text-4xl font-extrabold text-foreground sm:text-5xl">{t("useCases.title")}</h1>
        <p className="mt-5 text-lg leading-8 text-muted-foreground">{t("useCases.subtitle")}</p>
      </FadeSection>

      <div className="mt-14 space-y-10">
        {sections.map((section, index) => (
          <FadeSection key={section.id} className="scroll-mt-28" delay={index * 0.05}>
            <section id={section.id} className="rounded-lg border border-border/80 bg-card p-8 lg:p-10">
              <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
                <div>
                  <div className="eyebrow">Use case</div>
                  <h2 className="mt-3 text-3xl font-bold text-foreground">{section.title}</h2>
                  <p className="mt-4 max-w-2xl text-lg leading-8 text-muted-foreground">{section.text}</p>
                  <div className="mt-8">
                    <Link to={ctas[index]}>
                      <Button>
                        {t("common.learnMore")}
                        <ArrowRight className="h-4 w-4" />
                      </Button>
                    </Link>
                  </div>
                </div>
                <Card className="rounded-lg bg-muted/25 shadow-none">
                  <CardContent className="p-6">
                    <div className="text-sm font-bold uppercase tracking-[0.18em] text-muted-foreground">Top challenges</div>
                    <ul className="mt-5 space-y-3">
                      {section.problems.map((problem) => (
                        <li key={problem} className="rounded-lg border border-border/70 bg-card px-4 py-4 text-sm leading-6 text-muted-foreground">
                          {problem}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </section>
          </FadeSection>
        ))}
      </div>
    </div>
  );
}
