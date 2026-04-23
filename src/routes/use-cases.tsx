import { useEffect, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, BriefcaseBusiness, Check, Cog, FileText, Shield, Target, TrendingUp, Users } from "lucide-react";

import { SEOHead } from "@/components/SEOHead";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { createStaticMeta } from "@/lib/site";
import { cn } from "@/lib/utils";

type ToolTone = "qualion" | "prospectiq" | "governance";
type RiskTone = "critical" | "warning" | "good";
type PersonaKey = "consultants" | "sales" | "rh" | "esn";

type ToolRow = {
  icon: typeof Shield;
  tone: ToolTone;
  name: string;
  text: string;
};

type StatusItem = {
  text: string;
  tone: RiskTone;
};

type MockCard = {
  title: string;
  badge: string;
  badgeTone: RiskTone;
  items: StatusItem[];
};

type ScenarioCard = {
  tone: ToolTone;
  tool: string;
  title: string;
  text: string;
  result: string;
};

type Persona = {
  key: PersonaKey;
  tabIcon: typeof Shield;
  tabLabel: string;
  badge: string;
  badgeTone: ToolTone | "neutral";
  title: string;
  text: string;
  tools: ToolRow[];
  heroVariant: "document" | "pipeline";
  mocks?: MockCard[];
  leads?: Array<{ initials: string; role: string; city: string; score: string }>;
  scenarios: ScenarioCard[];
};

