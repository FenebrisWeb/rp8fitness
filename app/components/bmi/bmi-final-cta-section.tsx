"use client";

import Link from "next/link";
import { motion } from "framer-motion";

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  show: { opacity: 1, y: 0 },
};

export default function BmiFinalCtaSection() {
  return (
    <section className="relative overflow-hidden bg-transparent pb-16 sm:pb-20">
      <div className="mx-auto w-full max-w-[1700px] px-6 sm:px-10">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          variants={fadeUp}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col items-center gap-6 rounded-2xl border border-chalk/10 bg-ink p-6 text-center sm:rounded-3xl sm:p-8 lg:flex-row lg:items-center lg:justify-between lg:text-left"
        >
          <div className="flex flex-col items-center gap-4 lg:flex-row lg:items-center">
            <span className="flex h-12 w-12 flex-none items-center justify-center rounded-full border border-accent-vivid/50 text-accent-vivid">
              <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                <path d="M8 4h8v3a4 4 0 01-4 4 4 4 0 01-4-4V4zM4 4h4v2a4 4 0 01-4 4M20 4h-4v2a4 4 0 004 4M12 11v4M9 20h6M9 20c0-2 1-3 3-3s3 1 3 3" />
              </svg>
            </span>

            <div>
              <p className="font-display text-xl font-black uppercase tracking-tight text-chalk sm:text-2xl">
                Ready To <span className="text-accent-vivid">Transform?</span>
              </p>
              <p className="mx-auto mt-1 max-w-sm font-mono text-sm text-chalk lg:mx-0">
                Join RP8 Fitness today and start your journey towards a healthier, stronger you!
              </p>
            </div>
          </div>

          <div className="flex flex-none flex-wrap items-center justify-center gap-3">
            <Link
              href="/contact"
              className="inline-flex cursor-pointer items-center gap-2 rounded-full bg-accent-vivid px-6 py-3 font-mono text-xs font-bold uppercase tracking-[0.1em] text-accent-vivid-contrast transition-transform hover:scale-105"
            >
              Join Now
              <span aria-hidden className="text-sm leading-none">
                ›
              </span>
            </Link>

            <a
              href="tel:+911234567890"
              className="inline-flex cursor-pointer items-center gap-2 rounded-full border border-chalk/25 px-6 py-3 font-mono text-xs font-bold uppercase tracking-[0.1em] text-chalk transition-colors hover:border-accent-vivid hover:text-accent-vivid"
            >
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                <path d="M6.6 10.8a15 15 0 006.6 6.6l2.2-2.2a1 1 0 011-.3c1.1.4 2.3.6 3.6.6a1 1 0 011 1V20a1 1 0 01-1 1C10.6 21 3 13.4 3 4a1 1 0 011-1h3.5a1 1 0 011 1c0 1.3.2 2.5.6 3.6a1 1 0 01-.3 1z" />
              </svg>
              +91 12345 67890
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
