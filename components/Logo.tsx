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

export function Logo({ className = "" }: { className?: string }) {
  return (
    <span
      className={`inline-flex items-baseline font-logo font-extrabold tracking-tight ${className}`}
    >
      <span className="text-accent">buy</span>
      <ExchangeIcon className="mx-[0.12em] h-[0.5em] w-auto self-center text-accent" />
      <span className="text-accent">sell</span>
      <span className="text-foreground">aircraft</span>
      <span className="ml-[0.05em] self-start text-[0.5em] font-bold text-accent">.com</span>
    </span>
  );
}
