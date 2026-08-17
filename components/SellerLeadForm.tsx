"use client";

import { useState, type FormEvent } from "react";
import { TurnstileWidget } from "@/components/TurnstileWidget";

type Status = "idle" | "submitting" | "success" | "error";

export function SellerLeadForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [turnstileToken, setTurnstileToken] = useState("");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
    setErrorMessage("");

    const form = new FormData(e.currentTarget);
    const payload = {
      name: form.get("name"),
      email: form.get("email"),
      aircraftType: form.get("aircraftType"),
      listingType: form.get("listingType"),
      askingPrice: form.get("askingPrice"),
      location: form.get("location"),
      message: form.get("message"),
      website: form.get("website"),
      turnstileToken,
    };

    try {
      const res = await fetch("/api/seller-leads", {
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
      <div className="rounded-2xl border border-border bg-surface p-7 sm:p-8">
        <h2 className="text-2xl font-semibold tracking-tight">Thanks</h2>
        <p className="mt-2 text-muted">
          We&apos;ve received your details and will be in touch.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4" noValidate>
      <div className="absolute -left-[9999px]" aria-hidden="true">
        <label htmlFor="website">Leave this field empty</label>
        <input type="text" id="website" name="website" tabIndex={-1} autoComplete="off" />
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
        <label htmlFor="aircraftType" className="text-sm font-medium">
          Aircraft type
        </label>
        <input
          required
          id="aircraftType"
          name="aircraftType"
          type="text"
          placeholder="e.g. Piper PA-28"
          className="mt-1.5 w-full rounded-lg border border-border bg-background px-3.5 py-2.5 text-base"
        />
      </div>

      <div>
        <span className="text-sm font-medium">Whole aircraft or share?</span>
        <div className="mt-1 flex gap-4">
          <label className="flex items-center gap-2 text-sm">
            <input type="radio" name="listingType" value="whole" defaultChecked required />
            Whole aircraft
          </label>
          <label className="flex items-center gap-2 text-sm">
            <input type="radio" name="listingType" value="share" required />
            Share
          </label>
        </div>
      </div>

      <div>
        <label htmlFor="askingPrice" className="text-sm font-medium">
          Approximate asking price
        </label>
        <input
          id="askingPrice"
          name="askingPrice"
          type="text"
          className="mt-1.5 w-full rounded-lg border border-border bg-background px-3.5 py-2.5 text-base"
        />
      </div>

      <div>
        <label htmlFor="location" className="text-sm font-medium">
          Location
        </label>
        <input
          id="location"
          name="location"
          type="text"
          className="mt-1.5 w-full rounded-lg border border-border bg-background px-3.5 py-2.5 text-base"
        />
      </div>

      <div>
        <label htmlFor="message" className="text-sm font-medium">
          Message (optional)
        </label>
        <textarea
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
        className="w-full rounded-lg bg-accent px-7 py-4 text-base font-semibold text-accent-foreground transition-opacity hover:opacity-90 disabled:opacity-60 sm:w-auto"
      >
        {status === "submitting" ? "Submitting…" : "Submit"}
      </button>
    </form>
  );
}
