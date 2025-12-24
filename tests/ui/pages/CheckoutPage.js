import { Header, PaymentPage } from ".";
export class CheckoutPage {
    constructor(page) {
        this.page = page;
        this.header = new Header(page)
    }

    get orderCommentInput() {
        return this.page.locator(".form-control");
    }

    get proceedToPaymentLink() {
        return this.page.locator("[href='/payment']");
    }

    get addressDetailsTitle() {
        return this.page.locator("h2:has-text('Address Details')");
    }

    get reviewOrderSection() {
        return this.page.locator("h2:has-text('Review Your Order')");
    }

    get addressDelivery() {
        return this.page.locator("#address_delivery li").nth(3);
    }

    get addressInvoice() {
        return this.page.locator("#address_invoice li").nth(3);
    }

    async fillOrderDetails(comment, { preventSubmit = false } = {}) {
        if (preventSubmit) {
            await this.page.addInitScript(() => {
                window.addEventListener(
                    "submit",
                    (e) => e.preventDefault(),
                    true
                );
            });
        }

        await this.orderCommentInput.fill(comment);
        await this.proceedToPaymentLink.click();
        return new PaymentPage(this.page);
    }
}
