# RA Federal Solutions — Website

Government-grade professional services website for RA Federal Solutions (Murrieta, CA).
Distinct navy & gold corporate-elegant identity — separate from the Royalle Affairs brand.

## Stack
Static multi-page site (HTML + CSS + vanilla JS), served/bundled with Vite.

## Run locally
```
npm install
npm run dev      # local dev server
npm run build    # production build → dist/
npm run preview  # preview the production build
```

## Pages
| File | Purpose |
|------|---------|
| `index.html` | Home — hero, credibility bar, services, capability CTA, stats, differentiators |
| `about.html` | Founder story, engineering heritage timeline, mission & values |
| `services.html` | Six service areas with anchored detail sections (#events, #training, #engineering, #pm, #operations) |
| `government-contracting.html` | NAICS/UNSPSC codes, certifications, contract vehicles |
| `capability-statement.html` | On-screen + printable one-page capability statement (Print → Save as PDF) |
| `portfolio.html` | Filterable past-performance grid + testimonials |
| `resources.html` | Blog / insights + newsletter signup |
| `contact.html` | RFQ inquiry form, direct contact, Murrieta map |

## Design system
- **Colors:** Navy `#1F3864` / Deep navy `#152844` / Gold `#C9A84C` / White / Light gray `#F5F6F8`
- **Type:** Playfair Display (headings), Inter (body), IBM Plex Mono (technical labels/codes)
- All tokens live at the top of `css/styles.css` (`:root`).

## Adding real assets
- Drop event/engagement photography into `assets/images/`. Decorative navy placeholders are used wherever photos will go (split sections) — swap the placeholder `<div>` for an `<img>` when images are ready.
- Per client request, no founder headshot is used anywhere on the site.
- Place the downloadable capability statement PDF in `assets/docs/` and point the "Download" buttons at it (currently the on-screen statement page handles print-to-PDF).

## To wire up before launch
- **RFQ form** (`contact.html`, `#rfqForm`) currently simulates submit in `js/main.js`. Connect to a backend / EmailJS / Formspree endpoint.
- **Google Analytics** — add the GA4 snippet to each page `<head>`.
- **Social links** — replace `href="#"` in footers with the real LinkedIn / Instagram URLs.
- **Logo** — text mark "RA" is used; swap for the final logo image when designed.
