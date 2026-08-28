"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  show: { opacity: 1, y: 0 },
};

export default function BmiNextStepCtaSection() {
  return (
    <section className="relative overflow-hidden bg-transparent pb-16 sm:pb-20">
      <div className="mx-auto w-full max-w-[1700px] px-6 sm:px-10">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          variants={fadeUp}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col gap-6 rounded-2xl border border-chalk/10 bg-ink p-6 sm:rounded-3xl sm:p-8 lg:flex-row lg:items-center lg:gap-10"
        >
          <div className="relative h-[220px] w-full flex-none overflow-hidden rounded-xl lg:h-[240px] lg:w-[320px]">
            <Image
              src="/HomePage/hero-banner01.webp"
              alt="Member training at RP8 Fitness"
              fill
              sizes="(min-width: 1024px) 320px, 100vw"
              className="object-cover"
            />
          </div>

          <div className="flex-1 text-center lg:text-left">
            <span className="font-mono text-xs font-bold uppercase tracking-[0.15em] text-accent-vivid">
              Take The Next Step
            </span>
            <p className="mt-2 font-display text-xl font-black uppercase leading-tight tracking-tight text-chalk sm:text-2xl">
              Knowing Your BMI Is Just <span className="text-accent-vivid">The Beginning.</span>
            </p>
            <p className="mx-auto mt-2 max-w-md font-mono text-sm text-chalk lg:mx-0">
              At RP8 Fitness, we help you turn knowledge into action. Train smarter. Live stronger. Be your best every day.
            </p>

            <div className="mt-5 flex flex-wrap items-center justify-center gap-3 lg:justify-start">
              <Link
                href="/#membership"
                className="inline-flex cursor-pointer items-center gap-2 rounded-full bg-accent-vivid px-6 py-3 font-mono text-xs font-bold uppercase tracking-[0.1em] text-accent-vivid-contrast transition-transform hover:scale-105"
              >
                Explore Membership
                <span aria-hidden className="text-sm leading-none">
                  ›
                </span>
              </Link>
              <Link
                href="/contact"
                className="inline-flex cursor-pointer items-center gap-2 rounded-full border border-chalk/25 px-6 py-3 font-mono text-xs font-bold uppercase tracking-[0.1em] text-chalk transition-colors hover:border-accent-vivid hover:text-accent-vivid"
              >
                Book A Free Tour
                <span aria-hidden className="text-sm leading-none">
                  ›
                </span>
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
