import { Header } from ".";

export class PaymentPage {
    constructor(page) {
        this.page = page;
        this.header = new Header(page);
    }

    get nameOnCardInput() {
        return this.page.locator("[data-qa='name-on-card']");
    }

    get cardNumberInput() {
        return this.page.locator("[data-qa='card-number']");
    }

    get cvcInput() {
        return this.page.locator("[data-qa='cvc']");
    }

    get expiryMonthInput() {
        return this.page.locator("[data-qa='expiry-month']");
    }

    get expiryYearInput() {
        return this.page.locator("[data-qa='expiry-year']");
    }

    get payAndConfirmOrderBtn() {
        return this.page.locator("[data-qa='pay-button']");
    }

    get successMessage() {
        return this.page.locator("#success_message .alert-success");
    }

    get invoice() {
        return this.page.getByRole("link", { name: "Download Invoice" });
    }

    async fillPaymentDetails({ name, number, cvc, month, year }) {
        await this.nameOnCardInput.fill(name);
        await this.cardNumberInput.fill(number);
        await this.cvcInput.fill(cvc);
        await this.expiryMonthInput.fill(month);
        await this.expiryYearInput.fill(year);
        await this.payAndConfirmOrderBtn.click();
    }

    async downloadInvoice() {
        await this.invoice.click();
    }
}
