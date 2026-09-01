-- A second, independent labelled fact block alongside `equipment` — some
-- listings genuinely need two distinct titled spec sections (e.g.
-- "Aircraft & hours" and "Avionics & equipment") rather than one combined
-- section. Same shape and rendering as `equipment`
-- (see components/EquipmentSection.tsx), just a separate slot.
-- NULL for every existing row — G-AVSF, G-CKYJ, and the Archer are
-- unaffected and keep using `equipment` alone.
alter table listings add column specs jsonb;
alter table listings add column specs_title text;
