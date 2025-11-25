import { describe, expect, it } from "vitest";
import { testResendConnection } from "./email";

describe("Resend Email Service", () => {
  it("should validate Resend API key is configured correctly", async () => {
    const result = await testResendConnection();
    
    // The test should succeed if the API key is valid
    // Even if the email doesn't actually send (test@example.com), 
    // Resend will validate the API key and return a success response
    expect(result.success).toBe(true);
    expect(result.data).toBeDefined();
    
    if (!result.success) {
      console.error("Resend API key validation failed:", result.error);
      throw new Error(`Invalid Resend API key: ${result.error}`);
    }
  });
});
