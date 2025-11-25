import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Download, BookOpen, Star, CheckCircle2, ExternalLink } from "lucide-react";
// Analytics tracking will be handled by the app's built-in analytics
import SEO from "@/components/SEO";

export default function Book() {
  const handleDownloadPDF = () => {
    // Track download event
    console.log("Book PDF download initiated");
    
    // Open PDF in new tab
    window.open("/ketowell-book.pdf", "_blank");
  };

  const handleAmazonPreorder = () => {
    // Track pre-order click
    console.log("Amazon pre-order link clicked");
    
    // Replace with actual Amazon link when available
    window.open("https://www.amazon.com/dp/[YOUR-ASIN]", "_blank");
  };

  return (
    <>
      <SEO
        title="KetoWell Book - Transform Your Health with Ketogenic Living"
        description="Download the comprehensive KetoWell book: 56,620 words of evidence-based ketogenic health guidance. Reverse diabetes, enhance cognition, achieve sustainable transformation. 200+ studies cited."
        keywords="ketogenic diet book, keto book, diabetes reversal, metabolic health book, evidence-based nutrition, KetoWell book"
        image="/images/ketowell-book-cover.png"
      />

      <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
        {/* Hero Section */}
        <section className="container py-16 md:py-24">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Book Cover */}
            <div className="flex justify-center">
              <div className="relative">
                <img
                  src="/images/ketowell-book-cover.png"
                  alt="KetoWell Book Cover"
                  className="w-full max-w-md rounded-lg shadow-2xl"
                />
                <div className="absolute -bottom-4 -right-4 bg-primary text-primary-foreground px-6 py-3 rounded-lg shadow-lg">
                  <p className="text-sm font-semibold">303 Pages</p>
                  <p className="text-xs opacity-90">56,620 Words</p>
                </div>
              </div>
            </div>

            {/* Book Info */}
            <div className="space-y-6">
              <div>
                <h1 className="text-4xl md:text-5xl font-bold mb-4">
                  KetoWell: Transform Your Health with the Science of Ketogenic Living
                </h1>
                <p className="text-xl text-muted-foreground mb-6">
                  Evidence-Based • AI-Powered • Sustainably Effective
                </p>
              </div>

              <p className="text-lg leading-relaxed">
                Over 800 million adults worldwide are living with diabetes. Metabolic disease has reached crisis levels. 
                Conventional dietary advice continues to fail. But there is hope.
              </p>

              <p className="text-lg leading-relaxed">
                <span className="font-semibold">KetoWell</span> presents a different approach—one grounded in rigorous science, 
                supported by AI-powered technology, and designed for long-term success.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Button
                  size="lg"
                  onClick={handleDownloadPDF}
                  className="text-lg px-8 py-6"
                >
                  <Download className="mr-2 h-5 w-5" />
                  Download Free PDF
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  onClick={handleAmazonPreorder}
                  className="text-lg px-8 py-6"
                >
                  <ExternalLink className="mr-2 h-5 w-5" />
                  Pre-Order on Amazon
                </Button>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-4 pt-6">
                <div className="text-center">
                  <p className="text-3xl font-bold text-primary">200+</p>
                  <p className="text-sm text-muted-foreground">Studies Cited</p>
                </div>
                <div className="text-center">
                  <p className="text-3xl font-bold text-primary">14</p>
                  <p className="text-sm text-muted-foreground">Chapters</p>
                </div>
                <div className="text-center">
                  <p className="text-3xl font-bold text-primary">8-10h</p>
                  <p className="text-sm text-muted-foreground">Read Time</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* What You'll Learn Section */}
        <section className="bg-muted/50 py-16">
          <div className="container">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
              What You'll Learn
            </h2>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  title: "The Science of Ketosis",
                  description: "Understand how ketogenic diets work at the cellular level and why they succeed when other approaches fail.",
                  icon: BookOpen
                },
                {
                  title: "Disease Reversal",
                  description: "53% diabetes remission rate. Learn how to reverse type 2 diabetes, metabolic syndrome, and insulin resistance.",
                  icon: CheckCircle2
                },
                {
                  title: "Brain Health",
                  description: "Discover neuroprotective benefits for Alzheimer's, Parkinson's, epilepsy, and cognitive enhancement.",
                  icon: CheckCircle2
                },
                {
                  title: "Safety Protocols",
                  description: "Comprehensive contraindication screening, medication adjustments, and medical monitoring guidelines.",
                  icon: CheckCircle2
                },
                {
                  title: "Personalized Approaches",
                  description: "Adaptations for athletes, seniors, and women with specific considerations for each population.",
                  icon: CheckCircle2
                },
                {
                  title: "Long-Term Success",
                  description: "Psychology of behavior change, habit formation (59-154 days), and sustainable lifestyle strategies.",
                  icon: CheckCircle2
                }
              ].map((item, index) => (
                <Card key={index}>
                  <CardContent className="pt-6">
                    <item.icon className="h-10 w-10 text-primary mb-4" />
                    <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                    <p className="text-muted-foreground">{item.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Book Description Section */}
        <section className="container py-16">
          <div className="max-w-4xl mx-auto space-y-8">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-8">
              About This Book
            </h2>

            <div className="prose prose-lg max-w-none">
              <p>
                Drawing on over 200 peer-reviewed studies, this comprehensive guide reveals how ketogenic diets can 
                reverse type 2 diabetes, enhance cognitive function, optimize athletic performance, and restore metabolic health.
              </p>

              <p>
                Unlike traditional diet books that leave you alone after you finish reading, <strong>KetoWell</strong> integrates 
                seamlessly with the KetoWell app, providing ongoing support through Dr. Ketone—your AI health agent—who guides 
                you through every challenge, monitors for complications, and helps you build sustainable habits that last.
              </p>

              <h3 className="text-2xl font-bold mt-8 mb-4">What Makes KetoWell Different</h3>

              <ul className="space-y-3">
                <li className="flex items-start">
                  <Star className="h-5 w-5 text-primary mr-2 mt-1 flex-shrink-0" />
                  <span><strong>Evidence-Based:</strong> Every claim supported by peer-reviewed research with effect sizes and confidence intervals</span>
                </li>
                <li className="flex items-start">
                  <Star className="h-5 w-5 text-primary mr-2 mt-1 flex-shrink-0" />
                  <span><strong>Safety-First:</strong> Detailed contraindications and medical monitoring protocols</span>
                </li>
                <li className="flex items-start">
                  <Star className="h-5 w-5 text-primary mr-2 mt-1 flex-shrink-0" />
                  <span><strong>AI-Powered Support:</strong> Integration with KetoWell app for ongoing guidance</span>
                </li>
                <li className="flex items-start">
                  <Star className="h-5 w-5 text-primary mr-2 mt-1 flex-shrink-0" />
                  <span><strong>Honest & Realistic:</strong> Acknowledges challenges and sets appropriate expectations</span>
                </li>
                <li className="flex items-start">
                  <Star className="h-5 w-5 text-primary mr-2 mt-1 flex-shrink-0" />
                  <span><strong>Comprehensive:</strong> Covers science, implementation, disease applications, and sustainability</span>
                </li>
                <li className="flex items-start">
                  <Star className="h-5 w-5 text-primary mr-2 mt-1 flex-shrink-0" />
                  <span><strong>Long-Term Focus:</strong> Designed for permanent lifestyle change, not temporary dieting</span>
                </li>
              </ul>

              <h3 className="text-2xl font-bold mt-8 mb-4">This Book Is For:</h3>

              <ul className="space-y-2">
                <li>• People with type 2 diabetes, prediabetes, or metabolic syndrome</li>
                <li>• Anyone struggling with conventional weight loss approaches</li>
                <li>• Athletes seeking metabolic optimization</li>
                <li>• Those concerned about cognitive decline and brain health</li>
                <li>• Healthcare providers supporting patients with ketogenic diets</li>
                <li>• Anyone seeking evidence-based nutrition guidance</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Table of Contents Preview */}
        <section className="bg-muted/50 py-16">
          <div className="container max-w-4xl">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
              Table of Contents
            </h2>

            <div className="space-y-4">
              {[
                { title: "Preface: Why This Book Exists", pages: "1,891 words" },
                { title: "Introduction: The Metabolic Health Crisis", pages: "3,187 words" },
                { title: "Part I: The Science of Ketogenic Health", pages: "2 chapters" },
                { title: "Part II: Getting Started Safely", pages: "2 chapters" },
                { title: "Part III: Therapeutic Applications", pages: "4 chapters" },
                { title: "Part IV: Special Populations", pages: "1 chapter" },
                { title: "Part V: Making It Last", pages: "2 chapters" },
                { title: "Conclusion: Your Transformation Awaits", pages: "3,247 words" },
                { title: "Appendices & References", pages: "9 appendices" }
              ].map((item, index) => (
                <div
                  key={index}
                  className="flex justify-between items-center p-4 bg-background rounded-lg border"
                >
                  <span className="font-medium">{item.title}</span>
                  <span className="text-muted-foreground text-sm">{item.pages}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="container py-16">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
              Frequently Asked Questions
            </h2>

            <Accordion type="single" collapsible className="space-y-4">
              <AccordionItem value="item-1">
                <AccordionTrigger className="text-left">
                  Is the PDF version really free?
                </AccordionTrigger>
                <AccordionContent>
                  Yes! We offer the complete PDF version for free download. You can also purchase the book on Amazon 
                  in Kindle or paperback format if you prefer those formats.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-2">
                <AccordionTrigger className="text-left">
                  Do I need the KetoWell app to use this book?
                </AccordionTrigger>
                <AccordionContent>
                  No, the book stands alone as a comprehensive guide to ketogenic health. However, the KetoWell app 
                  provides AI-powered support, personalized guidance, and medical monitoring that significantly enhance 
                  your success rate. The book explains the science; the app provides the ongoing support.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-3">
                <AccordionTrigger className="text-left">
                  Is this book suitable for beginners?
                </AccordionTrigger>
                <AccordionContent>
                  Absolutely! The book is designed for both beginners and experienced keto practitioners. It starts with 
                  foundational science and progresses to advanced topics. Chapter 3 provides a detailed 30-day getting 
                  started guide specifically for beginners.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-4">
                <AccordionTrigger className="text-left">
                  Are there contraindications I should know about?
                </AccordionTrigger>
                <AccordionContent>
                  Yes, and this is covered extensively in Chapter 4. Ketogenic diets are not appropriate for everyone. 
                  People taking SGLT2 inhibitors, those with a history of eating disorders, pregnant women, and certain 
                  other populations should not attempt ketogenic diets without medical supervision. The book provides 
                  comprehensive safety protocols.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-5">
                <AccordionTrigger className="text-left">
                  How is this different from other keto books?
                </AccordionTrigger>
                <AccordionContent>
                  KetoWell is unique in several ways: (1) Every claim is supported by peer-reviewed research with specific 
                  studies cited, (2) Safety-first approach with detailed contraindications, (3) Integration with AI-powered 
                  app for ongoing support, (4) Honest about challenges and realistic expectations, (5) Focus on long-term 
                  sustainability rather than quick fixes, (6) Comprehensive coverage of therapeutic applications beyond weight loss.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-6">
                <AccordionTrigger className="text-left">
                  When will the book be available on Amazon?
                </AccordionTrigger>
                <AccordionContent>
                  The book is currently available for pre-order on Amazon. The official release date is [INSERT DATE]. 
                  You can download the free PDF version immediately while you wait for the Amazon release.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </section>

        {/* Final CTA Section */}
        <section className="container py-16">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <h2 className="text-3xl md:text-4xl font-bold">
              Ready to Transform Your Health?
            </h2>
            <p className="text-xl text-muted-foreground">
              Download the complete KetoWell book for free and begin your journey to metabolic health today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                onClick={handleDownloadPDF}
                className="text-lg px-8 py-6"
              >
                <Download className="mr-2 h-5 w-5" />
                Download Free PDF
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={handleAmazonPreorder}
                className="text-lg px-8 py-6"
              >
                <ExternalLink className="mr-2 h-5 w-5" />
                Pre-Order on Amazon
              </Button>
            </div>
            <p className="text-sm text-muted-foreground pt-4">
              56,620 words • 303 pages • 200+ studies cited • Evidence-based • AI-powered support
            </p>
          </div>
        </section>
      </div>
    </>
  );
}
