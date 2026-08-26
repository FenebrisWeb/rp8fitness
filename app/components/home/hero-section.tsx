"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { animate, motion, useMotionValue, AnimatePresence, type PanInfo } from "framer-motion";
import type { HeroSlide } from "@/app/types/home";
import Counter from "./counter";
import SmokeOverlay from "./smoke-overlay";

const AUTOPLAY_MS = 3000;

const HERO_SLIDES: HeroSlide[] = [
  {
    id: "train",
    headlineLine1: "Train",
    headlineLine2: "Smarter",
    description: "Ten zones under one roof, built for every kind of training.",
    image: { src: "/HomePage/hero-banner01.webp", alt: "Athlete training at RP8 Fitness" },
    stats: [
      { value: 10, suffix: "+", label: "Zones" },
      { value: 5, suffix: "K+", label: "Sq Ft" },
    ],
  },
  {
    id: "boxing",
    headlineLine1: "Box",
    headlineLine2: "Harder",
    description: "A dedicated boxing area to build power, speed, and reflexes.",
    image: { src: "/HomePage/HomeBanner02.webp", alt: "Boxing area at RP8 Fitness" },
    stats: [
      { value: 6, suffix: "+", label: "Bags" },
      { value: 12, suffix: "+", label: "Coaches" },
    ],
  },
  {
    id: "crossfit",
    headlineLine1: "Push",
    headlineLine2: "Limits",
    description: "A dedicated CrossFit zone for high-intensity, functional training.",
    image: { src: "/HomePage/HomeBanner03.webp", alt: "CrossFit zone at RP8 Fitness" },
    stats: [
      { value: 15, suffix: "+", label: "WODs" },
      { value: 40, suffix: "+", label: "Members" },
    ],
  },
];

const SLIDE_COUNT = HERO_SLIDES.length;

const textVariants = {
  enter: { opacity: 0, y: 40 },
  center: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -30 },
};

const spring = { type: "spring", stiffness: 260, damping: 34 } as const;

export default function HeroSection() {
  const [index, setIndex] = useState(0);
  const [width, setWidth] = useState(0);
  const [paused, setPaused] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);

  // Measure the container. ResizeObserver also catches layout shifts that a
  // window "resize" listener misses (sidebars, font loading, zoom, etc.).
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

  // Keep the track aligned with the active index (and re-align on resize).
  useEffect(() => {
    if (!width) return;
    const controls = animate(x, -index * width, spring);
    return () => controls.stop();
  }, [index, width, x]);

  // Autoplay: a timeout keyed on `index` restarts itself, so manual
  // navigation gives you a full interval before the next auto-advance.
  useEffect(() => {
    if (paused) return;
    const id = window.setTimeout(
      () => setIndex((i) => (i + 1) % SLIDE_COUNT),
      AUTOPLAY_MS
    );
    return () => window.clearTimeout(id);
  }, [index, paused]);

  const goTo = (next: number) => {
    setIndex(((next % SLIDE_COUNT) + SLIDE_COUNT) % SLIDE_COUNT);
  };

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

  const active = HERO_SLIDES[index];

  // Before the first measurement, fall back to percentages so slide 0 still
  // paints at the correct size instead of collapsing to 0px.
  const slideFlex = width ? `0 0 ${width}px` : "0 0 100%";

  return (
    <section
      ref={containerRef}
      className="relative aspect-[1920/750] w-full overflow-hidden"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <motion.div
        className="flex h-full"
        style={{ x, width: width ? width * SLIDE_COUNT : "100%" }}
        drag="x"
        dragConstraints={{ left: -(width * (SLIDE_COUNT - 1)), right: 0 }}
        dragElastic={0.12}
        dragMomentum={false}
        onDragStart={() => setPaused(true)}
        onDragEnd={handleDragEnd}
      >
        {HERO_SLIDES.map((slide, i) => (
          <div
            key={slide.id}
            className="relative h-full overflow-hidden"
            style={{ flex: slideFlex }}
          >
            <Image
              src={slide.image.src}
              alt={slide.image.alt}
              fill
              sizes="100vw"
              quality={85}
              priority={i === 0}
              draggable={false}
              className="select-none object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/40 to-ink/10" />
            <SmokeOverlay />
          </div>
        ))}
      </motion.div>

      <div className="pointer-events-none absolute inset-0 flex flex-col justify-end">
        <div className="mx-auto flex w-full max-w-[1700px] flex-col px-6 pb-16 sm:px-10">
          <AnimatePresence mode="wait">
            <motion.div
              key={active.id}
              initial="enter"
              animate="center"
              exit="exit"
              variants={textVariants}
              transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-wrap items-end justify-between gap-8"
            >
              <div>
                <h1 className="font-display font-black uppercase leading-[0.85] tracking-tight text-chalk">
                  <span className="block text-[15vw] italic sm:text-[11vw] md:text-[8vw] lg:text-[6.5vw]">
                    {active.headlineLine1}
                  </span>
                  <span className="block text-[15vw] text-chalk sm:text-[11vw] md:text-[8vw] lg:text-[6.5vw]">
                    {active.headlineLine2}
                  </span>
                </h1>
                <p className="mt-4 max-w-md font-mono text-sm text-chalk">
                  {active.description}
                </p>
              </div>

              <dl className="flex gap-6 pb-2">
                {active.stats.map((stat) => (
                  <div key={stat.label} className="text-right">
                    <dt className="sr-only">{stat.label}</dt>
                    <dd className="font-display text-3xl font-black text-chalk sm:text-4xl">
                      <Counter value={stat.value} suffix={stat.suffix} />
                    </dd>
                    <dd className="font-mono text-[11px] uppercase tracking-[0.14em] text-chalk">
                      {stat.label}
                    </dd>
                  </div>
                ))}
              </dl>
            </motion.div>
          </AnimatePresence>

          <div className="pointer-events-auto mt-8 flex items-center gap-3">
            {HERO_SLIDES.map((slide, i) => (
              <button
                key={slide.id}
                type="button"
                aria-label={`Go to slide ${i + 1}`}
                aria-current={i === index}
                onClick={() => goTo(i)}
                className={`h-1.5 rounded-full transition-all ${
                  i === index ? "w-8 bg-lime" : "w-4 bg-chalk/30 hover:bg-chalk/50"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}