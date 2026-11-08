# motif-dotnet.github.io

Motif.NET's home page, at <https://motif-dotnet.github.io/>: every Motif tool, with a line about it and a way in, and the ideas still to come. It's the "Motif.NET" link in every tool's switcher, and the organisation's website link.

It's one static page, served by GitHub Pages from `main`, with no build step:

| File | What it is |
|---|---|
| [index.html](index.html) | The page, including the list of tools and ideas |
| [css/site.css](css/site.css) | What's specific to this page: it scrolls, where the tools fill the window |
| [js/site.js](js/site.js) | The theme menu, sharing `motif-theme` in `localStorage` with the tools |
| `css/motif.css`, `fonts/` | The look every Motif tool shares, copied from the [Motif web kit](https://github.com/motif-dotnet/.github/tree/main/brand/web). Don't edit them here |

## Adding a tool

A new tool goes in two lists: `Tools.All` in the kit's [Suite/Tools.cs](https://github.com/motif-dotnet/.github/blob/main/brand/web/Suite/Tools.cs), for the tools' switchers, and the Tools section of [index.html](index.html), which also shows its status. Keep the tool's line the same in both, and move it out of "Coming later" if it was there.

## The kit

`bash scripts/sync-suite.sh` copies the kit's stylesheet and fonts in (`--from ../path/to/.github` for a local clone). [.github/workflows/suite.yml](.github/workflows/suite.yml) runs it with `--check` on every push and weekly, and goes red when this copy has drifted.

To try the page locally, serve the folder with any static server, for example `npx http-server -c-1`.
