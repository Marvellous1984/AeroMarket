-- Publish G-BOJI: draft -> live. No content changes — same permanent URL
-- throughout (piper-arrow-pa28rt-201-share), per
-- supabase/migrations/0002_draft_listings.sql.
update listings set
  status = 'active',
  published_at = now()
where slug = 'piper-arrow-pa28rt-201-share';
