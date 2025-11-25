/**
 * Book purchase API client functions
 */

export interface CheckoutSessionResponse {
  url: string;
}

export interface PurchaseVerificationResponse {
  success: boolean;
  customerEmail?: string;
  customerName?: string;
}

export interface DownloadResponse {
  success: boolean;
  downloadUrl: string;
  downloadsRemaining: number;
}

export interface PurchaseCheckResponse {
  hasPurchased: boolean;
  purchaseDate?: Date;
}

/**
 * Create a Stripe Checkout session for book purchase
 */
export async function createBookCheckoutSession(
  referralCode?: string,
  userEmail?: string,
  userName?: string
): Promise<CheckoutSessionResponse> {
  const response = await fetch("/api/book/create-checkout-session", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      userEmail,
      userName,
      referralCode,
    }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || "Failed to create checkout session");
  }

  return response.json();
}

/**
 * Verify purchase after successful payment
 */
export async function verifyBookPurchase(
  sessionId: string
): Promise<PurchaseVerificationResponse> {
  const response = await fetch(`/api/book/verify-purchase/${sessionId}`);

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || "Failed to verify purchase");
  }

  return response.json();
}

/**
 * Get download link for purchased book
 */
export async function getBookDownloadLink(
  email: string,
  paymentIntentId: string
): Promise<DownloadResponse> {
  const response = await fetch(
    `/api/book/download?email=${encodeURIComponent(email)}&paymentIntentId=${encodeURIComponent(paymentIntentId)}`
  );

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || "Failed to get download link");
  }

  return response.json();
}

/**
 * Check if user has already purchased the book
 */
export async function checkBookPurchase(email: string): Promise<PurchaseCheckResponse> {
  const response = await fetch(`/api/book/check-purchase?email=${encodeURIComponent(email)}`);

  if (!response.ok) {
    return { hasPurchased: false };
  }

  return response.json();
}
