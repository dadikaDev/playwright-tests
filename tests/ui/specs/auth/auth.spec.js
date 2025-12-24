import { test, expect } from "../../fixtures/homePageInit.fixture.js";
import { HomePage } from "../../pages";
import { generateInvalidUser } from "../../data/usersData.js";

test.describe("Authentication Tests", () => {
    let homePage;
    let signupLoginPage;

    test.beforeEach(async ({ mainPage }) => {
        homePage = new HomePage(mainPage);
        signupLoginPage = await homePage.header.goToSignupLoginPage();
    });

    test("Test Case 1: Register User", async ({ testUser }) => {
        await expect(signupLoginPage.signupForm.signupHeader).toBeVisible();

        await signupLoginPage.registerUser(testUser);
        await expect(signupLoginPage.loginForm.loggedInText).toBeVisible();

        await signupLoginPage.header.logout();
        await expect(homePage.header.loginAndSignupLink).toBeVisible();
    });

    test("Test Case 2: Login User with incorrect email and password", async () => {
        await expect(signupLoginPage.loginForm.loginHeader).toBeVisible();

        const invalidUser = generateInvalidUser();
        await signupLoginPage.loginUser(invalidUser);

        await expect(
            signupLoginPage.loginForm.incorrectLoginText
        ).toBeVisible();
    });

    test("Test Case 3: User can login and logout successfully", async ({
        testUser,
    }) => {
        await expect(signupLoginPage.loginForm.loginHeader).toBeVisible();

        await signupLoginPage.loginUser(testUser);
        await expect(signupLoginPage.loginForm.loggedInText).toBeVisible();

        await signupLoginPage.header.logout();
        await expect(homePage.header.loginAndSignupLink).toBeVisible();
    });

    test("Test Case 4: Register User with existing email", async ({
        testUser,
    }) => {
        await expect(signupLoginPage.signupForm.signupHeader).toBeVisible();

        await signupLoginPage.signupForm.signupBasicInfo(testUser);

        await expect(
            signupLoginPage.signupForm.existingEmailMessage
        ).toBeVisible();
    });
});
