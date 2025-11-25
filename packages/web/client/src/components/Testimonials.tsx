import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";

interface Testimonial {
  name: string;
  condition: string;
  quote: string;
  metric: string;
  metricValue: string;
  timeframe: string;
  avatar: string;
}

const TESTIMONIALS: Testimonial[] = [
  {
    name: "Sarah M.",
    condition: "Type 2 Diabetic",
    quote:
      "Dr. Ketone helped me understand why I wasn't losing weight. Turns out my protein was too high. Down 28 lbs in 3 months and my doctor is amazed at my blood sugar levels.",
    metric: "HbA1c",
    metricValue: "8.2 → 5.9",
    timeframe: "3 months",
    avatar: "👩‍⚕️",
  },
  {
    name: "Michael R.",
    condition: "Weight Loss Journey",
    quote:
      "I've tried every diet. Keto finally worked because Dr. Ketone kept me accountable and answered all my questions instantly. No more waiting days for my nutritionist to respond.",
    metric: "Weight Loss",
    metricValue: "-45 lbs",
    timeframe: "6 months",
    avatar: "👨‍💼",
  },
  {
    name: "Jennifer L.",
    condition: "PCOS & Insulin Resistance",
    quote:
      "The app's safety screening caught that I was taking metformin and adjusted my plan accordingly. I finally have regular cycles again and my energy is through the roof.",
    metric: "Fasting Insulin",
    metricValue: "18 → 6 µIU/mL",
    timeframe: "4 months",
    avatar: "👩‍🔬",
  },
  {
    name: "David K.",
    condition: "Epilepsy Management",
    quote:
      "My neurologist recommended keto for seizure control. KetoWell made it so much easier to track my macros and ketone levels. Seizure frequency dropped by 70%.",
    metric: "Seizure Reduction",
    metricValue: "70% decrease",
    timeframe: "8 months",
    avatar: "👨‍🏫",
  },
  {
    name: "Lisa T.",
    condition: "Metabolic Health",
    quote:
      "I was skeptical about AI health advice, but Dr. Ketone's recommendations are always backed by research. The app even shows me the studies. It's like having a scientist in my pocket.",
    metric: "Triglycerides",
    metricValue: "210 → 95 mg/dL",
    timeframe: "5 months",
    avatar: "👩‍💻",
  },
];

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? TESTIMONIALS.length - 1 : prev - 1));
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev === TESTIMONIALS.length - 1 ? 0 : prev + 1));
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  const currentTestimonial = TESTIMONIALS[currentIndex];

  return (
    <div className="w-full max-w-4xl mx-auto">
      <Card className="border-2 shadow-xl overflow-hidden">
        <CardContent className="p-8 md:p-12 relative">
          {/* Quote Icon */}
          <div className="absolute top-6 left-6 opacity-10">
            <Quote className="h-16 w-16 text-primary" />
          </div>

          {/* Avatar & Name */}
          <div className="flex items-center gap-4 mb-6 relative z-10">
            <div className="text-5xl">{currentTestimonial.avatar}</div>
            <div>
              <h4 className="font-semibold text-lg">{currentTestimonial.name}</h4>
              <Badge variant="secondary" className="mt-1">
                {currentTestimonial.condition}
              </Badge>
            </div>
          </div>

          {/* Quote */}
          <blockquote className="text-lg md:text-xl leading-relaxed mb-6 relative z-10">
            "{currentTestimonial.quote}"
          </blockquote>

          {/* Metrics */}
          <div className="flex flex-wrap gap-4 mb-8">
            <div className="bg-primary/10 rounded-lg px-4 py-2">
              <p className="text-xs text-muted-foreground mb-1">
                {currentTestimonial.metric}
              </p>
              <p className="font-bold text-primary text-lg">
                {currentTestimonial.metricValue}
              </p>
            </div>
            <div className="bg-muted rounded-lg px-4 py-2">
              <p className="text-xs text-muted-foreground mb-1">Timeframe</p>
              <p className="font-semibold text-lg">{currentTestimonial.timeframe}</p>
            </div>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-between">
            <Button
              variant="outline"
              size="icon"
              onClick={goToPrevious}
              className="rounded-full"
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>

            {/* Dots */}
            <div className="flex gap-2">
              {TESTIMONIALS.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`h-2 rounded-full transition-all ${
                    index === currentIndex
                      ? "w-8 bg-primary"
                      : "w-2 bg-muted-foreground/30 hover:bg-muted-foreground/50"
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>

            <Button
              variant="outline"
              size="icon"
              onClick={goToNext}
              className="rounded-full"
            >
              <ChevronRight className="h-5 w-5" />
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Disclaimer */}
      <p className="text-xs text-center text-muted-foreground mt-4">
        Individual results may vary. Always consult with a healthcare provider before
        starting any new diet or health program.
      </p>
    </div>
  );
}
