import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import { ArrowRight, BriefcaseBusiness, CreditCard, Menu, Newspaper, Shield, Target, CalendarDays, Users, FileText, UserRoundSearch, Building2 } from "lucide-react";

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
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
import { LINKEDIN_URL, LOGIN_URL, SIGNUP_URL } from "@/lib/site";
import { cn } from "@/lib/utils";
import { BrandMark } from "./BrandMark";

type MenuEntry = {
  title: string;
  subtitle: string;
  to: string;
  hash?: string;
  icon: React.ReactNode;
};

function IconTile({ className, children }: { className: string; children: React.ReactNode }) {
  return <div className={cn("flex h-10 w-10 items-center justify-center rounded-lg", className)}>{children}</div>;
}

function NavPanel({ label, items, footer }: { label: string; items: MenuEntry[]; footer?: MenuEntry }) {
  return (
    <div className="w-[320px] p-3">
      <div className="px-3 pb-3 text-xs font-bold tracking-[0.18em] text-muted-foreground">{label}</div>
      <div className="space-y-1">
        {items.map((item) => (
          <NavigationMenuLink asChild key={item.title}>
            <Link
              to={item.to}
              hash={item.hash}
              className="flex items-start gap-3 rounded-lg px-3 py-3 transition-colors hover:bg-muted/70"
            >
              {item.icon}
              <div className="space-y-1">
                <div className="text-sm font-semibold text-foreground">{item.title}</div>
                <div className="text-sm text-muted-foreground">{item.subtitle}</div>
              </div>
            </Link>
          </NavigationMenuLink>
        ))}
      </div>
      {footer ? (
        <div className="mt-3 border-t border-border/80 pt-3">
          <NavigationMenuLink asChild>
            <Link to={footer.to} hash={footer.hash} className="flex items-start gap-3 rounded-lg px-3 py-3 transition-colors hover:bg-muted/70">
              {footer.icon}
              <div className="space-y-1">
                <div className="text-sm font-semibold text-foreground">{footer.title} →</div>
                <div className="text-sm text-muted-foreground">{footer.subtitle}</div>
              </div>
            </Link>
          </NavigationMenuLink>
        </div>
      ) : null}
    </div>
  );
}

