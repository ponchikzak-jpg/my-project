-- Revanio · leads table
-- Run this in the Supabase dashboard → SQL Editor → New query → Run.

create table if not exists public.leads (
  id          uuid primary key default gen_random_uuid(),
  name        text not null,
  company     text,
  email       text not null,
  message     text,
  created_at  timestamptz not null default now()
);

create index if not exists leads_created_at_idx on public.leads (created_at desc);

-- Lock the table down. The site talks to Supabase ONLY through the
-- server-side service-role key, which bypasses RLS. With RLS enabled and
-- no policies, anonymous/public keys cannot read or write this table.
alter table public.leads enable row level security;
