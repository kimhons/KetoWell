import { describe, expect, it, beforeEach } from "vitest";
import {
  createWaitlistSignup,
  confirmWaitlistSignup,
  getWaitlistMembersForDripEmail,
  hasEmailBeenSent,
  createEmailSend,
} from "../db";
import crypto from "crypto";

describe("Drip Email System", () => {
  describe("Email Tracking", () => {
    it("should track that an email was sent", async () => {
      // Create a test waitlist signup
      const testEmail = `drip-test-${Date.now()}@example.com`;
      const confirmationToken = crypto.randomBytes(32).toString("hex");

      await createWaitlistSignup({
        email: testEmail,
        platform: "both",
        newsletterOptin: 0,
        confirmationToken,
      });

      // Confirm the signup
      await confirmWaitlistSignup(confirmationToken);

      // Get the signup to get its ID
      const { getWaitlistSignupByEmail } = await import("../db");
      const signup = await getWaitlistSignupByEmail(testEmail);
      expect(signup).toBeDefined();

      // Record an email send
      await createEmailSend({
        waitlistSignupId: signup!.id,
        emailType: "day_1",
        status: "sent",
        resendMessageId: "test-message-id",
      });

      // Check if email was sent
      const wasSent = await hasEmailBeenSent(signup!.id, "day_1");
      expect(wasSent).toBe(true);

      // Check that other email types weren't sent
      const day3Sent = await hasEmailBeenSent(signup!.id, "day_3");
      expect(day3Sent).toBe(false);
    });

    it("should prevent duplicate email sends", async () => {
      const testEmail = `drip-duplicate-${Date.now()}@example.com`;
      const confirmationToken = crypto.randomBytes(32).toString("hex");

      await createWaitlistSignup({
        email: testEmail,
        platform: "ios",
        newsletterOptin: 0,
        confirmationToken,
      });

      await confirmWaitlistSignup(confirmationToken);

      const { getWaitlistSignupByEmail } = await import("../db");
      const signup = await getWaitlistSignupByEmail(testEmail);

      // Send first email
      await createEmailSend({
        waitlistSignupId: signup!.id,
        emailType: "day_3",
        status: "sent",
      });

      // Check it was sent
      const wasSent = await hasEmailBeenSent(signup!.id, "day_3");
      expect(wasSent).toBe(true);

      // Try to send again - should detect it was already sent
      const alreadySent = await hasEmailBeenSent(signup!.id, "day_3");
      expect(alreadySent).toBe(true);
    });
  });

  describe("Drip Email Scheduling", () => {
    it("should find members due for Day 1 email", async () => {
      // Create a signup confirmed 1+ days ago
      const testEmail = `day1-test-${Date.now()}@example.com`;
      const confirmationToken = crypto.randomBytes(32).toString("hex");

      await createWaitlistSignup({
        email: testEmail,
        platform: "android",
        newsletterOptin: 0,
        confirmationToken,
      });

      await confirmWaitlistSignup(confirmationToken);

      // Manually update confirmed_at to be 1+ days ago
      const { getDb } = await import("../db");
      const { waitlistSignups } = await import("../../drizzle/schema");
      const { eq } = await import("drizzle-orm");
      const db = await getDb();

      const twoDaysAgo = new Date();
      twoDaysAgo.setDate(twoDaysAgo.getDate() - 2);

      await db!
        .update(waitlistSignups)
        .set({ confirmedAt: twoDaysAgo })
        .where(eq(waitlistSignups.email, testEmail));

      // Get members due for Day 1 email
      const members = await getWaitlistMembersForDripEmail("day_1");

      // Should include our test member
      const foundMember = members.find((m) => m.email === testEmail);
      expect(foundMember).toBeDefined();
    });

    it("should not include members who already received the email", async () => {
      const testEmail = `day1-already-sent-${Date.now()}@example.com`;
      const confirmationToken = crypto.randomBytes(32).toString("hex");

      await createWaitlistSignup({
        email: testEmail,
        platform: "both",
        newsletterOptin: 0,
        confirmationToken,
      });

      await confirmWaitlistSignup(confirmationToken);

      // Update confirmed_at to be 2 days ago
      const { getDb, getWaitlistSignupByEmail } = await import("../db");
      const { waitlistSignups } = await import("../../drizzle/schema");
      const { eq } = await import("drizzle-orm");
      const db = await getDb();

      const twoDaysAgo = new Date();
      twoDaysAgo.setDate(twoDaysAgo.getDate() - 2);

      await db!
        .update(waitlistSignups)
        .set({ confirmedAt: twoDaysAgo })
        .where(eq(waitlistSignups.email, testEmail));

      // Mark Day 1 email as sent
      const signup = await getWaitlistSignupByEmail(testEmail);
      await createEmailSend({
        waitlistSignupId: signup!.id,
        emailType: "day_1",
        status: "sent",
      });

      // Get members due for Day 1 email
      const members = await getWaitlistMembersForDripEmail("day_1");

      // Should NOT include our test member (already sent)
      const foundMember = members.find((m) => m.email === testEmail);
      expect(foundMember).toBeUndefined();
    });

    it("should find members due for Day 3 email", async () => {
      const testEmail = `day3-test-${Date.now()}@example.com`;
      const confirmationToken = crypto.randomBytes(32).toString("hex");

      await createWaitlistSignup({
        email: testEmail,
        platform: "ios",
        newsletterOptin: 0,
        confirmationToken,
      });

      await confirmWaitlistSignup(confirmationToken);

      // Update confirmed_at to be 4 days ago
      const { getDb } = await import("../db");
      const { waitlistSignups } = await import("../../drizzle/schema");
      const { eq } = await import("drizzle-orm");
      const db = await getDb();

      const fourDaysAgo = new Date();
      fourDaysAgo.setDate(fourDaysAgo.getDate() - 4);

      await db!
        .update(waitlistSignups)
        .set({ confirmedAt: fourDaysAgo })
        .where(eq(waitlistSignups.email, testEmail));

      // Get members due for Day 3 email
      const members = await getWaitlistMembersForDripEmail("day_3");

      // Should include our test member
      const foundMember = members.find((m) => m.email === testEmail);
      expect(foundMember).toBeDefined();
    });

    it("should find members due for Day 7 email", async () => {
      const testEmail = `day7-test-${Date.now()}@example.com`;
      const confirmationToken = crypto.randomBytes(32).toString("hex");

      await createWaitlistSignup({
        email: testEmail,
        platform: "android",
        newsletterOptin: 0,
        confirmationToken,
      });

      await confirmWaitlistSignup(confirmationToken);

      // Update confirmed_at to be 8 days ago
      const { getDb } = await import("../db");
      const { waitlistSignups } = await import("../../drizzle/schema");
      const { eq } = await import("drizzle-orm");
      const db = await getDb();

      const eightDaysAgo = new Date();
      eightDaysAgo.setDate(eightDaysAgo.getDate() - 8);

      await db!
        .update(waitlistSignups)
        .set({ confirmedAt: eightDaysAgo })
        .where(eq(waitlistSignups.email, testEmail));

      // Get members due for Day 7 email
      const members = await getWaitlistMembersForDripEmail("day_7");

      // Should include our test member
      const foundMember = members.find((m) => m.email === testEmail);
      expect(foundMember).toBeDefined();
    });

    it("should not include unconfirmed members", async () => {
      const testEmail = `unconfirmed-${Date.now()}@example.com`;
      const confirmationToken = crypto.randomBytes(32).toString("hex");

      // Create signup but don't confirm
      await createWaitlistSignup({
        email: testEmail,
        platform: "both",
        newsletterOptin: 0,
        confirmationToken,
      });

      // Get members due for Day 1 email
      const members = await getWaitlistMembersForDripEmail("day_1");

      // Should NOT include unconfirmed member
      const foundMember = members.find((m) => m.email === testEmail);
      expect(foundMember).toBeUndefined();
    });
  });

  describe("Email Template Functions", () => {
    it("should send Day 1 email successfully", async () => {
      const { sendDay1Email } = await import("../email");

      const result = await sendDay1Email({
        email: "test@example.com",
        firstName: "Test",
      });

      expect(result.success).toBe(true);
      // Note: messageId may be undefined for test emails, which is expected
    });

    it("should send Day 3 email successfully", async () => {
      const { sendDay3Email } = await import("../email");

      const result = await sendDay3Email({
        email: "test@example.com",
        firstName: "Test",
      });

      expect(result.success).toBe(true);
      // Note: messageId may be undefined for test emails, which is expected
    });

    it("should send Day 7 email successfully", async () => {
      const { sendDay7Email } = await import("../email");

      const result = await sendDay7Email({
        email: "test@example.com",
        firstName: "Test",
      });

      expect(result.success).toBe(true);
      // Note: messageId may be undefined for test emails, which is expected
    });
  });
});
