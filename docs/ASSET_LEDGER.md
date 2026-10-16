# Asset ledger

All nine supplied reference PNGs have been moved without modification from `public/assets/` into the documented `reference/screens/` and `reference/boards/` directories. They are excluded from the production bundle and never used as full-page UI.

| Assets | Source | Treatment | Production state |
|---|---|---|---|
| Existing 14 icons, three portraits, castle-stone and forest-dark | User-supplied repository assets | Preserved as supplied; textures scale to match the compositions | Original exports/creator permissions not documented |
| Three `*-complete` portraits | Staff reference screen | Complete 139×139 crops replace clipped supplied portrait files | Provisional source crops |
| Four `*-trimmed` home icons and castle-stone-tile | Supplied individual assets | Removed surrounding flat margins to avoid dark halos and tile seams | Same source limitations as originals |
| kingsley-1 through kingsley-4 | Visual Elements board | Small crops from the four supplied expressions | Provisional, low resolution, flattened background |
| book-1 through book-4 | History screenshot | Crops of the designed cover placements | Provisional, low resolution; rights-holder permissions need confirmation |
| author | History screenshot | Crop of the supplied author photograph | Provisional; original photo source/permission needs confirmation |
| Entry skyline | Entry reference geometry | CSS polygon reproducing the simple triangular silhouette | No external artwork |
| Cinzel / Inter | Fontsource packages | Self-hosted font files | SIL Open Font License; package license files retained in dependencies |

`scripts/extract-assets.py` records source coordinates and can reproduce the crops with Pillow. No new AI imagery or unrelated substitute artwork was introduced. Low-resolution crops cannot establish exact fidelity or production-ready licensing. Replace them with authorized exports while preserving the approved framing.

The fifth cover is not invented: its panel explicitly states that the cover and details await confirmation.

Verified 2026-10-16: https://www.hannahnicolemaehrer.com/ redirects to https://hannahnicolemae.com/. Its homepage lists the four books and currently labels Adversary as a preorder. The implementation intentionally avoids asserting the mockup's `AVAILABLE NOW` status and links to the author instead of guessing a user's purchasing marketplace.
