import { test, expect } from "../../fixtures/homePageInit.fixture.js";
import { HomePage } from "../../pages";

test.describe("Home Page Tests", () => {
    let homePage;

    test.beforeEach(async ({ mainPage }) => {
        homePage = new HomePage(mainPage);
    });

    test.describe("Scroll Up Functionality", () => {
        test("Verify Scroll Up using Arrow button", async () => {
            await homePage.subscription.scrollToSection();
            await expect(homePage.subscription.footer).toBeVisible();
            await homePage.scrollUpUsingArrowBtn();
            await expect(homePage.header.subtitle).toBeVisible();
        });

        test("Verify Scroll Up without Arrow button", async () => {
            await homePage.subscription.scrollToSection();
            await expect(homePage.subscription.footer).toBeVisible();
            await homePage.scrollUpWithoutArrow();
            await expect(homePage.header.subtitle).toBeVisible();
        });
    });

    test.describe("Subscription Feature", () => {
        test("Verify Subscription on Home Page", async ({ testUser }) => {
            await homePage.subscription.fillEmail(testUser);
            await homePage.subscription.subscribe();
            await expect(homePage.subscription.successMessage).toBeVisible();
        });

        test("Verify Subscription on Cart Page", async ({ testUser }) => {
            const cartPage = await homePage.header.goToCartPage();
            await cartPage.subscription.fillEmail(testUser);
            await cartPage.subscription.subscribe();
            await expect(cartPage.subscription.successMessage).toBeVisible();
        });
    });
});
