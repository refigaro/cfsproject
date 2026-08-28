# Imperial CFS — Frontend handoff

This repository holds the **frontend handoff** for the **Imperial CFS, Inc.** marketing site and customer portal: static HTML, CSS, and client-side scripts that backend developers integrated into the production ASP.NET MVC application. Pages and assets were **updated incrementally on GitHub throughout the project**—this was the living markup and styling reference for the team, not a separate throwaway prototype.

**Sergio Arcíbar** served as **UI designer** and **front-end developer** on this project—owning the interface design and the static build—and shipped this handoff **continuously via GitHub** (commits and pull requests) for backend integration.

## Role in the project

| In this repo                                             | In production                                                             |
| -------------------------------------------------------- | ------------------------------------------------------------------------- |
| Authoritative markup, layout, and styles for each screen | Razor views, partials, and bundles generated or adapted from this handoff |
| Commits and PRs as features evolved                      | Server-side data binding, auth, validation, and APIs                      |
| Full pages you can open locally for review               | Same URLs served by MVC with live data                                    |

## About Imperial CFS

[Imperial CFS, Inc.](https://www.imperialcfs.com) has delivered warehouse and transportation solutions since 1994. The company operates as a premier ocean **Container Freight Station (CFS)** and nationwide **IPI** (Inland Point Intermodal) transportation provider at the Ports of Los Angeles and Long Beach. The site and portal are operated under **Cargovation LLC**.

## What this repo is (and isn’t)

| This repo                                                          | Production app                                                                     |
| ------------------------------------------------------------------ | ---------------------------------------------------------------------------------- |
| **Handoff deliverables:** static `.html` plus shared CSS/JS/images | ASP.NET MVC app with live data, sessions, and security                             |
| Preview by opening files or serving this folder locally            | Real routes such as `/Availability/TerminalStatus`, `/bundles/...`, `/Charges/...` |
| No build step, no `package.json`                                   | Bundled scripts, server rendering, APIs                                            |

Placeholders like `/Availability/Index`, `/bundles/main_jquery`, and `/Home/CustomerLogin` point at the **production** app. They **will not resolve** when you only open this repo in a browser unless that backend is running—that is expected for a static handoff.

## Tech Stack

- **Markup & style:** HTML5, CSS3
- **Scripts:** Vanilla JavaScript, jQuery 3.7 (CDN)
- **UI framework:** [Bootstrap](https://getbootstrap.com/) 5.3.x, [Bootstrap Icons](https://icons.getbootstrap.com/) 1.11
- **Icons:** Font Awesome (kit, CDN)
- **Gallery:** [baguetteBox](https://github.com/feimosi/baguetteBox.js) (`css/baguetteBox.min.css`, `js/baguetteBox.min.js`)
- **Custom fonts:** Sora, Archivo Narrow, DM Serif Display / DM Serif Text — see [`fonts/`](fonts/)
- **Styles:** [`Content/`](Content/) (`css.css`, `custom-styles.css`, `design-system.css`, `extra.css`, `terminal-schedule-print.css`)

## Quick Start

### Option 1 — Open a file directly

Double-click or open any `.html` file in a browser. Most layout and relative links work, but **root-absolute paths** (e.g. `/_images/logo.png`) will fail.

### Option 2 — Local static server (recommended)

From the repository root:

```bash
# Python
python3 -m http.server 8080

# Node (npx, no install required)
npx serve .

# VS Code: use the "Live Server" extension on the repo root
```

Then open:

- [http://localhost:8080/home.html](http://localhost:8080/home.html) — marketing home
- [http://localhost:8080/availability.html](http://localhost:8080/availability.html) — portal availability search

Serve from the **repo root** so paths like `/_images/...` and `/Content/...` resolve correctly.

## Project Structure

```
./
├── *.html                 # Handoff pages (marketing, portal, reports, utility)
├── Content/               # Primary stylesheets and style backups
│   ├── css.css
│   ├── custom-styles.css
│   ├── design-system.css
│   ├── extra.css
│   ├── terminal-schedule-print.css
│   └── availability-backup.html
├── css/                   # Third-party CSS (baguetteBox)
├── js/
│   ├── card.js
│   ├── baguetteBox.min.js
│   └── components/
│       ├── marketing-header.js
│       └── pickup-table.js
├── _images/               # Logos, heroes, icons, milestones
├── fonts/                 # Self-hosted webfonts
├── design-system.css      # Duplicate of Content/design-system.css (root copy)
└── .gitignore             # Excludes WIP / experimental files
```

### HTML pages by area

**Marketing & corporate**

| File                  | Description                           |
| --------------------- | ------------------------------------- |
| `home.html`           | Marketing home / availability landing |
| `about-us.html`       | Company overview                      |
| `our-services.html`   | CFS services                          |
| `inland.html`         | Inland consolidation services         |
| `trucking.html`       | Dedicated trucking                    |
| `technology.html`     | Technology offering                   |
| `security.html`       | Security                              |
| `contact.html`        | Contact & pickup hours                |
| `forms.html`          | Downloadable forms                    |
| `news.html`           | News listing                          |
| `news-post.html`      | Single news article layout            |
| `privacy-policy.html` | Privacy / cookie policy               |
| `terms.html`          | Terms and conditions                  |

**Customer portal & operations**

| File                           | Description                                     |
| ------------------------------ | ----------------------------------------------- |
| `availability.html`            | Master Bill of Lading / availability search     |
| `ipi.html`                     | IPI tracing search                              |
| `search.html`                  | Generic search results                          |
| `search-availability.html`     | Availability search results                     |
| `search-ipi.html`              | IPI search results                              |
| `charges.html`                 | Local pickup estimated charges & PayCargo terms |
| `terminal-schedule.html`       | Terminal gate schedule                          |
| `transit.html`                 | Transit time schedule                           |
| `inland-warehouse.html`        | Inland warehouse list                           |
| `whse-in-out.html`             | Warehouse in / out                              |
| `container-level-release.html` | Container level release                         |
| `mbl.html`                     | MBL-related view                                |
| `payment-confirmation.html`    | Payment success confirmation                    |

**Reports**

| File                                  | Description                   |
| ------------------------------------- | ----------------------------- |
| `reports.html`                        | Container status (portal)     |
| `Reports-Daily_Container_Status.html` | Daily container status report |
| `Reports-IPI_Destination.html`        | IPI destination report        |
| `Reports-InvoiceSearch.html`          | Invoice search report         |
| `Reports-LAX_Inventory_Report.html`   | LAX inventory report          |

**User account**

| File                   | Description             |
| ---------------------- | ----------------------- |
| `user-profile.html`    | My account              |
| `user-management.html` | User management (admin) |

**Utility & templates**

| File             | Description                       |
| ---------------- | --------------------------------- |
| `template.html`  | Base layout reference             |
| `footer.html`    | Footer fragment reference         |
| `email.html`     | Transactional email HTML template |
| `error-404.html` | 404 error page                    |

## Conventions & Gotchas

1. **Root-absolute paths** — Many pages use `/_images/...` and `/Content/...`. Always preview with a static server from the repo root.
2. **CDN dependencies** — Bootstrap, Bootstrap Icons, Font Awesome, jQuery, and Google Fonts are loaded from CDNs in each page. There is no local npm/webpack bundle.
3. **Backend-only URLs** — References to `/bundles/...`, `/Availability/...`, `/Charges/...`, `/Home/...` expect the ASP.NET MVC app. They will 404 locally.
4. **Design system CSS** — `design-system.css` exists at the repo root and under `Content/`. Keep them in sync when editing tokens or variables.
5. **`.gitignore` WIP files** — Do not commit experimental pages listed in [`.gitignore`](.gitignore), including:
   - `ipi2.html`, `Copia de availability.html`
   - `credit-card-validation.html`, `cucc-feature.html`, `cucc-feature3.html`
   - `modal-edit-charges.html`
   - `Content/carousel-current-next-week.html`, `Content/terminal-schedule-mockup.html`, `Content/user-management-logic.html`

## Contributing

This repo was used for **ongoing frontend handoff** via GitHub (branches and PRs). To extend it the same way:

1. Branch from `main`.
2. Edit HTML/CSS/JS as needed.
3. Preview with a local static server (see [Quick Start](#quick-start)).
4. Open a pull request on [refigaro/cfsproject](https://github.com/refigaro/cfsproject).

## License & Ownership

© Cargovation LLC. All rights reserved.

This repository does not include an open-source license. Content, branding, and markup are proprietary to Imperial CFS / Cargovation LLC.
