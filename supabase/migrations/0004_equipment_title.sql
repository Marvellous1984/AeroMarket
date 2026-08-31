-- Lets a listing override the equipment section's default heading
-- ("Avionics & equipment") — e.g. a listing combining avionics with general
-- aircraft/airframe facts might title it "Aircraft & equipment" instead.
-- NULL keeps the existing default, so G-AVSF/G-CKYJ are unaffected.
alter table listings add column equipment_title text;
