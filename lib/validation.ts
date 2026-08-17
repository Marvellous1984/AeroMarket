import { z } from "zod";

// `website` is the honeypot field: real users never see or fill it.
export const enquirySchema = z.object({
  listingId: z.string().uuid(),
  name: z.string().trim().min(1, "Enter your name").max(200),
  email: z.string().trim().email("Enter a valid email address").max(320),
  phone: z.string().trim().max(50).optional().or(z.literal("")),
  message: z.string().trim().min(1, "Enter a message").max(4000),
  // Deliberately accepts any value here (not `.max(0)`) — a filled-in
  // honeypot must still pass validation so the route's silent-accept logic
  // handles it, rather than a 400 tipping bots off that they hit a trap.
  website: z.string().max(1000).optional().or(z.literal("")),
  turnstileToken: z.string().optional(),
  referrer: z.string().max(2000).optional().or(z.literal("")),
  utmSource: z.string().max(200).optional().or(z.literal("")),
  utmMedium: z.string().max(200).optional().or(z.literal("")),
  utmCampaign: z.string().max(200).optional().or(z.literal("")),
});

export type EnquiryInput = z.infer<typeof enquirySchema>;

export const sellerLeadSchema = z.object({
  name: z.string().trim().min(1, "Enter your name").max(200),
  email: z.string().trim().email("Enter a valid email address").max(320),
  aircraftType: z.string().trim().min(1, "Enter the aircraft type").max(200),
  listingType: z.enum(["whole", "share"]),
  askingPrice: z.string().trim().max(100).optional().or(z.literal("")),
  location: z.string().trim().max(200).optional().or(z.literal("")),
  message: z.string().trim().max(4000).optional().or(z.literal("")),
  // Deliberately accepts any value here (not `.max(0)`) — a filled-in
  // honeypot must still pass validation so the route's silent-accept logic
  // handles it, rather than a 400 tipping bots off that they hit a trap.
  website: z.string().max(1000).optional().or(z.literal("")),
  turnstileToken: z.string().optional(),
});

export type SellerLeadInput = z.infer<typeof sellerLeadSchema>;
