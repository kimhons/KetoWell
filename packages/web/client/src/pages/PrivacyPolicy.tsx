import { Card } from "@/components/ui/card";
import { Activity } from "lucide-react";
import { APP_TITLE } from "@/const";
import SEO from "@/components/SEO";

export default function PrivacyPolicy() {
  const lastUpdated = "January 24, 2025";

  return (
    <div className="min-h-screen flex flex-col">
      <SEO
        title="Privacy Policy"
        description="KetoWell Privacy Policy - Learn how we collect, use, and protect your personal health information in compliance with HIPAA, GDPR, and CCPA regulations."
        keywords="privacy policy, data protection, HIPAA compliance, GDPR, CCPA, health data privacy"
        url="/privacy-policy"
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
              <h1 className="text-4xl font-bold mb-4">Privacy Policy</h1>
              <p className="text-muted-foreground">
                Last Updated: {lastUpdated}
              </p>
            </div>

            <Card className="p-8 space-y-8">
              <section>
                <h2 className="text-2xl font-semibold mb-4">1. Introduction</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Welcome to {APP_TITLE} ("we," "our," or "us"). We are committed to protecting your privacy and ensuring the security of your personal health information. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our mobile application and website (collectively, the "Service").
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  By using {APP_TITLE}, you agree to the collection and use of information in accordance with this policy. If you do not agree with our policies and practices, please do not use our Service.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">2. Information We Collect</h2>
                
                <h3 className="text-xl font-semibold mb-3 mt-6">2.1 Personal Information</h3>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  We collect personal information that you voluntarily provide to us when you register for the Service, express an interest in obtaining information about us or our products and services, or otherwise contact us. This information may include:
                </p>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                  <li>Name, email address, and contact information</li>
                  <li>Account credentials (username and password)</li>
                  <li>Profile information (age, gender, location)</li>
                  <li>Payment and billing information (processed by third-party payment processors)</li>
                </ul>

                <h3 className="text-xl font-semibold mb-3 mt-6">2.2 Protected Health Information (PHI)</h3>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  As a health-focused application, we collect sensitive health information that is protected under the Health Insurance Portability and Accountability Act (HIPAA). This information includes:
                </p>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                  <li>Medical history and health conditions</li>
                  <li>Current medications and supplements</li>
                  <li>Dietary intake and meal logs</li>
                  <li>Biometric data (weight, blood glucose, ketone levels, blood pressure)</li>
                  <li>Symptom reports and health assessments</li>
                  <li>Healthcare provider information</li>
                </ul>

                <h3 className="text-xl font-semibold mb-3 mt-6">2.3 Automatically Collected Information</h3>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  When you access the Service, we automatically collect certain information about your device and usage patterns, including:
                </p>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                  <li>Device information (type, operating system, unique identifiers)</li>
                  <li>Usage data (features accessed, time spent, interaction patterns)</li>
                  <li>Log data (IP address, browser type, access times)</li>
                  <li>Location data (with your explicit consent)</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">3. How We Use Your Information</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  We use the information we collect for the following purposes:
                </p>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                  <li><strong>Provide and maintain the Service:</strong> To deliver personalized ketogenic diet guidance, track your health metrics, and provide AI-powered recommendations through Dr. Ketone</li>
                  <li><strong>Safety screening:</strong> To identify potential contraindications and health risks before you begin a ketogenic diet</li>
                  <li><strong>Improve our Service:</strong> To analyze usage patterns, develop new features, and enhance user experience</li>
                  <li><strong>Communicate with you:</strong> To send service-related notifications, respond to inquiries, and provide customer support</li>
                  <li><strong>Research and development:</strong> To conduct de-identified research on ketogenic diet effectiveness and health outcomes (only with your explicit consent)</li>
                  <li><strong>Comply with legal obligations:</strong> To meet regulatory requirements and respond to lawful requests</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">4. Cookie Policy</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  We use cookies and similar tracking technologies to track activity on our Service and store certain information. You can control cookie preferences through our cookie consent banner, which appears on your first visit.
                </p>

                <h3 className="text-xl font-semibold mb-3 mt-6">4.1 Types of Cookies We Use</h3>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                  <li><strong>Necessary Cookies:</strong> Essential for the Service to function properly, including session management and security</li>
                  <li><strong>Analytics Cookies:</strong> Help us understand how users interact with the Service (Google Analytics 4)</li>
                  <li><strong>Marketing Cookies:</strong> Used to deliver relevant advertisements and track campaign effectiveness</li>
                </ul>

                <p className="text-muted-foreground leading-relaxed mt-4">
                  You can manage your cookie preferences at any time through your browser settings or by contacting us. Note that disabling certain cookies may limit your ability to use some features of the Service.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">5. HIPAA Compliance</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  {APP_TITLE} is committed to complying with the Health Insurance Portability and Accountability Act (HIPAA) and its implementing regulations. We implement appropriate administrative, physical, and technical safeguards to protect your Protected Health Information (PHI).
                </p>

                <h3 className="text-xl font-semibold mb-3 mt-6">5.1 Security Measures</h3>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                  <li>End-to-end encryption for data transmission</li>
                  <li>Encrypted data storage using industry-standard protocols (AES-256)</li>
                  <li>Multi-factor authentication for account access</li>
                  <li>Regular security audits and penetration testing</li>
                  <li>Employee training on HIPAA compliance and data security</li>
                  <li>Business Associate Agreements (BAAs) with all third-party service providers who handle PHI</li>
                </ul>

                <h3 className="text-xl font-semibold mb-3 mt-6">5.2 Minimum Necessary Standard</h3>
                <p className="text-muted-foreground leading-relaxed">
                  We adhere to the HIPAA minimum necessary standard, collecting and using only the PHI necessary to accomplish the intended purpose of the use or disclosure.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">6. Data Sharing and Disclosure</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  We do not sell your personal information or PHI to third parties. We may share your information only in the following circumstances:
                </p>

                <h3 className="text-xl font-semibold mb-3 mt-6">6.1 With Your Consent</h3>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  We may share your information with your healthcare providers if you explicitly authorize us to do so through the provider portal integration feature.
                </p>

                <h3 className="text-xl font-semibold mb-3 mt-6">6.2 Service Providers</h3>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  We engage third-party companies and individuals to facilitate our Service, including:
                </p>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                  <li>Cloud hosting providers (AWS, Google Cloud)</li>
                  <li>Analytics services (Google Analytics 4)</li>
                  <li>Payment processors (Stripe)</li>
                  <li>Email service providers (SendGrid)</li>
                  <li>Customer support platforms (Intercom)</li>
                </ul>
                <p className="text-muted-foreground leading-relaxed mt-4">
                  All service providers are contractually obligated to protect your information and use it only for the purposes for which it was disclosed.
                </p>

                <h3 className="text-xl font-semibold mb-3 mt-6">6.3 Legal Requirements</h3>
                <p className="text-muted-foreground leading-relaxed">
                  We may disclose your information if required to do so by law or in response to valid requests by public authorities (e.g., court orders, subpoenas, or government agencies).
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">7. Your Privacy Rights</h2>

                <h3 className="text-xl font-semibold mb-3 mt-6">7.1 GDPR Rights (European Users)</h3>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  If you are located in the European Economic Area (EEA), you have the following rights under the General Data Protection Regulation (GDPR):
                </p>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                  <li><strong>Right to Access:</strong> Request a copy of the personal data we hold about you</li>
                  <li><strong>Right to Rectification:</strong> Request correction of inaccurate or incomplete data</li>
                  <li><strong>Right to Erasure:</strong> Request deletion of your personal data ("right to be forgotten")</li>
                  <li><strong>Right to Restrict Processing:</strong> Request limitation of how we use your data</li>
                  <li><strong>Right to Data Portability:</strong> Receive your data in a structured, machine-readable format</li>
                  <li><strong>Right to Object:</strong> Object to processing of your data for certain purposes</li>
                  <li><strong>Right to Withdraw Consent:</strong> Withdraw consent for data processing at any time</li>
                </ul>

                <h3 className="text-xl font-semibold mb-3 mt-6">7.2 CCPA Rights (California Residents)</h3>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  If you are a California resident, you have the following rights under the California Consumer Privacy Act (CCPA):
                </p>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                  <li><strong>Right to Know:</strong> Request disclosure of personal information collected, used, or shared</li>
                  <li><strong>Right to Delete:</strong> Request deletion of personal information</li>
                  <li><strong>Right to Opt-Out:</strong> Opt-out of the sale of personal information (note: we do not sell personal information)</li>
                  <li><strong>Right to Non-Discrimination:</strong> Not be discriminated against for exercising your privacy rights</li>
                </ul>

                <h3 className="text-xl font-semibold mb-3 mt-6">7.3 HIPAA Rights</h3>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Under HIPAA, you have the right to:
                </p>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                  <li>Access and obtain a copy of your PHI</li>
                  <li>Request amendments to your PHI</li>
                  <li>Receive an accounting of disclosures of your PHI</li>
                  <li>Request restrictions on certain uses and disclosures of your PHI</li>
                  <li>Request confidential communications</li>
                </ul>

                <p className="text-muted-foreground leading-relaxed mt-6">
                  To exercise any of these rights, please contact us at <a href="mailto:privacy@ketowell.com" className="text-primary hover:underline">privacy@ketowell.com</a>. We will respond to your request within 30 days.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">8. Data Retention</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  We retain your personal information and PHI for as long as necessary to fulfill the purposes outlined in this Privacy Policy, unless a longer retention period is required or permitted by law. When you delete your account, we will delete or de-identify your data within 90 days, except where we are required to retain it for legal, regulatory, or security purposes.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  De-identified data used for research purposes may be retained indefinitely, as it cannot be traced back to you.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">9. International Data Transfers</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Your information may be transferred to and maintained on servers located outside of your state, province, country, or other governmental jurisdiction where data protection laws may differ. If you are located outside the United States and choose to provide information to us, we transfer your data to the United States and process it there.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  We implement appropriate safeguards for international data transfers, including Standard Contractual Clauses approved by the European Commission for transfers from the EEA.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">10. Children's Privacy</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Our Service is not intended for children under the age of 18. We do not knowingly collect personal information from children under 18. If you are a parent or guardian and believe your child has provided us with personal information, please contact us immediately.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  For users between 13 and 18 years old, parental consent is required before using the Service, and the ketogenic diet should only be undertaken under medical supervision.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">11. Changes to This Privacy Policy</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last Updated" date. For material changes, we will provide prominent notice or obtain your consent as required by law.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  You are advised to review this Privacy Policy periodically for any changes. Changes to this Privacy Policy are effective when they are posted on this page.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">12. Contact Us</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  If you have any questions about this Privacy Policy, please contact us:
                </p>
                <div className="space-y-2 text-muted-foreground">
                  <p><strong>Email:</strong> <a href="mailto:privacy@ketowell.com" className="text-primary hover:underline">privacy@ketowell.com</a></p>
                  <p><strong>Privacy Officer:</strong> <a href="mailto:dpo@ketowell.com" className="text-primary hover:underline">dpo@ketowell.com</a></p>
                  <p><strong>Mailing Address:</strong><br />
                  {APP_TITLE} Privacy Team<br />
                  [Your Company Address]<br />
                  [City, State, ZIP Code]</p>
                </div>
              </section>

              <section className="border-t pt-6">
                <p className="text-sm text-muted-foreground italic">
                  This Privacy Policy was last updated on {lastUpdated}. By continuing to use {APP_TITLE} after this date, you acknowledge that you have read and understood the updated policy.
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
