import Image from "next/image";
import Link from "next/link";
import type { FooterContent } from "@/app/types/footer";

const FOOTER_CONTENT: FooterContent = {
  tagline: "More than a gym, it's a community built for real results.",
  linkGroups: [
    {
      title: "Quick Links",
      links: [
        { label: "Home", href: "/" },
        { label: "About Us", href: "/about" },
        { label: "Our Zones", href: "#" },
        { label: "Membership", href: "#" },
        { label: "Trainers", href: "#" },
        { label: "Franchise", href: "/franchise" },
        { label: "Contact Us", href: "/contact" },
      ],
    },
    {
      title: "Membership",
      links: [
        { label: "Plans", href: "#" },
        { label: "Personal Training", href: "#" },
        { label: "Group Classes", href: "#" },
        { label: "Schedule", href: "#" },
      ],
    },
    {
      title: "Support",
      links: [
        { label: "FAQs", href: "/faq" },
        { label: "Terms & Conditions", href: "/terms-and-conditions" },
        { label: "Privacy Policy", href: "/privacy-policy" },
        { label: "Refund Policy", href: "/refund-policy" },
      ],
    },
  ],
  contact: [
    { id: "address", lines: ["123 Fitness Ave,", "Your City, State"] },
    { id: "phone", lines: ["+91 12345 67890"] },
    { id: "email", lines: ["info@rp8fitness.com"] },
  ],
  copyright: `© ${new Date().getFullYear()} RP8 Fitness. All rights reserved.`,
};

const SOCIAL_LINKS = [
  { id: "instagram", label: "Instagram", href: "#" },
  { id: "facebook", label: "Facebook", href: "#" },
  { id: "youtube", label: "YouTube", href: "#" },
] as const;

function ContactIcon({ id, className }: { id: string; className?: string }) {
  switch (id) {
    case "address":
      return (
        <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
          <path d="M12 21s7-6.5 7-12a7 7 0 10-14 0c0 5.5 7 12 7 12z" />
          <circle cx="12" cy="9" r="2" />
        </svg>
      );
    case "phone":
      return (
        <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
          <path d="M6.6 10.8a15 15 0 006.6 6.6l2.2-2.2a1 1 0 011-.3c1.1.4 2.3.6 3.6.6a1 1 0 011 1V20a1 1 0 01-1 1C10.6 21 3 13.4 3 4a1 1 0 011-1h3.5a1 1 0 011 1c0 1.3.2 2.5.6 3.6a1 1 0 01-.3 1z" />
        </svg>
      );
    case "email":
      return (
        <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
          <rect x="3" y="5" width="18" height="14" rx="2" />
          <path d="M4 7l8 6 8-6" />
        </svg>
      );
    default:
      return null;
  }
}

function SocialIcon({ id, className }: { id: string; className?: string }) {
  switch (id) {
    case "instagram":
      return (
        <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden>
          <rect x="3" y="3" width="18" height="18" rx="5" />
          <circle cx="12" cy="12" r="4" />
          <circle cx="17.2" cy="6.8" r="1" fill="currentColor" stroke="none" />
        </svg>
      );
    case "facebook":
      return (
        <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden>
          <rect x="3" y="3" width="18" height="18" rx="5" />
          <path
            d="M14 8.3h-1.3c-.7 0-1.2.5-1.2 1.3V11h2.4l-.3 2.4h-2.1V19h-2.4v-5.6H7.5V11H9V9.3c0-1.9 1.2-3.3 3-3.3H14z"
            fill="currentColor"
            stroke="none"
          />
        </svg>
      );
    case "youtube":
      return (
        <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden>
          <rect x="3" y="6" width="18" height="12" rx="4" />
          <path d="M10.5 9.5l4.5 2.5-4.5 2.5z" fill="currentColor" stroke="none" />
        </svg>
      );
    default:
      return null;
  }
}

export default function Footer() {
  const { tagline, linkGroups, contact, copyright } = FOOTER_CONTENT;

  return (
    <footer className="border-t border-foreground/10">
      <div className="mx-auto w-full max-w-[1700px] px-6 py-14 sm:px-10 sm:py-16">
        <div className="grid grid-cols-2 gap-x-8 gap-y-12 sm:grid-cols-3 lg:grid-cols-4 lg:gap-x-10">
          <div className="col-span-2 sm:col-span-3 lg:col-span-1">
            <Image src="/rp8-logo.png" alt="RP8 Fitness" width={400} height={159} className="h-11 w-auto" />
            <p className="mt-4 max-w-[220px] font-mono text-sm text-foreground">{tagline}</p>

            <div className="mt-5 flex items-center gap-3">
              {SOCIAL_LINKS.map((social) => (
                <Link
                  key={social.id}
                  href={social.href}
                  aria-label={social.label}
                  className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-full border border-foreground/25 text-foreground transition-colors hover:border-accent-strong hover:text-accent-strong"
                >
                  <SocialIcon id={social.id} className="h-4 w-4" />
                </Link>
              ))}
            </div>
          </div>

          {linkGroups.map((group) => (
            <div key={group.title}>
              <h3 className="font-mono text-xs font-bold uppercase tracking-[0.14em] text-foreground">
                {group.title}
              </h3>
              <ul className="mt-4 flex flex-col gap-3">
                {group.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="font-mono text-sm text-foreground transition-colors hover:text-accent-strong"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}

                {/* Contact details live inside the Support column now,
                    rather than as their own separate footer block. */}
                {group.title === "Support" &&
                  contact.map((item) => (
                    <li key={item.id} className="flex items-start gap-2.5">
                      <ContactIcon id={item.id} className="mt-0.5 h-4 w-4 flex-none text-accent-strong" />
                      <span className="font-mono text-sm text-foreground">
                        {item.lines.map((line) => (
                          <span key={line} className="block">
                            {line}
                          </span>
                        ))}
                      </span>
                    </li>
                  ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <div className="border-t border-foreground/10">
        <div className="mx-auto flex max-w-[1700px] flex-wrap items-center justify-between gap-2 px-6 py-6 font-mono text-[11px] uppercase tracking-[0.14em] text-foreground sm:px-10">
          <span>rp8fitness.com</span>
          <span>{copyright}</span>
        </div>
      </div>
    </footer>
  );
}
