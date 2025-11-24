/**
 * Drip Email Campaign Job
 * 
 * This script runs daily to send educational emails to waitlist members
 * on Day 1, Day 3, and Day 7 after they confirm their email.
 * 
 * Schedule: Run once per day (recommended: 10:00 AM UTC)
 * 
 * Usage:
 *   node --loader tsx server/jobs/send-drip-emails.ts
 * 
 * Or via cron:
 *   0 10 * * * cd /path/to/project && node --loader tsx server/jobs/send-drip-emails.ts
 */

import { getWaitlistMembersForDripEmail, createEmailSend } from "../db";
import { sendDay1Email, sendDay3Email, sendDay7Email } from "../email";

type EmailType = "day_1" | "day_3" | "day_7";

interface EmailResult {
  email: string;
  success: boolean;
  error?: string;
}

/**
 * Send a specific drip email to eligible members
 */
async function sendDripEmailBatch(emailType: EmailType): Promise<EmailResult[]> {
  console.log(`[Drip Campaign] Checking for ${emailType} emails to send...`);

  try {
    // Get members who are due for this email
    const members = await getWaitlistMembersForDripEmail(emailType);

    if (members.length === 0) {
      console.log(`[Drip Campaign] No members due for ${emailType} email`);
      return [];
    }

    console.log(`[Drip Campaign] Found ${members.length} members due for ${emailType} email`);

    const results: EmailResult[] = [];

    // Send emails with rate limiting (max 10 per second to respect Resend limits)
    for (let i = 0; i < members.length; i++) {
      const member = members[i];

      try {
        // Select the appropriate email function
        let emailResult;
        if (emailType === "day_1") {
          emailResult = await sendDay1Email({ 
            email: member.email,
            firstName: member.firstName || undefined,
          });
        } else if (emailType === "day_3") {
          emailResult = await sendDay3Email({ 
            email: member.email,
            firstName: member.firstName || undefined,
          });
        } else {
          emailResult = await sendDay7Email({ 
            email: member.email,
            firstName: member.firstName || undefined,
          });
        }

        if (emailResult.success) {
          // Record the email send in the database
          await createEmailSend({
            waitlistSignupId: member.id,
            emailType: emailType,
            status: "sent",
            resendMessageId: emailResult.messageId || null,
          });

          results.push({
            email: member.email,
            success: true,
          });

          console.log(`[Drip Campaign] ✓ Sent ${emailType} email to ${member.email}`);
        } else {
          // Record the failure
          await createEmailSend({
            waitlistSignupId: member.id,
            emailType: emailType,
            status: "failed",
            errorMessage: emailResult.error || "Unknown error",
          });

          results.push({
            email: member.email,
            success: false,
            error: emailResult.error,
          });

          console.error(`[Drip Campaign] ✗ Failed to send ${emailType} email to ${member.email}:`, emailResult.error);
        }

        // Rate limiting: wait 100ms between emails (max 10/sec)
        if (i < members.length - 1) {
          await new Promise(resolve => setTimeout(resolve, 100));
        }
      } catch (error: any) {
        console.error(`[Drip Campaign] Error processing ${member.email}:`, error);
        results.push({
          email: member.email,
          success: false,
          error: error.message,
        });
      }
    }

    return results;
  } catch (error: any) {
    console.error(`[Drip Campaign] Failed to send ${emailType} emails:`, error);
    throw error;
  }
}

/**
 * Main function to run all drip email campaigns
 */
async function runDripCampaign() {
  console.log("[Drip Campaign] Starting daily drip email job...");
  const startTime = Date.now();

  try {
    // Send Day 1 emails
    const day1Results = await sendDripEmailBatch("day_1");

    // Send Day 3 emails
    const day3Results = await sendDripEmailBatch("day_3");

    // Send Day 7 emails
    const day7Results = await sendDripEmailBatch("day_7");

    // Summary
    const totalSent = [...day1Results, ...day3Results, ...day7Results].filter(r => r.success).length;
    const totalFailed = [...day1Results, ...day3Results, ...day7Results].filter(r => !r.success).length;
    const duration = ((Date.now() - startTime) / 1000).toFixed(2);

    console.log("[Drip Campaign] Job completed:");
    console.log(`  - Day 1 emails: ${day1Results.filter(r => r.success).length} sent, ${day1Results.filter(r => !r.success).length} failed`);
    console.log(`  - Day 3 emails: ${day3Results.filter(r => r.success).length} sent, ${day3Results.filter(r => !r.success).length} failed`);
    console.log(`  - Day 7 emails: ${day7Results.filter(r => r.success).length} sent, ${day7Results.filter(r => !r.success).length} failed`);
    console.log(`  - Total: ${totalSent} sent, ${totalFailed} failed`);
    console.log(`  - Duration: ${duration}s`);

    return {
      success: true,
      totalSent,
      totalFailed,
      duration: parseFloat(duration),
      day1: day1Results.length,
      day3: day3Results.length,
      day7: day7Results.length,
    };
  } catch (error: any) {
    console.error("[Drip Campaign] Job failed:", error);
    return {
      success: false,
      error: error.message,
    };
  }
}

// Run the job if this script is executed directly
if (require.main === module) {
  runDripCampaign()
    .then((result) => {
      if (result.success) {
        console.log("[Drip Campaign] ✓ Job completed successfully");
        process.exit(0);
      } else {
        console.error("[Drip Campaign] ✗ Job failed:", result.error);
        process.exit(1);
      }
    })
    .catch((error) => {
      console.error("[Drip Campaign] ✗ Unexpected error:", error);
      process.exit(1);
    });
}

// Export for testing
export { runDripCampaign, sendDripEmailBatch };
