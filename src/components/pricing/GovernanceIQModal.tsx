import { Dialog, DialogContent } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

export type GovernancePlan = "starter" | "pro" | "business" | "enterprise";

interface GovernanceIQModalProps {
  plan: GovernancePlan;
  open: boolean;
  onClose: () => void;
}

interface PlanContent {
  badge: string;
  badgeClass: string;
  subtitle: string;
  features: { icon: string; title: string; desc: string }[];
  upgrade?: string;
}

const PLAN_CONTENT: Record<GovernancePlan, PlanContent> = {
  starter: {
    badge: "Starter · €19/month",
    badgeClass: "bg-gray-100 text-gray-600",
    subtitle: "Vue personnelle — suivez votre propre qualité documentaire.",
    features: [
      { icon: "📊", title: "Score qualité personnel", desc: "Score /100 basé sur vos 30 derniers documents analysés." },
      { icon: "⚠️", title: "Répartition des risques", desc: "Métadonnées, placeholders, données sensibles — visualisés par catégorie." },
      { icon: "📄", title: "Historique 30 jours", desc: "Vos 30 derniers documents avec score et date." },
      { icon: "🔒", title: "Vue solo uniquement", desc: "Pas de vue équipe ni de gestion de rôles." },
    ],
    upgrade: "Passez en Pro pour l'historique 6 mois et les conseils IA personnalisés.",
  },
  pro: {
    badge: "Pro · €39/month",
    badgeClass: "bg-violet-100 text-violet-700",
    subtitle: "Vue personnelle enrichie — analytics avancés et recommandations IA.",
    features: [
      { icon: "📊", title: "Score qualité + évolution", desc: "Graphique sur 6 mois, tendances et dérives détectées." },
      { icon: "🤖", title: "Conseil IA personnalisé", desc: "Recommandations basées sur vos patterns de risques récurrents." },
      { icon: "📄", title: "Historique 6 mois", desc: "Tous vos documents avec score, date et catégorie de risque." },
      { icon: "📥", title: "Export PDF rapport", desc: "Rapport GovernanceIQ personnel téléchargeable." },
      { icon: "🔒", title: "Vue solo uniquement", desc: "Pas de vue équipe ni de gestion de rôles." },
    ],
    upgrade: "Passez en Business pour la vue équipe et la gestion des rôles (jusqu'à 5 membres).",
  },
  business: {
    badge: "Business · €59/user/month",
    badgeClass: "bg-emerald-100 text-emerald-700",
    subtitle: "Vue équipe — pilotez la qualité documentaire de toute votre structure.",
    features: [
      { icon: "👥", title: "Vue équipe complète", desc: "Score agrégé + score individuel par membre (jusqu'à 5 users)." },
      { icon: "🎭", title: "Gestion des rôles", desc: "Admin, Manager, Membre. Chaque rôle voit son périmètre." },
      { icon: "🔔", title: "Alertes cross-membres", desc: "Docs à risque envoyés, scores en chute, membres inactifs depuis 14j." },
      { icon: "✉️", title: "Invitation par lien sécurisé", desc: "Ajoutez vos membres via un lien d'invitation (token 48h)." },
      { icon: "📊", title: "Dashboard manager", desc: "Tableau de bord équipe + leaderboard qualité documentaire." },
    ],
    upgrade: "Passez en Enterprise pour la hiérarchie complète (CEO → N+2 → Manager) et les membres illimités.",
  },
  enterprise: {
    badge: "Enterprise · Custom",
    badgeClass: "bg-amber-100 text-amber-700",
    subtitle: "Gouvernance complète — hiérarchie sur-mesure, configuration IT, rapports dirigeants.",
    features: [
      { icon: "🏛️", title: "Hiérarchie en cascade", desc: "CEO → N+2 → N+1 → Manager → Membre. Chaque niveau voit l'agrégat du niveau en dessous." },
      { icon: "⚙️", title: "Configuration IT tête par tête", desc: "Rôles, périmètres et accès configurés par votre équipe IT interne." },
      { icon: "🔐", title: "SSO / SAML", desc: "Connexion via votre Identity Provider (Okta, Azure AD, Google Workspace...)." },
      { icon: "📈", title: "Rapports dirigeants automatisés", desc: "Rapports PDF hebdomadaires / mensuels pour le board et le COMEX." },
      { icon: "♾️", title: "Membres illimités", desc: "Pas de limite de slots. Toute l'organisation couverte." },
      { icon: "👨‍💼", title: "CSM dédié", desc: "Accompagnement onboarding + suivi trimestriel inclus." },
    ],
  },
};

export function GovernanceIQModal({ plan, open, onClose }: GovernanceIQModalProps) {
  const content = PLAN_CONTENT[plan];

  return (
    <Dialog open={open} onOpenChange={(o) => { if (!o) onClose(); }}>
      <DialogContent className="max-w-md sm:max-w-lg max-h-[90vh] overflow-y-auto rounded-2xl">
        <div className="flex items-start gap-3">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-violet-100 text-xl">
            📊
          </div>
          <div className="flex-1">
            <div className="text-lg font-bold text-foreground">GovernanceIQ</div>
            <span className={cn("inline-flex mt-1 text-xs font-semibold px-2 py-1 rounded-md", content.badgeClass)}>
              {content.badge}
            </span>
          </div>
        </div>

        <p className="mt-4 text-sm text-muted-foreground leading-6">{content.subtitle}</p>

        <div className="mt-5 space-y-3">
          {content.features.map((f) => (
            <div key={f.title} className="flex items-start gap-3 rounded-xl border border-border bg-card p-3">
              <span className="text-lg leading-none mt-0.5">{f.icon}</span>
              <div className="flex-1">
                <div className="text-sm font-semibold text-foreground">{f.title}</div>
                <div className="mt-1 text-xs text-muted-foreground leading-5">{f.desc}</div>
              </div>
            </div>
          ))}
        </div>

        {content.upgrade && (
          <div className="mt-5 rounded-xl bg-violet-50 border border-violet-200 px-4 py-3 text-xs font-medium text-violet-700">
            ↑ {content.upgrade}
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
