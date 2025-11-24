# Ketogenic Health Website - TODO

## Phase 1: Design System & Global Styles
- [x] Set up color palette (Ketone Blue, Metabolic Green, Energy Amber)
- [x] Configure typography (Inter font from Google Fonts)
- [x] Set up Tailwind theme with custom colors
- [x] Create reusable components (Button, Card, Section)
- [x] Set up animations with Framer Motion

## Phase 2: Homepage
- [x] Hero section with value proposition
- [x] Dr. Ketone showcase section
- [x] Safety-first section
- [x] Evidence-based approach section
- [x] Feature highlights cards
- [x] Social proof / testimonials
- [x] Final CTA section
- [x] Navigation header
- [x] Footer with links

## Phase 3: Research Pages
- [ ] Research library home page
- [ ] Clinical Evidence - Metabolic Health
- [ ] Clinical Evidence - Cardiovascular
- [ ] Clinical Evidence - Neurological
- [ ] Clinical Evidence - Cancer
- [ ] Clinical Evidence - Psychiatric
- [ ] Behavioral Science section
- [ ] Safety Protocols section
- [ ] References page with citations

## Phase 4: Features, Safety, How It Works
- [ ] Features page with Dr. Ketone AI details
- [ ] Features page with Medical Safety details
- [ ] Features page with Smart Tracking details
- [ ] Safety page with contraindications
- [ ] Safety page with drug interactions
- [ ] How It Works page with timeline
- [ ] About page
- [ ] FAQ page

## Phase 5: Polish & Deploy
- [ ] Add smooth scroll animations
- [ ] Optimize images and performance
- [ ] SEO meta tags
- [ ] Mobile responsiveness check
- [ ] Accessibility audit
- [ ] Save checkpoint
- [ ] Deploy to production

## New Feature: Research Library Page
- [x] Create Research page component with navigation tabs
- [x] Build Metabolic Health section with study details
- [x] Build Cardiovascular Health section with study details
- [x] Build Neurological Health section with study details
- [x] Add citations and references for all studies
- [x] Add route to App.tsx for /research page
- [x] Update homepage navigation links to point to research page
- [x] Test research page functionality

## Comprehensive Website Updates (Claude AI Recommendations)

### Phase 1: Rebranding to KetoWell
- [x] Update APP_TITLE in const.ts to "KetoWell"
- [x] Update tagline to "Your AI-Native Partner in Ketogenic Health"
- [x] Update all page titles and meta tags
- [x] Update homepage hero section
- [x] Update navigation branding
- [x] Update footer branding

### Phase 2: Evidence Strength Matrix
- [x] Create evidence strength matrix component
- [x] Add matrix to research page hero section
- [x] Include combined research confidence levels
- [x] Add visual indicators for strength levels

### Phase 3: Pricing Page
- [x] Create /pricing route
- [x] Build pricing page component
- [x] Add Free tier ($0/mo) with basic features
- [x] Add Premium tier ($9.99/mo) with Dr. Ketone unlimited
- [x] Add Clinical tier ($19.99/mo) with provider portal
- [x] Add FAQ section
- [x] Add comparison table

### Phase 4: Interactive Dr. Ketone Chat Demo
- [ ] Create chat demo component
- [ ] Add to homepage hero section
- [ ] Implement sample conversation flow
- [ ] Add typing animations
- [ ] Make it visually engaging

### Phase 5: For Providers Page
- [x] Create /for-providers route
- [x] Build provider page component
- [x] Add hero section for healthcare professionals
- [x] Add provider portal features section
- [x] Add patient monitoring capabilities
- [x] Add evidence summaries for clinicians
- [x] Add integration information
- [x] Add contact/demo request form

## Blog Section Development

### Blog Infrastructure
- [x] Create /blog landing page with article grid
- [x] Create blog article template component
- [x] Add blog navigation links to header
- [x] Create blog data structure for articles

