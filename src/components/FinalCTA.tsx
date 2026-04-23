import { useTranslation } from "react-i18next";

import { Button } from "@/components/ui/button";
import { SIGNUP_URL } from "@/lib/site";

export function FinalCTA() {
  const { t } = useTranslation();
  const words = t("home.finalTitle").split(" ");

  return (
    <section className="hero-wash py-20">
      <div className="section-shell">
        <div className="mx-auto max-w-[600px] px-6 text-center">
          <h2 className="text-[32px] font-bold text-foreground">
            {words.map((word, index) => (
              <span key={`${word}-${index}`}>
                {index === words.length - 1 ? <span className="brand-gradient-text">{word}</span> : word}
                {index < words.length - 1 ? " " : ""}
              </span>
            ))}
          </h2>
          <p className="mt-4 text-muted-foreground">{t("home.finalText")}</p>
          <div className="mt-8 flex justify-center">
            <a href={SIGNUP_URL}>
              <Button size="lg" className="h-[52px] px-8">
                {t("common.startFree")} →
              </Button>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}