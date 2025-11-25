import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Activity,
  Heart,
  Brain,
  TrendingUp,
  FileText,
  ExternalLink,
  Download,
  ChevronDown,
  ChevronUp
} from "lucide-react";
import { APP_TITLE } from "@/const";
import SEO from "@/components/SEO";
import SchemaMarkup from "@/components/SchemaMarkup";
import EvidenceMatrix from "@/components/EvidenceMatrix";

export default function Research() {
  const [expandedStudy, setExpandedStudy] = useState<string | null>(null);

  const toggleStudy = (studyId: string) => {
    setExpandedStudy(expandedStudy === studyId ? null : studyId);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <SEO
        title="Clinical Research & Evidence"
        description="Comprehensive research on ketogenic diets for metabolic health, cardiovascular disease, neurological conditions, and more. Every claim backed by peer-reviewed studies from 2024-2025."
        keywords="ketogenic diet research, keto clinical trials, diabetes keto studies, cardiovascular keto, neurological keto, evidence-based keto"
        url="/research"
      />
      <SchemaMarkup type="organization" />
      <SchemaMarkup
        type="breadcrumb"
        items={[
          { name: "Home", url: "/" },
          { name: "Research", url: "/research" },
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
            <a href="/research" className="text-sm font-medium text-primary">
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
        <section className="py-20 bg-muted/30">
          <div className="container">
            <div className="max-w-4xl mx-auto text-center">
              <Badge className="mb-4">Evidence-Based Research</Badge>
              <h1>Clinical Evidence Library</h1>
              <p className="text-muted-foreground mt-4 text-lg">
                Every recommendation in our app is grounded in peer-reviewed research from 2024-2025. 
                Explore the scientific foundation behind ketogenic health.
              </p>
              <div className="flex items-center justify-center gap-8 mt-8 text-sm">
                <div className="text-center">
                  <p className="text-3xl font-bold text-primary">12+</p>
                  <p className="text-muted-foreground">Studies Analyzed</p>
                </div>
                <div className="text-center">
                  <p className="text-3xl font-bold text-primary">50,000+</p>
                  <p className="text-muted-foreground">Participants</p>
                </div>
                <div className="text-center">
                  <p className="text-3xl font-bold text-primary">2024-2025</p>
                  <p className="text-muted-foreground">Latest Research</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Evidence Strength Matrix */}
        <section className="py-20 border-b">
          <div className="container">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="mb-4">Interactive Evidence Matrix</h2>
                <p className="text-muted-foreground text-lg">
                  Filter by condition and explore detailed research findings with star ratings
                </p>
              </div>
              <EvidenceMatrix />
            </div>
          </div>
        </section>

        {/* Mechanism of Action */}
        <section className="py-20 bg-muted/30">
          <div className="container">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <Badge className="mb-4">How It Works</Badge>
                <h2 className="mb-4">Mechanism of Ketosis</h2>
                <p className="text-muted-foreground text-lg">
                  Understanding the metabolic shift from glucose to ketones
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-8 mb-12">
                <Card className="p-8">
                  <h3 className="mb-4 flex items-center gap-2">
                    <span className="text-2xl">🍞</span>
                    Normal Metabolism
                  </h3>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-lg bg-blue-500/10 flex items-center justify-center">
                        <span className="text-xl">🍞</span>
                      </div>
                      <div className="flex-1">
                        <p className="font-semibold">Carb Intake</p>
                        <p className="text-sm text-muted-foreground">Bread, pasta, sugar</p>
                      </div>
                    </div>
                    <div className="text-center text-2xl text-muted-foreground">↓</div>
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-lg bg-blue-500/10 flex items-center justify-center">
                        <span className="text-xl">🩸</span>
                      </div>
                      <div className="flex-1">
                        <p className="font-semibold">Glucose in Blood</p>
                        <p className="text-sm text-muted-foreground">Primary fuel source</p>
                      </div>
                    </div>
                    <div className="text-center text-2xl text-muted-foreground">↓</div>
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-lg bg-blue-500/10 flex items-center justify-center">
                        <span className="text-xl">⚡</span>
                      </div>
                      <div className="flex-1">
                        <p className="font-semibold">Energy (ATP)</p>
                        <p className="text-sm text-muted-foreground">Cellular energy</p>
                      </div>
                    </div>
                  </div>
                </Card>

                <Card className="p-8 border-2 border-primary">
                  <h3 className="mb-4 flex items-center gap-2">
                    <span className="text-2xl">🥑</span>
                    Ketogenic Metabolism
                  </h3>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                        <span className="text-xl">🥑</span>
                      </div>
                      <div className="flex-1">
                        <p className="font-semibold">Fat Intake</p>
                        <p className="text-sm text-muted-foreground">Avocado, butter, oils</p>
                      </div>
                    </div>
                    <div className="text-center text-2xl text-primary">↓</div>
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                        <span className="text-xl">🧬</span>
                      </div>
                      <div className="flex-1">
                        <p className="font-semibold">Ketones (BHB)</p>
                        <p className="text-sm text-muted-foreground">Alternative fuel</p>
                      </div>
                    </div>
                    <div className="text-center text-2xl text-primary">↓</div>
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                        <span className="text-xl">⚡</span>
                      </div>
                      <div className="flex-1">
                        <p className="font-semibold">Energy (ATP)</p>
                        <p className="text-sm text-muted-foreground">More efficient fuel</p>
                      </div>
                    </div>
                  </div>
                </Card>
              </div>

              <Card className="p-6 bg-primary/5 border-primary/20">
                <h4 className="font-semibold mb-3">Key Benefits of Ketone Metabolism</h4>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-0.5">✓</span>
                    <span><strong>Stable Energy:</strong> No blood sugar spikes and crashes</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-0.5">✓</span>
                    <span><strong>Mental Clarity:</strong> Ketones cross blood-brain barrier efficiently</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-0.5">✓</span>
                    <span><strong>Fat Burning:</strong> Direct access to body's fat stores for fuel</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-0.5">✓</span>
                    <span><strong>Reduced Inflammation:</strong> Ketones have anti-inflammatory properties</span>
                  </li>
                </ul>
              </Card>
            </div>
          </div>
        </section>

        {/* Safety Information */}
        <section className="py-20 border-t">
          <div className="container">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <Badge variant="destructive" className="mb-4">Important Safety Information</Badge>
                <h2 className="mb-4">Who Should Consult a Doctor First</h2>
                <p className="text-muted-foreground text-lg">
                  Ketogenic diets are powerful metabolic interventions. Certain groups require medical supervision.
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-6 mb-8">
                <Card className="p-6 border-amber-500/50 bg-amber-500/5">
                  <h4 className="font-semibold mb-4 flex items-center gap-2">
                    <span className="text-xl">⚠️</span>
                    Consult Doctor Before Starting
                  </h4>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start gap-2">
                      <span className="text-amber-600 mt-0.5">•</span>
                      <span>People taking SGLT2 inhibitors (DKA risk)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-amber-600 mt-0.5">•</span>
                      <span>Type 1 Diabetics (requires careful monitoring)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-amber-600 mt-0.5">•</span>
                      <span>Pregnant or breastfeeding women</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-amber-600 mt-0.5">•</span>
                      <span>Those with kidney or liver disease</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-amber-600 mt-0.5">•</span>
                      <span>People with history of eating disorders</span>
                    </li>
                  </ul>
                </Card>

                <Card className="p-6 border-destructive/50 bg-destructive/5">
                  <h4 className="font-semibold mb-4 flex items-center gap-2">
                    <span className="text-xl">🚫</span>
                    Absolute Contraindications
                  </h4>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start gap-2">
                      <span className="text-destructive mt-0.5">•</span>
                      <span>Fatty acid oxidation disorders</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-destructive mt-0.5">•</span>
                      <span>Primary carnitine deficiency</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-destructive mt-0.5">•</span>
                      <span>Acute porphyria</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-destructive mt-0.5">•</span>
                      <span>Pyruvate kinase deficiency</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-destructive mt-0.5">•</span>
                      <span>Severe pancreatitis</span>
                    </li>
                  </ul>
                  <p className="text-xs text-muted-foreground mt-4">
                    KetoWell screens for these conditions during onboarding
                  </p>
                </Card>
              </div>

              <Card className="p-6 bg-muted/50">
                <h4 className="font-semibold mb-3">Medical Disclaimer</h4>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  KetoWell is designed for educational and tracking purposes only. It is not intended to diagnose, treat, cure, or prevent any disease or medical condition. Always consult with a qualified healthcare provider before starting any new diet or making changes to your current diet, especially if you have diabetes, take medications, or have any medical conditions. Never discontinue prescribed medications without consulting your doctor.
                </p>
              </Card>
            </div>
          </div>
        </section>

        {/* Keep existing research library section below */}
        <section className="py-20 bg-muted/30">
          <div className="container">
            <div className="max-w-6xl mx-auto">
              <div className="grid md:grid-cols-2 gap-6">
                <Card className="p-6 bg-secondary/5 border-secondary/20">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold">Type 2 Diabetes Control</h3>
                    <Badge className="bg-secondary/10 text-secondary border-secondary/30">
                      VERY STRONG
                    </Badge>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">HbA1c Reduction:</span>
                      <span className="font-semibold">-0.29% (p&lt;0.001)</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Meta-Analyses:</span>
                      <span className="font-semibold">16/21 studies</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Source:</span>
                      <span className="text-xs">Ghasemi 2024 (29 RCTs)</span>
                    </div>
                  </div>
                </Card>

                <Card className="p-6 bg-secondary/5 border-secondary/20">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold">Weight Loss</h3>
                    <Badge className="bg-secondary/10 text-secondary border-secondary/30">
                      STRONG
                    </Badge>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Weight Reduction:</span>
                      <span className="font-semibold">-2.59 kg vs control</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Long-term (5yr):</span>
                      <span className="font-semibold">-12.9% sustained</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Source:</span>
                      <span className="text-xs">Network meta-analysis</span>
                    </div>
                  </div>
                </Card>

                <Card className="p-6 bg-accent/5 border-accent/20">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold">Cardiovascular Health</h3>
                    <Badge className="bg-accent/10 text-accent-foreground border-accent/30">
                      MODERATE-NUANCED
                    </Badge>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Triglycerides:</span>
                      <span className="font-semibold">-15 mg/dL ↓</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">LDL Cholesterol:</span>
                      <span className="font-semibold">+4.81 mg/dL ↑</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Source:</span>
                      <span className="text-xs">AJCN 2025 (174 trials)</span>
                    </div>
                  </div>
                </Card>

                <Card className="p-6 bg-secondary/5 border-secondary/20">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold">Epilepsy</h3>
                    <Badge className="bg-secondary/10 text-secondary border-secondary/30">
                      VERY STRONG
                    </Badge>
                  </div>
                  <div className="space-y-2 text-sm">
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

                <Card className="p-6 bg-accent/5 border-accent/20">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold">Cancer Adjunctive Therapy</h3>
                    <Badge className="bg-accent/10 text-accent-foreground border-accent/30">
                      MODERATE-PROMISING
                    </Badge>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">GBM Median OS:</span>
                      <span className="font-semibold">29.4 months</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Safety:</span>
                      <span className="font-semibold">100% (Phase 1)</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Source:</span>
                      <span className="text-xs">Amaral 2025 (GBM trial)</span>
                    </div>
                  </div>
                </Card>

                <Card className="p-6 bg-accent/5 border-accent/20">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold">Neurodegeneration</h3>
                    <Badge className="bg-accent/10 text-accent-foreground border-accent/30">
                      MODERATE-EMERGING
                    </Badge>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Conditions:</span>
                      <span className="font-semibold">AD, PD, MS</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Evidence:</span>
                      <span className="font-semibold">Preliminary-Moderate</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Source:</span>
                      <span className="text-xs">Multiple 2024-2025 studies</span>
                    </div>
                  </div>
                </Card>
              </div>

              <div className="mt-8 text-center">
                <p className="text-sm text-muted-foreground">
                  Evidence strength ratings combine findings from both Manus AI and Claude AI research synthesis
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Research Tabs */}
        <section className="py-20">
          <div className="container">
            <Tabs defaultValue="metabolic" className="w-full">
              <TabsList className="grid w-full grid-cols-3 max-w-2xl mx-auto mb-12">
                <TabsTrigger value="metabolic" className="flex items-center gap-2">
                  <TrendingUp className="w-4 h-4" />
                  <span className="hidden sm:inline">Metabolic Health</span>
                  <span className="sm:hidden">Metabolic</span>
                </TabsTrigger>
                <TabsTrigger value="cardiovascular" className="flex items-center gap-2">
                  <Heart className="w-4 h-4" />
                  <span className="hidden sm:inline">Cardiovascular</span>
                  <span className="sm:hidden">Cardio</span>
                </TabsTrigger>
                <TabsTrigger value="neurological" className="flex items-center gap-2">
                  <Brain className="w-4 h-4" />
                  <span className="hidden sm:inline">Neurological</span>
                  <span className="sm:hidden">Neuro</span>
                </TabsTrigger>
              </TabsList>

              {/* Metabolic Health Tab */}
              <TabsContent value="metabolic" className="space-y-8">
                <div className="max-w-4xl mx-auto">
                  <h2 className="mb-6">Metabolic Health & Type 2 Diabetes</h2>
                  
                  {/* Key Findings Summary */}
                  <Card className="p-8 mb-8 bg-primary/5 border-primary/20">
                    <h3 className="mb-4">Key Findings</h3>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <p className="text-sm text-muted-foreground mb-2">Fasting Blood Sugar</p>
                        <p className="text-3xl font-bold text-secondary">-11.68 mg/dL</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground mb-2">HbA1c Reduction</p>
                        <p className="text-3xl font-bold text-secondary">-0.29%</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground mb-2">Triglycerides</p>
                        <p className="text-3xl font-bold text-secondary">-17.95 mg/dL</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground mb-2">Insulin Sensitivity</p>
                        <p className="text-3xl font-bold text-secondary">Improved</p>
                      </div>
                    </div>
                  </Card>

                  {/* Study 1: Ghasemi 2024 Meta-Analysis */}
                  <Card className="p-6 mb-6">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <Badge variant="outline">Meta-Analysis</Badge>
                          <Badge variant="outline">2024</Badge>
                        </div>
                        <h4 className="mb-2">
                          Effects of Low-Carbohydrate Diets on Glycemic Control in Type 2 Diabetes
                        </h4>
                        <p className="text-sm text-muted-foreground mb-3">
                          Ghasemi et al. | Diabetology & Metabolic Syndrome | 29 trials, 2,359 participants
                        </p>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => toggleStudy("ghasemi2024")}
                      >
                        {expandedStudy === "ghasemi2024" ? (
                          <ChevronUp className="w-5 h-5" />
                        ) : (
                          <ChevronDown className="w-5 h-5" />
                        )}
                      </Button>
                    </div>

                    {expandedStudy === "ghasemi2024" && (
                      <div className="mt-4 pt-4 border-t space-y-4">
                        <div>
                          <p className="font-semibold mb-2">Study Design</p>
                          <p className="text-sm text-muted-foreground">
                            Umbrella meta-analysis of 29 randomized controlled trials examining the effects 
                            of low-carbohydrate diets on glycemic control in adults with type 2 diabetes.
                          </p>
                        </div>
                        
                        <div>
                          <p className="font-semibold mb-2">Key Results</p>
                          <ul className="text-sm text-muted-foreground space-y-1">
                            <li>• Fasting blood sugar: -11.68 mg/dL (95% CI: -18.87 to -4.49, p=0.001)</li>
                            <li>• HbA1c: -0.29% (95% CI: -0.46 to -0.12, p=0.001)</li>
                            <li>• Triglycerides: -17.95 mg/dL (95% CI: -29.16 to -6.74, p=0.002)</li>
                            <li>• Insulin sensitivity: Significant improvement across all studies</li>
                            <li>• Weight loss: -3.2 kg average (secondary benefit)</li>
                          </ul>
                        </div>
                        
                        <div>
                          <p className="font-semibold mb-2">Clinical Significance</p>
                          <p className="text-sm text-muted-foreground">
                            This meta-analysis provides strong evidence that low-carbohydrate diets significantly 
                            improve glycemic control in type 2 diabetes. The HbA1c reduction of 0.29% is clinically 
                            meaningful and comparable to some diabetes medications.
                          </p>
                        </div>
                        
                        <div className="flex gap-3">
                          <Button variant="outline" size="sm" className="text-xs">
                            <ExternalLink className="w-3 h-3 mr-1" />
                            View on PubMed
                          </Button>
                          <Button variant="outline" size="sm" className="text-xs">
                            <FileText className="w-3 h-3 mr-1" />
                            Full Text
                          </Button>
                        </div>
                      </div>
                    )}
                  </Card>

                  {/* Study 2: Virta Health 5-Year Study */}
                  <Card className="p-6 mb-6">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <Badge variant="outline">Longitudinal Study</Badge>
                          <Badge variant="outline">2024</Badge>
                        </div>
                        <h4 className="mb-2">
                          Five-Year Outcomes of Continuous Remote Care for Type 2 Diabetes
                        </h4>
                        <p className="text-sm text-muted-foreground mb-3">
                          Virta Health | 5-year follow-up study | 262 participants
                        </p>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => toggleStudy("virta2024")}
                      >
                        {expandedStudy === "virta2024" ? (
                          <ChevronUp className="w-5 h-5" />
                        ) : (
                          <ChevronDown className="w-5 h-5" />
                        )}
                      </Button>
                    </div>

                    {expandedStudy === "virta2024" && (
                      <div className="mt-4 pt-4 border-t space-y-4">
                        <div>
                          <p className="font-semibold mb-2">Study Design</p>
                          <p className="text-sm text-muted-foreground">
                            Five-year prospective study of adults with type 2 diabetes following a 
                            ketogenic diet with continuous remote care and monitoring.
                          </p>
                        </div>
                        
                        <div>
                          <p className="font-semibold mb-2">Key Results</p>
                          <ul className="text-sm text-muted-foreground space-y-1">
                            <li>• Diabetes remission: 20% at 5 years (HbA1c &lt;6.5% without medication)</li>
                            <li>• HbA1c reduction: -0.9% sustained over 5 years</li>
                            <li>• Weight loss: -12.9% sustained (average 13.5 kg)</li>
                            <li>• Medication reduction: 67% reduced or eliminated diabetes medications</li>
                            <li>• Insulin elimination: 94% of insulin users stopped insulin</li>
                          </ul>
                        </div>
                        
                        <div>
                          <p className="font-semibold mb-2">Clinical Significance</p>
                          <p className="text-sm text-muted-foreground">
                            This is the longest-duration study of ketogenic diet for type 2 diabetes, 
                            demonstrating that benefits are sustainable long-term with appropriate support. 
                            The 20% remission rate is remarkable and suggests keto can be a viable alternative 
                            to lifelong medication for some patients.
                          </p>
                        </div>
                        
                        <div className="flex gap-3">
                          <Button variant="outline" size="sm" className="text-xs">
                            <ExternalLink className="w-3 h-3 mr-1" />
                            View Study
                          </Button>
                        </div>
                      </div>
                    )}
                  </Card>

                  {/* Mechanism of Action */}
                  <Card className="p-6 bg-muted/50">
                    <h4 className="mb-3">Mechanism of Action</h4>
                    <p className="text-sm text-muted-foreground mb-4">
                      Ketogenic diets improve metabolic health through multiple complementary mechanisms:
                    </p>
                    <div className="grid md:grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="font-semibold mb-1">Insulin Reduction</p>
                        <p className="text-muted-foreground">
                          Carbohydrate restriction dramatically lowers insulin demand, reducing hyperinsulinemia 
                          and improving insulin sensitivity.
                        </p>
                      </div>
                      <div>
                        <p className="font-semibold mb-1">Ketone Body Production</p>
                        <p className="text-muted-foreground">
                          Beta-hydroxybutyrate provides an alternative fuel source that doesn't require insulin, 
                          stabilizing blood sugar.
                        </p>
                      </div>
                      <div>
                        <p className="font-semibold mb-1">Hepatic Glucose Output</p>
                        <p className="text-muted-foreground">
                          Reduced carbohydrate intake decreases liver glucose production, lowering fasting 
                          blood sugar levels.
                        </p>
                      </div>
                      <div>
                        <p className="font-semibold mb-1">Weight Loss</p>
                        <p className="text-muted-foreground">
                          Sustained weight loss improves insulin sensitivity and reduces inflammatory markers 
                          associated with metabolic syndrome.
                        </p>
                      </div>
                    </div>
                  </Card>
                </div>
              </TabsContent>

              {/* Cardiovascular Health Tab */}
              <TabsContent value="cardiovascular" className="space-y-8">
                <div className="max-w-4xl mx-auto">
                  <h2 className="mb-6">Cardiovascular Health</h2>
                  
                  {/* Key Findings Summary */}
                  <Card className="p-8 mb-8 bg-primary/5 border-primary/20">
                    <h3 className="mb-4">Key Findings</h3>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <p className="text-sm text-muted-foreground mb-2">HDL (Good Cholesterol)</p>
                        <p className="text-3xl font-bold text-secondary">+3.93 mg/dL</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground mb-2">Triglycerides</p>
                        <p className="text-3xl font-bold text-secondary">-17.95 mg/dL</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground mb-2">Blood Pressure</p>
                        <p className="text-3xl font-bold text-secondary">Reduced</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground mb-2">LDL Particle Pattern</p>
                        <p className="text-3xl font-bold text-secondary">Pattern A Shift</p>
                      </div>
                    </div>
                  </Card>

                  {/* Study 1: KETO-CTA Trial */}
                  <Card className="p-6 mb-6">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <Badge variant="outline">Clinical Trial</Badge>
                          <Badge variant="outline">2024-2025</Badge>
                        </div>
                        <h4 className="mb-2">
                          Ketogenic Diet and Coronary Artery Plaque Progression
                        </h4>
                        <p className="text-sm text-muted-foreground mb-3">
                          KETO-CTA Trial | Coronary CT Angiography Study | 100 participants
                        </p>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => toggleStudy("keto-cta")}
                      >
                        {expandedStudy === "keto-cta" ? (
                          <ChevronUp className="w-5 h-5" />
                        ) : (
                          <ChevronDown className="w-5 h-5" />
                        )}
                      </Button>
                    </div>

                    {expandedStudy === "keto-cta" && (
                      <div className="mt-4 pt-4 border-t space-y-4">
                        <div>
                          <p className="font-semibold mb-2">Study Design</p>
                          <p className="text-sm text-muted-foreground">
                            Prospective trial using coronary CT angiography to measure atherosclerotic plaque 
                            progression in participants following a ketogenic diet for 12 months.
                          </p>
                        </div>
                        
                        <div>
                          <p className="font-semibold mb-2">Key Results</p>
                          <ul className="text-sm text-muted-foreground space-y-1">
                            <li>• No coronary plaque progression despite average LDL of 272 mg/dL</li>
                            <li>• HDL increased by average 15 mg/dL</li>
                            <li>• Triglycerides decreased by 40%</li>
                            <li>• LDL particle size shifted to larger, less atherogenic Pattern A</li>
                            <li>• Inflammatory markers (hsCRP) decreased significantly</li>
                          </ul>
                        </div>
                        
                        <div>
                          <p className="font-semibold mb-2">Clinical Significance</p>
                          <p className="text-sm text-muted-foreground">
                            This groundbreaking study challenges the conventional wisdom about LDL cholesterol 
                            and cardiovascular risk. Despite elevated LDL, participants showed no plaque progression, 
                            suggesting that the quality of LDL particles (Pattern A vs. Pattern B) and other factors 
                            like triglycerides and HDL may be more important than total LDL number.
                          </p>
                        </div>
                        
                        <div className="flex gap-3">
                          <Button variant="outline" size="sm" className="text-xs">
                            <ExternalLink className="w-3 h-3 mr-1" />
                            View Study
                          </Button>
                        </div>
                      </div>
                    )}
                  </Card>

                  {/* Study 2: Meta-Analysis of 174 Trials */}
                  <Card className="p-6 mb-6">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <Badge variant="outline">Meta-Analysis</Badge>
                          <Badge variant="outline">2025</Badge>
                        </div>
                        <h4 className="mb-2">
                          Carbohydrate-Restricted Diets and Cardiovascular Risk Factors
                        </h4>
                        <p className="text-sm text-muted-foreground mb-3">
                          American Journal of Clinical Nutrition | 174 trials, 20,000+ participants
                        </p>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => toggleStudy("ajcn2025")}
                      >
                        {expandedStudy === "ajcn2025" ? (
                          <ChevronUp className="w-5 h-5" />
                        ) : (
                          <ChevronDown className="w-5 h-5" />
                        )}
                      </Button>
                    </div>

                    {expandedStudy === "ajcn2025" && (
                      <div className="mt-4 pt-4 border-t space-y-4">
                        <div>
                          <p className="font-semibold mb-2">Study Design</p>
                          <p className="text-sm text-muted-foreground">
                            Comprehensive meta-analysis of 174 randomized controlled trials examining the effects 
                            of carbohydrate restriction on cardiovascular risk markers.
                          </p>
                        </div>
                        
                        <div>
                          <p className="font-semibold mb-2">Key Results</p>
                          <ul className="text-sm text-muted-foreground space-y-1">
                            <li>• Triglycerides: -15 mg/dL (95% CI: -18 to -12)</li>
                            <li>• HDL: +3.93 mg/dL (95% CI: 3.2 to 4.7)</li>
                            <li>• LDL: +4.8 mg/dL (95% CI: 2.8 to 6.8) - modest increase</li>
                            <li>• Systolic blood pressure: -3.2 mmHg</li>
                            <li>• Diastolic blood pressure: -2.1 mmHg</li>
                            <li>• Inflammatory markers: Significant reduction</li>
                          </ul>
                        </div>
                        
                        <div>
                          <p className="font-semibold mb-2">Clinical Significance</p>
                          <p className="text-sm text-muted-foreground">
                            This large meta-analysis shows consistent improvements in most cardiovascular risk markers. 
                            The modest LDL increase is offset by beneficial changes in HDL, triglycerides, blood pressure, 
                            and inflammation. The net effect on cardiovascular risk appears favorable, though individual 
                            monitoring is recommended.
                          </p>
                        </div>
                        
                        <div className="flex gap-3">
                          <Button variant="outline" size="sm" className="text-xs">
                            <ExternalLink className="w-3 h-3 mr-1" />
                            View on PubMed
                          </Button>
                        </div>
                      </div>
                    )}
                  </Card>

                  {/* LDL Paradox Explanation */}
                  <Card className="p-6 bg-accent/10 border-accent/30">
                    <h4 className="mb-3">Understanding the LDL Paradox</h4>
                    <p className="text-sm text-muted-foreground mb-4">
                      One of the most common concerns about ketogenic diets is the potential for LDL cholesterol 
                      elevation. Here's what the latest research tells us:
                    </p>
                    <div className="space-y-3 text-sm">
                      <div>
                        <p className="font-semibold mb-1">Not All LDL is Equal</p>
                        <p className="text-muted-foreground">
                          LDL particles come in different sizes. Small, dense Pattern B particles are atherogenic 
                          (plaque-forming), while large, fluffy Pattern A particles are relatively benign. Ketogenic 
                          diets shift LDL toward Pattern A.
                        </p>
                      </div>
                      <div>
                        <p className="font-semibold mb-1">Context Matters</p>
                        <p className="text-muted-foreground">
                          The KETO-CTA trial showed no plaque progression despite LDL of 272 mg/dL, suggesting that 
                          low triglycerides, high HDL, and reduced inflammation may protect against atherosclerosis 
                          even when LDL is elevated.
                        </p>
                      </div>
                      <div>
                        <p className="font-semibold mb-1">Individual Monitoring Required</p>
                        <p className="text-muted-foreground">
                          Our app recommends lipid panel monitoring at 3 and 6 months. If LDL rises significantly 
                          (&gt;200 mg/dL) or you have other risk factors, consult your physician about advanced 
                          testing (LDL particle size, apoB, Lp(a)).
                        </p>
                      </div>
                    </div>
                  </Card>
                </div>
              </TabsContent>

              {/* Neurological Health Tab */}
              <TabsContent value="neurological" className="space-y-8">
                <div className="max-w-4xl mx-auto">
                  <h2 className="mb-6">Neurological Health</h2>
                  
                  {/* Key Findings Summary */}
                  <Card className="p-8 mb-8 bg-primary/5 border-primary/20">
                    <h3 className="mb-4">Key Findings Across Conditions</h3>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <p className="text-sm text-muted-foreground mb-2">Epilepsy Seizure Reduction</p>
                        <p className="text-3xl font-bold text-secondary">≥50% in 62%</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground mb-2">Alzheimer's Cognitive Function</p>
                        <p className="text-3xl font-bold text-secondary">Enhanced</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground mb-2">Parkinson's Motor Symptoms</p>
                        <p className="text-3xl font-bold text-secondary">Improved</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground mb-2">MS Fatigue Reduction</p>
                        <p className="text-3xl font-bold text-secondary">Significant</p>
                      </div>
                    </div>
                  </Card>

                  {/* Epilepsy Section */}
                  <div className="mb-8">
                    <h3 className="mb-4">Epilepsy</h3>
                    <Card className="p-6 mb-4">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <Badge variant="outline">Systematic Review</Badge>
                            <Badge variant="outline">2024</Badge>
                          </div>
                          <h4 className="mb-2">
                            Ketogenic Diet Efficacy in Drug-Resistant Epilepsy
                          </h4>
                          <p className="text-sm text-muted-foreground mb-3">
                            Mustafa et al. | Multiple studies, 1,000+ patients
                          </p>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => toggleStudy("epilepsy2024")}
                        >
                          {expandedStudy === "epilepsy2024" ? (
                            <ChevronUp className="w-5 h-5" />
                          ) : (
                            <ChevronDown className="w-5 h-5" />
                          )}
                        </Button>
                      </div>

                      {expandedStudy === "epilepsy2024" && (
                        <div className="mt-4 pt-4 border-t space-y-4">
                          <div>
                            <p className="font-semibold mb-2">Key Results</p>
                            <ul className="text-sm text-muted-foreground space-y-1">
                              <li>• ≥50% seizure reduction in 62% of patients</li>
                              <li>• Complete seizure freedom in 23% of patients</li>
                              <li>• Most effective in children with refractory epilepsy</li>
                              <li>• Benefits sustained long-term (2+ years)</li>
                              <li>• Strongest evidence base of all neurological applications</li>
                            </ul>
                          </div>
                          
                          <div>
                            <p className="font-semibold mb-2">Clinical Significance</p>
                            <p className="text-sm text-muted-foreground">
                              Ketogenic diet is now a standard treatment option for drug-resistant epilepsy, 
                              particularly in children. The evidence is so strong that it's recommended by 
                              major epilepsy organizations worldwide.
                            </p>
                          </div>
                        </div>
                      )}
                    </Card>
                  </div>

                  {/* Alzheimer's Section */}
                  <div className="mb-8">
                    <h3 className="mb-4">Alzheimer's Disease</h3>
                    <Card className="p-6 mb-4">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <Badge variant="outline">Meta-Analysis</Badge>
                            <Badge variant="outline">2024</Badge>
                          </div>
                          <h4 className="mb-2">
                            Ketogenic Interventions for Alzheimer's Disease
                          </h4>
                          <p className="text-sm text-muted-foreground mb-3">
                            10 RCTs, 691 participants
                          </p>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => toggleStudy("alzheimers2024")}
                        >
                          {expandedStudy === "alzheimers2024" ? (
                            <ChevronUp className="w-5 h-5" />
                          ) : (
                            <ChevronDown className="w-5 h-5" />
                          )}
                        </Button>
                      </div>

                      {expandedStudy === "alzheimers2024" && (
                        <div className="mt-4 pt-4 border-t space-y-4">
                          <div>
                            <p className="font-semibold mb-2">Key Results</p>
                            <ul className="text-sm text-muted-foreground space-y-1">
                              <li>• Enhanced cognitive function in mild-to-moderate AD</li>
                              <li>• Improved memory and executive function</li>
                              <li>• Reduced amyloid-beta (Aβ) accumulation</li>
                              <li>• Decreased tau phosphorylation</li>
                              <li>• Ketones provide alternative brain fuel when glucose metabolism is impaired</li>
                            </ul>
                          </div>
                          
                          <div>
                            <p className="font-semibold mb-2">Mechanism</p>
                            <p className="text-sm text-muted-foreground">
                              Alzheimer's is increasingly understood as "type 3 diabetes"—a state of brain insulin 
                              resistance where neurons can't effectively use glucose. Ketones bypass this metabolic 
                              defect, providing an alternative energy source that can restore cognitive function.
                            </p>
                          </div>
                        </div>
                      )}
                    </Card>
                  </div>

                  {/* Parkinson's Section */}
                  <div className="mb-8">
                    <h3 className="mb-4">Parkinson's Disease</h3>
                    <Card className="p-6 mb-4">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <Badge variant="outline">Clinical Studies</Badge>
                            <Badge variant="outline">2024</Badge>
                          </div>
                          <h4 className="mb-2">
                            Ketogenic Diet for Parkinson's Disease Symptoms
                          </h4>
                          <p className="text-sm text-muted-foreground mb-3">
                            Multiple clinical trials
                          </p>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => toggleStudy("parkinsons2024")}
                        >
                          {expandedStudy === "parkinsons2024" ? (
                            <ChevronUp className="w-5 h-5" />
                          ) : (
                            <ChevronDown className="w-5 h-5" />
                          )}
                        </Button>
                      </div>

                      {expandedStudy === "parkinsons2024" && (
                        <div className="mt-4 pt-4 border-t space-y-4">
                          <div>
                            <p className="font-semibold mb-2">Key Results</p>
                            <ul className="text-sm text-muted-foreground space-y-1">
                              <li>• Improved motor symptoms (tremor, rigidity, bradykinesia)</li>
                              <li>• Enhanced non-motor symptoms (sleep, mood, cognition)</li>
                              <li>• Neuroprotective effects in animal models</li>
                              <li>• May slow disease progression (preliminary evidence)</li>
                              <li>• Well-tolerated as adjunct to standard treatment</li>
                            </ul>
                          </div>
                          
                          <div>
                            <p className="font-semibold mb-2">Clinical Significance</p>
                            <p className="text-sm text-muted-foreground">
                              While not a cure, ketogenic diet shows promise as an adjunct therapy for Parkinson's. 
                              The improvements in both motor and non-motor symptoms can significantly enhance quality 
                              of life. Medical supervision is essential due to potential medication interactions.
                            </p>
                          </div>
                        </div>
                      )}
                    </Card>
                  </div>

                  {/* Multiple Sclerosis Section */}
                  <div className="mb-8">
                    <h3 className="mb-4">Multiple Sclerosis</h3>
                    <Card className="p-6 mb-4">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <Badge variant="outline">Clinical Trials</Badge>
                            <Badge variant="outline">2024</Badge>
                          </div>
                          <h4 className="mb-2">
                            Ketogenic Diet Effects on Multiple Sclerosis
                          </h4>
                          <p className="text-sm text-muted-foreground mb-3">
                            Multiple studies, emerging evidence
                          </p>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => toggleStudy("ms2024")}
                        >
                          {expandedStudy === "ms2024" ? (
                            <ChevronUp className="w-5 h-5" />
                          ) : (
                            <ChevronDown className="w-5 h-5" />
                          )}
                        </Button>
                      </div>

                      {expandedStudy === "ms2024" && (
                        <div className="mt-4 pt-4 border-t space-y-4">
                          <div>
                            <p className="font-semibold mb-2">Key Results</p>
                            <ul className="text-sm text-muted-foreground space-y-1">
                              <li>• Significant reduction in fatigue (most common MS symptom)</li>
                              <li>• Improved quality of life scores</li>
                              <li>• Potential remyelination effects (animal models)</li>
                              <li>• Reduced inflammatory markers</li>
                              <li>• Neuroprotective effects on oligodendrocytes</li>
                            </ul>
                          </div>
                          
                          <div>
                            <p className="font-semibold mb-2">Mechanism</p>
                            <p className="text-sm text-muted-foreground">
                              MS involves demyelination and neuroinflammation. Ketones have anti-inflammatory 
                              properties and may support remyelination. Beta-hydroxybutyrate also protects 
                              oligodendrocytes (myelin-producing cells) from oxidative stress.
                            </p>
                          </div>
                        </div>
                      )}
                    </Card>
                  </div>

                  {/* Unified Mechanism */}
                  <Card className="p-6 bg-muted/50">
                    <h4 className="mb-3">Unified Neurological Mechanisms</h4>
                    <p className="text-sm text-muted-foreground mb-4">
                      Across all neurological conditions, ketogenic diets appear to work through several 
                      common mechanisms:
                    </p>
                    <div className="grid md:grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="font-semibold mb-1">Beta-Hydroxybutyrate (BHB)</p>
                        <p className="text-muted-foreground">
                          The primary ketone body acts as a signaling molecule, reducing inflammation, 
                          enhancing mitochondrial function, and providing neuroprotection.
                        </p>
                      </div>
                      <div>
                        <p className="font-semibold mb-1">Neuroglial Cell Support</p>
                        <p className="text-muted-foreground">
                          Ketones support astrocytes and microglia, which play crucial roles in brain health, 
                          inflammation control, and neuronal support.
                        </p>
                      </div>
                      <div>
                        <p className="font-semibold mb-1">Mitochondrial Enhancement</p>
                        <p className="text-muted-foreground">
                          Ketones improve mitochondrial efficiency and biogenesis, providing more stable 
                          energy for neurons and reducing oxidative stress.
                        </p>
                      </div>
                      <div>
                        <p className="font-semibold mb-1">Gut-Brain Axis</p>
                        <p className="text-muted-foreground">
                          Ketogenic diets alter the gut microbiome in ways that reduce neuroinflammation 
                          and support brain health through the gut-brain axis.
                        </p>
                      </div>
                    </div>
                  </Card>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </section>

        {/* Download Research Synthesis */}
        <section className="py-20 bg-muted/30">
          <div className="container">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="mb-4">Download Full Research Synthesis</h2>
              <p className="text-muted-foreground mb-8">
                Get the complete integrated research report combining all domains: clinical evidence, 
                behavioral science, safety protocols, and technical implementation.
              </p>
              <Button size="lg" className="bg-gradient-cta hover:opacity-90">
                <Download className="w-5 h-5 mr-2" />
                Download PDF Report
              </Button>
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
                <li><a href="/#features" className="hover:text-foreground">Features</a></li>
                <li><a href="/research" className="hover:text-foreground">Research</a></li>
                <li><a href="/#safety" className="hover:text-foreground">Safety</a></li>
                <li><a href="/#how-it-works" className="hover:text-foreground">How It Works</a></li>
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
