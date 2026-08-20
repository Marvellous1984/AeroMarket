import { DOMAIN_SUFFIX } from "@/lib/config/brand";

function ExchangeIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 22 16"
      className={className}
      fill="none"
      aria-hidden="true"
    >
      <path d="M1 5.5H19" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
      <path
        d="M14.5 1L19 5.5L14.5 10"
        stroke="currentColor"
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M21 10.5H3" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
      <path
        d="M7.5 15L3 10.5L7.5 6"
        stroke="currentColor"
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

// Approved primary wordmark: buy [arrows] sell aircraft + domain suffix,
// always one horizontal line. Do not stack, wrap, or otherwise re-lay this
// out — see the brand guide for the approved lockup.
export function Logo({
  className = "",
  variant = "light",
}: {
  className?: string;
  variant?: "light" | "dark";
}) {
  const aircraftColor = variant === "dark" ? "text-white" : "text-foreground";

  return (
    <span
      className={`inline-flex flex-nowrap items-baseline gap-[0.16em] whitespace-nowrap font-sans font-black tracking-tight ${className}`}
    >
      <span className="text-accent">buy</span>
      <ExchangeIcon className="h-[0.48em] w-auto shrink-0 self-center text-accent" />
      <span className="text-accent">sell</span>
      <span className={aircraftColor}>
        aircraft
        <span className="text-[0.56em] font-black text-accent">{DOMAIN_SUFFIX}</span>
      </span>
    </span>
  );
}
