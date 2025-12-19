import { test } from "@playwright/test";
import { TestCasesPage } from "../../pages/index.js";

test.beforeEach(async ({ page }) => {
    await homePageIsVisible(page);
});
test.describe("Test Cases Page Tests", () => {
    test("Test Case 1: Verify Test Cases Page", async ({ page }) => {
        const testCasesPage = new TestCasesPage(page);

        await testCasesPage.goToTestCasesPage();
    });
});
