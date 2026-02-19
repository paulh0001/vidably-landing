import { test, expect } from "@playwright/test";

test.describe("Vidably Landing Page Visual Regression", () => {
  test("full page screenshot", async ({ page }) => {
    await page.goto("/");
    await page.waitForLoadState("networkidle");
    // Wait for fonts and images to load
    await page.waitForTimeout(1000);
    await expect(page).toHaveScreenshot("full-page.png", {
      fullPage: true,
      maxDiffPixelRatio: 0.01,
    });
  });

  test("header section", async ({ page }) => {
    await page.goto("/");
    await page.waitForLoadState("networkidle");
    const header = page.locator("header");
    await expect(header).toHaveScreenshot("header.png");
  });

  test("hero section", async ({ page }) => {
    await page.goto("/");
    await page.waitForLoadState("networkidle");
    await page.waitForTimeout(500);
    const hero = page.locator("section").first();
    await expect(hero).toHaveScreenshot("hero.png");
  });

  test("footer section", async ({ page }) => {
    await page.goto("/");
    await page.waitForLoadState("networkidle");
    const footer = page.locator("footer");
    await expect(footer).toHaveScreenshot("footer.png");
  });
});
