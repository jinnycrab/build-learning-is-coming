<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

- Keep the pending CMS schema contract in `src/lib/cms-client.ts`, reusing the generated Supabase connection; this allows CMS code to compile before migration without editing generated types or changing database access.
- Preview drafts travel through an ephemeral same-origin BroadcastChannel to an owner-gated preview page and authenticated iframe; never persist draft previews or apply them to the editor's shared content objects.
