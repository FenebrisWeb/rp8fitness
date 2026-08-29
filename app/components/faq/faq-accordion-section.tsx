"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import type { FaqCategory } from "@/app/types/faq-accordion";
import AnimatedWords from "@/app/components/shared/animated-words";
import { fadeUpItem, staggerContainer, staggerContainerTight, viewportOnce } from "@/app/lib/motion";

const CATEGORIES: FaqCategory[] = [
  {
    id: "membership",
    label: "Membership",
    items: [
      {
        id: "plans",
        question: "What are the membership plans available?",
        answer:
          "We offer a variety of flexible membership plans to suit your fitness goals and lifestyle. Options include Monthly, Quarterly, Half-Yearly and Annual plans.",
      },
      {
        id: "freeze",
        question: "Can I freeze my membership?",
        answer:
          "Yes, memberships can be frozen for medical reasons or travel with prior notice to our team. Please check with your gym reception for the exact freeze duration allowed on your plan.",
      },
      {
        id: "joining-fee",
        question: "Is there a joining fee?",
        answer:
          "A one-time joining fee may apply depending on the plan and ongoing offers. Our team will share the exact details before you sign up.",
      },
      {
        id: "timings",
        question: "What are the gym timings?",
        answer:
          "Most RP8 Fitness locations are open Monday to Saturday from 5:00 AM to 11:00 PM and Sunday from 6:00 AM to 10:00 PM. Timings may vary slightly by location.",
      },
      {
        id: "personal-training",
        question: "Do you offer personal training?",
        answer: "Yes, personal training packages are available with certified trainers who create a plan tailored to your specific goals.",
      },
      {
        id: "inclusions",
        question: "What facilities are included in my membership?",
        answer:
          "Depending on your plan, membership can include access to all training zones, the rooftop pickleball court, cafe and more. Check your plan details for exact inclusions.",
      },
      {
        id: "shower-locker",
        question: "Do you have shower and locker facilities?",
        answer: "Yes, all RP8 Fitness outlets are equipped with shower and locker facilities for members.",
      },
      {
        id: "cancel",
        question: "How can I cancel my membership?",
        answer:
          "You can request a cancellation by speaking with our team at your gym or through our Contact page. Please refer to our Refund Policy for cancellation terms.",
      },
    ],
  },
  {
    id: "facilities",
    label: "Facilities & Zones",
    items: [
      {
        id: "zones-count",
        question: "How many zones does RP8 Fitness have?",
        answer: "RP8 Fitness gyms are built around 10+ dedicated zones, including cardio, strength, functional training, boxing and more.",
      },
      {
        id: "pickleball",
        question: "Is the rooftop pickleball court open to all members?",
        answer: "Yes, the rooftop pickleball court is available to members as part of select plans, subject to booking and availability.",
      },
      {
        id: "equipment",
        question: "What equipment do you use?",
        answer: "We use imported German tech machines designed for precision, safety and long term durability.",
      },
      {
        id: "parking",
        question: "Is parking available at RP8 Fitness?",
        answer: "Parking availability depends on the specific outlet. Please check with your local RP8 Fitness for details.",
      },
      {
        id: "cafe",
        question: "Do you have a cafe on site?",
        answer: "Yes, most RP8 Fitness locations have an in-house cafe offering a protein-forward menu for members.",
      },
    ],
  },
  {
    id: "classes",
    label: "Classes",
    items: [
      {
        id: "class-types",
        question: "What group classes do you offer?",
        answer: "We offer a range of group classes including Zumba, functional training and more, depending on the outlet schedule.",
      },
      {
        id: "class-booking",
        question: "Do I need to book a class in advance?",
        answer: "Yes, we recommend booking group classes in advance to secure your spot, as class sizes are limited.",
      },
      {
        id: "class-inclusion",
        question: "Are classes included in my membership?",
        answer: "Class access depends on your membership plan. Some plans include unlimited classes, while others may charge per session.",
      },
      {
        id: "class-beginners",
        question: "Can beginners join group classes?",
        answer: "Absolutely, our classes are designed to welcome all fitness levels, and our trainers are happy to guide first-timers.",
      },
      {
        id: "class-miss",
        question: "What happens if I miss a booked class?",
        answer: "If you cannot attend a booked class, please cancel in advance through your gym reception so the spot can be offered to another member.",
      },
    ],
  },
  {
    id: "training",
    label: "Training",
    items: [
      {
        id: "training-start",
        question: "How do I get started with personal training?",
        answer: "You can enquire about personal training at your gym reception or through our Contact page, and our team will match you with a suitable trainer.",
      },
      {
        id: "training-certified",
        question: "Are trainers certified?",
        answer: "Yes, all RP8 Fitness trainers are certified fitness professionals who create tailored plans based on your goals.",
      },
      {
        id: "training-switch",
        question: "Can I switch trainers if needed?",
        answer: "Yes, you can request a change of trainer at any time by speaking with our gym management team.",
      },
      {
        id: "training-nutrition",
        question: "Do you offer nutrition guidance?",
        answer: "Many of our trainers offer basic nutrition guidance alongside training. For a detailed diet plan, we can connect you with a specialist.",
      },
      {
        id: "training-addon",
        question: "Is personal training available for all membership plans?",
        answer: "Personal training is available as an add-on to any membership plan, or as a standalone package.",
      },
    ],
  },
  {
    id: "franchise",
    label: "Franchise",
    items: [
      {
        id: "franchise-start",
        question: "How do I start an RP8 Fitness franchise?",
        answer: "You can begin by sharing your details through our Franchise page. Our team will reach out to discuss the process and next steps.",
      },
      {
        id: "franchise-area",
        question: "What is the minimum area required for a franchise?",
        answer: "A minimum area of 5000+ sq ft is required to set up an RP8 Fitness franchise outlet.",
      },
      {
        id: "franchise-support",
        question: "What support does RP8 Fitness provide to franchise partners?",
        answer:
          "We provide end to end support including location assistance, layout planning, staff training, marketing and ongoing operations support.",
      },
      {
        id: "franchise-timeline",
        question: "How long does it take to launch a franchise?",
        answer: "Timelines vary by location, but our streamlined process is designed to get your outlet from agreement to launch as efficiently as possible.",
      },
      {
        id: "franchise-investment",
        question: "Can I get more details on investment requirements?",
        answer: "Yes, please visit our Franchise page or contact our franchise team directly for a detailed investment plan.",
      },
    ],
  },
  {
    id: "payments",
    label: "Payments & Billing",
    items: [
      {
        id: "payment-methods",
        question: "What payment methods do you accept?",
        answer: "We accept major debit and credit cards, UPI and net banking for membership payments.",
      },
      {
        id: "installments",
        question: "Can I pay for my membership in installments?",
        answer: "Depending on the plan, installment options may be available. Please check with our team at the time of joining.",
      },
      {
        id: "renewal-notice",
        question: "Will I be notified before my membership renews?",
        answer: "Yes, we send a reminder before your membership is due for renewal so you can plan accordingly.",
      },
      {
        id: "receipt",
        question: "How do I get a payment receipt?",
        answer: "A receipt is shared with you at the time of payment. You can also request a copy from our reception team.",
      },
      {
        id: "payment-issue",
        question: "What if I face an issue with a payment?",
        answer: "Please reach out to our team through the Contact page with your payment details, and we will help resolve it promptly.",
      },
    ],
  },
  {
    id: "rules",
    label: "Rules & Policies",
    items: [
      {
        id: "dress-code",
        question: "Do you have a dress code?",
        answer: "We ask members to wear appropriate workout attire and closed-toe shoes while training for safety and hygiene.",
      },
      {
        id: "guest-pass",
        question: "Can I bring a guest to the gym?",
        answer: "Guest passes may be available at select outlets. Please check with your gym reception for guest policy details.",
      },
      {
        id: "equipment-rules",
        question: "What is your policy on equipment usage?",
        answer: "We ask members to use equipment responsibly, re-rack weights after use and be mindful of other members during peak hours.",
      },
      {
        id: "refund-policy",
        question: "What is your refund policy?",
        answer: "Our Refund Policy covers membership cancellations and training package refunds. You can read the full policy on our Refund Policy page.",
      },
      {
        id: "privacy-policy",
        question: "What is your privacy policy?",
        answer: "We take member privacy seriously. You can read our full Privacy Policy for details on how we handle your information.",
      },
    ],
  },
  {
    id: "other",
    label: "Other",
    items: [
      {
        id: "merchandise",
        question: "Do you have RP8 Fitness merchandise?",
        answer: "Availability of branded merchandise varies by outlet. Please check with your gym reception.",
      },
      {
        id: "updates",
        question: "How can I stay updated on offers and events?",
        answer: "You can follow us on Instagram, Facebook and YouTube, or subscribe to updates through our website for the latest news.",
      },
      {
        id: "other-contact",
        question: "Who do I contact for other questions?",
        answer: "For anything not covered here, feel free to reach out through our Contact page and our team will be happy to help.",
      },
    ],
  },
];

