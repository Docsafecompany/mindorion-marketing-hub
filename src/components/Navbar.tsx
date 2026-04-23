import { useState, type ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import {
  ArrowRight,
  BriefcaseBusiness,
  Cog,
  CreditCard,
  FileText,
  Menu,
  Shield,
  Target,
  TrendingUp,
  Users,
} from "lucide-react";

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
import { cn } from "@/lib/utils";
import { BrandMark } from "./BrandMark";
import { ProductLogo } from "./ProductLogo";

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

function NavPanel({ label, items, footer }: { label: string; items: MenuEntry[]; footer?: MenuEntry }) {
  return (
    <div className="w-[320px] p-3">
      <div className="px-3 pb-3 text-xs font-bold tracking-[0.18em] text-muted-foreground">{label}</div>
      <div className="space-y-1">
        {items.map((item) => {
          const content = (
            <>
              {item.icon ? item.icon : null}
              <div className="space-y-1">
                <div className={cn("text-sm font-semibold text-foreground", item.accentTitle && "text-primary")}>{item.title}</div>
                {item.subtitle ? <div className="text-sm text-muted-foreground">{item.subtitle}</div> : null}
              </div>
            </>
          );

          return (
            <NavigationMenuLink asChild key={item.title}>
              {item.href ? (
                <a href={item.href} className="flex items-start gap-3 rounded-lg px-3 py-3 transition-colors hover:bg-muted/70">
                  {content}
                </a>
              ) : (
                 <Link
                   to={item.to!}
                   hash={item.hash ? `#${item.hash}` : undefined}
                   className="flex items-start gap-3 rounded-lg px-3 py-3 transition-colors hover:bg-muted/70"
                 >
                  {content}
                </Link>
              )}
            </NavigationMenuLink>
          );
        })}
      </div>
      {footer ? (
        <div className="mt-3 border-t border-border/80 pt-3">
          <NavigationMenuLink asChild>
            {footer.href ? (
              <a href={footer.href} className="flex items-start gap-3 rounded-lg px-3 py-3 transition-colors hover:bg-muted/70">
                {footer.icon}
                <div className="space-y-1">
                  <div className={cn("text-sm font-semibold text-foreground", footer.accentTitle && "text-primary")}>{footer.title}</div>
                  {footer.subtitle ? <div className="text-sm text-muted-foreground">{footer.subtitle}</div> : null}
                </div>
              </a>
            ) : (
               <Link to={footer.to!} hash={footer.hash ? `#${footer.hash}` : undefined} className="flex items-start gap-3 rounded-lg px-3 py-3 transition-colors hover:bg-muted/70">
                {footer.icon}
                <div className="space-y-1">
                  <div className={cn("text-sm font-semibold text-foreground", footer.accentTitle && "text-primary")}>{footer.title}</div>
                  {footer.subtitle ? <div className="text-sm text-muted-foreground">{footer.subtitle}</div> : null}
                </div>
              </Link>
            )}
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
      icon: <IconTile className="bg-white p-1.5"><ProductLogo product="qualion" /></IconTile>,
    },
    {
      title: t("nav.productItems.1.title"),
      subtitle: t("nav.productItems.1.subtitle"),
      to: "/products/prospectiq",
      icon: <IconTile className="bg-white p-1.5"><ProductLogo product="prospectiq" /></IconTile>,
    },
    {
      title: t("nav.productItems.2.title"),
      subtitle: t("nav.productItems.2.subtitle"),
      to: "/products/governanceiq",
      icon: <IconTile className="bg-white p-1.5"><ProductLogo product="governanceiq" /></IconTile>,
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
      icon: <IconTile className="bg-surface-secondary text-surface-secondary-foreground"><TrendingUp className="h-4 w-4" /></IconTile>,
    },
    {
      title: t("nav.solutionItems.2.title"),
      subtitle: t("nav.solutionItems.2.subtitle"),
      to: "/use-cases",
      hash: "rh",
      icon: <IconTile className="bg-surface-rose text-surface-rose-foreground"><Users className="h-4 w-4" /></IconTile>,
    },
    {
      title: t("nav.solutionItems.3.title"),
      subtitle: t("nav.solutionItems.3.subtitle"),
      to: "/use-cases",
      hash: "esn",
      icon: <IconTile className="bg-surface-neutral text-surface-neutral-foreground"><Cog className="h-4 w-4" /></IconTile>,
    },
  ];

  const resourceEntries: MenuEntry[] = [
    { title: t("nav.resourceItems.0.title"), subtitle: t("nav.resourceItems.0.subtitle"), to: "/blog" },
    { title: t("nav.resourceItems.1.title"), subtitle: t("nav.resourceItems.1.subtitle"), to: "/about" },
  ];

  return (
    <header className="sticky top-0 z-40 border-b border-border/80 bg-background/94 backdrop-blur-xl">
      <div className="section-shell flex h-16 items-center justify-between gap-6 lg:h-[72px]">
        <Link to="/" className="shrink-0">
          <BrandMark className="h-14 sm:h-16" />
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
                      accentTitle: true,
                      icon: <IconTile className="bg-surface-neutral text-surface-neutral-foreground"><CreditCard className="h-4 w-4" /></IconTile>,
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
                  <Link to="/pricing" className="inline-flex h-9 items-center justify-center rounded-xl px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-muted/70 hover:text-primary">
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
                      title: t("nav.resourceItems.2.title"),
                      subtitle: t("nav.resourceItems.2.subtitle"),
                      to: "/contact",
                      accentTitle: true,
                    }}
                  />
                </NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        <div className="hidden items-center gap-3 lg:flex">
          <a href="/dashboard" className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">
            {t("nav.login")}
          </a>
          <Link to="/pricing">
            <Button className="gap-1 rounded-xl px-5">
              {t("nav.start")}
              <ArrowRight className="h-3.5 w-3.5" />
            </Button>
          </Link>
          <button className="text-xs font-semibold text-muted-foreground transition-colors hover:text-primary" onClick={() => void setLanguage(nextLanguage)}>
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
                        <SheetClose asChild>
                          <Link to="/pricing" className="flex items-start gap-3 rounded-lg px-3 py-3 hover:bg-muted/60">
                            <IconTile className="bg-surface-neutral text-surface-neutral-foreground"><CreditCard className="h-4 w-4" /></IconTile>
                            <div>
                              <div className="text-sm font-semibold text-primary">{t("nav.pricingCta")}</div>
                              <div className="text-sm text-muted-foreground">{t("nav.pricingSubtitle")}</div>
                            </div>
                          </Link>
                        </SheetClose>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="solutions">
                    <AccordionTrigger>{t("nav.solutions")}</AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-2">
                        {solutionEntries.map((item) => (
                          <SheetClose asChild key={item.title}>
                             <Link to={item.to!} hash={item.hash ? `#${item.hash}` : undefined} className="flex items-start gap-3 rounded-lg px-3 py-3 hover:bg-muted/60">
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
                  <AccordionItem value="resources">
                    <AccordionTrigger>{t("nav.resources")}</AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-2">
                        {resourceEntries.map((item) => (
                          <SheetClose asChild key={item.title}>
                            <Link to={item.to!} className="block rounded-lg px-3 py-3 hover:bg-muted/60">
                              <div className="text-sm font-semibold">{item.title}</div>
                              {item.subtitle ? <div className="text-sm text-muted-foreground">{item.subtitle}</div> : null}
                            </Link>
                          </SheetClose>
                        ))}
                        <div className="border-t border-border/80 pt-2">
                          <SheetClose asChild>
                            <Link to="/contact" className="block rounded-lg px-3 py-3 hover:bg-muted/60">
                              <div className="text-sm font-semibold text-primary">{t("nav.resourceItems.2.title")}</div>
                              <div className="text-sm text-muted-foreground">{t("nav.resourceItems.2.subtitle")}</div>
                            </Link>
                          </SheetClose>
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>

                <div className="space-y-2">
                  <SheetClose asChild>
                    <Link to="/pricing" className="block rounded-lg px-3 py-3 text-sm font-semibold hover:bg-muted/60">{t("nav.pricing")}</Link>
                  </SheetClose>
                  <a href="/dashboard" className="block rounded-lg px-3 py-3 text-sm font-semibold text-muted-foreground hover:bg-muted/60 hover:text-foreground">
                    {t("nav.login")}
                  </a>
                  <SheetClose asChild>
                    <Link to="/pricing" className="block px-3 py-1">
                      <Button className="w-full justify-center rounded-xl gap-1">
                        {t("nav.start")}
                        <ArrowRight className="h-3.5 w-3.5" />
                      </Button>
                    </Link>
                  </SheetClose>
                  <button className="px-3 pt-2 text-left text-xs font-semibold text-muted-foreground" onClick={() => void setLanguage(nextLanguage)}>
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