const personas: Persona[] = [
  {
    key: "consultants",
    tabIcon: BriefcaseBusiness,
    tabLabel: "Consultants & Indépendants",
    badge: "💼 CONSULTANT & INDÉPENDANT",
    badgeTone: "qualion",
    title: "Votre réputation professionnelle est en jeu à chaque document envoyé.",
    text:
      "En tant que consultant, vous n'avez pas de service qualité derrière vous. Une proposition avec des métadonnées internes, un commentaire oublié ou un placeholder non remplacé — et votre crédibilité prend un coup. Mindorion vous couvre à chaque étape.",
    tools: [
      { icon: Shield, tone: "qualion", name: "Qualion", text: "Vérifie chaque proposition avant envoi client" },
      { icon: Target, tone: "prospectiq", name: "ProspectIQ", text: "Identifie vos prochains clients dans votre secteur" },
    ],
    heroVariant: "document",
    mocks: [
      {
        title: "Proposal_ClientABC_v3.docx",
        badge: "34/100",
        badgeTone: "critical",
        items: [
          { text: "Auteur interne visible dans les propriétés", tone: "critical" },
          { text: "3 commentaires de révision cachés", tone: "critical" },
          { text: "Placeholder [NOM CLIENT] non remplacé", tone: "warning" },
        ],
      },
      {
        title: "Proposal_ClientABC_final.docx",
        badge: "98/100",
        badgeTone: "good",
        items: [{ text: "Document nettoyé · Prêt à envoyer", tone: "good" }],
      },
    ],
    scenarios: [
      {
        tone: "qualion",
        tool: "Qualion",
        title: "Proposition commerciale avant envoi",
        text:
          "Qualion analyse votre proposition en 30 secondes. Métadonnées, commentaires, données sensibles, ton IA — tout est détecté avant que votre client ouvre le fichier.",
        result: "Réputation protégée · Crédibilité intacte",
      },
      {
        tone: "qualion",
        tool: "Qualion",
        title: "Livrables et rapports de mission",
        text:
          "Chaque livrable envoyé en fin de mission est vérifié. Plus de risque de laisser traîner des commentaires internes ou l'historique de révision visible par le client final.",
        result: "Livrables professionnels · Client rassuré",
      },
      {
        tone: "prospectiq",
        tool: "ProspectIQ",
        title: "Développement de votre réseau clients",
        text:
          "ProspectIQ identifie les décideurs dans votre secteur cible, qualifie les opportunités et génère des séquences d'outreach personnalisées pour développer votre portefeuille.",
        result: "Pipeline alimenté · Moins de prospection manuelle",
      },
    ],
  },
  {
    key: "sales",
    tabIcon: TrendingUp,
    tabLabel: "Équipes Sales & Avant-vente",
    badge: "📈 ÉQUIPES SALES & AVANT-VENTE",
    badgeTone: "prospectiq",
    title: "Chaque offre envoyée doit être parfaite. Chaque prospect doit être le bon.",
    text:
      "En avant-vente, une offre avec un prix de revient visible dans le suivi des modifications peut vous coûter un deal. Un prospect mal qualifié vous coûte des semaines. Mindorion élimine ces deux risques.",
    tools: [
      { icon: Shield, tone: "qualion", name: "Qualion", text: "Vérifie RFP, offres et proposals avant soumission" },
      { icon: Target, tone: "prospectiq", name: "ProspectIQ", text: "Qualifie et contacte les bons décideurs" },
    ],
    heroVariant: "pipeline",
    leads: [
      { initials: "DL", role: "Directeur Commercial · Pharma", city: "Lyon", score: "94%" },
      { initials: "VP", role: "VP Achats · Aérospatial", city: "Toulouse", score: "88%" },
      { initials: "DG", role: "DG · Cabinet conseil", city: "Paris", score: "81%" },
    ],
    scenarios: [
      {
        tone: "qualion",
        tool: "Qualion",
        title: "Réponse à appel d'offres (RFP/RFQ)",
        text:
          "Avant de soumettre une réponse à appel d'offres, Qualion vérifie que votre marge n'est pas visible dans le suivi des modifications et qu'aucun commentaire interne ne traîne dans le document.",
        result: "Marge protégée · Offre professionnelle",
      },
      {
        tone: "prospectiq",
        tool: "ProspectIQ",
        title: "Identification des décideurs clés",
        text:
          "ProspectIQ identifie les bons interlocuteurs dans vos comptes cibles — DAF, DSI, DG, Directeurs achats — et génère des séquences d'approche adaptées à chaque profil.",
        result: "Bon contact · Bon moment · Bon message",
      },
      {
        tone: "prospectiq",
        tool: "ProspectIQ",
        title: "Outreach multi-canal automatisé",
        text:
          "Créez des séquences d'outreach personnalisées — email, LinkedIn, appel — et laissez ProspectIQ gérer le suivi automatiquement pour maximiser vos taux de réponse.",
        result: "Taux de réponse en hausse · Moins de relances manuelles",
      },
    ],
  },
  {
    key: "rh",
    tabIcon: Users,
    tabLabel: "RH & Recrutement",
    badge: "👥 RH & RECRUTEMENT",
    badgeTone: "governance",
    title: "Chaque dossier envoyé engage votre responsabilité professionnelle.",
    text:
      "En recrutement, envoyer un CV avec les notes de disqualification d'un candidat précédent, ou un contrat avec des données personnelles non supprimées, peut avoir des conséquences légales. Qualion et GovernanceIQ vous protègent.",
    tools: [
      { icon: Shield, tone: "qualion", name: "Qualion", text: "Vérifie CVs, contrats et NDAs avant envoi" },
      { icon: FileText, tone: "governance", name: "GovernanceIQ", text: "Conformité RGPD des dossiers candidats" },
    ],
    heroVariant: "document",
    mocks: [
      {
        title: "CV_Candidat_Martin.docx",
        badge: "Risque RGPD",
        badgeTone: "critical",
        items: [
          { text: "Notes de disqualification visibles", tone: "critical" },
          { text: "Données personnelles précédent candidat", tone: "critical" },
          { text: "Historique de modifications actif", tone: "warning" },
        ],
      },
      {
        title: "CV_Candidat_Martin_final.docx",
        badge: "Conforme RGPD",
        badgeTone: "good",
        items: [{ text: "Document nettoyé · Données vérifiées", tone: "good" }],
      },
    ],
    scenarios: [
      {
        tone: "qualion",
        tool: "Qualion",
        title: "CVs et dossiers candidats",
        text:
          "Qualion détecte les données personnelles résiduelles, les commentaires de traitement et les notes internes avant qu'un CV ou un dossier candidat ne soit transmis à un client ou un manager.",
        result: "Conformité RGPD · Candidat protégé",
      },
      {
        tone: "qualion",
        tool: "Qualion",
        title: "Contrats et NDAs",
        text:
          "Avant signature, Qualion vérifie que les contrats de travail et NDAs ne contiennent pas de données résiduelles d'un précédent contrat — un risque juridique souvent sous-estimé.",
        result: "Risque juridique éliminé · Contrat propre",
      },
      {
        tone: "governance",
        tool: "GovernanceIQ",
        title: "Conformité RGPD à l'échelle équipe",
        text:
          "GovernanceIQ garantit que toute l'équipe RH applique les mêmes politiques documentaires — rétention des données, anonymisation, audit trail — sans effort de supervision.",
        result: "Équipe conforme · Audit simplifié",
      },
    ],
  },
  {
    key: "esn",
    tabIcon: Cog,
    tabLabel: "ESN & Ingénierie",
    badge: "⚙️ ESN & INGÉNIERIE",
    badgeTone: "neutral",
    title: "Des documents techniques à enjeux élevés. Zéro droit à l'erreur.",
    text:
      "En ESN, chaque SOW, cahier des charges ou spécification technique engage votre société. Un document distribué à 12 clients avec l'historique interne encore actif peut vous coûter un contrat. Mindorion couvre toute la chaîne.",
    tools: [
      { icon: Shield, tone: "qualion", name: "Qualion", text: "SOW, specs techniques, dossiers projets" },
      { icon: Target, tone: "prospectiq", name: "ProspectIQ", text: "Développement commercial grands comptes" },
      { icon: FileText, tone: "governance", name: "GovernanceIQ", text: "Conformité documentaire inter-équipes" },
    ],
    heroVariant: "document",
    mocks: [
      {
        title: "SOW_Projet_Technique_v2.docx",
        badge: "41/100",
        badgeTone: "critical",
        items: [
          { text: "Historique : 9 versions avec feedback interne", tone: "critical" },
          { text: "Données tarifaires dans le suivi", tone: "critical" },
          { text: "Auteur de l'entreprise précédente", tone: "warning" },
        ],
      },
      {
        title: "SOW_Projet_Technique_final.docx",
        badge: "97/100",
        badgeTone: "good",
        items: [{ text: "Prêt à distribuer aux 12 clients", tone: "good" }],
      },
    ],
    scenarios: [
      {
        tone: "qualion",
        tool: "Qualion",
        title: "Distribution de documents techniques",
        text:
          "Avant de distribuer un SOW ou des specs à plusieurs clients, Qualion supprime l'historique interne, les commentaires et les données tarifaires confidentielles en une passe.",
        result: "Fuite de données évitée · Document propre",
      },
      {
        tone: "prospectiq",
        tool: "ProspectIQ",
        title: "Développement grands comptes",
        text:
          "ProspectIQ identifie les DSI, CTO et directeurs techniques dans vos secteurs cibles (industrie, défense, pharma) et construit des séquences d'approche adaptées aux cycles longs.",
        result: "Grands comptes ciblés · Cycle raccourci",
      },
      {
        tone: "governance",
        tool: "GovernanceIQ",
        title: "Conformité documentaire multi-équipes",
        text:
          "GovernanceIQ centralise les politiques documentaires pour toutes vos équipes projet — chefs de projet, consultants, développeurs — et garantit l'uniformité des standards.",
        result: "Équipes alignées · Audits simplifiés",
      },
    ],
  },
];

