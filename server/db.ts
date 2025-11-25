import { eq, and, isNotNull, lte } from "drizzle-orm";
import { drizzle } from "drizzle-orm/mysql2";
import { InsertUser, users, waitlistSignups, InsertWaitlistSignup, newsletterSubscriptions, InsertNewsletterSubscription, emailSends, InsertEmailSend } from "../drizzle/schema";
import { ENV } from './_core/env';

let _db: ReturnType<typeof drizzle> | null = null;

// Lazily create the drizzle instance so local tooling can run without a DB.
export async function getDb() {
  if (!_db && process.env.DATABASE_URL) {
    try {
      _db = drizzle(process.env.DATABASE_URL);
    } catch (error) {
      console.warn("[Database] Failed to connect:", error);
      _db = null;
    }
  }
  return _db;
}

export async function upsertUser(user: InsertUser): Promise<void> {
  if (!user.openId) {
    throw new Error("User openId is required for upsert");
  }

  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot upsert user: database not available");
    return;
  }

  try {
    const values: InsertUser = {
      openId: user.openId,
    };
    const updateSet: Record<string, unknown> = {};

    const textFields = ["name", "email", "loginMethod"] as const;
    type TextField = (typeof textFields)[number];

    const assignNullable = (field: TextField) => {
      const value = user[field];
      if (value === undefined) return;
      const normalized = value ?? null;
      values[field] = normalized;
      updateSet[field] = normalized;
    };

    textFields.forEach(assignNullable);

    if (user.lastSignedIn !== undefined) {
      values.lastSignedIn = user.lastSignedIn;
      updateSet.lastSignedIn = user.lastSignedIn;
    }
    if (user.role !== undefined) {
      values.role = user.role;
      updateSet.role = user.role;
    } else if (user.openId === ENV.ownerOpenId) {
      values.role = 'admin';
      updateSet.role = 'admin';
    }

    if (!values.lastSignedIn) {
      values.lastSignedIn = new Date();
    }

    if (Object.keys(updateSet).length === 0) {
      updateSet.lastSignedIn = new Date();
    }

    await db.insert(users).values(values).onDuplicateKeyUpdate({
      set: updateSet,
    });
  } catch (error) {
    console.error("[Database] Failed to upsert user:", error);
    throw error;
  }
}

export async function getUserByOpenId(openId: string) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get user: database not available");
    return undefined;
  }

  const result = await db.select().from(users).where(eq(users.openId, openId)).limit(1);

  return result.length > 0 ? result[0] : undefined;
}

/**
 * Waitlist signup helpers
 */
export async function createWaitlistSignup(signup: InsertWaitlistSignup) {
  const db = await getDb();
  if (!db) {
    throw new Error("Database not available");
  }

  try {
    const result = await db.insert(waitlistSignups).values(signup);
    return result;
  } catch (error: any) {
    // Handle duplicate email error
    // Drizzle wraps database errors, so check both error.code and error.cause.code
    const errorCode = error.code || error.cause?.code;
    const errorMessage = error.message || '';
    const errorString = String(error);
    const causeMessage = error.cause ? String(error.cause) : '';
    
    // Check for various duplicate entry indicators
    if (errorCode === 'ER_DUP_ENTRY' || 
        errorCode === 'SQLITE_CONSTRAINT' || 
        errorCode === 'SQLITE_CONSTRAINT_UNIQUE' ||
        errorMessage.includes('UNIQUE constraint failed') ||
        errorMessage.includes('unique constraint') ||
        errorMessage.toLowerCase().includes('duplicate') ||
        errorString.toLowerCase().includes('unique') ||
        errorString.toLowerCase().includes('duplicate') ||
        causeMessage.toLowerCase().includes('unique') ||
        causeMessage.toLowerCase().includes('duplicate')) {
      throw new Error("This email is already on the waitlist");
    }
    console.error("[Database] Failed to create waitlist signup:", error);
    throw error;
  }
}

