"use client";

import { useState } from "react";
import FaqHeroSection from "./faq-hero-section";
import FaqAccordionSection from "./faq-accordion-section";

// A thin client wrapper so the hero's search box can filter the accordion
// below it — the two are separate components, but the search term needs
// to live above both.
export default function FaqPageContent() {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <>
      <FaqHeroSection onSearch={setSearchQuery} />
      <FaqAccordionSection searchQuery={searchQuery} />
    </>
  );
}