const CATEGORY_ICONS: Record<string, string> = {
  membership: "M12 7a3.2 3.2 0 100 6.4A3.2 3.2 0 0012 7zM5 21v-2.5A6.5 6.5 0 0111.5 12h1A6.5 6.5 0 0119 18.5V21",
  facilities: "M4 8v8M20 8v8M7 6v12M17 6v12M2 10v4M22 10v4M7 12h10",
  classes: "M12 7a3.2 3.2 0 100 6.4A3.2 3.2 0 0012 7zM5 21v-2.5A6.5 6.5 0 0111.5 12h1A6.5 6.5 0 0119 18.5V21M17.5 8.5a2.2 2.2 0 100 4.4",
  training: "M12 2a10 10 0 100 20 10 10 0 000-20zM12 7l2 5-2 5-2-5z",
  franchise: "M4 21h16M5 21V11l7-6 7 6v10M9 21v-6h6v6",
  payments: "M3 6h18v12H3zM3 10h18M7 15h4",
  rules: "M12 3l7 3v6c0 5-3.5 8-7 9-3.5-1-7-4-7-9V6l7-3zM8.7 12.2l2.3 2.3 4.3-4.5",
  other: "M5 12h.01M12 12h.01M19 12h.01",
};

function CategoryIcon({ id, className }: { id: string; className?: string }) {
  const d = CATEGORY_ICONS[id] ?? CATEGORY_ICONS.membership;
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden>
      <path d={d} />
    </svg>
  );
}

