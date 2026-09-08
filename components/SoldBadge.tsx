export function SoldBadge({ className = "" }: { className?: string }) {
  return (
    <span
      className={`inline-flex items-center rounded-full bg-foreground px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wide text-background ${className}`}
    >
      Sold
    </span>
  );
}
