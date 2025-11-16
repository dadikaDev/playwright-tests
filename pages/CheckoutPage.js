import { expect } from "@playwright/test";

export class CheckoutPage {
  constructor(page) {
    this.page = page;
    this.checkoutBtn = page.locator(".check_out");
    this.addressDetailsTitle = page.locator("h2:has-text('Address Details')");
    this.reviewOrderSection = page.locator("h2:has-text('Review Your Order')");
    this.orderCommentInput = page.locator(".form-control");
    this.proceedToPaymentLink = page.locator("[href='/payment']");

    this.nameOnCardInput = page.locator("[data-qa='name-on-card']");
    this.cardNumberInput = page.locator("[data-qa='card-number']");
    this.cvcInput = page.locator("[data-qa='cvc']");
    this.expiryMonthInput = page.locator("[data-qa='expiry-month']");
    this.expiryYearInput = page.locator("[data-qa='expiry-year']");
    this.alertLocator = page.locator("#success_message .alert-success");
    this.payBtn = page.locator("[data-qa='pay-button']");
    this.addressDelivery = page.locator("#address_delivery li").nth(3);
    this.addressInvoice = page.locator("#address_invoice li").nth(3);
    this.invoice = page.getByRole("link", { name: "Download Invoice" });
    this.continueButton = page.getByRole("link", { name: "Continue" });
  }

  async goToCheckoutPage() {
    await this.checkoutBtn.click();
  }

  async fillOrderDetailsPreventSubmit(comment) {
    await this.page.addInitScript(() => {
      window.addEventListener("submit", (e) => e.preventDefault(), true);
    });
    await expect(this.addressDetailsTitle).toBeVisible();
    await expect(this.reviewOrderSection).toBeVisible();

    await this.orderCommentInput.fill(comment);
    await this.proceedToPaymentLink.click();
  }

  async fillOrderDetails(comment) {
    await expect(this.addressDetailsTitle).toBeVisible();
    await expect(this.reviewOrderSection).toBeVisible();

    await this.orderCommentInput.fill(comment);
    await this.proceedToPaymentLink.click();
  }

  async fillPaymentDetails({ name, number, cvc, month, year }) {
    await this.nameOnCardInput.fill(name);
    await this.cardNumberInput.fill(number);
    await this.cvcInput.fill(cvc);
    await this.expiryMonthInput.fill(month);
    await this.expiryYearInput.fill(year);

    await this.payBtn.click();

    await expect(this.alertLocator).toBeVisible({ timeout: 3000 });
    await expect(this.alertLocator).toHaveText(
      "Your order has been placed successfully!"
    );
  }

  async fillPaymentDetailsRealSubmit({ name, number, cvc, month, year }) {
    await this.nameOnCardInput.fill(name);
    await this.cardNumberInput.fill(number);
    await this.cvcInput.fill(cvc);
    await this.expiryMonthInput.fill(month);
    await this.expiryYearInput.fill(year);
    await this.payBtn.click();
  }

  async downloadInvoice() {
    await this.invoice.click();
  }

  async verifyAddressDetails(user) {
    await expect(this.addressDelivery).toHaveText(user.address);
    await expect(this.addressInvoice).toHaveText(user.address);
  }
}
