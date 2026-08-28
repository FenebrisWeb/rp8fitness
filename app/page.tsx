import HeroSection from "@/app/components/home/hero-section";
import AboutSection from "@/app/components/home/about-section";
import WhyChooseSection from "@/app/components/home/why-choose-section";
import ZonesSection from "@/app/components/home/zones-section";
import FranchiseSection from "@/app/components/home/franchise-section";
import GermanEquipmentSection from "@/app/components/home/german-equipment-section";
import OpenTerraceSection from "@/app/components/home/open-terrace-section";
import ReviewsSection from "@/app/components/home/reviews-section";

export default function Home() {
  return (
    <>
      <HeroSection />
      <AboutSection />
      <ZonesSection />
      <GermanEquipmentSection />
      <OpenTerraceSection />
      <FranchiseSection />
      <WhyChooseSection />
      <ReviewsSection />
    </>
  );
}
