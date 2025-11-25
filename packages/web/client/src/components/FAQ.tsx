import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { trackCustomEvent } from "@/lib/analytics";

interface FAQItem {
  question: string;
  answer: string;
  category: string;
}

const faqData: FAQItem[] = [
  // Getting Started
  {
    category: "Getting Started",
    question: "What is a ketogenic diet?",
    answer: "A ketogenic diet is a high-fat, moderate-protein, and very low-carbohydrate eating pattern that shifts your body's metabolism from burning glucose to burning ketones for energy. Typically, this means consuming 70-80% of calories from healthy fats, 15-20% from protein, and only 5-10% from carbohydrates (usually 20-50g net carbs per day). This metabolic state, called ketosis, has been shown to provide numerous health benefits including improved blood sugar control, weight loss, enhanced mental clarity, and therapeutic effects for certain neurological conditions."
  },
  {
    category: "Getting Started",
    question: "How do I start a ketogenic diet safely?",
    answer: "Starting a ketogenic diet safely requires several important steps: First, consult with your healthcare provider, especially if you have any medical conditions or take medications. Second, complete KetoWell's comprehensive contraindication screening to identify any potential risks. Third, educate yourself about proper macronutrient ratios and food choices. Fourth, plan for the transition period (keto flu) by ensuring adequate electrolyte intake. Fifth, start gradually by reducing carbohydrates over 1-2 weeks rather than abruptly. Dr. Ketone guides you through each of these steps with personalized recommendations based on your health profile."
  },
  {
    category: "Getting Started",
    question: "What foods can I eat on a ketogenic diet?",
    answer: "On a ketogenic diet, you can enjoy a wide variety of whole foods including: healthy fats (avocados, olive oil, coconut oil, butter, nuts, seeds), quality proteins (grass-fed meat, wild-caught fish, pasture-raised eggs, poultry), low-carb vegetables (leafy greens, broccoli, cauliflower, zucchini, peppers), full-fat dairy (cheese, heavy cream, Greek yogurt), and low-sugar berries in moderation. Foods to avoid include grains, sugar, most fruits, starchy vegetables, legumes, and processed foods. KetoWell's meal logging feature automatically calculates macros and provides instant feedback on whether foods fit your ketogenic goals."
  },
  {
    category: "Getting Started",
    question: "How long does it take to see results?",
    answer: "Results vary by individual and depend on your specific goals. Most people enter ketosis within 2-4 days of restricting carbohydrates below 50g per day. Initial weight loss (primarily water weight) typically occurs within the first week. Fat adaptation, where your body becomes efficient at burning fat for fuel, usually takes 3-4 weeks. Significant health improvements like better blood sugar control, reduced inflammation, and increased energy often become noticeable within 4-8 weeks. For therapeutic applications (epilepsy, neurological conditions), benefits may take 3-6 months to fully manifest. KetoWell tracks your progress with detailed metrics and helps you stay motivated through the habit formation period."
  },
  
  // Safety
  {
    category: "Safety",
    question: "Is the ketogenic diet safe for me?",
    answer: "The ketogenic diet is safe for most healthy adults, but it's not appropriate for everyone. KetoWell includes a comprehensive medical screening that checks for absolute contraindications (rare genetic disorders affecting fat metabolism, active pancreatitis, severe liver failure) and conditions requiring medical supervision (type 1 diabetes, chronic kidney disease, pregnancy, eating disorder history). The diet has been used therapeutically for over 100 years, with extensive research supporting its safety when properly implemented. However, individual responses vary, which is why we emphasize medical consultation and continuous monitoring through Dr. Ketone's safety alerts."
  },
  {
    category: "Safety",
    question: "What are the side effects, and how do I manage them?",
    answer: "The most common side effect is 'keto flu' during the first 1-2 weeks, which includes fatigue, headaches, irritability, and brain fog. This is caused by electrolyte imbalances and carbohydrate withdrawal, not actual ketosis. Management strategies include: increasing sodium intake (3-5g/day), supplementing magnesium and potassium, staying well-hydrated, and gradually reducing carbohydrates. Other potential side effects include temporary digestive changes, bad breath (from acetone), and muscle cramps. Dr. Ketone proactively monitors your symptoms and provides evidence-based interventions, including our proprietary electrolyte protocol that reduces keto flu severity by up to 70%."
  },
  {
    category: "Safety",
    question: "Do I need to consult a doctor before starting?",
    answer: "Yes, we strongly recommend consulting a healthcare provider before starting a ketogenic diet, especially if you have any pre-existing medical conditions, take medications, are pregnant or nursing, or are under 18. This is particularly critical if you take SGLT2 inhibitors (diabetes medications like Jardiance, Farxiga, Invokana), insulin, blood pressure medications, or have a history of kidney disease, heart disease, or eating disorders. KetoWell's Clinical tier includes provider portal integration, allowing your doctor to monitor your progress and adjust medications as needed. Even if you're healthy, a baseline health assessment helps establish your starting point and track improvements."
  },
  {
    category: "Safety",
    question: "What is ketoacidosis, and should I be worried?",
    answer: "Ketoacidosis (diabetic ketoacidosis or DKA) is a dangerous medical condition where ketone levels become extremely high (>10 mmol/L) and blood becomes acidic. This is completely different from nutritional ketosis (0.5-3 mmol/L), which is safe and beneficial. DKA almost exclusively occurs in people with type 1 diabetes who lack sufficient insulin, or rarely in type 2 diabetics taking SGLT2 inhibitors during illness or dehydration. For people without diabetes or those not on SGLT2 inhibitors, ketoacidosis is extremely rare. KetoWell's safety screening specifically identifies SGLT2 inhibitor use and provides targeted warnings. Dr. Ketone monitors for early warning signs and alerts you to seek immediate medical attention if concerning symptoms develop."
  },
  
  // App Features
  {
    category: "App Features",
    question: "How does Dr. Ketone work?",
    answer: "Dr. Ketone is an AI-powered health assistant built on advanced language models and trained on peer-reviewed ketogenic diet research. It functions as your 24/7 companion throughout your ketogenic journey, providing: (1) Proactive check-ins based on your phase (daily during weeks 1-4, then gradually reducing), (2) Real-time meal analysis with automatic macro calculations, (3) Symptom assessment and evidence-based interventions, (4) Predictive insights that anticipate challenges before they occur, (5) Personalized education tailored to your health profile, and (6) Behavioral coaching using Self-Determination Theory principles. Unlike generic chatbots, Dr. Ketone understands context, remembers your history, and adapts its guidance based on your progress and responses."
  },
  {
    category: "App Features",
    question: "What makes KetoWell different from other keto apps?",
    answer: "KetoWell is the only ketogenic diet app that prioritizes medical safety and evidence-based practice: (1) Mandatory contraindication screening before diet initiation (most apps skip this entirely), (2) SGLT2 inhibitor detection and ketoacidosis risk assessment, (3) AI-native design with Dr. Ketone as an autonomous agent (not just a macro tracker with a chatbot), (4) 66-day habit formation framework based on neuroscience research, (5) Provider portal integration for medical supervision (Clinical tier), (6) Evidence strength transparency - every recommendation is backed by peer-reviewed research with confidence levels displayed, and (7) Proactive intervention rather than reactive tracking. We're not just helping you track macros; we're helping you safely transform your health with medical-grade support."
  },
  {
    category: "App Features",
    question: "What's included in each subscription tier?",
    answer: "FREE tier includes: Basic meal logging, macro tracking, educational content, and limited Dr. Ketone interactions (10/month). PREMIUM tier ($9.99/mo) includes: Unlimited Dr. Ketone conversations, advanced analytics with trend predictions, personalized meal plans, symptom tracking with intervention recommendations, priority support, and ad-free experience. CLINICAL tier ($19.99/mo) includes everything in Premium plus: Provider portal integration for medical supervision, HIPAA-compliant data sharing, medication tracking with interaction alerts, lab result integration, and priority medical review. All tiers include the mandatory safety screening and basic contraindication detection."
  },
  {
    category: "App Features",
    question: "Can my doctor access my data?",
    answer: "Yes, with the Clinical tier subscription and your explicit authorization. KetoWell's provider portal allows your healthcare team to: (1) View your meal logs, macro trends, and symptom reports, (2) Monitor your progress with automated summaries, (3) Receive alerts for concerning patterns (rapid weight loss, persistent symptoms, medication interactions), (4) Adjust your care plan and communicate recommendations through Dr. Ketone, and (5) Access evidence summaries for clinical decision-making. All data sharing is HIPAA-compliant, encrypted, and requires your active consent. You can revoke access at any time. This integration enables true medical supervision of your ketogenic diet, which significantly improves safety and outcomes."
  },
  
  // Medical
  {
    category: "Medical",
    question: "Can I do keto if I have type 2 diabetes?",
    answer: "Yes, the ketogenic diet can be highly effective for type 2 diabetes management, with research showing significant improvements in HbA1c (average reduction of 0.9-1.5%), fasting glucose, and insulin sensitivity. Many people reduce or eliminate diabetes medications under medical supervision. However, this requires close monitoring because: (1) Blood sugar can drop rapidly, requiring medication adjustments, (2) If you take SGLT2 inhibitors, there's an increased ketoacidosis risk that requires special precautions, (3) Insulin doses must be carefully titrated to prevent hypoglycemia. KetoWell's Clinical tier is specifically designed for this scenario, with provider integration and medication tracking. Dr. Ketone monitors your blood glucose trends and alerts both you and your provider when medication adjustments may be needed."
  },
  {
    category: "Medical",
    question: "What if I'm taking medications?",
    answer: "Many medications require dose adjustments when starting a ketogenic diet due to rapid improvements in underlying conditions. Critical medications to monitor include: (1) Diabetes medications (insulin, sulfonylureas, SGLT2 inhibitors) - may need dose reductions to prevent hypoglycemia or ketoacidosis, (2) Blood pressure medications - keto often lowers blood pressure, requiring dose adjustments, (3) Diuretics - can exacerbate electrolyte imbalances, (4) Warfarin - vitamin K intake from vegetables may affect INR levels. KetoWell's medication tracking feature identifies potential interactions and provides specific monitoring recommendations. We strongly recommend working with your healthcare provider (ideally through our Clinical tier) to safely adjust medications as your health improves."
  },
  {
    category: "Medical",
    question: "Are there any absolute contraindications?",
    answer: "Yes, there are rare but serious contraindications where ketogenic diet is not safe: (1) Primary carnitine deficiency, (2) Carnitine palmitoyltransferase (CPT) I or II deficiency, (3) Carnitine translocase deficiency, (4) Porphyria, (5) Pyruvate kinase deficiency, (6) Active acute pancreatitis, (7) Severe liver failure, and (8) Fat malabsorption disorders. These are genetic or severe medical conditions that prevent safe fat metabolism. KetoWell's initial screening specifically checks for these conditions and will prevent app usage if detected. Additionally, pregnancy, active eating disorders, and age under 13 are strong relative contraindications requiring specialized medical supervision that goes beyond our app's scope."
  },
  {
    category: "Medical",
    question: "How does KetoWell ensure my health data is secure?",
    answer: "KetoWell implements comprehensive security measures to protect your Protected Health Information (PHI): (1) End-to-end encryption for all data transmission (TLS 1.3), (2) AES-256 encryption for data at rest, (3) Multi-factor authentication for account access, (4) HIPAA-compliant infrastructure with Business Associate Agreements for all vendors, (5) Regular security audits and penetration testing, (6) Zero-knowledge architecture where possible (we can't access your data without your credentials), (7) Automatic session timeouts and device management, and (8) Granular privacy controls allowing you to choose what data is shared with providers. We never sell your data to third parties. For detailed information, see our Privacy Policy."
  }
];

