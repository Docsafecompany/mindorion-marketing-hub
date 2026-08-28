import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { createStaticMeta } from "@/lib/site";
import { trackEvent } from "@/lib/analytics";

export const Route = createFileRoute("/contact")({
  head: () =>
    createStaticMeta({
      title: "Demander une démo, Mindorion",
      description: "Prenez rendez-vous avec un expert Mindorion. Démo personnalisée de 30 minutes, ProposalIQ, GrowthIQ, Governance Layer. Sans engagement.",
      path: "/contact",
    }),
  component: ContactPage,
});

function ContactPage() {
  const { t } = useTranslation();
  const [form, setForm] = useState({ firstName: "", lastName: "", email: "", company: "", teamSize: "", message: "" });
  const [selectedProducts, setSelectedProducts] = useState<string[]>([]);
  const [submitted, setSubmitted] = useState(false);
  const [productError, setProductError] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [copied, setCopied] = useState(false);

  const productOptions = t("contact.productOptions", { returnObjects: true }) as string[];
  const teamSizes = t("contact.teamSizes", { returnObjects: true }) as string[];
  const perks = t("contact.perks", { returnObjects: true }) as Array<{ icon: string; title: string; text: string }>;
  const contactEmail = t("site.contactEmail");

  return (
    <div className="editorial-page font-pricing">
      <div className="section-shell section-space">

        <div className="grid gap-10 lg:grid-cols-[0.45fr_0.55fr] lg:items-start">
          <section>
            <div className="text-xs font-bold uppercase tracking-[0.22em] editorial-purple-text">{t("contact.eyebrow")}</div>
            <h1 className="mt-4 text-balance text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl">{t("contact.title")}</h1>
            <p className="mt-5 max-w-xl text-base leading-7 text-muted-foreground sm:text-lg">
              {t("contact.subtitle")}
            </p>

            <div className="mt-8 space-y-4">
              {perks.map((perk) => (
                <div key={perk.title} className="flex items-start gap-4">
                  <div className="editorial-purple-soft flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-sm font-semibold">{perk.icon}</div>
                  <div>
                    <div className="text-base font-semibold text-foreground">{perk.title}</div>
                    <div className="text-sm leading-6 text-muted-foreground">{perk.text}</div>
                  </div>
                </div>
              ))}
            </div>

             <div className="editorial-gray-soft mt-8 rounded-[10px] p-5">
               <div className="text-xs font-bold uppercase tracking-[0.18em] text-muted-foreground">{t("contact.directLabel")}</div>
               <div className="mt-3 text-lg font-semibold editorial-purple-text">contact@mindorion.com</div>
               <p className="mt-3 text-sm leading-6 text-muted-foreground">{t("contact.directText")}</p>
             </div>
          </section>

          <section className="editorial-card p-5 sm:p-6">
            <h2 className="text-xl font-bold text-foreground">{t("contact.formTitle")}</h2>

            <form
              className="mt-6 space-y-5"
              onSubmit={(event) => {
                event.preventDefault();
                if (isSubmitting) return;
                if (selectedProducts.length === 0) {
                  setProductError(true);
                  return;
                }

                setProductError(false);
                setIsSubmitting(true);
                trackEvent("contact_form_submitted", {
                  products_selected: selectedProducts,
                  team_size: form.teamSize || "unspecified",
                });
                // Server-side send is not wired yet. Show a fallback instead of
                // triggering mailto: or pretending the message was delivered.
                setSubmitted(true);
                setIsSubmitting(false);
              }}
            >
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="block text-sm font-medium text-foreground">
                  {t("contact.fields.firstName")} *
                  <Input
                    value={form.firstName}
                    onChange={(event) => setForm((prev) => ({ ...prev, firstName: event.target.value }))}
                    placeholder={t("contact.fields.firstNamePlaceholder")}
                    className="editorial-input mt-2 h-10 border-0 shadow-none"
                    required
                  />
                </label>
                <label className="block text-sm font-medium text-foreground">
                  {t("contact.fields.lastName")} *
                  <Input
                    value={form.lastName}
                    onChange={(event) => setForm((prev) => ({ ...prev, lastName: event.target.value }))}
                    placeholder={t("contact.fields.lastNamePlaceholder")}
                    className="editorial-input mt-2 h-10 border-0 shadow-none"
                    required
                  />
                </label>
              </div>

              <label className="block text-sm font-medium text-foreground">
                {t("contact.fields.email")} *
                <Input
                  type="email"
                  value={form.email}
                  onChange={(event) => setForm((prev) => ({ ...prev, email: event.target.value }))}
                  placeholder={t("contact.fields.emailPlaceholder")}
                  className="editorial-input mt-2 h-10 border-0 shadow-none"
                  required
                />
              </label>

              <label className="block text-sm font-medium text-foreground">
                {t("contact.fields.company")} *
                <Input
                  value={form.company}
                  onChange={(event) => setForm((prev) => ({ ...prev, company: event.target.value }))}
                  placeholder={t("contact.fields.companyPlaceholder")}
                  className="editorial-input mt-2 h-10 border-0 shadow-none"
                  required
                />
              </label>

              <div>
                <div className="text-sm font-medium text-foreground">{t("contact.fields.products")} *</div>
                <div className="mt-2 flex flex-wrap gap-2">
                  {productOptions.map((product) => {
                    const active = selectedProducts.includes(product);
                    return (
                      <button
                        key={product}
                        type="button"
                        onClick={() => {
                          setProductError(false);
                          setSelectedProducts((prev) => (prev.includes(product) ? prev.filter((item) => item !== product) : [...prev, product]));
                        }}
                        className={active ? "rounded-full border border-[#534ab7] bg-[#eeedfe] px-4 py-2 text-sm font-semibold editorial-purple-text" : "rounded-full border border-[#e8e6e0] bg-white px-4 py-2 text-sm font-semibold text-muted-foreground"}
                      >
                        {product}
                      </button>
                    );
                  })}
                </div>
                {productError ? <p className="mt-2 text-sm editorial-danger">{t("contact.productError")}</p> : null}
              </div>

              <label className="block text-sm font-medium text-foreground">
                {t("contact.fields.teamSize")}
                <select
                  value={form.teamSize}
                  onChange={(event) => setForm((prev) => ({ ...prev, teamSize: event.target.value }))}
                  className="editorial-input mt-2 h-10 w-full text-sm text-foreground"
                >
                  <option value="">{t("contact.fields.teamSizePlaceholder")}</option>
                  {teamSizes.map((size) => (
                    <option key={size} value={size}>
                      {size}
                    </option>
                  ))}
                </select>
              </label>

              <label className="block text-sm font-medium text-foreground">
                {t("contact.fields.message")}
                <Textarea
                  value={form.message}
                  onChange={(event) => setForm((prev) => ({ ...prev, message: event.target.value }))}
                  placeholder={t("contact.fields.messagePlaceholder")}
                  className="editorial-input mt-2 min-h-[60px] border-0 shadow-none"
                />
              </label>

              <Button
                type="submit"
                disabled={isSubmitting}
                className="editorial-purple-bg h-11 w-full rounded-lg text-sm font-semibold text-white hover:opacity-95 disabled:opacity-60"
              >
                {isSubmitting ? t("contact.sending") : t("contact.submit")}
              </Button>

              <p className="text-center text-sm text-muted-foreground">{t("contact.footer")}</p>

              {submitted ? (
                <div className="editorial-gray-soft rounded-[10px] p-5 text-sm">
                  <div className="text-xs font-bold uppercase tracking-[0.18em] text-muted-foreground">{t("contact.fallbackTitle")}</div>
                  <p className="mt-3 leading-6 text-muted-foreground">{t("contact.fallbackMessage")}</p>
                  <div className="mt-4 flex flex-wrap items-center gap-3">
                    <div className="text-lg font-semibold editorial-purple-text">{contactEmail}</div>
                    <button
                      type="button"
                      onClick={() => {
                        void navigator.clipboard.writeText(contactEmail);
                        setCopied(true);
                        window.setTimeout(() => setCopied(false), 2000);
                      }}
                      className="rounded-md bg-white px-3 py-1.5 text-xs font-semibold text-foreground shadow-sm hover:bg-white/80"
                    >
                      {copied ? t("contact.copied") : t("contact.copyEmail")}
                    </button>
                  </div>
                </div>
              ) : null}
            </form>
          </section>
        </div>
      </div>
    </div>
  );
}
