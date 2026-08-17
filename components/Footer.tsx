import Link from "next/link";
import { BRAND_NAME } from "@/lib/config/brand";

export function Footer() {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto max-w-[1320px] px-5 py-14 sm:px-8 lg:px-10">
        <div className="rounded-2xl border border-border bg-surface p-10 text-center shadow-card sm:p-14">
          <h2 className="text-3xl font-semibold tracking-tight">
            Selling an aircraft or share?
          </h2>
          <p className="mx-auto mt-3 max-w-md text-lg text-muted">
            List your aircraft or ownership share on our new marketplace.
          </p>
          <Link
            href="/sell"
            className="mt-8 inline-block rounded-lg bg-accent px-8 py-4 text-base font-semibold text-accent-foreground transition-opacity hover:opacity-90"
          >
            List yours →
          </Link>
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-4 text-sm text-muted sm:flex-row">
          <span>
            &copy; {new Date().getFullYear()} {BRAND_NAME}
          </span>
          <div className="flex gap-6">
            <Link href="/aircraft" className="hover:text-accent">
              Aircraft
            </Link>
            <Link href="/shares" className="hover:text-accent">
              Shares
            </Link>
            <Link href="/sell" className="hover:text-accent">
              Sell an aircraft
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
