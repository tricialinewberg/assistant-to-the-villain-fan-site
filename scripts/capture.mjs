import { chromium } from "playwright";
import { mkdir } from "node:fs/promises";
const out = process.env.SCREENSHOT_DIR || "qa/screenshots";
await mkdir(out, { recursive: true });
const browser = await chromium.launch({ channel: process.platform === 'win32' ? 'msedge' : undefined });
const screens = [
  ["01-entry", "/", 1280, 1024],
  ["02-home", "/home", 1240, 2048],
  ["03-history-books-author", "/history", 713, 2048],
  ["04-characters", "/characters", 1280, 1274],
  ["05-quizzes-overview", "/quizzes", 1120, 2048],
  ["06-quiz-introduction", "/quizzes/hiring", 1280, 1144],
  ["07-quiz-question", "/quizzes/hiring/assessment?question=7", 1280, 1667],
];
for (const [name, route, width, height] of screens) {
  const page = await browser.newPage({
    viewport: { width, height },
    reducedMotion: "reduce",
  });
  await page.goto(`http://127.0.0.1:5173${route}`);
  await page.evaluate(() => document.fonts.ready);
  if (name === "07-quiz-question")
    await page.getByRole("radio", { name: /C Bribe/ }).check();
  await page.screenshot({ path: `${out}/${name}-desktop.png`, fullPage: true });
  await page.setViewportSize({ width: 390, height: 844 });
  await page.screenshot({ path: `${out}/${name}-mobile.png`, fullPage: true });
  await page.close();
}
await browser.close();
