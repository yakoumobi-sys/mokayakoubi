-- 1% CLUB applications (server-side only)
-- Run this migration on the Supabase project connected to mokayakoubi.vercel.app.
create table if not exists public.club_applications (
  id uuid primary key,
  name text not null,
  email text not null,
  phone text not null,
  city text not null,
  stage text not null,
  business text not null,
  goal text not null,
  contribution text not null,
  instagram text,
  consent_at timestamptz not null,
  consent_version text not null,
  status text not null default 'new' check (status in ('new','reviewing','accepted','declined','waitlist')),
  created_at timestamptz not null default now()
);
create index if not exists club_applications_created_idx on public.club_applications(created_at desc);
create index if not exists club_applications_status_idx on public.club_applications(status);
alter table public.club_applications enable row level security;
-- No public policies are defined. Browser clients cannot read or write.
-- Only the server-side service role can insert and review applications.
