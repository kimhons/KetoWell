import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Shield, 
  Brain, 
  TrendingUp, 
  Users, 
  Microscope,
  Heart,
  Activity,
  Zap,
  CheckCircle2,
  ArrowRight,
  Download,
  Star
} from "lucide-react";
import { APP_TITLE, APP_TAGLINE } from "@/const";
import NewsletterForm from "@/components/NewsletterForm";
import SEO from "@/components/SEO";
import SchemaMarkup from "@/components/SchemaMarkup";
import DrKetoneChatDemo from "@/components/DrKetoneChatDemo";
import FAQ from "@/components/FAQ";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <SEO
        title="Transform Your Health with Evidence-Based Keto"
        description="KetoWell is the first ketogenic diet app that combines medical-grade safety screening, AI-powered guidance from Dr. Ketone, and evidence-based protocols. Start your journey today."
        keywords="ketogenic diet app, keto app, AI keto coach, Dr. Ketone, medical keto, diabetes keto, evidence-based keto"
        url="/"
      />
      <SchemaMarkup type="organization" />
      <SchemaMarkup type="website" />
      {/* Navigation Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gradient-hero">
              <Activity className="w-6 h-6 text-white" />
            </div>
            <span className="font-bold text-xl">{APP_TITLE}</span>
          </div>
          
          <nav className="hidden md:flex items-center gap-6">
            <a href="#features" className="text-sm font-medium hover:text-primary transition-colors">
              Features
            </a>
            <a href="/research" className="text-sm font-medium hover:text-primary transition-colors">
              Research
            </a>
            <a href="/pricing" className="text-sm font-medium hover:text-primary transition-colors">
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
        <section className="relative overflow-hidden py-20 md:py-32" style={{backgroundImage: 'url(/images/hero-background.png)', backgroundSize: 'cover', backgroundPosition: 'center'}}>
          <div className="container">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="text-white space-y-6 animate-fade-in">
                <Badge className="bg-white/20 text-white border-white/30 hover:bg-white/30">
                  Built on 2024-2025 Research
                </Badge>
                <h1 className="text-white">
                  Transform Your Health with Evidence-Based Keto
                </h1>
                <p className="text-xl text-white/90 leading-relaxed">
                  The first ketogenic app that combines cutting-edge AI with rigorous medical safety—backed by the latest peer-reviewed research.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button size="lg" className="bg-white text-primary hover:bg-white/90">
                    <Download className="w-5 h-5 mr-2" />
                    Download for iOS
                  </Button>
                  <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                    <Download className="w-5 h-5 mr-2" />
                    Download for Android
                  </Button>
                </div>
                <div className="flex items-center gap-6 text-white/80 text-sm">
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 fill-current" />
                    <Star className="w-4 h-4 fill-current" />
                    <Star className="w-4 h-4 fill-current" />
                    <Star className="w-4 h-4 fill-current" />
                    <Star className="w-4 h-4 fill-current" />
                    <span className="ml-2">4.9/5.0</span>
                  </div>
                  <div>10,000+ Users</div>
                </div>
              </div>
              
              <div className="relative animate-slide-up flex justify-center">
                <DrKetoneChatDemo />
                <div className="absolute inset-0 bg-gradient-cta blur-3xl opacity-20 -z-10"></div>
              </div>
            </div>
          </div>
        </section>

        {/* Trust Indicators */}
        <section className="py-12 border-b">
          <div className="container">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              <div>
                <Microscope className="w-8 h-8 mx-auto mb-2 text-primary" />
                <p className="font-semibold">12+ Studies</p>
                <p className="text-sm text-muted-foreground">2024-2025 Research</p>
              </div>
              <div>
                <Shield className="w-8 h-8 mx-auto mb-2 text-primary" />
                <p className="font-semibold">Medical-Grade</p>
                <p className="text-sm text-muted-foreground">Safety Screening</p>
              </div>
              <div>
                <Brain className="w-8 h-8 mx-auto mb-2 text-primary" />
                <p className="font-semibold">AI-Powered</p>
                <p className="text-sm text-muted-foreground">Dr. Ketone Assistant</p>
              </div>
              <div>
                <Users className="w-8 h-8 mx-auto mb-2 text-primary" />
                <p className="font-semibold">10,000+</p>
                <p className="text-sm text-muted-foreground">Active Users</p>
              </div>
            </div>
          </div>
        </section>

        {/* Dr. Ketone Showcase */}
        <section id="features" className="py-20 md:py-32">
          <div className="container">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <Badge className="mb-4">AI-Powered Guidance</Badge>
              <h2>Meet Dr. Ketone: Your Autonomous Health Agent</h2>
              <p className="text-muted-foreground mt-4">
                Not just a chatbot—Dr. Ketone is an intelligent assistant that proactively monitors your health, predicts challenges, and provides personalized guidance 24/7.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card className="p-6 hover:shadow-medium transition-shadow">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <Zap className="w-6 h-6 text-primary" />
                </div>
                <h4>Proactive Check-Ins</h4>
                <p className="text-muted-foreground mt-2">
                  Dr. Ketone reaches out during critical windows (weeks 1-4) to ensure you're managing side effects and staying on track.
                </p>
              </Card>
              
              <Card className="p-6 hover:shadow-medium transition-shadow">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <TrendingUp className="w-6 h-6 text-primary" />
                </div>
                <h4>Predictive Insights</h4>
                <p className="text-muted-foreground mt-2">
                  Forecasts when you'll enter ketosis, identifies plateau risks, and predicts electrolyte deficiencies before symptoms appear.
                </p>
              </Card>
              
              <Card className="p-6 hover:shadow-medium transition-shadow">
                <div className="mb-4">
                  <img src="/images/meal-tracking-icon.png" alt="Meal Tracking" className="w-16 h-16" />
                </div>
                <h4>Natural Language Logging</h4>
                <p className="text-muted-foreground mt-2">
                  Just say "I had a burger without the bun" and Dr. Ketone logs the meal with accurate macros—no tedious data entry.
                </p>
              </Card>
              
              <Card className="p-6 hover:shadow-medium transition-shadow">
                <div className="mb-4">
                  <img src="/images/personalized-guidance-icon.png" alt="Personalized Guidance" className="w-16 h-16" />
                </div>
                <h4>Behavior Change Coaching</h4>
                <p className="text-muted-foreground mt-2">
                  Uses motivational interviewing and identity-building techniques to help you form lasting habits, not just temporary changes.
                </p>
              </Card>
              
              <Card className="p-6 hover:shadow-medium transition-shadow">
                <div className="mb-4">
                  <img src="/images/symptom-monitoring-icon.png" alt="Symptom Monitoring" className="w-16 h-16" />
                </div>
                <h4>Symptom Assessment</h4>
                <p className="text-muted-foreground mt-2">
                  Guided evaluation of keto flu symptoms with evidence-based management protocols—salt, hydration, and timing.
                </p>
              </Card>
              
              <Card className="p-6 hover:shadow-medium transition-shadow">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <Shield className="w-6 h-6 text-primary" />
                </div>
                <h4>Safety Monitoring</h4>
                <p className="text-muted-foreground mt-2">
                  Continuously monitors for concerning patterns and escalates to medical consultation when needed—your safety is priority one.
                </p>
              </Card>
            </div>
          </div>
        </section>

        {/* Safety First */}
        <section id="safety" className="py-20 md:py-32 bg-muted/50">
          <div className="container">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <Badge className="mb-4">Medical-Grade Safety</Badge>
                <h2>The Only Keto App That Puts Safety First</h2>
                <p className="text-muted-foreground mt-4 mb-8">
                  Most keto apps are just calorie counters. We built the first app with comprehensive medical screening to prevent life-threatening complications.
                </p>
                
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-destructive/10 flex items-center justify-center mt-1">
                      <CheckCircle2 className="w-4 h-4 text-destructive" />
                    </div>
                    <div>
                      <p className="font-semibold">SGLT2 Inhibitor Detection</p>
                      <p className="text-sm text-muted-foreground">
                        Automatically detects medications like Jardiance that can cause life-threatening euglycemic DKA when combined with keto. Requires physician clearance before proceeding.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-destructive/10 flex items-center justify-center mt-1">
                      <CheckCircle2 className="w-4 h-4 text-destructive" />
                    </div>
                    <div>
                      <p className="font-semibold">Lactation Contraindication</p>
                      <p className="text-sm text-muted-foreground">
                        Explicit warning for breastfeeding mothers based on 2024-2025 ICU case reports of lactation ketoacidosis—a serious condition most apps ignore.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center mt-1">
                      <CheckCircle2 className="w-4 h-4 text-primary" />
                    </div>
                    <div>
                      <p className="font-semibold">Drug Interaction Screening</p>
                      <p className="text-sm text-muted-foreground">
                        Comprehensive database of medication interactions—insulin, sulfonylureas, lithium, warfarin—with specific adjustment protocols.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center mt-1">
                      <CheckCircle2 className="w-4 h-4 text-primary" />
                    </div>
                    <div>
                      <p className="font-semibold">Electrolyte Management</p>
                      <p className="text-sm text-muted-foreground">
                        Daily tracking and deficiency alerts for sodium (3,000-5,000mg), potassium (3,000-4,700mg), and magnesium (300-500mg)—prevents keto flu before it starts.
                      </p>
                    </div>
                  </div>
                </div>
                
                <Button className="mt-8" variant="outline">
                  Learn More About Our Safety Protocols
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
              
              <div className="relative">
                <Card className="p-8 shadow-strong">
                  <div className="space-y-6">
                    <div className="flex items-center gap-3 pb-4 border-b">
                      <Shield className="w-8 h-8 text-destructive" />
                      <div>
                        <p className="font-bold text-lg">Safety Alert</p>
                        <p className="text-sm text-muted-foreground">Critical Medication Interaction</p>
                      </div>
                    </div>
                    
                    <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-4">
                      <p className="font-semibold text-destructive mb-2">⚠️ SGLT2 Inhibitor Detected</p>
                      <p className="text-sm">
                        You're taking Jardiance (empagliflozin), which can cause euglycemic diabetic ketoacidosis when combined with a ketogenic diet.
                      </p>
                    </div>
                    
                    <div className="space-y-2">
                      <p className="font-semibold">Required Action:</p>
                      <ul className="text-sm space-y-1 text-muted-foreground">
                        <li>✓ Consult your physician before starting keto</li>
                        <li>✓ Upload physician clearance to proceed</li>
                        <li>✓ Monitor glucose and ketones closely</li>
                      </ul>
                    </div>
                    
                    <Button className="w-full" variant="destructive">
                      Schedule Doctor Consultation
                    </Button>
                  </div>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Evidence-Based Approach */}
        <section id="research" className="py-20 md:py-32">
          <div className="container">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <Badge className="mb-4">Evidence-Based</Badge>
              <h2>Every Claim Backed by Science</h2>
              <p className="text-muted-foreground mt-4">
                We analyzed 12+ peer-reviewed studies from 2024-2025 to build the most scientifically rigorous ketogenic health app available.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8">
              <Card className="p-8 hover:shadow-medium transition-shadow">
                <h3 className="mb-4">Metabolic Health</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between items-center pb-2 border-b">
                    <span>Fasting Blood Sugar</span>
                    <span className="font-bold text-secondary">-11.68 mg/dL</span>
                  </div>
                  <div className="flex justify-between items-center pb-2 border-b">
                    <span>HbA1c</span>
                    <span className="font-bold text-secondary">-0.29%</span>
                  </div>
                  <div className="flex justify-between items-center pb-2 border-b">
                    <span>Triglycerides</span>
                    <span className="font-bold text-secondary">-17.95 mg/dL</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Insulin Sensitivity</span>
                    <span className="font-bold text-secondary">+Improved</span>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground mt-4">
                  Source: Ghasemi et al. 2024, 29 trials, 2,359 participants
                </p>
              </Card>
              
              <Card className="p-8 hover:shadow-medium transition-shadow">
                <h3 className="mb-4">Neurological Benefits</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between items-center pb-2 border-b">
                    <span>Epilepsy Seizure Reduction</span>
                    <span className="font-bold text-secondary">≥50% in 62%</span>
                  </div>
                  <div className="flex justify-between items-center pb-2 border-b">
                    <span>Alzheimer's Cognitive Function</span>
                    <span className="font-bold text-secondary">Enhanced</span>
                  </div>
                  <div className="flex justify-between items-center pb-2 border-b">
                    <span>Parkinson's Motor Symptoms</span>
                    <span className="font-bold text-secondary">Improved</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>MS Fatigue & QoL</span>
                    <span className="font-bold text-secondary">Reduced</span>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground mt-4">
                  Source: Multiple 2024-2025 systematic reviews
                </p>
              </Card>
              
              <Card className="p-8 hover:shadow-medium transition-shadow">
                <h3 className="mb-4">Cardiovascular Health</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between items-center pb-2 border-b">
                    <span>HDL (Good Cholesterol)</span>
                    <span className="font-bold text-secondary">+3.93 mg/dL</span>
                  </div>
                  <div className="flex justify-between items-center pb-2 border-b">
                    <span>Triglycerides</span>
                    <span className="font-bold text-secondary">-17.95 mg/dL</span>
                  </div>
                  <div className="flex justify-between items-center pb-2 border-b">
                    <span>Blood Pressure</span>
                    <span className="font-bold text-secondary">Reduced</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>LDL Particle Size</span>
                    <span className="font-bold text-secondary">Pattern A Shift</span>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground mt-4">
                  Source: KETO-CTA trial 2024-2025, meta-analyses
                </p>
              </Card>
              
              <Card className="p-8 hover:shadow-medium transition-shadow">
                <h3 className="mb-4">Behavioral Science</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between items-center pb-2 border-b">
                    <span>Habit Formation Timeline</span>
                    <span className="font-bold text-secondary">59-154 days</span>
                  </div>
                  <div className="flex justify-between items-center pb-2 border-b">
                    <span>Identity-Based Motivation</span>
                    <span className="font-bold text-secondary">β = 0.41-0.43</span>
                  </div>
                  <div className="flex justify-between items-center pb-2 border-b">
                    <span>SDT Gamification Effect</span>
                    <span className="font-bold text-secondary">d = 0.39</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Ghrelin Suppression</span>
                    <span className="font-bold text-secondary">~17%</span>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground mt-4">
                  Source: Lally 2010, Gardner 2024, Nishi 2024
                </p>
              </Card>
            </div>
            
            <div className="text-center mt-12">
              <a href="/research">
                <Button variant="outline" size="lg">
                  Explore Full Research Library
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </a>
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section id="how-it-works" className="py-20 md:py-32 bg-muted/50">
          <div className="container">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <Badge className="mb-4">Your Journey</Badge>
              <h2>How It Works</h2>
              <p className="text-muted-foreground mt-4">
                A structured, evidence-based approach that guides you from day one to long-term success.
              </p>
            </div>
            
            <div className="grid md:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-primary">1</span>
                </div>
                <h4>Onboarding</h4>
                <p className="text-sm text-muted-foreground mt-2">
                  Comprehensive medical screening, goal setting, and personalized safety protocol generation.
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-primary">2</span>
                </div>
                <h4>Early Adoption</h4>
                <p className="text-sm text-muted-foreground mt-2">
                  Maximum support during weeks 1-4 with daily check-ins, keto flu management, and frequent rewards.
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-primary">3</span>
                </div>
                <h4>Habit Formation</h4>
                <p className="text-sm text-muted-foreground mt-2">
                  66-day habit-building system with progressive challenges and identity reinforcement.
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-primary">4</span>
                </div>
                <h4>Maintenance</h4>
                <p className="text-sm text-muted-foreground mt-2">
                  Long-term optimization with advanced analytics, community support, and medical integration.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <FAQ />

        {/* Newsletter Section */}
        <section className="py-20 bg-gradient-hero">
          <div className="container">
            <div className="max-w-3xl mx-auto text-center text-white">
              <h2 className="text-white mb-4">Stay Updated with Latest Research</h2>
              <p className="text-xl text-white/90 mb-8">
                Get evidence-based insights on ketogenic health delivered to your inbox. 
                No spam, just science.
              </p>
              <div className="max-w-md mx-auto">
                <NewsletterForm variant="dark" />
              </div>
              <p className="text-sm text-white/70 mt-4">
                Join 10,000+ readers. Unsubscribe anytime.
              </p>
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-20 md:py-32">
          <div className="container">
            <div className="max-w-4xl mx-auto text-center">
              <h2>Start Your Ketogenic Journey Today</h2>
              <p className="text-muted-foreground mt-4 mb-8">
                Download now and get personalized guidance from Dr. Ketone—your AI-powered health partner.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="bg-gradient-cta hover:opacity-90">
                  <Download className="w-5 h-5 mr-2" />
                  Download for iOS
                </Button>
                <Button size="lg" variant="outline">
                  <Download className="w-5 h-5 mr-2" />
                  Download for Android
                </Button>
              </div>
              
              <p className="text-sm text-muted-foreground mt-6">
                Free to download. Premium features available.
              </p>
            </div>
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
                Your AI-powered partner in ketogenic health.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#features" className="hover:text-foreground">Features</a></li>
                <li><a href="#research" className="hover:text-foreground">Research</a></li>
                <li><a href="#safety" className="hover:text-foreground">Safety</a></li>
                <li><a href="#how-it-works" className="hover:text-foreground">How It Works</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Resources</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="/blog" className="hover:text-foreground">Blog</a></li>
                <li><a href="#" className="hover:text-foreground">Help Center</a></li>
                <li><a href="#" className="hover:text-foreground">Community</a></li>
                <li><a href="#" className="hover:text-foreground">Contact</a></li>
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
