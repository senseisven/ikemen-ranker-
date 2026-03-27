-- Run in Supabase SQL Editor: stores public listing requests from /submit
-- Inserts are done only via Next.js API (service role), not from the browser anon key.

create table if not exists public.listing_requests (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  category text not null,
  links text,
  reason text not null,
  created_at timestamptz not null default now()
);

comment on table public.listing_requests is 'User-submitted listing requests from the public submit form';

create index if not exists listing_requests_created_at_idx
  on public.listing_requests (created_at desc);

alter table public.listing_requests enable row level security;

-- No policies: anon/authenticated clients cannot read or write.
-- Server routes use SUPABASE_SERVICE_ROLE_KEY and bypass RLS.
