// Diagonal corner ribbon — always anchors to the top-left corner of its
// nearest positioned ancestor, which must have overflow-hidden (every
// image container this is used in already does) so the ribbon's ends get
// clipped cleanly at the container edges instead of floating past them.
const SIZES = {
  sm: { offset: "top-3 -left-8", width: "w-32", padding: "py-1", text: "text-[11px]" },
  md: { offset: "top-4 -left-10", width: "w-40", padding: "py-1.5", text: "text-xs" },
  lg: { offset: "top-6 -left-14", width: "w-56", padding: "py-2", text: "text-base" },
} as const;

export function SoldBadge({
  size = "md",
  className = "",
}: {
  size?: keyof typeof SIZES;
  className?: string;
}) {
  const s = SIZES[size];

  return (
    <span
      className={`pointer-events-none absolute z-10 ${s.offset} ${s.width} ${s.padding} rotate-[-45deg] bg-accent text-center ${s.text} font-bold uppercase tracking-wider text-accent-foreground shadow-md ${className}`}
    >
      Sold
    </span>
  );
}
