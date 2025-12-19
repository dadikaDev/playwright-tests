import { test } from "@playwright/test";
import { homePageIsVisible } from "../../../utils/home.js";
import { HomePage, CartPage } from "../../../../pages/index.js";
import { validUser } from "../../../data/users.js";

test.beforeEach(async ({ page }) => {
    await homePageIsVisible(page);
});

test.describe("Subscription Feature Tests", () => {
    test("Test Case 1: Verify Subscription in home page", async ({ page }) => {
        const homePage = new HomePage(page);

        await homePage.subscription.expectVisible();
        await homePage.subscription.subscribe(validUser.email);
    });

    test("Test Case 2: Verify Subscription in Cart page", async ({ page }) => {
        const cartPage = new CartPage(page);

        await cartPage.goToCartPage();
        await cartPage.subscription.expectVisible();
        await cartPage.subscription.subscribe(validUser.email);
    });
});
