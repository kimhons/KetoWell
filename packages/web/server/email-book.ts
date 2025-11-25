import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

// Email configuration
const FROM_EMAIL = process.env.RESEND_FROM_EMAIL || 'onboarding@resend.dev';
const APP_URL = process.env.VITE_APP_URL || 'http://localhost:3000';

/**
 * Send book purchase confirmation email with download link
 */
export async function sendBookPurchaseEmail(params: {
  email: string;
  customerName?: string;
  paymentIntentId: string;
  amountPaid: number;
  currency: string;
}) {
  const { email, customerName, paymentIntentId, amountPaid, currency } = params;
  
  // Create download URL with authentication parameters
  const downloadUrl = `${APP_URL}/api/book/download?email=${encodeURIComponent(email)}&paymentIntentId=${encodeURIComponent(paymentIntentId)}`;
  
  // Format amount (convert from cents to dollars)
  const formattedAmount = `$${(amountPaid / 100).toFixed(2)}`;

  try {
    const result = await resend.emails.send({
      from: FROM_EMAIL,
      to: email,
      subject: '📚 Your KetoWell Book is Ready - Download Now!',
      html: getBookPurchaseEmailHTML({
        email,
        customerName,
        downloadUrl,
        amountPaid: formattedAmount,
        currency: currency.toUpperCase(),
        paymentIntentId,
      }),
    });

    console.log('[Email] Book purchase confirmation sent:', { email, messageId: result.data?.id });
    return { success: true, messageId: result.data?.id };
  } catch (error: any) {
    console.error('[Email] Failed to send book purchase confirmation:', error);
    return { success: false, error: error.message };
  }
}

/**
 * HTML template for book purchase confirmation email
 */
