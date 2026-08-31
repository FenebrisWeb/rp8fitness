import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Static export: `next build` writes a self-contained `out/` folder of
  // plain HTML/CSS/JS instead of needing a Node server — that folder is
  // what gets uploaded to the host. Requires every route to be static (no
  // API routes, no server actions, no dynamic segments) — true today, so
  // this is a safe switch. Add it back to `next start`-based hosting later
  // by removing this line, if that's ever needed instead.
  output: "export",

  // Static export has no server to run the Image Optimization API on, so
  // next/image can't resize/re-encode on demand — every image below just
  // renders as-is at its source file's size. The <Image> components (fill,
  // sizes, priority, blur-up, etc.) all keep working exactly the same
  // otherwise; only the automatic optimization step is skipped.
  images: {
    unoptimized: true,
    // Next.js 16 requires an explicit allowlist for next/image's `quality`
    // prop (defaults to [75] otherwise) — the hero banners across the site
    // intentionally request 85 for extra sharpness on their large photos.
    qualities: [75, 85],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "picsum.photos",
      },
      {
        protocol: "https",
        hostname: "fastly.picsum.photos",
      },
      {
        protocol: "https",
        hostname: "i.pravatar.cc",
      },
    ],
  },

  // Emits <route>/index.html instead of <route>.html — the former is what
  // ordinary shared/static hosting (Apache, Nginx, cPanel, etc.) expects so
  // that visiting /about/ (or /about, most servers redirect) just serves
  // that folder's index.html with no extra server config needed.
  trailingSlash: true,
};

export default nextConfig;
