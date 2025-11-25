import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { X, Settings, Shield, Cookie } from "lucide-react";
import { useConsent, ConsentPreferences } from "@/hooks/useConsent";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

export default function CookieConsent() {
  const { hasResponded, acceptAll, declineAll, setPreferences, preferences } = useConsent();
  const [showBanner, setShowBanner] = useState(!hasResponded);
  const [showPreferences, setShowPreferences] = useState(false);
  const [tempPreferences, setTempPreferences] = useState<ConsentPreferences>(preferences);

  const handleAcceptAll = () => {
    acceptAll();
    setShowBanner(false);
  };

  const handleDeclineAll = () => {
    declineAll();
    setShowBanner(false);
  };

  const handleSavePreferences = () => {
    setPreferences(tempPreferences);
    setShowPreferences(false);
    setShowBanner(false);
  };

  const handleOpenPreferences = () => {
    setTempPreferences(preferences);
    setShowPreferences(true);
  };

  if (!showBanner) return null;

  return (
    <>
      <AnimatePresence>
        {showBanner && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed bottom-0 left-0 right-0 z-50 p-4 md:p-6"
          >
            <Card className="max-w-5xl mx-auto p-6 shadow-2xl border-2">
              <div className="flex flex-col md:flex-row gap-6 items-start md:items-center">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <Cookie className="w-6 h-6 text-primary" />
                  </div>
                </div>
                
                <div className="flex-1 space-y-2">
                  <h3 className="font-semibold text-lg">We Value Your Privacy</h3>
                  <p className="text-sm text-muted-foreground">
                    We use cookies to enhance your experience, analyze site traffic, and personalize content. 
                    By clicking "Accept All", you consent to our use of cookies. You can manage your preferences 
                    or learn more in our{" "}
                    <a href="/privacy-policy" className="text-primary hover:underline">
                      Privacy Policy
                    </a>.
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
                  <Button
                    variant="outline"
                    onClick={handleOpenPreferences}
                    className="w-full sm:w-auto"
                  >
                    <Settings className="w-4 h-4 mr-2" />
                    Manage
                  </Button>
                  <Button
                    variant="outline"
                    onClick={handleDeclineAll}
                    className="w-full sm:w-auto"
                  >
                    Decline
                  </Button>
                  <Button
                    onClick={handleAcceptAll}
                    className="w-full sm:w-auto bg-gradient-cta hover:opacity-90"
                  >
                    Accept All
                  </Button>
                </div>
              </div>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Preferences Dialog */}
      <Dialog open={showPreferences} onOpenChange={setShowPreferences}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Shield className="w-5 h-5 text-primary" />
              Cookie Preferences
            </DialogTitle>
            <DialogDescription>
              Choose which cookies you want to allow. You can change these settings at any time.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-6 py-4">
            {/* Necessary Cookies */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label className="text-base font-semibold">Necessary Cookies</Label>
                  <p className="text-sm text-muted-foreground">
                    Required for the website to function properly. These cannot be disabled.
                  </p>
                </div>
                <Switch checked={true} disabled />
              </div>
              <div className="pl-4 space-y-1 text-xs text-muted-foreground">
                <p>• Session management</p>
                <p>• Security and authentication</p>
                <p>• User preferences</p>
              </div>
            </div>

            {/* Analytics Cookies */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label className="text-base font-semibold">Analytics Cookies</Label>
                  <p className="text-sm text-muted-foreground">
                    Help us understand how visitors interact with our website by collecting and 
                    reporting information anonymously.
                  </p>
                </div>
                <Switch
                  checked={tempPreferences.analytics}
                  onCheckedChange={(checked) =>
                    setTempPreferences({ ...tempPreferences, analytics: checked })
                  }
                />
              </div>
              <div className="pl-4 space-y-1 text-xs text-muted-foreground">
                <p>• Google Analytics 4</p>
                <p>• Page views and user behavior</p>
                <p>• Performance metrics</p>
              </div>
            </div>

            {/* Marketing Cookies */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label className="text-base font-semibold">Marketing Cookies</Label>
                  <p className="text-sm text-muted-foreground">
                    Used to track visitors across websites to display relevant advertisements 
                    and encourage engagement.
                  </p>
                </div>
                <Switch
                  checked={tempPreferences.marketing}
                  onCheckedChange={(checked) =>
                    setTempPreferences({ ...tempPreferences, marketing: checked })
                  }
                />
              </div>
              <div className="pl-4 space-y-1 text-xs text-muted-foreground">
                <p>• Advertising platforms</p>
                <p>• Social media integration</p>
                <p>• Retargeting campaigns</p>
              </div>
            </div>
          </div>

          <div className="flex justify-between gap-3">
            <Button variant="outline" onClick={() => setShowPreferences(false)}>
              Cancel
            </Button>
            <div className="flex gap-3">
              <Button
                variant="outline"
                onClick={() => {
                  setTempPreferences({
                    necessary: true,
                    analytics: false,
                    marketing: false,
                  });
                }}
              >
                Decline All
              </Button>
              <Button onClick={handleSavePreferences} className="bg-gradient-cta hover:opacity-90">
                Save Preferences
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
