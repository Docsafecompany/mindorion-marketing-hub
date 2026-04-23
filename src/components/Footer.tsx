import { Link } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";

import { Button } from "@/components/ui/button";
import { setLanguage, type SiteLanguage } from "@/i18n";
import { LINKEDIN_URL } from "@/lib/site";
import { BrandMark } from "./BrandMark";

export function Footer() {
  const { t, i18n } = useTranslation();
  const current = (i18n.language?.slice(0, 2) === "fr" ? "fr" : "en") as SiteLanguage;
  const nextLanguage: SiteLanguage = current === "fr" ? "en" : "fr";

  const productLinks = [
    { label: "Qualion", to: "/products/qualion" },
    { label: "ProspectIQ", to: "/products/prospectiq" },
    { label: "GovernanceIQ", to: "/products/governanceiq" },
    { label: t("nav.pricing"), to: "/pricing" },
  ];

  const solutionLinks: Array<{ label: string; to: string; hash?: `#${string}` }> = [
    { label: t("footer.solutionItems.0"), to: "/use-cases", hash: "#consultants" },
    { label: t("footer.solutionItems.1"), to: "/use-cases", hash: "#sales" },
    { label: t("footer.solutionItems.2"), to: "/use-cases", hash: "#rh" },
    { label: t("footer.solutionItems.3"), to: "/use-cases", hash: "#esn" },
  ];

  const resourceLinks = [
    { label: "Blog", to: "/blog" },
    { label: t("footer.useCases"), to: "/use-cases" },
    { label: t("footer.about"), to: "/about" },
  ];

  const legalLinks = [
    { label: t("footer.privacy"), to: "/legal/privacy" },
    { label: t("footer.terms"), to: "/legal/terms" },
    { label: t("footer.security"), to: "/security" },
  ];

  return (
    <footer className="border-t border-border/80 bg-background">
      <div className="section-shell py-14">
        <div className="grid gap-10 md:grid-cols-2 xl:grid-cols-[1.35fr_repeat(3,1fr)]">
          <div className="space-y-5">
            <BrandMark className="h-8 brightness-0 invert" />
            <p className="max-w-sm text-sm leading-6 text-muted-foreground">{t("footer.brandText")}</p>
            <div className="flex flex-wrap gap-3">
              <a href={LINKEDIN_URL} target="_blank" rel="noreferrer">
                <Button variant="outline" className="border-border/80 bg-card/90">{t("footer.linkedin")}</Button>
              </a>
              <a href={`mailto:${t("site.contactEmail")}`}>
                <Button variant="outline" className="border-border/80 bg-card/90">{t("site.contactEmail")}</Button>
              </a>
            </div>
          </div>

          <div>
            <div className="mb-4 text-sm font-bold uppercase tracking-[0.18em] text-muted-foreground">{t("footer.products")}</div>
            <div className="space-y-3 text-sm">
              {productLinks.map((item) => (
                <Link key={item.label} to={item.to} className="block text-muted-foreground transition-colors hover:text-foreground">
                  {item.label}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <div className="mb-4 text-sm font-bold uppercase tracking-[0.18em] text-muted-foreground">{t("footer.solutions")}</div>
            <div className="space-y-3 text-sm">
              {solutionLinks.map((item) => (
                <Link key={item.label} to={item.to} className="block text-muted-foreground transition-colors hover:text-foreground">
                  {item.label}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <div className="mb-4 text-sm font-bold uppercase tracking-[0.18em] text-muted-foreground">{t("footer.resources")}</div>
            <div className="space-y-3 text-sm">
              {resourceLinks.map((item) => (
                <Link key={item.label} to={item.to} className="block text-muted-foreground transition-colors hover:text-foreground">
                  {item.label}
                </Link>
              ))}
              <a href={`mailto:${t("site.contactEmail")}`} className="block text-muted-foreground transition-colors hover:text-foreground">
                {t("footer.contact")}
              </a>
            </div>
            <div className="my-5 h-px bg-border/80" />
            <div className="space-y-3 text-sm">
              {legalLinks.map((item) => (
                <Link key={item.label} to={item.to} className="block text-muted-foreground transition-colors hover:text-foreground">
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-3 border-t border-border pt-6 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <span>{t("site.copyright")}</span>
          <button className="font-semibold hover:text-foreground" onClick={() => void setLanguage(nextLanguage)}>
            {t("site.switchLanguage")}
          </button>
        </div>
      </div>
    </footer>
  );
}
