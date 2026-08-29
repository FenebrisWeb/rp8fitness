import type { Metadata } from "next";
import AboutHeroSection from "@/app/components/about/about-hero-section";
import StatsBarSection from "@/app/components/about/stats-bar-section";
import OurStorySection from "@/app/components/about/our-story-section";
import WhyChooseSection from "@/app/components/home/why-choose-section";
import OurJourneySection from "@/app/components/about/our-journey-section";
import ReviewsSection from "@/app/components/home/reviews-section";
import AboutCtaSection from "@/app/components/about/about-cta-section";
import NewsletterSection from "@/app/components/about/newsletter-section";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "A community, a lifestyle, a promise. Discover the story behind RP8 Fitness — our mission, our journey since 2012, and why thousands of members trust us for training that lasts.",
  alternates: { canonical: "/about" },
  openGraph: {
    title: "About RP8 Fitness",
    description:
      "The story, mission and journey behind RP8 Fitness — a community built for real, lasting results.",
    url: "/about",
  },
};

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
