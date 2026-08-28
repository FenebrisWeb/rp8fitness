"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { createPortal } from "react-dom";
import { AnimatePresence, animate, motion, useMotionValue, type PanInfo } from "framer-motion";
import type { Review, ReviewsContent } from "@/app/types/reviews";

const AUTOPLAY_MS = 3000;
const spring = { type: "spring", stiffness: 260, damping: 34 } as const;
const TRUNCATE_LENGTH = 92;

// Placeholder headshots (i.pravatar.cc) standing in for real member photos —
// swap for actual customer photography later, same as the demo images used
// in ZonesSection.
const REVIEWS_CONTENT: ReviewsContent = {
  headline: "What Our Members Say",
  ratingValue: "4.9/5",
  ratingLabel: "From 600+ Reviews",
  reviews: [
    {
      id: "rohit-sharma",
      name: "Rohit Sharma",
      rating: 5,
      text: "The best fitness experience I have had so far. Coaches are supportive and the whole environment keeps me consistent every week.",
      avatar: "https://i.pravatar.cc/150?img=1",
    },
    {
      id: "priya-mehta",
      name: "Priya Mehta",
      rating: 5,
      text: "From strength training to Zumba, everything I need is here under one roof. The variety keeps my workouts exciting and fun.",
      avatar: "https://i.pravatar.cc/150?img=5",
    },
    {
      id: "arjun-verma",
      name: "Arjun Verma",
      rating: 5,
      text: "Yaha ka setup bilkul next level hai, German machines use karke lagta hai results jaldi milte hain aur trainers bhi kaafi supportive hain.",
      avatar: "https://i.pravatar.cc/150?img=12",
    },
    {
      id: "vikram-singh",
      name: "Vikram Singh",
      rating: 5,
      text: "RP8 keeps me motivated every single day. The energy in the gym is unmatched and the community genuinely pushes you to do better.",
      avatar: "https://i.pravatar.cc/150?img=14",
    },
    {
      id: "ananya-iyer",
      name: "Ananya Iyer",
      rating: 5,
      text: "Rooftop pickleball court is such a fun addition, thoda casual vibe milta hai after an intense session and it balances everything out.",
      avatar: "https://i.pravatar.cc/150?img=9",
    },
    {
      id: "karan-malhotra",
      name: "Karan Malhotra",
      rating: 4,
      text: "Trainers bahut ache guide karte hain, personalized plan diya mujhe aur ab progress dikhne laga hai sirf do mahine mein hi.",
      avatar: "https://i.pravatar.cc/150?img=15",
    },
    {
      id: "sneha-reddy",
      name: "Sneha Reddy",
      rating: 5,
      text: "Top class equipment, spotless facility and a genuinely great community that makes every visit feel worthwhile and enjoyable.",
      avatar: "https://i.pravatar.cc/150?img=20",
    },
    {
      id: "aditya-kapoor",
      name: "Aditya Kapoor",
      rating: 5,
      text: "Cleanliness yahan kabhi compromise nahi hoti, hygiene is top notch and staff bhi always ready to help with anything you need.",
      avatar: "https://i.pravatar.cc/150?img=17",
    },
    {
      id: "neha-joshi",
      name: "Neha Joshi",
      rating: 4,
      text: "I switched from three other gyms before finding RP8, and this is the first place where I have actually stuck to a routine.",
      avatar: "https://i.pravatar.cc/150?img=24",
    },
    {
      id: "rahul-nair",
      name: "Rahul Nair",
      rating: 5,
      text: "Machines German hain toh smoothness bilkul alag feel hoti hai, aur staff bhi bahut friendly hai gym floor pe hamesha.",
      avatar: "https://i.pravatar.cc/150?img=33",
    },
    {
      id: "pooja-bansal",
      name: "Pooja Bansal",
      rating: 5,
      text: "The trainers actually listen to your goals instead of pushing a generic plan, which has made a huge difference in my consistency.",
      avatar: "https://i.pravatar.cc/150?img=29",
    },
    {
      id: "siddharth-rao",
      name: "Siddharth Rao",
      rating: 5,
      text: "Best decision this year tha joining RP8, quality of equipment aur overall vibe dono hi kaafi impressive hain honestly.",
      avatar: "https://i.pravatar.cc/150?img=52",
    },
    {
      id: "kavya-menon",
      name: "Kavya Menon",
      rating: 5,
      text: "Loved how organized every zone feels, from cardio to functional training, nothing ever feels overcrowded even during peak hours.",
      avatar: "https://i.pravatar.cc/150?img=45",
    },
    {
      id: "manish-tiwari",
      name: "Manish Tiwari",
      rating: 4,
      text: "Pehle gym jaana boring lagta tha, par yahan ka environment aur community itni motivating hai ki miss karne ka mann hi nahi karta.",
      avatar: "https://i.pravatar.cc/150?img=51",
    },
    {
      id: "ritu-chawla",
      name: "Ritu Chawla",
      rating: 5,
      text: "A genuinely welcoming space for beginners like me. The staff never made me feel out of place while learning the equipment.",
      avatar: "https://i.pravatar.cc/150?img=47",
    },
    {
      id: "aman-gupta",
      name: "Aman Gupta",
      rating: 5,
      text: "Terrace area is a nice touch, thoda fresh air mil jaata hai during breaks and the pickleball sessions are honestly addictive.",
      avatar: "https://i.pravatar.cc/150?img=53",
    },
    {
      id: "divya-pillai",
      name: "Divya Pillai",
      rating: 5,
      text: "Consistent results, clean facility and a team that genuinely cares about member progress. Highly recommend RP8 to anyone starting out.",
      avatar: "https://i.pravatar.cc/150?img=44",
    },
  ],
};

