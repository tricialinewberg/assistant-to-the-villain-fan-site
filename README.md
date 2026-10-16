# Assistant to the Villain — Fan Website

**An interactive, mobile-first fan website, designed by Trícia Linewberg.**

An original web-design portfolio case inspired by Hannah Nicole Maehrer's *Assistant to the Villain* series. The project brings the designer's **existing** UI to life: an atmospheric welcome, a manor-themed home page, books and author section, character dossiers, and interactive quizzes.

> **Current status:** React implementation available for visual review. Not deployed. Quiz questions other than Q07, scoring, original artwork exports, and visual signoff remain pending.

## Run locally

Use Node.js 24 (minimum 22.18 for native TypeScript configuration loading).

```sh
npm ci
npm run dev
npm run typecheck
npm test
npm run build
npx playwright install chromium
npm run test:e2e
```

Open `http://127.0.0.1:5173`. Windows Playwright uses installed Microsoft Edge; other platforms use Playwright Chromium. The build uses Vite 8 with native config loading and preserved symlinks to avoid restricted Windows child-process path probes. No backend, credentials, or external fonts are required.

The GitHub Actions quality workflow runs build, typecheck, unit tests, Playwright keyboard/touch/reduced-motion tests, axe audits, and screenshot capture. It uploads a `manor-visual-review` artifact; it does not deploy anything.

The local-only `/tests/browser-audit.html` harness checks eight widths and ten routes, plus axe at mobile and desktop sizes. It is excluded from the production build. See [visual review and QA](docs/IMPLEMENTATION_REVIEW.md) and [asset ledger](docs/ASSET_LEDGER.md).

## Quiz review

`/quizzes/hiring/assessment?question=7` opens the approved Q07 prototype. The other 17 slots explicitly await copy and cannot be answered. Progress is **valid answers / 18**, so one answer is 5.6%; it never implies that unapproved questions were completed. Answers persist in session storage, with an in-memory fallback. The review screen preserves answers and supports restart; no invented hiring score or outcome is shown.

## Vercel preparation

Framework: Vite. Build: `npm run build`. Output: `dist`. Node: 24. `vercel.json` provides SPA deep-link fallback. The user controls the first publication after visual review.

## Design-first implementation

The authoritative references are **seven supplied desktop screens**, the **Design System** board and the **Visual Elements, Textures & UI Copy** board. These images are being prepared for upload under `reference/`; the repository documentation describes them in detail.

**For Codex:** Read [AGENTS.md](AGENTS.md) first, followed by [Screens and flows](docs/SCREENS_AND_FLOWS.md), [Design system](docs/DESIGN_SYSTEM.md), [Assets](docs/ASSETS.md), [Quiz content](docs/QUIZ_CONTENT.md) and [Motion & QA](docs/MOTION_AND_QA.md). Implement the reference layouts, **not a reinterpretation**.

## Planned experience

- Cinematic **Welcome to Massacre Manor** entry and meaningful Enter the realm CTA.
- Home with route cards for **The History**, **Characters**, **Quizzes** and **The Author**.
- Books, author information and independently verified outbound purchasing/reading links.
- Accessible character carousel with illustration assets from the designer.
- Four quiz entry cards; the hiring quiz includes an 18-question stateful engine, progress, review, results and restart (final quiz scripts/scoring await approval).
- Dark-plum castle textures, crimson accents, lilac typography, gold light, frog-green badges and custom magical motion.
- Responsive layout built mobile-first; full keyboard, touch and reduced-motion support.

## Proposed stack

React, TypeScript, Vite, authored CSS and Playwright; static site, no backend. Deployment target: **Vercel** (not yet deployed).

## Reference source and fidelity

Desktop art direction must closely match the supplied screens at their exact frame dimensions, including composition, typography, card proportions, colors, imagery and spacing. The Design System and Visual Elements boards govern reusable tokens and assets. Screenshots are **comparison references**, never to be embedded as static clickable pages.

No mobile mockups have been supplied: adapt the existing design responsibly from 320px up instead of pretending it has an approved pixel-perfect mobile layout.

Some illustrations, photographs and book covers are currently visible only inside screenshots. Low-resolution crops are temporary and must be replaced with authorized high-quality source exports whenever possible. Keep an asset/source ledger; do not pass off AI-generated or third-party substitutes as user originals.

## Project authorship and disclaimer

**Design and concept:** Trícia Linewberg.

**Unofficial fan project.** Not affiliated with or endorsed by Hannah Nicole Maehrer, the publisher or rights holders. Book covers, author photos and adapted character depictions remain subject to their respective rights. Avoid copying substantial book passages.

## Links

- [Design specification](docs/DESIGN_SYSTEM.md)
- [Screens and navigation](docs/SCREENS_AND_FLOWS.md)
- [Asset inventory and upload checklist](docs/ASSETS.md)
- [Quiz implementation constraints](docs/QUIZ_CONTENT.md)
- [Animation & acceptance criteria](docs/MOTION_AND_QA.md)

## GitHub Pages staging (review site)

After merging the approved implementation, enable **Settings → Pages → Source: GitHub Actions** once, then the `Publish fan site to GitHub Pages` workflow publishes automatically.

Target: **https://tricialinewberg.github.io/assistant-to-the-villain-fan-site/** (only live after successful deployment).

The workflow builds Vite with `VITE_BASE_PATH=/assistant-to-the-villain-fan-site/` and copies `index.html` to `404.html` for SPA route fallback. Deep links render client-side; GitHub Pages may initially answer such paths with HTTP 404 before React loads. Prefer entering via the site root for shareable URLs. Vercel retains its separate root-based build, with no additional environment value needed.

## Original-book outbound links

The four published volumes, the fifth listing and the author have direct Amazon Brazil links supplied by the designer. These are ordinary outbound references, not affiliate links; availability/price is not guaranteed by the site, and the fifth book remains marked as coming soon. No release date or cover for Book V has been invented.

## Theatrical effects

Desktop pointer movement and mobile finger movement produce a light layer of Trystan-inspired gray shadow mist. Deliberate click/tap activation adds a short gold/shadow burst. Kingsley occasionally enters with a note on Home and Quizzes and can be dismissed. Decorative layers never intercept native gestures. All effects respect reduced-motion preferences.
