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

  const solutionLinks = [
    { label: t("nav.solutionItems.0.title"), to: "/use-cases", hash: "consultants" },
    { label: t("nav.solutionItems.1.title"), to: "/use-cases", hash: "sales" },
    { label: t("nav.solutionItems.2.title"), to: "/use-cases", hash: "rh" },
    { label: t("nav.solutionItems.3.title"), to: "/use-cases", hash: "esn" },
  ];

  const resourceLinks = [
    { label: "Blog", to: "/blog" },
    { label: t("nav.solutions"), to: "/use-cases" },
    { label: t("footer.about"), to: "/about" },
    { label: t("footer.contact"), to: "/contact" },
  ];

  const legalLinks = [
    { label: t("footer.privacy"), to: "/privacy" },
    { label: t("footer.terms"), to: "/terms" },
    { label: t("footer.security"), to: "/security" },
  ];

  return (
    <footer className="border-t border-border bg-background">
      <div className="section-shell py-14">
        <div className="grid gap-10 md:grid-cols-2 xl:grid-cols-4">
          <div className="space-y-5">
            <BrandMark className="h-8" />
            <p className="max-w-sm text-sm leading-6 text-muted-foreground">{t("footer.brandText")}</p>
            <div className="flex flex-wrap gap-3">
              <a href={LINKEDIN_URL} target="_blank" rel="noreferrer">
                <Button variant="outline">{t("footer.linkedin")}</Button>
              </a>
              <Link to="/contact">
                <Button variant="outline">{t("footer.contact")}</Button>
              </Link>
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
                <Link key={item.label} to={item.to} hash={item.hash} className="block text-muted-foreground transition-colors hover:text-foreground">
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
