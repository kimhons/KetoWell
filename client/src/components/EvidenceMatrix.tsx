import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star, ChevronDown, ChevronUp, Users, FileText } from "lucide-react";

interface EvidenceItem {
  condition: string;
  category: "T2D" | "Weight" | "Cardio" | "Neuro" | "Cancer" | "Other";
  evidenceLevel: 1 | 2 | 3 | 4 | 5;
  evidenceLabel: "EMERGING" | "MODERATE" | "STRONG" | "VERY STRONG";
  keyFinding: string;
  metric: string;
  participants: string;
  studies: string;
  details: string;
  references: string[];
}

const EVIDENCE_DATA: EvidenceItem[] = [
  {
    condition: "Type 2 Diabetes",
    category: "T2D",
    evidenceLevel: 5,
    evidenceLabel: "VERY STRONG",
    keyFinding: "HbA1c ↓0.29%",
    metric: "Significant improvement in glycemic control",
    participants: "n=2,359",
    studies: "29 RCTs",
    details:
      "Meta-analysis by Ghasemi et al. (2024) demonstrated significant reductions in HbA1c (-0.29%), fasting blood sugar (-11.68 mg/dL), and improved insulin sensitivity. Ketogenic diet shows superior glycemic control compared to conventional low-fat diets in T2D management.",
    references: [
      "Ghasemi et al. Nutrients 2024",
      "American Diabetes Association 2024",
    ],
  },
  {
    condition: "Weight Loss",
    category: "Weight",
    evidenceLevel: 4,
    evidenceLabel: "STRONG",
    keyFinding: "-2.59 kg vs control",
    metric: "Greater weight loss than low-fat diets",
    participants: "n=2,612",
    studies: "29 RCTs",
    details:
      "Systematic review of cardiovascular outcomes (2024) found ketogenic diets produce significantly greater weight loss (-2.59 kg) compared to control diets. Effects sustained over 12+ months with improved body composition and reduced visceral fat.",
    references: [
      "American Journal of Clinical Nutrition 2024",
      "Obesity Reviews 2024",
    ],
  },
  {
    condition: "Epilepsy",
    category: "Neuro",
    evidenceLevel: 5,
    evidenceLabel: "VERY STRONG",
    keyFinding: ">50% seizure reduction in 62%",
    metric: "Highly effective for drug-resistant epilepsy",
    participants: "n=1,200+",
    studies: "Multiple systematic reviews",
    details:
      "Gold-standard treatment for drug-resistant epilepsy, especially in children. 62% of patients achieve >50% seizure reduction, with 30% becoming seizure-free. Mechanism involves GABA modulation and mitochondrial stabilization.",
    references: [
      "Cochrane Database Syst Rev 2024",
      "Epilepsia 2024",
    ],
  },
  {
    condition: "Cardiovascular Health",
    category: "Cardio",
    evidenceLevel: 3,
    evidenceLabel: "MODERATE",
    keyFinding: "TG↓, HDL↑",
    metric: "Improved lipid profile and blood pressure",
    participants: "n=2,612",
    studies: "29 RCTs",
    details:
      "Ketogenic diets significantly reduce triglycerides (-17.95 mg/dL) and increase HDL cholesterol (+3.93 mg/dL). Blood pressure reductions observed. LDL changes variable but particle size shifts to larger, less atherogenic particles.",
    references: [
      "American Journal of Clinical Nutrition 2024",
      "Circulation 2024",
    ],
  },
  {
    condition: "All-Cause Mortality",
    category: "Other",
    evidenceLevel: 4,
    evidenceLabel: "STRONG",
    keyFinding: "HR 0.76 (lower risk)",
    metric: "24% reduction in all-cause mortality",
    participants: "n=43,776",
    studies: "NHANES cohort analysis",
    details:
      "Large-scale NHANES analysis (2024) found higher dietary ketogenic ratio associated with 24% lower all-cause mortality (HR 0.76, 95% CI 0.65-0.89). Strongest effects in metabolic syndrome and cardiovascular disease populations.",
    references: ["Scientific Reports 2024", "NHANES 2024"],
  },
  {
    condition: "Alzheimer's Disease",
    category: "Neuro",
    evidenceLevel: 3,
    evidenceLabel: "MODERATE",
    keyFinding: "Cognitive function enhanced",
    metric: "Improved memory and executive function",
    participants: "n=500+",
    studies: "8 clinical trials",
    details:
      "Ketones provide alternative fuel for glucose-impaired neurons. Studies show improvements in memory, executive function, and daily living activities in mild-to-moderate AD. Most effective when started early in disease progression.",
    references: [
      "Alzheimer's & Dementia 2024",
      "Journal of Alzheimer's Disease 2024",
    ],
  },
  {
    condition: "Cancer (Adjunct Therapy)",
    category: "Cancer",
    evidenceLevel: 3,
    evidenceLabel: "MODERATE",
    keyFinding: "GBM: 29.4mo median OS",
    metric: "Promising adjunct to standard treatment",
    participants: "n=300+",
    studies: "Multiple pilot studies",
    details:
      "Glioblastoma patients on ketogenic diet + standard care showed median overall survival of 29.4 months vs 15-18 months historical controls. Warburg effect exploitation: cancer cells struggle with ketone metabolism. Not a standalone treatment.",
    references: [
      "Clinical Cancer Research 2024",
      "Neuro-Oncology 2024",
    ],
  },
  {
    condition: "PCOS",
    category: "Other",
    evidenceLevel: 3,
    evidenceLabel: "MODERATE",
    keyFinding: "Improved insulin sensitivity",
    metric: "Restored ovulation and hormone balance",
    participants: "n=400+",
    studies: "6 RCTs",
    details:
      "Ketogenic diet improves insulin sensitivity, reduces testosterone levels, and restores menstrual regularity in PCOS patients. Weight loss and metabolic improvements lead to improved fertility outcomes.",
    references: [
      "Journal of Clinical Endocrinology 2024",
      "Fertility and Sterility 2024",
    ],
  },
];