function truncate(text: string, max: number) {
  if (text.length <= max) return { short: text, isTruncated: false };
  return { short: `${text.slice(0, max).trimEnd()}...`, isTruncated: true };
}

const STAR_PATH = "M10 1.5l2.6 5.6 6.1.6-4.6 4.1 1.3 6-5.4-3.1-5.4 3.1 1.3-6-4.6-4.1 6.1-.6z";

function StarRow({ rating, className }: { rating: number; className?: string }) {
  const filled = Math.round(rating);
  return (
    <div className={`flex items-center gap-0.5 ${className ?? ""}`} aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          viewBox="0 0 20 20"
          className="h-3.5 w-3.5"
          aria-hidden
          fill={i < filled ? "var(--p15)" : "none"}
          stroke={i < filled ? "var(--p15)" : "var(--steel)"}
          strokeWidth={1}
        >
          <path d={STAR_PATH} strokeLinejoin="round" />
        </svg>
      ))}
    </div>
  );
}

// 1 review visible on mobile, 3 on tablet, 5 on desktop — measured off the
// track's own width rather than a media query, so it tracks the actual
// space available inside the section's padding.
function getVisibleCount(width: number) {
  if (width < 640) return 1;
  if (width < 1024) return 3;
  return 5;
}

export default function ReviewsSection() {
  const { headline, ratingValue, ratingLabel, reviews } = REVIEWS_CONTENT;
  const total = reviews.length;

  const [index, setIndex] = useState(0);
  const [width, setWidth] = useState(0);
  const [paused, setPaused] = useState(false);
  const [activeReview, setActiveReview] = useState<Review | null>(null);
  const [mounted, setMounted] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);

  const visible = width ? getVisibleCount(width) : 1;
  const itemWidth = width ? width / visible : 0;
  const count = Math.max(total - visible + 1, 1);

  useEffect(() => setMounted(true), []);

  // Measure the viewport (also catches resize/orientation changes).
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

  // Crossing a breakpoint can shrink the step count (desktop's 5-up view
  // has fewer positions than mobile's 1-up view) — clamp so index stays valid.
  useEffect(() => {
    setIndex((i) => Math.min(i, count - 1));
  }, [count]);

  useEffect(() => {
    if (!itemWidth) return;
    const controls = animate(x, -index * itemWidth, spring);
    return () => controls.stop();
  }, [index, itemWidth, x]);

  // Autoplay every 3s — paused on hover, while dragging, or while the
  // read-more popup is open.
  useEffect(() => {
    if (paused || activeReview) return;
    const id = window.setTimeout(() => setIndex((i) => (i + 1) % count), AUTOPLAY_MS);
    return () => window.clearTimeout(id);
  }, [index, paused, count, activeReview]);

  useEffect(() => {
    if (!activeReview) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActiveReview(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [activeReview]);

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

  const ratingAndArrows = (
    <div className="flex items-center gap-4">
      <div className="flex items-center gap-2 font-mono">
        <svg viewBox="0 0 20 20" className="h-4 w-4" fill="var(--p15)" aria-hidden>
          <path d={STAR_PATH} />
        </svg>
        <span className="text-sm font-bold text-foreground">{ratingValue}</span>
        <span className="text-xs text-foreground">{ratingLabel}</span>
      </div>

      <div className="flex items-center gap-2">
        <button
          type="button"
          aria-label="Previous review"
          onClick={() => goTo(index - 1)}
          className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-full border border-foreground/25 text-foreground transition-colors hover:border-accent-strong hover:text-accent-strong"
        >
          ‹
        </button>
        <button
          type="button"
          aria-label="Next review"
          onClick={() => goTo(index + 1)}
          className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-full border border-foreground/25 text-foreground transition-colors hover:border-accent-strong hover:text-accent-strong"
        >
          ›
        </button>
      </div>
    </div>
  );

  return (
    <section className="relative overflow-hidden bg-transparent pb-20 pt-[6px] sm:pb-28">
      <div className="mx-auto w-full max-w-[1700px] px-6 sm:px-10">
        <div className="flex flex-col items-center gap-6 text-center sm:flex-row sm:flex-wrap sm:items-end sm:justify-between sm:text-left">
          <div>
            <h2 className="font-display text-2xl font-black uppercase tracking-tight text-foreground sm:text-3xl">
              {headline}
            </h2>
            <span aria-hidden className="mx-auto mt-2 block h-1 w-16 rounded-full bg-accent-strong sm:mx-0" />
          </div>

          {/* Desktop/tablet only — on mobile this moves below the cards. */}
          <div className="hidden sm:block">{ratingAndArrows}</div>
        </div>

        <div
          className="mt-10 sm:mt-14"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <div ref={containerRef} className="overflow-hidden">
            <motion.div
              className="flex"
              style={{ x, width: itemWidth ? itemWidth * total : "100%" }}
              drag="x"
              dragConstraints={{ left: -(itemWidth * Math.max(total - visible, 0)), right: 0 }}
              dragElastic={0.12}
              dragMomentum={false}
              onDragStart={() => setPaused(true)}
              onDragEnd={handleDragEnd}
            >
              {reviews.map((review) => {
                const { short, isTruncated } = truncate(review.text, TRUNCATE_LENGTH);

                return (
                  <div
                    key={review.id}
                    className="flex-none px-2.5"
                    style={{ flex: itemWidth ? `0 0 ${itemWidth}px` : "0 0 100%" }}
                  >
                    <div className="flex h-full flex-col justify-between rounded-xl border border-chalk/10 bg-ink p-5">
                      <div>
                        <span aria-hidden className="font-display text-3xl leading-none text-accent-strong">
                          &ldquo;
                        </span>
                        <p className="mt-2 font-mono text-sm leading-snug text-chalk">
                          {short}
                          {isTruncated && (
                            <>
                              {" "}
                              <button
                                type="button"
                                onClick={() => setActiveReview(review)}
                                className="cursor-pointer font-bold text-accent-strong underline-offset-2 hover:underline"
                              >
                                Read More
                              </button>
                            </>
                          )}
                        </p>
                      </div>

                      <div className="mt-4 flex items-center justify-between gap-3">
                        <div>
                          <p className="font-mono text-xs font-bold text-chalk">{review.name}</p>
                          <StarRow rating={review.rating} className="mt-1" />
                        </div>
                        <div className="relative h-10 w-10 flex-none overflow-hidden rounded-full border border-accent-strong/50">
                          <Image src={review.avatar} alt={review.name} fill sizes="40px" className="object-cover" />
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </motion.div>
          </div>
        </div>

        {/* Mobile only — sits below the cards instead of beside the heading. */}
        <div className="mt-6 flex justify-center sm:hidden">{ratingAndArrows}</div>
      </div>

      {mounted &&
        createPortal(
          <AnimatePresence>
            {activeReview && (
              <motion.div
                className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                onClick={() => setActiveReview(null)}
              >
                <motion.div
                  role="dialog"
                  aria-modal="true"
                  aria-label={`Review from ${activeReview.name}`}
                  className="relative w-full max-w-md rounded-2xl border border-chalk/10 bg-ink p-6 sm:p-8"
                  initial={{ opacity: 0, y: 16, scale: 0.97 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 16, scale: 0.97 }}
                  transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                  onClick={(e) => e.stopPropagation()}
                >
                  <button
                    type="button"
                    onClick={() => setActiveReview(null)}
                    aria-label="Close"
                    className="absolute right-4 top-4 flex h-8 w-8 cursor-pointer items-center justify-center rounded-full text-chalk transition-colors hover:bg-chalk/10"
                  >
                    ✕
                  </button>

                  <span aria-hidden className="font-display text-4xl leading-none text-accent-strong">
                    &ldquo;
                  </span>
                  <p className="mt-3 font-mono text-sm leading-relaxed text-chalk">{activeReview.text}</p>

                  <div className="mt-6 flex items-center gap-3">
                    <div className="relative h-12 w-12 flex-none overflow-hidden rounded-full border border-accent-strong/50">
                      <Image
                        src={activeReview.avatar}
                        alt={activeReview.name}
                        fill
                        sizes="48px"
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <p className="font-mono text-sm font-bold text-chalk">{activeReview.name}</p>
                      <StarRow rating={activeReview.rating} className="mt-1" />
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>,
          document.body
        )}
    </section>
  );
}
