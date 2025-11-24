import { describe, it, expect } from "vitest";
import { appRouter } from "./routers";
import type { TrpcContext } from "./_core/context";

// Mock context for testing
const mockContext: TrpcContext = {
  user: null,
  req: {} as any,
  res: {} as any,
};

const caller = appRouter.createCaller(mockContext);

describe("Waitlist API", () => {
  it("should successfully create a waitlist signup", async () => {
    const testEmail = `test-${Date.now()}@example.com`;
    
    const result = await caller.waitlist.signup({
      email: testEmail,
      platform: "both",
      newsletterOptin: true,
    });

    expect(result.success).toBe(true);
    expect(result.message).toContain("waitlist");
  });

  it("should reject invalid email format", async () => {
    await expect(
      caller.waitlist.signup({
        email: "invalid-email",
        platform: "ios",
        newsletterOptin: false,
      })
    ).rejects.toThrow();
  });

  it("should reject duplicate email", async () => {
    const testEmail = `duplicate-${Date.now()}@example.com`;
    
    // First signup should succeed
    await caller.waitlist.signup({
      email: testEmail,
      platform: "android",
      newsletterOptin: false,
    });

    // Second signup with same email should fail
    await expect(
      caller.waitlist.signup({
        email: testEmail,
        platform: "ios",
        newsletterOptin: true,
      })
    ).rejects.toThrow("already on the waitlist");
  });

  it("should return waitlist stats", async () => {
    const stats = await caller.waitlist.stats();
    
    expect(stats).toHaveProperty("totalSignups");
    expect(typeof stats.totalSignups).toBe("number");
    expect(stats.totalSignups).toBeGreaterThanOrEqual(0);
  });

  it("should accept all platform options", async () => {
    const platforms: Array<"ios" | "android" | "both"> = ["ios", "android", "both"];
    
    for (const platform of platforms) {
      const testEmail = `platform-test-${platform}-${Date.now()}@example.com`;
      
      const result = await caller.waitlist.signup({
        email: testEmail,
        platform,
        newsletterOptin: false,
      });

      expect(result.success).toBe(true);
    }
  });
});

describe("Newsletter API", () => {
  it("should successfully create a newsletter subscription", async () => {
    const testEmail = `newsletter-${Date.now()}@example.com`;
    
    const result = await caller.newsletter.subscribe({
      email: testEmail,
      source: "website",
    });

    expect(result.success).toBe(true);
    expect(result.message).toContain("subscribed");
  });

  it("should reject invalid email format", async () => {
    await expect(
      caller.newsletter.subscribe({
        email: "not-an-email",
        source: "blog",
      })
    ).rejects.toThrow();
  });

  it("should reject duplicate subscription", async () => {
    const testEmail = `newsletter-duplicate-${Date.now()}@example.com`;
    
    // First subscription should succeed
    await caller.newsletter.subscribe({
      email: testEmail,
      source: "homepage",
    });

    // Second subscription with same email should fail
    await expect(
      caller.newsletter.subscribe({
        email: testEmail,
        source: "blog",
      })
    ).rejects.toThrow("already subscribed");
  });

  it("should accept optional source parameter", async () => {
    const testEmail = `newsletter-no-source-${Date.now()}@example.com`;
    
    const result = await caller.newsletter.subscribe({
      email: testEmail,
    });

    expect(result.success).toBe(true);
  });

  it("should track different subscription sources", async () => {
    const sources = ["homepage", "blog", "waitlist", "research"];
    
    for (const source of sources) {
      const testEmail = `source-test-${source}-${Date.now()}@example.com`;
      
      const result = await caller.newsletter.subscribe({
        email: testEmail,
        source,
      });

      expect(result.success).toBe(true);
    }
  });
});

describe("Integration: Waitlist with Newsletter Opt-in", () => {
  it("should create both waitlist signup and newsletter subscription when opted in", async () => {
    const testEmail = `integration-${Date.now()}@example.com`;
    
    // Sign up for waitlist with newsletter opt-in
    const waitlistResult = await caller.waitlist.signup({
      email: testEmail,
      platform: "both",
      newsletterOptin: true,
    });

    expect(waitlistResult.success).toBe(true);

    // Attempting to subscribe to newsletter again should fail (already subscribed)
    await expect(
      caller.newsletter.subscribe({
        email: testEmail,
        source: "manual",
      })
    ).rejects.toThrow("already subscribed");
  });

  it("should only create waitlist signup when newsletter opt-in is false", async () => {
    const testEmail = `no-optin-${Date.now()}@example.com`;
    
    // Sign up for waitlist without newsletter opt-in
    const waitlistResult = await caller.waitlist.signup({
      email: testEmail,
      platform: "ios",
      newsletterOptin: false,
    });

    expect(waitlistResult.success).toBe(true);

    // Should be able to subscribe to newsletter separately
    const newsletterResult = await caller.newsletter.subscribe({
      email: testEmail,
      source: "blog",
    });

    expect(newsletterResult.success).toBe(true);
  });
});
