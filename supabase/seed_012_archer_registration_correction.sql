-- Correct the Piper Archer's registration: seed_007_piper_archer_photos_publish.sql
-- read it off the photos as G-BGVM ("verified by close inspection"), but
-- that was a V/W misread — the seller has confirmed it's actually G-BGWM.
-- Re-checking 02-front-three-quarter-hangar.jpg against this correction
-- confirms G-BGWM is the better reading.
--
-- Also fixes the two image alt texts that repeated the wrong registration.
-- Same permanent URL throughout (piper-archer-pa28-181-share) — this only
-- touches registration/images, per supabase/migrations/0002_draft_listings.sql.
update listings set
  registration = 'G-BGWM',
  images = '[
    {"src": "/images/listings/piper-archer-pa28-181-share/01-front-three-quarter-grass.jpg", "alt": "G-BGWM, three-quarter exterior view on grass", "order": 1},
    {"src": "/images/listings/piper-archer-pa28-181-share/02-front-three-quarter-hangar.jpg", "alt": "G-BGWM outside the hangar", "order": 2},
    {"src": "/images/listings/piper-archer-pa28-181-share/03-nose-engine-propeller.jpg", "alt": "Nose-on view in the hangar showing the engine cowling and propeller", "order": 3},
    {"src": "/images/listings/piper-archer-pa28-181-share/04-tail-gear-detail.jpg", "alt": "Tail and main gear detail, showing the Archer II model badge", "order": 4}
  ]'::jsonb
where slug = 'piper-archer-pa28-181-share';
