-- Listing #002: G-CKYJ, our first external-seller listing. Created as a
-- draft so the group can review it at its permanent URL before it goes
-- live — see supabase/migrations/0002_draft_listings.sql for how draft
-- listings behave.
--
-- Facts taken directly from the seller's brief ("G-CKYJ Shares.docx"). The
-- group is currently seeking equity members only, so no non-equity option
-- is mentioned even though the source material referenced a mixed group.
-- No price is given — it depends on the individual member selling — so
-- price is left NULL rather than invented; the UI shows "Contact group".
-- Anything else not supplied (year, airframe/engine hours, costs, insured
-- value) is left NULL rather than guessed.
--
-- To publish: update this row's status to 'active' and set published_at,
-- e.g.:
--   update listings set status = 'active', published_at = now()
--   where slug = 'piper-pa28-200rt-share';
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
  engine_summary,
  description,
  group_facts,
  insurance_info,
  images
) values (
  'piper-pa28-200rt-share',
  'share',
  'draft',
  'Piper',
  'PA-28-200RT',
  'G-CKYJ',
  'Blackbushe Airport',
  'Blackbushe Airport',
  'EGLK',
  null,
  '1/7',
  'pa28.gckyj@gmail.com',
  'Lycoming 200hp fuel-injected engine with a McCauley propeller.',
  E'G-CKYJ is a Piper PA-28-200RT based at Blackbushe Airport (EGLK), operated by a small ownership group.\n\nThe group is currently looking for equity members to take on a 1/7 equity share.\n\nThe aircraft is IR capable, well maintained, and described by the group as being in good condition throughout, with a cruise of approximately 120 knots.',
  '[
    "Small ownership group based at Blackbushe",
    "Currently welcoming a small number of new equity members"
  ]'::jsonb,
  'Minimum 100 hours SEP is required for insurance purposes — if you''re not far short of this, please get in touch anyway. G-CKYJ is a complex aircraft, so prospective members need existing complex-aircraft experience or must be willing to complete appropriate training and sign-off. Pilots with previous complex experience need at least 5 hours on the PA-28RT type; pilots without this experience can complete the required 5 hours in G-CKYJ under supervision.',
  '[
    {"src": "/images/listings/g-ckyj/01-front-three-quarter.jpg", "alt": "G-CKYJ three-quarter exterior view on the apron at Blackbushe", "order": 1},
    {"src": "/images/listings/g-ckyj/02-nose-engine-propeller.jpg", "alt": "Nose-on view of G-CKYJ showing the engine and propeller", "order": 2},
    {"src": "/images/listings/g-ckyj/03-cockpit-wide.jpg", "alt": "Cockpit wide shot showing front seats and controls", "order": 3},
    {"src": "/images/listings/g-ckyj/04-instrument-panel.jpg", "alt": "Instrument panel and avionics, including the Garmin GNS530", "order": 4},
    {"src": "/images/listings/g-ckyj/05-rear-seats.jpg", "alt": "Rear seats and cabin interior", "order": 5}
  ]'::jsonb
);
