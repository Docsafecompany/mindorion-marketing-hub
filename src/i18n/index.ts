import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import en from "./locales/en.json";
import fr from "./locales/fr.json";

export const LANGUAGE_STORAGE_KEY = "language";
export const DEFAULT_LANGUAGE = "en";
export const SUPPORTED_LANGUAGES = ["en", "fr"] as const;
export type SiteLanguage = (typeof SUPPORTED_LANGUAGES)[number];

function normalizeLanguage(value?: string | null): SiteLanguage {
  if (!value) return DEFAULT_LANGUAGE;
  const short = value.toLowerCase().slice(0, 2);
  return short === "fr" ? "fr" : "en";
}

export function getPreferredLanguage(): SiteLanguage {
  if (typeof window === "undefined") {
    return DEFAULT_LANGUAGE;
  }

  const stored = window.localStorage.getItem(LANGUAGE_STORAGE_KEY);
  if (stored) {
    return normalizeLanguage(stored);
  }

  return normalizeLanguage(window.navigator.language);
}

export async function setLanguage(language: SiteLanguage) {
  if (typeof window !== "undefined") {
    window.localStorage.setItem(LANGUAGE_STORAGE_KEY, language);
  }

  await i18n.changeLanguage(language);
}

void i18n.use(initReactI18next).init({
  resources: {
    en: { translation: en },
    fr: { translation: fr },
  },
  lng: DEFAULT_LANGUAGE,
  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
  },
  returnObjects: true,
});

if (typeof window !== "undefined") {
  const preferred = getPreferredLanguage();
  if (preferred !== i18n.language) {
    void i18n.changeLanguage(preferred);
  }
}

export default i18n;
