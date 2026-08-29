import type { Metadata } from "next";
import LegalPageSection from "@/app/components/legal/legal-page-section";
import type { LegalPageContent } from "@/app/types/legal-page";

export const metadata: Metadata = {
  title: "Terms & Conditions",
  description:
    "Read the Terms & Conditions governing membership eligibility, website use and services at RP8 Fitness.",
  alternates: { canonical: "/terms-and-conditions" },
  robots: { index: true, follow: true },
};

const TERMS_CONTENT: LegalPageContent = {
  title: "Terms & Conditions",
  updated: "August 2026",
  intro:
    "These Terms & Conditions govern your use of the RP8 Fitness website and your membership at any RP8 Fitness gym. By joining RP8 Fitness or using this website, you agree to the terms set out below.",
  sections: [
    {
      heading: "Membership Eligibility",
      paragraphs: [
        "Membership is open to individuals aged 16 and above. Members under 18 require the consent of a parent or guardian and must be accompanied for their first orientation session.",
        "You are required to disclose any relevant medical conditions before starting a training program, so our trainers can guide you safely.",
      ],
    },
    {
      heading: "Membership Plans & Fees",
      paragraphs: [
        "RP8 Fitness offers access to gym facilities, group classes and personal training through membership plans, not physical products. Fees are payable in advance as per the plan you select at the time of joining.",
        "Plan pricing, inclusions and validity may change from time to time. Any change will not affect an active membership already paid for during its current term.",
      ],
    },
    {
      heading: "Code of Conduct",
      paragraphs: [
        "All members are expected to treat staff, trainers and fellow members with respect, follow gym etiquette, and use equipment responsibly. RP8 Fitness reserves the right to suspend membership in case of repeated misconduct.",
      ],
    },
    {
      heading: "Health & Safety",
      paragraphs: [
        "Exercise carries an inherent risk of injury. We recommend consulting a physician before beginning any new fitness routine, particularly if you have a pre-existing medical condition.",
        "RP8 Fitness and its trainers are not liable for injuries resulting from improper use of equipment, disregard of trainer guidance, or undisclosed medical conditions.",
      ],
    },
    {
      heading: "Facility Usage & Class Bookings",
      paragraphs: [
        "Access to zones, classes and the rooftop terrace is subject to gym timings and applicable booking policies, which may vary by location. We recommend booking group classes in advance to secure your spot.",
      ],
    },
    {
      heading: "Franchise Enquiries",
      paragraphs: [
        "Franchise partnership enquiries made through this website are non-binding and subject to a separate Franchise Agreement, which governs investment terms, territory and operational requirements in detail.",
      ],
    },
    {
      heading: "Intellectual Property",
      paragraphs: [
        "The RP8 Fitness name, logo, website content and branding are the property of RP8 Fitness and may not be used, copied or reproduced without prior written permission.",
      ],
    },
    {
      heading: "Limitation of Liability",
      paragraphs: [
        "To the extent permitted by law, RP8 Fitness is not liable for any indirect or incidental loss arising from your use of our facilities or this website.",
      ],
    },
    {
      heading: "Governing Law",
      paragraphs: [
        "These Terms & Conditions are governed by the laws of India, and any disputes will be subject to the jurisdiction of the courts local to the relevant RP8 Fitness outlet.",
      ],
    },
    {
      heading: "Changes To These Terms",
      paragraphs: [
        "We may revise these Terms & Conditions from time to time. Continued use of our services after changes are posted constitutes acceptance of the updated terms.",
      ],
    },
    {
      heading: "Contact Us",
      paragraphs: [
        "For any questions about these Terms & Conditions, please reach out to us at info@rp8fitness.com or through our Contact page.",
      ],
    },
  ],
};

export default function TermsAndConditionsPage() {
  return <LegalPageSection content={TERMS_CONTENT} />;
}
