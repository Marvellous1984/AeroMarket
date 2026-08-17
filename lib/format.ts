export function formatPrice(value: number): string {
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
