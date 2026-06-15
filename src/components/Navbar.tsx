import { useState, type ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import { ArrowRight, Menu } from "lucide-react";

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { setLanguage, type SiteLanguage } from "@/i18n";
import { LOGIN_URL } from "@/lib/site";
import { trackEvent } from "@/lib/analytics";
import { cn } from "@/lib/utils";
import { BrandMark } from "./BrandMark";
import { ProductLogo } from "./ProductLogo";

// Feature flag: hide Resources/Blog menus until content is ready.
const SHOW_RESOURCES = false;

type MenuEntry = {
  title: string;
  subtitle?: string;
  to?: string;
  href?: string;
  hash?: string;
  icon?: ReactNode;
  accentTitle?: boolean;
};

function IconTile({ className, children }: { className: string; children: ReactNode }) {
  return <div className={cn("brand-icon flex h-10 w-10 items-center justify-center rounded-xl text-primary", className)}>{children}</div>;
}

function NavPanel({ label, items }: { label: string; items: MenuEntry[] }) {
  return (
    <div className="w-[320px] rounded-2xl border border-border bg-popover p-3 text-popover-foreground shadow-xl">
      <div className="px-3 pb-3 text-xs font-bold tracking-[0.18em] text-muted-foreground">{label}</div>
      <div className="space-y-1">
        {items.map((item) => (
          <div key={item.title}>
            {item.href ? (
              <a href={item.href} className="flex items-start gap-3 rounded-lg px-3 py-3 transition-colors hover:bg-muted/70">
                {item.icon}
                <div className="space-y-1">
                  <div className={cn("text-sm font-semibold text-foreground", item.accentTitle && "text-primary")}>{item.title}</div>
                  {item.subtitle ? <div className="text-sm text-muted-foreground">{item.subtitle}</div> : null}
                </div>
              </a>
            ) : (
              <Link
                to={item.to!}
                hash={item.hash}
                className="flex items-start gap-3 rounded-lg px-3 py-3 transition-colors hover:bg-muted/70"
              >
                {item.icon}
                <div className="space-y-1">
                  <div className={cn("text-sm font-semibold text-foreground", item.accentTitle && "text-primary")}>{item.title}</div>
                  {item.subtitle ? <div className="text-sm text-muted-foreground">{item.subtitle}</div> : null}
                </div>
              </Link>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export function Navbar() {
  const { t, i18n } = useTranslation();
  const [open, setOpen] = useState(false);
  const [activeDesktopMenu, setActiveDesktopMenu] = useState<"products" | null>(null);
  const current = (i18n.language?.slice(0, 2) === "fr" ? "fr" : "en") as SiteLanguage;
  const nextLanguage: SiteLanguage = current === "fr" ? "en" : "fr";

  const productEntries: MenuEntry[] = [
    {
      title: t("nav.productItems.0.title"),
      subtitle: t("nav.productItems.0.subtitle"),
      to: "/products/proposaliq",
      icon: <IconTile className="bg-white p-1.5"><ProductLogo product="proposaliq" /></IconTile>,
    },
    {
      title: t("nav.productItems.1.title"),
      subtitle: t("nav.productItems.1.subtitle"),
      to: "/products/growthiq",
      icon: <IconTile className="bg-white p-1.5"><ProductLogo product="growthiq" /></IconTile>,
    },
  ];

  const whoWeServeLabel = current === "fr" ? "Pour qui" : "Who We Serve";
  const whyMindorionLabel = current === "fr" ? "Pourquoi Mindorion" : "Why Mindorion";
  const bookDemoLabel = current === "fr" ? "Réserver une démo" : "Book a demo";

  return (
    <header className="sticky top-0 z-40 border-b border-border/80 bg-background/94 backdrop-blur-xl">
      <div className="section-shell flex h-16 items-center justify-between gap-6 lg:h-[72px]">
        <Link to="/" className="shrink-0">
          <BrandMark className="h-14 sm:h-16" />
        </Link>

        <div className="hidden flex-1 justify-center lg:flex">
          <div className="flex items-center gap-1" onMouseLeave={() => setActiveDesktopMenu(null)}>
            <div className="relative">
              <button
                className="inline-flex h-9 items-center justify-center rounded-xl px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-muted/70 hover:text-primary"
                onFocus={() => setActiveDesktopMenu("products")}
                onMouseEnter={() => setActiveDesktopMenu("products")}
              >
                {t("nav.products")}
              </button>
              {activeDesktopMenu === "products" ? (
                <div className="absolute left-0 top-full pt-2">
                  <NavPanel label={t("nav.productsLabel")} items={productEntries} />
                </div>
              ) : null}
            </div>

            <Link
              to="/use-cases"
              className="inline-flex h-9 items-center justify-center rounded-xl px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-muted/70 hover:text-primary"
            >
              {whoWeServeLabel}
            </Link>

            <Link
              to="/pricing"
              className="inline-flex h-9 items-center justify-center rounded-xl px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-muted/70 hover:text-primary"
            >
              {t("nav.pricing")}
            </Link>

            <Link
              to="/about"
              className="inline-flex h-9 items-center justify-center rounded-xl px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-muted/70 hover:text-primary"
            >
              {whyMindorionLabel}
            </Link>

            {/* Resources / Blog menu hidden — feature flag SHOW_RESOURCES */}
          </div>
        </div>

        <div className="hidden items-center gap-3 lg:flex">
          <a
            href={LOGIN_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            {t("nav.login")}
          </a>
          <Link to="/contact" onClick={() => trackEvent("cta_clicked", { cta: "header_book_demo" })}>
            <Button className="gap-1 rounded-xl px-5">
              {bookDemoLabel}
              <ArrowRight className="h-3.5 w-3.5" />
            </Button>
          </Link>
          <button
            className="text-xs font-semibold text-muted-foreground transition-colors hover:text-primary"
            onClick={() => {
              trackEvent("language_switched", { to: nextLanguage });
              void setLanguage(nextLanguage);
            }}
          >
            {t("site.switchLanguage")}
          </button>
        </div>

        <div className="lg:hidden">
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" aria-label="Open navigation" className="rounded-xl border-border/80 bg-card/90">
                <Menu className="h-4 w-4" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-full max-w-sm overflow-y-auto">
              <SheetHeader>
                <SheetTitle>{t("nav.mobileTitle")}</SheetTitle>
                <SheetDescription>{t("nav.mobileDescription")}</SheetDescription>
              </SheetHeader>
              <div className="mt-6 flex flex-col gap-6">
                <Accordion type="multiple" className="w-full">
                  <AccordionItem value="products">
                    <AccordionTrigger>{t("nav.products")}</AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-2">
                        {productEntries.map((item) => (
                          <SheetClose asChild key={item.title}>
                            <Link to={item.to!} className="flex items-start gap-3 rounded-lg px-3 py-3 hover:bg-muted/60">
                              {item.icon}
                              <div>
                                <div className="text-sm font-semibold">{item.title}</div>
                                {item.subtitle ? <div className="text-sm text-muted-foreground">{item.subtitle}</div> : null}
                              </div>
                            </Link>
                          </SheetClose>
                        ))}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>

                <div className="space-y-2">
                  <SheetClose asChild>
                    <Link to="/use-cases" className="block rounded-lg px-3 py-3 text-sm font-semibold hover:bg-muted/60">{whoWeServeLabel}</Link>
                  </SheetClose>
                  <SheetClose asChild>
                    <Link to="/pricing" className="block rounded-lg px-3 py-3 text-sm font-semibold hover:bg-muted/60">{t("nav.pricing")}</Link>
                  </SheetClose>
                  <SheetClose asChild>
                    <Link to="/about" className="block rounded-lg px-3 py-3 text-sm font-semibold hover:bg-muted/60">{whyMindorionLabel}</Link>
                  </SheetClose>
                  <a
                    href={LOGIN_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block rounded-lg px-3 py-3 text-sm font-semibold text-muted-foreground hover:bg-muted/60 hover:text-foreground"
                  >
                    {t("nav.login")}
                  </a>
                  <SheetClose asChild>
                    <Link to="/contact" className="block px-3 py-1" onClick={() => trackEvent("cta_clicked", { cta: "header_book_demo" })}>
                      <Button className="w-full justify-center rounded-xl gap-1">
                        {bookDemoLabel}
                        <ArrowRight className="h-3.5 w-3.5" />
                      </Button>
                    </Link>
                  </SheetClose>
                  <button
                    className="px-3 pt-2 text-left text-xs font-semibold text-muted-foreground"
                    onClick={() => {
                      trackEvent("language_switched", { to: nextLanguage });
                      void setLanguage(nextLanguage);
                    }}
                  >
                    {t("site.switchLanguage")}
                  </button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}

// Note: SHOW_RESOURCES is intentionally referenced here to preserve the flag
// for a future re-enable of the Resources/Blog menu without re-importing.
void SHOW_RESOURCES;
