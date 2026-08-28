import AboutHeroSection from "@/app/components/about/about-hero-section";
import StatsBarSection from "@/app/components/about/stats-bar-section";
import OurStorySection from "@/app/components/about/our-story-section";
import WhyChooseSection from "@/app/components/home/why-choose-section";
import OurJourneySection from "@/app/components/about/our-journey-section";
import ReviewsSection from "@/app/components/home/reviews-section";
import AboutCtaSection from "@/app/components/about/about-cta-section";
import NewsletterSection from "@/app/components/about/newsletter-section";

export default function AboutPage() {
  return (
    <>
      <AboutHeroSection />
      <StatsBarSection />
      <OurStorySection />
      <WhyChooseSection />
      <OurJourneySection />
      <ReviewsSection />
      <AboutCtaSection />
      <NewsletterSection />
    </>
  );
}
