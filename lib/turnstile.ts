// Verifies a Cloudflare Turnstile token server-side. If no secret key is
// configured (no Cloudflare Turnstile site created yet), verification is
// skipped and requests pass through — honeypot + rate limiting still apply.
export async function verifyTurnstile(
  token: string | undefined,
  remoteIp: string | undefined,
): Promise<boolean> {
  const secret = process.env.TURNSTILE_SECRET_KEY;
  if (!secret) return true;
  if (!token) return false;

  const body = new URLSearchParams({ secret, response: token });
  if (remoteIp) body.set("remoteip", remoteIp);

  const res = await fetch(
    "https://challenges.cloudflare.com/turnstile/v0/siteverify",
    { method: "POST", body },
  );
  if (!res.ok) return false;

  const data = (await res.json()) as { success: boolean };
  return data.success;
}
