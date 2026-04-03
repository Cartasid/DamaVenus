import Link from "next/link";

export default function SiteHeader() {
  return (
    <header className="border-b border-white/10 bg-surface/80">
      <div className="mx-auto flex w-full max-w-5xl items-center justify-between px-6 py-4">
        <Link href="/" className="font-display text-lg font-semibold tracking-wide no-underline">
          Dama Venus
        </Link>
        <nav aria-label="Primary Navigation" className="flex items-center gap-4 text-sm text-muted">
          <Link href="/music">Music</Link>
          <Link href="/visuals">Visuals</Link>
          <Link href="/about">About</Link>
          <Link href="/press">Press</Link>
          <Link href="/contact">Contact</Link>
        </nav>
      </div>
    </header>
  );
}
