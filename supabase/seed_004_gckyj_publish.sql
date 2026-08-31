-- Group-approved wording change, then publish: G-CKYJ draft -> live.
-- Same permanent URL throughout (piper-pa28-200rt-share) — going live only
-- changes `status`/`published_at`, per supabase/migrations/0002_draft_listings.sql.
update listings set
  description = E'A 1/7 equity share is available in G-CKYJ, a Piper PA-28-200RT based at Blackbushe Airport.\n\nG-CKYJ is operated by a small group and is IR equipped, well maintained and described by the group as being in good condition throughout. Powered by a 200hp fuel-injected Lycoming engine, the aircraft cruises at approximately 120 knots.\n\nShare price is determined by the individual member selling. Please enquire for current availability, pricing and details of current member costs.',
  status = 'active',
  published_at = now()
where slug = 'piper-pa28-200rt-share';
