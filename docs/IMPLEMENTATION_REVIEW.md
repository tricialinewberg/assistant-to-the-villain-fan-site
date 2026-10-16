# Implementation and visual review

This is a review implementation, not a claim of pixel-perfect fidelity or a deployed product.

## Design evidence

All seven screens and both boards were inspected before implementation. Original reference files are preserved byte-for-byte in `reference/`. Interactive HTML, React components, and authored mobile-first CSS recreate the layouts; no full reference screenshot is used as a page.

Desktop comparisons were made against the actual images, excluding the decorative noisy export borders. The welcome is 1280×1024. The manor screens use their approximately 1280px content frame, home approximately 1240px, and quizzes approximately 1120px. The history export is unusually narrow (753px including margins); the readable desktop adaptation is compared proportionally at 1280px, rather than claiming its export width is an approved tablet design.

| Screen | Compared and adjusted | Remaining differences |
|---|---|---|
| Welcome | Overlapping four-line heading, large title, star field, CTA, geometric skyline | Star positions differ; body text and disclaimer are more readable; button white adjusted for contrast |
| Home | Brick material, hero, two-column route cards, quote, hiring panel | Source texture is a small crop; short quiz availability label replaces misleading finished-content metadata |
| History | Cover/text columns, five placements, accent dividers, author section | Descriptions shortened to avoid extended book passages; fifth cover explicitly unrevealed; availability not fabricated; low-resolution covers/photo |
| Characters | Three desktop cards, gold-framed portraits, dots, staff note | Added accessible previous/next controls; completed portrait crops replace supplied clipped images; brighter body copy; Kingsley copy pending |
| Quizzes | Staggered rotated lilac papers, colored edges, supplied frog expressions, note | Three links clearly say coming soon; source frogs are low resolution; handwritten note font depends on available system face |
| Hiring intro | Forest, crimson border/button, lilac note, facts row | Added honest content-preview notice and Q07 shortcut; forest is a low-resolution source crop |
| Q07 | Gold heading, crimson progress, plum card, A–D selection, gold next control, locked result | Progress uses answered count (1/18 = 5.6%), not the reference's inconsistent 37.5%; content notice and review link added |

## Content and assets still awaiting approval

- Q01–Q06 and Q08–Q18, all scoring and final outcome copy/art.
- Other three quiz scripts and results.
- High-resolution individual artwork, photo/book-cover sourcing and permissions, exact font-export confirmation.
- Final desktop visual signoff and responsive adaptation review.

Source file `src/quiz.ts` isolates typed approved/pending content from presentation. No production placeholder answer content or result scoring is invented. Unit-test fixtures only exercise future completion behavior.

## Validation record

- Local `npm run build`, `npm run typecheck`, and quiz unit tests pass.
- In-app browser exercised carousel keyboard input, mobile menu navigation, Q07 answer selection, next/previous, reload restoration, locked review, and restart clearing progress.
- Browser harness covers 320, 375, 390, 768, 1024, 1280, 1440, and 1920px across ten routes. Final results are recorded with delivery evidence.
- axe WCAG A/AA audits run at 390 and 1280px. Contrast corrections preserve the source palette.
- Local standalone Playwright worker launch is blocked by Windows `spawn EPERM`. The checked-in GitHub Actions workflow runs the full suite on Linux, including actual touch emulation and reduced-motion media emulation. Its result is reported separately; the local limitation is not represented as a passing test.
- Synthetic touch-swipe and reduced-motion CSS rule checks supplement the in-app audit; these do not replace physical-device testing.

No portfolio repository was modified. Vercel was not connected or deployed.
