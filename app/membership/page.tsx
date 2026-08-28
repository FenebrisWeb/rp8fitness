import MembershipHeroSection from "@/app/components/membership/membership-hero-section";
import MembershipPlansSection from "@/app/components/membership/membership-plans-section";
import ComparePlansSection from "@/app/components/membership/compare-plans-section";
import TransformationHubSection from "@/app/components/membership/transformation-hub-section";
import ReviewsSection from "@/app/components/home/reviews-section";
import MembershipCtaSection from "@/app/components/membership/membership-cta-section";

export default function MembershipPage() {
  return (
    <>
      <MembershipHeroSection />
      <MembershipPlansSection />
      <ComparePlansSection />
      <TransformationHubSection />
      <ReviewsSection />
      <MembershipCtaSection />
    </>
  );
}
