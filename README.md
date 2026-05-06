# Personal minisite on Eleventy

A minimal personal website inspired by the provided references: profile block, locale switch, global settings, projects, posts, anonymous message form, footer links, and an unlock flow for private data.

## Quick start

```bash
npm install
npm run demo
```

Open the local URL printed in the terminal. Demo access code:

```txt
demo
```

## What is included

- Eleventy 3 site with Markdown posts
- Minimal black and white responsive UI
- Locale buttons for ENG, RUS, FRA, DEU
- Theme toggle and capitalized text toggle
- Public and private profile variants
- Blurred sensitive details with access code dialog
- Encrypted private payload using Web Crypto in the browser
- Tags that control homepage placement
- GitHub Pages workflow

## Edit public profile data

Public profile data lives in `src/_data/profile.json`. Edit public avatar path, greeting, name, status, and masked detail strings there.

## Edit private profile data

Copy the example file:

```bash
cp src/_private/profile.private.example.json src/_private/profile.private.json
```

Then set the access code and run the site:

```bash
export PRIVATE_ACCESS_CODE=your-access-code
npm run dev
```

Windows PowerShell:

```powershell
$env:PRIVATE_ACCESS_CODE="your-access-code"
npm run dev
```

Private files in `src/_private` are ignored by Git by default. They are encrypted into `src/assets/js/private-payload.js` during the build.

## Write public posts

Public posts live in `src/posts/`.

```md
---
title: My public note
date: 2026-01-01
excerpt: Short description for the homepage row.
---

Post content in Markdown.
```

A public project is just a Markdown post with the `project` tag:

```md
---
title: Project Name
subtitle: Subtitle
date: 2026-01-01
tags:
  - post
  - project
---

Project page content in Markdown.
```

## Write private posts

Private posts live in `src/_private/posts/`.

```md
---
title: Private project
subtitle: Hidden project card
date: 2026-01-01
tags:
  - private
  - project
---

This appears in Projects after unlock.
```

Private posts are rendered in the private reader dialog after successful unlock.

## Anonymous message form

Static GitHub Pages cannot receive form submissions by itself. Add a form backend such as Formspree, Basin, Formspark, or a small serverless endpoint, then set `formEndpoint` in `src/_data/site.json`.

Without an endpoint, the form copies the message locally and shows a note.

## Deploy to GitHub Pages

1. Create a GitHub repository.
2. Push this project to the `main` branch.
3. In GitHub, open Settings > Pages.
4. Set Source to GitHub Actions.
5. Push again or run the workflow manually.

The included workflow builds `_site` and deploys it as a Pages artifact.

For a public repository, do not commit raw files from `src/_private`. You can build locally and deploy `_site`, or force-add only the encrypted payload:

```bash
git add -f src/assets/js/private-payload.js
git commit -m "Add encrypted private payload"
```

The build script keeps an existing encrypted payload when no raw private files are present.

## Security note

This is a static site. Private values are encrypted before publishing and decrypted in the browser with the access code. That is much safer than hiding text with CSS, but it is still best for low-risk personal content. Do not use it for high-stakes secrets.

If you need stronger access control, use a backend with real authentication and authorization.

## Commands

```bash
npm run demo     # preview with demo private content, code demo
npm run dev      # preview using your real private files and PRIVATE_ACCESS_CODE
npm run build    # build into _site
npm run clean    # remove build output and generated private payload
```
