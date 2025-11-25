import { useEffect, useState } from "react";
import { useLocation } from "wouter";
import { trpc } from "@/lib/trpc";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { CheckCircle2, XCircle, Loader2 } from "lucide-react";
import { APP_TITLE } from "@/const";

export default function WaitlistConfirm() {
  const [, setLocation] = useLocation();
  const [token, setToken] = useState<string | null>(null);

  // Extract token from URL
  useEffect(() => {
    const path = window.location.pathname;
    const match = path.match(/\/waitlist\/confirm\/([a-f0-9]+)/);
    if (match && match[1]) {
      setToken(match[1]);
    }
  }, []);

  // Call confirmation mutation
  const confirmMutation = trpc.waitlist.confirm.useMutation();

  useEffect(() => {
    if (token && !confirmMutation.isPending && !confirmMutation.data && !confirmMutation.error) {
      confirmMutation.mutate({ token });
    }
  }, [token]);

  const isLoading = confirmMutation.isPending || !token;
  const isSuccess = confirmMutation.isSuccess && confirmMutation.data?.success;
  const isError = confirmMutation.isError || (confirmMutation.data && !confirmMutation.data.success);
  const alreadyConfirmed = confirmMutation.data?.alreadyConfirmed;

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="font-bold text-xl">{APP_TITLE}</span>
          </div>
          <Button variant="outline" onClick={() => setLocation("/")}>
            Back to Home
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center p-4">
        <Card className="max-w-md w-full p-8 text-center">
          {isLoading && (
            <>
              <Loader2 className="w-16 h-16 mx-auto mb-4 text-primary animate-spin" />
              <h1 className="text-2xl font-bold mb-2">Confirming Your Email...</h1>
              <p className="text-muted-foreground">
                Please wait while we verify your confirmation link.
              </p>
            </>
          )}

          {isSuccess && !alreadyConfirmed && (
            <>
              <CheckCircle2 className="w-16 h-16 mx-auto mb-4 text-secondary" />
              <h1 className="text-2xl font-bold mb-2">Email Confirmed! 🎉</h1>
              <p className="text-muted-foreground mb-6">
                {confirmMutation.data?.message || "You're all set! We'll keep you updated on our progress."}
              </p>
              <div className="space-y-3">
                <p className="text-sm text-muted-foreground">
                  <strong>What's next?</strong>
                </p>
                <ul className="text-sm text-muted-foreground text-left space-y-2">
                  <li>✓ You'll receive updates on our development progress</li>
                  <li>✓ Get early access when we launch (Q2 2025)</li>
                  <li>✓ Exclusive beta testing opportunities</li>
                  <li>✓ Special launch pricing for waitlist members</li>
                </ul>
              </div>
              <Button 
                className="mt-6 w-full bg-gradient-cta hover:opacity-90"
                onClick={() => setLocation("/")}
              >
                Return to Homepage
              </Button>
            </>
          )}

          {isSuccess && alreadyConfirmed && (
            <>
              <CheckCircle2 className="w-16 h-16 mx-auto mb-4 text-secondary" />
              <h1 className="text-2xl font-bold mb-2">Already Confirmed</h1>
              <p className="text-muted-foreground mb-6">
                Your email has already been confirmed. You're all set!
              </p>
              <Button 
                className="w-full bg-gradient-cta hover:opacity-90"
                onClick={() => setLocation("/")}
              >
                Return to Homepage
              </Button>
            </>
          )}

          {isError && (
            <>
              <XCircle className="w-16 h-16 mx-auto mb-4 text-destructive" />
              <h1 className="text-2xl font-bold mb-2">Confirmation Failed</h1>
              <p className="text-muted-foreground mb-6">
                {confirmMutation.error?.message || "The confirmation link is invalid or has expired."}
              </p>
              <div className="space-y-3">
                <Button 
                  className="w-full"
                  variant="outline"
                  onClick={() => setLocation("/")}
                >
                  Return to Homepage
                </Button>
                <p className="text-sm text-muted-foreground">
                  Need help? Contact us at support@ketowell.com
                </p>
              </div>
            </>
          )}
        </Card>
      </main>

      {/* Footer */}
      <footer className="border-t py-6">
        <div className="container text-center text-sm text-muted-foreground">
          <p>© 2025 {APP_TITLE}. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
