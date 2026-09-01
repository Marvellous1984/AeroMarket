-- Replace the Piper Archer's single low-resolution placeholder photo
-- (cropped from John's Facebook flyer) with four real photos he supplied
-- directly, and publish: draft -> live.
--
-- The registration G-BGVM is now set — it wasn't in the original advert
-- text, but it's clearly legible on the airframe in these new photos
-- (verified by close inspection, not guessed), so it's genuine supplied
-- information rather than an invented fact.
--
-- Same permanent URL throughout (piper-archer-pa28-181-share) — going live
-- only changes `status`/`published_at`, per
-- supabase/migrations/0002_draft_listings.sql.
update listings set
  registration = 'G-BGVM',
  status = 'active',
  published_at = now(),
  images = '[
    {"src": "/images/listings/piper-archer-pa28-181-share/01-front-three-quarter-grass.jpg", "alt": "G-BGVM, three-quarter exterior view on grass", "order": 1},
    {"src": "/images/listings/piper-archer-pa28-181-share/02-front-three-quarter-hangar.jpg", "alt": "G-BGVM outside the hangar", "order": 2},
    {"src": "/images/listings/piper-archer-pa28-181-share/03-nose-engine-propeller.jpg", "alt": "Nose-on view in the hangar showing the engine cowling and propeller", "order": 3},
    {"src": "/images/listings/piper-archer-pa28-181-share/04-tail-gear-detail.jpg", "alt": "Tail and main gear detail, showing the Archer II model badge", "order": 4}
  ]'::jsonb
where slug = 'piper-archer-pa28-181-share';
