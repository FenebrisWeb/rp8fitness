import type { Variants } from "framer-motion";

// Shared scroll-triggered animation variants — used across every section on
// the site so a page feels alive as you scroll instead of just appearing
// fully-rendered. The pattern everywhere: a parent motion element declares
// `initial="hidden" whileInView="show" viewport={viewportOnce} variants={staggerContainer}`,
// then each direct child that should animate declares its own `variants`
// (fadeUp / fadeUpItem / headlineReveal) with NO initial/whileInView of its
// own — it inherits the hidden/show state from the parent and Framer Motion
// staggers each child's entrance automatically.

// amount: 0.2 (not a higher threshold) is deliberate — a tall section can
// never satisfy a large "percent visible" requirement, which is exactly
// what caused sections to get stuck permanently at opacity:0 earlier in
// this project. Keep this low for any new whileInView usage.
export const viewportOnce = { once: true, amount: 0.2 } as const;

export const staggerContainer: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.12, delayChildren: 0.05 },
  },
};

// A slightly punchier version for rows of cards/icons/stats, where a longer
// per-child stagger would take too long to finish revealing the whole grid.
export const staggerContainerTight: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.08 },
  },
};

// Standard reveal for body content — eyebrows, paragraphs, buttons, single
// icons.
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
};

// Same motion, smaller travel + shorter duration — for individual items
// inside a staggered grid/list, so the grid finishes settling quickly.
export const fadeUpItem: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.16, 1, 0.3, 1] } },
};

// A bit more travel plus a slight skew that snaps flat as it lands — for
// headlines, giving them a bit more "impact" than a plain fade without
// tipping into gimmick territory.
export const headlineReveal: Variants = {
  hidden: { opacity: 0, y: 40, skewY: 4 },
  show: { opacity: 1, y: 0, skewY: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } },
};
