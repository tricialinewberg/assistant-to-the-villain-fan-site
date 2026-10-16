import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
const routes = [
  "/",
  "/home",
  "/history",
  "/characters",
  "/quizzes",
  "/quizzes/hiring",
  "/quizzes/hiring/assessment?question=7",
];
test("navigation, direct links, carousel keyboard, and coming-soon destinations", async ({
  page,
}) => {
  await page.goto("/");
  await page.getByRole("link", { name: "Enter the realm" }).click();
  await expect(page).toHaveURL(/home/);
  await page
    .getByRole("link", { name: "Characters", exact: true })
    .first()
    .click();
  const carousel = page.getByRole("region", { name: "Staff personnel files" });
  await carousel.focus();
  await page.keyboard.press("ArrowRight");
  await expect(
    page.getByRole("heading", { name: "Kingsley", exact: true }),
  ).toBeVisible();
  await page.getByRole("button", { name: "Show Evie Sage" }).click();
  await expect(
    page.getByRole("heading", { name: "Evie Sage", exact: true }),
  ).toBeVisible();
  await page.goto("/quizzes/power");
  await page.reload();
  await expect(
    page.getByRole("heading", { name: "What power would you have?" }),
  ).toBeVisible();
  await page.goto("/history#author");
  await expect(page.locator("#author")).toBeInViewport();
});
test("quiz selection, previous/next, session restore, honest progress and restart", async ({
  page,
}) => {
  await page.goto("/quizzes/hiring/assessment?question=7");
  await page.locator('label').filter({hasText:'Bribe the guards'}).click();
  await expect(page.getByRole("progressbar")).toHaveAttribute(
    "value",
    String(100 / 18),
  );
  await page.getByRole("button", { name: "NEXT QUESTION" }).click();
  await expect(page.getByRole("heading", { name: /Question 8/ })).toBeFocused();
  await page.getByRole("button", { name: "PREVIOUS" }).click();
  await expect(page.getByRole("radio", { name: /C Bribe/ })).toBeChecked();
  await page.reload();
  await expect(page.getByRole("radio", { name: /C Bribe/ })).toBeChecked();
  await page.getByRole("link", { name: "Review saved answers" }).click();
  await expect(
    page.getByRole("button", { name: /REVEAL MY FATE/ }),
  ).toBeDisabled();
  await page.getByRole("button", { name: "Restart assessment" }).click();
  await expect(
    page.getByRole("heading", { name: /Question 1 —/ }),
  ).toBeVisible();
  await expect(page.getByRole("progressbar")).toHaveAttribute("value", "0");
});
test("all required widths and routes have no horizontal overflow or broken images", async ({
  page,
}) => {
  for (const width of [320, 375, 390, 768, 1024, 1280, 1440, 1920]) {
    await page.setViewportSize({ width, height: 900 });
    for (const route of routes) {
      await page.goto(route);
      await page.evaluate(() => document.fonts.ready);
      expect(
        await page.evaluate(
          () => document.documentElement.scrollWidth <= innerWidth,
        ),
        `${width}: ${route}`,
      ).toBe(true);
      expect(
        await page
          .locator("img")
          .evaluateAll((images) =>
            images.every(
              (img) =>
                (img as HTMLImageElement).complete &&
                (img as HTMLImageElement).naturalWidth > 0,
            ),
          ),
        route,
      ).toBe(true);
    }
  }
});
test("WCAG AA axe audits of every screen", async ({ page }) => {
  for (const route of [
    ...routes,
    "/quizzes/hiring/review",
    "/quizzes/power",
    "/credits",
  ]) {
    await page.goto(route);
    await page.evaluate(() => Promise.all(document.getAnimations().filter(a => a.effect?.getTiming().iterations !== Infinity).map(a => a.finished)));
    const result = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
      .analyze();
    expect(
      result.violations,
      `${route}: ${JSON.stringify(result.violations.map((v) => ({ id: v.id, nodes: v.nodes.map((n) => n.target) })))}`,
    ).toEqual([]);
  }
});
test("mobile single-tap navigation, swipe, and reduced motion", async ({
  browser,
}) => {
  const context = await browser.newContext({
    viewport: { width: 390, height: 844 },
    hasTouch: true,
    isMobile: true,
    reducedMotion: "reduce",
  });
  const page = await context.newPage();
  await page.goto("http://127.0.0.1:5173/home");
  await page.getByRole("button", { name: /Menu/ }).tap();
  await page
    .getByRole("navigation")
    .getByRole("link", { name: "Characters" })
    .tap();
  await expect(
    page.getByRole("heading", { name: "Evie Sage", exact: true }),
  ).toBeVisible();
  const carousel = page.locator(".carousel");
  await carousel.scrollIntoViewIfNeeded();
  const bounds = await carousel.boundingBox();
  if (!bounds) throw new Error('Carousel must have visible bounds');
  const touch = await context.newCDPSession(page);
  const y = Math.max(1, bounds.y + 80);
  await touch.send('Input.dispatchTouchEvent', {type:'touchStart',touchPoints:[{x:300,y}]});
  await touch.send('Input.dispatchTouchEvent', {type:'touchMove',touchPoints:[{x:90,y}]});
  await touch.send('Input.dispatchTouchEvent', {type:'touchEnd',touchPoints:[]});
  await expect(
    page.getByRole("heading", { name: "Trystan Maverine", exact: true }),
  ).toBeVisible();
  expect(
    await page
      .locator(".staff-card")
      .evaluate((el) => getComputedStyle(el).animationName),
  ).toBe("none");
  await page.goto("http://127.0.0.1:5173/");
  expect(
    await page
      .locator(".stars i")
      .first()
      .evaluate((el) => getComputedStyle(el).animationName),
  ).toBe("none");
  await context.close();
});
