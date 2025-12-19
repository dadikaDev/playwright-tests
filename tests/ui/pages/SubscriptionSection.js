import { expect } from "@playwright/test";

export class SubscriptionSection {
  constructor(page) {
    this.page = page;
    this.footer = page.locator("#footer");
    this.subscriptionTitle = this.footer.locator("h2");
    this.subscriptionInput = page.getByPlaceholder("Your email address");
    this.subscribeButton = page.locator("#subscribe");
    this.subscriptionSuccessMsg = page.locator("#success-subscribe");
  }

  async expectVisible() {
    await this.footer.scrollIntoViewIfNeeded();
    await expect(this.footer).toBeVisible();
    await expect(this.subscriptionTitle).toBeVisible();
    await expect(this.subscriptionTitle).toContainText("Subscription");
  }

  async subscribe(email) {
    await this.subscriptionInput.fill(email);
    await expect(this.subscriptionSuccessMsg).toBeHidden();
    await this.subscribeButton.click();
    await expect(this.subscriptionSuccessMsg).toBeVisible();
  }
}
