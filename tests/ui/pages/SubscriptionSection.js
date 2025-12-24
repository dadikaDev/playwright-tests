export class SubscriptionSection {
  constructor(page) {
    this.page = page;
  }

  get footer() {
    return this.page.locator("#footer");
  }
  
  get emailInput() {
    return this.page.getByPlaceholder("Your email address");
  }

  get subscribeButton() {
    return this.page.locator("#subscribe");
  }

  get successMessage() {
    return this.page.locator("#success-subscribe");
  }

  async scrollToSection() {
    await this.footer.scrollIntoViewIfNeeded();
  }

  async fillEmail(user) {
    await this.emailInput.fill(user.email);
  }

  async subscribe() {
    await this.subscribeButton.click();
  }
}
