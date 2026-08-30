-- Flexible, per-listing structured facts. Different listings usefully
-- highlight different things (ownership fraction, monthly/hourly cost,
-- engine hours, horsepower, cruise speed, IR capability, ...) — these
-- columns let a listing say what it actually has instead of every listing
-- being forced into the same fixed set of fields.
--
-- Existing rows (e.g. G-AVSF) leave these NULL. The shared components fall
-- back to deriving equivalent output from the older dedicated columns, so
-- nothing changes for listings created before this migration — see
-- components/HighlightCards.tsx and components/InsuranceSection.tsx.

-- Highlight/fact cards near the top of the listing. Each item:
-- {"value": "1/7", "label": "Equity share", "icon": "ownership"}.
-- See lib/types/database.ts (HighlightIconKey) for the fixed set of icons.
alter table listings add column highlights jsonb;

-- Scannable bullet-point version of the pilot/insurance requirements
-- section. Preferred over the single `insurance_info` paragraph when
-- present. Each item is one requirement, e.g.
-- "Minimum 100 hours SEP required for insurance purposes".
alter table listings add column insurance_points jsonb;

-- Avionics/equipment spec rows shown in their own section. Each item:
-- {"label": "Engine", "value": "Lycoming 200hp fuel injection"}.
alter table listings add column equipment jsonb;
