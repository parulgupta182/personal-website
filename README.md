# personal-website

Personal academic and professional website.

Built with [Astro](https://astro.build) as a fully static site: no database, no backend, no tracking. Fonts are self-hosted (no requests to Google Fonts). All content lives in small JSON/Markdown files, so most updates never touch the layout code.

---

## Quick start

Requires **Node.js 22.23.4 or newer** (see `.nvmrc`).

```bash
npm install        # once
npm run dev        # live preview at http://localhost:4321
npm run build      # production build into dist/
npm run preview    # serve the production build locally
```

---

## Where the content lives

| What | File |
|---|---|
| Name, greeting, tagline, intro, photo, **Quick facts**, profile links (CV, email, GitHub, LinkedIn, ORCID) | `src/data/profile.json` |
| “A bit about me” (personal text on the homepage) | `src/content/about.md` |
| “What I do” (short work summary on the homepage) | `src/content/what-i-do.md` |
| Background text on the Work page | `src/content/work-background.md` |
| Research areas, statistics, related publications/code/project links (Work page) | `src/data/research.json` |
| Professional experience (homepage timeline + Work page details) | `src/data/experience.json` |
| Publications (Work page) | `src/data/publications.json` |
| Education (Work page) | `src/data/education.json` |
| Travel page (countries, places, years, optional photos) | `src/data/travel.json` |
| Hobbies page (plants, reading, photography, …) | `src/data/hobbies.json` |
| Page title, SEO description, navigation, **placeholder switch** | `src/data/site.json` |
| Colours, fonts, spacing | top of `src/styles/global.css` |

### Placeholders

Any empty value (`""` or `[]`) is shown on the site as a dashed, amber **“To add” / “Placeholder”** label, so missing information is easy to spot.

When you are ready to go live, set `"showPlaceholders": false` in `src/data/site.json`. Every remaining placeholder (empty links, example publications, empty education fields, the photo note) is then hidden automatically.

### Site structure

- **Home** (`/`): introduction, Quick facts, A bit about me, What I do (with a compact career timeline), Travel & hobbies cards, contact.
- **Work** (`/work/`): background, research areas, full experience, publications, education.
- **Travel** (`/travel/`) and **Hobbies** (`/hobbies/`).

The menu items are set in `nav` in `src/data/site.json`.

### Quick facts

Edit `quickFacts` in `src/data/profile.json`. Each fact has an `icon` (`scholar`, `plane`, `leaf`, `book`, `code`, `pin`, `mail`) and a `text`. `{currentBook}` fills itself in with the first “Currently reading” book in `hobbies.json`.

### Email (spam-safe)

Your address is stored in `links.emailEncoded` in `profile.json` (reversed and base64-encoded, so it never appears as plain text in the repository either). To change it, run

```bash
python3 -c "import base64,sys;print(base64.b64encode(sys.argv[1][::-1].encode()).decode())" new.address@example.org
```

and paste the output there. The address is never written into the page as plain text: visitors see a **Show email** button, and the address is assembled in their browser only when they click it, so spam bots that scan pages for addresses don't find it.

### Profile links

In `src/data/profile.json`:

```json
"links": {
  "cv": "cv/Parul_Gupta_CV.pdf",
  "emailEncoded": "<see Email section below>",
  "github": "https://github.com/your-username",
  "linkedin": "https://www.linkedin.com/in/your-profile",
  "orcid": "https://orcid.org/0000-0000-0000-0000"
}
```

The email can be given with or without `mailto:`.

### Photo

1. Save a portrait (ideally 4:5, at least 800×1000 px, under ~250 KB) as `public/images/portrait.jpg`.
2. In `src/data/profile.json` set `"photo": "images/portrait.jpg"`.

### CV

Replace `public/cv/Parul_Gupta_CV.pdf` with your CV (same file name). To use another name, update `links.cv` in `profile.json`.

### Publications

Add one object per paper to `src/data/publications.json`, newest first, and delete the two example entries (`"placeholder": true`):

```json
{
  "title": "Paper title",
  "authors": ["Parul Gupta", "Co-Author One", "Co-Author Two"],
  "venue": "Proceedings of …",
  "year": "2026",
  "type": "Conference",
  "status": "",
  "area": "vulnerability-datasets",
  "doi": "10.1145/xxxxxxx",
  "pdf": "papers/my-paper.pdf",
  "code": "https://github.com/…",
  "dataset": "https://zenodo.org/…",
  "bibtex": "@inproceedings{…}"
}
```

- `type` creates the filter buttons (Conference, Journal, Workshop, Preprint, Thesis…). Filters appear only when there are at least two types.
- `status` is an optional badge, e.g. `"Accepted"` or `"Under review"`.
- `area` links the paper to a research area (`vulnerability-datasets`, `architectural-security`, `ai-assisted-security`, `applied-ml`).
- `pdf` can be an external URL or a file you place in `public/papers/`.
- Your name (`highlightAuthor` in `profile.json`) is shown in bold automatically.
- In the BibTeX string, write line breaks as `\n`.

### Research areas

In `src/data/research.json`, each area has a `related` block:

```json
"related": {
  "publications": [{ "label": "Paper short title (Venue 2026)", "url": "https://doi.org/…" }],
  "code": [{ "label": "repo-name", "url": "https://github.com/…" }],
  "project": [{ "label": "DevGPT project page", "url": "https://…" }]
}
```

Only add material that is public and cleared for publication.

### Travel page

Add one entry per country (or trip) to `src/data/travel.json`:

```json
{
  "country": "Portugal",
  "continent": "Europe",
  "places": ["Porto", "Douro Valley", "Aveiro"],
  "year": "2026",
  "bestPart": "One or two sentences about the highlight of the trip.",
  "photos": [
    { "src": "images/travel/porto-river.jpg", "caption": "Sunset over the Douro in Porto" },
    { "src": "images/travel/douro-valley.jpg", "caption": "Vineyards in the Douro Valley" },
    { "src": "images/travel/aveiro.jpg", "caption": "Canals in Aveiro" }
  ]
}
```

- Put the photo files in `public/images/travel/`. Resize them first (about 1600 px on the long side, JPEG, under ~300 KB each) so the page stays fast.
- The first photo is shown large; the card shows up to three, with a “+N” badge if there are more. Clicking any photo opens a viewer with all of them (arrow keys work).
- Captions are optional, but they also serve as the image description for screen readers.
- Entries are grouped by `continent`.
- Delete the example entries (`"placeholder": true`) once you have added your own.

### Hobbies page

Each object in `src/data/hobbies.json` becomes a section on the Hobbies page and a quick link at the top. List items can be plain text (shown as tags), or books:

```json
{ "title": "Currently reading", "items": [{ "title": "Book title", "author": "Author name", "note": "optional comment" }] }
```

A list can also be a short paragraph instead of items: `{ "title": "My goal", "text": "…" }`.

Add a new hobby by copying an existing block and giving it a unique `id`. Links go in `links`: `[{ "label": "…", "url": "https://…" }]`, or a page on this site such as `"travel/"`. `"showCountries": true` lists the countries from `travel.json` automatically (as tags, not a count).

### Social preview image and favicon

- `public/images/og-image.png` (1200×630) is shown when the site is shared on LinkedIn and similar sites.
- `public/favicon.svg`, `public/favicon-32.png`, `public/apple-touch-icon.png` are the browser icons.

---

## Deployment (GitHub Pages)

The workflow in `.github/workflows/deploy.yml` builds and deploys the site on every push to `main`. The correct base path is set automatically, so the site works both at `https://<username>.github.io/personal-website/` and at a custom domain.

One-time setup:

1. Create a new, empty GitHub repository named `personal-website` (no README, so nothing is overwritten).
2. Push this project:
   ```bash
   git remote add origin https://github.com/<username>/personal-website.git
   git branch -M main
   git add -A
   git commit -m "Initial website"
   git push -u origin main
   ```
3. In the repository: **Settings → Pages → Build and deployment → Source: GitHub Actions**.
4. Open the **Actions** tab and wait for “Deploy to GitHub Pages” to finish. The URL is shown in the deploy job.

Afterwards, every change you push to `main` is published automatically within a minute or two.

> Want `https://<username>.github.io/` without the `/personal-website` suffix? Name the repository `<username>.github.io` instead. For a custom domain, add it under Settings → Pages and create `public/CNAME` containing the domain.

---

## Project structure

```
src/
  components/   one file per section (Hero, About, Research, …)
  content/      about.md
  data/         JSON content files
  layouts/      Base.astro – <head>, SEO, Open Graph, theme
  scripts/      main.ts – theme toggle, mobile menu, filters, copy BibTeX
  styles/       global.css
public/         files copied as-is (CV, images, favicon)
```
