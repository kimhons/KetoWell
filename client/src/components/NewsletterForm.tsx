import { useState } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { trackNewsletterSignup } from "@/lib/analytics";

interface NewsletterFormProps {
  variant?: "light" | "dark";
  className?: string;
}

export default function NewsletterForm({ variant = "light", className = "" }: NewsletterFormProps) {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email) {
      toast.error("Please enter your email address");
      return;
    }

    if (!validateEmail(email)) {
      toast.error("Please enter a valid email address");
      return;
    }

    setIsSubmitting(true);

    try {
      // For now, we'll simulate a successful submission
      // In production, this would call your email marketing service API
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Example integration endpoints (commented out):
      
      // Mailchimp:
      // const response = await fetch('/api/subscribe', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ email })
      // });

      // ConvertKit:
      // const response = await fetch('https://api.convertkit.com/v3/forms/YOUR_FORM_ID/subscribe', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ 
      //     api_key: 'YOUR_API_KEY',
      //     email: email 
      //   })
      // });

      // Custom API:
      // const response = await fetch('/api/newsletter/subscribe', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ email })
      // });

      toast.success("Successfully subscribed! Check your inbox for confirmation.", {
        duration: 5000,
      });
      
      // Track newsletter signup
      trackNewsletterSignup(window.location.pathname);
      
      setEmail("");
    } catch (error) {
      console.error("Newsletter subscription error:", error);
      toast.error("Something went wrong. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const isDark = variant === "dark";

  return (
    <form onSubmit={handleSubmit} className={`flex flex-col sm:flex-row gap-4 ${className}`}>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Enter your email"
        disabled={isSubmitting}
        className={`px-4 py-3 rounded-lg flex-1 ${
          isDark
            ? "bg-white/10 text-white placeholder:text-white/60 border border-white/20 focus:border-white/40"
            : "bg-background text-foreground border border-input focus:border-primary"
        } focus:outline-none focus:ring-2 focus:ring-primary/20 disabled:opacity-50`}
      />
      <Button
        type="submit"
        size="lg"
        disabled={isSubmitting}
        className={
          isDark
            ? "bg-white text-primary hover:bg-white/90"
            : "bg-gradient-cta hover:opacity-90"
        }
      >
        {isSubmitting ? (
          <>
            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            Subscribing...
          </>
        ) : (
          "Subscribe"
        )}
      </Button>
    </form>
  );
}
