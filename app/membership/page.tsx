import type { Metadata } from "next";
import MembershipHeroSection from "@/app/components/membership/membership-hero-section";
import MembershipPlansSection from "@/app/components/membership/membership-plans-section";
import ComparePlansSection from "@/app/components/membership/compare-plans-section";
import TransformationHubSection from "@/app/components/membership/transformation-hub-section";
import ReviewsSection from "@/app/components/home/reviews-section";
import MembershipCtaSection from "@/app/components/membership/membership-cta-section";

export const metadata: Metadata = {
  title: "Membership Plans",
  description:
    "Compare RP8 Fitness membership plans — Basic, Plus, Premium and Elite. Flexible monthly, quarterly and annual pricing, no joining fee, and 15% off annual plans right now.",
  alternates: { canonical: "/membership" },
  openGraph: {
    title: "RP8 Fitness Membership Plans",
    description:
      "Flexible plans for every goal — compare Basic, Plus, Premium and Elite, and get 15% off annual plans.",
    url: "/membership",
  },
};

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