export const Route = createFileRoute("/use-cases")({
  head: () =>
    createStaticMeta({
      title: "Cas d'usage | Consultants, Sales, RH, ESN | Mindorion",
      description:
        "Découvrez comment consultants, équipes sales, recruteurs et ESN utilisent Qualion, ProspectIQ et GovernanceIQ pour protéger leur réputation, prospecter et rester conformes.",
      path: "/use-cases",
    }),
  component: UseCasesPage,
});

function UseCasesPage() {
  const [activeTab, setActiveTab] = useState<PersonaKey>("consultants");

  useEffect(() => {
    if (typeof window === "undefined") return;

    const hashToTab: Record<string, PersonaKey> = {
      "#consultants": "consultants",
      "#sales": "sales",
      "#rh": "rh",
      "#esn": "esn",
    };

    const applyHash = () => {
      const nextTab = hashToTab[window.location.hash] ?? "consultants";
      setActiveTab(nextTab);

      if (hashToTab[window.location.hash]) {
        window.requestAnimationFrame(() => {
          document.querySelector(".persona-tabs")?.scrollIntoView({ behavior: "smooth", block: "start" });
        });
      }
    };

    applyHash();
    window.addEventListener("hashchange", applyHash);

    return () => {
      window.removeEventListener("hashchange", applyHash);
    };
  }, []);

  return (
    <div className="use-cases-page section-space">
      <SEOHead
        title="Cas d'usage | Consultants, Sales, RH, ESN | Mindorion"
        description="Découvrez comment consultants, équipes sales, recruteurs et ESN utilisent Qualion, ProspectIQ et GovernanceIQ pour protéger leur réputation, prospecter et rester conformes."
        path="/use-cases"
      />

      <div className="section-shell">
        <section className="mx-auto max-w-4xl text-center">
          <div className="eyebrow">CAS D'USAGE</div>
          <h1 className="headline-balance mt-4 text-4xl font-extrabold text-foreground sm:text-5xl">
            Comment les professionnels B2B utilisent Mindorion
          </h1>
          <p className="mx-auto mt-5 max-w-3xl text-lg leading-8 text-muted-foreground">
            Que vous soyez consultant, commercial, recruteur ou ingénieur — Mindorion détecte ce que vous ne voyez pas, trouve vos prochains clients et garantit votre conformité.
          </p>
        </section>

        <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as PersonaKey)} className="mt-12">
          <TabsList className="persona-tabs mx-auto grid h-auto w-full max-w-5xl grid-cols-1 gap-3 rounded-none bg-transparent p-0 md:grid-cols-2 xl:grid-cols-4">
            {personas.map((persona) => {
              const Icon = persona.tabIcon;
              return (
                <TabsTrigger
                  key={persona.key}
                  value={persona.key}
                  className="persona-tab h-auto rounded-xl border border-border bg-card px-5 py-4 text-left data-[state=active]:border-[var(--color-pricing-primary)] data-[state=active]:border-2 data-[state=active]:bg-[var(--color-pricing-primary-soft)] data-[state=active]:text-foreground data-[state=active]:shadow-none"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-muted text-foreground">
                      <Icon className="h-4.5 w-4.5" />
                    </div>
                    <div className="text-sm font-semibold leading-5">{persona.tabLabel}</div>
                  </div>
                </TabsTrigger>
              );
            })}
          </TabsList>

          {personas.map((persona) => (
            <TabsContent key={persona.key} value={persona.key} className="persona-panel mt-8 space-y-8">
              <section className="grid gap-6 xl:grid-cols-[1.15fr_0.85fr]">
                <div className="rounded-xl border border-border bg-card p-6 sm:p-8">
                  <Badge tone={persona.badgeTone}>{persona.badge}</Badge>
                  <h2 className="mt-5 text-3xl font-extrabold leading-tight text-foreground sm:text-4xl">{persona.title}</h2>
                  <p className="mt-5 text-base leading-8 text-muted-foreground">{persona.text}</p>
                  <div className="mt-8 grid gap-3 sm:grid-cols-2">
                    {persona.tools.map((tool) => (
                      <ToolCard key={tool.name + tool.text} tool={tool} />
                    ))}
                  </div>
                </div>

                <div className="rounded-xl border border-border bg-card p-5 sm:p-6">
                  {persona.heroVariant === "pipeline" && persona.leads ? <PipelineCard leads={persona.leads} /> : <DocumentMock cards={persona.mocks ?? []} />}
                </div>
              </section>

              <section className="grid gap-6 xl:grid-cols-3">
                {persona.scenarios.map((scenario) => (
                  <article key={scenario.title} className="rounded-xl border border-border bg-card p-6">
                    <div className="flex items-center gap-3">
                      <ToolPill tone={scenario.tone} label={scenario.tool} />
                    </div>
                    <h3 className="mt-5 text-xl font-bold text-foreground">{scenario.title}</h3>
                    <p className="mt-4 text-sm leading-7 text-muted-foreground">{scenario.text}</p>
                    <div className="mt-6 inline-flex items-center gap-2 rounded-full bg-[var(--color-usecase-page)] px-3 py-2 text-sm font-medium text-foreground">
                      <Check className="h-4 w-4 text-[var(--color-usecase-good)]" />
                      <span>{scenario.result}</span>
                    </div>
                  </article>
                ))}
              </section>
            </TabsContent>
          ))}
        </Tabs>

        <section className="mt-12 flex flex-col gap-6 rounded-[10px] bg-[var(--color-pricing-primary)] px-6 py-6 sm:px-8 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h2 className="text-2xl font-extrabold text-white">Prêt à opérer au plus haut niveau ?</h2>
            <p className="mt-2 max-w-2xl text-base text-[var(--color-pricing-primary-soft)]">
              Commencez avec Qualion. Ajoutez ProspectIQ. Gouvernez avec GovernanceIQ.
            </p>
          </div>
          <Button asChild className="rounded-xl bg-white text-[var(--color-pricing-primary)] shadow-none hover:bg-white/95">
            <Link to="/pricing">
              Voir les tarifs
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </section>
      </div>
    </div>
  );
}

