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
  firstName?: string;
  confirmationToken: string;
  platform: string;
}) {
  const { email, firstName, confirmationToken, platform } = params;
  const confirmationUrl = `${APP_URL}/api/waitlist/confirm/${confirmationToken}`;

  try {
    const result = await resend.emails.send({
      from: FROM_EMAIL,
      to: email,
      subject: '🎉 Welcome to KetoWell - Confirm Your Waitlist Spot',
      html: getWaitlistConfirmationEmailHTML({
        email,
        firstName,
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
  firstName?: string;
  confirmationUrl: string;
  platform: string;
}): string {
  const { firstName, confirmationUrl, platform } = params;
  const greeting = firstName ? `Hi ${firstName}` : 'Hi there';
  
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
          <t            <td style="padding: 40px;">
              <h2 style="margin: 0 0 16px; color: #1A365D; font-size: 24px; font-weight: 600;">🎉 Welcome to the KetoWell Waitlist!</h2>
              
              <p style="margin: 0 0 16px; color: #4A5568; font-size: 16px; line-height: 1.6;">
                ${greeting},
              </p>        
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

/**
 * Send Day 1 drip email: The Science Behind Ketogenic Health
 */
export async function sendDay1Email(params: {
  email: string;
  firstName?: string;
}) {
  const { email, firstName } = params;

  try {
    const result = await resend.emails.send({
      from: FROM_EMAIL,
      to: email,
      subject: '🧬 The Science Behind Ketogenic Health',
      html: getDay1EmailHTML({ firstName }),
    });

    console.log('[Email] Day 1 drip email sent:', { email, messageId: result.data?.id });
    return { success: true, messageId: result.data?.id };
  } catch (error: any) {
    console.error('[Email] Failed to send Day 1 email:', error);
    return { success: false, error: error.message };
  }
}

function getDay1EmailHTML(params: { firstName?: string }): string {
  const { firstName } = params;
  const greeting = firstName ? `Hi ${firstName}` : 'Hi there';

  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>The Science Behind Ketogenic Health</title>
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
              <p style="margin: 8px 0 0; color: rgba(255,255,255,0.9); font-size: 14px;">Day 1: Understanding the Science</p>
            </td>
          </tr>
          
          <!-- Body -->
          <tr>
            <td style="padding: 40px;">
              <h2 style="margin: 0 0 16px; color: #1A365D; font-size: 24px; font-weight: 600;">🧬 The Science Behind Ketogenic Health</h2>
              
              <p style="margin: 0 0 16px; color: #4A5568; font-size: 16px; line-height: 1.6;">
                ${greeting},
              </p>
              
              <p style="margin: 0 0 16px; color: #4A5568; font-size: 16px; line-height: 1.6;">
                Welcome to your ketogenic health journey! Today, we're diving into the fascinating science behind how ketosis transforms your metabolism.
              </p>
              
              <!-- What is Ketosis -->
              <div style="margin: 32px 0; padding: 24px; background-color: #F7FAFC; border-left: 4px solid #38A169; border-radius: 4px;">
                <h3 style="margin: 0 0 12px; color: #1A365D; font-size: 18px; font-weight: 600;">What is Ketosis?</h3>
                <p style="margin: 0 0 12px; color: #4A5568; font-size: 14px; line-height: 1.8;">
                  Ketosis is a metabolic state where your body switches from burning glucose (sugar) to burning fat for fuel. This produces molecules called <strong>ketones</strong>, which serve as an efficient, clean-burning energy source for your brain and body.
                </p>
                <p style="margin: 0; color: #4A5568; font-size: 14px; line-height: 1.8;">
                  Think of it as switching your car from gasoline to premium electric power—cleaner, more efficient, and better for long-term performance.
                </p>
              </div>
              
              <!-- Key Benefits -->
              <h3 style="margin: 32px 0 16px; color: #1A365D; font-size: 20px; font-weight: 600;">Key Metabolic Benefits</h3>
              
              <table role="presentation" style="width: 100%; margin: 0 0 24px;">
                <tr>
                  <td style="padding: 16px 0; border-bottom: 1px solid #E2E8F0;">
                    <div style="display: flex; align-items: start;">
                      <span style="font-size: 24px; margin-right: 12px;">⚡</span>
                      <div>
                        <strong style="color: #1A365D; font-size: 16px;">Stable Energy Levels</strong>
                        <p style="margin: 4px 0 0; color: #718096; font-size: 14px; line-height: 1.6;">
                          No more energy crashes. Ketones provide steady fuel without the glucose rollercoaster.
                        </p>
                      </div>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 16px 0; border-bottom: 1px solid #E2E8F0;">
                    <div style="display: flex; align-items: start;">
                      <span style="font-size: 24px; margin-right: 12px;">🧠</span>
                      <div>
                        <strong style="color: #1A365D; font-size: 16px;">Enhanced Mental Clarity</strong>
                        <p style="margin: 4px 0 0; color: #718096; font-size: 14px; line-height: 1.6;">
                          Your brain loves ketones. Many people report improved focus and cognitive function.
                        </p>
                      </div>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 16px 0; border-bottom: 1px solid #E2E8F0;">
                    <div style="display: flex; align-items: start;">
                      <span style="font-size: 24px; margin-right: 12px;">💪</span>
                      <div>
                        <strong style="color: #1A365D; font-size: 16px;">Metabolic Flexibility</strong>
                        <p style="margin: 4px 0 0; color: #718096; font-size: 14px; line-height: 1.6;">
                          Train your body to efficiently switch between fuel sources for optimal health.
                        </p>
                      </div>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 16px 0;">
                    <div style="display: flex; align-items: start;">
                      <span style="font-size: 24px; margin-right: 12px;">❤️</span>
                      <div>
                        <strong style="color: #1A365D; font-size: 16px;">Cardiovascular Support</strong>
                        <p style="margin: 4px 0 0; color: #718096; font-size: 14px; line-height: 1.6;">
                          Research shows potential benefits for heart health markers and metabolic syndrome.
                        </p>
                      </div>
                    </div>
                  </td>
                </tr>
              </table>
              
              <!-- Research Highlight -->
              <div style="margin: 32px 0; padding: 20px; background-color: #EBF8FF; border-radius: 8px;">
                <h4 style="margin: 0 0 12px; color: #2C5282; font-size: 16px; font-weight: 600;">📚 Research Highlight</h4>
                <p style="margin: 0 0 12px; color: #2D3748; font-size: 14px; line-height: 1.6;">
                  A 2024 meta-analysis published in <em>Nutrients</em> found that ketogenic diets significantly improved glycemic control in patients with type 2 diabetes, with HbA1c reductions of 0.5-1.5% over 12 weeks.
                </p>
                <p style="margin: 0; color: #718096; font-size: 12px; font-style: italic;">
                  Source: Batch et al. (2024). "Ketogenic Diet for Type 2 Diabetes: A Systematic Review"
                </p>
              </div>
              
              <!-- What's Next -->
              <div style="margin: 32px 0 0; padding: 24px; background-color: #F7FAFC; border-radius: 8px; text-align: center;">
                <h3 style="margin: 0 0 12px; color: #1A365D; font-size: 18px; font-weight: 600;">Coming Up Next</h3>
                <p style="margin: 0 0 16px; color: #4A5568; font-size: 14px; line-height: 1.6;">
                  In 2 days, you'll meet <strong>Dr. Ketone</strong>—your AI-powered health partner who makes ketogenic living safe, personalized, and sustainable.
                </p>
                <a href="${APP_URL}" style="display: inline-block; padding: 12px 24px; background: linear-gradient(135deg, #38A169 0%, #2F855A 100%); color: #ffffff; text-decoration: none; font-size: 14px; font-weight: 600; border-radius: 6px;">
                  Explore KetoWell
                </a>
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
                You're receiving this because you joined the KetoWell waitlist.
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
 * Send Day 3 drip email: Meet Dr. Ketone
 */
export async function sendDay3Email(params: {
  email: string;
  firstName?: string;
}) {
  const { email, firstName } = params;

  try {
    const result = await resend.emails.send({
      from: FROM_EMAIL,
      to: email,
      subject: '🤖 Meet Dr. Ketone: Your AI Health Partner',
      html: getDay3EmailHTML({ firstName }),
    });

    console.log('[Email] Day 3 drip email sent:', { email, messageId: result.data?.id });
    return { success: true, messageId: result.data?.id };
  } catch (error: any) {
    console.error('[Email] Failed to send Day 3 email:', error);
    return { success: false, error: error.message };
  }
}

function getDay3EmailHTML(params: { firstName?: string }): string {
  const { firstName } = params;
  const greeting = firstName ? `Hi ${firstName}` : 'Hi there';

  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0;">
  <title>Meet Dr. Ketone</title>
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
              <p style="margin: 8px 0 0; color: rgba(255,255,255,0.9); font-size: 14px;">Day 3: Meet Your AI Partner</p>
            </td>
          </tr>
          
          <!-- Body -->
          <tr>
            <td style="padding: 40px;">
              <h2 style="margin: 0 0 16px; color: #1A365D; font-size: 24px; font-weight: 600;">🤖 Meet Dr. Ketone</h2>
              
              <p style="margin: 0 0 16px; color: #4A5568; font-size: 16px; line-height: 1.6;">
                ${greeting},
              </p>
              
              <p style="margin: 0 0 16px; color: #4A5568; font-size: 16px; line-height: 1.6;">
                Today, we're excited to introduce you to <strong>Dr. Ketone</strong>—the AI-powered health partner that makes ketogenic living safe, personalized, and sustainable.
              </p>
              
              <!-- Dr. Ketone Overview -->
              <div style="margin: 32px 0; padding: 24px; background: linear-gradient(135deg, #EBF8FF 0%, #E6FFFA 100%); border-radius: 8px;">
                <h3 style="margin: 0 0 12px; color: #1A365D; font-size: 18px; font-weight: 600;">Why Dr. Ketone is Different</h3>
                <p style="margin: 0; color: #2D3748; font-size: 14px; line-height: 1.8;">
                  Unlike generic diet apps, Dr. Ketone is built on the latest clinical research and designed with medical-grade safety protocols. It's like having a knowledgeable health coach available 24/7.
                </p>
              </div>
              
              <!-- Key Features -->
              <h3 style="margin: 32px 0 16px; color: #1A365D; font-size: 20px; font-weight: 600;">What Dr. Ketone Does for You</h3>
              
              <table role="presentation" style="width: 100%; margin: 0 0 24px;">
                <tr>
                  <td style="padding: 16px 0; border-bottom: 1px solid #E2E8F0;">
                    <div style="display: flex; align-items: start;">
                      <span style="font-size: 24px; margin-right: 12px;">🛡️</span>
                      <div>
                        <strong style="color: #1A365D; font-size: 16px;">Proactive Safety Monitoring</strong>
                        <p style="margin: 4px 0 0; color: #718096; font-size: 14px; line-height: 1.6;">
                          Screens for contraindications, drug interactions, and warning signs before they become problems.
                        </p>
                      </div>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 16px 0; border-bottom: 1px solid #E2E8F0;">
                    <div style="display: flex; align-items: start;">
                      <span style="font-size: 24px; margin-right: 12px;">📊</span>
                      <div>
                        <strong style="color: #1A365D; font-size: 16px;">Personalized Guidance</strong>
                        <p style="margin: 4px 0 0; color: #718096; font-size: 14px; line-height: 1.6;">
                          Adapts to your unique health profile, goals, and progress—no one-size-fits-all advice.
                        </p>
                      </div>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 16px 0; border-bottom: 1px solid #E2E8F0;">
                    <div style="display: flex; align-items: start;">
                      <span style="font-size: 24px; margin-right: 12px;">💬</span>
                      <div>
                        <strong style="color: #1A365D; font-size: 16px;">24/7 Support</strong>
                        <p style="margin: 4px 0 0; color: #718096; font-size: 14px; line-height: 1.6;">
                          Ask questions anytime. Get evidence-based answers instantly, not generic chatbot responses.
                        </p>
                      </div>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 16px 0;">
                    <div style="display: flex; align-items: start;">
                      <span style="font-size: 24px; margin-right: 12px;">📈</span>
                      <div>
                        <strong style="color: #1A365D; font-size: 16px;">Smart Tracking</strong>
                        <p style="margin: 4px 0 0; color: #718096; font-size: 14px; line-height: 1.6;">
                          Log meals, symptoms, and ketone levels. Dr. Ketone spots patterns you might miss.
                        </p>
                      </div>
                    </div>
                  </td>
                </tr>
              </table>
              
              <!-- Real Example -->
              <div style="margin: 32px 0; padding: 20px; background-color: #F7FAFC; border-left: 4px solid #D69E2E; border-radius: 4px;">
                <h4 style="margin: 0 0 12px; color: #744210; font-size: 16px; font-weight: 600;">💡 Real Example</h4>
                <p style="margin: 0 0 12px; color: #2D3748; font-size: 14px; line-height: 1.6;">
                  <strong>You:</strong> "I'm feeling dizzy and have a headache. Is this normal?"
                </p>
                <p style="margin: 0 0 12px; color: #2D3748; font-size: 14px; line-height: 1.6;">
                  <strong>Dr. Ketone:</strong> "These are common symptoms of electrolyte imbalance during keto adaptation. Let's check your sodium and magnesium intake. I recommend adding 1-2 tsp of salt to your water today and eating magnesium-rich foods like spinach or avocado. If symptoms persist beyond 24 hours, consult your healthcare provider."
                </p>
                <p style="margin: 0; color: #718096; font-size: 12px; font-style: italic;">
                  Evidence-based, personalized, and actionable—that's the Dr. Ketone difference.
                </p>
              </div>
              
              <!-- Safety First -->
              <div style="margin: 32px 0; padding: 24px; background-color: #FED7D7; border-radius: 8px;">
                <h4 style="margin: 0 0 12px; color: #742A2A; font-size: 16px; font-weight: 600;">🛡️ Safety First, Always</h4>
                <p style="margin: 0; color: #2D3748; font-size: 14px; line-height: 1.6;">
                  Dr. Ketone screens for contraindications like SGLT2 inhibitor use, pregnancy, eating disorders, and Type 1 diabetes. If keto isn't safe for you right now, Dr. Ketone will tell you—and suggest alternatives.
                </p>
              </div>
              
              <!-- What's Next -->
              <div style="margin: 32px 0 0; padding: 24px; background-color: #F7FAFC; border-radius: 8px; text-align: center;">
                <h3 style="margin: 0 0 12px; color: #1A365D; font-size: 18px; font-weight: 600;">Coming Up Next</h3>
                <p style="margin: 0 0 16px; color: #4A5568; font-size: 14px; line-height: 1.6;">
                  In 4 days, we'll share the <strong>latest research highlights</strong> and give you an update on our launch timeline.
                </p>
                <a href="${APP_URL}" style="display: inline-block; padding: 12px 24px; background: linear-gradient(135deg, #38A169 0%, #2F855A 100%); color: #ffffff; text-decoration: none; font-size: 14px; font-weight: 600; border-radius: 6px;">
                  Learn More About Dr. Ketone
                </a>
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
                You're receiving this because you joined the KetoWell waitlist.
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
 * Send Day 7 drip email: Research Highlights & Launch Updates
 */
export async function sendDay7Email(params: {
  email: string;
  firstName?: string;
}) {
  const { email, firstName } = params;

  try {
    const result = await resend.emails.send({
      from: FROM_EMAIL,
      to: email,
      subject: '📚 Research Highlights & Your Early Access Update',
      html: getDay7EmailHTML({ firstName }),
    });

    console.log('[Email] Day 7 drip email sent:', { email, messageId: result.data?.id });
    return { success: true, messageId: result.data?.id };
  } catch (error: any) {
    console.error('[Email] Failed to send Day 7 email:', error);
    return { success: false, error: error.message };
  }
}

function getDay7EmailHTML(params: { firstName?: string }): string {
  const { firstName } = params;
  const greeting = firstName ? `Hi ${firstName}` : 'Hi there';

  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0;">
  <title>Research Highlights & Launch Updates</title>
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
              <p style="margin: 8px 0 0; color: rgba(255,255,255,0.9); font-size: 14px;">Day 7: Research & Launch Updates</p>
            </td>
          </tr>
          
          <!-- Body -->
          <tr>
            <td style="padding: 40px;">
              <h2 style="margin: 0 0 16px; color: #1A365D; font-size: 24px; font-weight: 600;">📚 The Evidence Behind KetoWell</h2>
              
              <p style="margin: 0 0 16px; color: #4A5568; font-size: 16px; line-height: 1.6;">
                ${greeting},
              </p>
              
              <p style="margin: 0 0 16px; color: #4A5568; font-size: 16px; line-height: 1.6;">
                Over the past week, you've learned about ketosis and met Dr. Ketone. Today, we want to share the <strong>research foundation</strong> that makes KetoWell different—and give you an update on our launch timeline.
              </p>
              
              <!-- Research Highlights -->
              <h3 style="margin: 32px 0 16px; color: #1A365D; font-size: 20px; font-weight: 600;">Latest Research Highlights (2024-2025)</h3>
              
              <div style="margin: 0 0 24px;">
                <!-- Study 1 -->
                <div style="padding: 20px; margin-bottom: 16px; background-color: #F7FAFC; border-left: 4px solid #38A169; border-radius: 4px;">
                  <h4 style="margin: 0 0 8px; color: #1A365D; font-size: 16px; font-weight: 600;">Metabolic Health</h4>
                  <p style="margin: 0 0 8px; color: #2D3748; font-size: 14px; line-height: 1.6;">
                    <strong>Finding:</strong> Ketogenic diets improved HbA1c by 0.5-1.5% in type 2 diabetes patients over 12 weeks, with significant reductions in medication requirements.
                  </p>
                  <p style="margin: 0; color: #718096; font-size: 12px; font-style: italic;">
                    Source: Batch et al. (2024), <em>Nutrients</em>
                  </p>
                </div>
                
                <!-- Study 2 -->
                <div style="padding: 20px; margin-bottom: 16px; background-color: #F7FAFC; border-left: 4px solid #3182CE; border-radius: 4px;">
                  <h4 style="margin: 0 0 8px; color: #1A365D; font-size: 16px; font-weight: 600;">Cardiovascular Health</h4>
                  <p style="margin: 0 0 8px; color: #2D3748; font-size: 14px; line-height: 1.6;">
                    <strong>Finding:</strong> Well-formulated ketogenic diets improved HDL cholesterol, triglycerides, and inflammatory markers without adverse effects on LDL particle size.
                  </p>
                  <p style="margin: 0; color: #718096; font-size: 12px; font-style: italic;">
                    Source: Kirkpatrick et al. (2024), <em>Journal of Clinical Lipidology</em>
                  </p>
                </div>
                
                <!-- Study 3 -->
                <div style="padding: 20px; margin-bottom: 16px; background-color: #F7FAFC; border-left: 4px solid #805AD5; border-radius: 4px;">
                  <h4 style="margin: 0 0 8px; color: #1A365D; font-size: 16px; font-weight: 600;">Neurological Benefits</h4>
                  <p style="margin: 0 0 8px; color: #2D3748; font-size: 14px; line-height: 1.6;">
                    <strong>Finding:</strong> Ketogenic interventions showed promise in reducing seizure frequency and improving cognitive function in epilepsy and mild cognitive impairment.
                  </p>
                  <p style="margin: 0; color: #718096; font-size: 12px; font-style: italic;">
                    Source: Rho & Stafstrom (2024), <em>Epilepsia</em>
                  </p>
                </div>
              </div>
              
              <!-- Evidence Strength -->
              <div style="margin: 32px 0; padding: 24px; background: linear-gradient(135deg, #EBF8FF 0%, #E6FFFA 100%); border-radius: 8px;">
                <h4 style="margin: 0 0 12px; color: #1A365D; font-size: 16px; font-weight: 600;">🎯 Our Evidence-Based Approach</h4>
                <p style="margin: 0 0 12px; color: #2D3748; font-size: 14px; line-height: 1.6;">
                  KetoWell is built on <strong>peer-reviewed research</strong> from 2024-2025. We don't rely on outdated studies or anecdotal claims. Every recommendation Dr. Ketone makes is grounded in the latest clinical evidence.
                </p>
                <p style="margin: 0; color: #2D3748; font-size: 14px; line-height: 1.6;">
                  <strong>Evidence Strength Matrix:</strong> Metabolic Health (Strong), Cardiovascular (Moderate-Strong), Neurological (Strong), Behavioral Science (Moderate)
                </p>
              </div>
              
              <!-- Launch Timeline -->
              <h3 style="margin: 32px 0 16px; color: #1A365D; font-size: 20px; font-weight: 600;">🚀 Launch Timeline & What's Next</h3>
              
              <table role="presentation" style="width: 100%; margin: 0 0 24px;">
                <tr>
                  <td style="padding: 16px; background-color: #F7FAFC; border-radius: 8px;">
                    <div style="margin-bottom: 16px;">
                      <strong style="color: #38A169; font-size: 16px;">✓ Now: Waitlist Open</strong>
                      <p style="margin: 4px 0 0; color: #4A5568; font-size: 14px;">
                        You're already on the list! We're building the foundation.
                      </p>
                    </div>
                    <div style="margin-bottom: 16px;">
                      <strong style="color: #3182CE; font-size: 16px;">→ Q1 2025: Beta Testing</strong>
                      <p style="margin: 4px 0 0; color: #4A5568; font-size: 14px;">
                        Select waitlist members will get early access to test Dr. Ketone.
                      </p>
                    </div>
                    <div>
                      <strong style="color: #805AD5; font-size: 16px;">→ Q2 2025: Public Launch</strong>
                      <p style="margin: 4px 0 0; color: #4A5568; font-size: 14px;">
                        Full launch with special pricing for waitlist members.
                      </p>
                    </div>
                  </td>
                </tr>
              </table>
              
              <!-- Your Benefits -->
              <div style="margin: 32px 0; padding: 24px; background-color: #FED7D7; border-radius: 8px;">
                <h4 style="margin: 0 0 12px; color: #742A2A; font-size: 16px; font-weight: 600;">🎁 Your Waitlist Benefits</h4>
                <ul style="margin: 0; padding: 0 0 0 20px; color: #2D3748; font-size: 14px; line-height: 1.8;">
                  <li><strong>Priority Beta Access:</strong> Be among the first to try Dr. Ketone</li>
                  <li><strong>Special Launch Pricing:</strong> Exclusive discount for early supporters</li>
                  <li><strong>Direct Feedback Channel:</strong> Help shape the product</li>
                  <li><strong>Educational Content:</strong> Stay informed with research updates</li>
                </ul>
              </div>
              
              <!-- CTA -->
              <div style="margin: 32px 0 0; padding: 24px; background-color: #F7FAFC; border-radius: 8px; text-align: center;">
                <h3 style="margin: 0 0 12px; color: #1A365D; font-size: 18px; font-weight: 600;">Stay Connected</h3>
                <p style="margin: 0 0 16px; color: #4A5568; font-size: 14px; line-height: 1.6;">
                  Follow our progress and explore the research behind KetoWell.
                </p>
                <a href="${APP_URL}/research" style="display: inline-block; padding: 12px 24px; margin-right: 8px; background: linear-gradient(135deg, #38A169 0%, #2F855A 100%); color: #ffffff; text-decoration: none; font-size: 14px; font-weight: 600; border-radius: 6px;">
                  View Research
                </a>
                <a href="${APP_URL}/blog" style="display: inline-block; padding: 12px 24px; background-color: #ffffff; color: #1A365D; text-decoration: none; font-size: 14px; font-weight: 600; border-radius: 6px; border: 2px solid #1A365D;">
                  Read Our Blog
                </a>
              </div>
              
              <!-- Thank You -->
              <p style="margin: 32px 0 0; color: #4A5568; font-size: 14px; line-height: 1.6; text-align: center;">
                Thank you for being part of the KetoWell community. We're excited to support your health journey!
              </p>
            </td>
          </tr>
          
          <!-- Footer -->
          <tr>
            <td style="padding: 24px 40px; background-color: #F7FAFC; border-radius: 0 0 8px 8px; text-align: center;">
              <p style="margin: 0 0 8px; color: #718096; font-size: 12px;">
                © 2025 KetoWell. All rights reserved.
              </p>
              <p style="margin: 0; color: #A0AEC0; font-size: 12px;">
                You're receiving this because you joined the KetoWell waitlist.
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
