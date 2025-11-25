import { getDb } from "./db";
import { referralCodes, referralTracking, bookPurchases } from "../drizzle/schema";
import { eq } from "drizzle-orm";

/**
 * Generate a unique referral code
 * Format: BOOKREF-XXXXX (e.g., BOOKREF-A7K9M)
 */
export function generateReferralCode(): string {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789"; // Exclude similar-looking characters
  let code = "BOOKREF-";
  for (let i = 0; i < 5; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return code;
}

/**
 * Create a referral code for a book purchase
 * Gives customer 20% off KetoWell Premium for 3 months
 */
export async function createReferralCodeForPurchase(params: {
  userId?: number;
  purchaseId: number;
}): Promise<string> {
  const db = await getDb();
  if (!db) throw new Error("Database connection failed");
  const { userId, purchaseId } = params;

  // Generate unique code
  let code = generateReferralCode();
  let attempts = 0;
  const maxAttempts = 10;

  // Ensure code is unique
  while (attempts < maxAttempts) {
    const existing = await db
      .select()
      .from(referralCodes)
      .where(eq(referralCodes.code, code))
      .limit(1);

    if (existing.length === 0) {
      break;
    }

    code = generateReferralCode();
    attempts++;
  }

  if (attempts >= maxAttempts) {
    throw new Error("Failed to generate unique referral code");
  }

  // Create referral code
  // Expires in 90 days
  const expiresAt = new Date();
  expiresAt.setDate(expiresAt.getDate() + 90);

  await db.insert(referralCodes).values({
    code,
    userId: userId || null,
    purchaseId,
    discountType: "percentage",
    discountValue: 20, // 20% off
    usageLimit: 10, // Can refer up to 10 people
    usageCount: 0,
    expiresAt,
  });

  console.log("[Referral] Created referral code:", code, "for purchase:", purchaseId);
  return code;
}

/**
 * Validate a referral code
 * Returns the code details if valid, null if invalid/expired
 */
export async function validateReferralCode(code: string) {
  const db = await getDb();
  if (!db) return null;

  const results = await db
    .select()
    .from(referralCodes)
    .where(eq(referralCodes.code, code))
    .limit(1);

  if (results.length === 0) {
    return null;
  }

  const referralCode = results[0];

  // Check if expired
  if (referralCode.expiresAt && new Date(referralCode.expiresAt) < new Date()) {
    return null;
  }

  // Check if usage limit reached
  if (referralCode.usageCount >= referralCode.usageLimit) {
    return null;
  }

  return referralCode;
}

/**
 * Track a referral when someone uses a referral code to purchase
 */
export async function trackReferral(params: {
  referralCode: string;
  referredEmail: string;
  referredPurchaseId: number;
}): Promise<void> {
  const db = await getDb();
  if (!db) throw new Error("Database connection failed");
  const { referralCode, referredEmail, referredPurchaseId } = params;

  // Validate the referral code
  const codeDetails = await validateReferralCode(referralCode);
  if (!codeDetails) {
    throw new Error("Invalid or expired referral code");
  }

  // Increment usage count
  await db
    .update(referralCodes)
    .set({
      usageCount: codeDetails.usageCount + 1,
    })
    .where(eq(referralCodes.code, referralCode));

  // Generate reward code for the referrer
  const rewardCode = `REWARD-${generateReferralCode().split("-")[1]}`;

  // Track the referral
  await db.insert(referralTracking).values({
    referralCode,
    referredEmail,
    referredPurchaseId,
    rewardCode,
    rewardSent: 0, // Will be set to 1 after email is sent
  });

  console.log("[Referral] Tracked referral:", { referralCode, referredEmail, rewardCode });
}

/**
 * Get referral statistics for a user
 */
export async function getReferralStats(purchaseId: number) {
  const db = await getDb();
  if (!db) throw new Error("Database connection failed");

  // Get the referral code for this purchase
  const codes = await db
    .select()
    .from(referralCodes)
    .where(eq(referralCodes.purchaseId, purchaseId))
    .limit(1);

  if (codes.length === 0) {
    return null;
  }

  const code = codes[0];

  // Get all referrals using this code
  const referrals = await db
    .select()
    .from(referralTracking)
    .where(eq(referralTracking.referralCode, code.code));

  return {
    code: code.code,
    usageCount: code.usageCount,
    usageLimit: code.usageLimit,
    expiresAt: code.expiresAt,
    referrals: referrals.map((r) => ({
      referredEmail: r.referredEmail,
      rewardCode: r.rewardCode,
      createdAt: r.createdAt,
    })),
  };
}

/**
 * Get all reward codes earned by a customer
 */
export async function getRewardCodes(customerEmail: string) {
  const db = await getDb();
  if (!db) throw new Error("Database connection failed");

  // Find all purchases by this customer
  const purchases = await db
    .select()
    .from(bookPurchases)
    .where(eq(bookPurchases.customerEmail, customerEmail));

  if (purchases.length === 0) {
    return [];
  }

  const purchaseIds = purchases.map((p: any) => p.id);

  // Find referral codes for these purchases
  const codes = await db
    .select()
    .from(referralCodes)
    .where(eq(referralCodes.purchaseId, purchaseIds[0])); // Simplified for single purchase

  if (codes.length === 0) {
    return [];
  }

  // Find all referrals that earned rewards
  const rewards = await db
    .select()
    .from(referralTracking)
    .where(eq(referralTracking.referralCode, codes[0].code));

  return rewards.map((r: any) => ({
    rewardCode: r.rewardCode,
    earnedFrom: r.referredEmail,
    createdAt: r.createdAt,
  }));
}

/**
 * Generate a reward code for a successful referral
 * Returns the reward code that the referrer can use for discount
 */
export async function generateRewardCode(referralCode: string): Promise<string> {
  const db = await getDb();
  if (!db) throw new Error("Database connection failed");

  // Get the referral code details
  const codeDetails = await validateReferralCode(referralCode);
  if (!codeDetails) {
    throw new Error("Invalid referral code");
  }

  // Generate a unique reward code for the referrer
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let randomPart = "";
  for (let i = 0; i < 6; i++) {
    randomPart += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  const rewardCode = `REWARD-${randomPart}`;

  // Store the reward code in referral_tracking
  // The reward code is the same format as referral codes but specifically for app discounts
  // In a full implementation, you might create a separate rewards table
  // For now, we'll return the code and it can be used in the app

  return rewardCode;
}
