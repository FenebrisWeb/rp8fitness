import type { Metadata } from "next";
import ContactHeroSection from "@/app/components/contact/contact-hero-section";
import ContactFormSection from "@/app/components/contact/contact-form-section";
import FaqBannerSection from "@/app/components/contact/faq-banner-section";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Get in touch with RP8 Fitness for membership enquiries, franchise opportunities or general questions. Visit our gym, call, email or send us a message online.",
  alternates: { canonical: "/contact" },
  openGraph: {
    title: "Contact RP8 Fitness",
    description: "Reach out to RP8 Fitness for membership, franchise or general enquiries.",
    url: "/contact",
  },
};

export default function ContactPage() {
  return (
    <>
      <ContactHeroSection />
      <ContactFormSection />
      <FaqBannerSection />
    </>
  );
}
