"use client";

import { useEffect, useRef, useState } from "react";
import { animate, motion, useMotionValue, type PanInfo } from "framer-motion";
import type { WhyChooseContent } from "@/app/types/why-choose";

const AUTOPLAY_MS = 3000;
const spring = { type: "spring", stiffness: 260, damping: 34 } as const;

const WHY_CHOOSE_CONTENT: WhyChooseContent = {
  headline: "Why Choose RP8 Fitness?",
  headlineLine1: "Why Choose",
  headlineLine2: "RP8 Fitness?",
  features: [
    { id: "machines", line1: "Imported German", line2: "Tech Machines" },
    { id: "trainers", line1: "Expert Trainers &", line2: "Personalized Plans" },
    { id: "amenities", line1: "World Class", line2: "Amenities" },
    { id: "hygiene", line1: "Hygienic & Safe", line2: "Environment" },
    { id: "community", line1: "Community That", line2: "Motivates" },
  ],
};

// Five two-tone badge icons — a steel/chalk outline with one lime accent
// element each — for the trust-signal row. Kept as dedicated markup rather
// than a single-path lookup table (like ZoneIcon/HighlightIcon) because
// each one mixes two stroke colors.
function WhyChooseIcon({ id, className }: { id: string; className?: string }) {
  const shared = {
    fill: "none" as const,
    stroke: "currentColor",
    strokeWidth: 1.5,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };

  switch (id) {
    case "machines":
      return (
        <svg viewBox="0 0 24 24" className={className} aria-hidden>
          <circle cx="12" cy="13" r="8" {...shared} />
          <path d="M9 3h6M12 3v3" {...shared} />
          <path d="M12 13l3-3" stroke="var(--accent-strong)" strokeWidth={1.5} strokeLinecap="round" />
          <circle cx="12" cy="13" r="1.2" fill="var(--accent-strong)" />
        </svg>
      );
    case "trainers":
      return (
        <svg viewBox="0 0 24 24" className={className} aria-hidden>
          <circle cx="12" cy="7" r="3.2" fill="var(--accent-strong)" />
          <path d="M5 21v-2.5A6.5 6.5 0 0111.5 12h1A6.5 6.5 0 0119 18.5V21" {...shared} />
          <path d="M2.5 15h2M19.5 15h2" {...shared} />
        </svg>
      );
    case "amenities":
      return (
        <svg viewBox="0 0 24 24" className={className} aria-hidden>
          <path d="M12 3l7 3v6c0 5-3.5 8-7 9-3.5-1-7-4-7-9V6l7-3z" {...shared} />
          <path d="M8.7 12.2l2.3 2.3 4.3-4.5" stroke="var(--accent-strong)" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    case "hygiene":
      return (
        <svg viewBox="0 0 24 24" className={className} aria-hidden>
          <path d="M12 3l7 3v6c0 5-3.5 8-7 9-3.5-1-7-4-7-9V6l7-3z" {...shared} />
          <path
            d="M12 8.5c-1.6 1.6-1.6 4 0 5.6 1.6-1.6 1.6-4 0-5.6z"
            fill="var(--accent-strong)"
          />
        </svg>
      );
    case "community":
      return (
        <svg viewBox="0 0 24 24" className={className} aria-hidden>
          <circle cx="8.5" cy="8" r="2.6" {...shared} />
          <circle cx="15.5" cy="8" r="2.6" fill="var(--accent-strong)" />
          <path d="M3 20v-1.5A5 5 0 018 13.5h.3M13 13.6a5 5 0 015.8 4.9V20" {...shared} />
        </svg>
      );
    default:
      return null;
  }
}

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  show: { opacity: 1, y: 0 },
};

// Two icons visible at once, but the track steps by a single item — each
// swipe/tick slides one icon out and the next one in, instead of jumping a
// whole pair at a time.
const VISIBLE = 2;

