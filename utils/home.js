import { expect } from "@playwright/test";

export async function homePageIsVisible(page) {
  await page.goto("/");
  await expect(page.locator("header")).toBeVisible();
  await expect(page.locator("section#slider")).toBeVisible();
  await expect(page).toHaveURL(/www\.automationexercise\.com/);
}
