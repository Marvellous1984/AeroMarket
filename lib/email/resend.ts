import { Resend } from "resend";
import type { ListingRow } from "@/lib/types/database";
import type { EnquiryInput, SellerLeadInput } from "@/lib/validation";

function getResend() {
  return new Resend(process.env.RESEND_API_KEY);
}

const toAddress = () => process.env.ENQUIRY_TO_EMAIL!;
const fromAddress = () => process.env.ENQUIRY_FROM_EMAIL!;

export async function sendEnquiryEmails(
  enquiry: EnquiryInput,
  listing: ListingRow,
) {
  const resend = getResend();
  const timestamp = new Date().toISOString();
  const listingLabel = `${listing.manufacturer} ${listing.model}${
    listing.share_fraction ? ` (${listing.share_fraction} share)` : ""
  }`;

  await resend.emails.send({
    to: toAddress(),
    from: fromAddress(),
    replyTo: enquiry.email,
    subject: `New enquiry: ${listingLabel}`,
    text: [
      `Listing: ${listingLabel} (${listing.slug})`,
      `Name: ${enquiry.name}`,
      `Email: ${enquiry.email}`,
      `Phone: ${enquiry.phone || "Not provided"}`,
      "",
      "Message:",
      enquiry.message,
      "",
      `Timestamp: ${timestamp}`,
      `Referrer: ${enquiry.referrer || "Not provided"}`,
      `UTM source: ${enquiry.utmSource || "Not provided"}`,
      `UTM medium: ${enquiry.utmMedium || "Not provided"}`,
      `UTM campaign: ${enquiry.utmCampaign || "Not provided"}`,
    ].join("\n"),
  });

  await resend.emails.send({
    to: enquiry.email,
    from: fromAddress(),
    subject: `Enquiry received: ${listingLabel}`,
    text: [
      `Thanks ${enquiry.name}, your enquiry about the ${listingLabel} has been sent to the seller.`,
      "",
      "They'll be in touch directly.",
    ].join("\n"),
  });
}

export async function sendSellerLeadEmail(lead: SellerLeadInput) {
  const resend = getResend();
  const timestamp = new Date().toISOString();

  await resend.emails.send({
    to: toAddress(),
    from: fromAddress(),
    replyTo: lead.email,
    subject: `New seller lead: ${lead.aircraftType}`,
    text: [
      `Name: ${lead.name}`,
      `Email: ${lead.email}`,
      `Aircraft type: ${lead.aircraftType}`,
      `Listing type: ${lead.listingType}`,
      `Asking price: ${lead.askingPrice || "Not provided"}`,
      `Location: ${lead.location || "Not provided"}`,
      "",
      "Message:",
      lead.message || "Not provided",
      "",
      `Timestamp: ${timestamp}`,
    ].join("\n"),
  });
}
