-- Listing #004: Mike Berry's Piper Arrow G-BOJI, our third external-seller
-- listing. Created as a draft — see supabase/migrations/0002_draft_listings.sql
-- for how draft listings behave, and supabase/seed_002_gckyj.sql for the
-- same workflow.
--
-- Facts taken directly from Mike's supplied Word document ("GBOJI SHARE
-- FOR SALE £6500 AUGUST 11TH 2026 (2) (1).docx"), cross-checked against its
-- raw text runs (not just a visual read). Hours are preserved exactly as
-- supplied (e.g. "1609:46") in the specs section rather than converted to
-- decimal hours or forced into the numeric engine_hours_since_rebuild
-- column, which represents a different concept (hours since rebuild, not
-- raw hours at last annual).
--
-- Mike separately mentioned a second G-BOJI share being advertised at
-- £9,500 and possible future repaint costs — that is not part of his
-- supplied advert and is deliberately excluded from this listing. The
-- advertised share here is £6,500, per the source document.
--
-- His phone number is not stored anywhere — enquiries route through
-- contact_email only, same as every other listing.
--
-- To publish: update this row's status to 'active' and set published_at,
-- e.g.:
--   update listings set status = 'active', published_at = now()
--   where slug = 'piper-arrow-pa28rt-201-share';
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
  insurance_points,
  images
) values (
  'piper-arrow-pa28rt-201-share',
  'share',
  'draft',
  'Piper',
  'Arrow PA-28RT-201',
  'G-BOJI',
  'Blackbushe Airport',
  'Blackbushe Airport',
  'EGLK',
  6500,
  '1/10',
  'michaelberryis@gmail.com',
  163,
  173,
  E'A 1/10 share is available in G-BOJI, a Piper Arrow PA28RT-201 based at Blackbushe Airport.\n\nThe aircraft is equipped with a comprehensive Garmin and King avionics fit, including a Garmin GNS 430W approved for RNP approaches.',
  '[
    {"value": "1/10", "label": "Equity share", "icon": "ownership"},
    {"value": "£163", "label": "Per month", "icon": "calendar"},
    {"value": "£173", "label": "Per tacho hour", "icon": "clock"},
    {"value": "150 h", "label": "Minimum P1", "icon": "gauge"}
  ]'::jsonb,
  '[
    {"label": "Last annual", "value": "March 2026"},
    {"label": "Airframe hours", "value": "8468:46"},
    {"label": "Engine hours", "value": "1609:46"},
    {"label": "Propeller hours", "value": "222:42"}
  ]'::jsonb,
  'Aircraft & hours',
  '[
    {"label": "Avionics", "value": "Garmin GNS 430W Nav/Com/GPS (RNP approaches approved), Garmin GNC 225A Nav/Com, Garmin GTX 328 Transponder, Garmin GMA 347 Audio Panel, King KR87 ADF, King KN64 DME"},
    {"label": "Additional equipment", "value": "4 lifejackets"}
  ]'::jsonb,
  '[
    "Class 2 Medical required",
    "Minimum 150 hours P1",
    "Complex aircraft sign-off required"
  ]'::jsonb,
  '[
    {"src": "/images/listings/piper-arrow-pa28rt-201-share/01-in-flight.jpg", "alt": "G-BOJI in flight, gear down", "order": 1}
  ]'::jsonb
);
