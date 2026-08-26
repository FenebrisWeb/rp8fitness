"use client";

import { motion, useReducedMotion } from "framer-motion";

/**
 * Deterministic PRNG so the server and client render identical values
 * (Math.random() here would cause a hydration mismatch).
 */
function mulberry32(seed: number) {
  return () => {
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const rand = mulberry32(0x5f3a21);
const between = (min: number, max: number) => min + rand() * (max - min);

const PUFF_COUNT = 9;

/**
 * Each puff is a one-way life cycle: born small and transparent, it expands,
 * drifts, and fades back to zero. Since opacity starts and ends at 0, the
 * loop restart is invisible — so the motion can always travel outward
 * instead of returning to its origin.
 */
const PUFFS = Array.from({ length: PUFF_COUNT }, (_, i) => {
  const duration = between(20, 36);

  return {
    id: i,
    size: between(16, 34), // % of container width
    startX: between(-15, 85), // % of container
    startY: between(20, 95),
    driftX: between(-28, 34), // travelled over the whole life cycle
    driftY: between(-42, -14), // negative: smoke rises
    endScale: between(1.7, 2.6),
    blur: between(38, 72),
    peak: between(0.32, 0.6),
    duration,
    // Stagger across the cycle so puffs are always at different ages.
    delay: (i / PUFF_COUNT) * duration,
  };
});

/** Two huge, slow layers that give the whole frame a breathing base haze. */
const HAZE = [
  { size: 85, top: "-15%", left: "-20%", duration: 54, xTo: 26, yTo: 12 },
  { size: 70, top: "25%", left: "55%", duration: 68, xTo: -22, yTo: -16 },
];

const SMOKE_GRADIENT =
  "radial-gradient(circle at 50% 50%, rgba(243,242,236,0.20) 0%, rgba(243,242,236,0.10) 35%, rgba(243,242,236,0.03) 62%, transparent 78%)";

export default function SmokeOverlay({ active = true }: { active?: boolean }) {
  const reduced = useReducedMotion();

  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 overflow-hidden mix-blend-screen"
    >
      {/* Base haze — mirrored repeat, so it reverses smoothly instead of snapping. */}
      {HAZE.map((h, i) => (
        <motion.div
          key={`haze-${i}`}
          className="absolute"
          style={{
            width: `${h.size}%`,
            aspectRatio: "1.3",
            top: h.top,
            left: h.left,
            background: SMOKE_GRADIENT,
            filter: "blur(90px)",
            willChange: "transform, opacity",
          }}
          initial={{ opacity: 0.22 }}
          animate={
            reduced || !active
              ? { opacity: 0.22 }
              : {
                  x: [0, `${h.xTo}%`],
                  y: [0, `${h.yTo}%`],
                  scale: [1, 1.28],
                  opacity: [0.16, 0.3],
                }
          }
          transition={{
            duration: h.duration,
            repeat: Infinity,
            repeatType: "mirror",
            ease: "easeInOut",
          }}
        />
      ))}

      {/* Spreading puffs. */}
      {PUFFS.map((p) => (
        <motion.div
          key={p.id}
          className="absolute"
          style={{
            width: `${p.size}%`,
            aspectRatio: "1",
            top: `${p.startY}%`,
            left: `${p.startX}%`,
            background: SMOKE_GRADIENT,
            filter: `blur(${p.blur}px)`,
            willChange: "transform, opacity",
          }}
          initial={{ opacity: 0, scale: 0.5 }}
          animate={
            reduced || !active
              ? { opacity: p.peak * 0.5, scale: 1.3 }
              : {
                  x: [0, `${p.driftX * 0.35}%`, `${p.driftX * 0.7}%`, `${p.driftX}%`],
                  y: [0, `${p.driftY * 0.35}%`, `${p.driftY * 0.7}%`, `${p.driftY}%`],
                  scale: [0.5, 1.05, 1.5, p.endScale],
                  opacity: [0, p.peak, p.peak * 0.7, 0],
                }
          }
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            repeatDelay: 0,
            // Fast at birth, coasting in the middle, easing out as it dissipates.
            ease: ["easeOut", "linear", "easeIn"],
            times: [0, 0.28, 0.62, 1],
          }}
        />
      ))}
    </div>
  );
}