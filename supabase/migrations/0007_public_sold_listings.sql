-- Sold listings become public marketplace proof: getListings() (homepage,
-- /aircraft, /shares, sitemap) now selects both 'active' and 'sold' rows
-- via the anon client (see lib/data/listings.ts), so the RLS policy that
-- gates the anon key's access must allow 'sold' through too. 'draft' stays
-- excluded from this policy — a draft is only ever reachable via the admin
-- client on its direct /listings/<slug> URL (see 0002_draft_listings.sql).
drop policy "Public can view active listings" on listings;

create policy "Public can view active or sold listings"
  on listings for select
  using (status in ('active', 'sold'));
