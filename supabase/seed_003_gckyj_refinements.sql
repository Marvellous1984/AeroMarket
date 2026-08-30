-- Refinement pass on the G-CKYJ draft (still draft — see
-- supabase/seed_002_gckyj.sql for the original insert and
-- supabase/migrations/0003_flexible_listing_facts.sql for the new columns
-- this relies on):
--
--  * Stronger intro copy, plus a plain-English note that the share price is
--    set by the individual member selling (still no invented price).
--  * Four data-driven highlight cards (equity share, horsepower, cruise
--    speed, IR capable) instead of the single "1/7 Ownership" card.
--  * Pilot/insurance requirements as a scannable checklist instead of one
--    paragraph (insurance_info cleared since insurance_points now takes
--    over — see components/InsuranceSection.tsx).
--  * Avionics/equipment spec rows for the new Avionics & equipment section.
--
-- All facts still come directly from "G-CKYJ Shares.docx" — nothing new is
-- invented, no price is added.
update listings set
  description = E'A 1/7 equity share is available in G-CKYJ, a Piper PA-28-200RT based at Blackbushe Airport.\n\nG-CKYJ is operated by a small group and is IR equipped, well maintained and described by the group as being in good condition throughout. Powered by a 200hp fuel-injected Lycoming engine, the aircraft cruises at approximately 120 knots.\n\nShare price is determined by the individual member selling. Please enquire for current availability and pricing.',
  insurance_info = null,
  insurance_points = '[
    "Minimum 100 hours SEP required for insurance purposes",
    "Pilots not far short of 100 hours are still encouraged to get in touch",
    "Complex-aircraft experience is required, or appropriate training and sign-off with an instructor",
    "Pilots with previous complex experience need at least 5 hours on the PA-28RT type",
    "Pilots without PA-28RT time can complete the required 5 hours in G-CKYJ under supervision"
  ]'::jsonb,
  highlights = '[
    {"value": "1/7", "label": "Equity share", "icon": "ownership"},
    {"value": "200 hp", "label": "Fuel-injected Lycoming", "icon": "bolt"},
    {"value": "~120 kt", "label": "Cruise", "icon": "gauge"},
    {"value": "IR", "label": "Equipped", "icon": "cloud"}
  ]'::jsonb,
  equipment = '[
    {"label": "Engine", "value": "Lycoming 200hp fuel injection"},
    {"label": "Propeller", "value": "McCauley"},
    {"label": "Avionics", "value": "Garmin GNS530, Bendix/King KNS80, Bendix/King RT 73 T30, Garmin GI106B"},
    {"label": "IR capable", "value": "Yes"}
  ]'::jsonb
where slug = 'piper-pa28-200rt-share';
