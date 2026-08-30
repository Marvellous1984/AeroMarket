import type {
  HighlightIconKey,
  ListingHighlight,
  ListingRow,
} from "@/lib/types/database";
import { formatCompactGBP } from "@/lib/format";

const iconProps = {
  width: 22,
  height: 22,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.75,
  "aria-hidden": true,
} as const;

function UsersIcon() {
  return (
    <svg {...iconProps}>
      <path d="M17 21v-2a4 4 0 0 0-4-4H7a4 4 0 0 0-4 4v2" />
      <circle cx="10" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M15.5 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  );
}

function CalendarIcon() {
  return (
    <svg {...iconProps}>
      <rect x="3" y="5" width="18" height="16" rx="2" />
      <path d="M8 3v4M16 3v4M3 10h18" />
    </svg>
  );
}

function ClockIcon() {
  return (
    <svg {...iconProps}>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 3" />
    </svg>
  );
}

function GaugeIcon() {
  return (
    <svg {...iconProps}>
      <path d="M4.5 19a8 8 0 1 1 15 0" />
      <path d="M12 12l3.5-3.5" />
      <path d="M12 19v.01" />
    </svg>
  );
}

function ShieldIcon() {
  return (
    <svg {...iconProps}>
      <path d="M12 3l7 3v6c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6l7-3z" />
    </svg>
  );
}

function BoltIcon() {
  return (
    <svg {...iconProps}>
      <path d="M13 2 4 14h6l-1 8 9-12h-6l1-8z" />
    </svg>
  );
}

function CloudIcon() {
  return (
    <svg {...iconProps}>
      <path d="M7 18a4.5 4.5 0 0 1-.5-8.97A5.5 5.5 0 0 1 17.2 8.05 4 4 0 0 1 17 16H7z" />
    </svg>
  );
}

const ICONS: Record<HighlightIconKey, () => JSX.Element> = {
  ownership: UsersIcon,
  calendar: CalendarIcon,
  clock: ClockIcon,
  gauge: GaugeIcon,
  shield: ShieldIcon,
  bolt: BoltIcon,
  cloud: CloudIcon,
};

// Listings created before the flexible `highlights` column existed (e.g.
// G-AVSF) don't have it populated — derive the same fixed set of cards they
// always showed from their dedicated columns, so nothing changes for them.
function deriveLegacyHighlights(listing: ListingRow): ListingHighlight[] {
  const candidates: (ListingHighlight | null)[] = [
    listing.share_fraction
      ? { value: listing.share_fraction, label: "Ownership", icon: "ownership" as const }
      : null,
    listing.monthly_cost
      ? { value: formatCompactGBP(listing.monthly_cost), label: "per month", icon: "calendar" as const }
      : null,
    listing.hourly_cost
      ? { value: formatCompactGBP(listing.hourly_cost), label: "per flying hour", icon: "clock" as const }
      : null,
    listing.engine_hours_since_rebuild
      ? {
          value: `~${listing.engine_hours_since_rebuild} hrs`,
          label: "since factory-rebuilt engine",
          icon: "gauge" as const,
        }
      : null,
    listing.insured_hull_value
      ? { value: formatCompactGBP(listing.insured_hull_value), label: "insured hull value", icon: "shield" as const }
      : null,
  ];
  return candidates.filter(
    (highlight): highlight is ListingHighlight => highlight !== null,
  );
}

// Column counts for card counts we actually expect. 5 matches the original
// fixed layout (and stays the sensible default for 5+ highlights); other
// counts get columns that divide evenly so no row is left with a gap.
const GRID_COLS: Record<number, string> = {
  1: "grid-cols-1 sm:grid-cols-1 lg:grid-cols-1",
  2: "grid-cols-2 sm:grid-cols-2 lg:grid-cols-2",
  3: "grid-cols-2 sm:grid-cols-3 lg:grid-cols-3",
  4: "grid-cols-2 sm:grid-cols-4 lg:grid-cols-4",
};
const DEFAULT_GRID_COLS = "grid-cols-2 sm:grid-cols-3 lg:grid-cols-5";

export function HighlightCards({ listing }: { listing: ListingRow }) {
  const highlights =
    listing.highlights && listing.highlights.length > 0
      ? listing.highlights
      : deriveLegacyHighlights(listing);

  if (highlights.length === 0) return null;

  const gridCols = GRID_COLS[highlights.length] ?? DEFAULT_GRID_COLS;

  return (
    <div className={`grid gap-3 ${gridCols}`}>
      {highlights.map(({ value, label, icon }, i) => {
        const Icon = ICONS[icon];
        return (
          <div
            key={`${label}-${i}`}
            className="rounded-xl border border-border bg-surface p-5"
          >
            <div className="text-muted">
              <Icon />
            </div>
            <p className="mt-3 text-2xl font-semibold tracking-tight">{value}</p>
            <p className="mt-1 text-sm text-muted">{label}</p>
          </div>
        );
      })}
    </div>
  );
}
