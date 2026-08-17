-- Aircraft marketplace: listings, enquiries, seller leads.
create type listing_type as enum ('whole', 'share');
create type listing_status as enum ('draft', 'active', 'sold');

create table listings (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  listing_type listing_type not null,
  status listing_status not null default 'draft',
  manufacturer text not null,
  model text not null,
  year integer,
  registration text,
  location text not null,
  airport_name text,
  airport_code text,
  price integer not null,
  share_fraction text,
  monthly_cost integer,
  hourly_cost integer,
  engine_summary text,
  engine_rebuilt_date text,
  engine_hours_since_rebuild numeric,
  insured_hull_value integer,
  description text,
  group_facts jsonb not null default '[]'::jsonb,
  insurance_info text,
  images jsonb not null default '[]'::jsonb,
  created_at timestamptz not null default now(),
  published_at timestamptz
);

create table enquiries (
  id uuid primary key default gen_random_uuid(),
  listing_id uuid not null references listings(id),
  name text not null,
  email text not null,
  phone text,
  message text not null,
  referrer text,
  utm_source text,
  utm_medium text,
  utm_campaign text,
  created_at timestamptz not null default now()
);

create table seller_leads (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  aircraft_type text not null,
  listing_type listing_type not null,
  asking_price text,
  location text,
  message text,
  created_at timestamptz not null default now()
);

-- Public (anon key) can read active listings only. Writes to listings happen
-- via the Supabase dashboard/SQL for now — no admin UI in the MVP.
alter table listings enable row level security;
create policy "Public can view active listings"
  on listings for select
  using (status = 'active');

-- enquiries / seller_leads have no public policies at all: reads and writes
-- only happen server-side via the service-role key, which bypasses RLS.
alter table enquiries enable row level security;
alter table seller_leads enable row level security;
