import { Card } from "@/components/ui/card";
import { Activity } from "lucide-react";
import { APP_TITLE } from "@/const";
import SEO from "@/components/SEO";

export default function TermsOfService() {
  const lastUpdated = "January 24, 2025";

  return (
    <div className="min-h-screen flex flex-col">
      <SEO
        title="Terms of Service"
        description="KetoWell Terms of Service - Read our terms and conditions, medical disclaimers, and user responsibilities for using our ketogenic diet app."
        keywords="terms of service, terms and conditions, user agreement, medical disclaimer, liability"
        url="/terms-of-service"
      />

      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <a href="/" className="flex items-center gap-2">
            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gradient-hero">
              <Activity className="w-6 h-6 text-white" />
            </div>
            <span className="font-bold text-xl">{APP_TITLE}</span>
          </a>
        </div>
      </header>

      <main className="flex-1 py-16">
        <div className="container max-w-4xl">
          <div className="space-y-8">
            <div>
              <h1 className="text-4xl font-bold mb-4">Terms of Service</h1>
              <p className="text-muted-foreground">
                Last Updated: {lastUpdated}
              </p>
            </div>

            <Card className="p-8 space-y-8">
              <section>
                <h2 className="text-2xl font-semibold mb-4">1. Acceptance of Terms</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Welcome to {APP_TITLE}. These Terms of Service ("Terms") govern your access to and use of our mobile application, website, and related services (collectively, the "Service"). By accessing or using the Service, you agree to be bound by these Terms and our Privacy Policy.
                </p>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  If you do not agree to these Terms, you may not access or use the Service. We reserve the right to modify these Terms at any time, and your continued use of the Service after such modifications constitutes your acceptance of the updated Terms.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  <strong>IMPORTANT:</strong> These Terms contain an arbitration clause and class action waiver that affect your legal rights. Please read Section 14 carefully.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">2. Medical Disclaimer</h2>
                <div className="bg-destructive/10 border-l-4 border-destructive p-4 mb-4">
                  <p className="font-semibold text-destructive mb-2">CRITICAL MEDICAL DISCLAIMER</p>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {APP_TITLE} IS NOT A SUBSTITUTE FOR PROFESSIONAL MEDICAL ADVICE, DIAGNOSIS, OR TREATMENT. THE SERVICE IS DESIGNED FOR INFORMATIONAL AND EDUCATIONAL PURPOSES ONLY.
                  </p>
                </div>

                <h3 className="text-xl font-semibold mb-3 mt-6">2.1 Not Medical Advice</h3>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  The information provided through the Service, including guidance from our AI assistant "Dr. Ketone," is not intended to be a substitute for professional medical advice, diagnosis, or treatment. Always seek the advice of your physician or other qualified health provider with any questions you may have regarding a medical condition or dietary changes.
                </p>

                <h3 className="text-xl font-semibold mb-3 mt-6">2.2 No Doctor-Patient Relationship</h3>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Use of the Service does not create a doctor-patient relationship between you and {APP_TITLE}, our employees, or our AI system. Dr. Ketone is an artificial intelligence tool designed to provide evidence-based information and personalized guidance, but it is not a licensed healthcare professional and cannot replace medical supervision.
                </p>

                <h3 className="text-xl font-semibold mb-3 mt-6">2.3 Consult Your Healthcare Provider</h3>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Before starting a ketogenic diet or making any significant dietary changes, you must consult with a qualified healthcare provider, especially if you:
                </p>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                  <li>Have any pre-existing medical conditions (diabetes, heart disease, kidney disease, etc.)</li>
                  <li>Are taking any medications, particularly SGLT2 inhibitors, insulin, or blood pressure medications</li>
                  <li>Are pregnant, nursing, or planning to become pregnant</li>
                  <li>Are under 18 years of age</li>
                  <li>Have a history of eating disorders</li>
                </ul>

                <h3 className="text-xl font-semibold mb-3 mt-6">2.4 Emergency Situations</h3>
                <p className="text-muted-foreground leading-relaxed">
                  If you experience a medical emergency, including but not limited to symptoms of diabetic ketoacidosis (excessive thirst, frequent urination, nausea, vomiting, abdominal pain, confusion), call emergency services immediately. Do not rely on the Service for emergency medical assistance.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">3. Service Description</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  {APP_TITLE} provides a comprehensive ketogenic diet management platform that includes:
                </p>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                  <li>Medical contraindication screening and safety assessments</li>
                  <li>AI-powered dietary guidance and meal planning through Dr. Ketone</li>
                  <li>Macro tracking and nutritional analysis</li>
                  <li>Symptom monitoring and side effect management</li>
                  <li>Educational resources based on peer-reviewed research</li>
                  <li>Optional integration with healthcare provider portals (Clinical tier)</li>
                </ul>
                <p className="text-muted-foreground leading-relaxed mt-4">
                  We reserve the right to modify, suspend, or discontinue any aspect of the Service at any time, with or without notice.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">4. User Accounts and Eligibility</h2>

                <h3 className="text-xl font-semibold mb-3 mt-6">4.1 Account Creation</h3>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  To use certain features of the Service, you must create an account. You agree to provide accurate, current, and complete information during registration and to update such information to keep it accurate, current, and complete.
                </p>

                <h3 className="text-xl font-semibold mb-3 mt-6">4.2 Eligibility</h3>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  You must be at least 18 years old to create an account and use the Service independently. Users between 13 and 18 years old may use the Service only with the involvement and consent of a parent or legal guardian, and under the supervision of a qualified healthcare provider.
                </p>

                <h3 className="text-xl font-semibold mb-3 mt-6">4.3 Account Security</h3>
                <p className="text-muted-foreground leading-relaxed">
                  You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account. You agree to notify us immediately of any unauthorized access or use of your account.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">5. User Responsibilities</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  By using the Service, you agree to:
                </p>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                  <li>Provide accurate and truthful health information during safety screenings</li>
                  <li>Use the Service only for lawful purposes and in accordance with these Terms</li>
                  <li>Not misrepresent your identity or impersonate others</li>
                  <li>Not attempt to gain unauthorized access to the Service or other users' accounts</li>
                  <li>Not use the Service to transmit viruses, malware, or other harmful code</li>
                  <li>Not reverse engineer, decompile, or disassemble any aspect of the Service</li>
                  <li>Not scrape, data mine, or use automated tools to access the Service without permission</li>
                  <li>Comply with all applicable laws and regulations</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">6. Prohibited Uses</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  You may not use the Service to:
                </p>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                  <li>Diagnose, treat, cure, or prevent any disease or medical condition</li>
                  <li>Provide medical advice to others</li>
                  <li>Share your account with others or allow others to use your account</li>
                  <li>Post or transmit any content that is unlawful, harmful, threatening, abusive, harassing, defamatory, vulgar, obscene, or otherwise objectionable</li>
                  <li>Violate any applicable laws or regulations</li>
                  <li>Infringe upon the intellectual property rights of {APP_TITLE} or any third party</li>
                  <li>Interfere with or disrupt the Service or servers or networks connected to the Service</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">7. Subscription and Payment</h2>

                <h3 className="text-xl font-semibold mb-3 mt-6">7.1 Subscription Plans</h3>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  {APP_TITLE} offers multiple subscription tiers: Free, Premium, and Clinical. Subscription fees are billed in advance on a monthly or annual basis and are non-refundable except as required by law.
                </p>

                <h3 className="text-xl font-semibold mb-3 mt-6">7.2 Automatic Renewal</h3>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Your subscription will automatically renew at the end of each billing period unless you cancel before the renewal date. You can cancel your subscription at any time through your account settings.
                </p>

                <h3 className="text-xl font-semibold mb-3 mt-6">7.3 Price Changes</h3>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  We reserve the right to change our subscription fees at any time. We will provide you with advance notice of any price changes, and the new price will apply to your next billing cycle after the notice period.
                </p>

                <h3 className="text-xl font-semibold mb-3 mt-6">7.4 Refund Policy</h3>
                <p className="text-muted-foreground leading-relaxed">
                  All subscription fees are non-refundable, except where required by applicable law. If you believe you were charged in error, please contact us at <a href="mailto:support@ketowell.com" className="text-primary hover:underline">support@ketowell.com</a> within 30 days of the charge.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">8. Intellectual Property Rights</h2>

                <h3 className="text-xl font-semibold mb-3 mt-6">8.1 Ownership</h3>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  The Service and its entire contents, features, and functionality (including but not limited to all information, software, text, displays, images, video, audio, and the design, selection, and arrangement thereof) are owned by {APP_TITLE}, its licensors, or other providers of such material and are protected by United States and international copyright, trademark, patent, trade secret, and other intellectual property laws.
                </p>

                <h3 className="text-xl font-semibold mb-3 mt-6">8.2 Limited License</h3>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Subject to your compliance with these Terms, we grant you a limited, non-exclusive, non-transferable, non-sublicensable license to access and use the Service for your personal, non-commercial use.
                </p>

                <h3 className="text-xl font-semibold mb-3 mt-6">8.3 Restrictions</h3>
                <p className="text-muted-foreground leading-relaxed">
                  You may not reproduce, distribute, modify, create derivative works of, publicly display, publicly perform, republish, download, store, or transmit any of the material on our Service, except as incidental to normal use of the Service or as expressly permitted in these Terms.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">9. User-Generated Content</h2>

                <h3 className="text-xl font-semibold mb-3 mt-6">9.1 Your Content</h3>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  You retain ownership of any content you submit to the Service, including meal logs, symptom reports, and other health data ("User Content"). By submitting User Content, you grant us a worldwide, non-exclusive, royalty-free license to use, reproduce, modify, and display such content solely for the purpose of providing and improving the Service.
                </p>

                <h3 className="text-xl font-semibold mb-3 mt-6">9.2 De-identified Data</h3>
                <p className="text-muted-foreground leading-relaxed">
                  We may use de-identified and aggregated data derived from your User Content for research, analytics, and service improvement purposes. De-identified data cannot be traced back to you and is not considered personal information.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">10. Third-Party Links and Services</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  The Service may contain links to third-party websites, applications, or services that are not owned or controlled by {APP_TITLE}. We have no control over, and assume no responsibility for, the content, privacy policies, or practices of any third-party websites or services.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  You acknowledge and agree that {APP_TITLE} shall not be responsible or liable, directly or indirectly, for any damage or loss caused or alleged to be caused by or in connection with the use of or reliance on any such third-party content, goods, or services.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">11. Limitation of Liability</h2>
                <div className="bg-destructive/10 border-l-4 border-destructive p-4 mb-4">
                  <p className="font-semibold text-destructive mb-2">IMPORTANT LEGAL NOTICE</p>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW, IN NO EVENT SHALL {APP_TITLE.toUpperCase()}, ITS AFFILIATES, OFFICERS, DIRECTORS, EMPLOYEES, AGENTS, OR LICENSORS BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, INCLUDING BUT NOT LIMITED TO LOSS OF PROFITS, DATA, USE, GOODWILL, OR OTHER INTANGIBLE LOSSES, RESULTING FROM:
                  </p>
                </div>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                  <li>Your access to or use of or inability to access or use the Service</li>
                  <li>Any conduct or content of any third party on the Service</li>
                  <li>Any content obtained from the Service</li>
                  <li>Unauthorized access, use, or alteration of your transmissions or content</li>
                  <li>Any health outcomes, adverse effects, or complications arising from following dietary guidance provided through the Service</li>
                </ul>
                <p className="text-muted-foreground leading-relaxed mt-4">
                  Our total liability to you for all claims arising out of or relating to these Terms or the Service shall not exceed the amount you paid to us in the twelve (12) months preceding the claim, or $100, whichever is greater.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">12. Disclaimer of Warranties</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  THE SERVICE IS PROVIDED ON AN "AS IS" AND "AS AVAILABLE" BASIS WITHOUT WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, NON-INFRINGEMENT, OR COURSE OF PERFORMANCE.
                </p>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  {APP_TITLE} DOES NOT WARRANT THAT:
                </p>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                  <li>The Service will function uninterrupted, secure, or error-free</li>
                  <li>Defects will be corrected</li>
                  <li>The Service is free of viruses or other harmful components</li>
                  <li>The results of using the Service will meet your requirements or expectations</li>
                  <li>The accuracy, reliability, or completeness of any content or information provided through the Service</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">13. Indemnification</h2>
                <p className="text-muted-foreground leading-relaxed">
                  You agree to defend, indemnify, and hold harmless {APP_TITLE}, its affiliates, licensors, and service providers, and its and their respective officers, directors, employees, contractors, agents, licensors, suppliers, successors, and assigns from and against any claims, liabilities, damages, judgments, awards, losses, costs, expenses, or fees (including reasonable attorneys' fees) arising out of or relating to your violation of these Terms or your use of the Service.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">14. Dispute Resolution and Arbitration</h2>

                <h3 className="text-xl font-semibold mb-3 mt-6">14.1 Informal Resolution</h3>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Before filing a claim, you agree to try to resolve the dispute informally by contacting us at <a href="mailto:legal@ketowell.com" className="text-primary hover:underline">legal@ketowell.com</a>. We will attempt to resolve the dispute informally within 60 days.
                </p>

                <h3 className="text-xl font-semibold mb-3 mt-6">14.2 Binding Arbitration</h3>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  If we cannot resolve the dispute informally, any dispute arising out of or relating to these Terms or the Service will be resolved through binding arbitration in accordance with the American Arbitration Association's Consumer Arbitration Rules. The arbitration will be conducted in [Your State], and judgment on the arbitration award may be entered in any court having jurisdiction.
                </p>

                <h3 className="text-xl font-semibold mb-3 mt-6">14.3 Class Action Waiver</h3>
                <p className="text-muted-foreground leading-relaxed">
                  YOU AND {APP_TITLE} AGREE THAT EACH MAY BRING CLAIMS AGAINST THE OTHER ONLY IN YOUR OR ITS INDIVIDUAL CAPACITY AND NOT AS A PLAINTIFF OR CLASS MEMBER IN ANY PURPORTED CLASS OR REPRESENTATIVE PROCEEDING.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">15. Termination</h2>

                <h3 className="text-xl font-semibold mb-3 mt-6">15.1 Termination by You</h3>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  You may terminate your account at any time by contacting us or using the account deletion feature in the app. Upon termination, your right to use the Service will immediately cease.
                </p>

                <h3 className="text-xl font-semibold mb-3 mt-6">15.2 Termination by Us</h3>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  We may terminate or suspend your account and access to the Service immediately, without prior notice or liability, for any reason, including but not limited to:
                </p>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                  <li>Breach of these Terms</li>
                  <li>Fraudulent, abusive, or illegal activity</li>
                  <li>Request by law enforcement or government agencies</li>
                  <li>Discontinuation or material modification of the Service</li>
                </ul>

                <h3 className="text-xl font-semibold mb-3 mt-6">15.3 Effect of Termination</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Upon termination, all provisions of these Terms that by their nature should survive termination shall survive, including but not limited to ownership provisions, warranty disclaimers, indemnity, and limitations of liability.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">16. Governing Law</h2>
                <p className="text-muted-foreground leading-relaxed">
                  These Terms shall be governed by and construed in accordance with the laws of the State of [Your State], without regard to its conflict of law provisions. Our failure to enforce any right or provision of these Terms will not be considered a waiver of those rights.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">17. Changes to Terms</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  We reserve the right to modify or replace these Terms at any time at our sole discretion. If a revision is material, we will provide at least 30 days' notice prior to any new terms taking effect. What constitutes a material change will be determined at our sole discretion.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  By continuing to access or use our Service after any revisions become effective, you agree to be bound by the revised terms. If you do not agree to the new terms, you must stop using the Service.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">18. Severability</h2>
                <p className="text-muted-foreground leading-relaxed">
                  If any provision of these Terms is held to be invalid or unenforceable by a court, the remaining provisions of these Terms will remain in effect. These Terms constitute the entire agreement between us regarding our Service and supersede and replace any prior agreements we might have had between us regarding the Service.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">19. Contact Information</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  If you have any questions about these Terms, please contact us:
                </p>
                <div className="space-y-2 text-muted-foreground">
                  <p><strong>Email:</strong> <a href="mailto:legal@ketowell.com" className="text-primary hover:underline">legal@ketowell.com</a></p>
                  <p><strong>Support:</strong> <a href="mailto:support@ketowell.com" className="text-primary hover:underline">support@ketowell.com</a></p>
                  <p><strong>Mailing Address:</strong><br />
                  {APP_TITLE} Legal Department<br />
                  [Your Company Address]<br />
                  [City, State, ZIP Code]</p>
                </div>
              </section>

              <section className="border-t pt-6">
                <p className="text-sm text-muted-foreground italic">
                  These Terms of Service were last updated on {lastUpdated}. By using {APP_TITLE} after this date, you acknowledge that you have read, understood, and agree to be bound by these Terms.
                </p>
              </section>
            </Card>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t py-8 bg-muted/30">
        <div className="container">
          <div className="text-center text-sm text-muted-foreground">
            <p>© 2025 {APP_TITLE}. All rights reserved.</p>
            <div className="mt-2 space-x-4">
              <a href="/privacy-policy" className="hover:text-primary transition-colors">
                Privacy Policy
              </a>
              <a href="/terms-of-service" className="hover:text-primary transition-colors">
                Terms of Service
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
