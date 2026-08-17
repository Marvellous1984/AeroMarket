import type { ListingRow } from "@/lib/types/database";
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

export function OwnershipSnapshot({ listing }: { listing: ListingRow }) {
  const stats = [
    listing.share_fraction
      ? { value: listing.share_fraction, label: "Ownership", Icon: UsersIcon }
      : null,
    listing.monthly_cost
      ? { value: formatCompactGBP(listing.monthly_cost), label: "per month", Icon: CalendarIcon }
      : null,
    listing.hourly_cost
      ? { value: formatCompactGBP(listing.hourly_cost), label: "per flying hour", Icon: ClockIcon }
      : null,
    listing.engine_hours_since_rebuild
      ? {
          value: `~${listing.engine_hours_since_rebuild} hrs`,
          label: "since factory-rebuilt engine",
          Icon: GaugeIcon,
        }
      : null,
    listing.insured_hull_value
      ? {
          value: formatCompactGBP(listing.insured_hull_value),
          label: "insured hull value",
          Icon: ShieldIcon,
        }
      : null,
  ].filter(
    (stat): stat is { value: string; label: string; Icon: () => JSX.Element } =>
      stat !== null,
  );

  if (stats.length === 0) return null;

  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
      {stats.map(({ value, label, Icon }) => (
        <div
          key={label}
          className="rounded-xl border border-border bg-surface p-5"
        >
          <div className="text-muted">
            <Icon />
          </div>
          <p className="mt-3 text-2xl font-semibold tracking-tight">{value}</p>
          <p className="mt-1 text-sm text-muted">{label}</p>
        </div>
      ))}
    </div>
  );
}
