export class AuthNavigation {
  constructor(page) {
    this.page = page;
    this.loginAndSignupButton = page.getByRole("link", { name: /Signup \/ Login/i });
    this.loginLinkInModal = page.locator(".modal-content [href='/login']");
  }

  async goToAuth() {
    await this.loginAndSignupButton.click();
  }

  async openLoginFromModal() {
    await this.loginLinkInModal.click();
  }
}
