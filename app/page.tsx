import HeroSection from "@/app/components/home/hero-section";
import AboutSection from "@/app/components/home/about-section";
import ZonesSection from "@/app/components/home/zones-section";
import FranchiseSection from "@/app/components/home/franchise-section";
import GermanEquipmentSection from "@/app/components/home/german-equipment-section";
import OpenTerraceSection from "@/app/components/home/open-terrace-section";

export default function Home() {
  return (
    <>
      <HeroSection />
      <AboutSection />
      <ZonesSection />
      <GermanEquipmentSection />
      <OpenTerraceSection />
      <FranchiseSection />
    </>
  );
}
