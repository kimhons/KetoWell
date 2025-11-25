import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight, TrendingDown, Users, Activity } from "lucide-react";
import { Link } from "wouter";

interface EvidenceCard {
  title: string;
  evidenceLevel: "VERY STRONG" | "STRONG" | "MODERATE";
  metric: string;
  value: string;
  condition: string;
  participants: string;
  icon: React.ReactNode;
  color: string;
}

const EVIDENCE_CARDS: EvidenceCard[] = [
  {
    title: "Type 2 Diabetes",
    evidenceLevel: "VERY STRONG",
    metric: "HbA1c Reduction",
    value: "-0.29%",
    condition: "vs. Control",
    participants: "21 meta-analyses",
    icon: <TrendingDown className="h-6 w-6" />,
    color: "from-emerald-500 to-teal-600",
  },
  {
    title: "Weight Management",
    evidenceLevel: "STRONG",
    metric: "Weight Loss",
    value: "-2.59 kg",
    condition: "vs. Control",
    participants: "29 RCTs analyzed",
    icon: <Activity className="h-6 w-6" />,
    color: "from-blue-500 to-indigo-600",
  },
  {
    title: "All-Cause Mortality",
    evidenceLevel: "STRONG",
    metric: "Hazard Ratio",
    value: "0.76",
    condition: "Lower risk",
    participants: "n=43,776",
    icon: <Users className="h-6 w-6" />,
    color: "from-violet-500 to-purple-600",
  },
];

const getEvidenceBadgeColor = (level: string) => {
  switch (level) {
    case "VERY STRONG":
      return "bg-emerald-500 text-white hover:bg-emerald-600";
    case "STRONG":
      return "bg-blue-500 text-white hover:bg-blue-600";
    case "MODERATE":
      return "bg-amber-500 text-white hover:bg-amber-600";
    default:
      return "bg-gray-500 text-white";
  }
};

export default function EvidenceShowcase() {
  return (
    <div className="w-full">
      <div className="text-center mb-12">
        <Badge variant="outline" className="mb-4 text-sm">
          Evidence-Based Medicine
        </Badge>
        <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
          Science, Not Hype
        </h2>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Our recommendations are backed by peer-reviewed research and clinical
          evidence, not trends or fads.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-6 mb-8">
        {EVIDENCE_CARDS.map((evidence, index) => (
          <Card
            key={index}
            className="group hover:shadow-2xl transition-all duration-300 border-2 hover:border-primary/50 overflow-hidden"
          >
            {/* Gradient Header */}
            <div
              className={`h-2 bg-gradient-to-r ${evidence.color} group-hover:h-3 transition-all duration-300`}
            />

            <CardHeader>
              <div className="flex items-start justify-between mb-2">
                <div
                  className={`p-3 rounded-lg bg-gradient-to-br ${evidence.color} text-white`}
                >
                  {evidence.icon}
                </div>
                <Badge className={getEvidenceBadgeColor(evidence.evidenceLevel)}>
                  {evidence.evidenceLevel}
                </Badge>
              </div>
              <CardTitle className="text-xl">{evidence.title}</CardTitle>
            </CardHeader>

            <CardContent>
              {/* Main Metric */}
              <div className="mb-4">
                <p className="text-sm text-muted-foreground mb-1">{evidence.metric}</p>
                <p className="text-4xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                  {evidence.value}
                </p>
                <p className="text-sm text-muted-foreground mt-1">
                  {evidence.condition}
                </p>
              </div>

              {/* Study Info */}
              <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
                <Users className="h-4 w-4" />
                <span>{evidence.participants}</span>
              </div>

              {/* Hover Effect - Learn More */}
              <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <Link href="/research">
                  <Button variant="ghost" size="sm" className="w-full">
                    View Research
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* CTA */}
      <div className="text-center">
        <Link href="/research">
          <Button size="lg" className="group">
            Explore All Research
            <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
          </Button>
        </Link>
        <p className="text-sm text-muted-foreground mt-4">
          21+ meta-analyses • 43,776+ participants • 2024-2025 research
        </p>
      </div>
    </div>
  );
}
