import { test } from "@playwright/test";
import { homePageIsVisible } from "../../../utils/home.js";
import { HomePage } from "../../../pages/index.js";

test.beforeEach(async ({ page }) => {
  await homePageIsVisible(page);
});

test.describe("Scroll Up Tests", () => {
  test("Test Case 1: Verify Scroll Up using 'Arrow' button and Scroll Down functionality", async ({
    page,
  }) => {
    const homePage = new HomePage(page);

    await homePage.subscription.expectVisible();
    await homePage.scrollUpUsingArrowBtn();
  });

  test("Test Case 2: Verify Scroll Up without 'Arrow' button and Scroll Down functionality", async ({
    page,
  }) => {
    const homePage = new HomePage(page);

    await homePage.subscription.expectVisible();
    await homePage.scrollUpWhithoutArrow();
  });
});
