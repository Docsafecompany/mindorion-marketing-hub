// GA4 + Consent Mode v2 helpers. No-ops if GA Measurement ID is missing.

declare global {
  interface Window {
    dataLayer: unknown[];
    gtag: (...args: unknown[]) => void;
  }
}

const CONSENT_STORAGE_KEY = "mindorion-consent";
export const CONSENT_VERSION = 1;
export const OPEN_COOKIE_PREFS_EVENT = "mindorion:open-cookie-preferences";
export const CONSENT_UPDATED_EVENT = "mindorion:consent-updated";

export type ConsentChoice = {
  version: number;
  timestamp: string;
  necessary: true;
  analytics: boolean;
  preferences: boolean;
};

export function getStoredConsent(): ConsentChoice | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(CONSENT_STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as ConsentChoice;
    if (!parsed || typeof parsed !== "object") return null;
    if (parsed.version !== CONSENT_VERSION) return null;
    return parsed;
  } catch {
    return null;
  }
}

export function saveConsent(choice: Omit<ConsentChoice, "version" | "timestamp" | "necessary">): ConsentChoice {
  const stored: ConsentChoice = {
    version: CONSENT_VERSION,
    timestamp: new Date().toISOString(),
    necessary: true,
    analytics: choice.analytics,
    preferences: choice.preferences,
  };
  try {
    window.localStorage.setItem(CONSENT_STORAGE_KEY, JSON.stringify(stored));
  } catch {
    // ignore
  }
  applyConsent(stored);
  window.dispatchEvent(new CustomEvent(CONSENT_UPDATED_EVENT, { detail: stored }));
  return stored;
}

function getMeasurementId(): string | null {
  const fromEnv = (import.meta.env.VITE_GA_MEASUREMENT_ID as string | undefined) ?? null;
  // Fallback to known production ID provided by the team.
  return fromEnv && fromEnv.trim() ? fromEnv : "G-BHZ697CQEY";
}

let gaInitialized = false;

export function initAnalytics(): void {
  if (typeof window === "undefined" || gaInitialized) return;
  const id = getMeasurementId();
  if (!id) {
    // eslint-disable-next-line no-console
    console.warn("[analytics] VITE_GA_MEASUREMENT_ID is not set — GA4 disabled.");
    return;
  }

  gaInitialized = true;

  window.dataLayer = window.dataLayer || [];
  window.gtag = function gtag() {
    // eslint-disable-next-line prefer-rest-params
    window.dataLayer.push(arguments);
  } as typeof window.gtag;

  // Load gtag.js
  const script = document.createElement("script");
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(id)}`;
  document.head.appendChild(script);

  window.gtag("js", new Date());
  window.gtag("config", id, {
    anonymize_ip: true,
    send_page_view: false,
  });

  // Re-apply any previously stored consent so the user's prior choice persists.
  const stored = getStoredConsent();
  if (stored) applyConsent(stored);
}

function applyConsent(choice: ConsentChoice): void {
  if (typeof window === "undefined" || typeof window.gtag !== "function") return;
  window.gtag("consent", "update", {
    ad_storage: "denied",
    ad_user_data: "denied",
    ad_personalization: "denied",
    analytics_storage: choice.analytics ? "granted" : "denied",
    functionality_storage: choice.preferences ? "granted" : "denied",
    personalization_storage: choice.preferences ? "granted" : "denied",
    security_storage: "granted",
  });
}

export function trackEvent(name: string, params?: Record<string, unknown>): void {
  if (typeof window === "undefined") return;
  const stored = getStoredConsent();
  if (!stored || !stored.analytics) return;
  if (typeof window.gtag !== "function") return;
  window.gtag("event", name, params ?? {});
}

export function trackPageView(path: string): void {
  if (typeof window === "undefined") return;
  const stored = getStoredConsent();
  if (!stored || !stored.analytics) return;
  if (typeof window.gtag !== "function") return;
  window.gtag("event", "page_view", {
    page_path: path,
    page_location: window.location.href,
    page_title: document.title,
  });
}

export function openCookiePreferences(): void {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new Event(OPEN_COOKIE_PREFS_EVENT));
}
