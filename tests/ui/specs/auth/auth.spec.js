import { test, expect } from "../../fixtures/homePageInit.fixture.js";
import { HomePage } from "../../pages/HomePage.js";

test.describe("Authentication Tests", () => {
    let homePage;
    let signupLoginPage;
    // const user = generateUser();

    test.beforeEach(async ({ mainPage }) => {
        homePage = new HomePage(mainPage);
        signupLoginPage = await homePage.goToSignupLoginPage();
    });
    test("Test Case 1: Register User", async ({ testUser }) => {
        await expect(signupLoginPage.signupForm.signupHeader).toBeVisible();

        await signupLoginPage.registerUser(testUser);
        await expect(signupLoginPage.loginForm.loggedInText).toBeVisible();

        await signupLoginPage.logout();
        await expect(homePage.loginAndSignupLink).toBeVisible();
    });

    test("Test Case 2: Login User with incorrect email and password", async ({
        testUser,
    }) => {
        await expect(signupLoginPage.loginForm.loginHeader).toBeVisible();

        const invalidUser = { ...testUser, email: "wrong" + testUser.email };
        await signupLoginPage.loginUser(invalidUser);
        await expect(
            signupLoginPage.loginForm.incorrectLoginText
        ).toBeVisible();
    });

    test("Test Case 3: User can login and logout successfully", async ({
        testUser,
    }) => {
        await test.step("Login page is visible", async () => {
            await expect(signupLoginPage.loginForm.loginHeader).toBeVisible();
        });

        await test.step("User logs in with valid credentials", async () => {
            await signupLoginPage.loginUser(testUser);
            await expect(signupLoginPage.loginForm.loggedInText).toBeVisible();
        });

        await test.step("User logs out successfully", async () => {
            await signupLoginPage.logout();
            await expect(homePage.loginAndSignupLink).toBeVisible();
        });
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
