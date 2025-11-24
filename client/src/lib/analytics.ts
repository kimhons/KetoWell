// Google Analytics 4 Integration
// This file provides type-safe event tracking for GA4

declare global {
  interface Window {
    gtag?: (
      command: string,
      targetId: string | Date,
      config?: Record<string, any>
    ) => void;
    dataLayer?: any[];
  }
}

// GA4 Measurement ID - Replace with your actual GA4 ID
export const GA4_MEASUREMENT_ID = import.meta.env.VITE_GA4_MEASUREMENT_ID || "G-XXXXXXXXXX";

// Initialize GA4
export const initGA4 = () => {
  if (typeof window === "undefined") return;
  
  // Create dataLayer if it doesn't exist
  window.dataLayer = window.dataLayer || [];
  
  // Define gtag function
  window.gtag = function() {
    window.dataLayer?.push(arguments);
  };
  
  // Initialize with timestamp
  window.gtag("js", new Date());
  
  // Configure GA4
  window.gtag("config", GA4_MEASUREMENT_ID, {
    send_page_view: false, // We'll handle page views manually
  });
};

// Track page views
export const trackPageView = (path: string, title: string) => {
  if (typeof window === "undefined" || !window.gtag) return;
  
  window.gtag("event", "page_view", {
    page_path: path,
    page_title: title,
  });
};

// Event tracking functions

export const trackNewsletterSignup = (source: string) => {
  if (typeof window === "undefined" || !window.gtag) return;
  
  window.gtag("event", "newsletter_signup", {
    event_category: "engagement",
    event_label: source,
    value: 1,
  });
  
  // Also track as conversion
  window.gtag("event", "conversion", {
    send_to: GA4_MEASUREMENT_ID,
    event_category: "conversion",
    event_label: "newsletter_signup",
  });
};

export const trackAppDownloadClick = (platform: "ios" | "android") => {
  if (typeof window === "undefined" || !window.gtag) return;
  
  window.gtag("event", "download_app_click", {
    event_category: "conversion",
    event_label: platform,
    value: 1,
  });
  
  // Track as conversion
  window.gtag("event", "conversion", {
    send_to: GA4_MEASUREMENT_ID,
    event_category: "conversion",
    event_label: `download_${platform}`,
  });
};

export const trackNavigationClick = (destination: string) => {
  if (typeof window === "undefined" || !window.gtag) return;
  
  window.gtag("event", "navigation_click", {
    event_category: "navigation",
    event_label: destination,
  });
};

export const trackBlogArticleView = (articleTitle: string, articleSlug: string) => {
  if (typeof window === "undefined" || !window.gtag) return;
  
  window.gtag("event", "blog_article_view", {
    event_category: "content",
    event_label: articleTitle,
    article_slug: articleSlug,
  });
};

export const trackResearchTabClick = (tabName: string) => {
  if (typeof window === "undefined" || !window.gtag) return;
  
  window.gtag("event", "research_tab_click", {
    event_category: "engagement",
    event_label: tabName,
  });
};

export const trackPricingPlanClick = (planName: string) => {
  if (typeof window === "undefined" || !window.gtag) return;
  
  window.gtag("event", "pricing_plan_click", {
    event_category: "conversion",
    event_label: planName,
    value: planName === "Premium" ? 9.99 : planName === "Clinical" ? 19.99 : 0,
  });
};

export const trackProviderDemoRequest = () => {
  if (typeof window === "undefined" || !window.gtag) return;
  
  window.gtag("event", "provider_demo_request", {
    event_category: "conversion",
    event_label: "demo_request",
    value: 1,
  });
  
  // Track as conversion
  window.gtag("event", "conversion", {
    send_to: GA4_MEASUREMENT_ID,
    event_category: "conversion",
    event_label: "provider_demo",
  });
};

export const trackSocialShare = (platform: string, contentType: string) => {
  if (typeof window === "undefined" || !window.gtag) return;
  
  window.gtag("event", "share", {
    event_category: "engagement",
    method: platform,
    content_type: contentType,
  });
};

export const trackExternalLinkClick = (url: string, linkText: string) => {
  if (typeof window === "undefined" || !window.gtag) return;
  
  window.gtag("event", "external_link_click", {
    event_category: "engagement",
    event_label: linkText,
    url: url,
  });
};

export const trackFormSubmit = (formName: string) => {
  if (typeof window === "undefined" || !window.gtag) return;
  
  window.gtag("event", "form_submit", {
    event_category: "engagement",
    event_label: formName,
  });
};

export const trackScrollDepth = (depth: number) => {
  if (typeof window === "undefined" || !window.gtag) return;
  
  window.gtag("event", "scroll_depth", {
    event_category: "engagement",
    value: depth,
  });
};

// Custom event tracking
export const trackCustomEvent = (
  eventName: string,
  params?: Record<string, any>
) => {
  if (typeof window === "undefined" || !window.gtag) return;
  
  window.gtag("event", eventName, params);
};
