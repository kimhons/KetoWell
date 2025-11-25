/**
 * Stripe Products Configuration
 * Centralized product and price definitions for the KetoWell platform
 */

export const STRIPE_PRODUCTS = {
  KETOWELL_BOOK: {
    productId: 'prod_TUMhjDUd5rGyzg',
    priceId: 'price_1SXNyfBThGqvaVw1QqzgZMV3',
    name: 'KetoWell Book - Digital Edition',
    description: 'Transform Your Health with the Science of Ketogenic Living',
    price: 9.99,
    currency: 'usd',
    type: 'one_time' as const,
  },
} as const;

export type ProductKey = keyof typeof STRIPE_PRODUCTS;
