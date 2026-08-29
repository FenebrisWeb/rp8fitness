import type { Metadata } from "next";
import FaqPageContent from "@/app/components/faq/faq-page-content";
import FaqSupportBannerSection from "@/app/components/faq/faq-support-banner-section";

export const metadata: Metadata = {
  title: "Frequently Asked Questions",
  description:
    "Find answers to common questions about RP8 Fitness memberships, facilities and zones, classes, personal training, franchise opportunities, payments and policies.",
  alternates: { canonical: "/faq" },
  openGraph: {
    title: "FAQs | RP8 Fitness",
    description: "Answers to common questions about membership, facilities, classes, training and franchising with RP8 Fitness.",
    url: "/faq",
  },
};

export default function FaqPage() {
  return (
    <>
      <FaqPageContent />
      <FaqSupportBannerSection />
    </>
  );
}
