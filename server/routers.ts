import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, router } from "./_core/trpc";
import { z } from "zod";
import { createWaitlistSignup, getWaitlistCount, createNewsletterSubscription } from "./db";
import crypto from "crypto";

export const appRouter = router({
    // if you need to use socket.io, read and register route in server/_core/index.ts, all api should start with '/api/' so that the gateway can route correctly
  system: systemRouter,
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return {
        success: true,
      } as const;
    }),
  }),

  waitlist: router({
    signup: publicProcedure
      .input(
        z.object({
          email: z.string().email("Invalid email address"),
          platform: z.enum(["ios", "android", "both"]),
          newsletterOptin: z.boolean(),
        })
      )
      .mutation(async ({ input }) => {
        try {
          // Generate confirmation token
          const confirmationToken = crypto.randomBytes(32).toString("hex");

          // Create waitlist signup
          await createWaitlistSignup({
            email: input.email,
            platform: input.platform,
            newsletterOptin: input.newsletterOptin ? 1 : 0,
            confirmationToken,
          });

          // If user opted in to newsletter, create newsletter subscription
          if (input.newsletterOptin) {
            try {
              const unsubscribeToken = crypto.randomBytes(32).toString("hex");
              await createNewsletterSubscription({
                email: input.email,
                source: "waitlist",
                unsubscribeToken,
              });
            } catch (error) {
              // If newsletter subscription fails (e.g., already subscribed), continue
              console.log("Newsletter subscription skipped:", error);
            }
          }

          // TODO: Send confirmation email here
          // You can use a service like SendGrid, Mailgun, or AWS SES
          // For now, we'll just return success

          return {
            success: true,
            message: "Successfully joined the waitlist!",
          };
        } catch (error: any) {
          console.error("Waitlist signup error:", error);
          throw new Error(error.message || "Failed to join waitlist");
        }
      }),

    stats: publicProcedure.query(async () => {
      const count = await getWaitlistCount();
      return {
        totalSignups: count,
      };
    }),
  }),

  newsletter: router({
    subscribe: publicProcedure
      .input(
        z.object({
          email: z.string().email("Invalid email address"),
          source: z.string().optional(),
        })
      )
      .mutation(async ({ input }) => {
        try {
          const unsubscribeToken = crypto.randomBytes(32).toString("hex");
          await createNewsletterSubscription({
            email: input.email,
            source: input.source || "website",
            unsubscribeToken,
          });

          // TODO: Send welcome email here

          return {
            success: true,
            message: "Successfully subscribed to newsletter!",
          };
        } catch (error: any) {
          console.error("Newsletter subscription error:", error);
          throw new Error(error.message || "Failed to subscribe");
        }
      }),
  }),
});

export type AppRouter = typeof appRouter;