export default function FaqAccordionSection({ searchQuery = "" }: { searchQuery?: string }) {
  const [activeCategoryId, setActiveCategoryId] = useState(CATEGORIES[0].id);
  const [openItemId, setOpenItemId] = useState<string | null>(CATEGORIES[0].items[0].id);

  const query = searchQuery.trim().toLowerCase();
  const isSearching = query.length > 0;

  const searchResults = useMemo(() => {
    if (!isSearching) return [];
    return CATEGORIES.flatMap((category) => category.items.filter((item) => item.question.toLowerCase().includes(query)));
  }, [query, isSearching]);

  const activeCategory = CATEGORIES.find((category) => category.id === activeCategoryId) ?? CATEGORIES[0];
  const visibleItems = isSearching ? searchResults : activeCategory.items;

  const selectCategory = (id: string) => {
    setActiveCategoryId(id);
    const next = CATEGORIES.find((category) => category.id === id);
    setOpenItemId(next?.items[0]?.id ?? null);
  };

  return (
    <section className="relative overflow-hidden bg-transparent pb-16 pt-10 sm:pb-20 sm:pt-14">
      <div className="mx-auto w-full max-w-[1700px] px-6 sm:px-10">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          variants={staggerContainer}
          className="text-center"
        >
          <motion.div variants={fadeUpItem} className="flex items-center justify-center gap-3">
            <span aria-hidden className="h-px w-10 bg-accent-strong/40" />
            <span className="font-mono text-xs font-bold uppercase tracking-[0.15em] text-accent-strong">
              General Questions
            </span>
            <span aria-hidden className="h-px w-10 bg-accent-strong/40" />
          </motion.div>
          <h2 className="mt-3 font-display text-2xl font-black uppercase tracking-tight text-foreground sm:text-3xl">
            <AnimatedWords text="Everything You Need To Know" />
          </h2>
        </motion.div>

        <div className="mt-10 grid grid-cols-1 gap-6 sm:mt-14 lg:grid-cols-[280px_minmax(0,1fr)]">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={viewportOnce}
            variants={staggerContainerTight}
            className={`flex flex-col gap-2 ${isSearching ? "pointer-events-none opacity-40" : ""}`}
          >
            {CATEGORIES.map((category) => {
              const active = category.id === activeCategoryId && !isSearching;
              return (
                <motion.button
                  key={category.id}
                  variants={fadeUpItem}
                  type="button"
                  onClick={() => selectCategory(category.id)}
                  className={`flex cursor-pointer items-center gap-3 rounded-xl border px-4 py-3.5 text-left font-mono text-sm font-bold transition-colors ${
                    active
                      ? "border-accent-vivid bg-accent-vivid text-accent-vivid-contrast"
                      : "border-chalk/10 bg-ink text-chalk hover:border-accent-vivid/50"
                  }`}
                >
                  <CategoryIcon id={category.id} className="h-5 w-5 flex-none" />
                  {category.label}
                </motion.button>
              );
            })}
          </motion.div>

          <div className="flex flex-col gap-3">
            {isSearching && (
              <p className="mb-1 font-mono text-xs uppercase tracking-[0.1em] text-foreground">
                {visibleItems.length > 0
                  ? `${visibleItems.length} result${visibleItems.length === 1 ? "" : "s"} for "${searchQuery.trim()}"`
                  : `No results for "${searchQuery.trim()}"`}
              </p>
            )}

            {visibleItems.map((item) => {
              const open = item.id === openItemId;
              return (
                <div key={item.id} className="rounded-xl border border-chalk/10 bg-ink px-5 py-4">
                  <button
                    type="button"
                    onClick={() => setOpenItemId(open ? null : item.id)}
                    aria-expanded={open}
                    className="flex w-full cursor-pointer items-center justify-between gap-4 text-left"
                  >
                    <span className={`font-mono text-sm font-bold ${open ? "text-accent-vivid" : "text-chalk"}`}>
                      {item.question}
                    </span>
                    <span
                      aria-hidden
                      className={`flex h-7 w-7 flex-none items-center justify-center rounded-full border text-sm ${
                        open ? "border-accent-vivid text-accent-vivid" : "border-chalk/25 text-chalk"
                      }`}
                    >
                      {open ? "−" : "+"}
                    </span>
                  </button>
                  {open && (
                    <p className="mt-3 font-mono text-sm leading-relaxed text-chalk">{item.answer}</p>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
