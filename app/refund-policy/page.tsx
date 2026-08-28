import LegalPageSection from "@/app/components/legal/legal-page-section";
import type { LegalPageContent } from "@/app/types/legal-page";

const REFUND_POLICY_CONTENT: LegalPageContent = {
  title: "Refund Policy",
  updated: "August 2026",
  intro:
    "RP8 Fitness is a gym membership and fitness services platform, not a retail or e-commerce store, so this policy covers refunds and cancellations for memberships, personal training packages and class bookings rather than product returns.",
  sections: [
    {
      heading: "Membership Cancellation Window",
      paragraphs: [
        "New members may cancel their membership within 7 days of joining for a full refund, provided no sessions, classes or trainer consultations have been used during that period. A nominal processing fee may apply.",
      ],
    },
    {
      heading: "After The Cancellation Window",
      paragraphs: [
        "Once the 7 day window has passed, membership fees are generally non-refundable. Exceptions may be made for documented medical reasons (with supporting proof) or if RP8 Fitness is unable to provide access due to facility closure.",
      ],
    },
    {
      heading: "Personal Training Packages",
      paragraphs: [
        "Unused sessions in a personal training package may be eligible for a partial refund or credit if cancelled within the applicable review period. Please speak with our team for the exact terms of your package.",
      ],
    },
    {
      heading: "Membership Transfers",
      paragraphs: [
        "Instead of a refund, members may request to transfer their remaining membership period to another individual, subject to approval by RP8 Fitness and completion of the transfer formalities.",
      ],
    },
    {
      heading: "Franchise Payments",
      paragraphs: [
        "Franchise fees, deposits and investment payments are governed by the terms of the separate Franchise Agreement signed with RP8 Fitness, and are not covered by this general Refund Policy.",
      ],
    },
    {
      heading: "How To Request A Refund",
      paragraphs: [
        "To request a refund or transfer, please contact our team through the Contact page or speak with reception at your gym. Approved refunds are processed to the original payment method within 7 to 10 business days.",
      ],
    },
    {
      heading: "Contact Us",
      paragraphs: [
        "If you have questions about this Refund Policy, please reach out to us at info@rp8fitness.com or through our Contact page.",
      ],
    },
  ],
};

export default function RefundPolicyPage() {
  return <LegalPageSection content={REFUND_POLICY_CONTENT} />;
}
