# Vincent Kempers — portfolio

A minimal, single-page portfolio built with [Vue 3](https://vuejs.org) and [Vite](https://vite.dev).

## Editing content

All text, links, projects and experience live in **`src/content.js`**. Edit that file — the components render whatever is in it.
Replace `public/avatar.png` to change the profile picture.

## Development

```bash
npm install
npm run dev      # local dev server with hot reload
npm run build    # production build into dist/
npm run preview  # preview the production build
```

## Deploying

**GitHub Pages:** in the repo go to *Settings → Pages → Source* and pick **GitHub Actions**.
Every push to `master` then builds and deploys automatically (`.github/workflows/deploy.yml`).

**Any other host:** run `npm run build` and upload the contents of `dist/`.
Asset paths are relative, so it works at a domain root or in a subfolder.

## Structure

```
src/
  content.js              # ← all site content
  App.vue                 # page layout & sections
  style.css               # colours (light/dark), fonts, base styles
  components/
    SiteSection.vue       # "// title" section wrapper
    LinkRow.vue           # list row used for experience, projects and writing
    ThemeToggle.vue       # light/dark switch (remembers the choice)
```
