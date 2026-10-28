-- Build Learning CMS
-- Site text, lists and brand settings are stored as one JSON document per
-- section in site_content. Anything not saved here falls back to the defaults
-- in src/content/site.ts, so the site works before anything is edited.

-- ── Roles ────────────────────────────────────────────────────────────────
create type public.app_role as enum ('admin');

create table public.user_roles (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  role public.app_role not null,
  created_at timestamptz not null default now(),
  unique (user_id, role)
);
alter table public.user_roles enable row level security;

create or replace function public.has_role(_user_id uuid, _role public.app_role)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (select 1 from public.user_roles where user_id = _user_id and role = _role)
$$;

create policy "Users can read their own roles"
  on public.user_roles for select to authenticated
  using (user_id = auth.uid() or public.has_role(auth.uid(), 'admin'));

-- The very first signed-in user can make themselves admin. After that,
-- only existing admins can add more (see grant_admin_by_email).
create or replace function public.claim_first_admin()
returns boolean
language plpgsql
security definer
set search_path = public
as $$
begin
  if auth.uid() is null then return false; end if;
  perform pg_advisory_xact_lock(hashtext('claim_first_admin'));
  if exists (select 1 from public.user_roles where role = 'admin') then return false; end if;
  insert into public.user_roles (user_id, role) values (auth.uid(), 'admin');
  return true;
end;
$$;

create or replace function public.grant_admin_by_email(_email text)
returns text
language plpgsql
security definer
set search_path = public
as $$
declare _uid uuid;
begin
  if not public.has_role(auth.uid(), 'admin') then raise exception 'Only admins can add admins'; end if;
  select id into _uid from auth.users where lower(email) = lower(trim(_email));
  if _uid is null then return 'not_found'; end if;
  insert into public.user_roles (user_id, role) values (_uid, 'admin') on conflict do nothing;
  return 'ok';
end;
$$;

create or replace function public.list_admins()
returns table (user_id uuid, email text, created_at timestamptz)
language sql
stable
security definer
set search_path = public
as $$
  select r.user_id, u.email::text, r.created_at
  from public.user_roles r join auth.users u on u.id = r.user_id
  where r.role = 'admin' and public.has_role(auth.uid(), 'admin')
  order by r.created_at
$$;

create or replace function public.revoke_admin(_user_id uuid)
returns void
language plpgsql
security definer
set search_path = public
as $$
begin
  if not public.has_role(auth.uid(), 'admin') then raise exception 'Only admins can remove admins'; end if;
  if _user_id = auth.uid() then raise exception 'You cannot remove yourself'; end if;
  delete from public.user_roles where user_id = _user_id and role = 'admin';
end;
$$;

revoke execute on function public.claim_first_admin() from public, anon;
revoke execute on function public.grant_admin_by_email(text) from public, anon;
revoke execute on function public.list_admins() from public, anon;
revoke execute on function public.revoke_admin(uuid) from public, anon;
grant execute on function public.claim_first_admin() to authenticated;
grant execute on function public.grant_admin_by_email(text) to authenticated;
grant execute on function public.list_admins() to authenticated;
grant execute on function public.revoke_admin(uuid) to authenticated;

-- ── Content ──────────────────────────────────────────────────────────────
create table public.site_content (
  key text primary key,
  data jsonb not null,
  updated_at timestamptz not null default now(),
  updated_by uuid references auth.users (id) on delete set null
);
alter table public.site_content enable row level security;

create policy "Anyone can read site content"
  on public.site_content for select to anon, authenticated using (true);
create policy "Admins can insert site content"
  on public.site_content for insert to authenticated with check (public.has_role(auth.uid(), 'admin'));
create policy "Admins can update site content"
  on public.site_content for update to authenticated
  using (public.has_role(auth.uid(), 'admin')) with check (public.has_role(auth.uid(), 'admin'));
create policy "Admins can delete site content"
  on public.site_content for delete to authenticated using (public.has_role(auth.uid(), 'admin'));

-- Every save keeps the previous version, so changes can be undone.
create table public.site_content_history (
  id bigint generated always as identity primary key,
  key text not null,
  data jsonb,
  saved_at timestamptz not null default now(),
  saved_by uuid
);
alter table public.site_content_history enable row level security;
create policy "Admins can read history"
  on public.site_content_history for select to authenticated using (public.has_role(auth.uid(), 'admin'));

create or replace function public.site_content_keep_history()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  if tg_op = 'INSERT' then
    new.updated_at := now();
    new.updated_by := auth.uid();
    return new;
  end if;
  insert into public.site_content_history (key, data, saved_by) values (old.key, old.data, auth.uid());
  if tg_op = 'DELETE' then return old; end if;
  new.updated_at := now();
  new.updated_by := auth.uid();
  return new;
end;
$$;

create trigger site_content_history_trg
  before insert or update or delete on public.site_content
  for each row execute function public.site_content_keep_history();

-- ── Media storage ────────────────────────────────────────────────────────
insert into storage.buckets (id, name, public)
values ('site-media', 'site-media', true)
on conflict (id) do nothing;

create policy "Public can view site media"
  on storage.objects for select using (bucket_id = 'site-media');
create policy "Admins can upload site media"
  on storage.objects for insert to authenticated
  with check (bucket_id = 'site-media' and public.has_role(auth.uid(), 'admin'));
create policy "Admins can update site media"
  on storage.objects for update to authenticated
  using (bucket_id = 'site-media' and public.has_role(auth.uid(), 'admin'));
create policy "Admins can delete site media"
  on storage.objects for delete to authenticated
  using (bucket_id = 'site-media' and public.has_role(auth.uid(), 'admin'));
