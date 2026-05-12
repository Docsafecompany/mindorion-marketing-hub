import { useTranslation } from "react-i18next";

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

const BADGE_CLASS: Record<GovernancePlan, string> = {
  starter: "bg-gray-100 text-gray-600",
  pro: "bg-violet-100 text-violet-700",
  business: "bg-emerald-100 text-emerald-700",
  enterprise: "bg-amber-100 text-amber-700",
};

const FEATURE_ICONS: Record<GovernancePlan, string[]> = {
  starter: ["📊", "⚠️", "📄", "🔒"],
  pro: ["📊", "🤖", "📄", "📥", "🔒"],
  business: ["👥", "🎭", "🔔", "✉️", "📊"],
  enterprise: ["🏛️", "⚙️", "🔐", "📈", "♾️", "👨‍💼"],
};

export function GovernanceIQModal({ plan, open, onClose }: GovernanceIQModalProps) {
  const { t } = useTranslation();
  const raw = t(`governanceiq.plans.${plan}`, { returnObjects: true }) as {
    badge: string;
    subtitle: string;
    features: Array<{ title: string; desc: string }>;
    upgrade?: string;
  };
  const icons = FEATURE_ICONS[plan];
  const content: PlanContent = {
    badge: raw.badge,
    badgeClass: BADGE_CLASS[plan],
    subtitle: raw.subtitle,
    features: raw.features.map((f, i) => ({ ...f, icon: icons[i] })),
    upgrade: raw.upgrade,
  };

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
