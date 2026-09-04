-- Publish G-ATEF: draft -> live. No content changes — same permanent URL
-- throughout (cessna-150e-share), per
-- supabase/migrations/0002_draft_listings.sql.
update listings set
  status = 'active',
  published_at = now()
where slug = 'cessna-150e-share';
