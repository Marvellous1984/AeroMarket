import type { Metadata } from "next";
import { SellerLeadForm } from "@/components/SellerLeadForm";

export const metadata: Metadata = {
  title: "Sell an aircraft",
};

export default function SellPage() {
  return (
    <section className="mx-auto max-w-xl px-4 py-16 sm:px-6">
      <h1 className="text-3xl font-semibold tracking-tight">
        Got an aircraft to sell?
      </h1>
      <p className="mt-2 text-muted">
        Whole aircraft or share, we&apos;d love to hear about it. Tell us a
        little about it and we&apos;ll be in touch.
      </p>

      <div className="mt-8">
        <SellerLeadForm />
      </div>
    </section>
  );
}
