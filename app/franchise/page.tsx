import FranchiseHeroSection from "@/app/components/franchise/franchise-hero-section";
import FranchiseStatsSection from "@/app/components/franchise/franchise-stats-section";
import WhyPartnerSection from "@/app/components/franchise/why-partner-section";
import InvestmentSection from "@/app/components/franchise/investment-section";
import FranchiseProcessSection from "@/app/components/franchise/franchise-process-section";
import EndToEndSupportSection from "@/app/components/franchise/end-to-end-support-section";
import FranchiseReviewsSection from "@/app/components/franchise/franchise-reviews-section";
import FranchiseCtaSection from "@/app/components/franchise/franchise-cta-section";

export default function FranchisePage() {
  return (
    <>
      <FranchiseHeroSection />
      <FranchiseStatsSection />
      <WhyPartnerSection />
      <InvestmentSection />
      <FranchiseProcessSection />
      <EndToEndSupportSection />
      <FranchiseReviewsSection />
      <FranchiseCtaSection />
    </>
  );
}
