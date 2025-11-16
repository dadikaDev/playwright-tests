import { expect } from "@playwright/test";

export class LoginForm {
  constructor(page) {
    this.page = page;
    this.loginHeader = page.locator(".login-form h2");
    this.loginEmailInput = page.locator("[data-qa='login-email']");
    this.passwordInput = page.locator("[data-qa='login-password']");
    this.loginButton = page.locator("[data-qa='login-button']");
    this.loggedInText = page.locator("li:has-text('Logged in as')");
    this.incorrectLoginText = page.locator("[action='/login'] p");
  }

  async login(email, password) {
    await this.loginEmailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }

  async expectUserLoggedIn() {
    await expect(this.loggedInText).toBeVisible();
  }

  async expectLoginErrorVisible() {
    await expect(this.incorrectLoginText).toBeVisible();
  }

  async expectLoginPageVisible() {
    await expect(this.loginHeader).toBeVisible();
  }
}
