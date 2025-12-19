export class DeleteAccountPage {
  constructor(page) {
    this.deleteAccountButton = page.locator("[href='/delete_account']");
    this.accountDeletedMessage = page.locator(".title b");
    this.continueButton = page.locator("[data-qa='continue-button']");
  }

  async deleteAccount() {
    await this.deleteAccountButton.click();
    await this.continueButton.click();
  }
}
