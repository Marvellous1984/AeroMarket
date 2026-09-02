-- Listing #005: G-CICG, an Ikarus C42 microlight share, our fourth
-- external-seller listing. Created as a draft — see
-- supabase/migrations/0002_draft_listings.sql for how draft listings
-- behave, and supabase/seed_008_gboji.sql for the same workflow.
--
-- Facts taken directly from Ian's supplied advert
-- ("2026.05.07 - GCICG (3).docx"), cross-checked against its raw text runs
-- (not just a visual read). Only one photo was embedded in the source
-- document (a wide, fairly low-resolution export at 1022x352) — used as
-- the sole gallery image since Gallery.tsx already handles a single-photo
-- listing gracefully. Higher-resolution photos should be requested before
-- this goes live.
--
-- "Engine hours: 580" is preserved as a plain spec row (specs/specs_title)
-- rather than forced into the numeric engine_hours_since_rebuild column —
-- same reasoning as seed_008_gboji.sql. engine_summary/engine_rebuilt_date
-- are deliberately left NULL: the source says a new engine was "fitted",
-- never "factory-rebuilt", and engine_rebuilt_date would trigger
-- EngineSection's "Factory-rebuilt engine" heading, which is not
-- supported by the source material.
--
-- Ian's phone number (given in the source advert) is not stored anywhere —
-- no email address was supplied, so contact_email is left NULL and
-- enquiries route through the shared marketplace inbox (ENQUIRY_TO_EMAIL),
-- same fallback described in migrations/0002_draft_listings.sql.
--
-- No pilot/insurance requirements were supplied, so insurance_info /
-- insurance_points are omitted rather than guessed.
--
-- To publish: update this row's status to 'active' and set published_at,
-- e.g.:
--   update listings set status = 'active', published_at = now()
--   where slug = 'ikarus-c42-share';
insert into listings (
  slug,
  listing_type,
  status,
  manufacturer,
  model,
  year,
  registration,
  location,
  airport_name,
  airport_code,
  price,
  share_fraction,
  monthly_cost,
  hourly_cost,
  description,
  highlights,
  specs,
  specs_title,
  group_facts,
  images
) values (
  'ikarus-c42-share',
  'share',
  'draft',
  'Ikarus',
  'C42',
  2013,
  'G-CICG',
  'Blackbushe Airport',
  'Blackbushe Airport',
  'EGLK',
  3500,
  '1/16',
  60,
  45,
  E'A 1/16 equity share is available in G-CICG, a factory-built Ikarus C42 based at Blackbushe Airport. The aircraft is operated by an established syndicate with online booking and active member communication.\n\nG-CICG is powered by an 80 hp Rotax 912. A new engine was fitted by the Light Aircraft Company (TLAC) in May 2024, together with a new Kiev propeller.',
  '[
    {"value": "1/16", "label": "Equity share", "icon": "ownership"},
    {"value": "£60", "label": "Per month", "icon": "calendar"},
    {"value": "£45/hr", "label": "Wet", "icon": "clock"},
    {"value": "80 hp", "label": "Rotax 912", "icon": "bolt"}
  ]'::jsonb,
  '[
    {"label": "Factory built", "value": "2013"},
    {"label": "Airframe hours", "value": "approx. 4,600"},
    {"label": "Engine hours", "value": "approx. 580"},
    {"label": "Engine", "value": "Rotax 912"},
    {"label": "Power", "value": "80 hp"},
    {"label": "Engine fitted", "value": "May 2024 by TLAC"},
    {"label": "Propeller", "value": "Kiev, fitted May 2024"}
  ]'::jsonb,
  'Aircraft & engine',
  '[
    "16-share syndicate, with 15 shares currently active — the group is looking for its 16th member",
    "Friendly, well-organised group run by an active committee",
    "Aircraft booking is managed through Google Calendar",
    "Active WhatsApp group and a private Facebook group for members",
    "Fuel, the Blackbushe landing card, and the aircraft''s tie-down are paid by the group"
  ]'::jsonb,
  '[
    {"src": "/images/listings/ikarus-c42-share/01-three-quarter-exterior.jpg", "alt": "G-CICG, an Ikarus C42, parked on grass at Blackbushe Airport", "order": 1}
  ]'::jsonb
);
