export default function Footer() {
  return (
    <footer className="border-t border-white/10">
      <div className="mx-auto flex max-w-[1100px] flex-wrap items-center justify-between gap-2 px-6 py-6 font-mono text-[11px] uppercase tracking-[0.14em] text-steel sm:px-10">
        <span>rp8fitness.com</span>
        <span>&copy; {new Date().getFullYear()} RP8 Fitness. All rights reserved.</span>
      </div>
    </footer>
  );
}
