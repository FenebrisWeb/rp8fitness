"use client";

import { useEffect, useRef, useState } from "react";
import { animate, motion, useMotionValue, type PanInfo } from "framer-motion";
import type { WhyChooseContent } from "@/app/types/why-choose";

const AUTOPLAY_MS = 3000;
const spring = { type: "spring", stiffness: 260, damping: 34 } as const;

const WHY_CHOOSE_CONTENT: WhyChooseContent = {
  headline: "Why Choose RP8 Fitness?",
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
          <path d="M12 13l3-3" stroke="var(--lime)" strokeWidth={1.5} strokeLinecap="round" />
          <circle cx="12" cy="13" r="1.2" fill="var(--lime)" />
        </svg>
      );
    case "trainers":
      return (
        <svg viewBox="0 0 24 24" className={className} aria-hidden>
          <circle cx="12" cy="7" r="3.2" fill="var(--lime)" />
          <path d="M5 21v-2.5A6.5 6.5 0 0111.5 12h1A6.5 6.5 0 0119 18.5V21" {...shared} />
          <path d="M2.5 15h2M19.5 15h2" {...shared} />
        </svg>
      );
    case "amenities":
      return (
        <svg viewBox="0 0 24 24" className={className} aria-hidden>
          <path d="M12 3l7 3v6c0 5-3.5 8-7 9-3.5-1-7-4-7-9V6l7-3z" {...shared} />
          <path d="M8.7 12.2l2.3 2.3 4.3-4.5" stroke="var(--lime)" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    case "hygiene":
      return (
        <svg viewBox="0 0 24 24" className={className} aria-hidden>
          <path d="M12 3l7 3v6c0 5-3.5 8-7 9-3.5-1-7-4-7-9V6l7-3z" {...shared} />
          <path
            d="M12 8.5c-1.6 1.6-1.6 4 0 5.6 1.6-1.6 1.6-4 0-5.6z"
            fill="var(--lime)"
          />
        </svg>
      );
    case "community":
      return (
        <svg viewBox="0 0 24 24" className={className} aria-hidden>
          <circle cx="8.5" cy="8" r="2.6" {...shared} />
          <circle cx="15.5" cy="8" r="2.6" fill="var(--lime)" />
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

const SLIDE_SIZE = 2;

function WhyChooseSlider({ features }: { features: WhyChooseContent["features"] }) {
  // Two feature cards per slide, so the last slide can hold fewer.
  const slides: WhyChooseContent["features"][] = [];
  for (let i = 0; i < features.length; i += SLIDE_SIZE) {
    slides.push(features.slice(i, i + SLIDE_SIZE));
  }
  const count = slides.length;

  const [index, setIndex] = useState(0);
  const [width, setWidth] = useState(0);
  const [paused, setPaused] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);

  // Measure the slide width so the track can be positioned in pixels
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

  // Keep the track aligned with the active slide (and re-align on resize).
  useEffect(() => {
    if (!width) return;
    const controls = animate(x, -index * width, spring);
    return () => controls.stop();
  }, [index, width, x]);

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
    const threshold = width * 0.18;

    if (info.offset.x < -threshold || info.velocity.x < -500) {
      goTo(index + 1);
    } else if (info.offset.x > threshold || info.velocity.x > 500) {
      goTo(index - 1);
    } else if (width) {
      animate(x, -index * width, spring);
    }
  };

  const slideFlex = width ? `0 0 ${width}px` : "0 0 100%";

  return (
    <div
      className="sm:hidden"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div ref={containerRef} className="overflow-hidden">
        <motion.div
          className="flex"
          style={{ x, width: width ? width * count : "100%" }}
          drag="x"
          dragConstraints={{ left: -(width * (count - 1)), right: 0 }}
          dragElastic={0.12}
          dragMomentum={false}
          onDragStart={() => setPaused(true)}
          onDragEnd={handleDragEnd}
        >
          {slides.map((slide, i) => (
            <div
              key={i}
              className="flex flex-none items-start justify-center gap-10"
              style={{ flex: slideFlex }}
            >
              {slide.map((feature) => (
                <div key={feature.id} className="flex flex-col items-center gap-4 text-center">
                  <WhyChooseIcon id={feature.id} className="h-11 w-11 text-steel" />
                  <p className="font-mono text-xs uppercase leading-snug text-steel">
                    {feature.line1}
                    <br />
                    <span className="font-bold text-foreground">{feature.line2}</span>
                  </p>
                </div>
              ))}
            </div>
          ))}
        </motion.div>
      </div>

      <div className="mt-6 flex items-center justify-center gap-2">
        {slides.map((slide, i) => (
          <button
            key={slide.map((feature) => feature.id).join("-")}
            type="button"
            aria-label={`Go to slide ${i + 1}`}
            aria-current={i === index}
            onClick={() => goTo(i)}
            className={`h-1.5 rounded-full transition-all ${
              i === index ? "w-6 bg-lime" : "w-3 bg-steel/30"
            }`}
          />
        ))}
      </div>
    </div>
  );
}

export default function WhyChooseSection() {
  const { headline, features } = WHY_CHOOSE_CONTENT;

  return (
    <section className="relative overflow-hidden bg-transparent pb-16 pt-[50px] sm:pb-20">
      <div className="mx-auto w-full max-w-[1700px] px-6 sm:px-10">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.4 }}
          variants={fadeUp}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="mb-10 sm:mb-14">
            <h2 className="font-display text-2xl font-black uppercase tracking-tight text-foreground sm:text-3xl">
              {headline}
            </h2>
            <span aria-hidden className="mt-2 block h-1 w-16 rounded-full bg-lime" />
          </div>

          <WhyChooseSlider features={features} />

          <div className="hidden gap-y-10 sm:grid sm:grid-cols-3 lg:grid-cols-5 lg:gap-x-6">
            {features.map((feature) => (
              <div key={feature.id} className="flex flex-col items-center gap-4 text-center">
                <WhyChooseIcon id={feature.id} className="h-11 w-11 text-steel" />
                <p className="font-mono text-xs uppercase leading-snug text-steel sm:text-sm">
                  {feature.line1}
                  <br />
                  <span className="font-bold text-foreground">{feature.line2}</span>
                </p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
