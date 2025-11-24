import { useState } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { trackNewsletterSignup } from "@/lib/analytics";
import { trpc } from "@/lib/trpc";

interface NewsletterFormProps {
  variant?: "light" | "dark";
  className?: string;
}

export default function NewsletterForm({ variant = "light", className = "" }: NewsletterFormProps) {
  const [email, setEmail] = useState("");

  const newsletterMutation = trpc.newsletter.subscribe.useMutation({
    onSuccess: (data) => {
      trackNewsletterSignup(window.location.pathname);
      toast.success(data.message || "Thank you for subscribing!");
      setEmail("");
    },
    onError: (error) => {
      const errorMessage = error.message || "Something went wrong. Please try again.";
      toast.error(errorMessage);
    },
  });

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

    newsletterMutation.mutate({
      email,
      source: "website",
    });

    // Note: The tRPC mutation handles the API call, success, and error states
    // For external email service integration (Mailchimp, ConvertKit, etc.),
    // see NEWSLETTER_INTEGRATION.md for detailed instructions
  };

  const isDark = variant === "dark";

  return (
    <form onSubmit={handleSubmit} className={`flex flex-col sm:flex-row gap-4 ${className}`}>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Enter your email"
        disabled={newsletterMutation.isPending}
        className={`px-4 py-3 rounded-lg flex-1 ${
          isDark
            ? "bg-white/10 text-white placeholder:text-white/60 border border-white/20 focus:border-white/40"
            : "bg-background text-foreground border border-input focus:border-primary"
        } focus:outline-none focus:ring-2 focus:ring-primary/20 disabled:opacity-50`}
      />
      <Button
        type="submit"
        size="lg"
        disabled={newsletterMutation.isPending}
        className={
          isDark
            ? "bg-white text-primary hover:bg-white/90"
            : "bg-gradient-cta hover:opacity-90"
        }
      >
        {newsletterMutation.isPending ? (
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
