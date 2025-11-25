import { Router, Request } from "express";
import Stripe from "stripe";
import { getDb } from "../db";
import { bookPurchases } from "../../drizzle/schema";
import { STRIPE_PRODUCTS } from "../stripe-products";
import { eq } from "drizzle-orm";

// Extend Express Request type to include user
interface AuthRequest extends Request {
  user?: {
    id: number;
    email?: string;
    name?: string;
  };
}

const router = Router();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-11-17.clover",
});

/**
 * Create Stripe Checkout session for book purchase
 */
router.post("/create-checkout-session", async (req: AuthRequest, res) => {
  try {
    const { userEmail, userName } = req.body;
    const origin = req.headers.origin || "http://localhost:3000";

    // Create Stripe Checkout session
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      payment_method_types: ["card"],
      line_items: [
        {
          price: STRIPE_PRODUCTS.KETOWELL_BOOK.priceId,
          quantity: 1,
        },
      ],
      customer_email: userEmail,
      client_reference_id: req.user?.id?.toString() || undefined,
      metadata: {
        user_id: req.user?.id?.toString() || "",
        customer_email: userEmail || "",
        customer_name: userName || "",
        product_type: "book",
      },
      success_url: `${origin}/book/purchase-success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/book?canceled=true`,
      allow_promotion_codes: true,
    });

    res.json({ url: session.url });
  } catch (error: any) {
    console.error("[Book Purchase] Error creating checkout session:", error);
    res.status(500).json({ error: error.message });
  }
});

/**
 * Verify purchase and get download link
 */
router.get("/verify-purchase/:sessionId", async (req, res) => {
  try {
    const { sessionId } = req.params;

    // Retrieve the session from Stripe
    const session = await stripe.checkout.sessions.retrieve(sessionId);

    if (session.payment_status !== "paid") {
      return res.status(400).json({ error: "Payment not completed" });
    }

    const db = await getDb();
    if (!db) {
      return res.status(500).json({ error: "Database not available" });
    }

    // Check if purchase already exists
    const existingPurchase = await db
      .select()
      .from(bookPurchases)
      .where(eq(bookPurchases.stripePaymentIntentId, session.payment_intent as string))
      .limit(1);

    if (existingPurchase.length === 0) {
      // Create purchase record
      await db.insert(bookPurchases).values({
        userId: session.metadata?.user_id ? parseInt(session.metadata.user_id) : null,
        stripePaymentIntentId: session.payment_intent as string,
        customerEmail: session.customer_details?.email || session.metadata?.customer_email || "",
        customerName: session.customer_details?.name || session.metadata?.customer_name || "",
        amountPaid: session.amount_total || 999,
        currency: session.currency || "usd",
      });
    }

    res.json({
      success: true,
      customerEmail: session.customer_details?.email,
      customerName: session.customer_details?.name,
    });
  } catch (error: any) {
    console.error("[Book Purchase] Error verifying purchase:", error);
    res.status(500).json({ error: error.message });
  }
});

/**
 * Get download link for purchased book
 */
router.get("/download", async (req, res) => {
  try {
    const { email, paymentIntentId } = req.query;

    if (!email || !paymentIntentId) {
      return res.status(400).json({ error: "Email and payment intent ID required" });
    }

    const db = await getDb();
    if (!db) {
      return res.status(500).json({ error: "Database not available" });
    }

    // Verify purchase exists
    const purchase = await db
      .select()
      .from(bookPurchases)
      .where(eq(bookPurchases.stripePaymentIntentId, paymentIntentId as string))
      .limit(1);

    if (purchase.length === 0) {
      return res.status(404).json({ error: "Purchase not found" });
    }

    if (purchase[0].customerEmail.toLowerCase() !== (email as string).toLowerCase()) {
      return res.status(403).json({ error: "Email does not match purchase record" });
    }

    // Check download limit (max 10 downloads per purchase)
    if (purchase[0].downloadCount >= 10) {
      return res.status(429).json({ error: "Download limit reached. Please contact support." });
    }

    // Update download count
    await db
      .update(bookPurchases)
      .set({
        downloadCount: purchase[0].downloadCount + 1,
        lastDownloadedAt: new Date(),
      })
      .where(eq(bookPurchases.id, purchase[0].id));

    // Return the PDF file path
    res.json({
      success: true,
      downloadUrl: "/ketowell-book.pdf",
      downloadsRemaining: 10 - (purchase[0].downloadCount + 1),
    });
  } catch (error: any) {
    console.error("[Book Download] Error:", error);
    res.status(500).json({ error: error.message });
  }
});

/**
 * Check if user has already purchased the book
 */
router.get("/check-purchase", async (req, res) => {
  try {
    const { email } = req.query;

    if (!email) {
      return res.json({ hasPurchased: false });
    }

    const db = await getDb();
    if (!db) {
      return res.json({ hasPurchased: false });
    }

    const purchase = await db
      .select()
      .from(bookPurchases)
      .where(eq(bookPurchases.customerEmail, email as string))
      .limit(1);

    res.json({
      hasPurchased: purchase.length > 0,
      purchaseDate: purchase[0]?.purchasedAt,
    });
  } catch (error: any) {
    console.error("[Book Purchase Check] Error:", error);
    res.status(500).json({ error: error.message });
  }
});

export default router;
