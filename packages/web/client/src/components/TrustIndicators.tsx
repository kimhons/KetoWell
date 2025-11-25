import { Badge } from "@/components/ui/badge";
import { CheckCircle2, FileText, Users } from "lucide-react";

export default function TrustIndicators() {
  return (
    <div className="w-full py-8 border-y bg-muted/30">
      <div className="container">
        <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-12">
          {/* Meta-Analyses */}
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-primary/10">
              <FileText className="h-5 w-5 text-primary" />
            </div>
            <div>
              <p className="text-2xl font-bold">21+</p>
              <p className="text-sm text-muted-foreground">Meta-Analyses</p>
            </div>
          </div>

          {/* Participants */}
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-primary/10">
              <Users className="h-5 w-5 text-primary" />
            </div>
            <div>
              <p className="text-2xl font-bold">43,776+</p>
              <p className="text-sm text-muted-foreground">Participants</p>
            </div>
          </div>

          {/* Evidence Quality */}
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-primary/10">
              <CheckCircle2 className="h-5 w-5 text-primary" />
            </div>
            <div>
              <p className="text-2xl font-bold">2024-2025</p>
              <p className="text-sm text-muted-foreground">Latest Research</p>
            </div>
          </div>
        </div>

        {/* Featured In */}
        <div className="mt-8 text-center">
          <p className="text-sm text-muted-foreground mb-4">Evidence from:</p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Badge variant="outline" className="text-xs">
              American Journal of Clinical Nutrition
            </Badge>
            <Badge variant="outline" className="text-xs">
              Scientific Reports
            </Badge>
            <Badge variant="outline" className="text-xs">
              Nutrients Journal
            </Badge>
            <Badge variant="outline" className="text-xs">
              Diabetes Care
            </Badge>
            <Badge variant="outline" className="text-xs">
              Cochrane Reviews
            </Badge>
          </div>
        </div>
      </div>
    </div>
  );
}
