import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle2, Download, Loader2, Mail } from "lucide-react";
import SEO from "@/components/SEO";
import { Link } from "wouter";
import { verifyBookPurchase } from "@/lib/bookApi";
import { toast } from "sonner";
import SocialShareButtons from "@/components/SocialShareButtons";

export default function BookPurchaseSuccess() {
  const [isVerifying, setIsVerifying] = useState(true);
  const [purchaseVerified, setPurchaseVerified] = useState(false);
  const [customerEmail, setCustomerEmail] = useState("");
  const [customerName, setCustomerName] = useState("");

  useEffect(() => {
    const verifyPurchase = async () => {
      // Get session ID from URL
      const urlParams = new URLSearchParams(window.location.search);
      const sessionId = urlParams.get("session_id");

      if (!sessionId) {
        toast.error("Invalid purchase session");
        setIsVerifying(false);
        return;
      }

      try {
        const result = await verifyBookPurchase(sessionId);
        
        if (result.success) {
          setPurchaseVerified(true);
          setCustomerEmail(result.customerEmail || "");
          setCustomerName(result.customerName || "");
          toast.success("Purchase verified! Check your email for the download link.");
        } else {
          toast.error("Failed to verify purchase");
        }
      } catch (error: any) {
        console.error("Verification error:", error);
        toast.error(error.message || "Failed to verify purchase");
      } finally {
        setIsVerifying(false);
      }
    };

    verifyPurchase();
  }, []);

  const handleDownload = () => {
    // Open PDF in new tab
    window.open("/ketowell-book.pdf", "_blank");
  };

  if (isVerifying) {
    return (
      <>
        <SEO
          title="Verifying Purchase - KetoWell Book"
          description="Verifying your KetoWell book purchase"
        />
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-background to-muted/20">
          <Card className="max-w-md w-full mx-4">
            <CardContent className="pt-6 text-center">
              <Loader2 className="h-16 w-16 animate-spin text-primary mx-auto mb-4" />
              <h2 className="text-2xl font-bold mb-2">Verifying Your Purchase</h2>
              <p className="text-muted-foreground">
                Please wait while we confirm your payment...
              </p>
            </CardContent>
          </Card>
        </div>
      </>
    );
  }

  if (!purchaseVerified) {
    return (
      <>
        <SEO
          title="Purchase Error - KetoWell Book"
          description="There was an error verifying your purchase"
        />
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-background to-muted/20">
          <Card className="max-w-md w-full mx-4">
            <CardContent className="pt-6 text-center">
              <div className="h-16 w-16 rounded-full bg-destructive/10 flex items-center justify-center mx-auto mb-4">
                <span className="text-4xl">❌</span>
              </div>
              <h2 className="text-2xl font-bold mb-2">Verification Failed</h2>
              <p className="text-muted-foreground mb-6">
                We couldn't verify your purchase. Please contact support if you've been charged.
              </p>
              <Link href="/book">
                <Button>Return to Book Page</Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </>
    );
  }

  return (
    <>
      <SEO
        title="Purchase Successful - KetoWell Book"
        description="Thank you for purchasing the KetoWell book!"
      />
      <div className="min-h-screen bg-gradient-to-b from-background to-muted/20 py-16">
        <div className="container max-w-4xl">
          {/* Success Header */}
          <Card className="mb-8">
            <CardContent className="pt-6">
              <div className="text-center">
                <CheckCircle2 className="h-20 w-20 text-green-500 mx-auto mb-4" />
                <h1 className="text-4xl font-bold mb-2">Purchase Successful!</h1>
                <p className="text-xl text-muted-foreground mb-6">
                  Thank you for purchasing the KetoWell book, {customerName || "valued customer"}!
                </p>
              </div>

              {/* Download Section */}
              <div className="bg-primary/5 rounded-lg p-6 mb-6">
                <h2 className="text-2xl font-bold mb-4 text-center">Download Your Book</h2>
                <p className="text-center text-muted-foreground mb-4">
                  Click the button below to download your PDF immediately:
                </p>
                <div className="flex justify-center">
                  <Button size="lg" onClick={handleDownload} className="text-lg px-8">
                    <Download className="mr-2 h-5 w-5" />
                    Download PDF Now
                  </Button>
                </div>
              </div>

              {/* Email Confirmation */}
              <div className="bg-muted/50 rounded-lg p-6">
                <div className="flex items-start gap-3">
                  <Mail className="h-6 w-6 text-primary mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold mb-2">Check Your Email</h3>
                    <p className="text-sm text-muted-foreground">
                      We've sent a confirmation email to <strong>{customerEmail}</strong> with your download link and receipt.
                      You can download the book up to 10 times from the link in your email.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Social Sharing */}
          <Card className="mb-8">
            <CardContent className="pt-6">
              <h2 className="text-2xl font-bold mb-4">Share Your Purchase</h2>
              <p className="text-muted-foreground mb-6">
                Help others discover evidence-based ketogenic health information! Share your purchase on social media and inspire your network.
              </p>
              <SocialShareButtons source="book_purchase_success" />
            </CardContent>
          </Card>

          {/* Next Steps */}
          <Card>
            <CardContent className="pt-6">
              <h2 className="text-2xl font-bold mb-4">What's Next?</h2>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="h-8 w-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center flex-shrink-0 font-bold">
                    1
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Read the Book</h3>
                    <p className="text-sm text-muted-foreground">
                      Start with the Introduction to understand the metabolic health crisis and why ketogenic diets work.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="h-8 w-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center flex-shrink-0 font-bold">
                    2
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Download the KetoWell App</h3>
                    <p className="text-sm text-muted-foreground">
                      Get personalized guidance from Dr. Ketone, our AI health agent, to help you implement what you've learned.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="h-8 w-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center flex-shrink-0 font-bold">
                    3
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Join the Community</h3>
                    <p className="text-sm text-muted-foreground">
                      Connect with other KetoWell users for support, recipes, and success stories.
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 mt-8">
                <Link href="/" className="flex-1">
                  <Button variant="outline" className="w-full">
                    Return to Homepage
                  </Button>
                </Link>
                <Link href="/book" className="flex-1">
                  <Button variant="outline" className="w-full">
                    Back to Book Page
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
}
