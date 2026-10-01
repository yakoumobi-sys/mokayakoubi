-- Additive setup for Ton prochain move. Run in the existing Moka project's SQL editor.
-- Does not modify newsletter_subscribers or any existing table.
begin;
create table if not exists public.project_leads (
  id uuid primary key,
  created_at timestamptz not null default now(),
  track text not null check (track in ('marque','equipe','studio')),
  name text not null,
  phone text,
  email text,
  channel text not null check (channel in ('Téléphone','WhatsApp','E-mail')),
  answers jsonb not null default '{}'::jsonb,
  details text not null default '',
  preferred_date date,
  attribution jsonb not null default '{}'::jsonb,
  consent_at timestamptz not null,
  consent_version text not null,
  status text not null default 'new' check (status in ('new','contacted','quoted','won','lost','paused')),
  owner_name text,
  next_action_at timestamptz,
  internal_notes text,
  order_value_da numeric(12,2),
  check (phone is not null or email is not null)
);
create index if not exists project_leads_status_created_idx on public.project_leads(status, created_at desc);
alter table public.project_leads enable row level security;
revoke all on public.project_leads from anon, authenticated;
grant select, insert, update, delete on public.project_leads to service_role;
comment on table public.project_leads is 'Qualified project requests. Server-only writes; staff access through the authorized database dashboard.';
commit;
