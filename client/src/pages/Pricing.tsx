import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Check,
  X,
  Activity,
  Download,
  Sparkles
} from "lucide-react";
import { APP_TITLE } from "@/const";

export default function Pricing() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Navigation Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <a href="/" className="flex items-center gap-2">
            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gradient-hero">
              <Activity className="w-6 h-6 text-white" />
            </div>
            <span className="font-bold text-xl">{APP_TITLE}</span>
          </a>
          
          <nav className="hidden md:flex items-center gap-6">
            <a href="/#features" className="text-sm font-medium hover:text-primary transition-colors">
              Features
            </a>
            <a href="/research" className="text-sm font-medium hover:text-primary transition-colors">
              Research
            </a>
            <a href="/pricing" className="text-sm font-medium text-primary">
              Pricing
            </a>
            <a href="/for-providers" className="text-sm font-medium hover:text-primary transition-colors">
              For Providers
            </a>
          </nav>
          
          <Button className="bg-gradient-cta hover:opacity-90 transition-opacity">
            <Download className="w-4 h-4 mr-2" />
            Download App
          </Button>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-20 bg-muted/30">
          <div className="container">
            <div className="max-w-3xl mx-auto text-center">
              <Badge className="mb-4">Simple, Transparent Pricing</Badge>
              <h1>Choose Your Plan</h1>
              <p className="text-muted-foreground mt-4 text-lg">
                Start free, upgrade when you're ready. All plans include access to evidence-based guidance and safety screening.
              </p>
            </div>
          </div>
        </section>

        {/* Pricing Cards */}
        <section className="py-20">
          <div className="container">
            <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {/* Free Tier */}
              <Card className="p-8 flex flex-col">
                <div className="mb-6">
                  <h3 className="text-2xl font-bold mb-2">Free</h3>
                  <div className="flex items-baseline gap-2 mb-4">
                    <span className="text-4xl font-bold">$0</span>
                    <span className="text-muted-foreground">/month</span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Perfect for getting started with ketogenic health
                  </p>
                </div>

                <div className="space-y-3 mb-8 flex-1">
                  <div className="flex items-start gap-2">
                    <Check className="w-5 h-5 text-secondary flex-shrink-0 mt-0.5" />
                    <span className="text-sm">Basic food logging</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Check className="w-5 h-5 text-secondary flex-shrink-0 mt-0.5" />
                    <span className="text-sm">Macro tracking</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Check className="w-5 h-5 text-secondary flex-shrink-0 mt-0.5" />
                    <span className="text-sm">Educational content library</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Check className="w-5 h-5 text-secondary flex-shrink-0 mt-0.5" />
                    <span className="text-sm">Medical safety screening</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Check className="w-5 h-5 text-secondary flex-shrink-0 mt-0.5" />
                    <span className="text-sm">Basic progress charts</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <X className="w-5 h-5 text-muted-foreground flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-muted-foreground">Dr. Ketone AI (limited to 5 questions/week)</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <X className="w-5 h-5 text-muted-foreground flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-muted-foreground">Advanced analytics</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <X className="w-5 h-5 text-muted-foreground flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-muted-foreground">Meal planning</span>
                  </div>
                </div>

                <Button variant="outline" size="lg" className="w-full">
                  Get Started Free
                </Button>
              </Card>

              {/* Premium Tier */}
              <Card className="p-8 flex flex-col border-primary shadow-strong relative">
                <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary">
                  <Sparkles className="w-3 h-3 mr-1" />
                  Recommended
                </Badge>
                
                <div className="mb-6">
                  <h3 className="text-2xl font-bold mb-2">Premium</h3>
                  <div className="flex items-baseline gap-2 mb-4">
                    <span className="text-4xl font-bold">$9.99</span>
                    <span className="text-muted-foreground">/month</span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Full access to Dr. Ketone AI and advanced features
                  </p>
                </div>

                <div className="space-y-3 mb-8 flex-1">
                  <div className="flex items-start gap-2">
                    <Check className="w-5 h-5 text-secondary flex-shrink-0 mt-0.5" />
                    <span className="text-sm font-semibold">Everything in Free, plus:</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Check className="w-5 h-5 text-secondary flex-shrink-0 mt-0.5" />
                    <span className="text-sm">Unlimited Dr. Ketone AI conversations</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Check className="w-5 h-5 text-secondary flex-shrink-0 mt-0.5" />
                    <span className="text-sm">Advanced analytics & insights</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Check className="w-5 h-5 text-secondary flex-shrink-0 mt-0.5" />
                    <span className="text-sm">AI-powered meal planning</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Check className="w-5 h-5 text-secondary flex-shrink-0 mt-0.5" />
                    <span className="text-sm">Photo food recognition</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Check className="w-5 h-5 text-secondary flex-shrink-0 mt-0.5" />
                    <span className="text-sm">Predictive health insights</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Check className="w-5 h-5 text-secondary flex-shrink-0 mt-0.5" />
                    <span className="text-sm">Symptom tracking & analysis</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Check className="w-5 h-5 text-secondary flex-shrink-0 mt-0.5" />
                    <span className="text-sm">Community access</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Check className="w-5 h-5 text-secondary flex-shrink-0 mt-0.5" />
                    <span className="text-sm">Priority support</span>
                  </div>
                </div>

                <Button size="lg" className="w-full bg-gradient-cta hover:opacity-90">
                  Start 14-Day Free Trial
                </Button>
                <p className="text-xs text-center text-muted-foreground mt-2">
                  No credit card required
                </p>
              </Card>

              {/* Clinical Tier */}
              <Card className="p-8 flex flex-col">
                <div className="mb-6">
                  <h3 className="text-2xl font-bold mb-2">Clinical</h3>
                  <div className="flex items-baseline gap-2 mb-4">
                    <span className="text-4xl font-bold">$19.99</span>
                    <span className="text-muted-foreground">/month</span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    For patients working with healthcare providers
                  </p>
                </div>

                <div className="space-y-3 mb-8 flex-1">
                  <div className="flex items-start gap-2">
                    <Check className="w-5 h-5 text-secondary flex-shrink-0 mt-0.5" />
                    <span className="text-sm font-semibold">Everything in Premium, plus:</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Check className="w-5 h-5 text-secondary flex-shrink-0 mt-0.5" />
                    <span className="text-sm">Provider portal access</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Check className="w-5 h-5 text-secondary flex-shrink-0 mt-0.5" />
                    <span className="text-sm">Lab integration (coming soon)</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Check className="w-5 h-5 text-secondary flex-shrink-0 mt-0.5" />
                    <span className="text-sm">Medication tracking & alerts</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Check className="w-5 h-5 text-secondary flex-shrink-0 mt-0.5" />
                    <span className="text-sm">Automated provider reports</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Check className="w-5 h-5 text-secondary flex-shrink-0 mt-0.5" />
                    <span className="text-sm">EHR integration (coming soon)</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Check className="w-5 h-5 text-secondary flex-shrink-0 mt-0.5" />
                    <span className="text-sm">Priority clinical support</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Check className="w-5 h-5 text-secondary flex-shrink-0 mt-0.5" />
                    <span className="text-sm">HIPAA-compliant data sharing</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Check className="w-5 h-5 text-secondary flex-shrink-0 mt-0.5" />
                    <span className="text-sm">Advanced safety monitoring</span>
                  </div>
                </div>

                <Button variant="outline" size="lg" className="w-full">
                  Contact Sales
                </Button>
              </Card>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-20 bg-muted/30">
          <div className="container">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-center mb-12">Frequently Asked Questions</h2>
              
              <div className="space-y-6">
                <Card className="p-6">
                  <h4 className="mb-2">Can I switch plans at any time?</h4>
                  <p className="text-sm text-muted-foreground">
                    Yes! You can upgrade or downgrade your plan at any time. When you upgrade, you'll get immediate access to premium features. When you downgrade, the change will take effect at the end of your current billing cycle.
                  </p>
                </Card>

                <Card className="p-6">
                  <h4 className="mb-2">What's included in the 14-day free trial?</h4>
                  <p className="text-sm text-muted-foreground">
                    The free trial gives you full access to all Premium features, including unlimited Dr. Ketone AI conversations, advanced analytics, meal planning, and more. No credit card required to start. You can cancel anytime before the trial ends.
                  </p>
                </Card>

                <Card className="p-6">
                  <h4 className="mb-2">Is my health data secure?</h4>
                  <p className="text-sm text-muted-foreground">
                    Absolutely. We use bank-level encryption and are HIPAA-compliant for Clinical tier users. Your data is never sold to third parties, and you can export or delete your data at any time.
                  </p>
                </Card>

                <Card className="p-6">
                  <h4 className="mb-2">Do I need a doctor's approval to use KetoWell?</h4>
                  <p className="text-sm text-muted-foreground">
                    All users complete our medical safety screening during onboarding. If you have certain high-risk conditions (like taking SGLT2 inhibitors or having Type 1 diabetes), we require physician verification before you can start. This is for your safety.
                  </p>
                </Card>

                <Card className="p-6">
                  <h4 className="mb-2">What makes KetoWell different from other keto apps?</h4>
                  <p className="text-sm text-muted-foreground">
                    KetoWell is the only keto app that combines AI-powered guidance (Dr. Ketone) with rigorous medical safety screening. Every recommendation is backed by peer-reviewed research from 2024-2025. We're built by healthcare professionals for people who want evidence-based results.
                  </p>
                </Card>

                <Card className="p-6">
                  <h4 className="mb-2">Can healthcare providers monitor my progress?</h4>
                  <p className="text-sm text-muted-foreground">
                    Yes, with the Clinical tier. Your provider gets access to a dedicated portal where they can view your progress, receive alerts about safety concerns, and collaborate with you on your ketogenic health journey. Learn more on our <a href="/for-providers" className="text-primary hover:underline">For Providers</a> page.
                  </p>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Enterprise Section */}
        <section className="py-20">
          <div className="container">
            <Card className="p-12 bg-primary/5 border-primary/20 text-center max-w-4xl mx-auto">
              <h2 className="mb-4">Enterprise & Healthcare Systems</h2>
              <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
                Looking to integrate KetoWell into your clinic, hospital, or wellness program? 
                We offer custom solutions with dedicated support, advanced analytics, and seamless EHR integration.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="bg-gradient-cta hover:opacity-90">
                  Schedule a Demo
                </Button>
                <Button size="lg" variant="outline">
                  Contact Sales
                </Button>
              </div>
            </Card>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t py-12">
        <div className="container">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gradient-hero">
                  <Activity className="w-5 h-5 text-white" />
                </div>
                <span className="font-bold">{APP_TITLE}</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Your AI-native partner in ketogenic health.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="/#features" className="hover:text-foreground">Features</a></li>
                <li><a href="/research" className="hover:text-foreground">Research</a></li>
                <li><a href="/pricing" className="hover:text-foreground">Pricing</a></li>
                <li><a href="/for-providers" className="hover:text-foreground">For Providers</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-foreground">About</a></li>
                <li><a href="#" className="hover:text-foreground">Blog</a></li>
                <li><a href="#" className="hover:text-foreground">Contact</a></li>
                <li><a href="#" className="hover:text-foreground">Careers</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-foreground">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-foreground">Terms of Service</a></li>
                <li><a href="#" className="hover:text-foreground">Medical Disclaimer</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t mt-12 pt-8 text-center text-sm text-muted-foreground">
            <p>© 2025 {APP_TITLE}. All rights reserved.</p>
            <p className="mt-2">
              This app is not a substitute for professional medical advice. Always consult your physician before starting a ketogenic diet.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