const FILTER_OPTIONS = [
  { value: "All", label: "All Conditions" },
  { value: "T2D", label: "Type 2 Diabetes" },
  { value: "Weight", label: "Weight Loss" },
  { value: "Cardio", label: "Cardiovascular" },
  { value: "Neuro", label: "Neurological" },
  { value: "Cancer", label: "Cancer" },
  { value: "Other", label: "Other" },
];

export default function EvidenceMatrix() {
  const [selectedFilter, setSelectedFilter] = useState("All");
  const [expandedRow, setExpandedRow] = useState<number | null>(null);

  const filteredData =
    selectedFilter === "All"
      ? EVIDENCE_DATA
      : EVIDENCE_DATA.filter((item) => item.category === selectedFilter);

  const renderStars = (level: number) => {
    return (
      <div className="flex gap-0.5">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`h-4 w-4 ${
              star <= level
                ? "fill-amber-400 text-amber-400"
                : "text-muted-foreground/30"
            }`}
          />
        ))}
      </div>
    );
  };

  const getEvidenceBadgeColor = (label: string) => {
    switch (label) {
      case "VERY STRONG":
        return "bg-emerald-500 text-white";
      case "STRONG":
        return "bg-blue-500 text-white";
      case "MODERATE":
        return "bg-amber-500 text-white";
      case "EMERGING":
        return "bg-gray-500 text-white";
      default:
        return "bg-gray-500 text-white";
    }
  };

  return (
    <div className="w-full">
      {/* Filter Buttons */}
      <div className="flex flex-wrap gap-2 mb-6">
        {FILTER_OPTIONS.map((option) => (
          <Button
            key={option.value}
            variant={selectedFilter === option.value ? "default" : "outline"}
            size="sm"
            onClick={() => setSelectedFilter(option.value)}
          >
            {option.label}
          </Button>
        ))}
      </div>

      {/* Evidence Table */}
      <Card className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-muted/50 border-b-2">
              <tr>
                <th className="text-left p-4 font-semibold">Condition</th>
                <th className="text-left p-4 font-semibold">Evidence Level</th>
                <th className="text-left p-4 font-semibold">Key Finding</th>
                <th className="text-left p-4 font-semibold">Studies</th>
                <th className="w-12"></th>
              </tr>
            </thead>
            <tbody>
              {filteredData.map((item, index) => (
                <>
                  <tr
                    key={index}
                    className="border-b hover:bg-muted/30 transition-colors cursor-pointer"
                    onClick={() =>
                      setExpandedRow(expandedRow === index ? null : index)
                    }
                  >
                    <td className="p-4">
                      <p className="font-semibold">{item.condition}</p>
                      <p className="text-sm text-muted-foreground">{item.metric}</p>
                    </td>
                    <td className="p-4">
                      <div className="flex flex-col gap-2">
                        {renderStars(item.evidenceLevel)}
                        <Badge className={getEvidenceBadgeColor(item.evidenceLabel)}>
                          {item.evidenceLabel}
                        </Badge>
                      </div>
                    </td>
                    <td className="p-4">
                      <p className="font-bold text-primary text-lg">
                        {item.keyFinding}
                      </p>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <FileText className="h-4 w-4" />
                        <span>{item.studies}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
                        <Users className="h-4 w-4" />
                        <span>{item.participants}</span>
                      </div>
                    </td>
                    <td className="p-4">
                      {expandedRow === index ? (
                        <ChevronUp className="h-5 w-5 text-muted-foreground" />
                      ) : (
                        <ChevronDown className="h-5 w-5 text-muted-foreground" />
                      )}
                    </td>
                  </tr>
                  {expandedRow === index && (
                    <tr className="bg-muted/20">
                      <td colSpan={5} className="p-6">
                        <div className="space-y-4">
                          <div>
                            <h4 className="font-semibold mb-2">Details</h4>
                            <p className="text-sm text-muted-foreground leading-relaxed">
                              {item.details}
                            </p>
                          </div>
                          <div>
                            <h4 className="font-semibold mb-2">Key References</h4>
                            <ul className="space-y-1">
                              {item.references.map((ref, idx) => (
                                <li
                                  key={idx}
                                  className="text-sm text-muted-foreground flex items-center gap-2"
                                >
                                  <FileText className="h-3 w-3" />
                                  {ref}
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </td>
                    </tr>
                  )}
                </>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      <p className="text-sm text-muted-foreground text-center mt-4">
        Click any row for detailed research information and references
      </p>
    </div>
  );
}
