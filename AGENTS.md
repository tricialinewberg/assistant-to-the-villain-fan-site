# Codex repository instructions — Assistant to the Villain

## NON-NEGOTIABLE

You are implementing **Trícia Linewberg's authored UI design**. DO NOT REDESIGN IT, invent a new style, or generate a visually similar template. Treat supplied reference desktop screenshots in `reference/screens/`, plus `reference/boards/`, as **visual source of truth**. Typography, artwork, positioning, sizes, spacing, backgrounds, borders, colors, content hierarchy and card composition matter. Desktop must be compared screenshot-by-screenshot at matching frame widths. Build semantic HTML components, NEVER render entire screenshots as the interface.

Read all of `docs/DESIGN_SYSTEM.md`, `docs/SCREENS_AND_FLOWS.md`, `docs/ASSETS.md`, `docs/QUIZ_CONTENT.md` and `docs/MOTION_AND_QA.md` before implementation. Do not silently deviate from references; report missing assets or ambiguities and seek approval before introducing major visual changes.

## Platform

Use **mobile-first** React + TypeScript + Vite with maintainable accessible CSS and coherent components. The source images are desktop mockups; implement responsive behavior from 320px, 375px, 390px, 768px, 1024px, 1280px, 1440px and 1920px, without mobile screenshots being labeled as "exact match." Use Vercel-compatible routing and refreshing. No required backend.

## Navigation and functionality

Welcome -> Home -> The History / Characters / Quizzes / The Author, with fully functional nav, link destinations, accessible character carousel and quiz interactions. Preserve exact visible user copy where readable. Real purchase links only when verified; select locale/marketplace carefully. Do not fabricate books, quotes, character facts, dates, illustrations or product availability.

Hiring quiz: 18-question engine with answer selection, previous/next, retained state, progress, results and restart. **Only Q07 content is approved in the provided references; do NOT invent approved Q01–Q06 or Q08–Q18 content or scoring/results.** Clearly identify incomplete content and isolate placeholders, so the UI can be implemented without misleading users.

Other three quizzes have concept art only; no fabricated finished quiz experience. Links should not be dead: show clearly labeled coming-soon views if content is unapproved.

## Design tokens

Use **actual board specifications** from `docs/DESIGN_SYSTEM.md`: Onyx #0D0B12, Deep Void #16111F, Castle Wall #1F1730, Shadow Keep #2C2148, Villain's Cloak #6030B0, Lilac Mist #9B72CF, Spell Light #C9ABF0, Ghost Bloom #EDE0FC, Villain's Gold #C9A84C and others. Display: **Cinzel**; body: **Inter or Lato** per board, pending exact font asset confirmation. Honor 4/8/12px radius and 4/8/12–16/24/32–48 spacing.

## Assets / legal

The board is a graphic *reference*, not evidence of separately licensed production-quality images. Do not hotlink/randomly replace missing illustrations. Track every source and permission. Include an always-readable unofficial fan-project disclaimer. Do not reproduce extended copyrighted book text or official artwork without approved sourcing.

## Motion

Create a rich but usable magical experience: subtle castle fog, gold/lilac light, meaningful paper lifts and seals, Kingsley frog accents, character reveals, answer selection effects, scroll reveals and responsive click/tap feedback. No disabled scroll or huge heavy effects; keep frame rate, keyboard/focus, `prefers-reduced-motion`, mobile touch and performance robust.

## Required QA

Run `npm run build`, typecheck, tests, Playwright mobile and desktop functional flows, axe audits, and screenshot comparisons. Document open deviations from supplied Figma/mockups with actual evidence. Do not claim pixel-perfect desktop fidelity or Vercel deployment without verification.

## Safe change scope

This repository is separate from `tricia-linewberg-portfolio`; do not modify that repository or deploy on behalf of the user until the website is reviewable. The developer can prepare the Vercel config; the user controls connection and first publish.
