import { useTranslation } from "react-i18next";
import { Linkedin, Sparkles, Target, Lock, Zap, type LucideIcon } from "lucide-react";

import { LINKEDIN_URL } from "@/lib/site";
import { trackEvent } from "@/lib/analytics";
import camilleImg from "@/assets/founder-camille.jpg";
import romainImg from "@/assets/founder-romain.png";

type Founder = {
  photo: string;
  photoClassName?: string;
  name: string;
  roleKey: string;
  locationKey: string;
  linkedinUrl: string;
  quoteKey: string;
  educationKey?: string;
};

const founders: Founder[] = [
  {
    photo: romainImg,
    photoClassName: "object-top",
    name: "Camille-Aurélien Baltaze",
    roleKey: "founders.camille.role",
    locationKey: "founders.camille.location",
    linkedinUrl: "https://www.linkedin.com/in/camille-aur%C3%A9lien-baltaze",
    quoteKey: "founders.camille.quote",
    educationKey: "founders.camille.education",
  },
];

type Pillar = { icon: LucideIcon; titleKey: string; bodyKey: string };

const valuePillars: Pillar[] = [
  { icon: Target, titleKey: "founders.pillars.roadmap.title", bodyKey: "founders.pillars.roadmap.body" },
  { icon: Lock, titleKey: "founders.pillars.pricing.title", bodyKey: "founders.pillars.pricing.body" },
  { icon: Zap, titleKey: "founders.pillars.feedback.title", bodyKey: "founders.pillars.feedback.body" },
];

function FounderCard({ founder }: { founder: Founder }) {
  const { t } = useTranslation();

  return (
    <article className="rounded-xl border border-[var(--color-about-card-border)] bg-card p-6">
      <div className="flex items-start gap-4">
        <div className="h-16 w-16 shrink-0 overflow-hidden rounded-full">
          <img
            src={founder.photo}
            alt={founder.name}
            className={`h-full w-full object-cover ${founder.photoClassName ?? ""}`}
            loading="lazy"
          />
        </div>
        <div className="min-w-0">
          <div className="text-xl font-bold text-foreground">{founder.name}</div>
          <div className="mt-1 text-sm text-muted-foreground">{t(founder.roleKey)}</div>
          <div className="mt-1 text-xs text-muted-foreground">
            {t(founder.locationKey)} · Mindorion
          </div>
        </div>
      </div>

      <div className="mt-5 flex flex-wrap gap-2">
        <a
          href={founder.linkedinUrl}
          target="_blank"
          rel="noreferrer"
          onClick={() => trackEvent("social_clicked", { platform: "linkedin", context: `founder_${founder.name}` })}
          className="inline-flex items-center gap-1.5 rounded-full border border-[var(--color-about-card-border)] px-3 py-1.5 text-sm font-medium text-foreground transition-colors hover:bg-[var(--color-pricing-primary-soft)]"
        >
          <Linkedin className="h-4 w-4" />
          LinkedIn
        </a>
      </div>

      <blockquote className="mt-5 border-l-2 border-[var(--color-pricing-primary)] pl-4 text-sm italic leading-7 text-muted-foreground">
        “{t(founder.quoteKey)}”
      </blockquote>

      {founder.educationKey ? (
        <div className="mt-5 text-xs text-muted-foreground">
          <span className="font-semibold text-foreground">{t("founders.educationLabel")} :</span>{" "}
          {t(founder.educationKey)}
        </div>
      ) : null}
    </article>
  );
}

export default function FoundersSection() {
  const { t } = useTranslation();

  return (
    <section className="space-y-8">
      <div className="text-center">
        <div className="inline-flex items-center gap-2 rounded-full border border-[var(--color-about-card-border)] bg-card px-3 py-1 text-xs font-bold uppercase tracking-[0.18em] text-[var(--color-pricing-primary)]">
          <Sparkles className="h-3.5 w-3.5" />
          {t("founders.badge")}
        </div>
        <h2 className="headline-balance mx-auto mt-4 max-w-3xl text-3xl font-extrabold leading-tight text-foreground sm:text-4xl">
          {t("founders.titlePrefix")}{" "}
          <span className="italic text-[var(--color-pricing-primary)]">{t("founders.titleHighlight")}</span>
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-muted-foreground">{t("founders.subtitle")}</p>
      </div>

      <div className="mx-auto grid max-w-xl gap-6">
        {founders.map((f) => (
          <FounderCard key={f.name} founder={f} />
        ))}
      </div>

      <article className="rounded-xl bg-[var(--color-pricing-primary)] p-6 text-white sm:p-8">
        <div className="grid gap-8 lg:grid-cols-[1.1fr_1fr]">
          <div>
            <div className="text-xs font-bold uppercase tracking-[0.18em] text-[var(--color-pricing-primary-soft)]">
              {t("founders.buildInPublic.badge")}
            </div>
            <h3 className="mt-4 text-3xl font-extrabold leading-tight">{t("founders.buildInPublic.title")}</h3>
            <p className="mt-4 text-sm leading-7 text-[var(--color-pricing-primary-soft)]">
              {t("founders.buildInPublic.body")}
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href={LINKEDIN_URL}
                target="_blank"
                rel="noreferrer"
                onClick={() => trackEvent("social_clicked", { platform: "linkedin", context: "company_follow" })}
                className="inline-flex items-center gap-1.5 rounded-xl bg-white px-4 py-2 text-sm font-semibold text-[var(--color-pricing-primary)] transition-colors hover:bg-white/90"
              >
                <Linkedin className="h-4 w-4" />
                {t("founders.buildInPublic.ctaFollow")}
              </a>
              <a
                href={LINKEDIN_URL}
                target="_blank"
                rel="noreferrer"
                onClick={() => trackEvent("social_clicked", { platform: "linkedin", context: "company_roadmap" })}
                className="inline-flex items-center gap-1 rounded-xl border border-white/30 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-white/10"
              >
                {t("founders.buildInPublic.ctaRoadmap")} →
              </a>
            </div>
          </div>

          <div className="grid gap-3">
            {valuePillars.map(({ icon: Icon, titleKey, bodyKey }) => (
              <div key={titleKey} className="flex items-start gap-3 rounded-lg bg-white/8 p-4 ring-1 ring-white/10">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white/10">
                  <Icon className="h-4 w-4" />
                </div>
                <div>
                  <div className="text-sm font-bold">{t(titleKey)}</div>
                  <div className="mt-1 text-xs leading-6 text-[var(--color-pricing-primary-soft)]">{t(bodyKey)}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </article>
    </section>
  );
}