### Blog Articles (SEO-Optimized)
- [x] Article 1: "Keto Flu: Causes, Symptoms, and Evidence-Based Management"
- [x] Article 2: "SGLT2 Inhibitors and Ketogenic Diets: Critical Safety Considerations"
- [x] Article 3: "Ketogenic Diet for Type 2 Diabetes: What the Latest Research Shows"
- [ ] Article 4: "The Science Behind Ketones: How They Transform Your Metabolism"
- [ ] Article 5: "Electrolyte Balance on Keto: A Complete Guide"

### Blog Features
- [x] Add article categories/tags
- [x] Add reading time estimates
- [x] Add social sharing buttons
- [x] Add related articles section
- [x] Add author bios
- [x] Add publication dates

## Newsletter Subscription System

### Newsletter Component
- [x] Create reusable NewsletterForm component
- [x] Add email validation
- [x] Add loading states during submission
- [x] Add success message display
- [x] Add error handling
- [x] Create API endpoint for form submission (documented for future implementation)

### Integration
- [x] Update homepage newsletter section with functional form
- [x] Update blog page newsletter section with functional form
- [ ] Update blog article page newsletter section with functional form
- [x] Add toast notifications for success/error feedback

### Email Service Setup
- [x] Document integration instructions for Mailchimp
- [x] Document integration instructions for ConvertKit
- [x] Document integration instructions for custom API
- [x] Document integration instructions for Formspree
- [x] Test form submission flow

## SEO Implementation

### Meta Tags
- [x] Create reusable SEO component with meta tag management
- [x] Add title tags for all pages
- [x] Add meta descriptions for all pages
- [x] Add Open Graph tags (og:title, og:description, og:image, og:url)
- [x] Add Twitter Card tags
- [x] Add canonical URLs

### Schema Markup (JSON-LD)
- [x] Add Organization schema to all pages
- [x] Add WebSite schema with search action
- [x] Add Article schema for blog posts
- [x] Add BreadcrumbList schema for navigation
- [ ] Add FAQPage schema for pricing page (optional enhancement)

### Page-Specific SEO
- [x] Homepage: Optimize for "ketogenic diet app" keywords
- [x] Research page: Optimize for "ketogenic diet research" keywords
- [x] Blog articles: Optimize for specific article topics
- [x] Pricing page: Optimize for "keto app pricing" keywords
- [x] For Providers page: Optimize for "ketogenic diet clinical tools"

### Technical SEO
- [x] Add robots.txt file
- [x] Add sitemap.xml
- [ ] Verify all images have alt text (to be reviewed)
- [ ] Test social sharing previews (requires deployment)

## Google Analytics 4 Integration

### GA4 Setup
- [x] Create GA4 tracking component (AnalyticsProvider)
- [x] Add GA4 script dynamically via component
- [x] Implement page view tracking
- [x] Add privacy-compliant implementation (respects DNT)
- [x] Configure environment variable for GA4 measurement ID

### Event Tracking
- [x] Track newsletter subscription events
- [x] Track download app button clicks (via TrackedButton)
- [x] Track navigation link clicks
- [x] Track blog article views
- [x] Track research page interactions
- [x] Track pricing plan selections
- [x] Track provider demo requests

### Conversion Goals
- [x] Set up conversion tracking for newsletter signups
- [x] Set up conversion tracking for app download clicks
- [x] Set up conversion tracking for provider demo requests
- [x] Set up conversion tracking for pricing plan clicks

### Testing & Documentation
- [x] Create analytics utility with type-safe functions
- [x] Document GA4 setup instructions (GA4_SETUP.md)
- [ ] User must configure GA4 Measurement ID in env
- [ ] User must verify events in GA4 dashboard after deployment

## Dr. Ketone Interactive Chat Demo

### Chat Component
- [x] Create ChatDemo component with message interface
- [x] Implement typing animation effect
- [x] Add message bubbles (user vs assistant)
- [x] Create conversation script with meal logging example
- [x] Create conversation script with symptom assessment
- [x] Add auto-play functionality with delays
- [x] Add restart/replay button

### Integration
- [x] Replace static chat mockup in homepage hero
- [x] Add smooth animations and transitions
- [x] Ensure mobile responsiveness
- [x] Test chat flow and timing

### Content
- [x] Write realistic meal logging conversation
- [x] Write symptom assessment conversation (electrolyte guidance)
- [x] Write personalized guidance examples
- [x] Add Dr. Ketone personality traits (warm, evidence-based)

