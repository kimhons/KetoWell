import { useEffect } from "react";
import { useLocation } from "wouter";
import { initGA4, trackPageView, GA4_MEASUREMENT_ID } from "@/lib/analytics";

export default function AnalyticsProvider({ children }: { children: React.ReactNode }) {
  const [location] = useLocation();

  useEffect(() => {
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
  }, []);

  useEffect(() => {
    // Track page views on route change
    const pageTitle = document.title;
    trackPageView(location, pageTitle);
  }, [location]);

  return <>{children}</>;
}
