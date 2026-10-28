-- Access rules for the "site-media" storage bucket used by the CMS.
-- Apply after creating a PUBLIC bucket named "site-media".
-- Anyone can view images; only CMS admins can upload, replace or delete them.

create policy "CMS: public can view site media"
  on storage.objects for select using (bucket_id = 'site-media');
create policy "CMS: admins can upload site media"
  on storage.objects for insert to authenticated
  with check (bucket_id = 'site-media' and public.has_role(auth.uid(), 'admin'));
create policy "CMS: admins can update site media"
  on storage.objects for update to authenticated
  using (bucket_id = 'site-media' and public.has_role(auth.uid(), 'admin'));
create policy "CMS: admins can delete site media"
  on storage.objects for delete to authenticated
  using (bucket_id = 'site-media' and public.has_role(auth.uid(), 'admin'));
