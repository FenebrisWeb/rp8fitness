import Image from "next/image";
import Link from "next/link";

export default function Header() {
  return (
    <header className="border-b border-white/10 bg-ink/80 backdrop-blur">
      <div className="mx-auto flex max-w-[1100px] items-center justify-between px-6 py-4 sm:px-10">
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/logo_png.png"
            alt="RP8 Fitness"
            width={36}
            height={36}
            className="h-9 w-9"
          />
          <span className="font-mono text-xs uppercase tracking-[0.3em] text-steel">
            RP8 Fitness
          </span>
        </Link>

        <nav className="hidden items-center gap-8 font-mono text-xs uppercase tracking-[0.2em] text-steel sm:flex">
          <Link href="#" className="hover:text-chalk">
            Home
          </Link>
          <Link href="#" className="hover:text-chalk">
            About
          </Link>
          <Link href="#" className="hover:text-chalk">
            Franchise
          </Link>
          <Link href="#" className="hover:text-chalk">
            Contact
          </Link>
        </nav>
      </div>
    </header>
  );
}
