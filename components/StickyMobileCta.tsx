"use client";

import { formatPrice } from "@/lib/format";

export function StickyMobileCta({ price }: { price: number }) {
  function scrollToEnquiry() {
    document
      .getElementById("enquiry")
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  return (
    <div
      className="fixed inset-x-0 bottom-0 z-30 flex items-center justify-between gap-4 border-t border-border bg-surface/95 px-5 pb-4 pt-4 backdrop-blur sm:hidden"
      style={{ paddingBottom: "max(1rem, env(safe-area-inset-bottom))" }}
    >
      <span className="text-xl font-semibold tracking-tight">
        {formatPrice(price)}
      </span>
      <button
        type="button"
        onClick={scrollToEnquiry}
        className="rounded-lg bg-accent px-6 py-3 text-base font-semibold text-accent-foreground"
      >
        Enquire
      </button>
    </div>
  );
}