export function Navbar() {
  const { t, i18n } = useTranslation();
  const [open, setOpen] = useState(false);
  const current = (i18n.language?.slice(0, 2) === "fr" ? "fr" : "en") as SiteLanguage;
  const nextLanguage: SiteLanguage = current === "fr" ? "en" : "fr";

  const productEntries: MenuEntry[] = [
    {
      title: t("nav.productItems.0.title"),
      subtitle: t("nav.productItems.0.subtitle"),
      to: "/products/qualion",
      icon: <IconTile className="bg-surface-brand text-surface-brand-foreground"><Shield className="h-4 w-4" /></IconTile>,
    },
    {
      title: t("nav.productItems.1.title"),
      subtitle: t("nav.productItems.1.subtitle"),
      to: "/products/prospectiq",
      icon: <IconTile className="bg-surface-secondary text-surface-secondary-foreground"><Target className="h-4 w-4" /></IconTile>,
    },
    {
      title: t("nav.productItems.2.title"),
      subtitle: t("nav.productItems.2.subtitle"),
      to: "/products/governanceiq",
      icon: <IconTile className="bg-surface-amber text-surface-amber-foreground"><FileText className="h-4 w-4" /></IconTile>,
    },
  ];

  const solutionEntries: MenuEntry[] = [
    {
      title: t("nav.solutionItems.0.title"),
      subtitle: t("nav.solutionItems.0.subtitle"),
      to: "/use-cases",
      hash: "consultants",
      icon: <IconTile className="bg-surface-blue text-surface-blue-foreground"><BriefcaseBusiness className="h-4 w-4" /></IconTile>,
    },
    {
      title: t("nav.solutionItems.1.title"),
      subtitle: t("nav.solutionItems.1.subtitle"),
      to: "/use-cases",
      hash: "sales",
      icon: <IconTile className="bg-surface-secondary text-surface-secondary-foreground"><Users className="h-4 w-4" /></IconTile>,
    },
    {
      title: t("nav.solutionItems.2.title"),
      subtitle: t("nav.solutionItems.2.subtitle"),
      to: "/use-cases",
      hash: "rh",
      icon: <IconTile className="bg-surface-rose text-surface-rose-foreground"><UserRoundSearch className="h-4 w-4" /></IconTile>,
    },
    {
      title: t("nav.solutionItems.3.title"),
      subtitle: t("nav.solutionItems.3.subtitle"),
      to: "/use-cases",
      hash: "esn",
      icon: <IconTile className="bg-surface-neutral text-surface-neutral-foreground"><Building2 className="h-4 w-4" /></IconTile>,
    },
  ];

  const resourceEntries: MenuEntry[] = [
    {
      title: t("nav.resourceItems.0.title"),
      subtitle: t("nav.resourceItems.0.subtitle"),
      to: "/blog",
      icon: <IconTile className="bg-surface-rose text-surface-rose-foreground"><Newspaper className="h-4 w-4" /></IconTile>,
    },
    {
      title: t("nav.resourceItems.1.title"),
      subtitle: t("nav.resourceItems.1.subtitle"),
      to: "/about",
      icon: <IconTile className="bg-surface-neutral text-surface-neutral-foreground"><Users className="h-4 w-4" /></IconTile>,
    },
  ];

  return (
      <header className="sticky top-0 z-40 border-b border-border bg-background/92 backdrop-blur-xl">
      <div className="section-shell flex h-16 items-center justify-between gap-6">
        <Link to="/" className="shrink-0">
            <BrandMark className="h-9" />
        </Link>

        <div className="hidden flex-1 justify-center lg:flex">
          <NavigationMenu>
            <NavigationMenuList className="gap-1">
              <NavigationMenuItem>
                <NavigationMenuTrigger className="bg-transparent hover:text-primary data-[state=open]:bg-transparent data-[state=open]:text-primary">{t("nav.products")}</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <NavPanel
                    label={t("nav.productsLabel")}
                    items={productEntries}
                    footer={{
                      title: t("nav.pricingCta"),
                      subtitle: t("nav.pricingSubtitle"),
                      to: "/pricing",
                      icon: <IconTile className="bg-surface-blue text-surface-blue-foreground"><CreditCard className="h-4 w-4" /></IconTile>,
                    }}
                  />
                </NavigationMenuContent>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuTrigger className="bg-transparent hover:text-primary data-[state=open]:bg-transparent data-[state=open]:text-primary">{t("nav.solutions")}</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <NavPanel label={t("nav.solutionsLabel")} items={solutionEntries} />
                </NavigationMenuContent>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuLink asChild>
                  <Link to="/pricing" className="inline-flex h-9 items-center justify-center rounded-md px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-brand-subtle hover:text-primary">
                    {t("nav.pricing")}
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuTrigger className="bg-transparent hover:text-primary data-[state=open]:bg-transparent data-[state=open]:text-primary">{t("nav.resources")}</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <NavPanel
                    label={t("nav.resourcesLabel")}
                    items={resourceEntries}
                    footer={{
                      title: t("nav.demoCta"),
                      subtitle: t("nav.demoSubtitle"),
                      to: "/contact",
                      icon: <IconTile className="bg-surface-brand text-surface-brand-foreground"><CalendarDays className="h-4 w-4" /></IconTile>,
                    }}
                  />
                </NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        <div className="hidden items-center gap-3 lg:flex">
          <a href={LOGIN_URL} className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">
            {t("nav.login")}
          </a>
          <a href={SIGNUP_URL}>
            <Button className="gap-1 rounded-xl px-5">
              {t("nav.start")}
              <ArrowRight className="h-3.5 w-3.5" />
            </Button>
          </a>
          <button className="text-xs font-semibold text-muted-foreground transition-colors hover:text-foreground" onClick={() => void setLanguage(nextLanguage)}>
            {t("site.switchLanguage")}
          </button>
        </div>

        <div className="lg:hidden">
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" aria-label="Open navigation" className="rounded-xl">
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
                            <Link to={item.to} className="flex items-start gap-3 rounded-lg px-3 py-3 hover:bg-muted/60">
                              {item.icon}
                              <div>
                                <div className="text-sm font-semibold">{item.title}</div>
                                <div className="text-sm text-muted-foreground">{item.subtitle}</div>
                              </div>
                            </Link>
                          </SheetClose>
                        ))}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="solutions">
                    <AccordionTrigger>{t("nav.solutions")}</AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-2">
                        {solutionEntries.map((item) => (
                          <SheetClose asChild key={item.title}>
                            <Link to={item.to} hash={item.hash} className="flex items-start gap-3 rounded-lg px-3 py-3 hover:bg-muted/60">
                              {item.icon}
                              <div>
                                <div className="text-sm font-semibold">{item.title}</div>
                                <div className="text-sm text-muted-foreground">{item.subtitle}</div>
                              </div>
                            </Link>
                          </SheetClose>
                        ))}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="resources">
                    <AccordionTrigger>{t("nav.resources")}</AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-2">
                        {resourceEntries.map((item) => (
                          <SheetClose asChild key={item.title}>
                            <Link to={item.to} className="flex items-start gap-3 rounded-lg px-3 py-3 hover:bg-muted/60">
                              {item.icon}
                              <div>
                                <div className="text-sm font-semibold">{item.title}</div>
                                <div className="text-sm text-muted-foreground">{item.subtitle}</div>
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
                    <Link to="/pricing" className="block rounded-lg px-3 py-3 text-sm font-semibold hover:bg-muted/60">{t("nav.pricing")}</Link>
                  </SheetClose>
                  <a href={LOGIN_URL} className="block rounded-lg px-3 py-3 text-sm font-semibold text-muted-foreground hover:bg-muted/60 hover:text-foreground">
                    {t("nav.login")}
                  </a>
                  <a href={SIGNUP_URL} className="block px-3 py-1">
                    <Button className="w-full justify-center rounded-xl">{t("nav.start")}</Button>
                  </a>
                  <button className="px-3 pt-2 text-left text-xs font-semibold text-muted-foreground" onClick={() => void setLanguage(nextLanguage)}>
                    {t("site.switchLanguage")}
                  </button>
                  <a href={LINKEDIN_URL} target="_blank" rel="noreferrer" className="block rounded-lg px-3 py-3 text-sm font-semibold text-muted-foreground hover:bg-muted/60 hover:text-foreground">
                    LinkedIn
                  </a>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
