import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, router } from "./_core/trpc";
import { z } from "zod";
import { createWaitlistSignup, getWaitlistCount, createNewsletterSubscription, confirmWaitlistSignup, getWaitlistSignupByToken } from "./db";
import crypto from "crypto";
import { sendWaitlistConfirmationEmail } from "./email";

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
          firstName: z.string().min(1, "First name is required").max(100).optional(),
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
            firstName: input.firstName || null,
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

          // Send confirmation email
          const emailResult = await sendWaitlistConfirmationEmail({
            email: input.email,
            firstName: input.firstName,
            confirmationToken,
            platform: input.platform,
          });

          if (!emailResult.success) {
            console.error("Failed to send confirmation email:", emailResult.error);
            // Don't fail the signup if email fails - user is still on waitlist
          }

          return {
            success: true,
            message: "Successfully joined the waitlist! Check your email to confirm.",
            emailSent: emailResult.success,
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

    confirm: publicProcedure
      .input(
        z.object({
          token: z.string(),
        })
      )
      .mutation(async ({ input }) => {
        try {
          // Find signup by token
          const signup = await getWaitlistSignupByToken(input.token);
          
          if (!signup) {
            throw new Error("Invalid or expired confirmation token");
          }

          if (signup.confirmedAt) {
            return {
              success: true,
              message: "Email already confirmed!",
              alreadyConfirmed: true,
            };
          }

          // Mark as confirmed
          await confirmWaitlistSignup(input.token);

          return {
            success: true,
            message: "Email confirmed! You're all set.",
            alreadyConfirmed: false,
          };
        } catch (error: any) {
          console.error("Waitlist confirmation error:", error);
          throw new Error(error.message || "Failed to confirm email");
        }
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

  admin: router({
    analytics: publicProcedure.query(async () => {
      const {
        getTotalSignups,
        getConfirmedSignups,
        getPlatformBreakdown,
        getSignupTrends,
        getEmailCampaignStats,
        getRecentSignups,
        getTotalNewsletterSubscribers,
      } = await import("./db");

      try {
        const [totalSignups, confirmedSignups, platformBreakdown, signupTrends, emailStats, recentSignups, newsletterSubscribers] =
          await Promise.all([
            getTotalSignups(),
            getConfirmedSignups(),
            getPlatformBreakdown(),
            getSignupTrends(),
            getEmailCampaignStats(),
            getRecentSignups(),
            getTotalNewsletterSubscribers(),
          ]);

        return {
          overview: {
            totalSignups,
            confirmedSignups,
            unconfirmedSignups: totalSignups - confirmedSignups,
            newsletterSubscribers,
            confirmationRate: totalSignups > 0 ? Math.round((confirmedSignups / totalSignups) * 100) : 0,
          },
          platformBreakdown,
          signupTrends,
          emailStats,
          recentSignups,
        };
      } catch (error: any) {
        console.error("Admin analytics error:", error);
        throw new Error("Failed to fetch analytics data");
      }
    }),
  }),
});

export type AppRouter = typeof appRouter;
