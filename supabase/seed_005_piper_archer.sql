-- Listing #003: John Booth's Piper Archer PA28-181, our second
-- external-seller listing. Created as a draft — see
-- supabase/migrations/0002_draft_listings.sql for how draft listings
-- behave, and supabase/seed_002_gckyj.sql for the same workflow used for
-- G-CKYJ.
--
-- Facts taken directly from John's existing Facebook advert
-- (788208277_..._n.jpg), which he gave permission to reuse. Registration
-- was not given anywhere in the advert, so it is left NULL rather than
-- guessed. Everything else not supplied (insured hull value, damage
-- history, etc.) is likewise omitted rather than invented.
--
-- Unlike G-CKYJ, this listing has a real fixed price (£5,500) and only one
-- usable photo — Gallery.tsx and EquipmentSection.tsx were both extended
-- (backward-compatibly) to handle those cases; see the plan/conversation
-- for details.
--
-- To publish: update this row's status to 'active' and set published_at,
-- e.g.:
--   update listings set status = 'active', published_at = now()
--   where slug = 'piper-archer-pa28-181-share';
insert into listings (
  slug,
  listing_type,
  status,
  manufacturer,
  model,
  year,
  location,
  airport_name,
  airport_code,
  price,
  share_fraction,
  contact_email,
  monthly_cost,
  hourly_cost,
  engine_summary,
  engine_rebuilt_date,
  engine_hours_since_rebuild,
  description,
  highlights,
  equipment,
  equipment_title,
  group_facts,
  insurance_points,
  images
) values (
  'piper-archer-pa28-181-share',
  'share',
  'draft',
  'Piper',
  'Archer PA-28-181',
  1979,
  'Wycombe Air Park',
  'Wycombe Air Park',
  'EGTB',
  5500,
  '1/12',
  'johnebooth@mac.com',
  220,
  170,
  'Lycoming engine, rebuilt March 2020.',
  'March 2020',
  765,
  E'A 1/12 share is available in this 1979 Piper Archer PA28-181 based at Wycombe Air Park (EGTB).\n\nThe aircraft is operated by a professionally run 12-member group and is described by the seller as being in excellent condition and exceptionally well maintained. It is always hangared, maintained by an on-airfield maintenance organisation and benefits from an updated Garmin navigation and communications package.',
  '[
    {"value": "1/12", "label": "Equity share", "icon": "ownership"},
    {"value": "£220", "label": "Per month", "icon": "calendar"},
    {"value": "£170", "label": "Per hour wet", "icon": "clock"},
    {"value": "~765 h", "label": "Engine", "icon": "gauge"}
  ]'::jsonb,
  '[
    {"label": "Airframe hours", "value": "8,734"},
    {"label": "Propeller", "value": "1,999 hours, recently refurbished"},
    {"label": "Last annual", "value": "April 2026"},
    {"label": "Interior", "value": "Leather interior, refurbished May 2012"},
    {"label": "Avionics", "value": "Garmin GMA340 audio/comms panel, Garmin GNC430 (COM1/NAV1/GPS), Garmin GNC255A (COM2/NAV2), Garmin GTX325 Mode S transponder, DME, ADF"},
    {"label": "Additional equipment", "value": "Twin digital fuel gauges, 2 passenger headsets, 4 lifejackets, 4-person life raft, PLB, aircraft cover"}
  ]'::jsonb,
  'Aircraft & equipment',
  '[
    "Professionally run group of 12 members",
    "Online booking system",
    "Availability described by the seller as excellent — typically only 7–8 members fly regularly, with mid-week availability especially good",
    "Monthly charge covers landing fees and hangarage — no landing charges at Booker"
  ]'::jsonb,
  '[
    "Minimum 100 hours total P1 + P/UT to join the group"
  ]'::jsonb,
  '[
    {"src": "/images/listings/piper-archer-pa28-181-share/01-exterior-hangar.jpg", "alt": "The Piper Archer outside its hangar at Wycombe Air Park", "order": 1}
  ]'::jsonb
);
