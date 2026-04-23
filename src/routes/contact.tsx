import { useMemo, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";

import { SEOHead } from "@/components/SEOHead";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { createStaticMeta } from "@/lib/site";

export const Route = createFileRoute("/contact")({
  head: () =>
    createStaticMeta({
      title: "Demander une démo | Mindorion",
      description: "Prenez rendez-vous avec un expert Mindorion. Démo personnalisée de 30 minutes — Qualion, ProspectIQ, GovernanceIQ. Sans engagement.",
      path: "/contact",
    }),
  component: ContactPage,
});

const productOptions = ["🛡 Qualion", "🎯 ProspectIQ", "📋 GovernanceIQ", "Suite complète"] as const;
const teamSizes = ["1-5 personnes", "6-20 personnes", "21-100 personnes", "100+ personnes"] as const;

function ContactPage() {
  const [form, setForm] = useState({ firstName: "", lastName: "", email: "", company: "", teamSize: "", message: "" });
  const [selectedProducts, setSelectedProducts] = useState<string[]>([]);
  const [submitted, setSubmitted] = useState(false);
  const [productError, setProductError] = useState(false);

  const mailtoBody = useMemo(
    () => [
      `Prénom: ${form.firstName}`,
      `Nom: ${form.lastName}`,
      `Email professionnel: ${form.email}`,
      `Entreprise: ${form.company}`,
      `Produits: ${selectedProducts.join(", ")}`,
      `Taille de l'équipe: ${form.teamSize || "Non précisée"}`,
      `Message: ${form.message || "Aucun message"}`,
    ].join("\n"),
    [form, selectedProducts],
  );

  return (
    <div className="editorial-page font-pricing">
      <div className="section-shell section-space">
        <SEOHead
          title="Demander une démo | Mindorion"
          description="Prenez rendez-vous avec un expert Mindorion. Démo personnalisée de 30 minutes — Qualion, ProspectIQ, GovernanceIQ. Sans engagement."
          path="/contact"
        />

        <div className="grid gap-10 lg:grid-cols-[0.45fr_0.55fr] lg:items-start">
          <section>
            <div className="text-xs font-bold uppercase tracking-[0.22em] editorial-purple-text">DEMANDER UNE DÉMO</div>
            <h1 className="mt-4 text-balance text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl">Parlons de votre projet.</h1>
            <p className="mt-5 max-w-xl text-base leading-7 text-muted-foreground sm:text-lg">
              Nos experts vous présentent Mindorion en 30 minutes et répondent à toutes vos questions — produits, tarifs, intégrations.
            </p>

            <div className="mt-8 space-y-4">
              {[
                ["⏱", "30 minutes", "Démo personnalisée selon votre métier"],
                ["🎯", "Sans engagement", "Pas de pression commerciale"],
                ["💬", "Réponse sous 24h", "Nous vous recontactons rapidement"],
              ].map(([icon, title, text]) => (
                <div key={title} className="flex items-start gap-4">
                  <div className="editorial-purple-soft flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-sm font-semibold">{icon}</div>
                  <div>
                    <div className="text-base font-semibold text-foreground">{title}</div>
                    <div className="text-sm leading-6 text-muted-foreground">{text}</div>
                  </div>
                </div>
              ))}
            </div>

             <div className="editorial-gray-soft mt-8 rounded-[10px] p-5">
               <div className="text-xs font-bold uppercase tracking-[0.18em] text-muted-foreground">CONTACT DIRECT</div>
               <div className="mt-3 text-lg font-semibold editorial-purple-text">contact@mindorion.com</div>
               <p className="mt-3 text-sm leading-6 text-muted-foreground">Pour toute question sur les tarifs Enterprise ou les intégrations.</p>
             </div>
          </section>

          <section className="editorial-card p-5 sm:p-6">
            <h2 className="text-xl font-bold text-foreground">Vos informations</h2>

            <form
              className="mt-6 space-y-5"
              onSubmit={(event) => {
                event.preventDefault();
                if (selectedProducts.length === 0) {
                  setProductError(true);
                  return;
                }

                setProductError(false);
                setSubmitted(true);
                setForm({ firstName: "", lastName: "", email: "", company: "", teamSize: "", message: "" });
                setSelectedProducts([]);
              }}
            >
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="block text-sm font-medium text-foreground">
                  Prénom *
                  <Input
                    value={form.firstName}
                    onChange={(event) => setForm((prev) => ({ ...prev, firstName: event.target.value }))}
                    placeholder="Votre prénom"
                    className="editorial-input mt-2 h-10 border-0 shadow-none"
                    required
                  />
                </label>
                <label className="block text-sm font-medium text-foreground">
                  Nom *
                  <Input
                    value={form.lastName}
                    onChange={(event) => setForm((prev) => ({ ...prev, lastName: event.target.value }))}
                    placeholder="Votre nom"
                    className="editorial-input mt-2 h-10 border-0 shadow-none"
                    required
                  />
                </label>
              </div>

              <label className="block text-sm font-medium text-foreground">
                Email professionnel *
                <Input
                  type="email"
                  value={form.email}
                  onChange={(event) => setForm((prev) => ({ ...prev, email: event.target.value }))}
                  placeholder="votre@entreprise.com"
                  className="editorial-input mt-2 h-10 border-0 shadow-none"
                  required
                />
              </label>

              <label className="block text-sm font-medium text-foreground">
                Entreprise *
                <Input
                  value={form.company}
                  onChange={(event) => setForm((prev) => ({ ...prev, company: event.target.value }))}
                  placeholder="Nom de votre entreprise"
                  className="editorial-input mt-2 h-10 border-0 shadow-none"
                  required
                />
              </label>

              <div>
                <div className="text-sm font-medium text-foreground">Produit(s) qui vous intéresse(nt) *</div>
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
                {productError ? <p className="mt-2 text-sm editorial-danger">Sélectionnez au moins un produit.</p> : null}
              </div>

              <label className="block text-sm font-medium text-foreground">
                Taille de l'équipe
                <select
                  value={form.teamSize}
                  onChange={(event) => setForm((prev) => ({ ...prev, teamSize: event.target.value }))}
                  className="editorial-input mt-2 h-10 w-full text-sm text-foreground"
                >
                  <option value="">Sélectionner</option>
                  {teamSizes.map((size) => (
                    <option key={size} value={size}>
                      {size}
                    </option>
                  ))}
                </select>
              </label>

              <label className="block text-sm font-medium text-foreground">
                Votre message (optionnel)
                <Textarea
                  value={form.message}
                  onChange={(event) => setForm((prev) => ({ ...prev, message: event.target.value }))}
                  placeholder="Décrivez votre besoin..."
                  className="editorial-input mt-2 min-h-[60px] border-0 shadow-none"
                />
              </label>

              <Button type="submit" className="editorial-purple-bg h-11 w-full rounded-lg text-sm font-semibold text-white hover:opacity-95">
                Envoyer ma demande →
              </Button>

              <p className="text-center text-sm text-muted-foreground">Nous vous recontactons sous 24h · Aucun engagement</p>
              {submitted ? <p className="text-center text-sm editorial-success">Merci ! Nous vous recontactons sous 24 heures.</p> : null}
            </form>
          </section>
        </div>
      </div>
    </div>
  );
}
