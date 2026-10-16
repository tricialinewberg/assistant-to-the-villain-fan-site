# Quiz content — approved reference vs implementation data

## Source of truth

The designer's Q07 screenshot is the only supplied full question design. The intro states **18 questions**. Do not assume all 18 are provided or write fan-canon results without approval.

### Approved Q07 wording (transcribe visually from screenshot)

**Question heading:** YOUR EMPLOYER ASKS YOU TO DISPOSE OF EVIDENCE INVOLVING A MINOR INCIDENT WITH THE VALIANT GUARD. YOU:

A. Provide a detailed spreadsheet of all evidence before burning it twice.

B. Accidentally set it on fire while making a fresh pot of tea. Efficiency.

C. Bribe the guards with high-quality baked goods and a threatening look.

D. Hide it in the basement. The dragon needs a new hobby.

Selected example: **C**. Caption: **"Interesting choice. – K"**. Header state: **Q07**, **ASSESSMENT IN PROGRESS**; 18 total; **NEXT QUESTION** and **PREVIOUS** controls, result locked during quiz.

**Progress discrepancy to flag:** screenshot shows 37.5% at Q07 while 7/18 is ~38.9%. Do not hard-code 37.5% for a real quiz; get approval on whether progress is answered-count versus question index and compute consistently.

## Engine requirements

- Typed question model with ID, prompt, four options and any scoring metadata kept separate from presentation components.
- One selected option per question; preserve selections when navigating backward.
- Accurate progress and an accessible `progressbar`/meter with screen-reader label.
- Keyboard navigation and reliable focus after next/previous.
- Result locked until criteria met; clear restart; no contradictory states.
- Responsive motion for question change and answer selection, including crimson/gold highlights.
- Persist within current session if useful, never store personal data or demand sign-in.
- Quizzes are entertainment, not an assessment of actual suitability for employment.

## Awaiting design/copy approval

- Q01–Q06, Q08–Q18 exact copy and answer options.
- Scoring methodology and mapping to outcomes; full results copy and result-screen art.
- Remaining three quizzes: prompts, questions, scoring and result copy.
- Asterisk footnote / alternative text nuances visible in screenshots.

To show a complete development demo, write **explicitly marked sample content** under a separate file and banner (development mode), never imply the designer has approved it. Better to ask designer for quiz script and create a high-fidelity Q07 prototype with reusable logic and an honest in-progress state.