function Badge({ tone, children }: { tone: Persona["badgeTone"]; children: string }) {
  const className =
    tone === "qualion"
      ? "bg-[var(--color-pricing-primary-soft)] text-[var(--color-pricing-primary)]"
      : tone === "prospectiq"
        ? "bg-[var(--color-pricing-success-soft)] text-[var(--color-pricing-success)]"
        : tone === "governance"
          ? "bg-[var(--color-usecase-warning-soft)] text-[var(--color-usecase-warning)]"
          : "bg-[var(--color-pricing-dash-soft)] text-foreground";

  return <div className={cn("inline-flex rounded-full px-3 py-1.5 text-sm font-semibold", className)}>{children}</div>;
}

function ToolCard({ tool }: { tool: ToolRow }) {
  const Icon = tool.icon;
  return (
    <div className="rounded-xl bg-[var(--color-pricing-dash-soft)] px-4 py-4">
      <div className="flex items-start gap-3">
        <ToolIcon tone={tool.tone}>
          <Icon className="h-4 w-4" />
        </ToolIcon>
        <div>
          <div className="text-sm font-bold text-foreground">{tool.name}</div>
          <div className="mt-1 text-sm leading-6 text-muted-foreground">{tool.text}</div>
        </div>
      </div>
    </div>
  );
}

