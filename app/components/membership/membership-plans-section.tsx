"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import DragScrollRow from "@/app/components/shared/drag-scroll-row";
import type { MembershipPlan, MembershipPlansContent } from "@/app/types/membership-plans";

const MEMBERSHIP_PLANS_CONTENT: MembershipPlansContent = {
  eyebrow: "Membership Plans",
  headline: "Pick The Plan That Fits Your Goals",
  plans: [
    {
      id: "basic",
      name: "Basic",
      tagline: "Get started on your fitness journey",
      price: "₹1,499",
      billingNote: "Billed monthly",
      features: ["Access To Gym Floor", "Cardio Equipment", "Locker Facilities", "1 Group Class / Week"],
      ctaLabel: "Choose Plan",
    },
    {
      id: "plus",
      name: "Plus",
      tagline: "More access. More results.",
      price: "₹2,499",
      billingNote: "Billed monthly",
      features: [
        "Everything In Basic",
        "Strength Training Area",
        "Unlimited Group Classes",
        "Body Composition Analysis",
        "2 Guest Passes / Month",
      ],
      ctaLabel: "Choose Plan",
    },
    {
      id: "premium",
      name: "Premium",
      tagline: "All access. All results.",
      price: "₹3,499",
      billingNote: "Billed monthly",
      features: [
        "Everything In Plus",
        "CrossFit & Functional Zone",
        "Zumba & Dance Classes",
        "Boxing Area Access",
        "4 Guest Passes / Month",
        "Diet & Workout Plan",
      ],
      ctaLabel: "Choose Plan",
      popular: true,
    },
    {
      id: "elite",
      name: "Elite",
      tagline: "The ultimate fitness experience",
      price: "₹5,499",
      billingNote: "Billed monthly",
      features: [
        "Everything In Premium",
        "Personal Training (2 / Month)",
        "Priority Booking",
        "Unlimited Guest Passes",
        "Supplement Discounts",
        "Free InBody Analysis (Monthly)",
      ],
      ctaLabel: "Choose Plan",
    },
  ],
  footnote: "All memberships include access to Cafe, Supplement Store & Member Events.",
};

const PLAN_ICONS: Record<string, string> = {
  basic: "M6 11V8a6 6 0 1112 0v3M5 11h14v9H5z",
  plus: "M8 11a2.5 2.5 0 100-5 2.5 2.5 0 000 5zM16 11a2.5 2.5 0 100-5 2.5 2.5 0 000 5zM2 20v-.5A5 5 0 017 14.5h1M14 8h6M17 5v6",
  premium: "M3 8l4 3 5-7 5 7 4-3-2 11H5L3 8zM7 20h10",
  elite: "M8 4h8v3a4 4 0 01-4 4 4 4 0 01-4-4V4zM4 4h4v2a4 4 0 01-4 4M20 4h-4v2a4 4 0 004 4M12 11v4M9 20h6M9 20c0-2 1-3 3-3s3 1 3 3",
};

function PlanIcon({ id, className }: { id: string; className?: string }) {
  const d = PLAN_ICONS[id] ?? PLAN_ICONS.basic;
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden>
      <path d={d} />
    </svg>
  );
}

function CheckIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M5 13l4 4L19 7" />
    </svg>
  );
}

