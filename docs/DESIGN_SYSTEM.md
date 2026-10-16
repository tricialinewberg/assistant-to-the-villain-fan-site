# Design System — Rennedawn UI Kit v1.0

**Source:** Designer-supplied `villain_design_system_v2 1.png`. Exact design board takes priority over previously inferred colors.

## Color tokens (board labels)

| Category | Token | Value | Intended role |
|---|---|---|---|
| Background | Onyx | `#0D0B12` | Page background |
| Background | Deep Void | `#16111F` | Card background |
| Background | Castle Wall | `#1F1730` | Elevated surface |
| Background | Shadow Keep | `#2C2148` | Hover / subtle fill |
| Primary purple | Dungeon | `#3B1F72` | Border / dark accent |
| Primary purple | Villain's Cloak | `#6030B0` | Primary CTA |
| Primary purple | Lilac Mist | `#9B72CF` | Secondary text / icon |
| Primary purple | Spell Light | `#C9ABF0` | Heading text on dark |
| Primary purple | Ghost Bloom | `#EDE0FC` | Body text |
| Ancient gold | Tarnished | `#6B4E10` | Border accent |
| Ancient gold | Villain's Gold | `#C9A84C` | Dividers/details |
| Ancient gold | Crown Glow | `#E8C96A` | Highlights/eyebrow |
| Crimson blood | Dark Wound | `#4A0D1C` | Red dark background |
| Crimson blood | Crimson Seal | `#8B1A30` | Danger/dark badge |
| Crimson blood | Rose Warning | `#E07090` | Text on crimson fill |
| Frog green | Deep Moss | `#162E1E` | Green dark background |
| Frog green | Frog's Crown | `#2D5A3D` | Success/nature badge |
| Frog green | Swamp Glow | `#6FBF8A` | Text on green fill |

Check actual source pixels if any transcription here is ambiguous: the screenshot board is the authority.

## Typography

- **Display:** Cinzel serif. Reference specimens: `The Villain's Domain`, `Assistant to the Villain`, `Rennedawn Chronicles`.
- **Body:** Sans serif, specified as **Inter / Lato**. Choose the closest exact typography based on the original exported font definitions when available; do not casually substitute another serif or body family.
- Board type scale: display **32px / Cinzel 600**; heading **22px / Cinzel 400**; subheading **16px / Sans 500**; body **14px / Sans 400, line-height 1.7**; caption **11px / Sans 400, tracking 2px**; eyebrow **9px / Sans 700, tracking 4px**.
- The displayed board type scale is a component token starting point; specific desktop mockups may contain intentionally larger hero headings. Match screenshot pixel measurements.
- Make line wrapping and casing faithful; do not rely on CSS text-transform to invent copy.

## Components

- Buttons: primary solid Villain's Cloak (#6030B0), secondary with purple border, ghost minimal; see board for shape, 8px radius.
- Badges / pills: crimson, green, purple, antique gold, muted/discreet.
- Cards: deep plum surfaces, thin purple borders; various red/yellow/purple top accents according to context.
- Spacing tokens: **4px** tight, **8px** compact, **12–16px** default, **24px** sections, **32–48px** page rhythm.
- Radius: **4px inputs**, **8px buttons**, **12px cards**, **full radius pills**.
- States: active, hover, focus, disabled, error, loading, 404, reveal. Match the companion Visual Elements & UI Copy board.

## Contrast, UX

The board includes WCAG contrast examples, but **verify actual contrast algorithmically**, particularly Lilac Mist on Castle Wall and crimson/green badges. Default to legible Ghost Bloom on dark surfaces for body copy. Preserve visibly different focus and active states without rewriting components.

## Visual Elements companion

The designer supplied `villain_visual_elements.png`, containing:
- 14 icon concepts: Enchanted Dagger, Enchanted Chains, Kingsley's Sign, Stardust Vial, Glass Coffin, Nura's Letter, Stardust Map, Errant Eyeball, Ceiling Decor, Prophecy Book, Poison/Potion, Stained Glass (Massacre Manor), HR Clipboard, Magic Manacles.
- Character art: four expressions of Kingsley, Evie Sage, Trystan Maverine and Becky.
- Textures: Castle Stone and Forest Dark.
- Four published book cover visuals and a portrait of author Hannah Nicole Maehrer.
- UI voice: Buttons (primary/secondary/ghost), badge and pill variants, empty/loading/404/hover/new chapter/result copy.
- Tone spectrum: Epic/Inviting, Corporate/Villain irony, HR office tone, Mystery/Investigation, Playful/Reverent, Dramatic/Anticipation, Dark humor/Villain court, Grounded/Familiar.

Extract transparent image assets **only as provisional crops** if originals are unavailable; they may have screenshot background contamination or too little resolution. Prefer actual authored Figma/PNG/SVG export files.

## Visual implementation

Do not swap the background for generic #1b0f2a. The design intentionally layers very dark Onyx, purple raised surfaces, gold accents and moody brick/forest textures. Respect section-to-section rhythm rather than using one solid flat purple everywhere. Do not include the colored pixel noise surrounding some screenshot canvases.