## GDPR Cookie Consent Banner

### Consent Banner Component
- [x] Create CookieConsent component with banner UI
- [x] Add accept/decline buttons
- [x] Add "Manage Preferences" option
- [x] Create consent storage in localStorage
- [x] Add privacy policy link
- [x] Ensure mobile responsiveness

### Consent Management
- [x] Create useConsent hook for consent state
- [x] Implement consent categories (necessary, analytics, marketing)
- [x] Add consent revocation functionality (resetConsent)
- [x] Create preferences modal for granular control

### GA4 Integration
- [x] Modify AnalyticsProvider to check consent before initialization
- [x] Only load GA4 script after user accepts analytics cookies
- [x] Add consent checking for page view tracking
- [x] Test that GA4 doesn't load without consent

### Compliance
- [x] Add clear cookie policy explanation
- [x] Ensure banner appears on first visit
- [x] Respect user's consent choice across sessions
- [x] Add consent versioning for policy updates

## Privacy Policy & Terms of Service Pages

### Privacy Policy Content
- [x] Draft introduction and scope
- [x] Document data collection practices
- [x] Explain cookie usage and types
- [x] Detail HIPAA compliance measures
- [x] Outline GDPR rights (access, deletion, portability)
- [x] Outline CCPA rights (California residents)
- [x] Explain data security measures
- [x] Detail third-party services and data sharing
- [x] Add contact information for privacy inquiries
- [x] Include last updated date

### Terms of Service Content
- [x] Draft acceptance of terms
- [x] Define service description and scope
- [x] Add medical disclaimer and liability limitations
- [x] Outline user responsibilities
- [x] Detail prohibited uses
- [x] Explain account termination conditions
- [x] Add intellectual property rights
- [x] Include dispute resolution and governing law
- [x] Add limitation of liability
- [x] Include last updated date

### Page Implementation
- [x] Create /privacy-policy page component
- [x] Create /terms-of-service page component
- [x] Add routes to App.tsx
- [x] Update footer links to point to legal pages (already present)
- [x] Add SEO meta tags for legal pages
- [x] Ensure mobile responsiveness

## FAQ Section

### FAQ Component
- [x] Create FAQ accordion component using shadcn/ui
- [x] Write comprehensive FAQ content (15 questions)
- [x] Organize questions by category (Getting Started, Safety, App Features, Medical)
- [x] Add smooth expand/collapse animations
- [x] Ensure mobile responsiveness

### FAQ Content Categories
- [x] Getting Started: What is keto? How do I start? What can I eat? How long for results?
- [x] Safety: Is keto safe for me? What about side effects? Do I need a doctor? Ketoacidosis concerns?
- [x] App Features: How does Dr. Ketone work? What makes it different? What's included? Provider access?
- [x] Medical: What if I have diabetes? What about medications? What are contraindications? Data security?

### Integration
- [x] Add FAQ section to homepage (before newsletter section)
- [x] Add analytics tracking for FAQ interactions
- [x] Test all accordion interactions

## Professional Image Generation

### Dr. Ketone Character Design
- [x] Generate friendly, professional Dr. Ketone character illustration
- [ ] Create avatar/icon version for chat interface (future enhancement)
- [ ] Generate different poses/expressions for various contexts (future enhancement)

### Hero Section Images
- [x] Generate hero background with health/science theme
- [x] Create abstract ketone molecule visualization
- [x] Generate app mockup preview for hero section

### Feature Icons
- [x] Generate meal tracking icon
- [x] Generate symptom monitoring icon
- [x] Generate personalized guidance icon
- [x] Generate community support icon
- [x] Generate AI brain icon
- [x] Generate safety shield icon
- [x] Generate research visual infographic

### Integration
- [x] Copy generated images to client/public/images/
- [x] Update hero section with generated background
- [x] Update feature cards with custom icons
- [x] Update APP_LOGO constant with Dr. Ketone character
- [ ] Test all image loading and responsiveness

## KetoWell Branding Visibility Fix

