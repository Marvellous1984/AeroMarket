-- Ian has confirmed G-JAKM's year as 2006, resolving the 2005/2006
-- discrepancy flagged in seed_019_gjakm.sql. Sets the `year` column and adds
-- a "Year" row to the existing specs block (specs_title 'Aircraft') so it's
-- visible on the page, not just stored. No other fields touched — title/
-- subtitle never render `year` for any listing (see lib/listing.ts), so this
-- doesn't change the page heading.
--
-- Same permanent URL throughout (cirrus-sr22-g2-gts-share).
update listings set
  year = 2006,
  specs = '[
    {"label": "Year", "value": "2006"},
    {"label": "Hangarage", "value": "Always hangared"},
    {"label": "Annual", "value": "Recently out of annual"},
    {"label": "Engine", "value": "New"},
    {"label": "Propeller", "value": "New"}
  ]'::jsonb
where slug = 'cirrus-sr22-g2-gts-share';
