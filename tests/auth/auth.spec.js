import { test } from "@playwright/test";
import { homePageIsVisible } from "../../utils/home.js";
import {
  AuthNavigation,
  LoginForm,
  SignupForm,
  HomePage,
} from "../../pages/index.js";

import { validUser, invalidUser } from "../../data/users.js";

test.beforeEach(async ({ page }) => {
  await homePageIsVisible(page);
});

test.describe("Authentication Tests", () => {
  test("Test Case 1: Register User", async ({ page }) => {
    const authNav = new AuthNavigation(page);
    const signupForm = new SignupForm(page);
    const loginForm = new LoginForm(page);
    const homePage = new HomePage(page);

    await authNav.goToAuth();
    await signupForm.expectSignupPageVisible();
    await signupForm.signupWithFullForm(validUser);
    await loginForm.expectUserLoggedIn();
    await homePage.logout();
  });

  test("Test Case 2: Login User with incorrect email and password", async ({
    page,
  }) => {
    const authNav = new AuthNavigation(page);
    const loginForm = new LoginForm(page);

    await authNav.goToAuth();
    await loginForm.expectLoginPageVisible();
    await loginForm.login(invalidUser.email, invalidUser.password);
    await loginForm.expectLoginErrorVisible();
  });

  test("Test Case 3: Login User with correct email and password", async ({
    page,
  }) => {
    const authNav = new AuthNavigation(page);
    const loginForm = new LoginForm(page);
    const homePage = new HomePage(page);

    await authNav.goToAuth();
    await loginForm.expectLoginPageVisible();
    await loginForm.login(validUser.email, validUser.password);
    await loginForm.expectUserLoggedIn();
    await homePage.logout();
  });

  test("Test Case 4: Logout User", async ({ page }) => {
    const authNav = new AuthNavigation(page);
    const loginForm = new LoginForm(page);
    const homePage = new HomePage(page);

    await authNav.goToAuth();
    await loginForm.expectLoginPageVisible();
    await loginForm.login(validUser.email, validUser.password);
    await loginForm.expectUserLoggedIn();
    await homePage.logout();
    await loginForm.expectLoginPageVisible();
  });

  test("Test Case 5: Register User with existing email", async ({ page }) => {
    const authNav = new AuthNavigation(page);
    const signupForm = new SignupForm(page);

    await authNav.goToAuth();
    await signupForm.expectSignupPageVisible();
    await signupForm.signupBasicInfo(validUser);
    await signupForm.expectExistingEmailError();
  });
});