- [x] Add "KetoWell" name prominently to homepage hero section
- [x] Ensure tagline "Your AI-Native Partner in Ketogenic Health" is visible
- [ ] Verify branding is consistent across all pages
- [ ] Test visibility on mobile and desktop

## Live Chat Widget Integration

### Chat Widget Component
- [x] Create LiveChatWidget component with toggle button
- [x] Build chat interface with message display
- [x] Add contact form for offline messages (email capture)
- [x] Implement minimize/maximize functionality
- [x] Add typing indicator animation
- [x] Create welcome message on open
- [x] Add mobile responsiveness

### Integration
- [x] Add chat widget to App.tsx for global availability
- [x] Position widget in bottom-right corner
- [x] Add analytics tracking for chat interactions
- [x] Test chat widget on all pages
- [ ] Document integration instructions for live chat services (Intercom, Crisp, Tawk.to)

### Features
- [x] Quick reply suggestions for common questions
- [x] Email capture for offline messages
- [x] Notification badge for new messages
- [x] Smooth animations and transitions
- [x] Auto-responses for common questions (pricing, safety, research, etc.)

## Waitlist Signup Modal

### Modal Component
- [x] Create WaitlistModal component with dialog UI
- [x] Add email input with validation
- [x] Add platform selection (iOS, Android, Both)
- [x] Display expected launch date (Q2 2025)
- [x] Add success state with confirmation message
- [x] Implement loading state during submission
- [x] Add error handling and toast notifications

### Integration
- [x] Replace "Download for iOS" button with waitlist trigger
- [x] Replace "Download for Android" button with waitlist trigger
- [x] Update all CTA buttons on homepage to trigger waitlist
- [x] Add analytics tracking for waitlist signups
- [x] Track platform preferences (iOS vs Android)

### Features
- [x] Email validation before submission
- [x] Success message with next steps
- [x] Option to join newsletter simultaneously
- [ ] Display waitlist position or total signups (future enhancement)
- [x] Mobile responsive design

## Waitlist API Backend

### Project Upgrade
- [x] Upgrade project with web-db-user feature (server + database + auth)
- [x] Set up database connection
- [ ] Configure email service integration (documented for future)

### Database Schema
- [x] Create waitlist_signups table with fields:
  - id (primary key)
  - email (unique, required)
  - platform (ios/android/both)
  - newsletter_optin (boolean)
  - created_at (timestamp)
  - confirmed_at (timestamp, nullable)
  - confirmation_token (unique)
- [x] Create newsletter_subscriptions table with fields:
  - id (primary key)
  - email (unique, required)
  - source (varchar)
  - subscribed_at (timestamp)
  - unsubscribed_at (timestamp, nullable)
  - unsubscribe_token (unique)

### API Endpoints (tRPC)
- [x] Create waitlist.signup mutation
- [x] Create waitlist.stats query
- [x] Create newsletter.subscribe mutation
- [x] Implement email validation with Zod
- [x] Check for duplicate signups (unique constraint)
- [x] Store signup in database with Drizzle ORM
- [x] Generate confirmation token
- [x] Return success response
- [x] Handle duplicate entry errors properly (MySQL & SQLite)

### Database Helper Functions
- [x] Create createWaitlistSignup helper
- [x] Create getWaitlistSignupByEmail helper
- [x] Create getWaitlistSignupByToken helper
- [x] Create confirmWaitlistSignup helper
- [x] Create getWaitlistCount helper
- [x] Create createNewsletterSubscription helper
- [x] Create getNewsletterSubscriptionByEmail helper
- [x] Fix duplicate entry error handling for Drizzle-wrapped errors

### Email Confirmation
- [ ] Set up email service (Resend or similar) - documented for future
- [ ] Create confirmation email template
- [ ] Send confirmation email after signup
- [ ] Create GET /api/waitlist/confirm/:token endpoint
- [ ] Update confirmed_at timestamp on confirmation

### Frontend Integration
- [x] Update WaitlistModal to call real tRPC endpoint
- [x] Update NewsletterForm to call real tRPC endpoint
- [x] Handle API errors gracefully with toast notifications
- [x] Display appropriate success/error messages
- [x] Test complete signup flow

