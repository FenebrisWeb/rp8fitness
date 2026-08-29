import type { Metadata } from "next";
import BmiPageContent from "@/app/components/bmi/bmi-page-content";

export const metadata: Metadata = {
  title: "Free BMI Calculator",
  description:
    "Calculate your Body Mass Index instantly with the free RP8 Fitness BMI calculator. Get your BMI category, what it means for your health, and a plan to reach your goals.",
  alternates: { canonical: "/bmi-calculator" },
  openGraph: {
    title: "Free BMI Calculator | RP8 Fitness",
    description: "Know your BMI instantly and get a personalized next step toward a healthier, stronger you.",
    url: "/bmi-calculator",
  },
};

export default function BmiCalculatorPage() {
  return <BmiPageContent />;
}