function ToolPill({ tone, label }: { tone: ToolTone; label: string }) {
  return (
    <div className="inline-flex items-center gap-2 rounded-full bg-[var(--color-usecase-page)] px-3 py-2 text-sm font-semibold text-foreground">
      <ToolIcon tone={tone}>{label === "Qualion" ? <Shield className="h-4 w-4" /> : label === "ProspectIQ" ? <Target className="h-4 w-4" /> : <FileText className="h-4 w-4" />}</ToolIcon>
      <span>{label}</span>
    </div>
  );
}

function ToolIcon({ tone, children }: { tone: ToolTone; children: React.ReactNode }) {
  const className =
    tone === "qualion"
      ? "bg-[var(--color-pricing-primary-soft)] text-[var(--color-pricing-primary)]"
      : tone === "prospectiq"
        ? "bg-[var(--color-pricing-success-soft)] text-[var(--color-pricing-success)]"
        : "bg-[var(--color-usecase-warning-soft)] text-[var(--color-usecase-warning)]";

  return <span className={cn("flex h-9 w-9 items-center justify-center rounded-xl", className)}>{children}</span>;
}

function DocumentMock({ cards }: { cards: MockCard[] }) {
  return (
    <div className="space-y-4 rounded-xl bg-[var(--color-pricing-dash-soft)] p-4">
      {cards.map((card) => (
        <div key={card.title} className="rounded-xl border border-border bg-card p-4">
          <div className="flex items-center justify-between gap-3">
            <div className="text-sm font-bold text-foreground">{card.title}</div>
            <RiskBadge tone={card.badgeTone}>{card.badge}</RiskBadge>
          </div>
          <div className="mt-4 space-y-2.5">
            {card.items.map((item) => (
              <RiskItem key={item.text} item={item} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

function PipelineCard({ leads }: { leads: Persona["leads"] }) {
  return (
    <div className="rounded-xl bg-[var(--color-pricing-dash-soft)] p-4">
      <div className="rounded-xl border border-border bg-card overflow-hidden">
        <div className="bg-[var(--color-pricing-success-soft)] px-4 py-3 text-sm font-bold text-[var(--color-pricing-success)]">
          🎯 ProspectIQ — Prospects qualifiés
        </div>
        <div className="space-y-3 p-4">
          {leads?.map((lead) => (
            <div key={lead.initials + lead.role} className="flex items-center gap-3 rounded-xl border border-border bg-card px-3 py-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[var(--color-pricing-success-soft)] text-sm font-bold text-[var(--color-pricing-success)]">
                {lead.initials}
              </div>
              <div className="min-w-0 flex-1">
                <div className="truncate text-sm font-semibold text-foreground">{lead.role}</div>
                <div className="text-sm text-muted-foreground">{lead.city}</div>
              </div>
              <div className="rounded-full bg-[var(--color-pricing-success-soft)] px-2.5 py-1 text-sm font-bold text-[var(--color-pricing-success)]">
                {lead.score}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function RiskBadge({ tone, children }: { tone: RiskTone; children: string }) {
  return <span className={cn("rounded-full px-2.5 py-1 text-xs font-bold", riskToneClasses[tone])}>{children}</span>;
}

function RiskItem({ item }: { item: StatusItem }) {
  return <div className={cn("rounded-lg px-3 py-2 text-sm font-medium", riskToneClasses[item.tone])}>{item.text}</div>;
}

const riskToneClasses: Record<RiskTone, string> = {
  critical: "bg-[var(--color-usecase-critical-soft)] text-[var(--color-usecase-critical)]",
  warning: "bg-[var(--color-usecase-warning-soft)] text-[var(--color-usecase-warning)]",
  good: "bg-[var(--color-pricing-success-soft)] text-[var(--color-usecase-good)]",
};
