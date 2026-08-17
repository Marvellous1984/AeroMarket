"use client";

import { useEffect, useState, type FormEvent } from "react";
import { TurnstileWidget } from "@/components/TurnstileWidget";
import type { ListingRow } from "@/lib/types/database";

type Status = "idle" | "submitting" | "success" | "error";

export function EnquiryForm({ listing }: { listing: ListingRow }) {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [turnstileToken, setTurnstileToken] = useState("");
  const [attribution, setAttribution] = useState({
    referrer: "",
    utmSource: "",
    utmMedium: "",
    utmCampaign: "",
  });

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setAttribution({
      referrer: document.referrer,
      utmSource: params.get("utm_source") ?? "",
      utmMedium: params.get("utm_medium") ?? "",
      utmCampaign: params.get("utm_campaign") ?? "",
    });
  }, []);

  const isShare = listing.listing_type === "share";

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
    setErrorMessage("");

    const form = new FormData(e.currentTarget);
    const payload = {
      listingId: listing.id,
      name: form.get("name"),
      email: form.get("email"),
      phone: form.get("phone"),
      message: form.get("message"),
      website: form.get("website"),
      turnstileToken,
      referrer: attribution.referrer,
      utmSource: attribution.utmSource,
      utmMedium: attribution.utmMedium,
      utmCampaign: attribution.utmCampaign,
    };

    try {
      const res = await fetch("/api/enquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => null);
        throw new Error(data?.error ?? "Something went wrong. Please try again.");
      }

      setStatus("success");
    } catch (err) {
      setStatus("error");
      setErrorMessage(
        err instanceof Error ? err.message : "Something went wrong. Please try again.",
      );
    }
  }

  if (status === "success") {
    return (
      <section id="enquiry" className="rounded-2xl border border-border bg-surface p-7">
        <h2 className="text-2xl font-semibold tracking-tight">Enquiry sent</h2>
        <p className="mt-2 text-muted">
          Thanks. Your enquiry has been sent to the seller.
        </p>
      </section>
    );
  }

  return (
    <section id="enquiry" className="rounded-2xl border border-border bg-surface p-7">
      <h2 className="text-2xl font-semibold tracking-tight">
        Interested in this {isShare ? "share" : "aircraft"}?
      </h2>
      <p className="mt-2 text-muted">
        Ask a question, arrange to see the aircraft
        {isShare ? ", or find out more about the syndicate" : ""}.
      </p>

      <form onSubmit={handleSubmit} className="mt-6 space-y-4" noValidate>
        <div className="absolute -left-[9999px]" aria-hidden="true">
          <label htmlFor="website">Leave this field empty</label>
          <input
            type="text"
            id="website"
            name="website"
            tabIndex={-1}
            autoComplete="off"
          />
        </div>

        <div>
          <label htmlFor="name" className="text-sm font-medium">
            Name
          </label>
          <input
            required
            id="name"
            name="name"
            type="text"
            autoComplete="name"
            className="mt-1.5 w-full rounded-lg border border-border bg-background px-3.5 py-2.5 text-base"
          />
        </div>

        <div>
          <label htmlFor="email" className="text-sm font-medium">
            Email
          </label>
          <input
            required
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            className="mt-1.5 w-full rounded-lg border border-border bg-background px-3.5 py-2.5 text-base"
          />
        </div>

        <div>
          <label htmlFor="phone" className="text-sm font-medium">
            Phone (optional)
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            className="mt-1.5 w-full rounded-lg border border-border bg-background px-3.5 py-2.5 text-base"
          />
        </div>

        <div>
          <label htmlFor="message" className="text-sm font-medium">
            Message
          </label>
          <textarea
            required
            id="message"
            name="message"
            rows={4}
            className="mt-1.5 w-full rounded-lg border border-border bg-background px-3.5 py-2.5 text-base"
          />
        </div>

        <TurnstileWidget onVerify={setTurnstileToken} />

        {status === "error" ? (
          <p role="alert" className="text-sm text-danger">
            {errorMessage}
          </p>
        ) : null}

        <button
          type="submit"
          disabled={status === "submitting"}
          className="w-full rounded-lg bg-accent px-7 py-4 text-base font-semibold text-accent-foreground transition-opacity hover:opacity-90 disabled:opacity-60"
        >
          {status === "submitting"
            ? "Sending…"
            : `Enquire about this ${isShare ? "share" : "aircraft"}`}
        </button>
      </form>
    </section>
  );
}
