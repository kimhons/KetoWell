import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";
import { Loader2, CheckCircle2, Smartphone } from "lucide-react";
import { trackCustomEvent } from "@/lib/analytics";

interface WaitlistModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function WaitlistModal({ open, onOpenChange }: WaitlistModalProps) {
  const [email, setEmail] = useState("");
  const [platform, setPlatform] = useState<"ios" | "android" | "both">("both");
  const [joinNewsletter, setJoinNewsletter] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !email.includes("@")) {
      toast.error("Please enter a valid email address");
      return;
    }

    setIsSubmitting(true);

    try {
      // Track waitlist signup
      trackCustomEvent("waitlist_signup", {
        platform,
        newsletter: joinNewsletter,
      });

      // Simulate API call (in production, this would submit to your backend)
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Show success state
      setIsSuccess(true);
      toast.success("You're on the list! We'll notify you at launch.");

      // Reset form after delay
      setTimeout(() => {
        setIsSuccess(false);
        setEmail("");
        setPlatform("both");
        setJoinNewsletter(true);
        onOpenChange(false);
      }, 3000);
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        {!isSuccess ? (
          <>
            <DialogHeader>
              <div className="mx-auto w-12 h-12 bg-gradient-cta rounded-full flex items-center justify-center mb-4">
                <Smartphone className="w-6 h-6 text-white" />
              </div>
              <DialogTitle className="text-center text-2xl">
                Join the Waitlist
              </DialogTitle>
              <DialogDescription className="text-center">
                Be the first to know when KetoWell launches. Expected release:{" "}
                <span className="font-semibold text-foreground">Q2 2025</span>
              </DialogDescription>
            </DialogHeader>

            <form onSubmit={handleSubmit} className="space-y-6 mt-4">
              {/* Email Input */}
              <div className="space-y-2">
                <Label htmlFor="waitlist-email">Email Address</Label>
                <Input
                  id="waitlist-email"
                  type="email"
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              {/* Platform Selection */}
              <div className="space-y-3">
                <Label>Preferred Platform</Label>
                <RadioGroup value={platform} onValueChange={(value: any) => setPlatform(value)}>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="ios" id="ios" />
                    <Label htmlFor="ios" className="font-normal cursor-pointer">
                      iOS (iPhone/iPad)
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="android" id="android" />
                    <Label htmlFor="android" className="font-normal cursor-pointer">
                      Android
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="both" id="both" />
                    <Label htmlFor="both" className="font-normal cursor-pointer">
                      Both platforms
                    </Label>
                  </div>
                </RadioGroup>
              </div>

              {/* Newsletter Opt-in */}
              <div className="flex items-start space-x-2">
                <Checkbox
                  id="newsletter"
                  checked={joinNewsletter}
                  onCheckedChange={(checked) => setJoinNewsletter(checked as boolean)}
                />
                <Label
                  htmlFor="newsletter"
                  className="text-sm font-normal leading-relaxed cursor-pointer"
                >
                  Also subscribe to our newsletter for keto tips, research updates, and
                  exclusive content
                </Label>
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                className="w-full"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Joining Waitlist...
                  </>
                ) : (
                  "Join Waitlist"
                )}
              </Button>

              <p className="text-xs text-center text-muted-foreground">
                We'll send you one email when the app launches. No spam, ever.
              </p>
            </form>
          </>
        ) : (
          <div className="py-8 text-center space-y-4">
            <div className="mx-auto w-16 h-16 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center">
              <CheckCircle2 className="w-8 h-8 text-green-600 dark:text-green-400" />
            </div>
            <div className="space-y-2">
              <h3 className="text-xl font-semibold">You're on the list!</h3>
              <p className="text-muted-foreground">
                We'll notify you at <span className="font-medium text-foreground">{email}</span> when
                KetoWell launches.
              </p>
            </div>
            <div className="pt-4">
              <p className="text-sm text-muted-foreground">
                Check your inbox for a confirmation email.
              </p>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