### Testing
- [x] Write vitest tests for waitlist API (5 tests)
- [x] Write vitest tests for newsletter API (5 tests)
- [x] Write integration tests for waitlist with newsletter opt-in (2 tests)
- [x] Fix duplicate entry error handling (all 12 tests passing)

## Resend Email Service Integration

### Setup
- [x] Install Resend SDK package
- [x] Request RESEND_API_KEY from user via webdev_request_secrets
- [x] Test API key with simple email send

### Email Templates
- [x] Create waitlist confirmation email template
- [x] Add KetoWell branding to email
- [x] Include confirmation link with token
- [x] Add features preview section
- [x] Make template mobile-responsive

### Email Helper Functions
- [x] Create sendWaitlistConfirmationEmail helper
- [x] Add error handling for email failures
- [x] Log email send attempts
- [x] Handle rate limiting gracefully
- [x] Create testResendConnection helper for API validation

### Integration
- [x] Update waitlist.signup mutation to send confirmation email
- [x] Add email confirmation endpoint (waitlist.confirm mutation)
- [x] Update confirmWaitlistSignup to mark as confirmed
- [x] Handle email send failures without blocking signup
- [x] Create WaitlistConfirm page component
- [x] Add /waitlist/confirm/:token route to App.tsx

### Testing
- [x] Write vitest test for email helper function (testResendConnection)
- [x] Test confirmation email flow (4 new tests)
- [x] Verify email template renders correctly
- [x] Test error handling when confirmation fails
- [x] Test already-confirmed email handling
- [x] Test invalid token rejection
- [x] All 16 tests passing (12 original + 4 email confirmation)

## Welcome Email Series (Drip Campaign)

### Strategy & Planning
- [x] Define email series schedule (Day 1, Day 3, Day 7)
- [x] Plan content themes for each email
- [x] Design database schema for email tracking
- [x] Create email_sends table to track sent emails

### Database Schema
- [x] Add email_sends table with fields:
  - id (primary key)
  - waitlist_signup_id (foreign key)
  - email_type (confirmation, day_1, day_3, day_7)
  - sent_at (timestamp)
  - status (sent, failed, bounced)
  - resend_message_id (for tracking)
  - error_message (for failed sends)
- [x] Run database migration (pnpm db:push)

### Email Templates
- [x] Create Day 1 email: "The Science Behind Ketogenic Health"
  - Metabolic benefits overview (stable energy, mental clarity)
  - How ketosis works (fat burning, ketones)
  - Research highlight from 2024 meta-analysis
  - What to expect from KetoWell
- [x] Create Day 3 email: "Meet Dr. Ketone: Your AI Health Partner"
  - Dr. Ketone capabilities preview
  - Safety-first approach (contraindication screening)
  - Proactive health monitoring
  - Real example conversation
- [x] Create Day 7 email: "Research Highlights & Launch Updates"
  - Key research findings (metabolic, cardiovascular, neurological)
  - Clinical evidence summary with citations
  - Launch timeline (Q1 beta, Q2 launch)
  - Waitlist member benefits

### Email Scheduling System
- [x] Create email series helper functions (sendDay1Email, sendDay3Email, sendDay7Email)
- [x] Implement getWaitlistMembersForDripEmail query
- [x] Create createEmailSend helper with tracking
- [x] Create hasEmailBeenSent helper for duplicate checking
- [x] Add email send logging to database
- [x] Handle duplicate send prevention

### Scheduled Job
- [x] Create cron job script (server/jobs/send-drip-emails.ts)
- [x] Check for users due for Day 1, Day 3, Day 7 emails
- [x] Send emails in batches with rate limiting (100ms between sends)
- [x] Log results and handle failures
- [x] Record failed sends in database with error messages
- [x] Add npm script: pnpm job:drip-emails

### Testing
- [x] Write vitest tests for drip email logic (10 tests)
- [x] Test email tracking (2 tests)
- [x] Test email scheduling calculations (5 tests)
- [x] Test duplicate prevention
- [x] Verify email templates send correctly (3 tests)
- [x] Test that unconfirmed members are excluded
- [x] All 28 tests passing (16 router + 10 drip email + 2 other)