export async function getWaitlistSignupByEmail(email: string) {
  const db = await getDb();
  if (!db) {
    return undefined;
  }

  const result = await db
    .select()
    .from(waitlistSignups)
    .where(eq(waitlistSignups.email, email))
    .limit(1);

  return result.length > 0 ? result[0] : undefined;
}

export async function getWaitlistSignupByToken(token: string) {
  const db = await getDb();
  if (!db) {
    return undefined;
  }

  const result = await db
    .select()
    .from(waitlistSignups)
    .where(eq(waitlistSignups.confirmationToken, token))
    .limit(1);

  return result.length > 0 ? result[0] : undefined;
}

export async function confirmWaitlistSignup(token: string) {
  const db = await getDb();
  if (!db) {
    throw new Error("Database not available");
  }

  await db
    .update(waitlistSignups)
    .set({ confirmedAt: new Date() })
    .where(eq(waitlistSignups.confirmationToken, token));
}

export async function getWaitlistCount() {
  const db = await getDb();
  if (!db) {
    return 0;
  }

  const result = await db.select().from(waitlistSignups);
  return result.length;
}

/**
 * Newsletter subscription helpers
 */
export async function createNewsletterSubscription(subscription: InsertNewsletterSubscription) {
  const db = await getDb();
  if (!db) {
    throw new Error("Database not available");
  }

  try {
    const result = await db.insert(newsletterSubscriptions).values(subscription);
    return result;
  } catch (error: any) {
    // Handle duplicate email error
    // Drizzle wraps database errors, so check both error.code and error.cause.code
    const errorCode = error.code || error.cause?.code;
    const errorMessage = error.message || '';
    const errorString = String(error);
    const causeMessage = error.cause ? String(error.cause) : '';
    
    // Check for various duplicate entry indicators
    if (errorCode === 'ER_DUP_ENTRY' || 
        errorCode === 'SQLITE_CONSTRAINT' || 
        errorCode === 'SQLITE_CONSTRAINT_UNIQUE' ||
        errorMessage.includes('UNIQUE constraint failed') ||
        errorMessage.includes('unique constraint') ||
        errorMessage.toLowerCase().includes('duplicate') ||
        errorString.toLowerCase().includes('unique') ||
        errorString.toLowerCase().includes('duplicate') ||
        causeMessage.toLowerCase().includes('unique') ||
        causeMessage.toLowerCase().includes('duplicate')) {
      throw new Error("This email is already subscribed");
    }
    console.error("[Database] Failed to create newsletter subscription:", error);
    throw error;
  }
}

export async function getNewsletterSubscriptionByEmail(email: string) {
  const db = await getDb();
  if (!db) {
    return undefined;
  }

  const result = await db
    .select()
    .from(newsletterSubscriptions)
    .where(eq(newsletterSubscriptions.email, email))
    .limit(1);

  return result.length > 0 ? result[0] : undefined;
}

/**
 * ========================================
 * EMAIL SENDS (DRIP CAMPAIGN) HELPERS
 * ========================================
 */

// emailSends and InsertEmailSend are imported at the top of the file

/**
 * Record that an email was sent
 */
export async function createEmailSend(emailSend: InsertEmailSend) {
  const db = await getDb();
  if (!db) {
    throw new Error("Database not available");
  }

  try {
    const result = await db.insert(emailSends).values(emailSend);
    return result;
  } catch (error: any) {
    console.error("[Database] Failed to create email send record:", error);
    throw error;
  }
}

/**
 * Check if a specific email type has been sent to a waitlist signup
 */
export async function hasEmailBeenSent(
  waitlistSignupId: number,
  emailType: "confirmation" | "day_1" | "day_3" | "day_7"
): Promise<boolean> {
  const db = await getDb();
  if (!db) {
    throw new Error("Database not available");
  }

  try {
    const results = await db
      .select()
      .from(emailSends)
      .where(
        and(
          eq(emailSends.waitlistSignupId, waitlistSignupId),
          eq(emailSends.emailType, emailType)
        )
      )
      .limit(1);

    return results.length > 0;
  } catch (error: any) {
    console.error("[Database] Failed to check email send status:", error);
    return false;
  }
}

