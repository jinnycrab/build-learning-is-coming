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
- Preview drafts pass directly from editor state to an inline, authenticated iframe, with ephemeral same-origin BroadcastChannel support for the standalone preview route; never persist drafts or apply them to the editor's shared content objects. Scale the iframe from the actual browser viewport using ResizeObserver so its layout does not collapse to the column width.
- Homepage hero uses discrete breakpoint typography and a two-row desktop grid: headline beside the uncropped natural-ratio photo, introduction beside competition details; smaller screens stack these elements to keep editable CMS content readable without image overlays.
