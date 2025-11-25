# Book Promotion Analytics Tracking Guide

## Overview

Comprehensive conversion tracking has been implemented for the KetoWell book promotion campaign. This guide explains all tracked events, how to access the data, and how to optimize based on insights.

---

## Tracked Events

### 1. **Banner Impression** (`book_banner_impression`)
**When:** Banner is displayed on homepage (once per session)
**Category:** `book_promotion`
**Label:** `homepage_banner`
**Storage:** Tracked once per session using `sessionStorage`

**Purpose:** Measure banner visibility and reach

---

### 2. **Banner Click** (`book_banner_click`)
**When:** User clicks "Get Free Book" CTA button on banner
**Category:** `book_promotion` + `conversion`
**Label:** `homepage`
**Value:** 1
**Storage:** No persistence (tracks every click)

**Purpose:** Measure banner click-through rate (CTR)

**Conversion Event:** Also tracked as `conversion` with label `book_banner_cta`

---

### 3. **Banner Dismiss** (`book_banner_dismiss`)
**When:** User clicks X button to close banner
**Category:** `book_promotion`
**Label:** `homepage_banner`
**Storage:** Saved to `localStorage` (banner won't show again)

**Purpose:** Measure banner dismissal rate and user friction

---

### 4. **Book Page View** (`book_page_view`)
**When:** User visits `/book` page
**Category:** `book_promotion`
**Label:** Source parameter (e.g., `direct`, `homepage`, `email`)
**Storage:** No persistence (tracks every page view)

**Purpose:** Measure traffic sources to book page

**URL Parameters:**
- `/book?source=banner` - From homepage banner
- `/book?source=email` - From email campaign
- `/book?source=social` - From social media

---

### 5. **PDF Download** (`book_pdf_download`)
**When:** User clicks "Download Free PDF" button
**Category:** `conversion`
**Label:** `book_page`
**Value:** 1
**Storage:** No persistence (tracks every download attempt)

**Purpose:** Measure book download conversion rate

**Conversion Event:** Also tracked as `conversion` with label `book_download` and value `5`

---

### 6. **Amazon Pre-Order Click** (`book_amazon_click`)
**When:** User clicks "Pre-Order on Amazon" button
**Category:** `conversion`
**Label:** `book_page`
**Value:** 1
**Storage:** No persistence (tracks every click)

**Purpose:** Measure Amazon referral traffic and potential sales

**Conversion Event:** Also tracked as `conversion` with label `book_amazon_preorder` and value `10`

---

## Conversion Funnel

```
Homepage Visit
    ↓
Banner Impression (tracked once per session)
    ↓
Banner Click (conversion event)
    ↓
Book Page View (with source tracking)
    ↓
PDF Download (high-value conversion, value=5)
    OR
Amazon Click (highest-value conversion, value=10)
```

---

## Key Metrics to Monitor

### 1. **Banner Performance**
- **Impression Rate:** % of homepage visitors who see banner
- **Click-Through Rate (CTR):** Banner Clicks / Banner Impressions
- **Dismissal Rate:** Banner Dismissals / Banner Impressions

**Target CTR:** 5-10% (industry standard for promotional banners)

---

### 2. **Book Page Performance**
- **Traffic Sources:** Which sources drive most visits?
- **Bounce Rate:** % of visitors who leave without action
- **Time on Page:** Average engagement time

---

### 3. **Conversion Metrics**
- **PDF Download Rate:** PDF Downloads / Book Page Views
- **Amazon Click Rate:** Amazon Clicks / Book Page Views
- **Overall Conversion Rate:** (Downloads + Amazon Clicks) / Book Page Views

**Target Conversion Rate:** 20-30% for free digital products

---

### 4. **Funnel Drop-Off Analysis**
- **Banner → Book Page:** % who click banner and reach book page
- **Book Page → Download:** % who download after visiting
- **Book Page → Amazon:** % who click Amazon link

---

## Accessing Analytics Data

### Google Analytics 4 Dashboard

1. **Navigate to GA4:** [analytics.google.com](https://analytics.google.com)
2. **Select Property:** KetoWell Website
3. **Go to Reports → Engagement → Events**

### Custom Reports

#### Banner Performance Report
**Filter:** Event name contains `book_banner`
**Metrics:**
- `book_banner_impression` (count)
- `book_banner_click` (count)
- `book_banner_dismiss` (count)

**Calculated Metrics:**
- CTR = (Clicks / Impressions) × 100
- Dismissal Rate = (Dismissals / Impressions) × 100

---

#### Book Conversion Funnel
**Events in Order:**
1. `book_banner_impression`
2. `book_banner_click`
3. `book_page_view`
4. `book_pdf_download` OR `book_amazon_click`

**Metrics:**
- Users at each step
- Drop-off rate between steps
- Overall conversion rate

---

#### Traffic Source Analysis
**Dimension:** `event_label` for `book_page_view` events
**Breakdown:**
- Direct traffic
- Homepage banner
- Email campaigns
- Social media
- Other sources

---

## Optimization Strategies

### If Banner CTR < 3%
**Problem:** Banner not compelling enough
**Solutions:**
- Test different headlines
- Change CTA button text
- Adjust banner position
- Improve visual design
- Add urgency ("Limited Time")

---

### If Banner Dismissal Rate > 50%
**Problem:** Banner perceived as intrusive
**Solutions:**
- Reduce banner size
- Make it less prominent
- Add delay before showing
- Improve relevance of messaging

---

### If Book Page Bounce Rate > 70%
**Problem:** Page not meeting expectations
**Solutions:**
- Improve page load speed
- Enhance book description
- Add social proof (reviews, testimonials)
- Clarify value proposition
- Add preview content

---

### If PDF Download Rate < 15%
**Problem:** Insufficient motivation to download
**Solutions:**
- Highlight key benefits more clearly
- Add "What's Inside" preview
- Include sample chapter
- Add urgency or scarcity
- Improve CTA button design

---

## A/B Testing Recommendations

### Test 1: Banner Headline
**Variant A:** "Free Book: Transform Your Health with Ketogenic Living"
**Variant B:** "Download Your Free 303-Page Keto Health Guide"
**Variant C:** "Reverse Diabetes Naturally - Free Evidence-Based Guide"

**Metric:** Banner CTR

---

### Test 2: CTA Button Text
**Variant A:** "Get Free Book"
**Variant B:** "Download Now"
**Variant C:** "Claim Your Free Copy"

**Metric:** Banner CTR

---

### Test 3: Banner Position
**Variant A:** Below header (current)
**Variant B:** Floating bottom bar
**Variant C:** Modal popup after 30 seconds

**Metrics:** CTR, Dismissal Rate, Conversion Rate

---

### Test 4: Book Page Layout
**Variant A:** Current layout
**Variant B:** Video explainer at top
**Variant C:** Sample chapter preview

**Metric:** PDF Download Rate

---

## Conversion Value Attribution

**PDF Download:** $5 value
- Indicates high intent
- Email capture opportunity
- Potential app user

**Amazon Click:** $10 value
- Highest intent (purchase)
- Direct revenue potential
- Brand advocacy

**Total Campaign Value:**
```
Campaign Value = (PDF Downloads × $5) + (Amazon Clicks × $10)
```

---

## Reporting Schedule

### Daily Monitoring
- Banner impressions
- Banner CTR
- PDF downloads
- Amazon clicks

### Weekly Analysis
- Traffic source breakdown
- Conversion funnel performance
- Drop-off points
- A/B test results

### Monthly Review
- Overall campaign ROI
- Trend analysis
- Optimization recommendations
- Strategic adjustments

---

## Integration with Other Tools

### Email Marketing
**Track email campaign performance:**
- Use `/book?source=email_[campaign_name]` links
- Compare email vs. banner conversion rates
- Segment by email list

### Social Media
**Track social media performance:**
- Use `/book?source=[platform]_[post_id]` links
- Compare platform effectiveness
- Identify best-performing content types

### Paid Advertising
**Track ad campaign performance:**
- Use `/book?source=ad_[campaign_id]` links
- Calculate cost per download
- Optimize ad spend based on conversion rates

---

## Privacy & Compliance

### Cookie Consent
- Analytics only tracked after user consent
- Respects "Do Not Track" preferences
- Compliant with GDPR/CCPA

### Data Retention
- Event data retained for 14 months (GA4 default)
- User identifiers anonymized
- No personally identifiable information (PII) collected

### Opt-Out
Users can opt out via:
1. Cookie consent banner (decline analytics)
2. Browser "Do Not Track" setting
3. GA4 opt-out browser extension

---

## Technical Implementation

### localStorage Keys
- `book_banner_dismissed`: Boolean, persists banner dismissal
- Cleared when user clears browser data

### sessionStorage Keys
- `book_banner_impression_tracked`: Boolean, prevents duplicate impression tracking
- Cleared when browser tab closes

### Event Parameters
All events include:
- `event_category`: Groups related events
- `event_label`: Specific context or source
- `value`: Numeric value for conversion tracking (where applicable)

---

## Troubleshooting

### Events Not Appearing in GA4
**Check:**
1. GA4 Measurement ID configured in `.env`
2. User has accepted analytics cookies
3. Ad blockers disabled (for testing)
4. Events appear in GA4 DebugView (real-time)

### Duplicate Event Tracking
**Check:**
1. `sessionStorage` for impression tracking
2. Event handlers not attached multiple times
3. React component not re-rendering unnecessarily

### Conversion Values Not Showing
**Check:**
1. `value` parameter included in event
2. GA4 configured to track conversion values
3. Conversion events properly set up in GA4 admin

---

## Success Criteria

### Month 1 Goals
- 10,000+ banner impressions
- 5%+ banner CTR (500+ clicks)
- 1,000+ book page visits
- 250+ PDF downloads (25% conversion rate)
- 50+ Amazon clicks (5% conversion rate)

### Month 3 Goals
- 30,000+ banner impressions
- 7%+ banner CTR (2,100+ clicks)
- 3,000+ book page visits
- 900+ PDF downloads (30% conversion rate)
- 150+ Amazon clicks (5% conversion rate)

### Month 6 Goals
- 60,000+ banner impressions
- 10%+ banner CTR (6,000+ clicks)
- 6,000+ book page visits
- 2,000+ PDF downloads (33% conversion rate)
- 300+ Amazon clicks (5% conversion rate)

---

## Next Steps

1. **Set up GA4 custom reports** for book promotion events
2. **Create conversion funnel visualization** in GA4
3. **Schedule weekly analytics review** meetings
4. **Implement A/B testing framework** for banner optimization
5. **Set up automated alerts** for significant metric changes
6. **Create dashboard** for real-time monitoring
7. **Document learnings** and optimization results

---

## Contact & Support

For questions about analytics implementation or data interpretation:
- **Technical Issues:** Check browser console for errors
- **Data Questions:** Review GA4 documentation
- **Optimization Ideas:** Refer to A/B testing recommendations above

---

**Last Updated:** November 25, 2025
**Version:** 1.0
**Author:** KetoWell Development Team
