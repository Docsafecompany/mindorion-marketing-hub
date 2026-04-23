import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";

import { FadeSection } from "@/components/FadeSection";
import { SEOHead } from "@/components/SEOHead";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { createStaticMeta } from "@/lib/site";

export const Route = createFileRoute("/contact")({
  head: () =>
    createStaticMeta({
      title: "Contact Mindorion — Demo and conversations",
      description: "Talk to the Mindorion team about document quality, B2B outreach or operational governance needs.",
      path: "/contact",
    }),
  component: ContactPage,
});

function ContactPage() {
  const { t } = useTranslation();
  const [form, setForm] = useState({ firstName: "", lastName: "", email: "", company: "", message: "" });

  return (
    <div className="section-shell section-space">
      <SEOHead title={t("contact.seoTitle")} description={t("contact.seoDescription")} path="/contact" />
      <FadeSection className="hero-wash max-w-4xl rounded-[28px] px-6 py-12 text-center">
        <h1 className="text-[32px] font-bold leading-tight text-foreground md:text-[48px] lg:text-[56px]">{t("contact.title").split(" ").map((word, index) => <span key={`${word}-${index}`}>{index === 0 ? <span className="brand-gradient-text">{word}</span> : word}{index < t("contact.title").split(" ").length - 1 ? " " : ""}</span>)}</h1>
        <p className="mx-auto mt-5 max-w-[600px] text-lg leading-8 text-muted-foreground">{t("contact.subtitle")}</p>
      </FadeSection>
      <FadeSection className="mt-12 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]" delay={0.1}>
        <Card>
          <CardContent className="p-6 sm:p-8">
            <form
              className="space-y-4"
              onSubmit={(event) => {
                event.preventDefault();
                toast.success(t("contact.successTitle"), { description: t("contact.successText") });
                setForm({ firstName: "", lastName: "", email: "", company: "", message: "" });
              }}
            >
              <div className="grid gap-4 sm:grid-cols-2">
                <Input placeholder={t("contact.fields.firstName")} value={form.firstName} onChange={(event) => setForm((prev) => ({ ...prev, firstName: event.target.value }))} required />
                <Input placeholder={t("contact.fields.lastName")} value={form.lastName} onChange={(event) => setForm((prev) => ({ ...prev, lastName: event.target.value }))} required />
              </div>
              <Input type="email" placeholder={t("contact.fields.email")} value={form.email} onChange={(event) => setForm((prev) => ({ ...prev, email: event.target.value }))} required />
              <Input placeholder={t("contact.fields.company")} value={form.company} onChange={(event) => setForm((prev) => ({ ...prev, company: event.target.value }))} required />
              <Textarea placeholder={t("contact.fields.message")} className="min-h-40" value={form.message} onChange={(event) => setForm((prev) => ({ ...prev, message: event.target.value }))} required />
              <Button type="submit">{t("common.send")}</Button>
            </form>
          </CardContent>
        </Card>
        <Card className="bg-muted/35">
          <CardContent className="flex h-full flex-col justify-between gap-6 p-6 sm:p-8">
            <div>
              <div className="eyebrow">Contact</div>
              <h2 className="mt-3 text-2xl font-bold text-foreground">{t("contact.direct")}</h2>
              <a href="mailto:contact@mindorion.com" className="mt-4 inline-block text-lg font-semibold text-primary">contact@mindorion.com</a>
            </div>
            <p className="text-sm leading-6 text-muted-foreground">
              Mindorion supports B2B teams that want stronger document quality, better outreach execution and operational governance without added complexity.
            </p>
          </CardContent>
        </Card>
      </FadeSection>
    </div>
  );
}
