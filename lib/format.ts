// Some listings (e.g. equity shares where price depends on the individual
// seller) have no fixed asking price. Callers pass `listing.price` straight
// through rather than special-casing null themselves.
export function formatPrice(value: number | null): string {
  if (value === null) return "Price on enquiry";
  return new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency: "GBP",
    maximumFractionDigits: 0,
  }).format(value);
}

export function formatCompactGBP(value: number): string {
  if (value >= 1000 && value % 1000 === 0) return `£${value / 1000}k`;
  return formatPrice(value);
}
