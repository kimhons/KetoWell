/**
 * API client functions for referral program
 */

export interface ReferralStats {
  code: string;
  usageCount: number;
  usageLimit: number;
  expiresAt: Date | null;
  referrals: Array<{
    referredEmail: string;
    rewardCode: string | null;
    createdAt: Date;
  }>;
}

/**
 * Get referral code for a purchase
 */
export async function getReferralCode(purchaseId: number): Promise<ReferralStats | null> {
  try {
    const response = await fetch(`/api/referral/code/${purchaseId}`);
    const data = await response.json();

    if (!response.ok || !data.success) {
      console.error("Failed to get referral code:", data.error);
      return null;
    }

    return {
      code: data.code,
      usageCount: data.usageCount,
      usageLimit: data.usageLimit,
      expiresAt: data.expiresAt ? new Date(data.expiresAt) : null,
      referrals: data.referrals || [],
    };
  } catch (error) {
    console.error("Error getting referral code:", error);
    return null;
  }
}

/**
 * Validate a referral code
 */
export async function validateReferralCode(code: string): Promise<{
  valid: boolean;
  discountType?: string;
  discountValue?: number;
  message?: string;
}> {
  try {
    const response = await fetch("/api/referral/validate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ code }),
    });

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error validating referral code:", error);
    return { valid: false, message: "Failed to validate code" };
  }
}

/**
 * Get referral stats by email
 */
export async function getReferralStatsByEmail(email: string): Promise<ReferralStats | null> {
  try {
    const response = await fetch(`/api/referral/stats/${encodeURIComponent(email)}`);
    const data = await response.json();

    if (!response.ok || !data.hasReferralCode) {
      return null;
    }

    return {
      code: data.code,
      usageCount: data.usageCount,
      usageLimit: data.usageLimit,
      expiresAt: data.expiresAt ? new Date(data.expiresAt) : null,
      referrals: data.referrals || [],
    };
  } catch (error) {
    console.error("Error getting referral stats:", error);
    return null;
  }
}
