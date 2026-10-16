# Desktop Screens, Structure & Navigation

**Nine visual references total:** seven authored site screenshots plus two design-reference boards. Once uploaded, place them under `reference/screens/` and `reference/boards/`. Treat every reference as a specification, not a site image asset.

## Required seven screens

| Order | Upload filename | Screen to implement |
|---|---|---|
| 01 | `01-entry.png` | Welcome / Enter the realm. Full viewport dark night scene, stars, large Cinzel typography, purple CTA, pointed castle silhouettes. |
| 02 | `02-home.png` | Main Home. Branding/navigation; YOU'RE HIRED. TRY NOT TO DIE.; purple brick background; four routes; quotation; quiz CTA. |
| 03 | `03-history-books-author.png` | The History; library/book entries; author section. |
| 04 | `04-characters.png` | MEET THE STAFF, Evie / Trystan / Becky cards, carousel dots and supporting text. |
| 05 | `05-quizzes-overview.png` | DISCOVER YOUR FATE: four slightly rotated lilac paper quiz invitations, Kingsley badges and a handwritten-looking note. |
| 06 | `06-quiz-introduction.png` | Would you be hired by the Villain? Intro, 18 questions/~3 min, whimsical note, foggy forest scene, crimson CTA. |
| 07 | `07-quiz-question.png` | Q07/18, assessment protocol/progress, single-select A-D options, progress UI, previous/next, locked result preview. |

Board files:
- `reference/boards/design-system.png` from `villain_design_system_v2 1.png`
- `reference/boards/visual-elements.png` from `villain_visual_elements.png`

## Design and route contract

- Welcome screen is a separate real route or state (`/`) with a functional **Enter the realm** CTA.
- Home is real content (`/home`) and nav routes for The History (`/history`), Characters (`/characters`), Quizzes (`/quizzes`) and The Author (book page anchor or route).
- Quiz overview includes 4 designed paper cards. Link #1 opens hiring intro (`/quizzes/hiring`), then Q01–Q18 with stateful progression; other quizzes remain transparently labeled in-progress until their question data is approved.
- Quiz result screen is required but **its finished visual frame and rules are not supplied**. Extend the existing archive/personnel-file art direction and request final copy + scoring signoff.
- Use real document structure and interactive HTML; never use screenshots as full-page backdrops or click-map interfaces.
- All routes must load on direct URL, browser refresh and deployment on Vercel.

## Content fidelity

Reproduce on-screen copy when readable from the designer's PNG, including dark-humor captions, CTA labels and legal footer. Do not change case conventions, labels or visual hierarchy without reason. Book and character copy not legible at screenshot scale is **unverified**, not an invitation to invent lore. The original frames are desktop designs, not mobile assets.

Keep the unofficial fan-project legal disclaimer clearly visible.

## Responsive adaptation

Mobile-first from **320px**. Preserve hierarchy, spacing scale, palette and interface density while reflowing wide desktop sections. At desktop target screenshot dimensions compare rendered page against reference at the same width/height. Screenshots are approximately 1280–1394px wide except the full-history 753px screenshot; these dimensions are *image exports*, not guaranteed Figma frame sizes — derive frame width from each reference carefully.

For mobile: navigation uses accessible hamburger or justified equivalent; section cards stack; library details remain readable; carousel supports touch swipe and buttons; paper rotations stay subtle enough to avoid clipping. Never use a "miniature desktop image" solution.

## Art direction cues

- Page entry as theater introduction, castle spires (original artwork), subtle stars.
- Home route cards with bespoke fantasy-office icons and color-coded accent borders.
- Story book panels have cover on left and structured copy on right on desktop.
- Character avatars framed in gold; all text aligned and card heights balanced.
- Paper-stack quizzes use lilac sheets and accent-colored edges/badges.
- Hiring quiz has a darker contained assessment interface, a bright gold NEXT QUESTION CTA, obvious selected answer, and accurate progress.

## Fidelity signoff

Desktop screenshots must be actively compared to source via image comparison or well-documented pixel checks. If an original Figma asset is missing, disclose the resulting discrepancy; never claim exact/pixel-perfect while using improvised artwork.
