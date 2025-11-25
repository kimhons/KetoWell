import { useEffect } from "react";
import { useLocation } from "wouter";
import { initGA4, trackPageView, GA4_MEASUREMENT_ID } from "@/lib/analytics";
import { useConsent } from "@/hooks/useConsent";

export default function AnalyticsProvider({ children }: { children: React.ReactNode }) {
  const [location] = useLocation();
  const { hasConsent, isLoading } = useConsent();

  useEffect(() => {
    // Don't initialize GA4 until consent is loaded
    if (isLoading) return;
    
    // Only initialize GA4 if user has consented to analytics
    if (!hasConsent("analytics")) {
      return;
    }

    // Initialize GA4 on mount
    initGA4();

    // Load GA4 script
    const script = document.createElement("script");
    script.src = `https://www.googletagmanager.com/gtag/js?id=${GA4_MEASUREMENT_ID}`;
    script.async = true;
    document.head.appendChild(script);

    return () => {
      // Cleanup script on unmount
      if (script.parentNode) {
        script.parentNode.removeChild(script);
      }
    };
  }, [hasConsent, isLoading]);

  useEffect(() => {
    // Only track page views if user has consented to analytics
    if (isLoading || !hasConsent("analytics")) return;
    
    // Track page views on route change
    const pageTitle = document.title;
    trackPageView(location, pageTitle);
  }, [location, hasConsent, isLoading]);

  return <>{children}</>;
}
