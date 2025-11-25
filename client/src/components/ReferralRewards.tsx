import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Gift, Copy, Check, Users, Calendar } from "lucide-react";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import type { ReferralStats } from "@/lib/referralApi";

interface ReferralRewardsProps {
  referralStats: ReferralStats | null;
  loading?: boolean;
}

export default function ReferralRewards({ referralStats, loading }: ReferralRewardsProps) {
  const [copied, setCopied] = useState(false);

  if (loading) {
    return (
      <Card>
        <CardContent className="pt-6">
          <div className="animate-pulse space-y-4">
            <div className="h-6 bg-muted rounded w-1/3"></div>
            <div className="h-20 bg-muted rounded"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!referralStats) {
    return null;
  }

  const handleCopyCode = async () => {
    try {
      await navigator.clipboard.writeText(referralStats.code);
      setCopied(true);
      toast.success("Referral code copied!");
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      toast.error("Failed to copy code");
    }
  };

  const referralUrl = `${window.location.origin}/book?ref=${referralStats.code}`;

  const handleCopyUrl = async () => {
    try {
      await navigator.clipboard.writeText(referralUrl);
      toast.success("Referral link copied!");
    } catch (error) {
      toast.error("Failed to copy link");
    }
  };

  const expiresDate = referralStats.expiresAt
    ? new Date(referralStats.expiresAt).toLocaleDateString()
    : "Never";

  return (
    <Card className="border-2 border-primary/20 bg-gradient-to-br from-primary/5 to-primary/10">
      <CardContent className="pt-6">
        <div className="flex items-start gap-3 mb-6">
          <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
            <Gift className="h-6 w-6 text-primary" />
          </div>
          <div>
            <h3 className="text-xl font-bold mb-1">Your Referral Rewards</h3>
            <p className="text-sm text-muted-foreground">
              Share your unique code and earn 20% off KetoWell Premium for 3 months when friends purchase!
            </p>
          </div>
        </div>

        {/* Referral Code Display */}
        <div className="bg-background rounded-lg p-4 mb-4 border-2 border-dashed border-primary/30">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-muted-foreground mb-1">Your Referral Code</p>
              <p className="text-2xl font-bold font-mono tracking-wider text-primary">
                {referralStats.code}
              </p>
            </div>
            <Button
              onClick={handleCopyCode}
              variant="outline"
              size="sm"
              className="ml-4"
            >
              {copied ? (
                <>
                  <Check className="h-4 w-4 mr-2 text-green-600" />
                  Copied!
                </>
              ) : (
                <>
                  <Copy className="h-4 w-4 mr-2" />
                  Copy Code
                </>
              )}
            </Button>
          </div>
        </div>

        {/* Referral Link */}
        <div className="bg-background rounded-lg p-4 mb-4">
          <p className="text-xs text-muted-foreground mb-2">Or share this link:</p>
          <div className="flex items-center gap-2">
            <input
              type="text"
              value={referralUrl}
              readOnly
              className="flex-1 text-sm bg-muted px-3 py-2 rounded border border-border font-mono"
            />
            <Button onClick={handleCopyUrl} variant="outline" size="sm">
              <Copy className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-4">
          <div className="text-center">
            <div className="flex items-center justify-center gap-1 mb-1">
              <Users className="h-4 w-4 text-muted-foreground" />
            </div>
            <p className="text-2xl font-bold text-primary">{referralStats.usageCount}</p>
            <p className="text-xs text-muted-foreground">Referrals</p>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center gap-1 mb-1">
              <Gift className="h-4 w-4 text-muted-foreground" />
            </div>
            <p className="text-2xl font-bold text-primary">
              {referralStats.usageLimit - referralStats.usageCount}
            </p>
            <p className="text-xs text-muted-foreground">Remaining</p>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center gap-1 mb-1">
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </div>
            <p className="text-sm font-bold text-primary">{expiresDate}</p>
            <p className="text-xs text-muted-foreground">Expires</p>
          </div>
        </div>

        {/* Rewards Earned */}
        {referralStats.referrals.length > 0 && (
          <div className="bg-green-50 dark:bg-green-950 rounded-lg p-4 border border-green-200 dark:border-green-800">
            <h4 className="font-semibold text-green-900 dark:text-green-100 mb-2 flex items-center gap-2">
              <Gift className="h-4 w-4" />
              Rewards Earned ({referralStats.referrals.length})
            </h4>
            <div className="space-y-2">
              {referralStats.referrals.map((referral, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between text-sm bg-white dark:bg-green-900 rounded px-3 py-2"
                >
                  <span className="text-muted-foreground">
                    Referred: {referral.referredEmail}
                  </span>
                  {referral.rewardCode && (
                    <span className="font-mono font-bold text-green-700 dark:text-green-300">
                      {referral.rewardCode}
                    </span>
                  )}
                </div>
              ))}
            </div>
            <p className="text-xs text-green-700 dark:text-green-300 mt-3">
              💡 Use these reward codes in the KetoWell app to get 20% off Premium for 3 months!
            </p>
          </div>
        )}

        {/* How It Works */}
        <div className="mt-6 pt-6 border-t border-border">
          <h4 className="font-semibold mb-3 text-sm">How It Works:</h4>
          <ol className="space-y-2 text-sm text-muted-foreground">
            <li className="flex items-start gap-2">
              <span className="font-bold text-primary">1.</span>
              <span>Share your referral code or link with friends</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="font-bold text-primary">2.</span>
              <span>They use your code when purchasing the book</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="font-bold text-primary">3.</span>
              <span>You earn a reward code for 20% off KetoWell Premium!</span>
            </li>
          </ol>
        </div>
      </CardContent>
    </Card>
  );
}
