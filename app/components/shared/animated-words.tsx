"use client";

import { motion, type Variants } from "framer-motion";

const word: Variants = {
  hidden: { y: "110%" },
  show: { y: "0%", transition: { duration: 0.65, ease: [0.16, 1, 0.3, 1] } },
};

/**
 * Splits `text` into words, each masked behind its own overflow-hidden
 * clip so it slides up into place — a punchier "snap into frame" reveal for
 * hero headlines than a plain block fade, without going as far as
 * animating individual letters.
 *
 * This does NOT declare its own scroll trigger — it must sit inside an
 * ancestor motion element that owns `initial`/`whileInView` and a
 * `staggerContainer` variant (see app/lib/motion.ts). Each word just
 * carries the `hidden`/`show` variant names and inherits its animation
 * state from that ancestor, staggering in with everything else.
 */
export default function AnimatedWords({ text, className = "" }: { text: string; className?: string }) {
  const words = text.split(" ");
  return (
    <span className={className}>
      {words.map((wordText, i) => (
        <span key={`${wordText}-${i}`} className="inline-block overflow-hidden pb-[0.1em] align-top">
          <motion.span variants={word} className="inline-block">
            {wordText}
            {i < words.length - 1 ? " " : ""}
          </motion.span>
        </span>
      ))}
    </span>
  );
}
