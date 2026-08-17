import Link from "next/link";
import { BRAND_NAME } from "@/lib/config/brand";

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-surface/90 backdrop-blur">
      <div className="mx-auto flex h-20 max-w-[1320px] items-center justify-between px-5 sm:px-8 lg:px-10">
        <Link href="/" className="text-xl font-semibold tracking-tight">
          {BRAND_NAME}
        </Link>

        <nav className="hidden items-center gap-9 text-[15px] font-medium sm:flex">
          <Link href="/aircraft" className="hover:text-accent">
            Aircraft
          </Link>
          <Link href="/shares" className="hover:text-accent">
            Shares
          </Link>
        </nav>

        <Link
          href="/sell"
          className="rounded-lg bg-accent px-5 py-2.5 text-sm font-semibold text-accent-foreground transition-opacity hover:opacity-90"
        >
          Sell an aircraft
        </Link>
      </div>

      <nav className="flex items-center gap-6 border-t border-border px-4 py-2 text-sm font-medium sm:hidden">
        <Link href="/aircraft" className="hover:text-accent">
          Aircraft
        </Link>
        <Link href="/shares" className="hover:text-accent">
          Shares
        </Link>
      </nav>
    </header>
  );
}
