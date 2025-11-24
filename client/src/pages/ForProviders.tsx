import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Activity,
  Download,
  Shield,
  BarChart3,
  Bell,
  FileText,
  Users,
  Stethoscope,
  CheckCircle2,
  TrendingUp,
  Brain,
  Heart
} from "lucide-react";
import { APP_TITLE } from "@/const";
import SEO from "@/components/SEO";
import SchemaMarkup from "@/components/SchemaMarkup";

export default function ForProviders() {
  return (
    <div className="min-h-screen flex flex-col">
      <SEO
        title="For Healthcare Providers"
        description="KetoWell provider portal enables seamless patient monitoring, safety alerts, and evidence-based ketogenic diet management. Integrate with your clinical workflow."
        keywords="ketogenic diet clinical tools, keto provider portal, patient monitoring keto, clinical keto app"
        url="/for-providers"
      />
      <SchemaMarkup type="organization" />
      <SchemaMarkup
        type="breadcrumb"
        items={[
          { name: "Home", url: "/" },
          { name: "For Providers", url: "/for-providers" },
        ]}
      />
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
            <a href="/pricing" className="text-sm font-medium hover:text-primary transition-colors">
              Pricing
            </a>
            <a href="/for-providers" className="text-sm font-medium text-primary">
              For Providers
            </a>
          </nav>
          
          <Button className="bg-gradient-cta hover:opacity-90 transition-opacity">
            Schedule Demo
          </Button>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-gradient-hero py-20 md:py-32">
          <div className="container">
            <div className="max-w-4xl mx-auto text-center text-white">
              <Badge className="bg-white/20 text-white border-white/30 hover:bg-white/30 mb-4">
                For Healthcare Professionals
              </Badge>
              <h1 className="text-white mb-6">
                Support Your Patients' Ketogenic Health Journey
              </h1>
              <p className="text-xl text-white/90 leading-relaxed mb-8">
                {APP_TITLE} Provider Portal gives you real-time visibility into patient adherence, 
                safety monitoring, and outcomes—backed by the same peer-reviewed research you trust.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="bg-white text-primary hover:bg-white/90">
                  Schedule a Demo
                </Button>
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                  Download Evidence Summary
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Trust Indicators */}
        <section className="py-12 border-b">
          <div className="container">
            <div className="grid md:grid-cols-4 gap-8 text-center">
              <div>
                <p className="text-3xl font-bold text-primary mb-2">21+</p>
                <p className="text-sm text-muted-foreground">Meta-Analyses</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-primary mb-2">43,776</p>
                <p className="text-sm text-muted-foreground">Study Participants</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-primary mb-2">2024-2025</p>
                <p className="text-sm text-muted-foreground">Latest Research</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-primary mb-2">HIPAA</p>
                <p className="text-sm text-muted-foreground">Compliant</p>
              </div>
            </div>
          </div>
        </section>

        {/* Why KetoWell for Providers */}
        <section className="py-20">
          <div className="container">
            <div className="max-w-3xl mx-auto text-center mb-12">
              <h2 className="mb-4">Why Healthcare Providers Choose {APP_TITLE}</h2>
              <p className="text-muted-foreground text-lg">
                We bridge the gap between clinical recommendations and patient adherence—giving you 
                the tools to prescribe ketogenic diets with confidence.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <Card className="p-6">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <Shield className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Safety-First Design</h3>
                <p className="text-muted-foreground">
                  Automated contraindication screening catches high-risk scenarios (SGLT2i, T1D, pregnancy) 
                  before patients start. You'll receive alerts for any safety concerns.
                </p>
              </Card>

              <Card className="p-6">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <FileText className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Evidence-Based Guidance</h3>
                <p className="text-muted-foreground">
                  Every recommendation Dr. Ketone provides is grounded in peer-reviewed research. 
                  We cite sources so you can verify the science behind our guidance.
                </p>
              </Card>

              <Card className="p-6">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <BarChart3 className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Real-Time Monitoring</h3>
                <p className="text-muted-foreground">
                  Track patient adherence, ketone levels, symptoms, and outcomes in real-time. 
                  Receive automated reports and alerts when intervention may be needed.
                </p>
              </Card>
            </div>
          </div>
        </section>

        {/* Provider Portal Features */}
        <section className="py-20 bg-muted/30">
          <div className="container">
            <div className="max-w-3xl mx-auto text-center mb-12">
              <h2 className="mb-4">Provider Portal Features</h2>
              <p className="text-muted-foreground text-lg">
                A comprehensive dashboard designed for clinical workflows
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              <Card className="p-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-secondary/10 flex items-center justify-center flex-shrink-0">
                    <Users className="w-5 h-5 text-secondary" />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Patient Dashboard</h4>
                    <p className="text-sm text-muted-foreground">
                      View all your patients in one place. See adherence rates, recent activity, 
                      and flagged safety concerns at a glance.
                    </p>
                  </div>
                </div>
              </Card>

              <Card className="p-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-secondary/10 flex items-center justify-center flex-shrink-0">
                    <Bell className="w-5 h-5 text-secondary" />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Smart Alerts</h4>
                    <p className="text-sm text-muted-foreground">
                      Receive notifications for safety concerns, medication interactions, 
                      abnormal symptoms, or significant changes in patient metrics.
                    </p>
                  </div>
                </div>
              </Card>

              <Card className="p-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-secondary/10 flex items-center justify-center flex-shrink-0">
                    <TrendingUp className="w-5 h-5 text-secondary" />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Progress Tracking</h4>
                    <p className="text-sm text-muted-foreground">
                      Monitor weight, ketone levels, macros, symptoms, and lab values over time. 
                      Export data for EMR integration.
                    </p>
                  </div>
                </div>
              </Card>

              <Card className="p-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-secondary/10 flex items-center justify-center flex-shrink-0">
                    <FileText className="w-5 h-5 text-secondary" />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Automated Reports</h4>
                    <p className="text-sm text-muted-foreground">
                      Generate comprehensive progress reports for chart notes. Includes adherence, 
                      outcomes, and Dr. Ketone interaction summaries.
                    </p>
                  </div>
                </div>
              </Card>

              <Card className="p-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-secondary/10 flex items-center justify-center flex-shrink-0">
                    <Stethoscope className="w-5 h-5 text-secondary" />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Medication Management</h4>
                    <p className="text-sm text-muted-foreground">
                      Track patient medications and receive alerts for potential interactions 
                      or dosage adjustments needed as metabolic parameters change.
                    </p>
                  </div>
                </div>
              </Card>

              <Card className="p-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-secondary/10 flex items-center justify-center flex-shrink-0">
                    <Brain className="w-5 h-5 text-secondary" />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Dr. Ketone Insights</h4>
                    <p className="text-sm text-muted-foreground">
                      See what questions patients are asking Dr. Ketone and what guidance they're 
                      receiving. Identify knowledge gaps and areas for intervention.
                    </p>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </section>

        {/* Clinical Evidence Summary */}
        <section className="py-20">
          <div className="container">
            <div className="max-w-3xl mx-auto text-center mb-12">
              <h2 className="mb-4">Evidence Summary for Clinicians</h2>
              <p className="text-muted-foreground text-lg">
                Quick reference guide to the latest research supporting ketogenic interventions
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
              <Card className="p-6 bg-primary/5 border-primary/20">
                <div className="flex items-center gap-3 mb-4">
                  <TrendingUp className="w-6 h-6 text-primary" />
                  <h3 className="text-lg font-semibold">Type 2 Diabetes</h3>
                </div>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Evidence Strength:</span>
                    <Badge variant="outline" className="bg-secondary/10 text-secondary border-secondary/30">
                      VERY STRONG
                    </Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">HbA1c Reduction:</span>
                    <span className="font-semibold">-0.29% (p&lt;0.001)</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Fasting Glucose:</span>
                    <span className="font-semibold">-11.68 mg/dL</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Source:</span>
                    <span className="text-xs">Ghasemi 2024 (29 RCTs)</span>
                  </div>
                </div>
              </Card>

              <Card className="p-6 bg-primary/5 border-primary/20">
                <div className="flex items-center gap-3 mb-4">
                  <Heart className="w-6 h-6 text-primary" />
                  <h3 className="text-lg font-semibold">Cardiovascular Health</h3>
                </div>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Evidence Strength:</span>
                    <Badge variant="outline" className="bg-accent/10 text-accent-foreground border-accent/30">
                      MODERATE
                    </Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Triglycerides:</span>
                    <span className="font-semibold">-15 mg/dL</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">HDL:</span>
                    <span className="font-semibold">+3.93 mg/dL</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Source:</span>
                    <span className="text-xs">AJCN 2025 (174 trials)</span>
                  </div>
                </div>
              </Card>

              <Card className="p-6 bg-primary/5 border-primary/20">
                <div className="flex items-center gap-3 mb-4">
                  <Brain className="w-6 h-6 text-primary" />
                  <h3 className="text-lg font-semibold">Epilepsy</h3>
                </div>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Evidence Strength:</span>
                    <Badge variant="outline" className="bg-secondary/10 text-secondary border-secondary/30">
                      VERY STRONG
                    </Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">≥50% Seizure Reduction:</span>
                    <span className="font-semibold">62% of patients</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Seizure Freedom:</span>
                    <span className="font-semibold">23% of patients</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Source:</span>
                    <span className="text-xs">Mustafa 2024 (1000+ pts)</span>
                  </div>
                </div>
              </Card>

              <Card className="p-6 bg-primary/5 border-primary/20">
                <div className="flex items-center gap-3 mb-4">
                  <Activity className="w-6 h-6 text-primary" />
                  <h3 className="text-lg font-semibold">Weight Management</h3>
                </div>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Evidence Strength:</span>
                    <Badge variant="outline" className="bg-secondary/10 text-secondary border-secondary/30">
                      STRONG
                    </Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Weight Loss:</span>
                    <span className="font-semibold">-2.59 kg vs control</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Long-term (5yr):</span>
                    <span className="font-semibold">-12.9% sustained</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Source:</span>
                    <span className="text-xs">Virta Health 2024</span>
                  </div>
                </div>
              </Card>
            </div>

            <div className="text-center mt-8">
              <Button variant="outline" size="lg">
                <Download className="w-4 h-4 mr-2" />
                Download Full Evidence Summary (PDF)
              </Button>
            </div>
          </div>
        </section>

        {/* Safety Protocols */}
        <section className="py-20 bg-muted/30">
          <div className="container">
            <div className="max-w-3xl mx-auto text-center mb-12">
              <h2 className="mb-4">Built-In Safety Protocols</h2>
              <p className="text-muted-foreground text-lg">
                We take patient safety seriously—here's how we protect your patients
              </p>
            </div>

            <div className="max-w-4xl mx-auto space-y-6">
              <Card className="p-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-red-500/10 flex items-center justify-center flex-shrink-0">
                    <Shield className="w-5 h-5 text-red-500" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold mb-2 text-red-500">Absolute Contraindications (Auto-Block)</h4>
                    <p className="text-sm text-muted-foreground mb-3">
                      Patients with these conditions cannot proceed without MD clearance:
                    </p>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• Fatty acid oxidation disorders (CPT, MCAD, VLCAD deficiency)</li>
                      <li>• Primary carnitine deficiency</li>
                      <li>• Pyruvate carboxylase deficiency</li>
                      <li>• Acute intermittent porphyria</li>
                      <li>• Active pancreatitis or liver failure</li>
                    </ul>
                  </div>
                </div>
              </Card>

              <Card className="p-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-amber-500/10 flex items-center justify-center flex-shrink-0">
                    <Bell className="w-5 h-5 text-amber-500" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold mb-2 text-amber-500">High-Risk Scenarios (Require MD Verification)</h4>
                    <p className="text-sm text-muted-foreground mb-3">
                      These patients need physician approval before starting:
                    </p>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• <strong>SGLT2 inhibitors</strong> (euglycemic DKA risk - CRITICAL)</li>
                      <li>• <strong>Breastfeeding</strong> (lactation ketoacidosis risk)</li>
                      <li>• <strong>Type 1 Diabetes</strong> (DKA risk without supervision)</li>
                      <li>• <strong>Pregnancy</strong> (developmental concerns)</li>
                      <li>• <strong>Insulin/Sulfonylureas</strong> (hypoglycemia risk)</li>
                    </ul>
                  </div>
                </div>
              </Card>

              <Card className="p-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-blue-500/10 flex items-center justify-center flex-shrink-0">
                    <CheckCircle2 className="w-5 h-5 text-blue-500" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold mb-2 text-blue-500">Monitor Closely</h4>
                    <p className="text-sm text-muted-foreground mb-3">
                      Patients can proceed but require enhanced monitoring:
                    </p>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• Chronic kidney disease (early stage)</li>
                      <li>• History of gout</li>
                      <li>• Gallbladder disease</li>
                      <li>• Warfarin or lithium therapy</li>
                      <li>• Psychiatric medications</li>
                    </ul>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </section>

        {/* Integration & Workflow */}
        <section className="py-20">
          <div className="container">
            <div className="max-w-3xl mx-auto text-center mb-12">
              <h2 className="mb-4">Seamless Integration with Your Workflow</h2>
              <p className="text-muted-foreground text-lg">
                {APP_TITLE} fits into your existing clinical processes
              </p>
            </div>

            <div className="max-w-4xl mx-auto">
              <div className="space-y-6">
                <div className="flex items-start gap-6">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary text-white flex items-center justify-center font-bold">
                    1
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Patient Enrollment</h4>
                    <p className="text-sm text-muted-foreground">
                      Provide patients with a unique enrollment code. They download the app, complete safety 
                      screening, and you receive a notification when they're ready to start.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-6">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary text-white flex items-center justify-center font-bold">
                    2
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Ongoing Monitoring</h4>
                    <p className="text-sm text-muted-foreground">
                      View patient progress through your provider dashboard. Receive alerts for safety concerns, 
                      medication adjustments, or significant changes in metrics.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-6">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary text-white flex items-center justify-center font-bold">
                    3
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Follow-Up Visits</h4>
                    <p className="text-sm text-muted-foreground">
                      Generate automated progress reports for chart documentation. Export data to your EMR 
                      (coming soon) or review trends directly in the portal.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-6">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary text-white flex items-center justify-center font-bold">
                    4
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Collaborative Care</h4>
                    <p className="text-sm text-muted-foreground">
                      Communicate with patients through secure messaging. Dr. Ketone handles day-to-day questions, 
                      escalating complex issues to you when needed.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-hero">
          <div className="container">
            <div className="max-w-3xl mx-auto text-center text-white">
              <h2 className="text-white mb-4">Ready to Support Your Patients Better?</h2>
              <p className="text-xl text-white/90 mb-8">
                Schedule a demo to see how {APP_TITLE} can enhance your ketogenic diet prescriptions 
                with real-time monitoring, safety alerts, and evidence-based guidance.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="bg-white text-primary hover:bg-white/90">
                  Schedule a Demo
                </Button>
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                  Contact Sales
                </Button>
              </div>
              <p className="text-sm text-white/70 mt-6">
                Questions? Email us at <a href="mailto:providers@ketowell.app" className="underline">providers@ketowell.app</a>
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
