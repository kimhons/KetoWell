import { Router } from "express";
import { createReferralCodeForPurchase, getReferralStats, trackReferral, validateReferralCode } from "../referral";
import { getDb } from "../db";
import { bookPurchases } from "../../drizzle/schema";
import { eq } from "drizzle-orm";

const router = Router();

/**
 * GET /api/referral/code/:purchaseId
 * Get or create referral code for a purchase
 */
router.get("/code/:purchaseId", async (req, res) => {
  try {
    const purchaseId = parseInt(req.params.purchaseId);
    
    if (isNaN(purchaseId)) {
      return res.status(400).json({ error: "Invalid purchase ID" });
    }

    // Get referral stats (includes code if it exists)
    let stats = await getReferralStats(purchaseId);

    // If no code exists, create one
    if (!stats) {
      const code = await createReferralCodeForPurchase({ purchaseId });
      stats = await getReferralStats(purchaseId);
    }

    res.json({ success: true, ...stats });
  } catch (error: any) {
    console.error("[Referral API] Error getting code:", error);
    res.status(500).json({ error: error.message || "Failed to get referral code" });
  }
});

/**
 * POST /api/referral/validate
 * Validate a referral code
 */
router.post("/validate", async (req, res) => {
  try {
    const { code } = req.body;

    if (!code) {
      return res.status(400).json({ error: "Referral code is required" });
    }

    const codeDetails = await validateReferralCode(code);

    if (!codeDetails) {
      return res.json({ valid: false, message: "Invalid or expired referral code" });
    }

    res.json({
      valid: true,
      discountType: codeDetails.discountType,
      discountValue: codeDetails.discountValue,
      message: `${codeDetails.discountValue}% off KetoWell Premium for 3 months!`,
    });
  } catch (error: any) {
    console.error("[Referral API] Error validating code:", error);
    res.status(500).json({ error: error.message || "Failed to validate referral code" });
  }
});

/**
 * POST /api/referral/track
 * Track a referral usage
 */
router.post("/track", async (req, res) => {
  try {
    const { referralCode, referredEmail, referredPurchaseId } = req.body;

    if (!referralCode || !referredEmail || !referredPurchaseId) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    await trackReferral({
      referralCode,
      referredEmail,
      referredPurchaseId: parseInt(referredPurchaseId),
    });

    res.json({ success: true, message: "Referral tracked successfully" });
  } catch (error: any) {
    console.error("[Referral API] Error tracking referral:", error);
    res.status(500).json({ error: error.message || "Failed to track referral" });
  }
});

/**
 * GET /api/referral/stats/:email
 * Get referral statistics for a customer by email
 */
router.get("/stats/:email", async (req, res) => {
  try {
    const { email } = req.params;
    const db = await getDb();
    
    if (!db) {
      return res.status(500).json({ error: "Database connection failed" });
    }

    // Find purchase by email
    const purchases = await db
      .select()
      .from(bookPurchases)
      .where(eq(bookPurchases.customerEmail, email))
      .limit(1);

    if (purchases.length === 0) {
      return res.status(404).json({ error: "No purchase found for this email" });
    }

    const stats = await getReferralStats(purchases[0].id);

    if (!stats) {
      return res.json({ hasReferralCode: false });
    }

    res.json({
      hasReferralCode: true,
      ...stats,
    });
  } catch (error: any) {
    console.error("[Referral API] Error getting stats:", error);
    res.status(500).json({ error: error.message || "Failed to get referral stats" });
  }
});

export default router;
