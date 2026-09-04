-- G-ATEF (draft): seller update — Blackbushe/EGLK landing fee is now £18,
-- not £15 as originally supplied. Also adds two new photos supplied
-- directly by the seller.
--
-- Of the three files supplied this round, "G-ATEF pic1.jpg" is the same
-- shot already in the gallery as 01-in-flight.jpg (identical 900x566
-- framing — this one just carries EXIF/camera metadata the PDF-extracted
-- copy didn't), so it's skipped rather than duplicated. The other two are
-- genuinely new (different sizes, framing, and backgrounds) and are added
-- as 03/04.
--
-- Still draft — no status/published_at change. Same permanent URL
-- throughout (cessna-150e-share).
update listings set
  specs = '[
    {"label": "Monthly standing order", "value": "£90"},
    {"label": "Flying (wet)", "value": "£84/hr, brakes off to brakes on"},
    {"label": "EGLK landing fee", "value": "£18"}
  ]'::jsonb,
  images = '[
    {"src": "/images/listings/cessna-150e-share/01-in-flight.jpg", "alt": "G-ATEF, a Cessna 150E, in flight", "order": 1},
    {"src": "/images/listings/cessna-150e-share/02-instrument-panel.jpg", "alt": "G-ATEF instrument panel and avionics", "order": 2},
    {"src": "/images/listings/cessna-150e-share/03-in-flight-low-pass.jpg", "alt": "G-ATEF in flight low over the grass airfield, three-quarter front view", "order": 3},
    {"src": "/images/listings/cessna-150e-share/04-in-flight-treeline.jpg", "alt": "G-ATEF in flight over the airfield, three-quarter front view with trees in the background", "order": 4}
  ]'::jsonb
where slug = 'cessna-150e-share';
