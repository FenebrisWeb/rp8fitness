import type { Metadata } from "next";
import HeroSection from "@/app/components/home/hero-section";
import AboutSection from "@/app/components/home/about-section";
import WhyChooseSection from "@/app/components/home/why-choose-section";
import ZonesSection from "@/app/components/home/zones-section";
import FranchiseSection from "@/app/components/home/franchise-section";
import GermanEquipmentSection from "@/app/components/home/german-equipment-section";
import OpenTerraceSection from "@/app/components/home/open-terrace-section";
import ReviewsSection from "@/app/components/home/reviews-section";
import MembershipSection from "@/app/components/home/membership-section";
import CtaBannerSection from "@/app/components/home/cta-banner-section";

export const metadata: Metadata = {
  title: "RP8 Fitness | Train Smarter With 10+ Zones Under One Roof",
  description:
    "Join RP8 Fitness for 10+ training zones, imported German equipment, expert trainers and a rooftop pickleball court. A gym built for real, lasting results — explore memberships today.",
  alternates: { canonical: "/" },
  openGraph: {
    title: "RP8 Fitness | Train Smarter With 10+ Zones Under One Roof",
    description:
      "10+ training zones, imported German equipment, expert trainers and a rooftop pickleball court — all under one roof at RP8 Fitness.",
    url: "/",
  },
};

export default function Home() {
  return (
    <>
      <HeroSection />
      <AboutSection />
      <ZonesSection />
      <OpenTerraceSection />
      <GermanEquipmentSection />
      <FranchiseSection />
      <WhyChooseSection />
      <ReviewsSection />
      <MembershipSection />
      <CtaBannerSection />
    </>
  );
}
