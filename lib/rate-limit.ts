// In-memory per-IP rate limiter. Resets on cold start / redeploy — fine at
// MVP volume, but not durable across serverless instances. If enquiry
// volume grows, swap this for Upstash Redis without changing the call site.
const buckets = new Map<string, { count: number; resetAt: number }>();

export function checkRateLimit(
  key: string,
  { limit = 5, windowMs = 10 * 60 * 1000 } = {},
): { allowed: boolean } {
  const now = Date.now();
  const bucket = buckets.get(key);

  if (!bucket || bucket.resetAt < now) {
    buckets.set(key, { count: 1, resetAt: now + windowMs });
    return { allowed: true };
  }

  bucket.count += 1;
  return { allowed: bucket.count <= limit };
}