function getBookPurchaseEmailHTML(params: {
  email: string;
  customerName?: string;
  downloadUrl: string;
  amountPaid: string;
  currency: string;
  paymentIntentId: string;
}): string {
  const { customerName, downloadUrl, amountPaid, currency, paymentIntentId } = params;
  const greeting = customerName ? `Hi ${customerName}` : 'Hi there';
  const currentYear = new Date().getFullYear();

  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Your KetoWell Book Purchase</title>
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f5f5f5;">
  <table role="presentation" style="width: 100%; border-collapse: collapse;">
    <tr>
      <td align="center" style="padding: 40px 20px;">
        <table role="presentation" style="width: 600px; max-width: 100%; background-color: #ffffff; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
          <!-- Header -->
          <tr>
            <td style="padding: 40px 40px 20px; text-align: center; background: linear-gradient(135deg, #0EA5E9 0%, #10B981 100%); border-radius: 8px 8px 0 0;">
              <h1 style="margin: 0; color: #ffffff; font-size: 32px; font-weight: bold;">KetoWell</h1>
              <p style="margin: 8px 0 0; color: rgba(255,255,255,0.9); font-size: 16px;">Your AI-Native Partner in Ketogenic Health</p>
            </td>
          </tr>
          
          <!-- Success Icon -->
          <tr>
            <td style="padding: 40px 40px 20px; text-align: center;">
              <div style="width: 80px; height: 80px; margin: 0 auto; background-color: #10B981; border-radius: 50%; display: flex; align-items: center; justify-content: center;">
                <span style="font-size: 48px; color: #ffffff;">✓</span>
              </div>
            </td>
          </tr>
          
          <!-- Body -->
          <tr>
            <td style="padding: 0 40px 40px;">
              <h2 style="margin: 0 0 16px; color: #1A365D; font-size: 24px; font-weight: 600; text-align: center;">Purchase Successful!</h2>
              
              <p style="margin: 0 0 16px; color: #4A5568; font-size: 16px; line-height: 1.6;">
                ${greeting},
              </p>
              
              <p style="margin: 0 0 24px; color: #4A5568; font-size: 16px; line-height: 1.6;">
                Thank you for purchasing <strong>KetoWell: Transform Your Health with the Science of Ketogenic Living</strong>. Your book is ready to download!
              </p>
              
              <!-- Download Button -->
              <table role="presentation" style="margin: 0 0 32px; width: 100%;">
                <tr>
                  <td align="center">
                    <table role="presentation">
                      <tr>
                        <td style="border-radius: 6px; background: linear-gradient(135deg, #0EA5E9 0%, #0284C7 100%); box-shadow: 0 4px 6px rgba(14, 165, 233, 0.3);">
                          <a href="${downloadUrl}" style="display: inline-block; padding: 16px 48px; color: #ffffff; text-decoration: none; font-size: 18px; font-weight: 600; border-radius: 6px;">
                            📥 Download Your Book Now
                          </a>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
              
              <!-- Purchase Details -->
              <div style="background-color: #F7FAFC; border-radius: 6px; padding: 24px; margin: 0 0 24px;">
                <h3 style="margin: 0 0 16px; color: #2D3748; font-size: 18px; font-weight: 600;">Purchase Details</h3>
                <table role="presentation" style="width: 100%; border-collapse: collapse;">
                  <tr>
                    <td style="padding: 8px 0; color: #718096; font-size: 14px;">Product:</td>
                    <td style="padding: 8px 0; color: #2D3748; font-size: 14px; font-weight: 600; text-align: right;">KetoWell Book (Digital PDF)</td>
                  </tr>
                  <tr>
                    <td style="padding: 8px 0; color: #718096; font-size: 14px;">Amount Paid:</td>
                    <td style="padding: 8px 0; color: #2D3748; font-size: 14px; font-weight: 600; text-align: right;">${amountPaid} ${currency}</td>
                  </tr>
                  <tr>
                    <td style="padding: 8px 0; color: #718096; font-size: 14px;">Transaction ID:</td>
                    <td style="padding: 8px 0; color: #2D3748; font-size: 14px; font-family: monospace; text-align: right;">${paymentIntentId.substring(0, 20)}...</td>
                  </tr>
                  <tr>
                    <td style="padding: 8px 0; color: #718096; font-size: 14px;">Downloads Allowed:</td>
                    <td style="padding: 8px 0; color: #2D3748; font-size: 14px; font-weight: 600; text-align: right;">10 downloads</td>
                  </tr>
                </table>
              </div>
              
              <!-- What's Inside -->
              <div style="border-left: 4px solid #10B981; padding-left: 16px; margin: 0 0 24px;">
                <h3 style="margin: 0 0 12px; color: #2D3748; font-size: 18px; font-weight: 600;">What's Inside Your Book</h3>
                <ul style="margin: 0; padding: 0 0 0 20px; color: #4A5568; font-size: 14px; line-height: 1.8;">
                  <li>56,620 words across 303 pages</li>
                  <li>200+ peer-reviewed studies cited</li>
                  <li>11 comprehensive chapters covering all aspects of ketogenic health</li>
                  <li>Evidence-based protocols for diabetes, brain health, cardiovascular health, and more</li>
                  <li>Integration with KetoWell AI app for personalized guidance</li>
                  <li>Safety-first approach with detailed contraindications</li>
                </ul>
              </div>
              
              <!-- Social Sharing -->
              <div style="background-color: #F0FDF4; border-radius: 6px; padding: 24px; margin: 0 0 24px; border: 2px solid #10B981;">
                <h3 style="margin: 0 0 16px; color: #065F46; font-size: 18px; font-weight: 600;">💚 Share Your Purchase</h3>
                <p style="margin: 0 0 16px; color: #047857; font-size: 14px; line-height: 1.6;">
                  Help others discover evidence-based ketogenic health information! Share your purchase on social media:
                </p>
                <table role="presentation" style="width: 100%;">
                  <tr>
                    <td align="center">
                      <table role="presentation">
                        <tr>
                          <td style="padding: 0 8px;">
                            <a href="https://twitter.com/intent/tweet?text=Just%20got%20the%20KetoWell%20book!%20%F0%9F%93%9A%20Evidence-based%20ketogenic%20health%20guide%20with%20200%2B%20studies.%20Highly%20recommend!%20%23KetoWell%20%23KetoLife%20%23MetabolicHealth&url=https://ketowell.com/book" style="display: inline-block; padding: 10px 20px; background-color: #000000; color: #ffffff; text-decoration: none; border-radius: 6px; font-size: 14px; font-weight: 600;">
                              Share on X
                            </a>
                          </td>
                          <td style="padding: 0 8px;">
                            <a href="https://www.facebook.com/sharer/sharer.php?u=https://ketowell.com/book" style="display: inline-block; padding: 10px 20px; background-color: #1877F2; color: #ffffff; text-decoration: none; border-radius: 6px; font-size: 14px; font-weight: 600;">
                              Share on Facebook
                            </a>
                          </td>
                          <td style="padding: 0 8px;">
                            <a href="https://www.linkedin.com/sharing/share-offsite/?url=https://ketowell.com/book" style="display: inline-block; padding: 10px 20px; background-color: #0A66C2; color: #ffffff; text-decoration: none; border-radius: 6px; font-size: 14px; font-weight: 600;">
                              Share on LinkedIn
                            </a>
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>
                </table>
              </div>

              <!-- Next Steps -->
              <div style="background-color: #EBF8FF; border-radius: 6px; padding: 24px; margin: 0 0 24px;">
                <h3 style="margin: 0 0 16px; color: #2C5282; font-size: 18px; font-weight: 600;">📖 What's Next?</h3>
                <ol style="margin: 0; padding: 0 0 0 20px; color: #2D3748; font-size: 14px; line-height: 1.8;">
                  <li style="margin-bottom: 8px;"><strong>Read the Introduction</strong> to understand the metabolic health crisis and why ketogenic diets work</li>
                  <li style="margin-bottom: 8px;"><strong>Download the KetoWell app</strong> for personalized guidance from Dr. Ketone, our AI health agent</li>
                  <li style="margin-bottom: 8px;"><strong>Join our community</strong> for support, recipes, and success stories</li>
                </ol>
              </div>
              
              <!-- Support -->
              <div style="border-top: 1px solid #E2E8F0; padding-top: 24px;">
                <p style="margin: 0 0 8px; color: #4A5568; font-size: 14px; line-height: 1.6;">
                  <strong>Need help?</strong> If you have any questions or issues accessing your book, please contact us at <a href="mailto:support@ketowell.com" style="color: #0EA5E9; text-decoration: none;">support@ketowell.com</a>
                </p>
                <p style="margin: 0; color: #718096; font-size: 12px; line-height: 1.6;">
                  <strong>Download Link Expires:</strong> Your download link is valid for 90 days and allows up to 10 downloads. Please save your PDF to a secure location.
                </p>
              </div>
            </td>
          </tr>
          
          <!-- Footer -->
          <tr>
            <td style="padding: 24px 40px; background-color: #F7FAFC; border-radius: 0 0 8px 8px; text-align: center;">
              <p style="margin: 0 0 8px; color: #718096; font-size: 12px;">
                © ${currentYear} KetoWell. All rights reserved.
              </p>
              <p style="margin: 0; color: #A0AEC0; font-size: 11px;">
                This email was sent to ${params.email} because you purchased the KetoWell book.
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `;
}
