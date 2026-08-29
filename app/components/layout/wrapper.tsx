"use client";

import { MotionConfig } from "framer-motion";
import Header from "./header";
import Footer from "./footer";
import BmiWidget from "./bmi-widget";

export default function Wrapper({ children }: { children: React.ReactNode }) {
  return (
    // reducedMotion="user" makes every framer-motion animation on the site
    // automatically respect the OS-level "reduce motion" accessibility
    // setting (disables non-essential transforms, keeps opacity fades) —
    // one switch instead of hand-guarding every whileInView/animate prop.
    <MotionConfig reducedMotion="user">
      <div className="flex min-h-full flex-col">
        <Header />
        <main className="flex flex-1 flex-col">{children}</main>
        <Footer />
        <BmiWidget />
      </div>
    </MotionConfig>
  );
}
