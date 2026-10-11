-- 1% CLUB — separate, insert-only intake table.
-- Anonymous client has INSERT permission ONLY; no SELECT, UPDATE or DELETE.
create table if not exists public.club_applications (
  id uuid primary key,
  name text not null check (char_length(name) between 3 and 100),
  email text not null check (char_length(email) <= 254),
  phone text not null check (char_length(phone) <= 32),
  city text not null check (char_length(city) between 1 and 80),
  stage text not null check (stage in ('Entreprise en activité','Projet lancé / premières ventes','Projet en préparation')),
  business text not null check (char_length(business) between 15 and 1200),
  goal text not null check (char_length(goal) between 15 and 1200),
  contribution text not null check (char_length(contribution) between 15 and 1200),
  instagram text check (instagram is null or char_length(instagram) <= 200),
  consent_at timestamptz not null,
  consent_version text not null check (consent_version = 'club-application-v1'),
  status text not null default 'new' check (status in ('new','reviewing','accepted','declined','waitlist')),
  created_at timestamptz not null default now()
);
create index if not exists club_applications_created_idx on public.club_applications(created_at desc);
create index if not exists club_applications_status_idx on public.club_applications(status);
alter table public.club_applications enable row level security;
revoke all privileges on public.club_applications from anon, authenticated;
grant insert on public.club_applications to anon;
grant all privileges on public.club_applications to service_role;
create policy "allow_public_club_application_only" on public.club_applications
for insert to anon
with check (status = 'new' and consent_version = 'club-application-v1'
  and consent_at >= now() - interval '1 day' and consent_at <= now() + interval '5 minutes');