export default function FAQ() {
  const handleAccordionChange = (value: string) => {
    if (value) {
      const question = faqData.find((_, index) => `item-${index}` === value)?.question;
      if (question) {
        trackCustomEvent("faq_question_opened", {
          question: question,
          category: faqData.find((_, index) => `item-${index}` === value)?.category
        });
      }
    }
  };

  // Group FAQs by category
  const categories = Array.from(new Set(faqData.map(item => item.category)));

  return (
    <section className="py-24 bg-muted/30">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Everything you need to know about the ketogenic diet and KetoWell
          </p>
        </div>

        <div className="max-w-4xl mx-auto space-y-12">
          {categories.map((category) => (
            <div key={category}>
              <h3 className="text-2xl font-semibold mb-6 text-primary">
                {category}
              </h3>
              <Accordion
                type="single"
                collapsible
                className="space-y-4"
                onValueChange={handleAccordionChange}
              >
                {faqData
                  .filter((item) => item.category === category)
                  .map((item, index) => {
                    const itemId = `item-${faqData.indexOf(item)}`;
                    return (
                      <AccordionItem
                        key={itemId}
                        value={itemId}
                        className="bg-background border rounded-lg px-6"
                      >
                        <AccordionTrigger className="text-left hover:no-underline py-6">
                          <span className="font-semibold text-lg">
                            {item.question}
                          </span>
                        </AccordionTrigger>
                        <AccordionContent className="text-muted-foreground leading-relaxed pb-6">
                          {item.answer}
                        </AccordionContent>
                      </AccordionItem>
                    );
                  })}
              </Accordion>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-muted-foreground mb-4">
            Still have questions? We're here to help.
          </p>
          <a
            href="mailto:support@ketowell.com"
            className="text-primary hover:underline font-semibold"
          >
            Contact Support →
          </a>
        </div>
      </div>
    </section>
  );
}
