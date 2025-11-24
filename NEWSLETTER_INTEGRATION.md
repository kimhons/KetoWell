# Newsletter Integration Guide

This document explains how to integrate the newsletter subscription form with popular email marketing services.

## Current Implementation

The newsletter form is currently configured to simulate submissions. To connect it to a real email marketing service, you'll need to update the `handleSubmit` function in `/client/src/components/NewsletterForm.tsx`.

## Integration Options

### Option 1: Mailchimp

**Steps:**

1. Create a Mailchimp account and audience
2. Get your API key from Account → Extras → API keys
3. Get your audience ID from Audience → Settings → Audience name and defaults
4. Create a server endpoint (requires upgrading to web-db-user template):

```typescript
// server/routes.ts
app.post('/api/newsletter/subscribe', async (req, res) => {
  const { email } = req.body;
  
  const response = await fetch(
    `https://${MAILCHIMP_DC}.api.mailchimp.com/3.0/lists/${MAILCHIMP_AUDIENCE_ID}/members`,
    {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${MAILCHIMP_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email_address: email,
        status: 'subscribed'
      })
    }
  );
  
  if (response.ok) {
    res.json({ success: true });
  } else {
    res.status(400).json({ error: 'Subscription failed' });
  }
});
```

5. Update NewsletterForm.tsx to call your endpoint:

```typescript
const response = await fetch('/api/newsletter/subscribe', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ email })
});

if (!response.ok) throw new Error('Subscription failed');
```

### Option 2: ConvertKit

**Steps:**

1. Create a ConvertKit account
2. Create a form in ConvertKit
3. Get your API key from Account → Settings → Advanced
4. Get your form ID from the form settings
5. Update NewsletterForm.tsx (can be done client-side):

```typescript
const response = await fetch(
  `https://api.convertkit.com/v3/forms/${CONVERTKIT_FORM_ID}/subscribe`,
  {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      api_key: CONVERTKIT_API_KEY,
      email: email
    })
  }
);

if (!response.ok) throw new Error('Subscription failed');
```

**Note:** For security, it's recommended to proxy this through your own server endpoint to avoid exposing API keys in client code.

### Option 3: Custom Backend API

If you upgrade to the web-db-user template, you can store subscribers in your own database:

**Steps:**

1. Upgrade project: Use `webdev_add_feature` with feature="web-db-user"
2. Create database schema:

```typescript
// server/db/schema.ts
export const newsletterSubscribers = pgTable('newsletter_subscribers', {
  id: serial('id').primaryKey(),
  email: varchar('email', { length: 255 }).notNull().unique(),
  subscribedAt: timestamp('subscribed_at').defaultNow(),
  isActive: boolean('is_active').default(true),
  source: varchar('source', { length: 50 }) // 'homepage', 'blog', etc.
});
```

3. Create API endpoint:

```typescript
// server/routes.ts
app.post('/api/newsletter/subscribe', async (req, res) => {
  const { email, source } = req.body;
  
  try {
    await db.insert(newsletterSubscribers).values({
      email,
      source: source || 'unknown'
    });
    
    // Optional: Send welcome email
    // await sendWelcomeEmail(email);
    
    res.json({ success: true });
  } catch (error) {
    if (error.code === '23505') { // Duplicate email
      res.status(400).json({ error: 'Email already subscribed' });
    } else {
      res.status(500).json({ error: 'Subscription failed' });
    }
  }
});
```

4. Update NewsletterForm.tsx:

```typescript
const response = await fetch('/api/newsletter/subscribe', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ 
    email,
    source: window.location.pathname 
  })
});

if (!response.ok) {
  const data = await response.json();
  throw new Error(data.error || 'Subscription failed');
}
```

### Option 4: Form Services (No Backend Required)

For the current static website, you can use form submission services:

**Formspree:**

1. Create account at formspree.io
2. Create a new form and get the form ID
3. Update NewsletterForm.tsx:

```typescript
const response = await fetch('https://formspree.io/f/YOUR_FORM_ID', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ email })
});

if (!response.ok) throw new Error('Subscription failed');
```

**Netlify Forms (if deploying to Netlify):**

Add `data-netlify="true"` to the form element and Netlify will handle submissions automatically.

## Testing

After implementing your chosen integration:

1. Test with a valid email address
2. Verify the success toast appears
3. Check your email marketing service to confirm the subscription was recorded
4. Test error cases (invalid email, duplicate subscription, network errors)
5. Verify error messages display correctly

## Security Considerations

1. **Never expose API keys in client code** - Always proxy through your own server
2. **Validate email addresses** server-side as well as client-side
3. **Implement rate limiting** to prevent abuse
4. **Add CAPTCHA** if you experience spam submissions
5. **Use HTTPS** for all API calls
6. **Comply with GDPR/CAN-SPAM** - include unsubscribe links in emails

## Current Form Locations

The NewsletterForm component is used in:

1. Homepage (`/client/src/pages/Home.tsx`) - Newsletter section before final CTA
2. Blog landing page (`/client/src/pages/Blog.tsx`) - Bottom of page
3. Blog article pages (`/client/src/pages/BlogArticle.tsx`) - Not yet implemented

## Recommended Approach

For the KetoWell website, we recommend:

1. **Short-term (MVP)**: Use Formspree or ConvertKit's client-side API for quick setup
2. **Long-term (Production)**: Upgrade to web-db-user template and implement custom backend with database storage, allowing for:
   - Segmentation by source (homepage, blog, specific articles)
   - Custom email sequences based on user behavior
   - Integration with user accounts when users download the app
   - Analytics on subscription sources and conversion rates

## Next Steps

1. Choose your integration method based on your needs and technical setup
2. Update the `handleSubmit` function in NewsletterForm.tsx
3. Add environment variables for API keys (never commit these to git)
4. Test thoroughly before deploying to production
5. Set up welcome email automation in your email marketing service
6. Monitor subscription rates and optimize form placement/copy as needed
