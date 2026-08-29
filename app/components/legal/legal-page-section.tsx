"use client";

import { motion } from "framer-motion";
import type { LegalPageContent } from "@/app/types/legal-page";
import AnimatedWords from "@/app/components/shared/animated-words";
import { fadeUp, fadeUpItem, staggerContainer, staggerContainerTight, viewportOnce } from "@/app/lib/motion";

export default function LegalPageSection({ content }: { content: LegalPageContent }) {
  const { title, updated, intro, sections } = content;

  return (
    <section className="relative overflow-hidden bg-transparent pb-16 pt-10 sm:pb-20 sm:pt-14">
      <div className="mx-auto w-full max-w-[1000px] px-6 sm:px-10">
        <motion.div initial="hidden" whileInView="show" viewport={viewportOnce} variants={staggerContainer}>
          <h1 className="font-display text-3xl font-black uppercase leading-tight tracking-tight text-foreground sm:text-4xl">
            <AnimatedWords text={title} />
          </h1>
          <motion.p variants={fadeUp} className="mt-2 font-mono text-xs uppercase tracking-[0.1em] text-foreground">
            Last Updated: {updated}
          </motion.p>
          <motion.span aria-hidden variants={fadeUp} className="mt-4 block h-1 w-16 rounded-full bg-accent-strong" />
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          variants={staggerContainer}
          className="mt-8 rounded-2xl border border-chalk/10 bg-ink p-6 sm:mt-10 sm:rounded-3xl sm:p-10"
        >
          <motion.p variants={fadeUp} className="font-mono text-sm leading-relaxed text-chalk">{intro}</motion.p>

          <motion.div variants={staggerContainerTight} className="mt-8 flex flex-col gap-8">
            {sections.map((section, i) => (
              <motion.div key={section.heading} variants={fadeUpItem}>
                <h2 className="font-display text-lg font-black uppercase tracking-tight text-chalk">
                  {i + 1}. {section.heading}
                </h2>
                <div className="mt-3 flex flex-col gap-3">
                  {section.paragraphs.map((paragraph) => (
                    <p key={paragraph} className="font-mono text-sm leading-relaxed text-chalk">
                      {paragraph}
                    </p>
                  ))}
                </div>
                {section.list && (
                  <ul className="mt-3 flex flex-col gap-2">
                    {section.list.map((item) => (
                      <li key={item} className="flex items-start gap-2 font-mono text-sm leading-relaxed text-chalk">
                        <span aria-hidden className="mt-2 h-1 w-1 flex-none rounded-full bg-accent-vivid" />
                        {item}
                      </li>
                    ))}
                  </ul>
                )}
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
