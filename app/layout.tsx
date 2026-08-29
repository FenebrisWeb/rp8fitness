import type { Metadata } from "next";
import { Geist, Geist_Mono, Archivo } from "next/font/google";
import "./globals.css";
import Wrapper from "./components/layout/wrapper";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const archivo = Archivo({
  variable: "--font-archivo",
  subsets: ["latin"],
});

const SITE_URL = "https://rp8fitness.com";
const DEFAULT_OG_IMAGE = "/HomePage/hero-banner01.webp";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "RP8 Fitness | Premium Gym, Training Zones & Franchise Opportunities",
    template: "%s | RP8 Fitness",
  },
  description:
    "RP8 Fitness is a premium gym built around 10+ dedicated training zones, imported German equipment and expert trainers. Explore memberships, our BMI calculator and franchise opportunities.",
  keywords: [
    "RP8 Fitness",
    "gym near me",
    "fitness franchise",
    "gym membership",
    "personal training",
    "CrossFit gym",
    "boxing gym",
    "BMI calculator",
  ],
  authors: [{ name: "RP8 Fitness" }],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    siteName: "RP8 Fitness",
    locale: "en_IN",
    url: SITE_URL,
    title: "RP8 Fitness | Premium Gym, Training Zones & Franchise Opportunities",
    description:
      "10+ dedicated training zones, imported German equipment and expert trainers under one roof. Explore memberships and franchise opportunities with RP8 Fitness.",
    images: [{ url: DEFAULT_OG_IMAGE, width: 1200, height: 630, alt: "RP8 Fitness" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "RP8 Fitness | Premium Gym, Training Zones & Franchise Opportunities",
    description:
      "10+ dedicated training zones, imported German equipment and expert trainers under one roof. Explore memberships and franchise opportunities with RP8 Fitness.",
    images: [DEFAULT_OG_IMAGE],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${archivo.variable} h-full antialiased`}
      // The inline script below sets data-theme before hydration so light
      // mode never flashes dark first — React's hydration check has no way
      // to know that's expected, so this is the documented escape hatch.
      suppressHydrationWarning
    >
      <head>
        {/* Set the theme before paint so switching to light mode never
            flashes the default dark theme first. */}
        <script
          dangerouslySetInnerHTML={{
            __html: `try{var t=localStorage.getItem("theme");if(t==="light")document.documentElement.setAttribute("data-theme","light")}catch(e){}`,
          }}
        />
      </head>
      <body className="min-h-full flex flex-col">
        <Wrapper>{children}</Wrapper>
      </body>
    </html>
  );
}
