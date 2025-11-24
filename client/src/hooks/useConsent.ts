import { useState, useEffect } from "react";

export type ConsentPreferences = {
  necessary: boolean; // Always true, can't be disabled
  analytics: boolean;
  marketing: boolean;
};

const CONSENT_KEY = "ketowell_cookie_consent";
const CONSENT_VERSION = "1.0";

export type ConsentState = {
  hasResponded: boolean;
  version: string;
  preferences: ConsentPreferences;
  timestamp: number;
};

const defaultPreferences: ConsentPreferences = {
  necessary: true,
  analytics: false,
  marketing: false,
};

const getStoredConsent = (): ConsentState | null => {
  if (typeof window === "undefined") return null;
  
  try {
    const stored = localStorage.getItem(CONSENT_KEY);
    if (!stored) return null;
    
    const parsed = JSON.parse(stored) as ConsentState;
    
    // Check if consent version matches
    if (parsed.version !== CONSENT_VERSION) {
      return null;
    }
    
    return parsed;
  } catch (error) {
    console.error("Error reading consent:", error);
    return null;
  }
};

const saveConsent = (preferences: ConsentPreferences) => {
  if (typeof window === "undefined") return;
  
  const consentState: ConsentState = {
    hasResponded: true,
    version: CONSENT_VERSION,
    preferences,
    timestamp: Date.now(),
  };
  
  try {
    localStorage.setItem(CONSENT_KEY, JSON.stringify(consentState));
  } catch (error) {
    console.error("Error saving consent:", error);
  }
};

export const useConsent = () => {
  const [consentState, setConsentState] = useState<ConsentState | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const stored = getStoredConsent();
    setConsentState(stored);
    setIsLoading(false);
  }, []);

  const acceptAll = () => {
    const preferences: ConsentPreferences = {
      necessary: true,
      analytics: true,
      marketing: true,
    };
    
    saveConsent(preferences);
    setConsentState({
      hasResponded: true,
      version: CONSENT_VERSION,
      preferences,
      timestamp: Date.now(),
    });
  };

  const declineAll = () => {
    const preferences: ConsentPreferences = {
      necessary: true,
      analytics: false,
      marketing: false,
    };
    
    saveConsent(preferences);
    setConsentState({
      hasResponded: true,
      version: CONSENT_VERSION,
      preferences,
      timestamp: Date.now(),
    });
  };

  const setPreferences = (preferences: ConsentPreferences) => {
    // Ensure necessary is always true
    const finalPreferences = {
      ...preferences,
      necessary: true,
    };
    
    saveConsent(finalPreferences);
    setConsentState({
      hasResponded: true,
      version: CONSENT_VERSION,
      preferences: finalPreferences,
      timestamp: Date.now(),
    });
  };

  const resetConsent = () => {
    if (typeof window === "undefined") return;
    
    localStorage.removeItem(CONSENT_KEY);
    setConsentState(null);
  };

  const hasConsent = (category: keyof ConsentPreferences): boolean => {
    if (!consentState || !consentState.hasResponded) return false;
    return consentState.preferences[category];
  };

  return {
    consentState,
    isLoading,
    hasResponded: consentState?.hasResponded ?? false,
    hasConsent,
    acceptAll,
    declineAll,
    setPreferences,
    resetConsent,
    preferences: consentState?.preferences ?? defaultPreferences,
  };
};
