import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle2, XCircle, Loader2, Gift } from "lucide-react";
import { validateReferralCode } from "@/lib/referralApi";
import { toast } from "sonner";

interface ReferralCodeInputProps {
  onCodeValidated?: (code: string, discount: { type: string; value: number }) => void;
  initialCode?: string;
}

export default function ReferralCodeInput({ onCodeValidated, initialCode }: ReferralCodeInputProps) {
  const [code, setCode] = useState(initialCode || "");
  const [isValidating, setIsValidating] = useState(false);
  const [validationResult, setValidationResult] = useState<{
    valid: boolean;
    message?: string;
    discountType?: string;
    discountValue?: number;
  } | null>(null);
  const [showInput, setShowInput] = useState(!!initialCode);

  // Auto-validate initial code from URL
  useEffect(() => {
    if (initialCode) {
      handleValidate(initialCode);
    }
  }, [initialCode]);

  const handleValidate = async (codeToValidate: string) => {
    const trimmedCode = codeToValidate.trim().toUpperCase();
    
    if (!trimmedCode) {
      setValidationResult(null);
      return;
    }

    setIsValidating(true);
    try {
      const result = await validateReferralCode(trimmedCode);
      setValidationResult(result);

      if (result.valid && result.discountType && result.discountValue) {
        toast.success(result.message || "Referral code applied!");
        onCodeValidated?.(trimmedCode, {
          type: result.discountType,
          value: result.discountValue,
        });
      } else {
        toast.error(result.message || "Invalid referral code");
      }
    } catch (error) {
      console.error("Error validating code:", error);
      setValidationResult({ valid: false, message: "Failed to validate code" });
      toast.error("Failed to validate code");
    } finally {
      setIsValidating(false);
    }
  };

  const handleCodeChange = (value: string) => {
    const upperValue = value.toUpperCase();
    setCode(upperValue);
    
    // Reset validation when user changes the code
    if (validationResult) {
      setValidationResult(null);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleValidate(code);
  };

  if (!showInput) {
    return (
      <Card className="border-dashed border-2 border-primary/30">
        <CardContent className="pt-6">
          <button
            onClick={() => setShowInput(true)}
            className="w-full text-left flex items-center gap-3 group"
          >
            <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
              <Gift className="h-5 w-5 text-primary" />
            </div>
            <div>
              <p className="font-semibold text-primary group-hover:underline">
                Have a referral code?
              </p>
              <p className="text-sm text-muted-foreground">
                Click here to apply it and support a friend
              </p>
            </div>
          </button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-2 border-primary/30 bg-gradient-to-br from-primary/5 to-primary/10">
      <CardContent className="pt-6">
        <div className="flex items-start gap-3 mb-4">
          <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
            <Gift className="h-5 w-5 text-primary" />
          </div>
          <div>
            <h3 className="font-bold text-lg mb-1">Apply Referral Code</h3>
            <p className="text-sm text-muted-foreground">
              Enter a friend's referral code to support them
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex gap-2">
            <div className="flex-1 relative">
              <Input
                type="text"
                placeholder="Enter code (e.g., BOOKREF-ABC123)"
                value={code}
                onChange={(e) => handleCodeChange(e.target.value)}
                className="font-mono uppercase pr-10"
                disabled={isValidating}
              />
              {isValidating && (
                <Loader2 className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 animate-spin text-muted-foreground" />
              )}
              {validationResult && !isValidating && (
                <div className="absolute right-3 top-1/2 -translate-y-1/2">
                  {validationResult.valid ? (
                    <CheckCircle2 className="h-5 w-5 text-green-600" />
                  ) : (
                    <XCircle className="h-5 w-5 text-red-600" />
                  )}
                </div>
              )}
            </div>
            <Button
              type="submit"
              disabled={!code.trim() || isValidating}
              variant={validationResult?.valid ? "default" : "outline"}
            >
              {isValidating ? "Checking..." : validationResult?.valid ? "Applied" : "Apply"}
            </Button>
          </div>

          {validationResult && (
            <div
              className={`p-3 rounded-lg text-sm ${
                validationResult.valid
                  ? "bg-green-50 dark:bg-green-950 text-green-900 dark:text-green-100 border border-green-200 dark:border-green-800"
                  : "bg-red-50 dark:bg-red-950 text-red-900 dark:text-red-100 border border-red-200 dark:border-red-800"
              }`}
            >
              <div className="flex items-start gap-2">
                {validationResult.valid ? (
                  <CheckCircle2 className="h-4 w-4 mt-0.5 flex-shrink-0" />
                ) : (
                  <XCircle className="h-4 w-4 mt-0.5 flex-shrink-0" />
                )}
                <div>
                  <p className="font-semibold">
                    {validationResult.valid ? "✓ Code Applied!" : "Invalid Code"}
                  </p>
                  <p className="text-xs mt-1 opacity-90">{validationResult.message}</p>
                </div>
              </div>
            </div>
          )}
        </form>

        <button
          onClick={() => {
            setShowInput(false);
            setCode("");
            setValidationResult(null);
          }}
          className="text-xs text-muted-foreground hover:underline mt-3"
        >
          Don't have a code? Continue without one
        </button>
      </CardContent>
    </Card>
  );
}
