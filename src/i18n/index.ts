import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import en from "./locales/en.json";
import fr from "./locales/fr.json";

export const LANGUAGE_STORAGE_KEY = "language";
export const LANGUAGE_SOURCE_KEY = "language-source";
export const DEFAULT_LANGUAGE = "en";
export const SUPPORTED_LANGUAGES = ["en", "fr"] as const;
export type SiteLanguage = (typeof SUPPORTED_LANGUAGES)[number];

function normalizeLanguage(value?: string | null): SiteLanguage {
  if (!value) return DEFAULT_LANGUAGE;
  const short = value.toLowerCase().slice(0, 2);
  return short === "fr" ? "fr" : "en";
}

export function getStoredLanguage(): SiteLanguage | null {
  if (typeof window === "undefined") return null;
  const stored = window.localStorage.getItem(LANGUAGE_STORAGE_KEY);
  return stored ? normalizeLanguage(stored) : null;
}

export function getPreferredLanguage(): SiteLanguage {
  if (typeof window === "undefined") return DEFAULT_LANGUAGE;
  const stored = getStoredLanguage();
  if (stored) return stored;
  const browserLanguages = window.navigator.languages?.map((v) => normalizeLanguage(v)) ?? [];
  return browserLanguages.find((v) => v === "fr") ?? normalizeLanguage(window.navigator.language);
}

export async function setLanguage(language: SiteLanguage, source: "user" | "auto" = "user") {
  if (typeof window !== "undefined") {
    window.localStorage.setItem(LANGUAGE_STORAGE_KEY, language);
    window.localStorage.setItem(LANGUAGE_SOURCE_KEY, source);
  }
  await i18n.changeLanguage(language);
}

export async function detectLanguageFromIP(): Promise<SiteLanguage | null> {
  if (typeof window === "undefined") return null;
  try {
    const res = await fetch("/api/public/geo", { headers: { Accept: "application/json" } });
    if (!res.ok) return null;
    const data = (await res.json()) as { language?: string };
    return normalizeLanguage(data.language);
  } catch {
    return null;
  }
}

void i18n.use(initReactI18next).init({
  resources: {
    en: { translation: en },
    fr: { translation: fr },
  },
  lng: typeof window !== "undefined" ? getPreferredLanguage() : DEFAULT_LANGUAGE,
  fallbackLng: "en",
  interpolation: { escapeValue: false },
  returnObjects: true,
});

if (typeof window !== "undefined") {
  const stored = getStoredLanguage();
  if (stored) {
    if (stored !== i18n.language) void i18n.changeLanguage(stored);
  } else {
    // No manual preference — detect via IP (overrides browser-language fallback)
    void detectLanguageFromIP().then((lang) => {
      if (lang && getStoredLanguage() === null) {
        void setLanguage(lang, "auto");
      }
    });
  }
}

export default i18n;