/**
 * Get waitlist members who are due for a specific drip email
 * Returns members who:
 * 1. Have confirmed their email
 * 2. Haven't received the specified email yet
 * 3. Confirmed at least X days ago (based on emailType)
 */
export async function getWaitlistMembersForDripEmail(
  emailType: "day_1" | "day_3" | "day_7"
): Promise<Array<{ id: number; email: string; firstName: string | null; confirmedAt: Date }>> {
  const db = await getDb();
  if (!db) {
    throw new Error("Database not available");
  }

  // Determine how many days ago they should have confirmed
  const daysAgo = emailType === "day_1" ? 1 : emailType === "day_3" ? 3 : 7;
  const targetDate = new Date();
  targetDate.setDate(targetDate.getDate() - daysAgo);

  try {
    // Get all confirmed waitlist signups
    const confirmedSignups = await db
      .select({
        id: waitlistSignups.id,
        email: waitlistSignups.email,
        firstName: waitlistSignups.firstName,
        confirmedAt: waitlistSignups.confirmedAt,
      })
      .from(waitlistSignups)
      .where(
        and(
          isNotNull(waitlistSignups.confirmedAt),
          lte(waitlistSignups.confirmedAt, targetDate)
        )
      );

    // Filter out those who have already received this email
    const eligibleMembers = [];
    for (const signup of confirmedSignups) {
      const alreadySent = await hasEmailBeenSent(signup.id, emailType);
      if (!alreadySent && signup.confirmedAt) {
        eligibleMembers.push({
          id: signup.id,
          email: signup.email,
          firstName: signup.firstName,
          confirmedAt: signup.confirmedAt,
        });
      }
    }

    return eligibleMembers;
  } catch (error: any) {
    console.error("[Database] Failed to get waitlist members for drip email:", error);
    throw error;
  }
}

/**
 * ========================================
 * ANALYTICS HELPERS
 * ========================================
 */

import { count, sql } from "drizzle-orm";

/**
 * Get total number of waitlist signups
 */
export async function getTotalSignups(): Promise<number> {
  const db = await getDb();
  if (!db) {
    throw new Error("Database not available");
  }

  try {
    const result = await db.select({ count: count() }).from(waitlistSignups);
    return result[0]?.count || 0;
  } catch (error: any) {
    console.error("[Database] Failed to get total signups:", error);
    throw error;
  }
}

/**
 * Get number of confirmed waitlist signups
 */
export async function getConfirmedSignups(): Promise<number> {
  const db = await getDb();
  if (!db) {
    throw new Error("Database not available");
  }

  try {
    const result = await db
      .select({ count: count() })
      .from(waitlistSignups)
      .where(isNotNull(waitlistSignups.confirmedAt));
    return result[0]?.count || 0;
  } catch (error: any) {
    console.error("[Database] Failed to get confirmed signups:", error);
    throw error;
  }
}

/**
 * Get platform breakdown (iOS, Android, Both)
 */
export async function getPlatformBreakdown(): Promise<{
  ios: number;
  android: number;
  both: number;
}> {
  const db = await getDb();
  if (!db) {
    throw new Error("Database not available");
  }

  try {
    const results = await db
      .select({
        platform: waitlistSignups.platform,
        count: count(),
      })
      .from(waitlistSignups)
      .groupBy(waitlistSignups.platform);

    const breakdown = { ios: 0, android: 0, both: 0 };
    results.forEach((row) => {
      if (row.platform === "ios") breakdown.ios = row.count;
      else if (row.platform === "android") breakdown.android = row.count;
      else if (row.platform === "both") breakdown.both = row.count;
    });

    return breakdown;
  } catch (error: any) {
    console.error("[Database] Failed to get platform breakdown:", error);
    throw error;
  }
}

