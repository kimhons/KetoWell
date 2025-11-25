import { int, mysqlEnum, mysqlTable, text, timestamp, varchar } from "drizzle-orm/mysql-core";

/**
 * Core user table backing auth flow.
 * Extend this file with additional tables as your product grows.
 * Columns use camelCase to match both database fields and generated types.
 */
export const users = mysqlTable("users", {
  /**
   * Surrogate primary key. Auto-incremented numeric value managed by the database.
   * Use this for relations between tables.
   */
  id: int("id").autoincrement().primaryKey(),
  /** Manus OAuth identifier (openId) returned from the OAuth callback. Unique per user. */
  openId: varchar("openId", { length: 64 }).notNull().unique(),
  name: text("name"),
  email: varchar("email", { length: 320 }),
  loginMethod: varchar("loginMethod", { length: 64 }),
  role: mysqlEnum("role", ["user", "admin"]).default("user").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  lastSignedIn: timestamp("lastSignedIn").defaultNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;

/**
 * Waitlist signups table for pre-launch email capture
 */
export const waitlistSignups = mysqlTable("waitlist_signups", {
  id: int("id").autoincrement().primaryKey(),
  email: varchar("email", { length: 320 }).notNull().unique(),
  firstName: varchar("first_name", { length: 100 }),
  platform: mysqlEnum("platform", ["ios", "android", "both"]).notNull(),
  newsletterOptin: int("newsletter_optin").notNull().default(0), // 0 = false, 1 = true (MySQL doesn't have native boolean)
  createdAt: timestamp("created_at").defaultNow().notNull(),
  confirmedAt: timestamp("confirmed_at"),
  confirmationToken: varchar("confirmation_token", { length: 64 }).unique(),
});

export type WaitlistSignup = typeof waitlistSignups.$inferSelect;
export type InsertWaitlistSignup = typeof waitlistSignups.$inferInsert;

/**
 * Newsletter subscriptions table
 */
export const newsletterSubscriptions = mysqlTable("newsletter_subscriptions", {
  id: int("id").autoincrement().primaryKey(),
  email: varchar("email", { length: 320 }).notNull().unique(),
  source: varchar("source", { length: 100 }), // 'homepage', 'blog', 'waitlist', etc.
  subscribedAt: timestamp("subscribed_at").defaultNow().notNull(),
  unsubscribedAt: timestamp("unsubscribed_at"),
  unsubscribeToken: varchar("unsubscribe_token", { length: 64 }).unique(),
});

export type NewsletterSubscription = typeof newsletterSubscriptions.$inferSelect;
export type InsertNewsletterSubscription = typeof newsletterSubscriptions.$inferInsert;

/**
 * Email sends tracking table for drip campaign
 */
export const emailSends = mysqlTable("email_sends", {
  id: int("id").autoincrement().primaryKey(),
  waitlistSignupId: int("waitlist_signup_id").notNull(),
  emailType: mysqlEnum("email_type", ["confirmation", "day_1", "day_3", "day_7"]).notNull(),
  sentAt: timestamp("sent_at").defaultNow().notNull(),
  status: mysqlEnum("status", ["sent", "failed", "bounced"]).notNull().default("sent"),
  resendMessageId: varchar("resend_message_id", { length: 100 }),
  errorMessage: text("error_message"),
});

export type EmailSend = typeof emailSends.$inferSelect;
export type InsertEmailSend = typeof emailSends.$inferInsert;
/**
 * Book purchases table
 * Tracks KetoWell book purchases and download access
 */
export const bookPurchases = mysqlTable("book_purchases", {
  id: int("id").autoincrement().primaryKey(),
  /** User who purchased the book (nullable for guest purchases) */
  userId: int("user_id"),
  /** Stripe Payment Intent ID for reference */
  stripePaymentIntentId: varchar("stripe_payment_intent_id", { length: 255 }).notNull().unique(),
  /** Customer email from Stripe */
  customerEmail: varchar("customer_email", { length: 320 }).notNull(),
  /** Customer name from Stripe */
  customerName: varchar("customer_name", { length: 255 }),
  /** Purchase amount in cents */
  amountPaid: int("amount_paid").notNull(),
  /** Currency code (e.g., 'usd') */
  currency: varchar("currency", { length: 3 }).notNull().default("usd"),
  /** Purchase timestamp */
  purchasedAt: timestamp("purchased_at").defaultNow().notNull(),
  /** Number of times the PDF has been downloaded */
  downloadCount: int("download_count").notNull().default(0),
  /** Last download timestamp */
  lastDownloadedAt: timestamp("last_downloaded_at"),
});

export type BookPurchase = typeof bookPurchases.$inferSelect;
export type InsertBookPurchase = typeof bookPurchases.$inferInsert;

/**
 * Referral codes for book purchase incentives
 * Customers get a unique code to share for rewards
 */
export const referralCodes = mysqlTable("referral_codes", {
  id: int("id").autoincrement().primaryKey(),
  /** Unique referral code (e.g., BOOKREF-ABC123) */
  code: varchar("code", { length: 50 }).notNull().unique(),
  /** User who owns this referral code */
  userId: int("user_id"),
  /** Book purchase that generated this code */
  purchaseId: int("purchase_id"),
  /** Type of discount: percentage or fixed */
  discountType: mysqlEnum("discount_type", ["percentage", "fixed"]).notNull(),
  /** Discount value: 20 for 20% off, or amount in cents for fixed */
  discountValue: int("discount_value").notNull(),
  /** How many times this code can be used */
  usageLimit: int("usage_limit").notNull().default(1),
  /** How many times this code has been used */
  usageCount: int("usage_count").notNull().default(0),
  /** Expiration timestamp */
  expiresAt: timestamp("expires_at"),
  /** Creation timestamp */
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export type ReferralCode = typeof referralCodes.$inferSelect;
export type InsertReferralCode = typeof referralCodes.$inferInsert;

/**
 * Track referral usage and conversions
 * Records when someone uses a referral code to purchase
 */
export const referralTracking = mysqlTable("referral_tracking", {
  id: int("id").autoincrement().primaryKey(),
  /** Referral code that was used */
  referralCode: varchar("referral_code", { length: 50 }).notNull(),
  /** Email of the person who was referred */
  referredEmail: varchar("referred_email", { length: 320 }).notNull(),
  /** Purchase made by the referred person */
  referredPurchaseId: int("referred_purchase_id"),
  /** Reward code earned by the referrer (for app discount) */
  rewardCode: varchar("reward_code", { length: 50 }),
  /** Whether reward email has been sent */
  rewardSent: int("reward_sent").notNull().default(0), // 0 = false, 1 = true
  /** When the referral was tracked */
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export type ReferralTracking = typeof referralTracking.$inferSelect;
export type InsertReferralTracking = typeof referralTracking.$inferInsert;
