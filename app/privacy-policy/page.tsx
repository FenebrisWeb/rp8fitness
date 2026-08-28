import LegalPageSection from "@/app/components/legal/legal-page-section";
import type { LegalPageContent } from "@/app/types/legal-page";

const PRIVACY_POLICY_CONTENT: LegalPageContent = {
  title: "Privacy Policy",
  updated: "August 2026",
  intro:
    "RP8 Fitness (\"we\", \"us\", \"our\") operates this website and our gym membership services. This Privacy Policy explains what information we collect from members, visitors and franchise enquirers, how we use it, and the choices you have. By using our website or joining RP8 Fitness, you agree to the practices described here.",
  sections: [
    {
      heading: "Information We Collect",
      paragraphs: [
        "We collect information you provide directly to us, such as when you enquire about membership, sign up for a plan, book a class, apply for a franchise, or contact our team through the website.",
      ],
      list: [
        "Contact details: name, phone number, email address and city.",
        "Membership details: plan selected, preferred zone or class, and training goals you share with us.",
        "Franchise enquiry details: business background and location preferences, where applicable.",
        "Basic usage data such as pages visited and device/browser type, collected automatically to help us improve the website.",
      ],
    },
    {
      heading: "How We Use Your Information",
      paragraphs: [
        "We use the information we collect to respond to your enquiries, set up and manage your membership, communicate updates about classes, timings or offers, and improve our facilities and website experience.",
        "We may send you occasional updates by SMS, WhatsApp or email. You can opt out of promotional messages at any time by contacting us or using the unsubscribe option where provided.",
      ],
    },
    {
      heading: "Health & Fitness Information",
      paragraphs: [
        "If you share health or fitness related information with our trainers, for example during a fitness assessment, it is used only to guide your training program and is not sold or shared with third parties without your consent.",
      ],
    },
    {
      heading: "Cookies & Analytics",
      paragraphs: [
        "Our website may use cookies and similar technologies to remember your preferences (such as light or dark mode) and to understand how visitors use the site, so we can keep improving it. You can disable cookies in your browser settings, though some features may not work as intended.",
      ],
    },
    {
      heading: "How We Share Information",
      paragraphs: [
        "We do not sell your personal information. We may share it with trusted service providers who help us run our operations, such as payment processing, SMS or email delivery, strictly under confidentiality obligations, or when required by law.",
      ],
    },
    {
      heading: "Data Security",
      paragraphs: [
        "We take reasonable technical and organizational measures to protect your information from unauthorized access, alteration or misuse. No method of storage or transmission is completely secure, but we work to keep your data safe.",
      ],
    },
    {
      heading: "Your Choices",
      paragraphs: [
        "You can ask us to access, correct or delete the personal information we hold about you, or to stop receiving promotional communications, by reaching out through our Contact page.",
      ],
    },
    {
      heading: "Children's Privacy",
      paragraphs: [
        "Our services are intended for individuals aged 16 and above. Members under 18 may join with the consent and involvement of a parent or guardian.",
      ],
    },
    {
      heading: "Changes To This Policy",
      paragraphs: [
        "We may update this Privacy Policy from time to time to reflect changes in our practices. The \"Last Updated\" date at the top of this page will always reflect the most recent version.",
      ],
    },
    {
      heading: "Contact Us",
      paragraphs: [
        "If you have any questions about this Privacy Policy or how your information is handled, please reach out to us at info@rp8fitness.com or through our Contact page.",
      ],
    },
  ],
};

export default function PrivacyPolicyPage() {
  return <LegalPageSection content={PRIVACY_POLICY_CONTENT} />;
}
