# KetoWell

**Transform Your Health with the Science of Ketogenic Living**

KetoWell is a comprehensive evidence-based ketogenic health platform featuring an AI-powered health companion, a 303-page book backed by 200+ peer-reviewed studies, Stripe-powered digital commerce, and a viral referral rewards system.

---

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Stripe Integration](#stripe-integration)
- [Referral System](#referral-system)
- [API Documentation](#api-documentation)
- [Environment Variables](#environment-variables)
- [Database Schema](#database-schema)
- [Deployment](#deployment)
- [Contributing](#contributing)

---

## Features

### Core Platform
- **Evidence-Based Content**: Comprehensive ketogenic health information backed by 200+ peer-reviewed studies
- **AI Health Companion**: Dr. Ketone provides personalized guidance and support
- **Book Purchase System**: Secure digital book sales with instant PDF delivery
- **Referral Rewards Program**: Viral growth engine with automatic reward generation
- **Email Notifications**: Automated purchase confirmations and download links
- **Social Sharing**: Pre-populated social media sharing with referral tracking
- **Analytics Integration**: Comprehensive event tracking for conversion optimization

### Book Features
- **303 Pages**: Complete guide covering all aspects of ketogenic health
- **14 Chapters**: From science basics to therapeutic applications
- **Multiple Formats**: Digital PDF ($9.99), Kindle ($9.99), Paperback ($19.99)
- **Instant Access**: Immediate download after purchase
- **Download Management**: 10 downloads per purchase with tracking

### Monetization
- **Stripe Payments**: Secure checkout with card processing
- **Referral Incentives**: 20% off KetoWell Premium for 3 months per referral
- **Conversion Tracking**: Full funnel analytics from banner to purchase
- **Social Proof**: Share functionality drives organic growth

---

## Tech Stack

### Frontend
- **React 19**: Modern UI with hooks and concurrent features
- **Tailwind CSS 4**: Utility-first styling with custom design system
- **shadcn/ui**: High-quality accessible components
- **Wouter**: Lightweight client-side routing
- **TypeScript**: Type-safe development

### Backend
- **Node.js 22**: Server-side runtime
- **Express**: Web application framework
- **tRPC**: End-to-end typesafe APIs
- **Drizzle ORM**: Type-safe database queries
- **MySQL**: Relational database

### Integrations
- **Stripe**: Payment processing and checkout
- **Resend**: Transactional email delivery
- **Google Analytics**: User behavior tracking
- **MCP (Model Context Protocol)**: AI service integration

### DevOps
- **Vite**: Fast build tooling and HMR
- **pnpm**: Efficient package management
- **Vitest**: Unit and integration testing
- **GitHub Actions**: CI/CD automation

---

## Getting Started

### Prerequisites

Ensure you have the following installed:
- Node.js 22.x or higher
- pnpm 9.x or higher
- MySQL 8.x or higher

### Installation

Clone the repository and install dependencies:

```bash
git clone https://github.com/kimhons/KetoWell.git
cd KetoWell
pnpm install
```

### Environment Setup

Create a `.env` file in the root directory with the required environment variables (see [Environment Variables](#environment-variables) section).

### Database Setup

Push the database schema to your MySQL instance:

```bash
pnpm db:push
```

This command generates the necessary tables and relationships defined in `drizzle/schema.ts`.

### Development Server

Start the development server with hot module replacement:

```bash
pnpm dev
```

The application will be available at `http://localhost:3000`.

### Build for Production

Create an optimized production build:

```bash
pnpm build
pnpm start
```

---

## Stripe Integration

KetoWell uses Stripe for secure payment processing, enabling customers to purchase the digital book directly from the website.

### Architecture Overview

The Stripe integration follows a standard checkout flow with server-side session creation, client-side redirection, and webhook-based fulfillment. The system stores purchase records in the database and triggers automated email delivery upon successful payment.

### Setup Instructions

#### 1. Create Stripe Account

Sign up for a Stripe account at [stripe.com](https://stripe.com) and obtain your API keys from the Dashboard.

#### 2. Configure Environment Variables

Add your Stripe keys to the `.env` file:

```env
STRIPE_SECRET_KEY=sk_test_...
VITE_STRIPE_PUBLISHABLE_KEY=pk_test_...
```

For production, replace test keys with live keys (`sk_live_...` and `pk_live_...`).

#### 3. Create Product and Price

The KetoWell book product is configured in `server/stripe-products.ts`:

```typescript
export const STRIPE_PRODUCTS = {
  KETOWELL_BOOK: {
    productId: "prod_...",
    priceId: "price_...",
    name: "KetoWell Book - Digital Edition",
    amount: 999, // $9.99 in cents
    currency: "usd",
  },
};
```

You can create the product manually in the Stripe Dashboard or use the Stripe MCP connector to automate product creation.

#### 4. Test the Integration

Use Stripe's test card numbers to verify the checkout flow:

- **Success**: `4242 4242 4242 4242`
- **Decline**: `4000 0000 0000 0002`
- **3D Secure**: `4000 0025 0000 3155`

### Purchase Flow

The complete purchase flow consists of five stages: checkout session creation, payment processing, purchase verification, email delivery, and download access.

#### Stage 1: Checkout Session Creation

When a customer clicks "Buy Digital PDF," the frontend calls the `/api/book/create-checkout-session` endpoint with optional referral code:

```typescript
const { url } = await createBookCheckoutSession(referralCode);
window.location.href = url; // Redirect to Stripe Checkout
```

The server creates a Stripe Checkout Session with the book price, customer email, and metadata:

```typescript
const session = await stripe.checkout.sessions.create({
  mode: "payment",
  payment_method_types: ["card"],
  line_items: [{ price: STRIPE_PRODUCTS.KETOWELL_BOOK.priceId, quantity: 1 }],
  customer_email: userEmail,
  metadata: {
    user_id: userId || "",
    customer_email: userEmail,
    customer_name: userName,
    product_type: "book",
    referral_code: referralCode || "",
  },
  success_url: `${origin}/book/purchase-success?session_id={CHECKOUT_SESSION_ID}`,
  cancel_url: `${origin}/book?canceled=true`,
});
```

#### Stage 2: Payment Processing

Stripe handles the entire payment process including card validation, 3D Secure authentication, and fraud detection. The customer completes payment on Stripe's secure hosted checkout page.

#### Stage 3: Purchase Verification

After successful payment, Stripe redirects the customer to the success URL. The frontend calls `/api/book/verify-purchase/:sessionId` to confirm payment status:

```typescript
const result = await verifyBookPurchase(sessionId);
if (result.success) {
  // Show download link and referral code
}
```

The server retrieves the session from Stripe, verifies payment status, creates a purchase record in the database, and processes any referral tracking:

```typescript
const session = await stripe.checkout.sessions.retrieve(sessionId);
if (session.payment_status !== "paid") {
  return res.status(400).json({ error: "Payment not completed" });
}

// Create purchase record
await db.insert(bookPurchases).values({
  userId: session.metadata?.user_id || null,
  stripePaymentIntentId: session.payment_intent,
  customerEmail: session.customer_details?.email,
  customerName: session.customer_details?.name,
  amountPaid: session.amount_total,
  currency: session.currency,
});
```

#### Stage 4: Email Delivery

The system automatically sends a purchase confirmation email with download link using Resend:

```typescript
await sendBookPurchaseEmail({
  email: customerEmail,
  customerName: customerName,
  paymentIntentId: paymentIntentId,
  amountPaid: amountPaid,
  currency: currency,
});
```

The email includes transaction details, download instructions, referral code information, and social sharing links.

#### Stage 5: Download Access

Customers can download the PDF from the success page or email link. The `/api/book/download` endpoint verifies purchase ownership and enforces download limits:

```typescript
const purchase = await db
  .select()
  .from(bookPurchases)
  .where(eq(bookPurchases.stripePaymentIntentId, paymentIntentId))
  .limit(1);

if (purchase[0].downloadCount >= 10) {
  return res.status(429).json({ error: "Download limit reached" });
}

// Update download count and return PDF URL
await db
  .update(bookPurchases)
  .set({
    downloadCount: purchase[0].downloadCount + 1,
    lastDownloadedAt: new Date(),
  })
  .where(eq(bookPurchases.id, purchase[0].id));
```

### Database Schema

The `book_purchases` table stores all purchase records:

| Column | Type | Description |
|--------|------|-------------|
| `id` | INT | Primary key |
| `userId` | INT | User ID (nullable for guest purchases) |
| `stripePaymentIntentId` | VARCHAR(255) | Stripe payment intent ID |
| `customerEmail` | VARCHAR(255) | Customer email address |
| `customerName` | VARCHAR(255) | Customer name |
| `amountPaid` | INT | Amount in cents |
| `currency` | VARCHAR(3) | Currency code (USD) |
| `downloadCount` | INT | Number of downloads (max 10) |
| `lastDownloadedAt` | DATETIME | Last download timestamp |
| `purchasedAt` | DATETIME | Purchase timestamp |

### Error Handling

The integration implements comprehensive error handling at each stage. If checkout session creation fails, the user sees a toast notification with the error message. Payment failures are handled by Stripe's built-in error UI. If purchase verification fails, the user is shown an error page with support contact information. Email delivery failures are logged but do not block purchase completion. Download errors return appropriate HTTP status codes with user-friendly messages.

### Security Considerations

All Stripe API calls are made server-side to protect secret keys. Customer payment information never touches the application servers—Stripe handles all sensitive data. The system validates payment status before granting download access. Download limits prevent abuse and unauthorized redistribution. Email verification ensures downloads are only accessible to purchasers.

---

## Referral System

The referral rewards program creates a viral growth loop by incentivizing customers to share their purchase with friends. Each customer receives a unique referral code that earns them rewards when others use it to purchase the book.

### How It Works

The referral system operates through a four-step cycle. First, after purchasing the book, customers automatically receive a unique referral code (format: `BOOKREF-XXXXX`). Second, they share this code via social media or direct link with embedded tracking. Third, when a friend uses the code during checkout, the system validates it and stores the referral relationship. Fourth, upon successful purchase, the original customer earns a reward code (`REWARD-XXXXXX`) for 20% off KetoWell Premium for 3 months.

### Architecture

The referral system consists of three main components: code generation and validation, referral tracking, and reward distribution.

#### Code Generation

Each purchase triggers automatic creation of a unique referral code:

```typescript
export async function createReferralCodeForPurchase(params: {
  userId?: number;
  purchaseId: number;
}): Promise<string> {
  const code = generateReferralCode(); // BOOKREF-XXXXX
  
  await db.insert(referralCodes).values({
    code: code,
    userId: params.userId || null,
    purchaseId: params.purchaseId,
    discountType: "percentage",
    discountValue: 20,
    usageLimit: 10,
    usageCount: 0,
    expiresAt: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000), // 90 days
  });
  
  return code;
}
```

Codes use a character set that excludes visually similar characters (0/O, 1/I/l) to prevent confusion. Each code has a 90-day expiration and 10-use limit to encourage timely sharing while preventing abuse.

#### Referral Validation

When a customer enters a referral code on the book page, the system validates it in real-time:

```typescript
export async function validateReferralCode(code: string) {
  const results = await db
    .select()
    .from(referralCodes)
    .where(eq(referralCodes.code, code))
    .limit(1);

  if (results.length === 0) {
    return null; // Invalid code
  }

  const codeDetails = results[0];

  // Check expiration
  if (codeDetails.expiresAt && new Date() > codeDetails.expiresAt) {
    return null; // Expired
  }

  // Check usage limit
  if (codeDetails.usageCount >= codeDetails.usageLimit) {
    return null; // Limit reached
  }

  return codeDetails;
}
```

The validation provides immediate feedback to users with visual indicators (checkmark for valid, X for invalid) and displays the discount information.

#### Referral Tracking

After successful purchase with a referral code, the system records the relationship:

```typescript
export async function trackReferral(params: {
  referralCode: string;
  referredEmail: string;
  referredPurchaseId: number;
}): Promise<void> {
  const codeDetails = await validateReferralCode(params.referralCode);
  if (!codeDetails) {
    throw new Error("Invalid referral code");
  }

  // Record the referral
  await db.insert(referralTracking).values({
    referralCodeId: codeDetails.id,
    referredEmail: params.referredEmail,
    referredPurchaseId: params.referredPurchaseId,
  });

  // Increment usage count
  await db
    .update(referralCodes)
    .set({ usageCount: codeDetails.usageCount + 1 })
    .where(eq(referralCodes.id, codeDetails.id));
}
```

This creates an audit trail of all referrals and prevents the same code from being used beyond its limit.

#### Reward Generation

When a referral is successfully tracked, the system generates a reward code for the original referrer:

```typescript
export async function generateRewardCode(referralCode: string): Promise<string> {
  const codeDetails = await validateReferralCode(referralCode);
  if (!codeDetails) {
    throw new Error("Invalid referral code");
  }

  // Generate unique reward code
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let randomPart = "";
  for (let i = 0; i < 6; i++) {
    randomPart += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  const rewardCode = `REWARD-${randomPart}`;

  return rewardCode;
}
```

Reward codes can be redeemed in the KetoWell app for 20% off Premium subscription for 3 months.

### User Interface

The referral system integrates seamlessly into the purchase flow through two main UI components.

#### Referral Code Input (Book Page)

Customers can enter a friend's referral code before purchasing:

```tsx
<ReferralCodeInput
  initialCode={referralCode || undefined}
  onCodeValidated={handleReferralCodeValidated}
/>
```

The component features a collapsible design that doesn't clutter the purchase page, real-time validation with visual feedback, automatic population from URL parameters (`?ref=CODE`), and discount information display when valid.

#### Referral Rewards Display (Success Page)

After purchase, customers see their new referral code and stats:

```tsx
<ReferralRewards referralStats={referralStats} loading={loadingReferral} />
```

The display includes the unique referral code with copy button, shareable URL with embedded tracking, usage statistics (referrals made, remaining uses, expiration date), list of earned reward codes, and instructions for redeeming rewards.

### Social Sharing Integration

The referral system integrates with social sharing to maximize viral spread:

```tsx
<SocialShareButtons 
  source="book_purchase_success" 
  referralCode={referralStats?.code}
/>
```

Shared links automatically include the referral code as a URL parameter. Pre-populated messages highlight the book's value proposition. Each platform (Twitter, Facebook, LinkedIn) has optimized messaging. All shares are tracked via analytics for conversion measurement.

### Database Schema

The referral system uses two main tables:

**referral_codes**

| Column | Type | Description |
|--------|------|-------------|
| `id` | INT | Primary key |
| `code` | VARCHAR(50) | Unique referral code (BOOKREF-XXXXX) |
| `userId` | INT | User who owns the code (nullable) |
| `purchaseId` | INT | Associated book purchase |
| `discountType` | VARCHAR(50) | Type of discount (percentage) |
| `discountValue` | INT | Discount value (20 = 20%) |
| `usageLimit` | INT | Maximum uses (default 10) |
| `usageCount` | INT | Current usage count |
| `expiresAt` | DATETIME | Expiration date (90 days) |
| `createdAt` | DATETIME | Creation timestamp |

**referral_tracking**

| Column | Type | Description |
|--------|------|-------------|
| `id` | INT | Primary key |
| `referralCodeId` | INT | Foreign key to referral_codes |
| `referredEmail` | VARCHAR(255) | Email of referred customer |
| `referredPurchaseId` | INT | Foreign key to book_purchases |
| `rewardCode` | VARCHAR(50) | Generated reward code (REWARD-XXXXXX) |
| `createdAt` | DATETIME | Referral timestamp |

### Analytics and Metrics

The system tracks comprehensive metrics for optimization:

- **Referral code generation rate**: Percentage of purchases that generate codes
- **Code usage rate**: Percentage of generated codes that get used
- **Conversion rate**: Percentage of code uses that result in purchases
- **Average referrals per customer**: Distribution of referral activity
- **Reward redemption rate**: Percentage of earned rewards actually used
- **Viral coefficient**: Average new customers generated per existing customer

These metrics enable data-driven optimization of the referral program parameters (discount amount, expiration period, usage limits).

### Future Enhancements

Planned improvements to the referral system include automated email notifications to referrers when their code is used, referral leaderboard showing top referrers for gamification, tiered rewards based on referral count (5 referrals = 30% off, 10 = free month), integration with Stripe Coupons for automatic discount application, referrer attribution in customer lifecycle analytics, and A/B testing framework for optimizing reward structures.

---

## API Documentation

### Book Purchase Endpoints

#### POST /api/book/create-checkout-session

Creates a Stripe Checkout session for book purchase.

**Request Body:**
```json
{
  "userEmail": "customer@example.com",
  "userName": "John Doe",
  "referralCode": "BOOKREF-ABC123"
}
```

**Response:**
```json
{
  "url": "https://checkout.stripe.com/c/pay/cs_..."
}
```

#### GET /api/book/verify-purchase/:sessionId

Verifies purchase after successful payment.

**Response:**
```json
{
  "success": true,
  "customerEmail": "customer@example.com",
  "customerName": "John Doe"
}
```

#### GET /api/book/download

Retrieves download link for purchased book.

**Query Parameters:**
- `email`: Customer email
- `paymentIntentId`: Stripe payment intent ID

**Response:**
```json
{
  "success": true,
  "downloadUrl": "/ketowell-book.pdf",
  "downloadsRemaining": 9
}
```

#### GET /api/book/check-purchase

Checks if customer has already purchased the book.

**Query Parameters:**
- `email`: Customer email

**Response:**
```json
{
  "hasPurchased": true,
  "purchaseDate": "2024-01-15T10:30:00Z"
}
```

### Referral System Endpoints

#### GET /api/referral/code/:purchaseId

Gets or creates referral code for a purchase.

**Response:**
```json
{
  "success": true,
  "code": "BOOKREF-A7K9M",
  "usageCount": 2,
  "usageLimit": 10,
  "expiresAt": "2024-04-15T00:00:00Z",
  "referrals": [
    {
      "referredEmail": "friend@example.com",
      "rewardCode": "REWARD-XYZ789",
      "createdAt": "2024-01-20T14:22:00Z"
    }
  ]
}
```

#### POST /api/referral/validate

Validates a referral code.

**Request Body:**
```json
{
  "code": "BOOKREF-A7K9M"
}
```

**Response:**
```json
{
  "valid": true,
  "discountType": "percentage",
  "discountValue": 20,
  "message": "20% off KetoWell Premium for 3 months!"
}
```

#### POST /api/referral/track

Tracks a referral usage.

**Request Body:**
```json
{
  "referralCode": "BOOKREF-A7K9M",
  "referredEmail": "newcustomer@example.com",
  "referredPurchaseId": 42
}
```

**Response:**
```json
{
  "success": true,
  "message": "Referral tracked successfully"
}
```

#### GET /api/referral/stats/:email

Gets referral statistics for a customer by email.

**Response:**
```json
{
  "hasReferralCode": true,
  "code": "BOOKREF-A7K9M",
  "usageCount": 2,
  "usageLimit": 10,
  "expiresAt": "2024-04-15T00:00:00Z",
  "referrals": [...]
}
```

---

## Environment Variables

The application requires the following environment variables:

### Stripe Configuration

```env
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...
VITE_STRIPE_PUBLISHABLE_KEY=pk_test_...
```

### Database Configuration

```env
DATABASE_URL=mysql://user:password@localhost:3306/ketowell
```

### Email Configuration

```env
RESEND_API_KEY=re_...
```

### Authentication

```env
JWT_SECRET=your-secret-key
OAUTH_SERVER_URL=https://oauth.example.com
VITE_OAUTH_PORTAL_URL=https://portal.example.com
```

### Analytics

```env
VITE_ANALYTICS_ENDPOINT=https://analytics.example.com
VITE_ANALYTICS_WEBSITE_ID=your-website-id
```

### Application

```env
VITE_APP_TITLE=KetoWell
VITE_APP_LOGO=/logo.png
NODE_ENV=development
PORT=3000
```

---

## Database Schema

The complete database schema is defined in `drizzle/schema.ts`. Key tables include:

### Core Tables

- **users**: User accounts and authentication
- **book_purchases**: Book purchase records
- **referral_codes**: Referral code generation and tracking
- **referral_tracking**: Referral usage and rewards

### Relationships

- `book_purchases.userId` → `users.id`
- `referral_codes.userId` → `users.id`
- `referral_codes.purchaseId` → `book_purchases.id`
- `referral_tracking.referralCodeId` → `referral_codes.id`
- `referral_tracking.referredPurchaseId` → `book_purchases.id`

### Migrations

Database migrations are managed by Drizzle Kit:

```bash
# Generate migration
pnpm drizzle-kit generate

# Apply migration
pnpm db:push
```

---

## Deployment

### Production Checklist

Before deploying to production, ensure you complete the following steps:

1. **Replace Stripe test keys** with live keys in environment variables
2. **Update product and price IDs** in `server/stripe-products.ts`
3. **Configure webhook endpoints** in Stripe Dashboard
4. **Set up production database** with proper backups
5. **Configure email sender** domain in Resend
6. **Update CORS origins** for production domain
7. **Enable SSL/TLS** for secure connections
8. **Set up monitoring** and error tracking
9. **Configure CDN** for static assets
10. **Test complete purchase flow** with real payment methods

### Deployment Platforms

The application can be deployed to various platforms:

**Vercel** (Recommended for frontend):
```bash
pnpm build
vercel deploy
```

**Railway** (Recommended for full-stack):
```bash
railway up
```

**Docker**:
```bash
docker build -t ketowell .
docker run -p 3000:3000 ketowell
```

### Environment-Specific Configuration

Use different environment files for each environment:
- `.env.development` - Local development
- `.env.staging` - Staging environment
- `.env.production` - Production environment

---

## Contributing

We welcome contributions to KetoWell! Please follow these guidelines:

### Development Workflow

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Make your changes
4. Write or update tests
5. Ensure all tests pass (`pnpm test`)
6. Commit your changes (`git commit -m 'Add amazing feature'`)
7. Push to the branch (`git push origin feature/amazing-feature`)
8. Open a Pull Request

### Code Style

The project uses ESLint and Prettier for code formatting. Run the linter before committing:

```bash
pnpm lint
pnpm format
```

### Testing

Write tests for all new features and bug fixes:

```bash
pnpm test              # Run all tests
pnpm test:watch        # Watch mode
pnpm test:coverage     # Coverage report
```

---

## License

This project is licensed under the MIT License - see the LICENSE file for details.

---

## Support

For questions, issues, or feature requests:

- **Email**: support@ketowell.com
- **GitHub Issues**: https://github.com/kimhons/KetoWell/issues
- **Documentation**: https://docs.ketowell.com

---

## Acknowledgments

- Built with [Manus AI](https://manus.im)
- Payment processing by [Stripe](https://stripe.com)
- Email delivery by [Resend](https://resend.com)
- UI components by [shadcn/ui](https://ui.shadcn.com)

---

**KetoWell** - Empowering metabolic health through evidence-based ketogenic living.
