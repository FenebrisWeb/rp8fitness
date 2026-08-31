"use client";

import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from "react";
import JoinNowModal from "./join-now-modal";

// Every "give me a call" style CTA across the site funnels through this one
// popup instead of each section wiring its own copy of it. `variant` picks a
// preset (join/franchise/tour/brochure/zone); `context` fills in the one
// blank each preset leaves for the specific thing being asked about (a zone
// name, a service name) so the popup still reads as written for that button
// instead of a generic catch-all.
export type EnquiryVariant = "join" | "franchise" | "tour" | "brochure" | "zone";

interface OpenOptions {
  variant?: EnquiryVariant;
  context?: string;
}

interface EnquiryModalContextValue {
  openEnquiry: (options?: OpenOptions) => void;
}

const EnquiryModalContext = createContext<EnquiryModalContextValue | null>(null);

export function useEnquiryModal() {
  const ctx = useContext(EnquiryModalContext);
  if (!ctx) throw new Error("useEnquiryModal must be used within EnquiryModalProvider");
  return ctx;
}

function buildProps(variant: EnquiryVariant, context?: string) {
  switch (variant) {
    case "franchise":
      return {
        badgeLabel: "Franchise Enquiry",
        titleLine1: "Own A Location",
        titleAccent: "Near You",
        description: "Share your details and our franchise team will call you with investment, area and timeline info.",
        perks: [
          "5000+ sq ft franchise model with proven ROI",
          "End to end setup, staff training & marketing support",
          "A dedicated franchise manager for your onboarding",
        ],
        ctaLabel: "Request Franchise Info",
        sendingLabel: "Sending your request...",
        successTitle: "Request Received!",
        successMessage: "Our franchise team will call you within 24 hours with the full investment details.",
        emailRequired: true,
      };
    case "tour":
      return {
        badgeLabel: "Free Gym Tour",
        titleLine1: "Come See",
        titleAccent: "RP8 In Person",
        description: "Leave your details and we'll set up a free walkthrough of the gym at a time that works for you.",
        perks: [
          "A guided walkthrough of every training zone",
          "Meet the trainers before you commit to anything",
          "No obligation, no pressure",
        ],
        ctaLabel: "Book My Tour",
        sendingLabel: "Booking your tour...",
        successTitle: "Tour Requested!",
        successMessage: "A coach will call you shortly to confirm a time that works for you.",
      };
    case "brochure":
      return {
        badgeLabel: "Franchise Brochure",
        titleLine1: "Get The Full",
        titleAccent: "Franchise Details",
        description: "Leave your details and we'll email you the full franchise brochure, investment and support breakdown.",
        perks: [
          "Complete investment & area requirements",
          "Franchise support model, step by step",
          "Real numbers from existing outlets",
        ],
        ctaLabel: "Send Me The Brochure",
        sendingLabel: "Sending...",
        successTitle: "On Its Way!",
        successMessage: "Check your inbox, the franchise brochure is being sent to your email now.",
        emailRequired: true,
      };
    case "zone": {
      const label = context ? `${context}?` : "This Zone?";
      return {
        badgeLabel: context ? `Ask About ${context}` : "Ask About This Zone",
        titleLine1: "Curious About",
        titleAccent: label,
        description: "Leave your details and a coach will call you back with everything you need to know.",
        perks: [
          "A free trial session to try it yourself",
          "Guidance from a certified trainer",
          "No pressure, just answers",
        ],
        ctaLabel: "Ask A Coach",
        sendingLabel: "Sending your question...",
        successTitle: "Got It!",
        successMessage: "A coach will call you back shortly with everything you need to know.",
      };
    }
    case "join":
    default:
      return undefined;
  }
}

export function EnquiryModalProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const [options, setOptions] = useState<OpenOptions>({});

  const openEnquiry = useCallback((next?: OpenOptions) => {
    setOptions(next ?? {});
    setOpen(true);
  }, []);

  const value = useMemo(() => ({ openEnquiry }), [openEnquiry]);
  const modalProps = buildProps(options.variant ?? "join", options.context);

  return (
    <EnquiryModalContext.Provider value={value}>
      {children}
      <JoinNowModal open={open} onClose={() => setOpen(false)} {...modalProps} />
    </EnquiryModalContext.Provider>
  );
}