function PlanCard({ plan, className = "" }: { plan: MembershipPlan; className?: string }) {
  return (
    <div
      className={`flex h-full flex-col rounded-2xl border p-6 ${
        plan.popular ? "border-accent-vivid" : "border-chalk/10 bg-ink"
      } ${className}`}
      // bg-accent-vivid/10 would composite over the page's own background —
      // in light mode that's a near-white tint the card's white text
      // disappears into. Mixing the accent into --ink instead keeps the
      // card reliably dark (with a faint accent tint) in both themes, same
      // technique as the BMI category guide's active-state cards.
      style={plan.popular ? { backgroundColor: "color-mix(in srgb, var(--accent-vivid) 12%, var(--ink))" } : undefined}
    >
      {plan.popular && (
        <span className="mb-4 inline-flex w-fit items-center rounded-full bg-accent-vivid px-3 py-1 font-mono text-[10px] font-bold uppercase tracking-[0.1em] text-accent-vivid-contrast">
          Most Popular
        </span>
      )}

      <span
        className={`flex h-11 w-11 items-center justify-center rounded-lg border ${
          plan.popular ? "border-accent-vivid text-accent-vivid" : "border-chalk/20 text-chalk"
        }`}
      >
        <PlanIcon id={plan.id} className="h-5 w-5" />
      </span>

      <p className="mt-4 font-display text-lg font-black uppercase tracking-tight text-chalk">{plan.name}</p>
      <p className="mt-1 font-mono text-xs leading-snug text-chalk/70">{plan.tagline}</p>

      <div className="mt-4">
        <span className="font-display text-3xl font-black text-chalk">{plan.price}</span>
        <span className="font-mono text-sm text-chalk/70"> /month</span>
        <p className="mt-0.5 font-mono text-[11px] text-chalk/60">{plan.billingNote}</p>
      </div>

      <ul className="mt-5 flex flex-1 flex-col gap-2.5">
        {plan.features.map((feature) => (
          <li key={feature} className="flex items-start gap-2">
            <CheckIcon className="mt-0.5 h-4 w-4 flex-none text-accent-vivid" />
            <span className="font-mono text-xs leading-snug text-chalk">{feature}</span>
          </li>
        ))}
      </ul>

      <Link
        href="/contact"
        className={`mt-6 flex cursor-pointer items-center justify-center gap-2 rounded-full px-5 py-3 font-mono text-xs font-bold uppercase tracking-[0.1em] transition-transform hover:scale-105 ${
          plan.popular
            ? "bg-accent-vivid text-accent-vivid-contrast"
            : "border border-chalk/25 text-chalk hover:border-accent-vivid hover:text-accent-vivid"
        }`}
      >
        {plan.ctaLabel}
        <span aria-hidden className="text-sm leading-none">
          ›
        </span>
      </Link>
    </div>
  );
}

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  show: { opacity: 1, y: 0 },
};

export default function MembershipPlansSection() {
  const { eyebrow, headline, plans, footnote } = MEMBERSHIP_PLANS_CONTENT;

  return (
    <section id="plans" className="relative scroll-mt-20 overflow-hidden bg-transparent pb-16 pt-10 sm:pb-20 sm:pt-14">
      <div className="mx-auto w-full max-w-[1700px] px-6 sm:px-10">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          variants={fadeUp}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="text-center"
        >
          <div className="flex items-center justify-center gap-3">
            <span aria-hidden className="h-px w-10 bg-accent-strong/40" />
            <span className="font-mono text-xs font-bold uppercase tracking-[0.15em] text-accent-strong">
              {eyebrow}
            </span>
            <span aria-hidden className="h-px w-10 bg-accent-strong/40" />
          </div>
          <h2 className="mt-3 font-display text-2xl font-black uppercase tracking-tight text-foreground sm:text-3xl">
            {headline}
          </h2>
        </motion.div>

        {/* Four cards is cramped as a mobile column stack — a drag/swipe row
            keeps each card at full width and takes far less vertical space. */}
        <DragScrollRow className="mt-10 gap-4 sm:hidden">
          {plans.map((plan) => (
            <div key={plan.id} className="w-[260px] flex-none">
              <PlanCard plan={plan} />
            </div>
          ))}
        </DragScrollRow>

        <div className="mt-10 hidden gap-5 sm:grid sm:grid-cols-2 lg:grid-cols-4">
          {plans.map((plan) => (
            <PlanCard key={plan.id} plan={plan} />
          ))}
        </div>

        <p className="mt-8 flex items-center justify-center gap-2 text-center font-mono text-xs text-foreground">
          <svg viewBox="0 0 24 24" className="h-4 w-4 flex-none text-accent-strong" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
            <path d="M12 3l7 3v6c0 5-3.5 8-7 9-3.5-1-7-4-7-9V6l7-3zM8.7 12.2l2.3 2.3 4.3-4.5" />
          </svg>
          {footnote}
        </p>
      </div>
    </section>
  );
}
