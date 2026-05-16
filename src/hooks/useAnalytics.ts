import { trackEvent, trackPageView } from "@/lib/analytics";

export { trackEvent, trackPageView };

export function useAnalytics() {
  return { trackEvent, trackPageView };
}
