import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Target, Lock, Zap, Linkedin } from "lucide-react";
import { useTranslation } from "react-i18next";

import { Button } from "@/components/ui/button";
import { LINKEDIN_URL, createStaticMeta } from "@/lib/site";
import { trackEvent } from "@/lib/analytics";
import camilleImg from "@/assets/founder-camille.jpg";
import romainImg from "@/assets/founder-romain.png";

export const Route = createFileRoute("/why-mindorion")({
  head: () =>
    createStaticMeta({
      title: "Why Mindorion | Operational Foundation for Engineering & IT Services",
      description:
        "Mindorion standardizes workflows, structures enterprise data and aligns execution with strategy so organizations can scale with governance, compliance and efficient AI adoption.",
      path: "/why-mindorion",
    }),
  component: WhyMindorionPage,
});

function WhyMindorionPage() {
  const { t } = useTranslation();

  const founders = [
    {
      photo: romainImg,
      photoClassName: "object-top",
      name: "Camille-Aurélien Baltaze",
      roleKey: "founders.camille.role",
      locationKey: "founders.camille.location",
      linkedinUrl: "https://www.linkedin.com/in/camille-aur%C3%A9lien-baltaze",
      quoteKey: "founders.camille.quote",
      educationKey: "founders.camille.education" as string | undefined,
    },
    {
      photo: camilleImg,
      photoClassName: "scale-125 object-center",
      name: "Romain Ortis",
      roleKey: "founders.romain.role",
      locationKey: "founders.romain.location",
      linkedinUrl: "https://www.linkedin.com/in/romain-ortis-a97423113",
      quoteKey: "founders.romain.quote",
      educationKey: undefined as string | undefined,
    },
  ];

  const principles = [
    {
      icon: Target,
      title: "Outcomes first",
      body: "Every workflow must improve proposal quality, commercial execution or governance.",
    },
    {
      icon: Lock,
      title: "Private by design",
      body: "Sensitive client and operational data stays controlled.",
    },
    {
      icon: Zap,
      title: "Radical simplicity",
      body: "Complex workflows, simple execution.",
    },
  ];

  return (
    <div className="section-shell section-space space-y-8">
      {/* Hero */}
      <section className="rounded-xl bg-[var(--color-about-dark)] px-6 py-12 text-white lg:px-8 lg:py-16">
        <div className="mx-auto max-w-4xl text-center">
          <h1 className="headline-balance text-4xl font-extrabold leading-tight sm:text-5xl lg:text-6xl">
            Building the operational foundation for scalable Engineering &amp; IT Services firms.
          </h1>
          <p className="mx-auto mt-6 max-w-3xl text-base leading-7 text-[var(--color-about-dark-muted)] sm:text-lg">
            Mindorion standardizes workflows, structures enterprise data and aligns execution with strategy — so organizations can scale with governance, compliance and efficient AI adoption.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link to="/contact" onClick={() => trackEvent("cta_clicked", { cta: "why_mindorion_demo" })}>
              <Button size="lg" className="min-w-44 gap-1 rounded-xl bg-[var(--color-pricing-primary)] text-white shadow-none hover:bg-[var(--color-pricing-primary)]/95">
                Request a demo
              </Button>
            </Link>
            <Link to="/products/proposaliq" onClick={() => trackEvent("cta_clicked", { cta: "why_mindorion_explore" })}>
              <Button size="lg" variant="outline" className="min-w-44 rounded-xl border-white/20 text-white hover:bg-white/10 hover:text-white">
                Explore products
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Problem */}
      <section className="rounded-xl border border-[var(--color-about-card-border)] bg-card px-6 py-10 sm:px-8 lg:py-14">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="headline-balance text-3xl font-extrabold leading-tight text-foreground sm:text-4xl">
            Growth creates complexity faster than the organization can absorb it.
          </h2>
          <p className="mx-auto mt-5 max-w-3xl text-sm leading-7 text-muted-foreground sm:text-base">
            As Engineering &amp; IT Services firms grow, execution becomes harder to control. Data lives across CRMs, Excel files, emails, proposals and local drives. Teams develop their own ways of working. Reporting becomes manual. Decisions are made on incomplete information.
          </p>
        </div>
      </section>

      {/* Foundation thesis + pyramid */}
      <section className="rounded-xl border border-[var(--color-about-card-border)] bg-card px-6 py-10 sm:px-8 lg:py-14">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-lg font-semibold text-foreground sm:text-xl">
            AI is not the foundation. AI becomes scalable when data, workflows and governance are already structured.
          </p>
        </div>

        <div className="mx-auto mt-10 flex max-w-3xl flex-col-reverse items-center gap-1.5 sm:gap-2">
          {/* Bottom — widest */}
          <div className="w-full rounded-xl editorial-purple-bg px-5 py-5 text-center text-white sm:px-6 sm:py-6">
            <div className="text-xs font-bold uppercase tracking-[0.14em] opacity-80">Base</div>
            <div className="mt-1 text-sm font-semibold sm:text-base">Mindorion Operating System — the workflow layer where operational activity happens</div>
          </div>
          <div className="w-[92%] rounded-xl editorial-purple-soft px-5 py-5 text-center sm:px-6 sm:py-6">
            <div className="text-xs font-bold uppercase tracking-[0.14em] opacity-70">Process</div>
            <div className="mt-1 text-sm font-semibold sm:text-base">Standardized workflows — teams execute processes consistently</div>
          </div>
          <div className="w-[84%] rounded-xl editorial-green-soft px-5 py-5 text-center sm:px-6 sm:py-6">
            <div className="text-xs font-bold uppercase tracking-[0.14em] opacity-70">Data</div>
            <div className="mt-1 text-sm font-semibold sm:text-base">Structured enterprise data — fragmented activity becomes usable decision data</div>
          </div>
          <div className="w-[76%] rounded-xl editorial-amber-soft px-5 py-5 text-center sm:px-6 sm:py-6">
            <div className="text-xs font-bold uppercase tracking-[0.14em] opacity-70">Control</div>
            <div className="mt-1 text-sm font-semibold sm:text-base">Governance &amp; compliance — control, auditability and trust</div>
          </div>
          {/* Top — narrowest */}
          <div className="w-[68%] rounded-xl bg-[#1e3a5f] px-5 py-5 text-center text-white sm:px-6 sm:py-6">
            <div className="text-xs font-bold uppercase tracking-[0.14em] opacity-80">Result</div>
            <div className="mt-1 text-sm font-semibold sm:text-base">Efficient AI adoption — more accurate, cost-efficient and compliant, as a result</div>
          </div>
        </div>
      </section>

      {/* Why Engineering & IT Services first */}
      <section className="rounded-xl border border-[var(--color-about-card-border)] bg-card px-6 py-10 sm:px-8 lg:py-14">
        <div className="mx-auto max-w-3xl text-center">
          <div className="text-xs font-bold uppercase tracking-[0.18em] text-muted-foreground">Focus</div>
          <h2 className="headline-balance mx-auto mt-4 text-3xl font-extrabold leading-tight text-foreground sm:text-4xl">
            Why Engineering &amp; IT Services first
          </h2>
          <p className="mx-auto mt-5 max-w-3xl text-sm leading-7 text-muted-foreground sm:text-base">
            We start here because these firms combine complex pre-sales, technical delivery, talent allocation, account growth and compliance. We know these workflows deeply. The same foundation can later expand to other complex service industries.
          </p>
        </div>
      </section>

      {/* The Mindorion approach */}
      <section className="rounded-xl border border-[var(--color-about-card-border)] bg-card px-6 py-10 sm:px-8 lg:py-14">
        <div className="mx-auto max-w-3xl text-center">
          <div className="text-xs font-bold uppercase tracking-[0.18em] text-muted-foreground">Approach</div>
          <h2 className="headline-balance mx-auto mt-4 text-3xl font-extrabold leading-tight text-foreground sm:text-4xl">
            The Mindorion approach
          </h2>
          <p className="mx-auto mt-5 max-w-3xl text-sm leading-7 text-muted-foreground sm:text-base">
            ProposalIQ structures pre-sales and proposal execution. GrowthIQ aligns commercial strategy with operational activity. Future modules extend the same foundation to delivery, talent and governance. Together, they turn fragmented operations into decision-ready intelligence.
          </p>
        </div>
      </section>

      {/* Founders — after the market thesis */}
      <section className="space-y-8">
        <div className="text-center">
          <div className="text-xs font-bold uppercase tracking-[0.18em] text-[var(--color-pricing-primary)]">Founders</div>
          <h2 className="headline-balance mx-auto mt-4 max-w-3xl text-3xl font-extrabold leading-tight text-foreground sm:text-4xl">
            Built by people who lived the scaling problem.
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-muted-foreground">
            Mindorion was created by operators who have seen how Engineering &amp; IT Services firms lose efficiency when proposals, pipeline, delivery and reporting become fragmented.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {founders.map((f) => (
            <article key={f.name} className="rounded-xl border border-[var(--color-about-card-border)] bg-card p-6">
              <div className="flex items-start gap-4">
                <div className="h-16 w-16 shrink-0 overflow-hidden rounded-full">
                  <img
                    src={f.photo}
                    alt={f.name}
                    className={`h-full w-full object-cover ${f.photoClassName ?? ""}`}
                    loading="lazy"
                  />
                </div>
                <div className="min-w-0">
                  <div className="text-xl font-bold text-foreground">{f.name}</div>
                  <div className="mt-1 text-sm text-muted-foreground">{t(f.roleKey)}</div>
                  <div className="mt-1 text-xs text-muted-foreground">{t(f.locationKey)} · Mindorion</div>
                </div>
              </div>
              <div className="mt-5 flex flex-wrap gap-2">
                <a
                  href={f.linkedinUrl}
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => trackEvent("social_clicked", { platform: "linkedin", context: `founder_${f.name}` })}
                  className="inline-flex items-center gap-1.5 rounded-full border border-[var(--color-about-card-border)] px-3 py-1.5 text-sm font-medium text-foreground transition-colors hover:bg-[var(--color-pricing-primary-soft)]"
                >
                  <Linkedin className="h-4 w-4" />
                  LinkedIn
                </a>
              </div>
              <blockquote className="mt-5 border-l-2 border-[var(--color-pricing-primary)] pl-4 text-sm italic leading-7 text-muted-foreground">
                “{t(f.quoteKey)}”
              </blockquote>
              {f.educationKey ? (
                <div className="mt-5 text-xs text-muted-foreground">
                  <span className="font-semibold text-foreground">{t("founders.educationLabel")} :</span>{" "}
                  {t(f.educationKey)}
                </div>
              ) : null}
            </article>
          ))}
        </div>

        {/* Built with operators — transparency as secondary */}
        <article className="rounded-xl bg-[var(--color-pricing-primary)] p-6 text-white sm:p-8">
          <div className="mx-auto max-w-3xl text-center">
            <div className="text-xs font-bold uppercase tracking-[0.18em] text-[var(--color-pricing-primary-soft)]">
              Built with operators
            </div>
            <h3 className="mt-4 text-2xl font-extrabold leading-tight sm:text-3xl">
              Designed with the teams who run pre-sales, pipeline and delivery every day.
            </h3>
            <p className="mt-4 text-sm leading-7 text-[var(--color-pricing-primary-soft)]">
              Every workflow is shaped by operators inside Engineering &amp; IT Services firms. Transparency on roadmap and learnings is part of how we work — as a secondary commitment, not the headline.
            </p>
          </div>
        </article>
      </section>

      {/* Principles */}
      <section className="space-y-6">
        <div className="text-center">
          <div className="text-xs font-bold uppercase tracking-[0.18em] text-muted-foreground">Principles</div>
          <h2 className="headline-balance mx-auto mt-4 max-w-3xl text-3xl font-extrabold leading-tight text-foreground sm:text-4xl">
            How we build for Engineering &amp; IT Services teams
          </h2>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {principles.map(({ icon: Icon, title, body }) => (
            <article key={title} className="rounded-xl border border-[var(--color-about-card-border)] bg-card p-6">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[var(--color-pricing-primary-soft)] text-[var(--color-pricing-primary)]">
                <Icon className="h-5 w-5" />
              </div>
              <h3 className="mt-5 text-xl font-bold text-foreground">{title}</h3>
              <p className="mt-4 text-sm leading-7 text-muted-foreground">{body}</p>
            </article>
          ))}
        </div>
      </section>

      {/* Final CTA */}
      <section className="rounded-xl bg-[var(--color-about-dark)] px-6 py-10 text-center sm:px-8 lg:py-14">
        <h2 className="headline-balance mx-auto max-w-3xl text-3xl font-extrabold leading-tight text-white sm:text-4xl">
          Ready to build the foundation for scalable growth?
        </h2>
        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link to="/contact" onClick={() => trackEvent("cta_clicked", { cta: "why_mindorion_final_demo" })}>
            <Button size="lg" className="min-w-44 gap-1 rounded-xl bg-[var(--color-pricing-primary)] text-white shadow-none hover:bg-[var(--color-pricing-primary)]/95">
              Request a demo
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
          <Link to="/products/proposaliq" onClick={() => trackEvent("cta_clicked", { cta: "why_mindorion_final_explore" })}>
            <Button size="lg" variant="outline" className="min-w-44 rounded-xl border-white/20 text-white hover:bg-white/10 hover:text-white">
              Explore products
            </Button>
          </Link>
        </div>
        <div className="mt-6 text-xs text-[var(--color-about-dark-muted)]">
          Also on{" "}
          <a
            href={LINKEDIN_URL}
            target="_blank"
            rel="noreferrer"
            onClick={() => trackEvent("social_clicked", { platform: "linkedin", context: "why_mindorion_footer" })}
            className="inline-flex items-center gap-1 underline-offset-2 hover:underline"
          >
            <Linkedin className="h-3.5 w-3.5" />
            LinkedIn
          </a>
        </div>
      </section>
    </div>
  );
}
