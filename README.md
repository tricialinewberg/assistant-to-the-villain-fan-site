# Assistant to the Villain — Fan Website

**An interactive, mobile-first fan website, designed by Trícia Linewberg.**

An original web-design portfolio case inspired by Hannah Nicole Maehrer's *Assistant to the Villain* series. The project brings the designer's **existing** UI to life: an atmospheric welcome, a manor-themed home page, books and author section, character dossiers, and interactive quizzes.

> **Current status:** Design handoff prepared. Website implementation is pending. **Do not treat this repository as a deployed or completed product.**

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
