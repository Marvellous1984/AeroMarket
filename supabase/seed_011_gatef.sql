-- Listing #006: G-ATEF, a Cessna 150E share, our fifth external-seller
-- listing. Created as a draft — see supabase/migrations/0002_draft_listings.sql
-- for how draft listings behave, and supabase/seed_009_gcicg.sql for the
-- same workflow.
--
-- Facts taken from Graeme Wood's supplied advert ("GATEFinfo (1).pdf"),
-- with two seller-confirmed updates superseding the original PDF text:
--   * Flying (wet) rate: £84/hr (PDF says £78/hr — superseded, and £78
--     does not appear anywhere in this listing)
--   * Engine time: 200 hours SMO (PDF says 130hrs SMO — superseded, and
--     130 does not appear anywhere in this listing)
-- Everything else is taken directly from the PDF, per the seller's
-- confirmation that the rest of the advert remains correct.
--
-- engine_summary/engine_rebuilt_date are deliberately left NULL — the
-- source only gives hours "SMO" (since major overhaul), never uses
-- "rebuilt"/"overhauled"/"zero-time"/"factory rebuilt", and
-- engine_rebuilt_date would trigger EngineSection's "Factory-rebuilt
-- engine" heading, which is not supported by the source material. Engine
-- facts are presented as plain equipment rows instead.
--
-- Pilot requirement is a soft preference, not a hard minimum ("100+ hours
-- preferred but could negotiate if less") — stored as a single
-- insurance_info paragraph rather than insurance_points, so it doesn't
-- read as an absolute checklist requirement.
--
-- Graeme's phone number (given in the source advert) is not stored
-- anywhere. His email address (wood.gh.uk@gmail.com) *was* supplied and is
-- used as contact_email, so enquiries route to him directly rather than
-- the shared marketplace inbox — see migrations/0002_draft_listings.sql.
--
-- Photos: the two images embedded in the source PDF (in-flight and
-- instrument panel), extracted directly from the PDF's raw JPEG streams
-- to preserve original quality rather than re-exporting/screenshotting.
--
-- To publish: update this row's status to 'active' and set published_at,
-- e.g.:
--   update listings set status = 'active', published_at = now()
--   where slug = 'cessna-150e-share';
insert into listings (
  slug,
  listing_type,
  status,
  manufacturer,
  model,
  registration,
  location,
  airport_name,
  airport_code,
  price,
  share_fraction,
  contact_email,
  monthly_cost,
  hourly_cost,
  description,
  highlights,
  specs,
  specs_title,
  equipment,
  insurance_info,
  group_facts,
  images
) values (
  'cessna-150e-share',
  'share',
  'draft',
  'Cessna',
  '150E',
  'G-ATEF',
  'Blackbushe Airport',
  'Blackbushe Airport',
  'EGLK',
  3000,
  '10%',
  'wood.gh.uk@gmail.com',
  90,
  84,
  E'A 10% share is available in G-ATEF, a Cessna 150E based at Blackbushe Airport.\n\nThe aircraft is operated by a small, friendly group with good availability and an online booking system. G-ATEF is powered by a 100 hp Continental O-200A with approximately 200 hours SMO.',
  '[
    {"value": "10%", "label": "Share", "icon": "ownership"},
    {"value": "£90", "label": "Per month", "icon": "calendar"},
    {"value": "£84/hr", "label": "Wet", "icon": "clock"},
    {"value": "200 hrs", "label": "Engine SMO", "icon": "gauge"}
  ]'::jsonb,
  '[
    {"label": "Monthly standing order", "value": "£90"},
    {"label": "Flying (wet)", "value": "£84/hr, brakes off to brakes on"},
    {"label": "EGLK landing fee", "value": "£15"}
  ]'::jsonb,
  'Costs',
  '[
    {"label": "Engine", "value": "Continental O-200A"},
    {"label": "Power", "value": "100 hp"},
    {"label": "Engine time", "value": "200 hours SMO"},
    {"label": "Radio", "value": "Garmin 8.33 kHz"},
    {"label": "Transponder", "value": "Funkwerk Mode ACS"},
    {"label": "DME", "value": "Narco"},
    {"label": "Nav/Com", "value": "Bendix/King with VOR"}
  ]'::jsonb,
  'Pilots with 100+ hours are preferred, although pilots with less experience may be considered.',
  '[
    "Small, friendly group",
    "Online booking system",
    "Good availability"
  ]'::jsonb,
  '[
    {"src": "/images/listings/cessna-150e-share/01-in-flight.jpg", "alt": "G-ATEF, a Cessna 150E, in flight", "order": 1},
    {"src": "/images/listings/cessna-150e-share/02-instrument-panel.jpg", "alt": "G-ATEF instrument panel and avionics", "order": 2}
  ]'::jsonb
);
