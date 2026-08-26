"use client";

import { useEffect } from "react";
import { animate, useMotionValue, useTransform, motion } from "framer-motion";

interface CounterProps {
  value: number;
  suffix?: string;
  duration?: number;
  className?: string;
}

export default function Counter({
  value,
  suffix = "",
  duration = 1.4,
  className,
}: CounterProps) {
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => `${Math.round(latest)}${suffix}`);

  useEffect(() => {
    const controls = animate(count, value, {
      duration,
      ease: [0.16, 1, 0.3, 1],
    });
    return controls.stop;
  }, [count, value, duration]);

  return <motion.span className={className}>{rounded}</motion.span>;
}
