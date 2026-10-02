-- Listing #008: G-JAKM, a Cirrus SR22 G2 GTS share at Newcastle Airport
-- (EGNT). Created as a draft — see supabase/migrations/0002_draft_listings.sql
-- for how draft listings behave, and supabase/seed_015_gbsla.sql for the same
-- workflow.
--
-- Seller: Ian. Facts taken solely from Ian's own confirmed figures, as
-- relayed directly for this listing — not from any other advert or source.
--
-- YEAR IS DELIBERATELY OMITTED. There is conflicting information: the
-- seller's current advertising describes G-JAKM as a 2006 Cirrus SR22 G2,
-- while separate historical information identifies it as 2005. Rather than
-- guess, `year` is left NULL and neither figure appears anywhere in this
-- file. Needs Ian to confirm before this goes live.
--
-- engine_summary/engine_rebuilt_date/engine_hours_since_rebuild are
-- deliberately left NULL (same reasoning as seed_009_gcicg.sql for G-CICG's
-- new engine/propeller): Ian confirmed a new engine and new propeller only —
-- no hours, no installation date, no rebuilder/manufacturer wording was
-- supplied, and engine_rebuilt_date would trigger EngineSection's
-- "Factory-rebuilt engine" heading, which isn't supported by what Ian gave
-- us. The new-engine/new-propeller fact is carried in the description and
-- specs table as plain, unembellished statements instead.
--
-- PROPELLER/PHOTO NOTE: Ian confirmed the new propeller was fitted *after*
-- the seven supplied photographs were taken — the propeller visible in every
-- exterior photo (hero, front three-quarter, and the underside detail shot,
-- which also shows the old propeller's dataplate) is the old one, not the
-- currently fitted propeller. A factual clarification sentence is included
-- in the description for this reason. No photo caption claims the visible
-- propeller is the new one, and the old dataplate's visible manufacturer
-- name is not repeated as a spec (we only have confirmed facts for the new
-- propeller: that it's new, nothing else).
--
-- Pilot requirement is "100 hours P1 OR existing Cirrus experience" (not an
-- absolute 100-hour minimum for every pilot) plus IMC/IR(R), plus 5 hours
-- training for anyone without prior Cirrus time — stored as insurance_info
-- using Ian's own group-requirements framing verbatim, not insurance_points,
-- so the "these are group requirements, not a blanket minimum" framing
-- isn't lost by splitting it into a flat checklist.
--
-- No email address was supplied (only a phone number, which per the
-- existing enquiry model is not stored/displayed), so contact_email is left
-- NULL and enquiries route through the shared marketplace inbox
-- (ENQUIRY_TO_EMAIL) once this goes live — same fallback as seed_009_gcicg.sql
-- and seed_015_gbsla.sql. Enquiries are disabled regardless while status is
-- 'draft' (see components/EnquiryForm.tsx).
--
-- No booking system, group reserves, insurance excess, CAPS repack, ARC/
-- annual expiry date, airframe/engine/propeller hours, useful load, fuel
-- capacity, cruise speed, range, or TKS details were supplied — all
-- deliberately omitted rather than guessed or inferred from the photos.
--
-- Photos: seven original photos supplied directly by Ian via WhatsApp, all
-- confirmed as G-JAKM. Resized to a 1600px-long-edge cap (mozjpeg q84,
-- metadata stripped) — all seven were already exactly 1600px on the long
-- edge, so only re-encoding was needed. Gallery order and hero follow Ian's
-- supplied photo-by-photo instructions: full side profile as hero, cockpit
-- early, then front/propeller exterior, rear cabin, avionics close-up,
-- registration detail, and the airframe/underside detail shot last.
--
-- To publish: update this row's status to 'active' and set published_at,
-- e.g.:
--   update listings set status = 'active', published_at = now()
--   where slug = 'cirrus-sr22-g2-gts-share';
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
  monthly_cost,
  hourly_cost,
  description,
  highlights,
  specs,
  specs_title,
  equipment,
  insurance_info,
  images
) values (
  'cirrus-sr22-g2-gts-share',
  'share',
  'draft',
  'Cirrus',
  'SR22 G2 GTS',
  'G-JAKM',
  'Newcastle Airport',
  'Newcastle Airport',
  'EGNT',
  65000,
  '1/4',
  300,
  90,
  E'A 1/4 equity share is available in G-JAKM, a Cirrus SR22 G2 GTS based at Newcastle Airport.\n\nThe aircraft is always hangared and has recently come out of annual, with a new engine and new propeller fitted. A new propeller has been fitted since these photographs were taken. The cockpit features an Avidyne Entegra glass cockpit, dual Garmin GTN650 units and an Avidyne DFC90 autopilot.\n\nThe group operates with approximately £300 per month in fixed costs, with flying at approximately £90 per hour dry.',
  '[
    {"value": "1/4", "label": "Equity share", "icon": "ownership"},
    {"value": "£300", "label": "Approx. per month", "icon": "calendar"},
    {"value": "£90/hr", "label": "Approx. dry", "icon": "clock"},
    {"value": "New", "label": "Engine & propeller", "icon": "bolt"}
  ]'::jsonb,
  '[
    {"label": "Hangarage", "value": "Always hangared"},
    {"label": "Annual", "value": "Recently out of annual"},
    {"label": "Engine", "value": "New"},
    {"label": "Propeller", "value": "New"}
  ]'::jsonb,
  'Aircraft',
  '[
    {"label": "Glass cockpit", "value": "Avidyne Entegra"},
    {"label": "GPS/Nav", "value": "Dual Garmin GTN650"},
    {"label": "Autopilot", "value": "Avidyne DFC90"}
  ]'::jsonb,
  'Group requirements are a minimum of 100 hours P1 or existing Cirrus experience, together with a minimum IMC Rating / IR(R). Pilots without previous Cirrus experience will require a minimum of five hours training.',
  '[
    {"src": "/images/listings/cirrus-sr22-g2-gts-share/01-exterior-side-profile-hangar.jpg", "alt": "G-JAKM, a Cirrus SR22 G2 GTS, side profile in front of the hangar at Newcastle Airport", "order": 1},
    {"src": "/images/listings/cirrus-sr22-g2-gts-share/02-cockpit-instrument-panel.jpg", "alt": "G-JAKM cockpit, showing the Avidyne Entegra glass cockpit and flight controls", "order": 2},
    {"src": "/images/listings/cirrus-sr22-g2-gts-share/03-front-exterior-propeller.jpg", "alt": "G-JAKM front three-quarter exterior view showing the nose, propeller and wing", "order": 3},
    {"src": "/images/listings/cirrus-sr22-g2-gts-share/04-rear-cabin.jpg", "alt": "G-JAKM rear cabin seating", "order": 4},
    {"src": "/images/listings/cirrus-sr22-g2-gts-share/05-avionics-close-up.jpg", "alt": "G-JAKM avionics stack close-up, showing the dual Garmin GTN650 units and Avidyne DFC90 autopilot controls", "order": 5},
    {"src": "/images/listings/cirrus-sr22-g2-gts-share/06-registration-detail.jpg", "alt": "G-JAKM registration detail on the fuselage", "order": 6},
    {"src": "/images/listings/cirrus-sr22-g2-gts-share/07-airframe-underside-detail.jpg", "alt": "G-JAKM airframe underside detail", "order": 7}
  ]'::jsonb
);
