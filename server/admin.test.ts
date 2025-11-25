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

describe("Admin Analytics API", () => {
  it("should return analytics data with correct structure", async () => {
    const analytics = await caller.admin.analytics();

    expect(analytics).toHaveProperty("overview");
    expect(analytics).toHaveProperty("platformBreakdown");
    expect(analytics).toHaveProperty("signupTrends");
    expect(analytics).toHaveProperty("emailStats");
    expect(analytics).toHaveProperty("recentSignups");
  });

  it("should have valid overview metrics", async () => {
    const analytics = await caller.admin.analytics();
    const { overview } = analytics;

    expect(typeof overview.totalSignups).toBe("number");
    expect(typeof overview.confirmedSignups).toBe("number");
    expect(typeof overview.unconfirmedSignups).toBe("number");
    expect(typeof overview.newsletterSubscribers).toBe("number");
    expect(typeof overview.confirmationRate).toBe("number");

    // Validation: unconfirmed = total - confirmed
    expect(overview.unconfirmedSignups).toBe(
      overview.totalSignups - overview.confirmedSignups
    );

    // Validation: confirmation rate should be between 0 and 100
    expect(overview.confirmationRate).toBeGreaterThanOrEqual(0);
    expect(overview.confirmationRate).toBeLessThanOrEqual(100);
  });

  it("should have valid platform breakdown", async () => {
    const analytics = await caller.admin.analytics();
    const { platformBreakdown } = analytics;

    expect(typeof platformBreakdown.ios).toBe("number");
    expect(typeof platformBreakdown.android).toBe("number");
    expect(typeof platformBreakdown.both).toBe("number");

    // All counts should be non-negative
    expect(platformBreakdown.ios).toBeGreaterThanOrEqual(0);
    expect(platformBreakdown.android).toBeGreaterThanOrEqual(0);
    expect(platformBreakdown.both).toBeGreaterThanOrEqual(0);
  });

  it("should have valid signup trends data", async () => {
    const analytics = await caller.admin.analytics();
    const { signupTrends } = analytics;

    expect(Array.isArray(signupTrends)).toBe(true);

    // Each trend should have date and signups
    signupTrends.forEach((trend) => {
      expect(trend).toHaveProperty("date");
      expect(trend).toHaveProperty("signups");
      expect(typeof trend.date).toBe("string");
      expect(typeof trend.signups).toBe("number");
      expect(trend.signups).toBeGreaterThanOrEqual(0);
    });
  });

  it("should have valid email campaign stats", async () => {
    const analytics = await caller.admin.analytics();
    const { emailStats } = analytics;

    expect(emailStats).toHaveProperty("confirmation");
    expect(emailStats).toHaveProperty("day_1");
    expect(emailStats).toHaveProperty("day_3");
    expect(emailStats).toHaveProperty("day_7");

    // Each campaign should have sent and failed counts
    Object.values(emailStats).forEach((stat) => {
      expect(typeof stat.sent).toBe("number");
      expect(typeof stat.failed).toBe("number");
      expect(stat.sent).toBeGreaterThanOrEqual(0);
      expect(stat.failed).toBeGreaterThanOrEqual(0);
    });
  });

  it("should have valid recent signups data", async () => {
    const analytics = await caller.admin.analytics();
    const { recentSignups } = analytics;

    expect(Array.isArray(recentSignups)).toBe(true);
    expect(recentSignups.length).toBeLessThanOrEqual(50); // Should return max 50

    // Each signup should have required fields
    recentSignups.forEach((signup) => {
      expect(signup).toHaveProperty("id");
      expect(signup).toHaveProperty("email");
      expect(signup).toHaveProperty("platform");
      expect(signup).toHaveProperty("newsletterOptin");
      expect(signup).toHaveProperty("createdAt");
      
      expect(typeof signup.id).toBe("number");
      expect(typeof signup.email).toBe("string");
      expect(["ios", "android", "both"]).toContain(signup.platform);
      expect([0, 1]).toContain(signup.newsletterOptin);
      expect(signup.createdAt).toBeInstanceOf(Date);
    });
  });

  it("should calculate confirmation rate correctly", async () => {
    const analytics = await caller.admin.analytics();
    const { overview } = analytics;

    if (overview.totalSignups > 0) {
      const expectedRate = Math.round(
        (overview.confirmedSignups / overview.totalSignups) * 100
      );
      expect(overview.confirmationRate).toBe(expectedRate);
    } else {
      expect(overview.confirmationRate).toBe(0);
    }
  });

  it("should have consistent data across metrics", async () => {
    const analytics = await caller.admin.analytics();
    const { overview, platformBreakdown } = analytics;

    // Platform breakdown should sum to total signups
    const platformTotal =
      platformBreakdown.ios + platformBreakdown.android + platformBreakdown.both;
    expect(platformTotal).toBe(overview.totalSignups);
  });
});