function WhyChooseSlider({ features }: { features: WhyChooseContent["features"] }) {
  const total = features.length;
  const count = Math.max(total - VISIBLE + 1, 1);

  const [index, setIndex] = useState(0);
  const [width, setWidth] = useState(0);
  const [paused, setPaused] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const itemWidth = width / VISIBLE;

  // Measure the viewport so an item's width can be derived from it
  // (ResizeObserver also catches viewport/orientation changes).
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    setWidth(el.offsetWidth);

    const ro = new ResizeObserver((entries) => {
      const w = entries[0]?.contentRect.width ?? 0;
      if (w) setWidth(w);
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  // Keep the track aligned with the active step (and re-align on resize).
  useEffect(() => {
    if (!itemWidth) return;
    const controls = animate(x, -index * itemWidth, spring);
    return () => controls.stop();
  }, [index, itemWidth, x]);

  // Autoplay every 3s — a timeout keyed on `index` restarts itself, so a
  // manual swipe or a hover-pause gives a full interval before advancing
  // again. Paused on hover and while the user is dragging.
  useEffect(() => {
    if (paused) return;
    const id = window.setTimeout(() => setIndex((i) => (i + 1) % count), AUTOPLAY_MS);
    return () => window.clearTimeout(id);
  }, [index, paused, count]);

  const goTo = (next: number) => setIndex(((next % count) + count) % count);

  const handleDragEnd = (_: unknown, info: PanInfo) => {
    setPaused(false);
    const threshold = itemWidth * 0.3;

    if (info.offset.x < -threshold || info.velocity.x < -500) {
      goTo(index + 1);
    } else if (info.offset.x > threshold || info.velocity.x > 500) {
      goTo(index - 1);
    } else if (itemWidth) {
      animate(x, -index * itemWidth, spring);
    }
  };

  return (
    <div
      className="sm:hidden"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div ref={containerRef} className="overflow-hidden">
        <motion.div
          className="flex"
          style={{ x, width: itemWidth ? itemWidth * total : "100%" }}
          drag="x"
          dragConstraints={{ left: -(itemWidth * (total - VISIBLE)), right: 0 }}
          dragElastic={0.12}
          dragMomentum={false}
          onDragStart={() => setPaused(true)}
          onDragEnd={handleDragEnd}
        >
          {features.map((feature) => (
            <div
              key={feature.id}
              className="flex flex-none flex-col items-center gap-4 px-5 text-center"
              style={{ flex: itemWidth ? `0 0 ${itemWidth}px` : `0 0 ${100 / VISIBLE}%` }}
            >
              <WhyChooseIcon id={feature.id} className="h-11 w-11 text-foreground" />
              <p className="font-mono text-xs uppercase leading-snug text-foreground">
                {feature.line1}
                <br />
                <span className="font-bold text-foreground">{feature.line2}</span>
              </p>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}

export default function WhyChooseSection() {
  const { headline, headlineLine1, headlineLine2, features } = WHY_CHOOSE_CONTENT;
  const [accentWord, ...restWords] = headlineLine2.split(" ");
  const headlineRest = restWords.join(" ");

  return (
    <section className="relative overflow-hidden bg-transparent pb-16 pt-[50px] sm:pb-20">
      <div className="mx-auto w-full max-w-[1700px] px-6 sm:px-10">
        <motion.div
          initial="hidden"
          animate="show"
          variants={fadeUp}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Mobile — plain heading with the lime underline accent above
              the sliding carousel. */}
          <div className="mb-10 text-center sm:hidden">
            <h2 className="font-display text-2xl font-black uppercase tracking-tight text-foreground">
              {headline}
            </h2>
            <span aria-hidden className="mx-auto mt-2 block h-1 w-16 rounded-full bg-accent-strong" />
          </div>

          <WhyChooseSlider features={features} />

          {/* Desktop — a single bordered card: two-line heading on the
              left, then the feature row, each item separated by a
              vertical divider. */}
          <div className="hidden rounded-2xl border border-chalk/10 bg-ink p-8 sm:flex sm:items-center sm:gap-8 sm:rounded-3xl lg:gap-10 lg:p-10">
            <h2 className="flex-none font-display text-2xl font-black uppercase leading-tight tracking-tight text-chalk lg:text-3xl">
              <span className="block">{headlineLine1}</span>
              <span className="block">
                <span className="text-accent-vivid">{accentWord}</span>
                {headlineRest ? ` ${headlineRest}` : ""}
              </span>
            </h2>

            <div className="h-16 w-px flex-none bg-chalk/10" />

            <div className="flex flex-1 items-start justify-between">
              {features.map((feature, i) => (
                <div key={feature.id} className="flex items-start">
                  <div className="flex flex-col items-center gap-3 px-3 text-center lg:px-4">
                    <WhyChooseIcon id={feature.id} className="h-10 w-10 text-chalk lg:h-11 lg:w-11" />
                    <p className="font-mono text-[11px] uppercase leading-snug text-chalk lg:text-xs">
                      {feature.line1}
                      <br />
                      <span className="font-bold text-chalk">{feature.line2}</span>
                    </p>
                  </div>
                  {i < features.length - 1 && (
                    <div className="ml-3 h-16 w-px flex-none bg-chalk/10 lg:ml-4" />
                  )}
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
