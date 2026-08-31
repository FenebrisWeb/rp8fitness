import type { MetadataRoute } from "next";

// Required for `output: "export"` — tells Next this route has no
// per-request data and can be pre-rendered once at build time like every
// other static page.
export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: "https://rp8fitness.com/sitemap.xml",
  };
}
