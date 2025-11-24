import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

// Email configuration
const FROM_EMAIL = process.env.RESEND_FROM_EMAIL || 'onboarding@resend.dev';
const APP_URL = process.env.VITE_APP_URL || 'http://localhost:3000';

/**
 * Send waitlist confirmation email
 */
export async function sendWaitlistConfirmationEmail(params: {
  email: string;
  confirmationToken: string;
  platform: string;
}) {
  const { email, confirmationToken, platform } = params;
  const confirmationUrl = `${APP_URL}/api/waitlist/confirm/${confirmationToken}`;

  try {
    const result = await resend.emails.send({
      from: FROM_EMAIL,
      to: email,
      subject: '🎉 Welcome to KetoWell - Confirm Your Waitlist Spot',
      html: getWaitlistConfirmationEmailHTML({
        email,
        confirmationUrl,
        platform,
      }),
    });

    console.log('[Email] Waitlist confirmation sent:', { email, messageId: result.data?.id });
    return { success: true, messageId: result.data?.id };
  } catch (error: any) {
    console.error('[Email] Failed to send waitlist confirmation:', error);
    return { success: false, error: error.message };
  }
}

/**
 * HTML template for waitlist confirmation email
 */
function getWaitlistConfirmationEmailHTML(params: {
  email: string;
  confirmationUrl: string;
  platform: string;
}): string {
  const { confirmationUrl, platform } = params;
  
  const platformText = 
    platform === 'ios' ? 'iOS' :
    platform === 'android' ? 'Android' :
    'iOS and Android';

  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Welcome to KetoWell</title>
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f5f5f5;">
  <table role="presentation" style="width: 100%; border-collapse: collapse;">
    <tr>
      <td align="center" style="padding: 40px 0;">
        <table role="presentation" style="width: 600px; max-width: 100%; background-color: #ffffff; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
          <!-- Header -->
          <tr>
            <td style="padding: 40px 40px 20px; text-align: center; background: linear-gradient(135deg, #1A365D 0%, #2C5282 100%); border-radius: 8px 8px 0 0;">
              <h1 style="margin: 0; color: #ffffff; font-size: 32px; font-weight: bold;">KetoWell</h1>
              <p style="margin: 8px 0 0; color: rgba(255,255,255,0.9); font-size: 16px;">Your AI-Native Partner in Ketogenic Health</p>
            </td>
          </tr>
          
          <!-- Body -->
          <tr>
            <td style="padding: 40px;">
              <h2 style="margin: 0 0 16px; color: #1A365D; font-size: 24px; font-weight: 600;">🎉 You're on the Waitlist!</h2>
              
              <p style="margin: 0 0 16px; color: #4A5568; font-size: 16px; line-height: 1.6;">
                Thank you for joining the KetoWell waitlist! We're excited to have you as part of our early community.
              </p>
              
              <p style="margin: 0 0 24px; color: #4A5568; font-size: 16px; line-height: 1.6;">
                <strong>Platform preference:</strong> ${platformText}
              </p>
              
              <!-- CTA Button -->
              <table role="presentation" style="margin: 0 0 24px;">
                <tr>
                  <td style="border-radius: 6px; background: linear-gradient(135deg, #38A169 0%, #2F855A 100%);">
                    <a href="${confirmationUrl}" style="display: inline-block; padding: 14px 32px; color: #ffffff; text-decoration: none; font-size: 16px; font-weight: 600; border-radius: 6px;">
                      Confirm Your Spot
                    </a>
                  </td>
                </tr>
              </table>
              
              <p style="margin: 0 0 16px; color: #718096; font-size: 14px; line-height: 1.6;">
                Or copy and paste this link into your browser:<br>
                <a href="${confirmationUrl}" style="color: #2C5282; word-break: break-all;">${confirmationUrl}</a>
              </p>
              
              <!-- What's Next -->
              <div style="margin: 32px 0 0; padding: 20px; background-color: #F7FAFC; border-left: 4px solid #38A169; border-radius: 4px;">
                <h3 style="margin: 0 0 12px; color: #1A365D; font-size: 18px; font-weight: 600;">What's Next?</h3>
                <ul style="margin: 0; padding: 0 0 0 20px; color: #4A5568; font-size: 14px; line-height: 1.8;">
                  <li>You'll receive updates on our development progress</li>
                  <li>Get early access to Dr. Ketone when we launch (Q2 2025)</li>
                  <li>Exclusive beta testing opportunities</li>
                  <li>Special launch pricing for waitlist members</li>
                </ul>
              </div>
              
              <!-- Features Preview -->
              <div style="margin: 32px 0 0;">
                <h3 style="margin: 0 0 16px; color: #1A365D; font-size: 18px; font-weight: 600;">Why KetoWell?</h3>
                <table role="presentation" style="width: 100%;">
                  <tr>
                    <td style="padding: 12px 0; color: #4A5568; font-size: 14px;">
                      <strong style="color: #1A365D;">🤖 AI-Powered Guidance</strong><br>
                      Dr. Ketone provides 24/7 personalized support
                    </td>
                  </tr>
                  <tr>
                    <td style="padding: 12px 0; color: #4A5568; font-size: 14px;">
                      <strong style="color: #1A365D;">🛡️ Medical-Grade Safety</strong><br>
                      Comprehensive screening for contraindications
                    </td>
                  </tr>
                  <tr>
                    <td style="padding: 12px 0; color: #4A5568; font-size: 14px;">
                      <strong style="color: #1A365D;">📊 Evidence-Based</strong><br>
                      Built on 2024-2025 peer-reviewed research
                    </td>
                  </tr>
                </table>
              </div>
            </td>
          </tr>
          
          <!-- Footer -->
          <tr>
            <td style="padding: 24px 40px; background-color: #F7FAFC; border-radius: 0 0 8px 8px; text-align: center;">
              <p style="margin: 0 0 8px; color: #718096; font-size: 12px;">
                © 2025 KetoWell. All rights reserved.
              </p>
              <p style="margin: 0; color: #A0AEC0; font-size: 12px;">
                This email was sent because you signed up for the KetoWell waitlist.
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `.trim();
}

/**
 * Test function to verify Resend API key is valid
 */
export async function testResendConnection() {
  try {
    // Send a test email to verify the API key works
    const result = await resend.emails.send({
      from: FROM_EMAIL,
      to: 'test@example.com', // This won't actually send, just validates the API key
      subject: 'Test Email',
      html: '<p>Test</p>',
    });
    
    return { success: true, data: result.data };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}