/**
 * Get signup trends over time (last 30 days)
 */
export async function getSignupTrends(): Promise<
  Array<{ date: string; signups: number }>
> {
  const db = await getDb();
  if (!db) {
    throw new Error("Database not available");
  }

  try {
    // Get all signups from the last 30 days
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    const allSignups = await db
      .select({
        createdAt: waitlistSignups.createdAt,
      })
      .from(waitlistSignups)
      .where(sql`${waitlistSignups.createdAt} >= ${thirtyDaysAgo}`);

    // Group by date in JavaScript (works for both MySQL and SQLite)
    const dateMap = new Map<string, number>();
    allSignups.forEach((signup) => {
      const date = signup.createdAt.toISOString().split('T')[0]; // YYYY-MM-DD
      dateMap.set(date, (dateMap.get(date) || 0) + 1);
    });

    // Convert to array and sort by date
    const results = Array.from(dateMap.entries())
      .map(([date, signups]) => ({ date, signups }))
      .sort((a, b) => a.date.localeCompare(b.date));

    return results;
  } catch (error: any) {
    console.error("[Database] Failed to get signup trends:", error);
    throw error;
  }
}

/**
 * Get email campaign statistics
 */
export async function getEmailCampaignStats(): Promise<{
  confirmation: { sent: number; failed: number };
  day_1: { sent: number; failed: number };
  day_3: { sent: number; failed: number };
  day_7: { sent: number; failed: number };
}> {
  const db = await getDb();
  if (!db) {
    throw new Error("Database not available");
  }

  try {
    const results = await db
      .select({
        emailType: emailSends.emailType,
        status: emailSends.status,
        count: count(),
      })
      .from(emailSends)
      .groupBy(emailSends.emailType, emailSends.status);

    const stats = {
      confirmation: { sent: 0, failed: 0 },
      day_1: { sent: 0, failed: 0 },
      day_3: { sent: 0, failed: 0 },
      day_7: { sent: 0, failed: 0 },
    };

    results.forEach((row) => {
      const emailType = row.emailType as keyof typeof stats;
      if (stats[emailType]) {
        if (row.status === "sent") {
          stats[emailType].sent = row.count;
        } else if (row.status === "failed") {
          stats[emailType].failed = row.count;
        }
      }
    });

    return stats;
  } catch (error: any) {
    console.error("[Database] Failed to get email campaign stats:", error);
    throw error;
  }
}

/**
 * Get recent waitlist signups (last 50)
 */
export async function getRecentSignups(): Promise<
  Array<{
    id: number;
    email: string;
    firstName: string | null;
    platform: string;
    newsletterOptin: number;
    createdAt: Date;
    confirmedAt: Date | null;
  }>
> {
  const db = await getDb();
  if (!db) {
    throw new Error("Database not available");
  }

  try {
    const results = await db
      .select({
        id: waitlistSignups.id,
        email: waitlistSignups.email,
        firstName: waitlistSignups.firstName,
        platform: waitlistSignups.platform,
        newsletterOptin: waitlistSignups.newsletterOptin,
        createdAt: waitlistSignups.createdAt,
        confirmedAt: waitlistSignups.confirmedAt,
      })
      .from(waitlistSignups)
      .orderBy(sql`${waitlistSignups.createdAt} DESC`)
      .limit(50);

    return results;
  } catch (error: any) {
    console.error("[Database] Failed to get recent signups:", error);
    throw error;
  }
}

/**
 * Get total newsletter subscribers
 */
export async function getTotalNewsletterSubscribers(): Promise<number> {
  const db = await getDb();
  if (!db) {
    throw new Error("Database not available");
  }

  try {
    const result = await db
      .select({ count: count() })
      .from(newsletterSubscriptions)
      .where(isNotNull(newsletterSubscriptions.subscribedAt));
    return result[0]?.count || 0;
  } catch (error: any) {
    console.error("[Database] Failed to get newsletter subscribers:", error);
    throw error;
  }
}
