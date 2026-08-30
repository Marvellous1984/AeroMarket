-- Support for draft listings (external sellers reviewing a listing at its
-- permanent URL before it goes live) and per-listing enquiry routing.
--
-- Status model: "draft" already existed in listing_status but nothing used
-- it — getListingBySlug/getListings both hard-filtered to 'active'. As of
-- this migration, 'active' is treated as this system's "live" state
-- (see lib/listing.ts: isDraftListing / isLiveListing) and the individual
-- listing page (lib/data/listings.ts: getListingBySlug) resolves a listing
-- regardless of status, via the admin client, so a draft is reachable at its
-- direct URL without being exposed through the public anon-key REST API
-- (the "Public can view active listings" RLS policy is unchanged — draft
-- rows still are not selectable through it).

-- Some listings (e.g. equity shares priced per individual seller) have no
-- fixed advertised price.
alter table listings alter column price drop not null;

-- Lets a listing route enquiry notifications to its own seller inbox
-- instead of the shared marketplace inbox. Null falls back to
-- ENQUIRY_TO_EMAIL (see lib/email/resend.ts).
alter table listings add column contact_email text;
