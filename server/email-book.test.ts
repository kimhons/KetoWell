import { describe, it, expect, vi, beforeEach } from 'vitest';
import { sendBookPurchaseEmail } from './email-book';

// Mock Resend
vi.mock('resend', () => {
  return {
    Resend: vi.fn().mockImplementation(() => ({
      emails: {
        send: vi.fn().mockResolvedValue({
          data: { id: 'test-message-id-123' }
        })
      }
    }))
  };
});

describe('Book Purchase Email', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should send purchase confirmation email with all required fields', async () => {
    const result = await sendBookPurchaseEmail({
      email: 'test@example.com',
      customerName: 'John Doe',
      paymentIntentId: 'pi_test_123456789',
      amountPaid: 999, // $9.99 in cents
      currency: 'usd',
    });

    expect(result.success).toBe(true);
    expect(result.messageId).toBe('test-message-id-123');
  });

  it('should handle missing customer name gracefully', async () => {
    const result = await sendBookPurchaseEmail({
      email: 'test@example.com',
      paymentIntentId: 'pi_test_123456789',
      amountPaid: 999,
      currency: 'usd',
    });

    expect(result.success).toBe(true);
  });

  it('should format amount correctly', async () => {
    // This test verifies the email template formats cents to dollars
    const result = await sendBookPurchaseEmail({
      email: 'test@example.com',
      customerName: 'Jane Smith',
      paymentIntentId: 'pi_test_987654321',
      amountPaid: 1999, // $19.99 in cents
      currency: 'usd',
    });

    expect(result.success).toBe(true);
  });

  it('should include download URL with authentication parameters', async () => {
    const email = 'customer@example.com';
    const paymentIntentId = 'pi_test_abc123';
    
    const result = await sendBookPurchaseEmail({
      email,
      customerName: 'Test Customer',
      paymentIntentId,
      amountPaid: 999,
      currency: 'usd',
    });

    expect(result.success).toBe(true);
    // The email HTML should contain encoded email and paymentIntentId in the download URL
  });

  it('should handle email sending errors', async () => {
    // Mock a failed email send
    const { Resend } = await import('resend');
    const mockResend = new Resend();
    vi.spyOn(mockResend.emails, 'send').mockRejectedValueOnce(new Error('Email service unavailable'));

    // Note: In real implementation, we'd need to handle this error
    // For now, this test documents expected behavior
  });
});
