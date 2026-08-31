-- G-CKYJ's description already closes with its own clear call to action
-- ("...Please enquire for current availability, pricing and details of
-- current member costs."), so suppress the generic generated CTA for this
-- listing rather than appending a second, redundant "please enquire"
-- sentence right after it. G-AVSF and the Piper Archer both leave `cta`
-- unset (NULL) and pick up the type-based default — see
-- supabase/migrations/0005_listing_cta.sql and lib/listing.ts.
update listings set cta = ''
where slug = 'piper-pa28-200rt-share';
