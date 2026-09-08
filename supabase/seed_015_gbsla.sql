-- Listing #007: G-BSLA, a Robin Regent DR400/180 share at Rochester (EGTO),
-- our sixth external-seller listing. Created as a draft — see
-- supabase/migrations/0002_draft_listings.sql for how draft listings
-- behave, and supabase/seed_009_gcicg.sql for the same workflow.
--
-- Andrew McCoig asked for this listing and introduced Ian Exley as the
-- factual cross-check. Andrew explicitly warned that engine/propeller
-- figures he'd previously posted elsewhere (a separate free-site advert)
-- were guesses and wrong — none of that other advert's figures are used
-- anywhere in this file. All facts below come solely from the group's own
-- Rochester poster ("Advertisement for share in LA for Rochester  AOPA
-- (1).docx", cross-checked from its raw document.xml text, not just a
-- visual read), which Ian confirmed is the correct source.
--
-- Propeller make/model and propeller hours are NOT in the poster at all —
-- deliberately omitted rather than guessed. Needs Ian/Andrew to supply
-- before this goes live.
--
-- engine_summary/engine_rebuilt_date/engine_hours_since_rebuild are
-- omitted entirely (same reasoning as seed_011_gatef.sql): the poster
-- gives engine hours with no rebuild/overhaul date or wording, so the
-- figure is presented as a plain "Airframe & engine" spec row instead of
-- feeding EngineSection's "Factory-rebuilt engine" / "hours since
-- installation" treatment, which the source doesn't support.
--
-- Neither Ian's nor Andrew's phone number (both given in the poster) is
-- stored anywhere — no email address was supplied, so contact_email is
-- left NULL and enquiries route through the shared marketplace inbox
-- (ENQUIRY_TO_EMAIL), same fallback as seed_009_gcicg.sql.
--
-- No pilot/insurance requirements were supplied, so insurance_info /
-- insurance_points are omitted rather than guessed.
--
-- The aircraft cover Ian mentioned (available for nights away from base)
-- is added as a group_facts bullet rather than its own section/highlight
-- card, per the group's instruction not to overstate it.
--
-- Photos: six original photos supplied directly by Ian, all confirmed as
-- the same aircraft/registration. Resized to a 1600px-long-edge cap
-- (mozjpeg q84, EXIF/GPS stripped) where the source exceeded that; the
-- poster's own embedded photo (G-BSLA.JPG, byte-identical to the image
-- inside the .docx) was already small and is used unresized as image 06.
-- Gallery order follows Ian/Andrew's preferred variety-over-filename
-- ordering, with the 2019 three-quarter shot as hero per their request.
--
-- To publish: update this row's status to 'active' and set published_at,
-- e.g.:
--   update listings set status = 'active', published_at = now()
--   where slug = 'robin-regent-dr400-180-share';
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
  equipment,
  group_facts,
  images
) values (
  'robin-regent-dr400-180-share',
  'share',
  'draft',
  'Robin',
  'Regent DR400/180',
  1990,
  'G-BSLA',
  'Rochester Airport',
  'Rochester Airport',
  'EGTO',
  20000,
  '1/4',
  180,
  130,
  E'A 25% equity share is available in G-BSLA, a Robin Regent DR400/180 based at Rochester Airport (EGTO), offered at £20,000 ono.\n\nG-BSLA was registered new in 1990 and has always been privately or group owned — it has never been operated by a flying school. The aircraft is hangared at Rochester and powered by a 180 hp Lycoming O-360-A3A, with airframe hours of approximately 2,870 and engine hours of approximately 1,247.',
  '[
    {"value": "1/4", "label": "Equity share", "icon": "ownership"},
    {"value": "£180", "label": "Per month", "icon": "calendar"},
    {"value": "£130/hr", "label": "Per tacho hour", "icon": "clock"},
    {"value": "180 hp", "label": "Lycoming O-360-A3A", "icon": "bolt"}
  ]'::jsonb,
  '[
    {"label": "Registered new", "value": "1990"},
    {"label": "Engine", "value": "Lycoming O-360-A3A"},
    {"label": "Power", "value": "180 hp"},
    {"label": "Airframe hours", "value": "approx. 2,870"},
    {"label": "Engine hours", "value": "approx. 1,247"}
  ]'::jsonb,
  'Airframe & engine',
  '[
    {"label": "GPS/Nav", "value": "Garmin 430W"},
    {"label": "Primary flight display", "value": "Garmin G5"},
    {"label": "Radio", "value": "Garmin GTR 205"},
    {"label": "Navigation aids", "value": "VOR/DME/NDB"},
    {"label": "Tablet mount", "value": "Apple/Samsung compatible"},
    {"label": "Conspicuity", "value": "Group-owned SkyEcho"}
  ]'::jsonb,
  '[
    "G-BSLA has always been privately or group owned, never operated by a flying school",
    "Hangared at Rochester",
    "Online booking system via ABS",
    "An aircraft cover is also available for use when staying away from base overnight"
  ]'::jsonb,
  '[
    {"src": "/images/listings/robin-regent-dr400-180-share/01-three-quarter-grass-rochester.jpg", "alt": "G-BSLA, a Robin Regent DR400/180, three-quarter view on the grass at Rochester Airport", "order": 1},
    {"src": "/images/listings/robin-regent-dr400-180-share/02-front-three-quarter-hangar.jpg", "alt": "G-BSLA parked in front of the hangars at Rochester Airport, front three-quarter view", "order": 2},
    {"src": "/images/listings/robin-regent-dr400-180-share/03-side-profile-clear-sky.jpg", "alt": "G-BSLA, a Robin Regent DR400/180, side profile against a clear blue sky", "order": 3},
    {"src": "/images/listings/robin-regent-dr400-180-share/04-side-profile-apron.jpg", "alt": "G-BSLA side profile on the grass, with another aircraft in the background", "order": 4},
    {"src": "/images/listings/robin-regent-dr400-180-share/05-rear-three-quarter-meadow.jpg", "alt": "G-BSLA rear three-quarter view, with wildflowers in the foreground", "order": 5},
    {"src": "/images/listings/robin-regent-dr400-180-share/06-front-three-quarter-hangar-poster.jpg", "alt": "G-BSLA front three-quarter view in front of the hangars at Rochester Airport", "order": 6}
  ]'::jsonb
);
