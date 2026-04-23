import { Link } from "@tanstack/react-router";
import { Linkedin, Mail } from "lucide-react";
import { useTranslation } from "react-i18next";

import { Button } from "@/components/ui/button";
import { setLanguage, type SiteLanguage } from "@/i18n";
import { LINKEDIN_URL } from "@/lib/site";
import { BrandMark } from "./BrandMark";

export function Footer() {
  const { t, i18n } = useTranslation();
  const current = (i18n.language?.slice(0, 2) === "fr" ? "fr" : "en") as SiteLanguage;
  const nextLanguage: SiteLanguage = current === "fr" ? "en" : "fr";
  const languageLabel = current === "fr" ? "EN / FR" : "FR / EN";

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
      <div className="section-shell py-12 sm:py-16">
        <div className="grid gap-10 border-b border-border/80 pb-10 md:grid-cols-2 xl:grid-cols-[1.15fr_0.9fr_0.9fr_1fr] xl:gap-16">
          <div className="space-y-6">
            <BrandMark className="h-8 w-auto" />
            <p className="max-w-sm text-base leading-8 text-muted-foreground">{t("footer.brandText")}</p>
            <div className="flex flex-wrap gap-3">
              <a href={LINKEDIN_URL} target="_blank" rel="noreferrer">
                <Button variant="outline" className="h-11 gap-2 rounded-xl border-border/80 bg-background px-4 text-sm font-semibold">
                  <Linkedin className="h-4 w-4" />
                  {t("footer.linkedin")}
                </Button>
              </a>
              <Link to="/contact">
                <Button variant="outline" className="h-11 gap-2 rounded-xl border-border/80 bg-background px-4 text-sm font-semibold">
                  <Mail className="h-4 w-4" />
                  {t("footer.contact")}
                </Button>
              </Link>
            </div>
          </div>

          <div>
            <div className="mb-5 text-xs font-bold uppercase tracking-[0.18em] text-muted-foreground">{t("footer.products")}</div>
            <div className="space-y-4 text-sm sm:text-base">
              {productLinks.map((item) => (
                <Link key={item.label} to={item.to} className="block text-muted-foreground transition-colors hover:text-foreground">
                  {item.label}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <div className="mb-5 text-xs font-bold uppercase tracking-[0.18em] text-muted-foreground">{t("footer.solutions")}</div>
            <div className="space-y-4 text-sm sm:text-base">
              {solutionLinks.map((item) => (
                <Link key={item.label} to={item.to} hash={item.hash} className="block text-muted-foreground transition-colors hover:text-foreground">
                  {item.label}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <div className="mb-5 text-xs font-bold uppercase tracking-[0.18em] text-muted-foreground">{t("footer.resources")}</div>
            <div className="space-y-4 text-sm sm:text-base">
              {resourceLinks.map((item) => (
                <Link key={item.label} to={item.to} className="block text-muted-foreground transition-colors hover:text-foreground">
                  {item.label}
                </Link>
              ))}
              <Link to="/contact" className="block text-muted-foreground transition-colors hover:text-foreground">
                {t("footer.contact")}
              </Link>
            </div>
            <div className="my-4 h-px bg-border/80" />
            <div className="space-y-4 text-sm sm:text-base">
              {legalLinks.map((item) => (
                <Link key={item.label} to={item.to} className="block text-muted-foreground transition-colors hover:text-foreground">
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-4 pt-6 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <span>{t("site.copyright")}</span>
          <button className="self-start font-medium tracking-[0.02em] hover:text-foreground sm:self-auto" onClick={() => void setLanguage(nextLanguage)}>
            {languageLabel}
          </button>
        </div>
      </div>
    </footer>
  );
}
