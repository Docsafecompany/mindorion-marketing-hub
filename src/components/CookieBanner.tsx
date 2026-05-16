import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Switch } from "@/components/ui/switch";
import {
  OPEN_COOKIE_PREFS_EVENT,
  getStoredConsent,
  saveConsent,
} from "@/lib/analytics";

export function CookieBanner() {
  const { t } = useTranslation();
  const [visible, setVisible] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [analytics, setAnalytics] = useState(false);
  const [preferences, setPreferences] = useState(false);

  // Decide initial visibility on mount.
  useEffect(() => {
    const stored = getStoredConsent();
    if (!stored) {
      setVisible(true);
    } else {
      setAnalytics(stored.analytics);
      setPreferences(stored.preferences);
    }

    const openHandler = () => {
      const current = getStoredConsent();
      if (current) {
        setAnalytics(current.analytics);
        setPreferences(current.preferences);
      }
      setModalOpen(true);
    };
    window.addEventListener(OPEN_COOKIE_PREFS_EVENT, openHandler);
    return () => window.removeEventListener(OPEN_COOKIE_PREFS_EVENT, openHandler);
  }, []);

  const acceptAll = () => {
    saveConsent({ analytics: true, preferences: true });
    setAnalytics(true);
    setPreferences(true);
    setVisible(false);
    setModalOpen(false);
  };

  const rejectAll = () => {
    saveConsent({ analytics: false, preferences: false });
    setAnalytics(false);
    setPreferences(false);
    setVisible(false);
    setModalOpen(false);
  };

  const savePreferences = () => {
    saveConsent({ analytics, preferences });
    setVisible(false);
    setModalOpen(false);
  };

  return (
    <>
      {visible ? (
        <div
          role="dialog"
          aria-live="polite"
          aria-label={t("cookieBanner.title")}
          className="fixed inset-x-0 bottom-0 z-[100] border-t border-border bg-background/98 shadow-2xl backdrop-blur"
        >
          <div className="section-shell flex flex-col gap-4 py-5 sm:flex-row sm:items-center sm:justify-between sm:gap-6">
            <div className="flex-1">
              <div className="text-sm font-bold text-foreground">{t("cookieBanner.title")}</div>
              <p className="mt-1 text-sm leading-6 text-muted-foreground">
                {t("cookieBanner.description")}{" "}
                <Link to="/legal/privacy" className="underline underline-offset-2 hover:text-foreground">
                  {t("cookieBanner.privacyLink")}
                </Link>
                .
              </p>
            </div>
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-3">
              <button
                type="button"
                onClick={() => setModalOpen(true)}
                className="text-sm font-medium text-muted-foreground underline underline-offset-2 hover:text-foreground"
              >
                {t("cookieBanner.customize")}
              </button>
              <Button variant="outline" size="sm" className="rounded-xl" onClick={rejectAll}>
                {t("cookieBanner.rejectAll")}
              </Button>
              <Button size="sm" className="rounded-xl" onClick={acceptAll}>
                {t("cookieBanner.acceptAll")}
              </Button>
            </div>
          </div>
        </div>
      ) : null}

      <Dialog open={modalOpen} onOpenChange={setModalOpen}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>{t("cookieBanner.modal.title")}</DialogTitle>
            <DialogDescription>{t("cookieBanner.modal.description")}</DialogDescription>
          </DialogHeader>

          <div className="mt-2 space-y-4">
            <CategoryRow
              title={t("cookieBanner.categories.necessary.title")}
              description={t("cookieBanner.categories.necessary.description")}
              checked
              disabled
              onChange={() => {}}
            />
            <CategoryRow
              title={t("cookieBanner.categories.analytics.title")}
              description={t("cookieBanner.categories.analytics.description")}
              checked={analytics}
              onChange={setAnalytics}
            />
            <CategoryRow
              title={t("cookieBanner.categories.preferences.title")}
              description={t("cookieBanner.categories.preferences.description")}
              checked={preferences}
              onChange={setPreferences}
            />
          </div>

          <div className="mt-6 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
            <Button variant="outline" className="rounded-xl" onClick={rejectAll}>
              {t("cookieBanner.rejectAll")}
            </Button>
            <Button variant="outline" className="rounded-xl" onClick={savePreferences}>
              {t("cookieBanner.savePreferences")}
            </Button>
            <Button className="rounded-xl" onClick={acceptAll}>
              {t("cookieBanner.acceptAll")}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}

function CategoryRow({
  title,
  description,
  checked,
  disabled,
  onChange,
}: {
  title: string;
  description: string;
  checked: boolean;
  disabled?: boolean;
  onChange: (value: boolean) => void;
}) {
  return (
    <div className="flex items-start justify-between gap-4 rounded-lg border border-border/70 bg-card/40 p-4">
      <div>
        <div className="text-sm font-semibold text-foreground">{title}</div>
        <p className="mt-1 text-sm leading-6 text-muted-foreground">{description}</p>
      </div>
      <Switch checked={checked} disabled={disabled} onCheckedChange={onChange} />
    </div>
  );
}
