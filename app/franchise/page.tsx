import type { Metadata } from "next";
import FranchiseHeroSection from "@/app/components/franchise/franchise-hero-section";
import FranchiseStatsSection from "@/app/components/franchise/franchise-stats-section";
import WhyPartnerSection from "@/app/components/franchise/why-partner-section";
import InvestmentSection from "@/app/components/franchise/investment-section";
import FranchiseProcessSection from "@/app/components/franchise/franchise-process-section";
import EndToEndSupportSection from "@/app/components/franchise/end-to-end-support-section";
import FranchiseReviewsSection from "@/app/components/franchise/franchise-reviews-section";
import FranchiseCtaSection from "@/app/components/franchise/franchise-cta-section";

export const metadata: Metadata = {
  title: "Franchise Opportunities",
  description:
    "Own an RP8 Fitness franchise and build a profitable, future-ready fitness business. A proven model, high ROI, end-to-end launch support and a fast path from agreement to opening.",
  alternates: { canonical: "/franchise" },
  openGraph: {
    title: "Franchise With RP8 Fitness",
    description:
      "A proven business model, high ROI and end-to-end support — everything you need to open your own RP8 Fitness.",
    url: "/franchise",
  },
};

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
