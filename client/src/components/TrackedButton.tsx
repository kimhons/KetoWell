import { Button } from "@/components/ui/button";
import { trackAppDownloadClick, trackProviderDemoRequest, trackPricingPlanClick } from "@/lib/analytics";
import { ComponentProps } from "react";

interface TrackedButtonProps extends ComponentProps<typeof Button> {
  trackingType?: "download_ios" | "download_android" | "provider_demo" | "pricing_free" | "pricing_premium" | "pricing_clinical";
}

export default function TrackedButton({ 
  trackingType, 
  onClick, 
  children, 
  ...props 
}: TrackedButtonProps) {
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    // Track the event
    if (trackingType) {
      switch (trackingType) {
        case "download_ios":
          trackAppDownloadClick("ios");
          break;
        case "download_android":
          trackAppDownloadClick("android");
          break;
        case "provider_demo":
          trackProviderDemoRequest();
          break;
        case "pricing_free":
          trackPricingPlanClick("Free");
          break;
        case "pricing_premium":
          trackPricingPlanClick("Premium");
          break;
        case "pricing_clinical":
          trackPricingPlanClick("Clinical");
          break;
      }
    }

    // Call the original onClick handler if provided
    if (onClick) {
      onClick(e);
    }
  };

  return (
    <Button onClick={handleClick} {...props}>
      {children}
    </Button>
  );
}
