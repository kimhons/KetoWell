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
