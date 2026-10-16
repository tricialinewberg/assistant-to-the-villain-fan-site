# Motion design and validation

## Goal

The interface should feel like an original premium dark-fantasy office archive — magical, witty and interactive — without sacrificing functional UX or fidelity to the authored layouts.

## Specific effects to build

- **Welcome:** atmospheric tiny star motion, a subtle parallax-free vignette/forest edge and an elegant entry reveal. Purple Enter the realm CTA gets brief lilac-and-gold star reaction on click, without delaying navigation.
- **Home:** section reveals for route cards, themed icon highlights (book / characters / potion / author), subtle castle stone lighting. Do not animate essential copy continuously.
- **History:** book panels reveal as they enter, book cover lifts on hover but stays fully visible; links gain a gold underline/shine. Keep image fitting exactly as reference.
- **Characters:** stagger portrait-card unveil, highlighted gold picture frames, swipeable carousel with buttons and pagination; 3 visible at desktop, responsive on mobile.
- **Quizzes:** lilac sheets with subtle rotation and layered shadows; lift on hover/focus/tap (touch action should not require a second tap). Kingsley's frog art gets small reaction only on intentional interaction.
- **Hiring intro:** slow atmospheric forest effect behind content (use authored texture) and note slip animation that never obscures CTA.
- **Question:** selected option gets visibly stronger gold/crimson state, short stamped-approval magic burst, accurate progress bar transition, page/filing transition to next question.
- **Results:** original personnel-file reveal, but copy/scoring require approval; do not invent canonical results.

## Inclusive interactions

- Desktop hover/focus plus **click effects**; mobile taps trigger comparable sparkles, never a fake mouse wand following the finger. Accessible focus and activation state.
- Mouse cursor flourish is optional; must preserve native fallback, text selection and form interactions.
- Always honor `prefers-reduced-motion`, autoplay prevention, nonblocking navigation and WCAG AA text contrast.
- Motion should not hijack scrolling, trap keyboard, cause flashing, block text or severely reduce mobile frame rate.

## Engineering validation

- `npm run typecheck`, `npm run build`, relevant unit tests.
- Playwright navigation and direct deep-link refresh; quiz choices, progress, previous/next, restart and results; link destination tests.
- axe audits, correct heading landmarks, descriptive button/link names, focus states and announcers for quiz progress where useful.
- Screenshot comparisons at source desktop frame dimensions, plus 320/375/390/768/1024/1440/1920px; verify no overflow.
- Reduced-motion tests and touch emulation; verify single-tap navigation and no lost user progress.
- Explicit list of any screenshot fidelity differences due to missing approved assets, unavailable fonts or unapproved content.

## Delivery

Implement first as a running preview connected to the **new** repository, then iterate visually with Trícia's design references until approved. Vercel is the intended deployment; configure but don't report deployment until the user publishes.
