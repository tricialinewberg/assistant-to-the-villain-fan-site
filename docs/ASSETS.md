# Assets & source checklist

## References (not production backgrounds)

Seven designer PNGs:
`01-entry.png`, `02-home.png`, `03-history-books-author.png`, `04-characters.png`, `05-quizzes-overview.png`, `06-quiz-introduction.png`, `07-quiz-question.png` belong in `reference/screens/`.

The two boards belong in `reference/boards/design-system.png` and `reference/boards/visual-elements.png`.

These references originated as uploaded screenshot files named `Body.png`, `Home (3).png`, `The History- books me.png`, `characteres.png`, `Quizzes (1).png`, `Start.png`, `quizzez 1.png`, `villain_design_system_v2 1.png` and `villain_visual_elements.png`. They were reindexed in the design handoff bundle.

## Production assets from the designer

1. Castle stone wall texture, forest-dark scene, original castle skyline/spires and star elements.
2. Individual character portraits: Evie Sage, Trystan Maverine, Becky.
3. Four Kingsley expressions (use actual provided frog art).
4. Four official book covers (separate from UI design, obtain appropriate licensed/approved usage or a retailer-hosted official embed).
5. Hannah Nicole Maehrer author photograph: confirm permitted use and source attribution.
6. Separate icon illustrations from Visual Elements board: dagger, chains, sign, potion, coffin, letter, map, eyeball, skull, prophecy book, stained glass, HR clipboard, manacles.
7. Sticky notes, letter card overlays, badge elements if authored as images rather than CSS.

**Priority:** Ask for original Figma export pack (PNG/WebP/SVG) and font info. Cropping low-resolution screenshots is permitted as a temporary working approximation only. Record source, resolution, transparency and production-approval state. Do not disguise screenshot crops as original hi-res illustrations.

## Rules

- Images inside `reference/` are for visual QA only; never use one complete screenshot as the working UI.
- Place approved app artwork in `public/assets/` with predictable lowercase kebab-case filenames.
- Never treat a made-up fifth book cover, release date or product URL as confirmed.
- Avoid hotlinking unauthorized images from social posts, fan pages or unknown image aggregators.
- Do not bundle copyrighted commercial font binaries unless properly licensed.
- Use proper `alt` on informative illustrations; decorative texture should be background CSS and omitted from accessibility tree.
- Asset replacements must retain crop, positioning and framing defined in Figma.

## Blocking for exact fidelity

Even with both boards supplied, the originals are flattened image composites. Pixel-perfect reproduction of distinct character drawings, book 3D covers and author photo requires *the actual individual artwork files*. Do not tell the designer this problem was solved merely by adding CSS.
