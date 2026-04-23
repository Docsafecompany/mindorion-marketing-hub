import { createFileRoute } from "@tanstack/react-router";
import { MapPin, Sparkles, Users } from "lucide-react";
import { useTranslation } from "react-i18next";

import { FadeSection } from "@/components/FadeSection";
import { SEOHead } from "@/components/SEOHead";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { createStaticMeta } from "@/lib/site";

export const Route = createFileRoute("/about")({
  head: () =>
    createStaticMeta({
      title: "About Mindorion",
      description: "Discover Mindorion's mission, team and values for protecting the professional reputation of B2B teams.",
      path: "/about",
    }),
  component: AboutPage,
});

function AboutPage() {
  const { t } = useTranslation();
  const team = t("about.team", { returnObjects: true }) as Array<{ name: string; role: string; bio: string }>;
  const values = t("about.values", { returnObjects: true }) as Array<{ title: string; text: string }>;

  return (
    <div className="section-shell section-space">
      <SEOHead title={t("about.seoTitle")} description={t("about.seoDescription")} path="/about" />
      <FadeSection className="hero-wash max-w-4xl rounded-[28px] px-6 py-12 text-center">
        <h1 className="text-[32px] font-bold leading-tight text-foreground md:text-[48px] lg:text-[56px]">{t("about.title").split(" ").map((word, index) => <span key={`${word}-${index}`}>{index === 3 ? <span className="brand-gradient-text">{word}</span> : word}{index < t("about.title").split(" ").length - 1 ? " " : ""}</span>)}</h1>
      </FadeSection>
      <FadeSection className="mt-12 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]" delay={0.1}>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-3 text-2xl"><Sparkles className="h-5 w-5 text-primary" />{t("about.missionTitle")}</CardTitle>
          </CardHeader>
          <CardContent><p className="text-lg leading-8 text-muted-foreground">{t("about.missionText")}</p></CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-3 text-2xl"><MapPin className="h-5 w-5 text-primary" />{t("about.locationTitle")}</CardTitle>
          </CardHeader>
          <CardContent><p className="text-lg leading-8 text-muted-foreground">{t("about.locationText")}</p></CardContent>
        </Card>
      </FadeSection>
      <FadeSection className="mt-14" delay={0.15}>
        <div className="mb-6 flex items-center gap-3 text-2xl font-bold text-foreground"><Users className="h-5 w-5 text-primary" />{t("about.teamTitle")}</div>
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {team.map((member) => (
            <Card key={member.name}>
              <CardContent className="p-6">
                <div className="brand-icon mb-4 flex h-14 w-14 items-center justify-center rounded-full text-lg font-bold text-primary">{member.name.split(" ").map((part) => part[0]).join("")}</div>
                <h2 className="text-lg font-semibold text-foreground">{member.name}</h2>
                <div className="mt-1 text-sm font-medium text-primary">{member.role}</div>
                <p className="mt-4 text-sm leading-6 text-muted-foreground">{member.bio}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </FadeSection>
      <FadeSection className="mt-14" delay={0.2}>
        <div className="mb-6 text-2xl font-bold text-foreground">{t("about.valuesTitle")}</div>
        <div className="grid gap-5 md:grid-cols-3">
          {values.map((value) => (
            <Card key={value.title}>
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-foreground">{value.title}</h3>
                <p className="mt-3 text-sm leading-6 text-muted-foreground">{value.text}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </FadeSection>
    </div>
  );
}
