import Image from "next/image";
import Link from "next/link";

const NAV_LINKS = [
  { label: "Home", href: "#" },
  { label: "Pages", href: "#" },
  { label: "Program", href: "#" },
  { label: "Trainers", href: "#" },
  { label: "Blog", href: "#" },
  { label: "Contact", href: "#" },
];

export default function Header() {
  return (
    <header className="w-full">
      <div className="mx-auto flex max-w-[1700px] items-center justify-between gap-6 px-6 py-6 sm:px-10">
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/logo_png.png"
            alt="RP8 Fitness"
            width={32}
            height={32}
            className="h-8 w-8"
          />
          <span className="font-display text-lg font-black uppercase tracking-tight text-chalk">
            RP8 Fitness
          </span>
        </Link>

        <span className="hidden font-mono text-xs uppercase leading-tight tracking-[0.1em] text-chalk/80 md:block">
          123 Fitness Ave,
          <br />
          Your City, State
        </span>

        <nav className="hidden items-center gap-7 text-sm text-chalk/90 lg:flex">
          {NAV_LINKS.map((link) => (
            <Link key={link.label} href={link.href} className="hover:text-lime">
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <Link
            href="#"
            className="flex items-center gap-2 rounded-full bg-lime px-4 py-2 font-mono text-[11px] font-bold uppercase tracking-[0.1em] text-ink transition-opacity hover:opacity-90"
          >
            Join Now
            <span aria-hidden className="text-sm leading-none">
              ↗
            </span>
          </Link>
          <button
            type="button"
            aria-label="Open menu"
            className="flex h-8 w-8 flex-col items-end justify-center gap-1.5 text-chalk"
          >
            <span className="h-[2px] w-6 bg-current" />
            <span className="h-[2px] w-4 bg-current" />
          </button>
        </div>
      </div>
    </header>
  );
}
