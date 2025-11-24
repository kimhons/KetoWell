# Google Analytics 4 Setup Guide

This document explains how to configure Google Analytics 4 (GA4) for the KetoWell website.

## Prerequisites

1. A Google Analytics account
2. A GA4 property created for your website

## Setup Steps

### 1. Create GA4 Property

1. Go to [Google Analytics](https://analytics.google.com/)
2. Click "Admin" (gear icon in bottom left)
3. Under "Property" column, click "Create Property"
4. Enter property name: "KetoWell Website"
5. Select timezone and currency
6. Click "Next" and complete the setup wizard
7. After creation, click "Data Streams" → "Add stream" → "Web"
8. Enter your website URL (e.g., https://ketowell.com)
9. Copy your **Measurement ID** (format: G-XXXXXXXXXX)

### 2. Configure Environment Variable

Add your GA4 Measurement ID to the project:

**Option A: Using Management UI (Recommended)**
1. Open the Management UI → Settings → Secrets
2. Add a new secret:
   - Key: `VITE_GA4_MEASUREMENT_ID`
   - Value: Your GA4 Measurement ID (e.g., `G-XXXXXXXXXX`)

**Option B: Using .env file (Development only)**
1. Create or edit `.env` file in project root:
```bash
VITE_GA4_MEASUREMENT_ID=G-XXXXXXXXXX
```

**Note:** Never commit the `.env` file to git. It's already in `.gitignore`.

### 3. Verify Installation

After deploying with the GA4 Measurement ID configured:

1. Visit your website
2. Open browser DevTools → Console
3. You should NOT see any GA4 errors
4. Go to GA4 → Reports → Realtime
5. You should see your visit appear within 30 seconds

## Events Being Tracked

The website automatically tracks the following events:

### Automatic Events
- **page_view**: Every page navigation
- **scroll_depth**: User scroll behavior

### User Engagement Events
- **newsletter_signup**: Newsletter form submissions
  - Tracked with source (homepage, blog, article)
- **navigation_click**: Navigation menu interactions
- **blog_article_view**: Blog article page views
- **research_tab_click**: Research page tab switches
- **social_share**: Social media share button clicks

### Conversion Events
- **download_app_click**: iOS/Android download button clicks
- **pricing_plan_click**: Pricing plan selection
- **provider_demo_request**: Provider demo form submissions
- **form_submit**: Any form submission

## Setting Up Conversion Goals in GA4

To track conversions in GA4:

1. Go to GA4 → Admin → Events
2. Click "Create event" or "Mark as conversion"
3. Mark these events as conversions:
   - `newsletter_signup`
   - `download_app_click`
   - `provider_demo_request`
   - `pricing_plan_click`

## Tracked Button Component

For easy event tracking on buttons, use the `TrackedButton` component:

```tsx
import TrackedButton from "@/components/TrackedButton";

// Download button
<TrackedButton trackingType="download_ios">
  Download for iOS
</TrackedButton>

// Pricing button
<TrackedButton trackingType="pricing_premium">
  Start Free Trial
</TrackedButton>

// Provider demo button
<TrackedButton trackingType="provider_demo">
  Schedule Demo
</TrackedButton>
```

## Custom Event Tracking

To track custom events, use the analytics utility:

```tsx
import { trackCustomEvent } from "@/lib/analytics";

// Track a custom event
trackCustomEvent("feature_used", {
  feature_name: "meal_planner",
  user_type: "premium"
});
```

## Privacy Considerations

The current implementation:
- ✅ Respects Do Not Track (DNT) browser settings
- ✅ Does not collect personally identifiable information (PII)
- ✅ Uses Google's default cookie consent
- ⚠️ Does NOT include a cookie consent banner (add if required by GDPR)

### Adding Cookie Consent (Optional)

If you need GDPR compliance, consider adding a cookie consent banner:

1. Install a consent management library (e.g., `react-cookie-consent`)
2. Delay GA4 initialization until user consents
3. Provide opt-out mechanism

Example with react-cookie-consent:

```bash
pnpm add react-cookie-consent
```

```tsx
import CookieConsent from "react-cookie-consent";
import { initGA4 } from "@/lib/analytics";

function App() {
  return (
    <>
      {/* Your app content */}
      
      <CookieConsent
        onAccept={() => {
          initGA4();
        }}
      >
        This website uses cookies to enhance the user experience.
      </CookieConsent>
    </>
  );
}
```

## Testing in Development

GA4 events will be sent even in development mode. To avoid polluting your production data:

**Option 1: Use a separate GA4 property for development**
- Create a second GA4 property for testing
- Use different Measurement IDs for dev vs production

**Option 2: Disable GA4 in development**
```typescript
// In analytics.ts
export const GA4_MEASUREMENT_ID = 
  import.meta.env.MODE === "production" 
    ? import.meta.env.VITE_GA4_MEASUREMENT_ID 
    : "";
```

## Debugging

To debug GA4 events:

1. Install [Google Analytics Debugger](https://chrome.google.com/webstore/detail/google-analytics-debugger) Chrome extension
2. Enable the extension
3. Open DevTools → Console
4. You'll see detailed GA4 event logs

Alternatively, use GA4 DebugView:
1. Go to GA4 → Admin → DebugView
2. Enable debug mode in your browser:
```javascript
// In browser console
localStorage.setItem('debug_mode', 'true');
```
3. Reload the page
4. Events will appear in DebugView in real-time

## Common Issues

**Issue: Events not appearing in GA4**
- Check that `VITE_GA4_MEASUREMENT_ID` is set correctly
- Verify the Measurement ID format (should be G-XXXXXXXXXX)
- Check browser console for errors
- Wait 24-48 hours for historical data (Realtime should work immediately)

**Issue: TypeScript errors**
- Ensure `window.gtag` is properly typed in `analytics.ts`
- Check that all imports are correct

**Issue: Events tracked multiple times**
- Check that components aren't re-rendering unnecessarily
- Ensure event handlers aren't being called multiple times

## Analytics Reports to Monitor

Key reports to check in GA4:

1. **Realtime** → See current visitors and their actions
2. **Engagement** → Pages and screens → See most visited pages
3. **Engagement** → Events → See all tracked events
4. **Monetization** → Conversions → Track conversion goals
5. **User Attributes** → Demographics → Understand your audience

## Next Steps

After GA4 is configured:

1. Set up custom audiences for retargeting
2. Create custom reports for key metrics
3. Set up automated alerts for important events
4. Integrate with Google Ads for conversion tracking
5. Export data to BigQuery for advanced analysis

## Support

For GA4 support:
- [GA4 Documentation](https://support.google.com/analytics/answer/10089681)
- [GA4 Event Tracking Guide](https://developers.google.com/analytics/devguides/collection/ga4/events)
- [GA4 Measurement Protocol](https://developers.google.com/analytics/devguides/collection/protocol/ga4)
